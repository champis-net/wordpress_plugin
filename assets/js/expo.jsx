import React, { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { createRoot } from "react-dom/client";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
    Paper, Button, Typography, Dialog, DialogContent, DialogTitle,
    IconButton, TablePagination, Slide, Skeleton, Badge,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Parallel, deliberately standalone copy of exhibition.jsx (same UI: table,
// recherche, pagination, galerie d'images, export Excel) for expositions
// venant du nouveau forum Flarum plutôt que de intranet.champis.net -
// intranet.champis.net sera retiré une fois la migration terminée, donc ce
// fichier ne partage volontairement aucun code avec exhibition.jsx pour que
// ce retrait soit un simple "supprimer ce fichier-là", pas un démêlage
// d'abstraction partagée.
//
// Différences de données par rapport à intranet.champis.net (voir
// exhibition.jsx pour comparaison) :
// - Réponse JSON:API (data.attributes.*, données liées dans "included"),
//   pas un objet plat.
// - Le titre affiché est attributes.name (ex: "Exposition 2025"), pas
//   attributes.description (souvent vide côté Flarum - c'est un champ
//   distinct, facultatif).
// - species.no devient finding.label (même rôle : le numéro de
//   détermination affiché à côté du nom).
// - species.id (identifiant GBIF) devient finding.gbifId.
// - Une trouvaille sans détermination a speciesDisplay === null (gbifId
//   à 0) plutôt que canonical_name manquant - géré explicitement plus bas.
// - Les photos (attributes.photos, {url, type, thumbnailUrl, width,
//   height}) n'ont pas de légende propre (pas de champ "comment" côté
//   Flarum) - la visionneuse affiche le nom de l'espèce à la place.
//   thumbnailUrl peut être null (photo pas encore réduite côté Flarum) :
//   une icône remplace alors la miniature.

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function apiBase() {
    return (window.champisExpoConfig && window.champisExpoConfig.apiBase) || "https://champis.net";
}

// La bibliothèque xlsx (~250 Ko) n'est chargée qu'au premier clic sur
// « Télécharger Excel », pas avec le reste de la page (voir build.mjs).
let xlsxPromise = null;

function loadXlsx() {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (!xlsxPromise) {
        xlsxPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = window.champisExpoConfig.xlsxUrl;
            script.onload = () => resolve(window.XLSX);
            script.onerror = () => {
                xlsxPromise = null; // permet de réessayer
                script.remove();
                reject(new Error("xlsx"));
            };
            document.head.appendChild(script);
        });
    }
    return xlsxPromise;
}

// Thème MUI aux couleurs du site qui affiche le widget : sa police (au lieu
// de Roboto, que MUI suppose chargée) et la couleur de ses liens pour les
// boutons et icônes (au lieu du bleu de MUI). La couleur est lue sur un
// lien temporaire placé dans le conteneur, donc avec les styles du thème
// WordPress à cet endroit précis.
function siteTheme(container) {
    const probe = document.createElement("a");
    probe.href = "#";
    container.appendChild(probe);
    const linkColor = getComputedStyle(probe).color;
    probe.remove();

    return createTheme({
        typography: { fontFamily: "inherit" },
        palette: linkColor ? { primary: { main: linkColor } } : {},
        components: {
            MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
        },
    });
}

// Recherche insensible à la casse et aux accents : « cepe » trouve « Cèpe ».
function normalize(text) {
    return (text ?? "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Tri naturel en français (« 2a » avant « 10a », accents ignorés).
const collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });

const SORTS = {
    scientific: { label: "Nom scientifique", value: (finding) => finding.attributes.speciesDisplay?.canonicalName },
    vernacular: { label: "Nom vernaculaire", value: (finding) => finding.attributes.vernacularName },
    family: { label: "Famille", value: (finding) => finding.attributes.speciesDisplay?.family },
};

// Les valeurs manquantes (non déterminé, pas de nom vernaculaire…) restent
// en fin de liste dans les deux sens de tri.
function sortFindings(findings, { key, direction }) {
    const value = SORTS[key].value;
    const factor = direction === "asc" ? 1 : -1;
    return [...findings].sort((a, b) => {
        const va = value(a);
        const vb = value(b);
        if (!va || !vb) return (va ? 0 : 1) - (vb ? 0 : 1);
        return factor * collator.compare(va, vb);
    });
}

// Dates « AAAA-MM-JJ » lues comme des dates locales (new Date("2026-08-23")
// serait minuit UTC, donc la veille sur un fuseau à l'ouest de Greenwich).
function localDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatDates(startDate, endDate) {
    if (!startDate) return "";
    const format = new Intl.DateTimeFormat("fr-CH", { day: "numeric", month: "long", year: "numeric" });
    const start = localDate(startDate);
    if (!endDate || endDate === startDate) return format.format(start);
    const end = localDate(endDate);
    return format.formatRange ? format.formatRange(start, end) : `${format.format(start)} – ${format.format(end)}`;
}

function slugify(text) {
    return normalize(text).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function speciesName(finding) {
    return finding.attributes.speciesDisplay?.canonicalName ?? "Non déterminé";
}

// Widget étroit (téléphone, ou colonne de contenu à côté d'une barre latérale
// même sur grand écran) : marges réduites et colonne Famille masquée, sinon
// le tableau sort de son cadre. Selon la largeur du widget lui-même
// (@container, voir containerType sur .champis-expo-root), pas de l'écran.
const NARROW = "@container (max-width: 500px)";
const cellSx = { color: "inherit", borderBottom: "1px solid currentColor", [NARROW]: { px: 1 } };
const familyCellSx = { ...cellSx, [NARROW]: { ...cellSx[NARROW], display: "none" } };

function Expo({ exhibitionId }) {
    const [exhibition, setExhibition] = useState(null);
    const [findings, setFindings] = useState([]);
    // loading | ready | notFound | error
    const [status, setStatus] = useState("loading");

    // pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // recherche et tri
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState({ key: "scientific", direction: "asc" });

    // visionneuse : la trouvaille reste affichée pendant l'animation de fermeture
    const [viewerFinding, setViewerFinding] = useState(null);
    const [viewerOpen, setViewerOpen] = useState(false);

    // export Excel
    const [exporting, setExporting] = useState(false);
    const [exportFailed, setExportFailed] = useState(false);

    const load = useCallback(() => {
        setStatus("loading");
        fetch(`${apiBase()}/api/champis-exhibitions/${exhibitionId}?include=findings`)
            .then(res => {
                // 404 : exposition inexistante, ou d'une société dont les
                // expositions ne sont pas publiques.
                if (res.status === 404) return null;
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(json => {
                if (!json || !json.data) {
                    setStatus("notFound");
                    return;
                }
                setExhibition(json.data);
                setFindings(json.included ?? []);
                setStatus("ready");
            })
            .catch(() => setStatus("error"));
    }, [exhibitionId]);

    useEffect(() => { load(); }, [load]);

    const sortedFindings = useMemo(() => sortFindings(findings, sort), [findings, sort]);

    // La colonne Photos seulement si au moins une espèce de l'exposition en a
    // (pas seulement celles de la page affichée : la colonne ne doit pas
    // apparaître et disparaître d'une page à l'autre).
    const hasPhotos = useMemo(
        () => findings.some(finding => (finding.attributes.photos ?? []).length > 0),
        [findings],
    );

    // Nom scientifique, nom vernaculaire, famille ou numéro.
    const filteredFindings = useMemo(() => {
        const term = normalize(searchTerm.trim());
        if (!term) return sortedFindings;
        return sortedFindings.filter(finding => {
            const species = finding.attributes.speciesDisplay;
            return [species?.canonicalName, species?.family, finding.attributes.vernacularName, finding.attributes.label]
                .some(text => normalize(text).includes(term));
        });
    }, [sortedFindings, searchTerm]);

    if (status === "loading") {
        return (
            <div className="champis-expo-root" aria-busy="true">
                <Skeleton width="40%" height={36} />
                <Skeleton width="55%" />
                {[0, 1, 2, 3, 4].map(i => <Skeleton key={i} height={52} />)}
            </div>
        );
    }

    if (status === "notFound") {
        return <p>Cette exposition n'existe pas ou n'est pas publique.</p>;
    }

    if (status === "error") {
        return (
            <div className="champis-expo-root">
                <p>Les espèces de cette exposition n'ont pas pu être chargées.</p>
                <Button variant="outlined" onClick={load}>Réessayer</Button>
            </div>
        );
    }

    const downloadExcel = async () => {
        setExporting(true);
        setExportFailed(false);
        let XLSX;
        try {
            XLSX = await loadXlsx();
        } catch {
            setExportFailed(true);
            return;
        } finally {
            setExporting(false);
        }

        // Toute la liste (pas seulement le résultat de la recherche), dans
        // l'ordre de tri affiché.
        const rows = sortedFindings.map(finding => {
            const species = finding.attributes.speciesDisplay;
            return {
                "Numéro": finding.attributes.label ?? "",
                "Nom scientifique": species ? species.canonicalName : "",
                "Auteur": species?.author?.trim() ?? "",
                "Famille": species?.family ?? "",
                "Nom vernaculaire": finding.attributes.vernacularName ?? "",
                "No GBIF": finding.attributes.gbifId ? `${finding.attributes.gbifId}` : "",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        worksheet["!cols"] = [{ wch: 10 }, { wch: 32 }, { wch: 24 }, { wch: 20 }, { wch: 32 }, { wch: 10 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Espèces");
        const name = [slugify(exhibition.attributes.name), exhibition.attributes.startDate].filter(Boolean).join("-");
        XLSX.writeFile(workbook, `${name || `exposition-${exhibitionId}`}.xlsx`);
    };

    const handleSort = (key) => {
        setSort(current => ({
            key,
            direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
        }));
        setPage(0);
    };

    const openViewer = (finding) => {
        setViewerFinding(finding);
        setViewerOpen(true);
    };

    const { name, startDate, endDate, location } = exhibition.attributes;
    const summary = [
        formatDates(startDate, endDate),
        location,
        `${findings.length} ${findings.length > 1 ? "espèces" : "espèce"}`,
    ].filter(Boolean).join(" · ");

    return (
        // containerType : la pagination s'adapte à la largeur du widget (voir
        // son @container), pas à celle de l'écran - la colonne de contenu du
        // thème peut être étroite même sur un grand écran (barre latérale).
        <div className="champis-expo-root" style={{ containerType: "inline-size" }}>
            <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>{name}</Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>{summary}</Typography>

            {findings.length === 0 ? (
                <Typography variant="body1">Aucune espèce trouvée pour l'instant</Typography>
            ) : (
                <>
                    {/* Champ de recherche - stylé par le thème WordPress, comme
                        les autres champs du site */}
                    <div style={{ marginBottom: "1rem" }}>
                        <input
                            type="search"
                            aria-label="Rechercher une espèce"
                            placeholder="Nom, famille ou numéro..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                // Sinon, depuis la page 3, une recherche à 4
                                // résultats affiche un tableau vide.
                                setPage(0);
                            }}
                            style={{ width: "100%", maxWidth: "400px" }}
                        />
                    </div>

                    <TableContainer
                        component={Paper}
                        sx={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Object.entries(SORTS).map(([key, { label }]) => (
                                        <TableCell
                                            key={key}
                                            sx={{ ...(key === "family" ? familyCellSx : cellSx), fontWeight: "bold" }}
                                            sortDirection={sort.key === key ? sort.direction : false}
                                        >
                                            <TableSortLabel
                                                active={sort.key === key}
                                                direction={sort.key === key ? sort.direction : "asc"}
                                                onClick={() => handleSort(key)}
                                                sx={{ color: "inherit !important", "& .MuiTableSortLabel-icon": { color: "inherit !important" } }}
                                            >
                                                {label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    {hasPhotos && <TableCell sx={{ ...cellSx, fontWeight: "bold" }}>Photos</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredFindings.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={Object.keys(SORTS).length + (hasPhotos ? 1 : 0)} sx={cellSx}>
                                            Aucune espèce ne correspond à « {searchTerm.trim()} ».
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filteredFindings
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(finding => {
                                        const species = finding.attributes.speciesDisplay;
                                        const photos = finding.attributes.photos ?? [];

                                        return (
                                            <TableRow key={finding.id}>
                                                <TableCell sx={cellSx}>
                                                    {finding.attributes.label ?? ""}{" "}
                                                    {species ? (
                                                        <>
                                                            <a href={`${apiBase()}/species/${finding.attributes.gbifId}`}>
                                                                <i>{species.canonicalName}</i>
                                                            </a> {species.author?.trim()}
                                                        </>
                                                    ) : (
                                                        <i>Non déterminé</i>
                                                    )}
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    {finding.attributes.vernacularName ?? ""}
                                                </TableCell>
                                                <TableCell sx={familyCellSx}>
                                                    {species?.family ?? ""}
                                                </TableCell>
                                                {hasPhotos && <TableCell sx={cellSx}>
                                                    {photos.length > 0 && (
                                                        <IconButton
                                                            onClick={() => openViewer(finding)}
                                                            aria-label={photos.length > 1
                                                                ? `Voir les ${photos.length} photos de ${speciesName(finding)}`
                                                                : `Voir la photo de ${speciesName(finding)}`}
                                                            sx={{ p: 0.5 }}
                                                        >
                                                            <Badge
                                                                badgeContent={photos.length > 1 ? photos.length : 0}
                                                                color="primary"
                                                                // Rentrée dans le coin de la miniature, pour ne
                                                                // pas déborder du tableau sur téléphone.
                                                                sx={{ "& .MuiBadge-badge": { top: 8, right: 8 } }}
                                                            >
                                                                {photos[0].thumbnailUrl ? (
                                                                    <img
                                                                        src={photos[0].thumbnailUrl}
                                                                        alt=""
                                                                        width={48}
                                                                        height={48}
                                                                        loading="lazy"
                                                                        // Taille en style : le thème WordPress force
                                                                        // souvent img { height: auto }.
                                                                        style={{ display: "block", width: "48px", height: "48px", maxWidth: "none", objectFit: "cover", borderRadius: "4px" }}
                                                                    />
                                                                ) : (
                                                                    <ImageIcon color="primary" />
                                                                )}
                                                            </Badge>
                                                        </IconButton>
                                                    )}
                                                </TableCell>}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={filteredFindings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        labelRowsPerPage="Espèces par page :"
                        labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count}`}
                        getItemAriaLabel={(type) => ({
                            first: "Première page",
                            last: "Dernière page",
                            next: "Page suivante",
                            previous: "Page précédente",
                        })[type]}
                        sx={{
                            color: "inherit",
                            // Calée sur les bords du tableau (MUI met 24 px à gauche).
                            "& .MuiToolbar-root": { pl: 0, pr: 0 },
                            "& .MuiSvgIcon-root": { color: "inherit" },
                            // Ces deux libellés sont des <p> : sans margin: 0, la
                            // marge que le thème WordPress met sous les paragraphes
                            // les remonte par rapport au sélecteur et aux flèches.
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                                color: "inherit",
                                margin: 0,
                            },
                            "& .MuiInputBase-root": { color: "inherit" },
                            "& .MuiSelect-icon": { color: "inherit" },
                            // Widget étroit (téléphone, colonne à côté d'une barre
                            // latérale) : sans le libellé « Espèces par page », le
                            // sélecteur, « 1–10 sur 31 » et les flèches tiennent
                            // sur une ligne, au lieu de pousser les flèches hors
                            // du cadre.
                            "@container (max-width: 400px)": {
                                "& .MuiTablePagination-selectLabel": { display: "none" },
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadExcel}
                        disabled={exporting}
                        sx={{ mt: 2 }}
                    >
                        {exporting ? "Préparation..." : "Télécharger la liste (Excel)"}
                    </Button>
                    {exportFailed && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            Le téléchargement a échoué, veuillez réessayer.
                        </Typography>
                    )}

                    <PhotoViewer
                        finding={viewerFinding}
                        open={viewerOpen}
                        onClose={() => setViewerOpen(false)}
                    />
                </>
            )}
        </div>
    );
}

// Visionneuse plein écran : flèches du clavier, glissement du doigt,
// légende avec le nom de l'espèce, photo suivante préchargée.
function PhotoViewer({ finding, open, onClose }) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(null);

    const photos = finding?.attributes.photos ?? [];
    const count = photos.length;

    const next = useCallback(() => setIndex(i => (i + 1) % count), [count]);
    const prev = useCallback(() => setIndex(i => (i - 1 + count) % count), [count]);

    // Nouvelle trouvaille ouverte : on repart de sa première photo.
    useEffect(() => { setIndex(0); }, [finding]);

    useEffect(() => {
        if (!open || count < 2) return undefined;
        const onKeyDown = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, count, next, prev]);

    useEffect(() => {
        if (open && count > 1) {
            new Image().src = photos[(index + 1) % count].url;
        }
    }, [open, index, count, photos]);

    if (!finding || count === 0) return null;

    const photo = photos[Math.min(index, count - 1)];
    const species = finding.attributes.speciesDisplay;
    const vernacular = finding.attributes.vernacularName;

    const onTouchEnd = (e) => {
        if (touchStartX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) {
            if (dx < 0) next();
            else prev();
        }
    };

    const arrowSx = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "#fff",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            aria-label={`Photos de ${speciesName(finding)}`}
            slots={{ transition: Transition }}
            slotProps={{
                transition: { timeout: 500 },
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                    },
                },
                paper: {
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        color: '#fff',
                    },
                },
            }}
        >
            <DialogTitle
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: '#fff',
                }}
            >
                {count > 1 ? `${index + 1}/${count}` : ""}
                <IconButton onClick={onClose} aria-label="Fermer" sx={{ color: '#fff' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                onClick={onClose}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={onTouchEnd}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={photo.url}
                    alt={vernacular ? `${speciesName(finding)} (${vernacular})` : speciesName(finding)}
                    width={photo.width ?? undefined}
                    height={photo.height ?? undefined}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
                <Typography
                    variant="body1"
                    sx={{ mt: 1.5, textAlign: "center", color: "#fff" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {species ? <i>{species.canonicalName}</i> : "Non déterminé"}
                    {vernacular ? ` – ${vernacular}` : ""}
                </Typography>

                {count > 1 && (
                    <>
                        <IconButton
                            aria-label="Photo précédente"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            sx={{ ...arrowSx, left: 20 }}
                        >
                            <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                        <IconButton
                            aria-label="Photo suivante"
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            sx={{ ...arrowSx, right: 20 }}
                        >
                            <ChevronRightIcon fontSize="large" />
                        </IconButton>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

// Initialisation
document.querySelectorAll(".champis-expo").forEach(domContainer => {
    const exhibitionId = domContainer.getAttribute("data-exhibition-id");
    const root = createRoot(domContainer);
    root.render(
        <ThemeProvider theme={siteTheme(domContainer)}>
            <Expo exhibitionId={exhibitionId} />
        </ThemeProvider>
    );
});

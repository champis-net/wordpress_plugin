import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Liste des espèces d'une exposition du forum champis.net : code court
// [champis-expo-N] (expo.jsx, qui ajoute aussi expo.css à la page) et
// aperçu du bloc « Exposition champis.net » dans l'éditeur (src/expo, qui
// charge expo.css dans l'éditeur par block.json).
//
// Une seule requête pour toute l'exposition (quelque 25 Ko compressés pour
// 350 espèces) : la recherche, le tri et « Afficher plus » sont ensuite
// immédiats. Pas de bibliothèque d'interface : le thème WordPress donne
// sa police et ses couleurs (expo.css se charge du reste, voir son en-tête).
// Les fichiers Excel et PDF sont ceux de champis.net.
//
// La réponse JSON:API de champis.net :
// - data.attributes : name, startDate, endDate, location ;
// - included : les espèces (attributes.label, le numéro ; gbifId, 0 pour
//   une espèce non déterminée ; speciesDisplay, null dans ce cas ;
//   vernacularName ; createdAt ; photos, {url, thumbnailUrl, width,
//   height} - thumbnailUrl peut être null, une icône remplace alors la
//   miniature ; notes, les remarques de la société sur l'espèce, en texte
//   brut, ou null).

// Espèces affichées d'abord, puis à chaque clic sur « Afficher plus ».
// 20, ou le réglage « Espèces affichées » du bloc (pageSize).
const PAGE_SIZE = 20;

function apiBase() {
    return (window.champisExpoConfig && window.champisExpoConfig.apiBase) || "https://champis.net";
}

// Recherche insensible à la casse et aux accents : « cepe » trouve « Cèpe ».
function normalize(text) {
    return (text ?? "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Tri naturel en français (« 2a » avant « 10a », accents ignorés).
const collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });

function speciesName(finding) {
    return finding.attributes.speciesDisplay?.canonicalName ?? "Non déterminé";
}

// Une valeur manquante (pas de numéro, pas de nom vernaculaire, espèce non
// déterminée) en fin de liste.
const byText = (value) => (a, b) => {
    const va = value(a);
    const vb = value(b);
    if (!va || !vb) return (va ? 0 : 1) - (vb ? 0 : 1);
    return collator.compare(va, vb);
};

const byName = byText((finding) => finding.attributes.speciesDisplay?.canonicalName);

// Par date d'ajout, puis par numéro d'enregistrement pour celles ajoutées
// au même moment.
const byAdded = (a, b) =>
    (a.attributes.createdAt ?? "").localeCompare(b.attributes.createdAt ?? "") || Number(a.id) - Number(b.id);

// Les ordres du menu « Trier par », chacun suivi de l'ordre des noms.
// Numéro seulement si l'exposition numérote ses espèces.
const SORTS = {
    number: { label: "Numéro", compare: byText((finding) => finding.attributes.label) },
    scientific: { label: "Nom scientifique", compare: byName },
    vernacular: { label: "Nom vernaculaire", compare: byText((finding) => finding.attributes.vernacularName) },
    newest: { label: "Derniers ajouts", compare: (a, b) => byAdded(b, a) },
    oldest: { label: "Premiers ajouts", compare: byAdded },
};

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

// Icônes (Material Symbols), en ligne : pas de police d'icônes à charger.
const ICONS = {
    image: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5-3 4L9 13z",
    close: "M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z",
    prev: "M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z",
    next: "M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z",
    play: "M8 5v14l11-7z",
    more: "M12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4z",
    info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
    excel: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",
    pdf: "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z",
};

function Icon({ name }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={ICONS[name]} />
        </svg>
    );
}

export function Expo({ exhibitionId, pageSize = PAGE_SIZE }) {
    const [exhibition, setExhibition] = useState(null);
    const [findings, setFindings] = useState([]);
    // loading | ready | notFound | error
    const [status, setStatus] = useState("loading");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("scientific");
    const [shownCount, setShownCount] = useState(pageSize);
    // Le réglage changé dans l'éditeur (aperçu du bloc).
    useEffect(() => setShownCount(pageSize), [pageSize]);
    // La photo ouverte dans la visionneuse (sa place dans slides), ou null.
    const [viewerIndex, setViewerIndex] = useState(null);
    // L'espèce dont les remarques sont ouvertes, ou null.
    const [noteFinding, setNoteFinding] = useState(null);

    const load = useCallback(() => {
        setStatus("loading");
        fetch(`${apiBase()}/api/champis-exhibitions/${exhibitionId}?include=findings`)
            .then((res) => {
                // 404 : exposition inexistante, ou d'une société dont les
                // expositions ne sont pas publiques.
                if (res.status === 404) return null;
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                if (!json || !json.data) {
                    setStatus("notFound");
                    return;
                }
                const included = (json.included ?? []).filter((item) => item.type === "champis-exhibitions-findings");
                setExhibition(json.data);
                setFindings(included);
                // Par numéro (« 2a » avant « 10a ») si au moins une espèce
                // en a un, sinon par nom scientifique.
                setSort(included.some((finding) => finding.attributes.label) ? "number" : "scientific");
                setStatus("ready");
            })
            .catch(() => setStatus("error"));
    }, [exhibitionId]);

    useEffect(() => {
        load();
    }, [load]);

    const hasNumbers = useMemo(() => findings.some((finding) => finding.attributes.label), [findings]);
    const hasPhotos = useMemo(() => findings.some((finding) => (finding.attributes.photos ?? []).length > 0), [findings]);

    // Triée, puis cherchée : nom scientifique, nom vernaculaire ou numéro.
    const list = useMemo(() => {
        const compare = SORTS[sort].compare;
        const term = normalize(search.trim());

        return [...findings]
            .sort((a, b) => compare(a, b) || byName(a, b))
            .filter(
                (finding) =>
                    !term ||
                    [finding.attributes.speciesDisplay?.canonicalName, finding.attributes.vernacularName, finding.attributes.label].some((text) =>
                        normalize(text).includes(term),
                    ),
            );
    }, [findings, sort, search]);

    // Toutes les photos de la liste telle qu'affichée (pas seulement des
    // espèces déjà affichées), pour la visionneuse ; firstSlide : la place
    // de la première photo de chaque espèce.
    const { slides, firstSlide } = useMemo(() => {
        const slides = [];
        const firstSlide = new Map();
        for (const finding of list) {
            const photos = finding.attributes.photos ?? [];
            if (photos.length) firstSlide.set(finding.id, slides.length);
            const name = speciesName(finding);
            const vernacular = finding.attributes.vernacularName;
            for (const photo of photos) {
                slides.push({
                    url: photo.url,
                    width: photo.width,
                    height: photo.height,
                    alt: vernacular ? `${name} (${vernacular})` : name,
                    label: finding.attributes.label,
                    name,
                    determined: !!finding.attributes.speciesDisplay,
                    vernacular,
                });
            }
        }
        return { slides, firstSlide };
    }, [list]);

    if (status === "loading") {
        return (
            <div className="champis-expo-root champis-expo-skeleton" aria-busy="true" aria-label="Chargement des espèces">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span key={i} />
                ))}
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
                <button type="button" className="champis-expo-button" onClick={load}>
                    Réessayer
                </button>
            </div>
        );
    }

    const { startDate, endDate, location } = exhibition.attributes;
    const summary = [formatDates(startDate, endDate), location, `${findings.length} ${findings.length > 1 ? "espèces" : "espèce"}`]
        .filter(Boolean)
        .join(" · ");
    const shown = list.slice(0, shownCount);
    const files = `${apiBase()}/api/champis-exhibitions/${exhibitionId}/findings`;

    return (
        <div className="champis-expo-root">
            <div className="champis-expo-header">
                <p className="champis-expo-summary">{summary}</p>
                {/* Grisé plutôt que retiré quand la recherche ne laisse aucune
                    photo : le champ de recherche, juste dessous, ne bouge pas
                    pendant qu'on y tape. */}
                {hasPhotos && (
                    <button type="button" className="champis-expo-button" disabled={slides.length === 0} onClick={() => setViewerIndex(0)}>
                        <Icon name="play" />
                        Diaporama
                    </button>
                )}
            </div>

            {findings.length === 0 ? (
                <p>Aucune espèce trouvée pour l'instant.</p>
            ) : (
                <>
                    <div className="champis-expo-toolbar">
                        <input
                            type="search"
                            aria-label="Rechercher une espèce"
                            placeholder={hasNumbers ? "Chercher par nom ou numéro…" : "Chercher par nom…"}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShownCount(pageSize);
                            }}
                        />
                        <label>
                            Trier par
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setShownCount(pageSize);
                                }}
                            >
                                {Object.entries(SORTS)
                                    .filter(([key]) => key !== "number" || hasNumbers)
                                    .map(([key, { label }]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                            </select>
                        </label>
                    </div>

                    {list.length === 0 ? (
                        <p>Aucune espèce ne correspond à « {search.trim()} ».</p>
                    ) : (
                        <table className="champis-expo-table">
                            <thead>
                                <tr>
                                    {hasNumbers && <th className="champis-expo-no">N°</th>}
                                    <th>Espèce</th>
                                    {hasPhotos && <th className="champis-expo-photo">Photo</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {shown.map((finding) => (
                                    <Row
                                        key={finding.id}
                                        finding={finding}
                                        hasNumbers={hasNumbers}
                                        hasPhotos={hasPhotos}
                                        onPhoto={() => setViewerIndex(firstSlide.get(finding.id))}
                                        onNote={() => setNoteFinding(finding)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}

                    {shown.length < list.length && (
                        <div className="champis-expo-more">
                            <span>
                                {shown.length} sur {list.length}
                            </span>
                            <button type="button" className="champis-expo-button" onClick={() => setShownCount((count) => count + pageSize)}>
                                <Icon name="more" />
                                Afficher plus
                            </button>
                        </div>
                    )}

                    <p className="champis-expo-downloads">
                        <span>Télécharger la liste :</span>
                        <a href={`${files}.xlsx`}>
                            <Icon name="excel" />
                            Excel
                        </a>
                        <a href={`${files}.pdf`}>
                            <Icon name="pdf" />
                            PDF
                        </a>
                    </p>

                    {noteFinding && <NoteDialog finding={noteFinding} onClose={() => setNoteFinding(null)} />}

                    {viewerIndex !== null && slides.length > 0 && (
                        <Viewer
                            slides={slides}
                            index={Math.min(viewerIndex, slides.length - 1)}
                            onIndex={setViewerIndex}
                            onClose={() => setViewerIndex(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
}

function Row({ finding, hasNumbers, hasPhotos, onPhoto, onNote }) {
    const species = finding.attributes.speciesDisplay;
    const author = species?.author?.trim();
    const vernacular = finding.attributes.vernacularName;
    const photos = finding.attributes.photos ?? [];
    const label = `Remarques sur ${speciesName(finding)}`;

    return (
        <tr>
            {hasNumbers && <td className="champis-expo-no">{finding.attributes.label ?? ""}</td>}
            <td>
                {species ? (
                    <>
                        <a href={`${apiBase()}/species/${finding.attributes.gbifId}`}>
                            <i>{species.canonicalName}</i>
                        </a>
                        {author && ` ${author}`}
                    </>
                ) : (
                    <i>Non déterminé</i>
                )}
                {/* Ses remarques, si sa société en a écrit : dans une petite
                    fenêtre, comme sur champis.net, pour garder une ligne par
                    espèce. Une espace insécable avant : il ne passe jamais
                    seul à la ligne. */}
                {finding.attributes.notes?.trim() && (
                    <>
                        {"\u00a0"}
                        <button type="button" className="champis-expo-note-button" aria-label={label} title={label} onClick={onNote}>
                            <Icon name="info" />
                        </button>
                    </>
                )}
                {vernacular && <span className="champis-expo-vernacular">{vernacular}</span>}
            </td>
            {hasPhotos && (
                <td className="champis-expo-photo">
                    {photos.length > 0 && (
                        <button
                            type="button"
                            className="champis-expo-thumb"
                            onClick={onPhoto}
                            aria-label={
                                photos.length > 1
                                    ? `Voir les ${photos.length} photos de ${speciesName(finding)}`
                                    : `Voir la photo de ${speciesName(finding)}`
                            }
                        >
                            {photos[0].thumbnailUrl ? (
                                <img src={photos[0].thumbnailUrl} alt="" width={48} height={48} loading="lazy" />
                            ) : (
                                <Icon name="image" />
                            )}
                            {photos.length > 1 && <span className="champis-expo-count">{photos.length}</span>}
                        </button>
                    )}
                </td>
            )}
        </tr>
    );
}

// Les remarques d'une espèce, comme le « i » de la page publique de
// champis.net (/expo/N) : une petite fenêtre titrée de son numéro et de son
// nom, le texte tel que sa société l'a saisi, retours à la ligne compris
// (jamais du HTML). C'est un <dialog> du navigateur : le reste de la page est
// inaccessible tant qu'elle est ouverte, Échap la ferme. Le bouton Fermer ou
// un clic à côté aussi ; le focus revient au « i ».
function NoteDialog({ finding, onClose }) {
    const dialog = useRef(null);
    // Le clic a commencé sur le fond : sélectionner le texte en relâchant
    // la souris à côté ne ferme pas la fenêtre.
    const pressedOutside = useRef(false);
    const id = useId();
    const { label, notes, speciesDisplay } = finding.attributes;
    const name = speciesName(finding);
    const close = () => dialog.current?.close();

    useEffect(() => {
        const opener = document.activeElement;
        dialog.current.showModal();
        dialog.current.querySelector("button")?.focus();

        return () => opener?.focus?.();
    }, []);

    return createPortal(
        <dialog
            ref={dialog}
            className="champis-expo-note"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-text`}
            onClose={onClose}
            // Le contenu est tout entier dans la div : un clic sur le
            // <dialog> lui-même est un clic sur le fond.
            onPointerDown={(e) => {
                pressedOutside.current = e.target === dialog.current;
            }}
            onClick={(e) => pressedOutside.current && e.target === dialog.current && close()}
        >
            <div className="champis-expo-note-content">
                <div className="champis-expo-note-top">
                    <p id={`${id}-title`} className="champis-expo-note-title">
                        {label && <>{label} · </>}
                        {speciesDisplay ? <i>{name}</i> : name}
                    </p>
                    <button type="button" className="champis-expo-note-close" aria-label="Fermer" onClick={close}>
                        <Icon name="close" />
                    </button>
                </div>
                <p id={`${id}-text`} className="champis-expo-note-text">
                    {notes.trim()}
                </p>
            </div>
        </dialog>,
        document.body,
    );
}

// Visionneuse plein écran, par-dessus la page : toutes les photos de la
// liste, l'une après l'autre - flèches de l'écran ou du clavier, glissement
// du doigt, Échap ou un clic à côté pour fermer. La photo suivante est
// préchargée ; le focus revient à ce qui l'avait ouverte.
function Viewer({ slides, index, onIndex, onClose }) {
    const dialog = useRef(null);
    const touchStart = useRef(null);
    const count = slides.length;
    const slide = slides[index];

    const next = useCallback(() => onIndex((i) => (i + 1) % count), [count, onIndex]);
    const prev = useCallback(() => onIndex((i) => (i - 1 + count) % count), [count, onIndex]);

    // À l'ouverture : la page ne défile plus derrière, le focus va au bouton
    // Fermer ; à la fermeture, tout revient comme avant.
    useEffect(() => {
        const opener = document.activeElement;
        const overflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        dialog.current?.querySelector("button")?.focus();

        return () => {
            document.documentElement.style.overflow = overflow;
            opener?.focus?.();
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowRight" && count > 1) next();
            else if (e.key === "ArrowLeft" && count > 1) prev();
            else if (e.key === "Tab") {
                // Le focus reste dans la visionneuse.
                const buttons = [...dialog.current.querySelectorAll("button")];
                const position = buttons.indexOf(document.activeElement);
                e.preventDefault();
                buttons[(position + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [count, next, prev, onClose]);

    useEffect(() => {
        if (count > 1) new Image().src = slides[(index + 1) % count].url;
    }, [slides, index, count]);

    const onTouchEnd = (e) => {
        if (!touchStart.current || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) next();
            else prev();
        }
    };

    const stop = (e) => e.stopPropagation();

    return createPortal(
        <div
            ref={dialog}
            className="champis-expo-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`Photos de l'exposition, ${index + 1} sur ${count}`}
            onClick={onClose}
            onTouchStart={(e) => {
                touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={onTouchEnd}
        >
            <div className="champis-expo-viewer-top">
                <span>{count > 1 ? `${index + 1} / ${count}` : ""}</span>
                <button type="button" aria-label="Fermer" onClick={onClose}>
                    <Icon name="close" />
                </button>
            </div>

            <figure>
                <img
                    key={slide.url}
                    src={slide.url}
                    alt={slide.alt}
                    width={slide.width ?? undefined}
                    height={slide.height ?? undefined}
                    onClick={stop}
                />
                <figcaption onClick={stop}>
                    {slide.label && <>{slide.label} · </>}
                    {slide.determined ? <i>{slide.name}</i> : slide.name}
                    {slide.vernacular && <> · {slide.vernacular}</>}
                </figcaption>
            </figure>

            {count > 1 && (
                <>
                    <button
                        type="button"
                        className="champis-expo-viewer-prev"
                        aria-label="Photo précédente"
                        onClick={(e) => {
                            stop(e);
                            prev();
                        }}
                    >
                        <Icon name="prev" />
                    </button>
                    <button
                        type="button"
                        className="champis-expo-viewer-next"
                        aria-label="Photo suivante"
                        onClick={(e) => {
                            stop(e);
                            next();
                        }}
                    >
                        <Icon name="next" />
                    </button>
                </>
            )}
        </div>,
        document.body,
    );
}

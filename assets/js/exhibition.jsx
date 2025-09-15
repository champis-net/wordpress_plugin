import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Typography, Dialog, DialogContent, DialogTitle, IconButton,
    TablePagination
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Exhibition({ exhibitionId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // état pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // état modale
    const [open, setOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`https://intranet.champis.net/api/v1/exhibition/${exhibitionId}`)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [exhibitionId]);

    if (loading) return <p>Chargement...</p>;
    if (!data) return <p>Pas de données disponibles</p>;

    const downloadExcel = () => {
        const rows = data.exhibition_species.map(species => ({
            "No GBIF": `${species.id}`,
            "Nom scientifique": `${species.canonical_name}`,
            "Auteur": `${species.author}`,
            "Nom vernaculaire": species.vernacular_name ?? "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Espèces");
        const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(blob, `liste-${exhibitionId}.xlsx`);
    };

    const speciesList = data.exhibition_species ?? [];

    const handleOpen = (images) => {
        setCurrentImages(images);
        setCurrentIndex(0);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentImages([]);
        setCurrentIndex(0);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + currentImages.length) % currentImages.length
        );
    };

    // gestion pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="exhibition">
            <Typography variant="h5" gutterBottom>{data.description}</Typography>

            {speciesList.length > 0 ? (
                <>
                    <TableContainer
                        component={Paper}
                        sx={{
                            backgroundColor: 'transparent', // fond transparent
                            boxShadow: 'none',              // supprime l’ombre
                            color: 'inherit',               // hérite de la couleur du texte du thème
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}><b>Nom scientifique</b></TableCell>
                                    <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}><b>Nom vernaculaire</b></TableCell>
                                    <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {speciesList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(species => (
                                        <TableRow key={species.uid}>
                                            <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>
                                                <a href={`https://www.gbif.org/species/${species.id}`}>
                                                    <i>{species.canonical_name}</i>
                                                </a> {species.author}
                                            </TableCell>
                                            <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>{species.vernacular_name ?? ""}</TableCell>
                                            <TableCell sx={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>
                                                {species.images.length > 0 && (
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpen(species.images)}
                                                    >
                                                        <ImageIcon />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={speciesList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Espèces par page :"
                    />

                    {/* Bouton téléchargement Excel */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadExcel}
                        sx={{ mt: 2 }}
                    >
                        Télécharger Excel
                    </Button>

                    {/* Fenêtre modale images */}
                    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                        {currentImages.length > 0 && (
                            <>
                                <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                                    Images ({currentIndex + 1}/{currentImages.length})
                                    <IconButton onClick={handleClose}>✖</IconButton>
                                </DialogTitle>
                                <DialogContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={currentImages[currentIndex].url}
                                        alt={currentImages[currentIndex].comment ?? ""}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "80vh",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    {currentImages[currentIndex].comment && (
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            {currentImages[currentIndex].comment}
                                        </Typography>
                                    )}
                                    {currentImages.length > 1 && (
                                        <div style={{ marginTop: "10px", display: "flex", gap: "1rem" }}>
                                            <Button onClick={prevImage}>Précédent</Button>
                                            <Button onClick={nextImage}>Suivant</Button>
                                        </div>
                                    )}
                                </DialogContent>
                            </>
                        )}
                    </Dialog>
                </>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    Aucune espèce trouvée pour l'instant
                </Typography>
            )}
        </div>
    );
}

// Initialisation
document.querySelectorAll(".champis-exhibition").forEach(domContainer => {
    const exhibitionId = domContainer.getAttribute("data-exhibition-id");
    const root = createRoot(domContainer);
    root.render(<Exhibition exhibitionId={exhibitionId} />);
});

import React from "react";
import { createRoot } from "react-dom/client";
import { Expo } from "./expo-widget.jsx";
import styles from "./expo.css";

// Sur le site : la liste des espèces dans chaque <div class="champis-expo"
// data-exhibition-id="N">, que la page vienne du code court
// [champis-expo-N] ou du bloc « Exposition champis.net » (son render.php,
// qui y ajoute data-page-size, son réglage « Espèces affichées »).
// Voir expo-widget.jsx.

// expo.css, une fois par page.
function addStyles() {
    if (document.getElementById("champis-expo-styles")) return;
    const style = document.createElement("style");
    style.id = "champis-expo-styles";
    style.textContent = styles;
    document.head.appendChild(style);
}

document.querySelectorAll(".champis-expo").forEach((domContainer) => {
    addStyles();
    const pageSize = parseInt(domContainer.getAttribute("data-page-size"), 10);
    createRoot(domContainer).render(
        <Expo
            exhibitionId={domContainer.getAttribute("data-exhibition-id")}
            pageSize={pageSize > 0 ? pageSize : undefined}
        />,
    );
});

import React from "react";
import { createRoot } from "react-dom/client";
import { Events } from "./events-list.jsx";

// Sur le site : les prochains événements dans chaque <div
// class="champis-events-flarum" data-limit="N">, que la page vienne du code
// court [champis-evenements] ou du bloc « Événements champis.net » (son
// render.php). Voir events-list.jsx.

document.querySelectorAll(".champis-events-flarum").forEach(domContainer => {
    const limit = parseInt(domContainer.getAttribute("data-limit"), 10) || 10;
    const root = createRoot(domContainer);
    root.render(<Events limit={limit} />);
});

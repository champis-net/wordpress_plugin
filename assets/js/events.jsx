import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// Parallel, standalone equivalent of champis_net_add_events() in
// champis-net.php (liste "prochains événements" via api.champis.net,
// rendue côté PHP) - celle-ci vient du nouveau forum Flarum à la place, et
// utilise React comme demandé. Ne partage pas de code avec la version PHP
// existante, même raison que expo.jsx vs exhibition.jsx : la partie
// api.champis.net sera retirée une fois la migration terminée, et ça doit
// alors rester un simple retrait de fichier(s), pas un démêlage.
//
// Pas de MUI ici (contrairement à expo.jsx) : une liste de quelques
// événements n'a besoin ni de tableau, ni de pagination, ni de modale -
// les inclure aurait juste alourdi le bundle pour rien.
//
// Champs utilisés (voir UpcomingEventsResource côté champis-flarum) :
// discussionId, title, startDate, endDate, location, url - url est le
// lien externe propre à l'événement (inscription, page de la société...),
// distinct du lien vers le sujet du forum construit ici à partir de
// discussionId.

function apiBase() {
    return (window.champisEventsConfig && window.champisEventsConfig.apiBase) || "https://champis.net";
}

// Lien externe propre à l'événement. Le forum n'accepte plus que des URL
// http(s), mais d'anciens événements migrés de phpBB contiennent une adresse
// e-mail ou une URL sans « http » : l'e-mail devient un lien mailto:,
// l'URL sans schéma reçoit https://, et tout le reste (javascript:...) est
// ignoré - le React de WordPress (18) ne bloque pas ces liens-là lui-même.
// Le texte affiché est le domaine (« amfb.eu »), pas l'URL complète, qui
// peut être très longue et déborder sur téléphone.
function eventLink(url) {
    const value = (url ?? "").trim();
    if (!value) return null;

    if (/^[^\s@/:]+@[^\s@/]+\.[^\s@/]+$/.test(value)) {
        return { href: `mailto:${value}`, label: value };
    }

    try {
        const parsed = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return { href: parsed.href, label: parsed.hostname.replace(/^www\./, "") };
        }
    } catch {
        // pas une URL
    }
    return null;
}

function formatDate(isoDate) {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
}

function Events({ limit }) {
    const [events, setEvents] = useState([]);
    // loading | ready | error
    const [status, setStatus] = useState("loading");

    const load = useCallback(() => {
        setStatus("loading");
        fetch(`${apiBase()}/api/upcoming-events?filter[limit]=${limit}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(json => {
                setEvents(json.data ?? []);
                setStatus("ready");
            })
            // Une panne n'est pas « aucun événement » : message distinct.
            .catch(() => setStatus("error"));
    }, [limit]);

    useEffect(() => { load(); }, [load]);

    if (status === "loading") return <p>Chargement...</p>;
    if (status === "error") {
        return (
            <div className="champis-events-root">
                <p>Les événements n'ont pas pu être chargés.</p>
                <button type="button" onClick={load}>Réessayer</button>
            </div>
        );
    }
    if (events.length === 0) return <p>Aucun événement à venir pour l'instant.</p>;

    return (
        <ul className="champis-events-root" style={{ listStyle: "none", padding: 0 }}>
            {events.map(event => {
                const { discussionId, title, startDate, endDate, location, url } = event.attributes;
                const link = eventLink(url);
                const dateRange = endDate && endDate !== startDate
                    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                    : formatDate(startDate);

                return (
                    <li key={event.id} style={{ marginBottom: "1.2rem", overflowWrap: "anywhere" }}>
                        <div>{dateRange}</div>
                        <div>
                            <strong>
                                <a href={`${apiBase()}/d/${discussionId}`}>{title}</a>
                            </strong>
                        </div>
                        {location && <div>{location}</div>}
                        {link && <div><a href={link.href}>{link.label}</a></div>}
                    </li>
                );
            })}
        </ul>
    );
}

// Initialisation
document.querySelectorAll(".champis-events-flarum").forEach(domContainer => {
    const limit = parseInt(domContainer.getAttribute("data-limit"), 10) || 10;
    const root = createRoot(domContainer);
    root.render(<Events limit={limit} />);
});

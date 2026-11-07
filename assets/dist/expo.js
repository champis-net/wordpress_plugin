(()=>{var se=Object.create;var I=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var le=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty;var T=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports);var ce=(t,o,s,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of re(o))!pe.call(t,r)&&r!==s&&I(t,r,{get:()=>o[r],enumerable:!(n=ae(o,r))||n.enumerable});return t};var j=(t,o,s)=>(s=t!=null?se(le(t)):{},ce(o||!t||!t.__esModule?I(s,"default",{value:t,enumerable:!0}):s,t));var B=T((ye,O)=>{O.exports=window.React});var K=T((Ne,Y)=>{Y.exports=window.ReactDOM});var X=T((ke,U)=>{U.exports=window.ReactDOM});var e=j(B()),P=j(K()),Q=j(X());var G=`/*
 * Styles du widget [champis-expo-N] (expo.jsx), embarqu\xE9s dans expo.js et
 * ajout\xE9s une fois \xE0 la page. Le th\xE8me WordPress donne sa police et ses
 * couleurs. La taille du texte, les champs, les boutons et le tableau sont
 * fix\xE9s ici : tous les th\xE8mes ne s'en chargent pas (Divi laisse au champ de
 * recherche son style de navigateur, 13 px) ou le font mal pour une liste
 * (cadre et 24 px de marges aux cellules de Divi, gros boutons pleins).
 * La visionneuse a son propre style, sombre, par-dessus la page ; la fen\xEAtre
 * des remarques aussi, claire.
 */

.champis-expo-root {
    /* Les r\xE8gles @container ci-dessous suivent la largeur du widget, pas
       celle de l'\xE9cran : la colonne de contenu peut \xEAtre \xE9troite \xE0 c\xF4t\xE9
       d'une barre lat\xE9rale, m\xEAme sur un grand \xE9cran. */
    container-type: inline-size;
    /* La taille du texte qui l'entoure, dans ces limites, mais pas le reste :
       le module Texte de Divi, en 24 px centr\xE9, en faisait des lignes de
       43 px de haut. */
    font-size: clamp(14px, 1em, 18px);
    font-weight: normal;
    line-height: 1.5;
    text-align: left;
}

/* Le r\xE9sum\xE9 \xE0 gauche, le diaporama \xE0 droite. */
.champis-expo-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em 1em;
    margin: 0 0 1em;
}

.champis-expo-root .champis-expo-summary {
    margin: 0;
    padding: 0;
    opacity: 0.8;
    font-size: 0.9em;
}

.champis-expo-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em 1em;
    margin: 0 0 1em;
}

/* Pas de couleur de texte ni de fond : ceux du navigateur restent lisibles
   l'un sur l'autre, y compris sur un th\xE8me sombre. */
.champis-expo-toolbar input[type="search"],
.champis-expo-toolbar select {
    box-sizing: border-box;
    height: auto;
    min-height: 2.5em;
    padding: 0.35em 0.6em;
    border: 1px solid rgba(128, 128, 128, 0.5);
    border-radius: 4px;
    font: inherit;
}

/* 16em : la place du texte indicatif entier, \xAB Chercher par nom ou num\xE9ro\u2026 \xBB. */
.champis-expo-toolbar input[type="search"] {
    flex: 1 1 16em;
    max-width: 25em;
    margin: 0;
}

.champis-expo-toolbar label {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4em;
    margin: 0;
    font-weight: normal;
    white-space: nowrap;
}

.champis-expo-toolbar select {
    width: auto;
    max-width: 100%;
    margin: 0;
}

/* Les boutons, \xE0 la hauteur des champs et avec le m\xEAme contour : ceux du th\xE8me,
   pleins et faits pour un appel \xE0 l'action, \xE9crasent une liste. La couleur du
   texte plut\xF4t que celle des liens, qui peut \xEAtre illisible (jaune sur blanc
   sur vesnalpes.ch) ; le fond, transparent, convient aussi aux th\xE8mes sombres. */
.champis-expo-root button.champis-expo-button {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35em;
    min-height: 2.5em;
    padding: 0.35em 0.8em;
    border: 1px solid rgba(128, 128, 128, 0.5);
    border-radius: 4px;
    cursor: pointer;
}

.champis-expo-root button.champis-expo-button:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.15);
}

.champis-expo-root button.champis-expo-button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}

.champis-expo-root button.champis-expo-button:disabled {
    opacity: 0.5;
    cursor: default;
}

.champis-expo-button svg,
.champis-expo-downloads svg {
    flex: none;
    width: 1.25em;
    height: 1.25em;
    fill: currentColor;
}

.champis-expo-button svg {
    margin-left: -0.15em;
}

/* Aussi pr\xE9cises que les r\xE8gles de th\xE8mes comme Divi
   (.entry-content table:not(.variations), .entry-content tr td), qui
   l'emporteraient sinon. */
.champis-expo-root table.champis-expo-table {
    width: 100%;
    margin: 0 0 1em;
    border: 0;
    border-collapse: collapse;
}

.champis-expo-root .champis-expo-table th,
.champis-expo-root .champis-expo-table td {
    padding: 0.55em 0.6em;
    border: 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.35);
    background: none;
    text-align: left;
    vertical-align: middle;
}

.champis-expo-root .champis-expo-table th {
    font-weight: bold;
}

/* N\xB0 et photo : aussi \xE9troites que leur contenu (\xAB 1657a \xBB, une miniature). */
.champis-expo-root .champis-expo-table .champis-expo-no,
.champis-expo-root .champis-expo-table .champis-expo-photo {
    width: 1%;
    white-space: nowrap;
}

.champis-expo-vernacular {
    display: block;
    opacity: 0.8;
    font-size: 0.92em;
}

/* Le \xAB i \xBB des remarques, une ic\xF4ne dans la ligne du nom plut\xF4t qu'un bouton :
   la couleur du texte (pas celle des liens, voir .champis-expo-button), un peu
   att\xE9nu\xE9e. Sa marge int\xE9rieure agrandit la zone \xE0 toucher (pr\xE8s de 30 px),
   ses marges n\xE9gatives l'emp\xEAchent d'agrandir la ligne et le rapprochent de
   l'espace ins\xE9cable qui le pr\xE9c\xE8de. */
.champis-expo-root button.champis-expo-note-button {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    vertical-align: -0.5em;
    padding: 0.3em;
    margin: -0.3em -0.1em -0.3em -0.15em;
    border-radius: 50%;
    opacity: 0.7;
    cursor: pointer;
}

.champis-expo-root button.champis-expo-note-button:hover,
.champis-expo-root button.champis-expo-note-button:focus-visible {
    opacity: 1;
}

.champis-expo-root button.champis-expo-note-button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0;
}

.champis-expo-note-button svg {
    display: block;
    width: 1.15em;
    height: 1.15em;
    fill: currentColor;
}

/* La miniature, un bouton qui ouvre la visionneuse : sans le style que le
   th\xE8me donne \xE0 ses boutons. */
.champis-expo-thumb {
    all: unset;
    box-sizing: border-box;
    position: relative;
    display: block;
    cursor: pointer;
    border-radius: 4px;
    line-height: 0;
}

.champis-expo-thumb:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}

.champis-expo-thumb img,
.champis-expo-thumb svg {
    display: block;
    width: 48px;
    height: 48px;
    max-width: none;
    margin: 0;
    border-radius: 4px;
    object-fit: cover;
}

.champis-expo-thumb svg {
    padding: 12px;
    box-sizing: border-box;
    background: rgba(128, 128, 128, 0.15);
    fill: currentColor;
}

.champis-expo-count {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 16px;
    padding: 0 4px;
    box-sizing: border-box;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    font-size: 11px;
    line-height: 16px;
    text-align: center;
}

.champis-expo-more,
.champis-expo-downloads {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em 1em;
    margin: 0 0 1em;
}

.champis-expo-more {
    justify-content: center;
}

.champis-expo-more span {
    opacity: 0.8;
    font-size: 0.9em;
}

.champis-expo-downloads {
    margin-bottom: 1.5em;
}

.champis-expo-downloads a {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
}

.champis-expo-skeleton span {
    display: block;
    height: 1.4em;
    margin: 0.7em 0;
    border-radius: 4px;
    background: linear-gradient(90deg, rgba(128, 128, 128, 0.12), rgba(128, 128, 128, 0.28), rgba(128, 128, 128, 0.12));
    background-size: 200% 100%;
    animation: champis-expo-shimmer 1.2s linear infinite;
}

.champis-expo-skeleton span:first-child {
    width: 55%;
}

@keyframes champis-expo-shimmer {
    from { background-position: 100% 0; }
    to { background-position: -100% 0; }
}

@container (max-width: 500px) {
    .champis-expo-root .champis-expo-table th,
    .champis-expo-root .champis-expo-table td {
        padding: 0.5em 0.3em;
    }
}

/* Visionneuse */

.champis-expo-viewer {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    animation: champis-expo-fade 0.2s ease-out;
}

@keyframes champis-expo-fade {
    from { opacity: 0; }
}

.champis-expo-viewer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75em 1em;
}

.champis-expo-viewer figure {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 1em 1em;
}

.champis-expo-viewer img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100vh - 9em);
    margin: 0;
    border-radius: 6px;
    object-fit: contain;
}

.champis-expo-viewer figcaption {
    margin-top: 0.75em;
    text-align: center;
}

.champis-expo-viewer button {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    cursor: pointer;
}

.champis-expo-viewer button:hover {
    background: rgba(255, 255, 255, 0.25);
}

.champis-expo-viewer button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
}

.champis-expo-viewer button svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
}

.champis-expo-viewer .champis-expo-viewer-prev,
.champis-expo-viewer .champis-expo-viewer-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

/* Aussi pr\xE9cis que la r\xE8gle des boutons ci-dessus (all: unset). */
.champis-expo-viewer .champis-expo-viewer-prev {
    left: 1em;
}

.champis-expo-viewer .champis-expo-viewer-next {
    right: 1em;
}

/* Remarques : une petite fen\xEAtre (<dialog>), hors du widget (ajout\xE9e \xE0
   <body>) pour \xE9chapper aux r\xE8gles du th\xE8me sur le contenu. Le fond et le
   texte sont fix\xE9s : sur un th\xE8me sombre, ceux de la page la rendraient
   illisible. La police reste celle du th\xE8me. */

.champis-expo-note {
    box-sizing: border-box;
    width: min(30em, calc(100% - 2em));
    max-width: none;
    max-height: calc(100% - 2em);
    margin: auto;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: #fff;
    color: #222;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    font-size: clamp(14px, 1em, 18px);
    font-weight: normal;
    line-height: 1.5;
    text-align: left;
    animation: champis-expo-fade 0.15s ease-out;
}

.champis-expo-note::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

/* Tout le contenu, et la marge int\xE9rieure : un clic sur le <dialog> lui-m\xEAme
   est alors un clic sur le fond (voir NoteDialog). */
.champis-expo-note-content {
    padding: 0.9em 1em 1.25em 1.25em;
}

.champis-expo-note-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5em;
}

.champis-expo-note p.champis-expo-note-title,
.champis-expo-note p.champis-expo-note-text {
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
}

.champis-expo-note p.champis-expo-note-title {
    padding-top: 0.35em;
    font-weight: bold;
}

/* Le texte tel qu'il a \xE9t\xE9 saisi, ses retours \xE0 la ligne gard\xE9s. */
.champis-expo-note p.champis-expo-note-text {
    margin-top: 0.6em;
    white-space: pre-line;
    overflow-wrap: anywhere;
}

.champis-expo-note button.champis-expo-note-close {
    all: unset;
    box-sizing: border-box;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25em;
    height: 2.25em;
    margin: -0.1em -0.4em 0 0;
    border-radius: 50%;
    color: inherit;
    cursor: pointer;
}

.champis-expo-note button.champis-expo-note-close:hover {
    background: rgba(0, 0, 0, 0.08);
}

.champis-expo-note button.champis-expo-note-close:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 0;
}

.champis-expo-note-close svg {
    width: 1.4em;
    height: 1.4em;
    fill: currentColor;
}

@media (prefers-reduced-motion: reduce) {
    .champis-expo-skeleton span,
    .champis-expo-viewer,
    .champis-expo-note {
        animation: none;
    }
}
`;var $=20;function V(){return window.champisExpoConfig&&window.champisExpoConfig.apiBase||"https://champis.net"}function ue(){if(document.getElementById("champis-expo-styles"))return;let t=document.createElement("style");t.id="champis-expo-styles",t.textContent=G,document.head.appendChild(t)}function W(t){return(t??"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}var he=new Intl.Collator("fr",{numeric:!0,sensitivity:"base"});function N(t){return t.attributes.speciesDisplay?.canonicalName??"Non d\xE9termin\xE9"}var H=t=>(o,s)=>{let n=t(o),r=t(s);return!n||!r?(n?0:1)-(r?0:1):he.compare(n,r)},R=H(t=>t.attributes.speciesDisplay?.canonicalName),Z=(t,o)=>(t.attributes.createdAt??"").localeCompare(o.attributes.createdAt??"")||Number(t.id)-Number(o.id),_={number:{label:"Num\xE9ro",compare:H(t=>t.attributes.label)},scientific:{label:"Nom scientifique",compare:R},vernacular:{label:"Nom vernaculaire",compare:H(t=>t.attributes.vernacularName)},newest:{label:"Derniers ajouts",compare:(t,o)=>Z(o,t)},oldest:{label:"Premiers ajouts",compare:Z}};function J(t){let[o,s,n]=t.split("-").map(Number);return new Date(o,s-1,n)}function de(t,o){if(!t)return"";let s=new Intl.DateTimeFormat("fr-CH",{day:"numeric",month:"long",year:"numeric"}),n=J(t);if(!o||o===t)return s.format(n);let r=J(o);return s.formatRange?s.formatRange(n,r):`${s.format(n)} \u2013 ${s.format(r)}`}var xe={image:"M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5-3 4L9 13z",close:"M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z",prev:"M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z",next:"M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z",play:"M8 5v14l11-7z",more:"M12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4z",info:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",excel:"M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",pdf:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"};function f({name:t}){return e.default.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.default.createElement("path",{d:xe[t]}))}function be({exhibitionId:t}){let[o,s]=(0,e.useState)(null),[n,r]=(0,e.useState)([]),[u,a]=(0,e.useState)("loading"),[p,c]=(0,e.useState)(""),[d,b]=(0,e.useState)("scientific"),[w,l]=(0,e.useState)($),[h,x]=(0,e.useState)(null),[k,A]=(0,e.useState)(null),q=(0,e.useCallback)(()=>{a("loading"),fetch(`${V()}/api/champis-exhibitions/${t}?include=findings`).then(i=>{if(i.status===404)return null;if(!i.ok)throw new Error(`HTTP ${i.status}`);return i.json()}).then(i=>{if(!i||!i.data){a("notFound");return}let g=(i.included??[]).filter(m=>m.type==="champis-exhibitions-findings");s(i.data),r(g),b(g.some(m=>m.attributes.label)?"number":"scientific"),a("ready")}).catch(()=>a("error"))},[t]);(0,e.useEffect)(()=>{q()},[q]);let z=(0,e.useMemo)(()=>n.some(i=>i.attributes.label),[n]),L=(0,e.useMemo)(()=>n.some(i=>(i.attributes.photos??[]).length>0),[n]),y=(0,e.useMemo)(()=>{let i=_[d].compare,g=W(p.trim());return[...n].sort((m,v)=>i(m,v)||R(m,v)).filter(m=>!g||[m.attributes.speciesDisplay?.canonicalName,m.attributes.vernacularName,m.attributes.label].some(v=>W(v).includes(g)))},[n,d,p]),{slides:C,firstSlide:ee}=(0,e.useMemo)(()=>{let i=[],g=new Map;for(let m of y){let v=m.attributes.photos??[];v.length&&g.set(m.id,i.length);let D=N(m),S=m.attributes.vernacularName;for(let M of v)i.push({url:M.url,width:M.width,height:M.height,alt:S?`${D} (${S})`:D,label:m.attributes.label,name:D,determined:!!m.attributes.speciesDisplay,vernacular:S})}return{slides:i,firstSlide:g}},[y]);if(u==="loading")return e.default.createElement("div",{className:"champis-expo-root champis-expo-skeleton","aria-busy":"true","aria-label":"Chargement des esp\xE8ces"},[0,1,2,3,4,5].map(i=>e.default.createElement("span",{key:i})));if(u==="notFound")return e.default.createElement("p",null,"Cette exposition n'existe pas ou n'est pas publique.");if(u==="error")return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("p",null,"Les esp\xE8ces de cette exposition n'ont pas pu \xEAtre charg\xE9es."),e.default.createElement("button",{type:"button",className:"champis-expo-button",onClick:q},"R\xE9essayer"));let{startDate:te,endDate:oe,location:ie}=o.attributes,ne=[de(te,oe),ie,`${n.length} ${n.length>1?"esp\xE8ces":"esp\xE8ce"}`].filter(Boolean).join(" \xB7 "),E=y.slice(0,w),F=`${V()}/api/champis-exhibitions/${t}/findings`;return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("div",{className:"champis-expo-header"},e.default.createElement("p",{className:"champis-expo-summary"},ne),L&&e.default.createElement("button",{type:"button",className:"champis-expo-button",disabled:C.length===0,onClick:()=>x(0)},e.default.createElement(f,{name:"play"}),"Diaporama")),n.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce trouv\xE9e pour l'instant."):e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"champis-expo-toolbar"},e.default.createElement("input",{type:"search","aria-label":"Rechercher une esp\xE8ce",placeholder:z?"Chercher par nom ou num\xE9ro\u2026":"Chercher par nom\u2026",value:p,onChange:i=>{c(i.target.value),l($)}}),e.default.createElement("label",null,"Trier par",e.default.createElement("select",{value:d,onChange:i=>{b(i.target.value),l($)}},Object.entries(_).filter(([i])=>i!=="number"||z).map(([i,{label:g}])=>e.default.createElement("option",{key:i,value:i},g))))),y.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce ne correspond \xE0 \xAB ",p.trim()," \xBB."):e.default.createElement("table",{className:"champis-expo-table"},e.default.createElement("thead",null,e.default.createElement("tr",null,z&&e.default.createElement("th",{className:"champis-expo-no"},"N\xB0"),e.default.createElement("th",null,"Esp\xE8ce"),L&&e.default.createElement("th",{className:"champis-expo-photo"},"Photo"))),e.default.createElement("tbody",null,E.map(i=>e.default.createElement(ge,{key:i.id,finding:i,hasNumbers:z,hasPhotos:L,onPhoto:()=>x(ee.get(i.id)),onNote:()=>A(i)})))),E.length<y.length&&e.default.createElement("div",{className:"champis-expo-more"},e.default.createElement("span",null,E.length," sur ",y.length),e.default.createElement("button",{type:"button",className:"champis-expo-button",onClick:()=>l(i=>i+$)},e.default.createElement(f,{name:"more"}),"Afficher plus")),e.default.createElement("p",{className:"champis-expo-downloads"},e.default.createElement("span",null,"T\xE9l\xE9charger la liste :"),e.default.createElement("a",{href:`${F}.xlsx`},e.default.createElement(f,{name:"excel"}),"Excel"),e.default.createElement("a",{href:`${F}.pdf`},e.default.createElement(f,{name:"pdf"}),"PDF")),k&&e.default.createElement(fe,{finding:k,onClose:()=>A(null)}),h!==null&&C.length>0&&e.default.createElement(ve,{slides:C,index:Math.min(h,C.length-1),onIndex:x,onClose:()=>x(null)})))}function ge({finding:t,hasNumbers:o,hasPhotos:s,onPhoto:n,onNote:r}){let u=t.attributes.speciesDisplay,a=u?.author?.trim(),p=t.attributes.vernacularName,c=t.attributes.photos??[],d=`Remarques sur ${N(t)}`;return e.default.createElement("tr",null,o&&e.default.createElement("td",{className:"champis-expo-no"},t.attributes.label??""),e.default.createElement("td",null,u?e.default.createElement(e.default.Fragment,null,e.default.createElement("a",{href:`${V()}/species/${t.attributes.gbifId}`},e.default.createElement("i",null,u.canonicalName)),a&&` ${a}`):e.default.createElement("i",null,"Non d\xE9termin\xE9"),t.attributes.notes?.trim()&&e.default.createElement(e.default.Fragment,null,"\xA0",e.default.createElement("button",{type:"button",className:"champis-expo-note-button","aria-label":d,title:d,onClick:r},e.default.createElement(f,{name:"info"}))),p&&e.default.createElement("span",{className:"champis-expo-vernacular"},p)),s&&e.default.createElement("td",{className:"champis-expo-photo"},c.length>0&&e.default.createElement("button",{type:"button",className:"champis-expo-thumb",onClick:n,"aria-label":c.length>1?`Voir les ${c.length} photos de ${N(t)}`:`Voir la photo de ${N(t)}`},c[0].thumbnailUrl?e.default.createElement("img",{src:c[0].thumbnailUrl,alt:"",width:48,height:48,loading:"lazy"}):e.default.createElement(f,{name:"image"}),c.length>1&&e.default.createElement("span",{className:"champis-expo-count"},c.length))))}function fe({finding:t,onClose:o}){let s=(0,e.useRef)(null),n=(0,e.useRef)(!1),r=(0,e.useId)(),{label:u,notes:a,speciesDisplay:p}=t.attributes,c=N(t),d=()=>s.current?.close();return(0,e.useEffect)(()=>{let b=document.activeElement;return s.current.showModal(),s.current.querySelector("button")?.focus(),()=>b?.focus?.()},[]),(0,P.createPortal)(e.default.createElement("dialog",{ref:s,className:"champis-expo-note","aria-labelledby":`${r}-title`,"aria-describedby":`${r}-text`,onClose:o,onPointerDown:b=>{n.current=b.target===s.current},onClick:b=>n.current&&b.target===s.current&&d()},e.default.createElement("div",{className:"champis-expo-note-content"},e.default.createElement("div",{className:"champis-expo-note-top"},e.default.createElement("p",{id:`${r}-title`,className:"champis-expo-note-title"},u&&e.default.createElement(e.default.Fragment,null,u," \xB7 "),p?e.default.createElement("i",null,c):c),e.default.createElement("button",{type:"button",className:"champis-expo-note-close","aria-label":"Fermer",onClick:d},e.default.createElement(f,{name:"close"}))),e.default.createElement("p",{id:`${r}-text`,className:"champis-expo-note-text"},a.trim()))),document.body)}function ve({slides:t,index:o,onIndex:s,onClose:n}){let r=(0,e.useRef)(null),u=(0,e.useRef)(null),a=t.length,p=t[o],c=(0,e.useCallback)(()=>s(l=>(l+1)%a),[a,s]),d=(0,e.useCallback)(()=>s(l=>(l-1+a)%a),[a,s]);(0,e.useEffect)(()=>{let l=document.activeElement,h=document.documentElement.style.overflow;return document.documentElement.style.overflow="hidden",r.current?.querySelector("button")?.focus(),()=>{document.documentElement.style.overflow=h,l?.focus?.()}},[]),(0,e.useEffect)(()=>{let l=h=>{if(h.key==="Escape")n();else if(h.key==="ArrowRight"&&a>1)c();else if(h.key==="ArrowLeft"&&a>1)d();else if(h.key==="Tab"){let x=[...r.current.querySelectorAll("button")],k=x.indexOf(document.activeElement);h.preventDefault(),x[(k+(h.shiftKey?-1:1)+x.length)%x.length]?.focus()}};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[a,c,d,n]),(0,e.useEffect)(()=>{a>1&&(new Image().src=t[(o+1)%a].url)},[t,o,a]);let b=l=>{if(!u.current||a<2)return;let h=l.changedTouches[0].clientX-u.current.x,x=l.changedTouches[0].clientY-u.current.y;u.current=null,Math.abs(h)>50&&Math.abs(h)>Math.abs(x)&&(h<0?c():d())},w=l=>l.stopPropagation();return(0,P.createPortal)(e.default.createElement("div",{ref:r,className:"champis-expo-viewer",role:"dialog","aria-modal":"true","aria-label":`Photos de l'exposition, ${o+1} sur ${a}`,onClick:n,onTouchStart:l=>{u.current={x:l.touches[0].clientX,y:l.touches[0].clientY}},onTouchEnd:b},e.default.createElement("div",{className:"champis-expo-viewer-top"},e.default.createElement("span",null,a>1?`${o+1} / ${a}`:""),e.default.createElement("button",{type:"button","aria-label":"Fermer",onClick:n},e.default.createElement(f,{name:"close"}))),e.default.createElement("figure",null,e.default.createElement("img",{key:p.url,src:p.url,alt:p.alt,width:p.width??void 0,height:p.height??void 0,onClick:w}),e.default.createElement("figcaption",{onClick:w},p.label&&e.default.createElement(e.default.Fragment,null,p.label," \xB7 "),p.determined?e.default.createElement("i",null,p.name):p.name,p.vernacular&&e.default.createElement(e.default.Fragment,null," \xB7 ",p.vernacular))),a>1&&e.default.createElement(e.default.Fragment,null,e.default.createElement("button",{type:"button",className:"champis-expo-viewer-prev","aria-label":"Photo pr\xE9c\xE9dente",onClick:l=>{w(l),d()}},e.default.createElement(f,{name:"prev"})),e.default.createElement("button",{type:"button",className:"champis-expo-viewer-next","aria-label":"Photo suivante",onClick:l=>{w(l),c()}},e.default.createElement(f,{name:"next"})))),document.body)}document.querySelectorAll(".champis-expo").forEach(t=>{ue(),(0,Q.createRoot)(t).render(e.default.createElement(be,{exhibitionId:t.getAttribute("data-exhibition-id")}))});})();

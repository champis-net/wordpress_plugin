(()=>{var ie=Object.create;var j=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ne=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,re=Object.prototype.hasOwnProperty;var M=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports);var pe=(t,o,a,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let p of ne(o))!re.call(t,p)&&p!==a&&j(t,p,{get:()=>o[p],enumerable:!(s=se(o,p))||s.enumerable});return t};var S=(t,o,a)=>(a=t!=null?ie(ae(t)):{},pe(o||!t||!t.__esModule?j(a,"default",{value:t,enumerable:!0}):a,t));var F=M((fe,A)=>{A.exports=window.React});var O=M((ve,I)=>{I.exports=window.ReactDOM});var Y=M((we,B)=>{B.exports=window.ReactDOM});var e=S(F()),Z=S(O()),_=S(Y());var K=`/*
 * Styles du widget [champis-expo-N] (expo.jsx), embarqu\xE9s dans expo.js et
 * ajout\xE9s une fois \xE0 la page. Le th\xE8me WordPress donne sa police et ses
 * couleurs. La taille du texte, les champs, les boutons et le tableau sont
 * fix\xE9s ici : tous les th\xE8mes ne s'en chargent pas (Divi laisse au champ de
 * recherche son style de navigateur, 13 px) ou le font mal pour une liste
 * (cadre et 24 px de marges aux cellules de Divi, gros boutons pleins).
 * La visionneuse a son propre style, sombre, par-dessus la page.
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

@media (prefers-reduced-motion: reduce) {
    .champis-expo-skeleton span,
    .champis-expo-viewer {
        animation: none;
    }
}
`;var C=20;function T(){return window.champisExpoConfig&&window.champisExpoConfig.apiBase||"https://champis.net"}function ce(){if(document.getElementById("champis-expo-styles"))return;let t=document.createElement("style");t.id="champis-expo-styles",t.textContent=K,document.head.appendChild(t)}function U(t){return(t??"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}var me=new Intl.Collator("fr",{numeric:!0,sensitivity:"base"});function H(t){return t.attributes.speciesDisplay?.canonicalName??"Non d\xE9termin\xE9"}var V=t=>(o,a)=>{let s=t(o),p=t(a);return!s||!p?(s?0:1)-(p?0:1):me.compare(s,p)},J=V(t=>t.attributes.speciesDisplay?.canonicalName),X=(t,o)=>(t.attributes.createdAt??"").localeCompare(o.attributes.createdAt??"")||Number(t.id)-Number(o.id),G={number:{label:"Num\xE9ro",compare:V(t=>t.attributes.label)},scientific:{label:"Nom scientifique",compare:J},vernacular:{label:"Nom vernaculaire",compare:V(t=>t.attributes.vernacularName)},newest:{label:"Derniers ajouts",compare:(t,o)=>X(o,t)},oldest:{label:"Premiers ajouts",compare:X}};function W(t){let[o,a,s]=t.split("-").map(Number);return new Date(o,a-1,s)}function ue(t,o){if(!t)return"";let a=new Intl.DateTimeFormat("fr-CH",{day:"numeric",month:"long",year:"numeric"}),s=W(t);if(!o||o===t)return a.format(s);let p=W(o);return a.formatRange?a.formatRange(s,p):`${a.format(s)} \u2013 ${a.format(p)}`}var he={image:"M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5-3 4L9 13z",close:"M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z",prev:"M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z",next:"M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z",play:"M8 5v14l11-7z",more:"M12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4z",excel:"M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",pdf:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"};function x({name:t}){return e.default.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.default.createElement("path",{d:he[t]}))}function de({exhibitionId:t}){let[o,a]=(0,e.useState)(null),[s,p]=(0,e.useState)([]),[u,n]=(0,e.useState)("loading"),[l,f]=(0,e.useState)(""),[b,N]=(0,e.useState)("scientific"),[v,r]=(0,e.useState)(C),[m,h]=(0,e.useState)(null),y=(0,e.useCallback)(()=>{n("loading"),fetch(`${T()}/api/champis-exhibitions/${t}?include=findings`).then(i=>{if(i.status===404)return null;if(!i.ok)throw new Error(`HTTP ${i.status}`);return i.json()}).then(i=>{if(!i||!i.data){n("notFound");return}let d=(i.included??[]).filter(c=>c.type==="champis-exhibitions-findings");a(i.data),p(d),N(d.some(c=>c.attributes.label)?"number":"scientific"),n("ready")}).catch(()=>n("error"))},[t]);(0,e.useEffect)(()=>{y()},[y]);let k=(0,e.useMemo)(()=>s.some(i=>i.attributes.label),[s]),E=(0,e.useMemo)(()=>s.some(i=>(i.attributes.photos??[]).length>0),[s]),w=(0,e.useMemo)(()=>{let i=G[b].compare,d=U(l.trim());return[...s].sort((c,g)=>i(c,g)||J(c,g)).filter(c=>!d||[c.attributes.speciesDisplay?.canonicalName,c.attributes.vernacularName,c.attributes.label].some(g=>U(g).includes(d)))},[s,b,l]),{slides:z,firstSlide:Q}=(0,e.useMemo)(()=>{let i=[],d=new Map;for(let c of w){let g=c.attributes.photos??[];g.length&&d.set(c.id,i.length);let L=H(c),q=c.attributes.vernacularName;for(let D of g)i.push({url:D.url,width:D.width,height:D.height,alt:q?`${L} (${q})`:L,label:c.attributes.label,name:L,determined:!!c.attributes.speciesDisplay,vernacular:q})}return{slides:i,firstSlide:d}},[w]);if(u==="loading")return e.default.createElement("div",{className:"champis-expo-root champis-expo-skeleton","aria-busy":"true","aria-label":"Chargement des esp\xE8ces"},[0,1,2,3,4,5].map(i=>e.default.createElement("span",{key:i})));if(u==="notFound")return e.default.createElement("p",null,"Cette exposition n'existe pas ou n'est pas publique.");if(u==="error")return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("p",null,"Les esp\xE8ces de cette exposition n'ont pas pu \xEAtre charg\xE9es."),e.default.createElement("button",{type:"button",className:"champis-expo-button",onClick:y},"R\xE9essayer"));let{startDate:R,endDate:ee,location:te}=o.attributes,oe=[ue(R,ee),te,`${s.length} ${s.length>1?"esp\xE8ces":"esp\xE8ce"}`].filter(Boolean).join(" \xB7 "),$=w.slice(0,v),P=`${T()}/api/champis-exhibitions/${t}/findings`;return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("div",{className:"champis-expo-header"},e.default.createElement("p",{className:"champis-expo-summary"},oe),E&&e.default.createElement("button",{type:"button",className:"champis-expo-button",disabled:z.length===0,onClick:()=>h(0)},e.default.createElement(x,{name:"play"}),"Diaporama")),s.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce trouv\xE9e pour l'instant."):e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"champis-expo-toolbar"},e.default.createElement("input",{type:"search","aria-label":"Rechercher une esp\xE8ce",placeholder:k?"Chercher par nom ou num\xE9ro\u2026":"Chercher par nom\u2026",value:l,onChange:i=>{f(i.target.value),r(C)}}),e.default.createElement("label",null,"Trier par",e.default.createElement("select",{value:b,onChange:i=>{N(i.target.value),r(C)}},Object.entries(G).filter(([i])=>i!=="number"||k).map(([i,{label:d}])=>e.default.createElement("option",{key:i,value:i},d))))),w.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce ne correspond \xE0 \xAB ",l.trim()," \xBB."):e.default.createElement("table",{className:"champis-expo-table"},e.default.createElement("thead",null,e.default.createElement("tr",null,k&&e.default.createElement("th",{className:"champis-expo-no"},"N\xB0"),e.default.createElement("th",null,"Esp\xE8ce"),E&&e.default.createElement("th",{className:"champis-expo-photo"},"Photo"))),e.default.createElement("tbody",null,$.map(i=>e.default.createElement(be,{key:i.id,finding:i,hasNumbers:k,hasPhotos:E,onPhoto:()=>h(Q.get(i.id))})))),$.length<w.length&&e.default.createElement("div",{className:"champis-expo-more"},e.default.createElement("span",null,$.length," sur ",w.length),e.default.createElement("button",{type:"button",className:"champis-expo-button",onClick:()=>r(i=>i+C)},e.default.createElement(x,{name:"more"}),"Afficher plus")),e.default.createElement("p",{className:"champis-expo-downloads"},e.default.createElement("span",null,"T\xE9l\xE9charger la liste :"),e.default.createElement("a",{href:`${P}.xlsx`},e.default.createElement(x,{name:"excel"}),"Excel"),e.default.createElement("a",{href:`${P}.pdf`},e.default.createElement(x,{name:"pdf"}),"PDF")),m!==null&&z.length>0&&e.default.createElement(xe,{slides:z,index:Math.min(m,z.length-1),onIndex:h,onClose:()=>h(null)})))}function be({finding:t,hasNumbers:o,hasPhotos:a,onPhoto:s}){let p=t.attributes.speciesDisplay,u=t.attributes.vernacularName,n=t.attributes.photos??[];return e.default.createElement("tr",null,o&&e.default.createElement("td",{className:"champis-expo-no"},t.attributes.label??""),e.default.createElement("td",null,p?e.default.createElement(e.default.Fragment,null,e.default.createElement("a",{href:`${T()}/species/${t.attributes.gbifId}`},e.default.createElement("i",null,p.canonicalName))," ",p.author?.trim()):e.default.createElement("i",null,"Non d\xE9termin\xE9"),u&&e.default.createElement("span",{className:"champis-expo-vernacular"},u)),a&&e.default.createElement("td",{className:"champis-expo-photo"},n.length>0&&e.default.createElement("button",{type:"button",className:"champis-expo-thumb",onClick:s,"aria-label":n.length>1?`Voir les ${n.length} photos de ${H(t)}`:`Voir la photo de ${H(t)}`},n[0].thumbnailUrl?e.default.createElement("img",{src:n[0].thumbnailUrl,alt:"",width:48,height:48,loading:"lazy"}):e.default.createElement(x,{name:"image"}),n.length>1&&e.default.createElement("span",{className:"champis-expo-count"},n.length))))}function xe({slides:t,index:o,onIndex:a,onClose:s}){let p=(0,e.useRef)(null),u=(0,e.useRef)(null),n=t.length,l=t[o],f=(0,e.useCallback)(()=>a(r=>(r+1)%n),[n,a]),b=(0,e.useCallback)(()=>a(r=>(r-1+n)%n),[n,a]);(0,e.useEffect)(()=>{let r=document.activeElement,m=document.documentElement.style.overflow;return document.documentElement.style.overflow="hidden",p.current?.querySelector("button")?.focus(),()=>{document.documentElement.style.overflow=m,r?.focus?.()}},[]),(0,e.useEffect)(()=>{let r=m=>{if(m.key==="Escape")s();else if(m.key==="ArrowRight"&&n>1)f();else if(m.key==="ArrowLeft"&&n>1)b();else if(m.key==="Tab"){let h=[...p.current.querySelectorAll("button")],y=h.indexOf(document.activeElement);m.preventDefault(),h[(y+(m.shiftKey?-1:1)+h.length)%h.length]?.focus()}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[n,f,b,s]),(0,e.useEffect)(()=>{n>1&&(new Image().src=t[(o+1)%n].url)},[t,o,n]);let N=r=>{if(!u.current||n<2)return;let m=r.changedTouches[0].clientX-u.current.x,h=r.changedTouches[0].clientY-u.current.y;u.current=null,Math.abs(m)>50&&Math.abs(m)>Math.abs(h)&&(m<0?f():b())},v=r=>r.stopPropagation();return(0,Z.createPortal)(e.default.createElement("div",{ref:p,className:"champis-expo-viewer",role:"dialog","aria-modal":"true","aria-label":`Photos de l'exposition, ${o+1} sur ${n}`,onClick:s,onTouchStart:r=>{u.current={x:r.touches[0].clientX,y:r.touches[0].clientY}},onTouchEnd:N},e.default.createElement("div",{className:"champis-expo-viewer-top"},e.default.createElement("span",null,n>1?`${o+1} / ${n}`:""),e.default.createElement("button",{type:"button","aria-label":"Fermer",onClick:s},e.default.createElement(x,{name:"close"}))),e.default.createElement("figure",null,e.default.createElement("img",{key:l.url,src:l.url,alt:l.alt,width:l.width??void 0,height:l.height??void 0,onClick:v}),e.default.createElement("figcaption",{onClick:v},l.label&&e.default.createElement(e.default.Fragment,null,l.label," \xB7 "),l.determined?e.default.createElement("i",null,l.name):l.name,l.vernacular&&e.default.createElement(e.default.Fragment,null," \xB7 ",l.vernacular))),n>1&&e.default.createElement(e.default.Fragment,null,e.default.createElement("button",{type:"button",className:"champis-expo-viewer-prev","aria-label":"Photo pr\xE9c\xE9dente",onClick:r=>{v(r),b()}},e.default.createElement(x,{name:"prev"})),e.default.createElement("button",{type:"button",className:"champis-expo-viewer-next","aria-label":"Photo suivante",onClick:r=>{v(r),f()}},e.default.createElement(x,{name:"next"})))),document.body)}document.querySelectorAll(".champis-expo").forEach(t=>{ce(),(0,_.createRoot)(t).render(e.default.createElement(de,{exhibitionId:t.getAttribute("data-exhibition-id")}))});})();

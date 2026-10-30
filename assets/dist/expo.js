(()=>{var ie=Object.create;var F=Object.defineProperty;var ne=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,re=Object.prototype.hasOwnProperty;var D=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports);var le=(t,o,a,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let l of se(o))!re.call(t,l)&&l!==a&&F(t,l,{get:()=>o[l],enumerable:!(n=ne(o,l))||n.enumerable});return t};var q=(t,o,a)=>(a=t!=null?ie(ae(t)):{},le(o||!t||!t.__esModule?F(a,"default",{value:t,enumerable:!0}):a,t));var O=D((fe,I)=>{I.exports=window.React});var B=D((we,V)=>{V.exports=window.ReactDOM});var H=D((ve,Y)=>{Y.exports=window.ReactDOM});var e=q(O()),Z=q(B()),_=q(H());var K=`/*
 * Styles du widget [champis-expo-N] (expo.jsx), embarqu\xE9s dans expo.js et
 * ajout\xE9s une fois \xE0 la page. Le minimum : le th\xE8me WordPress donne d\xE9j\xE0 sa
 * police, ses couleurs, ses champs, ses listes d\xE9roulantes et ses boutons.
 * Seule la visionneuse a son propre style, sombre, par-dessus la page.
 */

.champis-expo-root {
    /* Les r\xE8gles @container ci-dessous suivent la largeur du widget, pas
       celle de l'\xE9cran : la colonne de contenu peut \xEAtre \xE9troite \xE0 c\xF4t\xE9
       d'une barre lat\xE9rale, m\xEAme sur un grand \xE9cran. */
    container-type: inline-size;
}

.champis-expo-summary {
    margin: 0 0 1em;
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

.champis-expo-toolbar input[type="search"] {
    flex: 1 1 14em;
    max-width: 25em;
    margin: 0;
}

.champis-expo-toolbar label {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    margin: 0;
    font-weight: normal;
}

.champis-expo-toolbar select {
    width: auto;
    margin: 0;
}

.champis-expo-table {
    width: 100%;
    margin: 0 0 1em;
    border: 0;
    border-collapse: collapse;
}

.champis-expo-table th,
.champis-expo-table td {
    padding: 0.55em 0.6em;
    border: 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.35);
    background: none;
    text-align: left;
    vertical-align: middle;
}

.champis-expo-table th {
    font-weight: bold;
}

/* N\xB0 et photo : aussi \xE9troites que leur contenu (\xAB 1657a \xBB, une miniature). */
.champis-expo-table .champis-expo-no,
.champis-expo-table .champis-expo-photo {
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

.champis-expo-downloads {
    margin-bottom: 1.5em;
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
    .champis-expo-table th,
    .champis-expo-table td {
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
`;var k=20;function P(){return window.champisExpoConfig&&window.champisExpoConfig.apiBase||"https://champis.net"}function ce(){if(document.getElementById("champis-expo-styles"))return;let t=document.createElement("style");t.id="champis-expo-styles",t.textContent=K,document.head.appendChild(t)}function U(t){return(t??"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}var me=new Intl.Collator("fr",{numeric:!0,sensitivity:"base"});function A(t){return t.attributes.speciesDisplay?.canonicalName??"Non d\xE9termin\xE9"}var L=t=>(o,a)=>{let n=t(o),l=t(a);return!n||!l?(n?0:1)-(l?0:1):me.compare(n,l)},J=L(t=>t.attributes.speciesDisplay?.canonicalName),X=(t,o)=>(t.attributes.createdAt??"").localeCompare(o.attributes.createdAt??"")||Number(t.id)-Number(o.id),G={number:{label:"Num\xE9ro",compare:L(t=>t.attributes.label)},scientific:{label:"Nom scientifique",compare:J},vernacular:{label:"Nom vernaculaire",compare:L(t=>t.attributes.vernacularName)},newest:{label:"Derniers ajouts",compare:(t,o)=>X(o,t)},oldest:{label:"Premiers ajouts",compare:X}};function W(t){let[o,a,n]=t.split("-").map(Number);return new Date(o,a-1,n)}function ue(t,o){if(!t)return"";let a=new Intl.DateTimeFormat("fr-CH",{day:"numeric",month:"long",year:"numeric"}),n=W(t);if(!o||o===t)return a.format(n);let l=W(o);return a.formatRange?a.formatRange(n,l):`${a.format(n)} \u2013 ${a.format(l)}`}var he={image:"M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5-3 4L9 13z",close:"M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z",prev:"M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z",next:"M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z"};function C({name:t}){return e.default.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false"},e.default.createElement("path",{d:he[t]}))}function de({exhibitionId:t}){let[o,a]=(0,e.useState)(null),[n,l]=(0,e.useState)([]),[u,s]=(0,e.useState)("loading"),[p,g]=(0,e.useState)(""),[b,y]=(0,e.useState)("scientific"),[f,r]=(0,e.useState)(k),[m,h]=(0,e.useState)(null),v=(0,e.useCallback)(()=>{s("loading"),fetch(`${P()}/api/champis-exhibitions/${t}?include=findings`).then(i=>{if(i.status===404)return null;if(!i.ok)throw new Error(`HTTP ${i.status}`);return i.json()}).then(i=>{if(!i||!i.data){s("notFound");return}let d=(i.included??[]).filter(c=>c.type==="champis-exhibitions-findings");a(i.data),l(d),y(d.some(c=>c.attributes.label)?"number":"scientific"),s("ready")}).catch(()=>s("error"))},[t]);(0,e.useEffect)(()=>{v()},[v]);let E=(0,e.useMemo)(()=>n.some(i=>i.attributes.label),[n]),M=(0,e.useMemo)(()=>n.some(i=>(i.attributes.photos??[]).length>0),[n]),w=(0,e.useMemo)(()=>{let i=G[b].compare,d=U(p.trim());return[...n].sort((c,x)=>i(c,x)||J(c,x)).filter(c=>!d||[c.attributes.speciesDisplay?.canonicalName,c.attributes.vernacularName,c.attributes.label].some(x=>U(x).includes(d)))},[n,b,p]),{slides:N,firstSlide:Q}=(0,e.useMemo)(()=>{let i=[],d=new Map;for(let c of w){let x=c.attributes.photos??[];x.length&&d.set(c.id,i.length);let S=A(c),z=c.attributes.vernacularName;for(let T of x)i.push({url:T.url,width:T.width,height:T.height,alt:z?`${S} (${z})`:S,label:c.attributes.label,name:S,determined:!!c.attributes.speciesDisplay,vernacular:z})}return{slides:i,firstSlide:d}},[w]);if(u==="loading")return e.default.createElement("div",{className:"champis-expo-root champis-expo-skeleton","aria-busy":"true","aria-label":"Chargement des esp\xE8ces"},[0,1,2,3,4,5].map(i=>e.default.createElement("span",{key:i})));if(u==="notFound")return e.default.createElement("p",null,"Cette exposition n'existe pas ou n'est pas publique.");if(u==="error")return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("p",null,"Les esp\xE8ces de cette exposition n'ont pas pu \xEAtre charg\xE9es."),e.default.createElement("button",{type:"button",className:"wp-element-button",onClick:v},"R\xE9essayer"));let{startDate:R,endDate:ee,location:te}=o.attributes,oe=[ue(R,ee),te,`${n.length} ${n.length>1?"esp\xE8ces":"esp\xE8ce"}`].filter(Boolean).join(" \xB7 "),$=w.slice(0,f),j=`${P()}/api/champis-exhibitions/${t}/findings`;return e.default.createElement("div",{className:"champis-expo-root"},e.default.createElement("p",{className:"champis-expo-summary"},oe),n.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce trouv\xE9e pour l'instant."):e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"champis-expo-toolbar"},e.default.createElement("input",{type:"search","aria-label":"Rechercher une esp\xE8ce",placeholder:"Nom ou num\xE9ro\u2026",value:p,onChange:i=>{g(i.target.value),r(k)}}),e.default.createElement("label",null,"Trier par",e.default.createElement("select",{value:b,onChange:i=>{y(i.target.value),r(k)}},Object.entries(G).filter(([i])=>i!=="number"||E).map(([i,{label:d}])=>e.default.createElement("option",{key:i,value:i},d)))),N.length>0&&e.default.createElement("button",{type:"button",className:"wp-element-button",onClick:()=>h(0)},"Diaporama")),w.length===0?e.default.createElement("p",null,"Aucune esp\xE8ce ne correspond \xE0 \xAB ",p.trim()," \xBB."):e.default.createElement("table",{className:"champis-expo-table"},e.default.createElement("thead",null,e.default.createElement("tr",null,E&&e.default.createElement("th",{className:"champis-expo-no"},"N\xB0"),e.default.createElement("th",null,"Esp\xE8ce"),M&&e.default.createElement("th",{className:"champis-expo-photo"},"Photo"))),e.default.createElement("tbody",null,$.map(i=>e.default.createElement(be,{key:i.id,finding:i,hasNumbers:E,hasPhotos:M,onPhoto:()=>h(Q.get(i.id))})))),$.length<w.length&&e.default.createElement("div",{className:"champis-expo-more"},e.default.createElement("span",null,$.length," sur ",w.length),e.default.createElement("button",{type:"button",className:"wp-element-button",onClick:()=>r(i=>i+k)},"Afficher plus")),e.default.createElement("p",{className:"champis-expo-downloads"},e.default.createElement("span",null,"T\xE9l\xE9charger la liste :"),e.default.createElement("a",{href:`${j}.xlsx`},"Excel"),e.default.createElement("a",{href:`${j}.pdf`},"PDF")),m!==null&&N.length>0&&e.default.createElement(xe,{slides:N,index:Math.min(m,N.length-1),onIndex:h,onClose:()=>h(null)})))}function be({finding:t,hasNumbers:o,hasPhotos:a,onPhoto:n}){let l=t.attributes.speciesDisplay,u=t.attributes.vernacularName,s=t.attributes.photos??[];return e.default.createElement("tr",null,o&&e.default.createElement("td",{className:"champis-expo-no"},t.attributes.label??""),e.default.createElement("td",null,l?e.default.createElement(e.default.Fragment,null,e.default.createElement("a",{href:`${P()}/species/${t.attributes.gbifId}`},e.default.createElement("i",null,l.canonicalName))," ",l.author?.trim()):e.default.createElement("i",null,"Non d\xE9termin\xE9"),u&&e.default.createElement("span",{className:"champis-expo-vernacular"},u)),a&&e.default.createElement("td",{className:"champis-expo-photo"},s.length>0&&e.default.createElement("button",{type:"button",className:"champis-expo-thumb",onClick:n,"aria-label":s.length>1?`Voir les ${s.length} photos de ${A(t)}`:`Voir la photo de ${A(t)}`},s[0].thumbnailUrl?e.default.createElement("img",{src:s[0].thumbnailUrl,alt:"",width:48,height:48,loading:"lazy"}):e.default.createElement(C,{name:"image"}),s.length>1&&e.default.createElement("span",{className:"champis-expo-count"},s.length))))}function xe({slides:t,index:o,onIndex:a,onClose:n}){let l=(0,e.useRef)(null),u=(0,e.useRef)(null),s=t.length,p=t[o],g=(0,e.useCallback)(()=>a(r=>(r+1)%s),[s,a]),b=(0,e.useCallback)(()=>a(r=>(r-1+s)%s),[s,a]);(0,e.useEffect)(()=>{let r=document.activeElement,m=document.documentElement.style.overflow;return document.documentElement.style.overflow="hidden",l.current?.querySelector("button")?.focus(),()=>{document.documentElement.style.overflow=m,r?.focus?.()}},[]),(0,e.useEffect)(()=>{let r=m=>{if(m.key==="Escape")n();else if(m.key==="ArrowRight"&&s>1)g();else if(m.key==="ArrowLeft"&&s>1)b();else if(m.key==="Tab"){let h=[...l.current.querySelectorAll("button")],v=h.indexOf(document.activeElement);m.preventDefault(),h[(v+(m.shiftKey?-1:1)+h.length)%h.length]?.focus()}};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[s,g,b,n]),(0,e.useEffect)(()=>{s>1&&(new Image().src=t[(o+1)%s].url)},[t,o,s]);let y=r=>{if(!u.current||s<2)return;let m=r.changedTouches[0].clientX-u.current.x,h=r.changedTouches[0].clientY-u.current.y;u.current=null,Math.abs(m)>50&&Math.abs(m)>Math.abs(h)&&(m<0?g():b())},f=r=>r.stopPropagation();return(0,Z.createPortal)(e.default.createElement("div",{ref:l,className:"champis-expo-viewer",role:"dialog","aria-modal":"true","aria-label":`Photos de l'exposition, ${o+1} sur ${s}`,onClick:n,onTouchStart:r=>{u.current={x:r.touches[0].clientX,y:r.touches[0].clientY}},onTouchEnd:y},e.default.createElement("div",{className:"champis-expo-viewer-top"},e.default.createElement("span",null,s>1?`${o+1} / ${s}`:""),e.default.createElement("button",{type:"button","aria-label":"Fermer",onClick:n},e.default.createElement(C,{name:"close"}))),e.default.createElement("figure",null,e.default.createElement("img",{key:p.url,src:p.url,alt:p.alt,width:p.width??void 0,height:p.height??void 0,onClick:f}),e.default.createElement("figcaption",{onClick:f},p.label&&e.default.createElement(e.default.Fragment,null,p.label," \xB7 "),p.determined?e.default.createElement("i",null,p.name):p.name,p.vernacular&&e.default.createElement(e.default.Fragment,null," \xB7 ",p.vernacular))),s>1&&e.default.createElement(e.default.Fragment,null,e.default.createElement("button",{type:"button",className:"champis-expo-viewer-prev","aria-label":"Photo pr\xE9c\xE9dente",onClick:r=>{f(r),b()}},e.default.createElement(C,{name:"prev"})),e.default.createElement("button",{type:"button",className:"champis-expo-viewer-next","aria-label":"Photo suivante",onClick:r=>{f(r),g()}},e.default.createElement(C,{name:"next"})))),document.body)}document.querySelectorAll(".champis-expo").forEach(t=>{ce(),(0,_.createRoot)(t).render(e.default.createElement(de,{exhibitionId:t.getAttribute("data-exhibition-id")}))});})();

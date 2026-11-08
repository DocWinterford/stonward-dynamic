// Documentación técnica de la máquina: lista de materiales, secuencia de montaje y planos/STL.
// Lee data/doc-maquinas/<id>.json (herramientas/doc_maquinas.py) y maneja el visor por window.__visor.
import * as THREE from "three";

const $ = (s) => document.querySelector(s);
const EN = document.documentElement.lang === "en", T = (es, en) => (EN ? en : es);
const MAT_EN = { "Acero": "Steel", "Acero pavonado": "Blued steel", "Acero pulido": "Polished steel", "Acrílico": "Acrylic", "Acrílico brillante": "Glossy acrylic", "Acrílico de color": "Coloured acrylic",
  "Aluminio": "Aluminium", "Aluminio anodizado negro": "Black anodized aluminium", "Aluminio fundido": "Cast aluminium", "Azul": "Blue", "Bandeja": "Tray", "Bloque": "Block", "Brida de acero": "Steel flange",
  "Bronce": "Bronze", "Cabina": "Enclosure", "Carrete de filamento": "Filament spool", "Caucho": "Rubber", "Condensador": "Capacitor", "Conector": "Connector", "Correa GT2 (caucho con fibra)": "GT2 belt (fibre-reinforced rubber)",
  "Disco": "Disc", "Fibra de carbono": "Carbon fibre", "Filamento": "Filament", "Fuente": "Power supply", "Fundicion": "Casting", "Gabinete": "Cabinet", "Hierro fundido": "Cast iron", "Husillo": "Lead screw",
  "Impresión 3D (PETG)": "3D print (PETG)", "Inox": "Stainless steel", "Inserto": "Insert", "Latón": "Brass", "Lámina PEI": "PEI sheet", "Lámina de acero pintada": "Painted steel sheet", "Mesa": "Table",
  "Nylon (PA)": "Nylon (PA)", "Pieza": "Part", "Perfil de aluminio 2020": "2020 aluminium extrusion", "Perfil de aluminio 2040": "2040 aluminium extrusion", "Placa de aluminio": "Aluminium plate",
  "Plástico amarillo": "Yellow plastic", "Plástico blanco": "White plastic", "Plástico gris": "Grey plastic", "Plástico negro": "Black plastic", "Plástico rojo": "Red plastic", "Policarbonato ahumado": "Smoked polycarbonate",
  "Reductor (fundición)": "Gear reducer (casting)", "Riel": "Rail", "Sello": "Seal", "Silicona": "Silicone", "Tapa": "Cover", "Texto": "Text", "Verde": "Green", "Vidrio de pantalla": "Screen glass", "Vidrio templado": "Tempered glass" };
const id = new URLSearchParams(location.search).get("m") || "polarone";
const maq = (window.STONWARD_MAQUINAS || []).find((m) => m.id === id) || window.STONWARD_MAQUINAS[0];
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const mm = (d) => d.map((x) => (x >= 100 ? Math.round(x) : x)).join(" × ");
let doc = null, listo = !!(window.__visor && window.__visor.mallas);
const V = () => window.__visor;
addEventListener("visor-listo", () => { listo = true; aplicar(); });

// ---- pestañas ----
let pestana = "bom";
document.querySelectorAll(".pestanas button").forEach((b) => b.addEventListener("click", () => {
  pestana = b.dataset.p;
  document.querySelectorAll(".pestanas button").forEach((x) => x.classList.toggle("activa", x === b));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("activo", p.id === "p-" + pestana));
  aplicar();
  if (listo && pestana === "montaje") V().encuadrar();
}));

// nombre legible de cada subconjunto (eslabón)
function subconjunto(e) {
  const j = doc.eslabones[e] || {};
  if (e === "base") return T("Estructura fija", "Fixed structure");
  const tipo = j.tipo === "lineal" ? T("eje lineal", "linear axis") : j.tipo === "rotativo" ? T("eje rotativo", "rotary axis") : T("subconjunto", "subassembly");
  return `${j.nombre || e} · ${tipo}`;
}
const visible = (g) => g.visible || g.nombre;
const material = (g) => g.materiales.map((m) => (EN && MAT_EN[m]) || m).join(" · ");

fetch(`data/doc-maquinas/${maq.id}.json`).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).then((d) => {
  doc = d;
  // los grupos llegan en orden de montaje; la lista se muestra agrupada por subconjunto en ese mismo orden
  doc.grupos.forEach((g, i) => { g.paso = i + 1; });
  pintarBom(); pintarMontaje(); pintarPlanos(); aplicar();
}).catch(() => {
  $("#bom-total").textContent = T("La documentación de esta máquina todavía no está publicada.", "Documentation for this machine is not published yet.");
});

// ---- lista de materiales ----
let aislado = null;
function pintarBom() {
  const f = ($("#bom-filtro").value || "").trim().toLowerCase();
  let ult = null, filas = "", n = 0;
  doc.grupos.forEach((g) => {
    if (f && !(visible(g) + " " + material(g)).toLowerCase().includes(f)) return;
    if (g.eslabon !== ult) { ult = g.eslabon; filas += `<tr class="grupo"><td colspan="4">${esc(subconjunto(g.eslabon))}</td></tr>`; }
    n++;
    filas += `<tr data-g="${esc(g.nombre)}" class="${aislado === g.nombre ? "sel" : ""}"><td>${String(g.paso).padStart(3, "0")}</td><td>${esc(visible(g))}<small>${esc(material(g))}</small></td><td>${g.cantidad}</td><td>${mm(g.mayor)}</td></tr>`;
  });
  $("#bom-filas").innerHTML = filas || `<tr><td colspan="4">${T("Nada coincide con", "Nothing matches")} «${esc(f)}».</td></tr>`;
  $("#bom-total").textContent = T(`${doc.total.grupos} conceptos · ${doc.total.piezas} piezas · ${doc.total.cuerpos} cuerpos sólidos${f ? ` · ${n} a la vista` : ""}`, `${doc.total.grupos} items · ${doc.total.piezas} parts · ${doc.total.cuerpos} solid bodies${f ? ` · ${n} shown` : ""}`);
}
$("#bom-filtro").addEventListener("input", () => doc && pintarBom());
$("#bom-filas").addEventListener("click", (e) => {
  const tr = e.target.closest("tr[data-g]"); if (!tr) return;
  aislado = aislado === tr.dataset.g ? null : tr.dataset.g;
  pintarBom(); aplicar();
  if (listo) aislado ? V().encuadrarA(new Set([aislado])) : V().encuadrar();
});
$("#bom-csv").addEventListener("click", () => {
  if (!doc) return;
  const c = (t) => `"${String(t).replace(/"/g, '""')}"`;
  const filas = [EN ? ["No", "Part", "Quantity", "Material", "Largest size (mm)", "Subassembly", "STL files"] : ["No", "Pieza", "Cantidad", "Material", "Medida mayor (mm)", "Subconjunto", "Archivos STL"]]
    .concat(doc.grupos.map((g) => [g.paso, visible(g), g.cantidad, material(g), mm(g.mayor), subconjunto(g.eslabon), g.archivos.join(" ")]));
  bajar(new Blob(["﻿" + filas.map((r) => r.map(c).join(",")).join("\r\n")], { type: "text/csv" }), `${maq.nombre}-${T("lista-de-materiales", "bill-of-materials")}.csv`);
});

// ---- montaje ----
let paso = 0, reproduciendo = null;
function pintarMontaje() {
  let ult = null, html = "";
  doc.grupos.forEach((g, i) => {
    if (g.eslabon !== ult) { ult = g.eslabon; html += `<li class="sub">${esc(subconjunto(g.eslabon))}</li>`; }
    html += `<li data-i="${i + 1}"><i>${i + 1}</i><span>${esc(visible(g))} <small>× ${g.cantidad} · ${esc(material(g))}</small></span></li>`;
  });
  $("#m-lista").innerHTML = html;
  $("#m-barra").max = doc.grupos.length;
}
function irA(n) {
  paso = Math.max(0, Math.min(doc.grupos.length, n));
  $("#m-barra").value = paso;
  const g = doc.grupos[paso - 1];
  $("#m-num").textContent = T(`Paso ${paso} de ${doc.grupos.length}`, `Step ${paso} of ${doc.grupos.length}`);
  $("#m-titulo").textContent = g ? `${T("Montar", "Fit")} ${visible(g)}${g.cantidad > 1 ? ` (× ${g.cantidad})` : ""}` : T("Banco vacío: empieza por la estructura fija", "Empty bench: start with the fixed structure");
  document.querySelectorAll("#m-lista li[data-i]").forEach((li) => { const i = +li.dataset.i; li.className = i < paso ? "hecho" : i === paso ? "actual" : "futuro"; });
  aplicar();
}
$("#m-ant").addEventListener("click", () => { parar(); irA(paso - 1); });
$("#m-sig").addEventListener("click", () => { parar(); irA(paso + 1); });
$("#m-barra").addEventListener("input", (e) => { parar(); irA(+e.target.value); });
$("#m-todo").addEventListener("click", () => { parar(); irA(doc.grupos.length); });
$("#m-lista").addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) { parar(); irA(+li.dataset.i); } });
function parar() { clearInterval(reproduciendo); reproduciendo = null; $("#m-reproducir").textContent = T("Reproducir", "Play"); }
$("#m-reproducir").addEventListener("click", () => {
  if (reproduciendo) return parar();
  if (paso >= doc.grupos.length) irA(0);
  $("#m-reproducir").textContent = T("Pausa", "Pause");
  reproduciendo = setInterval(() => { if (paso >= doc.grupos.length) parar(); else irA(paso + 1); }, 900);
});

// Manual de montaje imprimible: una foto del visor por paso, con la pieza nueva en cobre.
$("#m-manual").addEventListener("click", async (e) => {
  if (!listo || !doc) return;
  const b = e.currentTarget, antes = paso, cuadro = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  parar(); V().encuadrar(); V().controls.autoRotate = false;
  const fotos = [];
  for (let i = 1; i <= doc.grupos.length; i++) {
    b.textContent = T(`Preparando ${i} de ${doc.grupos.length}…`, `Preparing ${i} of ${doc.grupos.length}…`);
    irA(i); await cuadro();
    const src = V().renderer.domElement, c = document.createElement("canvas");
    c.width = 640; c.height = Math.round(640 * src.height / src.width);
    const x = c.getContext("2d"); x.fillStyle = "#f2f1ed"; x.fillRect(0, 0, c.width, c.height); x.drawImage(src, 0, 0, c.width, c.height);
    fotos.push(c.toDataURL("image/jpeg", 0.85));
  }
  irA(antes); b.textContent = T("Manual de montaje (PDF)", "Assembly manual (PDF)");
  const filas = doc.grupos.map((g, i) => `
    ${i === 0 || doc.grupos[i - 1].eslabon !== g.eslabon ? `<h2>${esc(subconjunto(g.eslabon))}</h2>` : ""}
    <section class="paso"><img src="${fotos[i]}" alt=""><div><b>${T("Paso", "Step")} ${i + 1}</b><h3>${T("Montar", "Fit")} ${esc(visible(g))}${g.cantidad > 1 ? ` × ${g.cantidad}` : ""}</h3>
    <p>${esc(material(g))}</p><p class="m">${T("Medida mayor", "Largest size")} ${mm(g.mayor)} mm</p></div></section>`).join("");
  const w = open("", "_blank");
  if (!w) { alert(T("Permite ventanas emergentes para generar el manual.", "Allow pop-up windows to generate the manual.")); return; }
  w.document.write(`<!doctype html><html lang="${EN ? "en" : "es"}"><head><meta charset="utf-8"><title>${esc(maq.nombre)} · ${T("Manual de montaje", "Assembly manual")}</title>
  <style>body{font:14px Montserrat,Segoe UI,sans-serif;color:#0b1626;margin:24px}h1{font-size:30px;margin:0}h1+p{color:#4a4d52;margin:4px 0 18px}
  h2{font:600 12px monospace;letter-spacing:.16em;text-transform:uppercase;color:#3d5372;border-bottom:1px solid #ccc;padding:14px 0 6px;margin:10px 0 0}
  .paso{display:grid;grid-template-columns:260px 1fr;gap:16px;align-items:center;padding:10px 0;border-bottom:1px solid #e3e3e3;break-inside:avoid}
  .paso img{width:260px;border:1px solid #ddd;background:#f2f1ed}.paso b{font:600 11px monospace;letter-spacing:.14em;color:#b57a4f;text-transform:uppercase}
  .paso h3{margin:4px 0;font-size:17px}.paso p{margin:2px 0;color:#4a4d52}.m{font:12px monospace}@page{margin:14mm}</style></head>
  <body><h1>${esc(maq.nombre)} · ${T("Manual de montaje", "Assembly manual")}</h1><p>${esc(maq.modelo)} · ${doc.grupos.length} ${T("pasos", "steps")} · Stonward Dynamics</p>${filas}
  <script>addEventListener("load",()=>setTimeout(()=>print(),400))<\/script></body></html>`);
  w.document.close();
});

// ---- estado del visor según la pestaña ----
function aplicar() {
  const aviso = $("#aviso");
  if (!listo || !doc) return;
  if (pestana === "montaje") {
    const hasta = new Map(doc.grupos.map((g) => [g.nombre, g.paso]));
    V().modos((n) => { const p = hasta.get(n) ?? 0; return p > paso ? "oculto" : p === paso ? "foco" : "normal"; });
    const g = doc.grupos[paso - 1];
    aviso.innerHTML = g ? `<b>${T("Paso", "Step")} ${paso}</b> · ${esc(visible(g))}` : "";
  } else if (pestana === "bom" && aislado) {
    V().modos((n) => (n === aislado ? "foco" : "fantasma"));
    const g = doc.grupos.find((x) => x.nombre === aislado);
    aviso.innerHTML = `<b>${esc(visible(g))}</b> · ${g.cantidad} ${T("pz", "pcs")} · ${esc(material(g))}`;
  } else { V().modos(null); aviso.innerHTML = ""; }
}

// ---- planos y archivos ----
function pintarPlanos() {
  let ult = null, html = "";
  doc.grupos.forEach((g, i) => {
    if (g.eslabon !== ult) { ult = g.eslabon; html += `<li><span class="sub">${esc(subconjunto(g.eslabon))}</span></li>`; }
    html += `<li><span>${esc(visible(g))}<small>${mm(g.mayor)} mm · ${g.archivos.length} STL</small></span><button class="btn chico" data-plano="${i}">${T("Plano", "Drawing")}</button><button class="btn chico" data-stl="${i}">STL</button></li>`;
  });
  $("#pl-lista").innerHTML = html;
}
$("#pl-lista").addEventListener("click", async (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (!listo) { b.textContent = T("Cargando…", "Loading…"); await new Promise((r) => addEventListener("visor-listo", r, { once: true })); }
  if (b.dataset.plano) plano(doc.grupos[+b.dataset.plano]);
  if (b.dataset.stl) {
    const g = doc.grupos[+b.dataset.stl], zip = V().zip, base = `${maq.nombre}-${visible(g)}`.replace(/[^\w.-]+/g, "_");
    if (g.archivos.length === 1) return bajar(new Blob([await zip.file(g.archivos[0]).async("arraybuffer")], { type: "model/stl" }), base + ".stl");
    const z = new JSZip();
    for (const a of g.archivos) z.file(a.split("/").pop(), await zip.file(a).async("arraybuffer"));
    bajar(await z.generateAsync({ type: "blob" }), base + ".zip");
  }
});
function bajar(blob, nombre) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nombre;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// Plano A3 apaisado: tres vistas ortogonales en primer diedro (europeo) con cotas generales y cajetín.
let rPlano = null;
function plano(g) {
  const W = 2339, H = 1654, M = 60;            // A3 a ~200 ppp
  const cv = $("#plano-lienzo"), x = cv.getContext("2d");
  rPlano ||= new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  const escena = new THREE.Scene(), pieza = new THREE.Group(); escena.add(pieza);
  const relleno = new THREE.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const trazo = new THREE.LineBasicMaterial({ color: 0x0b1626 });
  V().mallas.filter((m) => m.userData.nombre === g.nombre).forEach((m) => {
    const mat = new THREE.Matrix4().compose(m.userData.base || m.position, m.quaternion, m.scale);
    const a = new THREE.Mesh(m.geometry, relleno); a.applyMatrix4(mat); pieza.add(a);
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 28), trazo); l.applyMatrix4(mat); pieza.add(l);
  });
  const caja = new THREE.Box3().setFromObject(pieza), tam = caja.getSize(new THREE.Vector3()), cen = caja.getCenter(new THREE.Vector3());
  // vistas (dir = lado donde está el observador): frontal desde -Y, superior desde +Z, lateral izquierda desde -X
  const vistas = [
    { t: T("Vista frontal", "Front view"), dir: [0, -1, 0], up: [0, 0, 1], w: tam.x, h: tam.z, cw: "X", ch: "Z" },
    { t: T("Vista superior", "Top view"), dir: [0, 0, 1], up: [0, 1, 0], w: tam.x, h: tam.y, cw: "X", ch: "Y" },
    { t: T("Vista lateral izquierda", "Left side view"), dir: [-1, 0, 0], up: [0, 0, 1], w: tam.y, h: tam.z, cw: "Y", ch: "Z" },
  ];
  // escala normalizada común a las tres vistas
  const areaW = (W - 2 * M - 120) / 2, areaH = (H - 2 * M - 300) / 2;
  const bruta = Math.min(areaW / Math.max(tam.x, tam.y, 1), areaH / Math.max(tam.z, tam.y, 1)) * 0.86;
  const normas = [10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005];   // escalas ISO 5455
  const ppm = 200 / 25.4;                          // px por mm de papel
  const factor = normas.find((k) => k * ppm <= bruta * 1.001) || 0.01;   // 1 mm real = factor mm de papel
  const s = factor * ppm;

  x.fillStyle = "#fff"; x.fillRect(0, 0, W, H);
  x.strokeStyle = "#0b1626"; x.lineWidth = 3; x.strokeRect(M, M, W - 2 * M, H - 2 * M);
  x.lineWidth = 1; x.strokeRect(M + 12, M + 12, W - 2 * M - 24, H - 2 * M - 24);
  const celdas = [[M + 12, M + 12], [M + 12 + areaW + 60, M + 12], [M + 12, M + 12 + areaH + 40]];
  // primer diedro: frontal arriba izquierda, superior debajo, lateral izquierda a la derecha de la frontal
  const pos = [celdas[0], celdas[2], celdas[1]];
  vistas.forEach((v, i) => {
    const pw = Math.max(4, Math.round(v.w * s)), ph = Math.max(4, Math.round(v.h * s));
    rPlano.setSize(pw, ph, false);
    const cam = new THREE.OrthographicCamera(-v.w / 2, v.w / 2, v.h / 2, -v.h / 2, -1e5, 1e5);
    cam.up.set(...v.up); cam.position.copy(cen).addScaledVector(new THREE.Vector3(...v.dir), Math.max(tam.x, tam.y, tam.z) * 2 + 10);
    cam.lookAt(cen); cam.updateProjectionMatrix();
    rPlano.setClearColor(0xffffff, 0); rPlano.render(escena, cam);
    const [cx, cy] = pos[i], ox = cx + (areaW - pw) / 2 + 40, oy = cy + (areaH - ph) / 2 + 30;
    x.drawImage(rPlano.domElement, ox, oy, pw, ph);
    x.fillStyle = "#3d5372"; x.font = "600 22px Montserrat, sans-serif"; x.fillText(v.t.toUpperCase(), cx + 20, cy + 34);
    cota(x, ox, oy + ph + 30, ox + pw, oy + ph + 30, `${redondo(v.w)}`);          // ancho
    cota(x, ox - 30, oy + ph, ox - 30, oy, `${redondo(v.h)}`, true);             // alto
  });
  // cajetín
  const cw = 900, ch = 220, bx = W - M - 12 - cw, by = H - M - 12 - ch;
  x.strokeStyle = "#0b1626"; x.lineWidth = 2; x.strokeRect(bx, by, cw, ch);
  [[0, 70, cw, 70], [0, 140, cw, 140], [450, 70, 450, ch], [675, 140, 675, ch]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(bx + a, by + b); x.lineTo(bx + c, by + d); x.stroke(); });
  const txt = (t, px, py, f) => { x.font = f; x.fillText(t, bx + px, by + py); };
  x.fillStyle = "#0b1626";
  txt("STONWARD DYNAMICS", 20, 46, "700 30px Montserrat, sans-serif");
  txt(visible(g), 20, 116, ajusta(x, visible(g), 420, 600, 24));
  txt(`${maq.nombre} · ${subconjunto(g.eslabon)}`, 470, 116, ajusta(x, `${maq.nombre} · ${subconjunto(g.eslabon)}`, 410, 400, 20));
  x.fillStyle = "#8a8d92"; txt("MATERIAL", 20, 166, "500 15px 'JetBrains Mono', monospace"); txt(T("CANT.", "QTY"), 470, 166, "500 15px 'JetBrains Mono', monospace"); txt(T("ESCALA", "SCALE"), 695, 166, "500 15px 'JetBrains Mono', monospace");
  x.fillStyle = "#0b1626";
  txt(material(g), 20, 200, ajusta(x, material(g), 430, 400, 19));
  txt(String(g.cantidad), 470, 200, "600 22px Montserrat, sans-serif");
  txt(factor >= 1 ? `${factor}:1` : `1:${Math.round(1 / factor)}`, 695, 200, "600 22px Montserrat, sans-serif");
  x.fillStyle = "#8a8d92"; x.font = "400 16px 'JetBrains Mono', monospace";
  x.fillText(`${T("Cotas en mm · primer diedro · medidas generales del conjunto", "Dimensions in mm · first-angle projection · overall dimensions")} · ${new Date().toISOString().slice(0, 10)}`, M + 24, H - M - 24);

  $("#plano-titulo").textContent = `${maq.nombre} · ${visible(g)}`;
  $("#plano").hidden = false;
  $("#plano-png").onclick = () => cv.toBlob((b) => bajar(b, `${maq.nombre}-${visible(g)}-${T("plano", "drawing")}.png`.replace(/[^\w.-]+/g, "_")));
}
const redondo = (v) => (v >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
// tamaño de letra que hace caber el texto en su celda del cajetín
function ajusta(x, t, max, peso, px) { for (; px > 11; px--) { x.font = `${peso} ${px}px Montserrat, sans-serif`; if (x.measureText(t).width <= max) break; } return x.font; }
function cota(x, x1, y1, x2, y2, t, vertical) {
  x.strokeStyle = "#b57a4f"; x.fillStyle = "#b57a4f"; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke();
  const flecha = (px, py, ang) => { x.beginPath(); x.moveTo(px, py); x.lineTo(px - 14 * Math.cos(ang - 0.3), py - 14 * Math.sin(ang - 0.3)); x.lineTo(px - 14 * Math.cos(ang + 0.3), py - 14 * Math.sin(ang + 0.3)); x.closePath(); x.fill(); };
  const a = Math.atan2(y2 - y1, x2 - x1); flecha(x2, y2, a); flecha(x1, y1, a + Math.PI);
  x.font = "500 20px 'JetBrains Mono', monospace"; x.textAlign = "center";
  if (vertical) { x.save(); x.translate((x1 + x2) / 2 - 10, (y1 + y2) / 2); x.rotate(-Math.PI / 2); x.fillText(t, 0, 0); x.restore(); }
  else x.fillText(t, (x1 + x2) / 2, y1 - 10);
  x.textAlign = "left";
}
$("#plano-cerrar").addEventListener("click", () => { $("#plano").hidden = true; });
$("#plano").addEventListener("click", (e) => { if (e.target.id === "plano") $("#plano").hidden = true; });
addEventListener("keydown", (e) => { if (e.key === "Escape") $("#plano").hidden = true; });

// Rutas y lecciones de Educación, desde data/cursos.js. El avance se recuerda solo en este navegador.
(() => {
  const C = window.SM_CURSOS || [];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const EN = document.documentElement.lang === "en", T = (es, en) => (EN ? en : es);
  const HERR_EN = { "acabado--chaflan": "Chamfer", "acabado--fillet-concavo": "Concave fillet", "acabado--fillet-convexo": "Convex fillet", "anotacion--cota": "Dimension", "anotacion--medir": "Measure",
    "anotacion--propiedades-fisicas": "Physical properties", "anotacion--relaciones": "Relations", "anotacion--ver-grados-de-libertad": "Show degrees of freedom", "chapa--brida-base": "Base flange",
    "chapa--brida-de-arista": "Edge flange", "chapa--desplegar": "Unfold", "chapa--doblar": "Fold", "corte--corte-extruido": "Extruded cut", "corte--corte-por-revolucion": "Revolved cut", "corte--vaciado": "Shell",
    "editar--extender": "Extend", "editar--recortar": "Trim", "ensamble--actuadores-motores": "Actuators (motors)", "ensamble--fijar-liberar": "Fix/Release", "ensamble--guardar-ensamble": "Save assembly",
    "ensamble--insertar-pieza": "Insert part", "ensamble--nuevo-ensamble": "New assembly", "herramientas-de-dibujo-croquis--arco": "Arc", "herramientas-de-dibujo-croquis--circulo": "Circle",
    "herramientas-de-dibujo-croquis--linea": "Line", "herramientas-de-dibujo-croquis--poligono": "Polygon", "herramientas-de-dibujo-croquis--rectangulo": "Rectangle", "herramientas-de-dibujo-croquis--seleccionar": "Select",
    "material--propiedades": "Material properties", "mecanizado--rosca-de-tornillo": "Screw thread", "mecanizado--taladro": "Hole", "mecanizado--taladro-roscado": "Tapped hole",
    "operaciones--editar-ultima-operacion-de-la-pieza": "Edit last feature", "operaciones--extruir-contorno-recto": "Straight extrude", "operaciones--revolucion-usa-el-perfil": "Revolve",
    "patrones--matriz-circular": "Circular pattern", "patrones--matriz-lineal": "Linear pattern", "patrones--simetria": "Mirror", "referencia--eje-de-referencia": "Reference axis",
    "transformaciones--copiar-punto-base": "Copy with base point", "transformaciones--mover-punto-base": "Move with base point", "transformaciones--simetria-de-trazos": "Mirror strokes",
    barra: "Toolbar", lateral: "Side menu", visor: "3D viewer", gestor: "Project manager", estado: "Status bar" };
  const ZONAS = { barra: "Barra de herramientas", lateral: "Menú lateral", visor: "Visor 3D", gestor: "Gestor de proyectos", estado: "Barra de estado" };
  const ACENTOS = { linea: "línea", circulo: "círculo", rectangulo: "rectángulo", poligono: "polígono", revolucion: "revolución", simetria: "simetría", operacion: "operación", ultima: "última", chaflan: "chaflán", concavo: "cóncavo", extruido: "extruido", revolucionar: "revolucionar", grados: "grados" };
  const nombreHerr = (a) => (EN && HERR_EN[a]) || ZONAS[a] || (a.split("--")[1] || a).split("-").map((w) => ACENTOS[w] || w).join(" ").replace(/^./, (c) => c.toUpperCase());
  // dibujo técnico de cada lección (js/figuras-edu.js)
  const FIG_EN = [["Antes: clic en el tramo marcado", "Before: click the marked segment"], ["BRIDA · MATRIZ CIRCULAR DE 8", "FLANGE · CIRCULAR PATTERN OF 8"], ["DESARROLLO PLANO · LÍNEAS DE DOBLEZ PUNTEADAS", "FLAT PATTERN · BEND LINES DASHED"],
    ["DISTANCIA ENTRE CENTROS", "CENTRE DISTANCE"], [">Después<", ">After<"], ["EJE ESCALONADO · REVOLUCIÓN DEL MEDIO PERFIL", "STEPPED SHAFT · REVOLVED HALF PROFILE"], ["M8 × 1,25", "M8 × 1.25"], ["Nervio 30 × 30", "Rib 30 × 30"],
    ["PLACA EXTRUIDA · CORTE PASANTE", "EXTRUDED PLATE · THROUGH CUT"], ["RANURA · CENTROS A 50 mm", "SLOT · CENTRES 50 mm APART"], [">RECORTAR<", ">TRIM<"], ["SOPORTE EN L · VISTA FRONTAL", "L BRACKET · FRONT VIEW"],
    ["TUERCA HEXAGONAL M8", "M8 HEX NUT"], ["VISTA SUPERIOR", "TOP VIEW"], ["m1,5", "m1.5"]];
  const figura = (k) => { let t = window.SM_FIGURAS[k](); if (EN) { FIG_EN.forEach(([a, b]) => { t = t.split(a).join(b); }); t = t.replace(/>([^<]*)</g, (m, x) => ">" + x.replace(/(\d),(\d)/g, "$1.$2") + "<"); } return t; };
  const FIG = { f2: "ele", f3: "ranura", f4: "ele", f5: "recortar", s1: "placa", s2: "eje", s3: "placa", s5: "brida", c1: "soporte", c2: "brida", c3: "engranes", c5: "hex", c6: "chapa" };
  let hechas = {};
  try { hechas = JSON.parse(localStorage.getItem("sm-educacion") || "{}"); } catch (e) {}
  const guardar = () => { try { localStorage.setItem("sm-educacion", JSON.stringify(hechas)); } catch (e) {} };
  const dur = (m) => (m >= 60 ? `${Math.round(m / 6) / 10} h` : `${m} min`);

  document.getElementById("rutas").innerHTML = C.map((r, i) => `
    <a class="ruta" href="#${r.id}"><span class="rotulo tenue">${T("Ruta", "Path")} ${String(i + 1).padStart(2, "0")} · ${esc(r.nivel)}</span>
      <h3>${esc(r.titulo)}</h3><p>${esc(r.resumen)}</p>
      <span class="rotulo avance" data-ruta="${r.id}"></span></a>`).join("");

  document.getElementById("cursos").innerHTML = C.map((r, i) => `
    <section class="franja" id="${r.id}">
      <div class="franja-cab"><span class="rotulo">${String(i + 1).padStart(2, "0")} / ${esc(r.titulo)}</span><span class="rotulo tenue">${esc(r.nivel)} · ${r.lecciones.length} ${T("lecciones", "lessons")}</span></div>
      ${r.lecciones.map((l, j) => l.listo ? `
        <details class="despliegue leccion" id="${l.id}">
          <summary><span><i>${String(j + 1).padStart(2, "0")}</i>${esc(l.titulo)}</span><span class="rotulo tenue">${dur(l.minutos)}</span></summary>
          <div class="contenido">
            <p class="objetivo"><b>${T("Lo que vas a lograr.", "What you will achieve.")}</b> ${esc(l.objetivo)}</p>
            ${FIG[l.id] && window.SM_FIGURAS ? `<figure class="figura">${figura(FIG[l.id])}</figure>` : ""}
            <ol class="pasos">${l.pasos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
            ${l.herr.length ? `<p class="rotulo tenue" style="margin:22px 0 8px">${T("Herramientas de esta lección", "Tools in this lesson")}</p>
            <div class="herr-chips">${l.herr.map((a) => `<a href="${EN ? "manual-en.html" : "manual.html"}#${a}">${esc(nombreHerr(a))}</a>`).join("")}</div>` : ""}
            <p class="reto"><b>${T("Reto.", "Challenge.")}</b> ${esc(l.reto)}</p>
            <label class="hecha"><input type="checkbox" data-l="${l.id}"${hechas[l.id] ? " checked" : ""}> ${T("Lección completada", "Lesson completed")}</label>
          </div>
        </details>` : `
        <div class="leccion pronto"><span><i>${String(j + 1).padStart(2, "0")}</i>${esc(l.titulo)}</span><span class="rotulo tenue">${T("En preparación", "In preparation")}</span></div>`).join("")}
    </section>`).join("");

  const avance = () => C.forEach((r) => {
    const listas = r.lecciones.filter((l) => l.listo), n = listas.filter((l) => hechas[l.id]).length;
    document.querySelector(`[data-ruta="${r.id}"]`).textContent = listas.length ? T(`${n} de ${listas.length} completadas`, `${n} of ${listas.length} completed`) : T("Próximamente", "Coming soon");
  });
  document.addEventListener("change", (e) => { const l = e.target.dataset && e.target.dataset.l; if (l) { hechas[l] = e.target.checked; guardar(); avance(); } });
  avance();
  // abrir la lección del enlace (#f3)
  const abrir = () => { const d = document.getElementById(location.hash.slice(1)); if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView(); } };
  addEventListener("hashchange", abrir); abrir();
})();

// Rutas y lecciones de Educación, desde data/cursos.js. El avance se recuerda solo en este navegador.
(() => {
  const C = window.SM_CURSOS || [];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const ZONAS = { barra: "Barra de herramientas", lateral: "Menú lateral", visor: "Visor 3D", gestor: "Gestor de proyectos", estado: "Barra de estado" };
  const ACENTOS = { linea: "línea", circulo: "círculo", rectangulo: "rectángulo", poligono: "polígono", revolucion: "revolución", simetria: "simetría", operacion: "operación", ultima: "última", chaflan: "chaflán", concavo: "cóncavo", extruido: "extruido", revolucionar: "revolucionar", grados: "grados" };
  const nombreHerr = (a) => ZONAS[a] || (a.split("--")[1] || a).split("-").map((w) => ACENTOS[w] || w).join(" ").replace(/^./, (c) => c.toUpperCase());
  let hechas = {};
  try { hechas = JSON.parse(localStorage.getItem("sm-educacion") || "{}"); } catch (e) {}
  const guardar = () => { try { localStorage.setItem("sm-educacion", JSON.stringify(hechas)); } catch (e) {} };
  const dur = (m) => (m >= 60 ? `${Math.round(m / 6) / 10} h` : `${m} min`);

  document.getElementById("rutas").innerHTML = C.map((r, i) => `
    <a class="ruta" href="#${r.id}"><span class="rotulo tenue">Ruta ${String(i + 1).padStart(2, "0")} · ${esc(r.nivel)}</span>
      <h3>${esc(r.titulo)}</h3><p>${esc(r.resumen)}</p>
      <span class="rotulo avance" data-ruta="${r.id}"></span></a>`).join("");

  document.getElementById("cursos").innerHTML = C.map((r, i) => `
    <section class="franja" id="${r.id}">
      <div class="franja-cab"><span class="rotulo">${String(i + 1).padStart(2, "0")} / ${esc(r.titulo)}</span><span class="rotulo tenue">${esc(r.nivel)} · ${r.lecciones.length} lecciones</span></div>
      ${r.lecciones.map((l, j) => l.listo ? `
        <details class="despliegue leccion" id="${l.id}">
          <summary><span><i>${String(j + 1).padStart(2, "0")}</i>${esc(l.titulo)}</span><span class="rotulo tenue">${dur(l.minutos)}</span></summary>
          <div class="contenido">
            <p class="objetivo"><b>Lo que vas a lograr.</b> ${esc(l.objetivo)}</p>
            <ol class="pasos">${l.pasos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
            ${l.herr.length ? `<p class="rotulo tenue" style="margin:22px 0 8px">Herramientas de esta lección</p>
            <div class="herr-chips">${l.herr.map((a) => `<a href="manual.html#${a}">${esc(nombreHerr(a))}</a>`).join("")}</div>` : ""}
            <p class="reto"><b>Reto.</b> ${esc(l.reto)}</p>
            <label class="hecha"><input type="checkbox" data-l="${l.id}"${hechas[l.id] ? " checked" : ""}> Lección completada</label>
          </div>
        </details>` : `
        <div class="leccion pronto"><span><i>${String(j + 1).padStart(2, "0")}</i>${esc(l.titulo)}</span><span class="rotulo tenue">En preparación</span></div>`).join("")}
    </section>`).join("");

  const avance = () => C.forEach((r) => {
    const listas = r.lecciones.filter((l) => l.listo), n = listas.filter((l) => hechas[l.id]).length;
    document.querySelector(`[data-ruta="${r.id}"]`).textContent = listas.length ? `${n} de ${listas.length} completadas` : "Próximamente";
  });
  document.addEventListener("change", (e) => { const l = e.target.dataset && e.target.dataset.l; if (l) { hechas[l] = e.target.checked; guardar(); avance(); } });
  avance();
  // abrir la lección del enlace (#f3)
  const abrir = () => { const d = document.getElementById(location.hash.slice(1)); if (d && d.tagName === "DETAILS") { d.open = true; d.scrollIntoView(); } };
  addEventListener("hashchange", abrir); abrir();
})();

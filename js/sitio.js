// Stonward Dynamics — comportamiento del sitio (sin dependencias)
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- navegación: fondo al bajar y menú en celular ----
  const nav = $("#nav");
  if (nav) {
    const fondo = () => nav.classList.toggle("solida", scrollY > 30 || !$(".portada"));
    addEventListener("scroll", fondo, { passive: true }); fondo();
    const menu = $("#nav-menu");
    if (menu) menu.addEventListener("click", () => nav.classList.toggle("abierta"));
    nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("abierta")));
  }
  const anio = $("#anio"); if (anio) anio.textContent = new Date().getFullYear();

  // ---- máquinas ----
  const lista = $("#lista-maquinas");
  if (lista && window.STONWARD_MAQUINAS) {
    STONWARD_MAQUINAS.forEach((m, i) => {
      const disp = m.estado === "disponible";
      const el = document.createElement("article");
      el.className = `tarjeta aparece d${(i % 3) + 1}`;
      el.innerHTML = `
        <div class="medio">
          <span class="sello ${disp ? "vivo" : "pronto"}">${disp ? (m.porDefecto ? "Por defecto" : "Disponible") : "En desarrollo"}</span>
          ${m.imagen ? `<img src="${m.imagen}" alt="${m.nombre}" loading="lazy">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:var(--texto-3);font-family:var(--mono);font-size:13px">${dibujoDelta()}</div>`}
        </div>
        <div class="cuerpo">
          <span class="num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${m.nombre}</h3>
          <span class="cat">${m.modelo}</span>
          <p>${m.resumen}</p>
          <dl class="datos">${m.datos.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
          <div class="pie">
            ${disp ? `<a class="btn chico primario" href="maquina.html?m=${m.id}">Ver en 3D</a><a class="btn chico" href="${m.paquete}" download>Descargar paquete</a>` : `<span class="enlace">Pronto en 3D</span>`}
          </div>
        </div>`;
      lista.appendChild(el);
    });
    const mas = document.createElement("article");
    mas.className = "tarjeta aparece";
    mas.style.cssText = "border-style:dashed;background:transparent;justify-content:center";
    mas.innerHTML = `<div class="cuerpo" style="justify-content:center;gap:12px">
      <span class="cat">Más máquinas</span><h3>¿Necesitas otra?</h3>
      <p>Las máquinas por defecto vienen con SolidMaker. Las nuevas se publican aquí como paquete: descárgalo e instálalo desde MACHIN con «Adquirir nueva máquina».</p></div>`;
    lista.appendChild(mas);
  }
  function dibujoDelta() {
    return `<svg viewBox="0 0 200 160" width="70%" fill="none" stroke="#3a3f46" stroke-width="2"><path d="M40 20v120M100 10v130M160 20v120"/><path d="M40 60l50 40M100 50l-10 50M160 60l-50 40" stroke="#ff9d3d"/><circle cx="100" cy="104" r="8" stroke="#ff9d3d"/><ellipse cx="100" cy="140" rx="70" ry="10"/></svg>`;
  }

  // ---- repositorio de artículos ----
  const listaArt = $("#lista-articulos"), filtros = $("#filtros");
  if (listaArt && window.STONWARD_ARTICULOS) {
    const NOMBRE = { todos: "Todos", robotica: "Robótica", microbiologia: "Microbiología", bionica: "Biónica", ia: "IA", fabricacion: "Fabricación", software: "Software" };
    let area = "todos", texto = "";
    const pintar = () => {
      const q = texto.toLowerCase();
      const vis = STONWARD_ARTICULOS.filter((a) => (area === "todos" || a.area === area) && (!q || (a.titulo + a.autores + a.usa).toLowerCase().includes(q)));
      listaArt.innerHTML = vis.length ? vis.map((a) => `
        <${a.enlace ? `a href="${a.enlace}" target="_blank" rel="noopener"` : "div"} class="articulo">
          <span class="area-tag">${NOMBRE[a.area] || a.area}</span>
          <div><h4>${a.titulo}</h4><p>${a.autores} · ${a.fuente}</p><div class="usa">${a.usa}</div></div>
          <span class="mono" style="color:var(--texto-3);font-size:12px">${a.enlace ? "Abrir ↗" : ""}</span>
        </${a.enlace ? "a" : "div"}>`).join("") : `<p style="color:var(--texto-3)">No hay documentos en esta área todavía.</p>`;
    };
    Object.keys(NOMBRE).forEach((k) => {
      const b = document.createElement("button"); b.className = "filtro" + (k === "todos" ? " activo" : ""); b.textContent = NOMBRE[k];
      b.addEventListener("click", () => { area = k; filtros.querySelectorAll(".filtro").forEach((x) => x.classList.toggle("activo", x === b)); pintar(); });
      filtros.appendChild(b);
    });
    const busc = document.createElement("input"); busc.className = "buscador"; busc.placeholder = "Buscar en el repositorio…";
    busc.addEventListener("input", () => { texto = busc.value; pintar(); });
    filtros.appendChild(busc);
    pintar();
  }

  // ---- aparición al bajar ----
  const obs = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  document.querySelectorAll(".aparece").forEach((el) => (obs && !quieto ? obs.observe(el) : el.classList.add("visible")));

  // ---- índice del manual: resalta la sección visible ----
  const indice = document.querySelectorAll(".indice a[href^='#']");
  if (indice.length && "IntersectionObserver" in window) {
    const porId = new Map([...indice].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { indice.forEach((a) => a.classList.remove("activo")); const a = porId.get(e.target.id); if (a) a.classList.add("activo"); } }), { rootMargin: "-20% 0px -70% 0px" });
    porId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  // ---- portada: campo de nodos que se conectan y siguen al cursor ----
  const cv = $("#lienzo-portada");
  if (cv) {
    const cx = cv.getContext("2d"); let W, H, dpr, pts = [], mx = -1e4, my = -1e4;
    const tam = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(120, (W * H) / 11000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.6 + 0.6, a: Math.random() < 0.12 }));
    };
    addEventListener("resize", tam); tam();
    addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
    let t = 0;
    const cuadro = () => {
      t += 0.004;
      cx.clearRect(0, 0, W, H);
      // anillos polares a la derecha, girando lento
      const ox = W * 0.78, oy = H * 0.48, R = Math.min(W, H) * 0.42;
      cx.lineWidth = 1;
      for (let k = 1; k <= 5; k++) { cx.strokeStyle = `rgba(255,255,255,${0.035 + k * 0.006})`; cx.beginPath(); cx.arc(ox, oy, (R * k) / 5, 0, Math.PI * 2); cx.stroke(); }
      for (let k = 0; k < 12; k++) { const a = t + (k * Math.PI) / 6; cx.strokeStyle = "rgba(255,255,255,.04)"; cx.beginPath(); cx.moveTo(ox, oy); cx.lineTo(ox + Math.cos(a) * R, oy + Math.sin(a) * R); cx.stroke(); }
      const ab = t * 3; cx.strokeStyle = "rgba(255,157,61,.55)"; cx.lineWidth = 2; cx.beginPath(); cx.arc(ox, oy, R * 0.6, ab, ab + 0.9); cx.stroke();
      cx.fillStyle = "#ff9d3d"; cx.beginPath(); cx.arc(ox + Math.cos(ab + 0.9) * R * 0.6, oy + Math.sin(ab + 0.9) * R * 0.6, 3.5, 0, Math.PI * 2); cx.fill();
      // nodos
      for (const p of pts) {
        if (!quieto) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) { const f = (1 - Math.sqrt(d2) / 140) * 0.6; p.x += (dx / Math.sqrt(d2 + 1)) * f; p.y += (dy / Math.sqrt(d2 + 1)) * f; }
      }
      cx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) { cx.strokeStyle = `rgba(200,205,212,${(1 - d / 130) * 0.16})`; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
      }
      for (const p of pts) { cx.fillStyle = p.a ? "rgba(255,157,61,.9)" : "rgba(220,224,230,.55)"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fill(); }
      if (!quieto) requestAnimationFrame(cuadro);
    };
    cuadro();
  }

  // ---- MIA: holograma de puntos (esfera que respira, con líneas de barrido) ----
  const hm = $("#lienzo-mia");
  if (hm) {
    const cx = hm.getContext("2d"); let W, H, dpr;
    const N = 900, esf = Array.from({ length: N }, (_, i) => { const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), th = i * 2.399963; return [Math.cos(th) * r, y, Math.sin(th) * r]; });
    const tam = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = hm.clientWidth; H = hm.clientHeight; hm.width = W * dpr; hm.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    let t = 0, visible = true;
    addEventListener("resize", () => { tam(); if (!visible) cuadro(); }); tam();   // cambiar el tamaño borra el lienzo: redibuja aunque esté quieto
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) cuadro(); }).observe(hm);
    function cuadro() {
      t += 0.01; cx.clearRect(0, 0, W, H);
      const ox = W / 2, oy = H * 0.46, R = Math.min(W, H) * 0.3, ca = Math.cos(t * 0.6), sa = Math.sin(t * 0.6);
      // base del proyector
      const g = cx.createRadialGradient(ox, H * 0.86, 0, ox, H * 0.86, R * 1.2); g.addColorStop(0, "rgba(111,195,255,.35)"); g.addColorStop(1, "rgba(111,195,255,0)");
      cx.fillStyle = g; cx.beginPath(); cx.ellipse(ox, H * 0.86, R * 1.2, R * 0.22, 0, 0, Math.PI * 2); cx.fill();
      cx.strokeStyle = "rgba(111,195,255,.5)"; cx.beginPath(); cx.ellipse(ox, H * 0.86, R * 0.7, R * 0.12, 0, 0, Math.PI * 2); cx.stroke();
      const cono = cx.createLinearGradient(0, H * 0.86, 0, oy - R); cono.addColorStop(0, "rgba(111,195,255,.10)"); cono.addColorStop(1, "rgba(111,195,255,0)");
      cx.fillStyle = cono; cx.beginPath(); cx.moveTo(ox - R * 0.7, H * 0.86); cx.lineTo(ox - R * 1.15, oy - R); cx.lineTo(ox + R * 1.15, oy - R); cx.lineTo(ox + R * 0.7, H * 0.86); cx.fill();
      const barrido = ((t * 0.5) % 2) - 1;
      for (const [x0, y0, z0] of esf) {
        const onda = 1 + 0.06 * Math.sin(t * 3 + y0 * 6);
        const x = (x0 * ca - z0 * sa) * onda, z = (x0 * sa + z0 * ca) * onda, y = y0 * onda;
        const px = ox + x * R, py = oy - y * R, prof = (z + 1) / 2, cerca = Math.abs(y0 - barrido) < 0.05;
        cx.fillStyle = cerca ? "rgba(255,255,255,.95)" : `rgba(111,195,255,${0.15 + prof * 0.7})`;
        cx.fillRect(px, py, cerca ? 2.2 : 1.2 + prof, cerca ? 2.2 : 1.2 + prof);
      }
      for (let y = 0; y < H; y += 4) { cx.fillStyle = "rgba(11,11,12,.18)"; cx.fillRect(0, y, W, 1); }
      if (visible && !quieto) requestAnimationFrame(cuadro);
    }
    cuadro();
  }
})();

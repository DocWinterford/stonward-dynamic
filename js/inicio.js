// Stonward Dynamics — portada: fichas de máquinas, regla de navegación y apertura
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- menú en celular: se cierra al elegir ----
  const nav = $("#nav");
  nav.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("abierta")));

  // ---- fichas técnicas de las máquinas ----
  const fichas = $("#fichas");
  if (fichas && window.STONWARD_MAQUINAS) {
    fichas.innerHTML = STONWARD_MAQUINAS.map((m, i) => `
      <article class="maquina">
        <div class="foto"><span class="indice">${String(i + 1).padStart(2, "0")} / ${String(STONWARD_MAQUINAS.length).padStart(2, "0")}</span>
          <img src="${m.imagen}" alt="${m.nombre}" loading="lazy"></div>
        <div class="ficha aparece">
          <span class="clase">${m.modelo}</span>
          <h3>${m.nombre}</h3>
          <p>${m.resumen}</p>
          <p class="uso"><span class="rotulo tenue" style="display:block;margin-bottom:6px">Aplicación</span>${m.uso || ""}</p>
          <dl class="especif">${m.datos.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
          ${m.estado === "disponible" ? `<div class="acciones"><a class="btn lleno" href="maquina.html?m=${m.id}">Ver en 3D</a><a class="btn" href="${m.paquete}" download>Paquete técnico</a></div>` : ""}
        </div>
      </article>`).join("");
    if ("IntersectionObserver" in window && !quieto) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: 0.12 });
      fichas.querySelectorAll(".aparece").forEach((el) => io.observe(el));
    } else fichas.querySelectorAll(".aparece").forEach((el) => el.classList.add("visible"));
  }

  // ---- regla: marcas que se estiran bajo el cursor y llevan a cualquier punto ----
  const regla = $("#regla"), etiquetas = $("#etiquetas-r");
  if (regla && getComputedStyle(regla).display !== "none") {
    const N = 100, marcas = [];
    for (let i = 0; i <= N; i++) {
      const m = document.createElement("i");
      m.className = "marca-r" + (i % 5 === 0 ? " mayor" : "");
      m.dataset.base = i % 5 === 0 ? 22 : 11;
      regla.appendChild(m); marcas.push(m);
      if (i % 5 === 0) { const n = document.createElement("span"); n.className = "num-r"; n.textContent = i; n.dataset.i = i; regla.appendChild(n); }
    }
    const aguja = document.createElement("div"); aguja.className = "aguja"; aguja.innerHTML = "<span></span>"; regla.appendChild(aguja);
    const secciones = [...document.querySelectorAll("[data-regla]")];
    const enlaces = secciones.map((s) => { const a = document.createElement("a"); a.href = "#" + s.id; a.textContent = s.dataset.regla; etiquetas.appendChild(a); return a; });

    let H = 0, raton = null;
    const recorrido = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const colocar = () => {
      H = regla.clientHeight;
      const pad = 10, util = H - pad * 2;
      marcas.forEach((m, i) => { m.style.top = pad + (i / N) * util + "px"; });
      regla.querySelectorAll(".num-r").forEach((n) => { n.style.top = pad + (n.dataset.i / N) * util + "px"; });
      secciones.forEach((s, k) => { enlaces[k].style.top = pad + Math.min(1, s.offsetTop / recorrido()) * util + "px"; });
      estirar(); mover();
    };
    const estirar = () => {
      marcas.forEach((m) => {
        const base = +m.dataset.base;
        if (raton == null) { m.style.width = base + "px"; return; }
        const d = Math.abs(parseFloat(m.style.top) - raton), f = Math.max(0, 1 - d / 80);
        m.style.width = base + f * f * 36 + "px";
      });
    };
    const mover = () => {
      const p = Math.min(1, scrollY / recorrido());
      aguja.style.top = 10 + p * (H - 20) + "px";
      aguja.firstChild.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%";
      let act = 0; secciones.forEach((s, k) => { if (s.offsetTop <= scrollY + innerHeight * 0.35) act = k; });
      enlaces.forEach((a, k) => a.classList.toggle("activo", k === act));
    };
    const ir = (y) => { const f = Math.min(1, Math.max(0, (y - 10) / (H - 20))); scrollTo({ top: f * recorrido(), behavior: arrastrando ? "auto" : "smooth" }); };
    let arrastrando = false;
    regla.addEventListener("pointermove", (e) => { raton = e.clientY - regla.getBoundingClientRect().top; estirar(); if (arrastrando) ir(raton); });
    regla.addEventListener("pointerleave", () => { raton = null; estirar(); });
    regla.addEventListener("pointerdown", (e) => { arrastrando = true; regla.setPointerCapture(e.pointerId); ir(e.clientY - regla.getBoundingClientRect().top); });
    regla.addEventListener("pointerup", () => { arrastrando = false; });
    addEventListener("scroll", mover, { passive: true });
    addEventListener("resize", colocar);
    addEventListener("load", colocar);
    colocar();
  }

  // ---- apertura: video si existe; si no, esquema animado del laboratorio ----
  const video = $("#video-apertura"), cv = $("#lienzo-apertura");
  if (video) {
    video.style.opacity = 0; video.style.transition = "opacity 1.2s";
    video.addEventListener("playing", () => { video.style.opacity = 1; if (cv) cv.style.display = "none"; });
    const fuente = video.querySelector("source");
    if (fuente) fuente.addEventListener("error", () => video.remove());
  }
  if (cv) {
    const cx = cv.getContext("2d"); let W, H, dpr, t = 0;
    const tam = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    addEventListener("resize", tam); tam();
    const cuadro = () => {
      t += 0.005; cx.clearRect(0, 0, W, H);
      const hz = H * 0.42, cxp = W * 0.5;
      // piso en perspectiva
      cx.strokeStyle = "rgba(255,255,255,.07)"; cx.lineWidth = 1;
      for (let k = -14; k <= 14; k++) { cx.beginPath(); cx.moveTo(cxp + k * 12, hz); cx.lineTo(cxp + k * W * 0.16, H); cx.stroke(); }
      for (let k = 1; k < 14; k++) { const y = hz + (H - hz) * Math.pow(k / 14, 2.2); cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
      // plato polar al centro
      const oy = H * 0.7, rx = Math.min(W, H) * 0.34, ry = rx * 0.28;
      for (let k = 1; k <= 6; k++) { cx.strokeStyle = `rgba(255,255,255,${0.05 + k * 0.025})`; cx.beginPath(); cx.ellipse(cxp, oy, (rx * k) / 6, (ry * k) / 6, 0, 0, Math.PI * 2); cx.stroke(); }
      for (let k = 0; k < 24; k++) { const a = t + (k * Math.PI) / 12; cx.strokeStyle = "rgba(255,255,255,.08)"; cx.beginPath(); cx.moveTo(cxp, oy); cx.lineTo(cxp + Math.cos(a) * rx, oy + Math.sin(a) * ry); cx.stroke(); }
      // columna y cabezal
      const r = rx * (0.55 + 0.3 * Math.sin(t * 1.3)), a = t * 4;
      const px = cxp + Math.cos(a) * r * 0.2, alto = H * 0.36;
      cx.strokeStyle = "rgba(255,255,255,.35)"; cx.beginPath(); cx.moveTo(cxp + rx * 1.05, oy); cx.lineTo(cxp + rx * 1.05, oy - alto); cx.lineTo(px, oy - alto); cx.lineTo(px, oy - alto * 0.55); cx.stroke();
      cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(px, oy - alto * 0.55, 3, 0, Math.PI * 2); cx.fill();
      // trazo depositado
      cx.strokeStyle = "rgba(120,170,255,.75)"; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(cxp, oy, r * 0.5, r * 0.5 * 0.28, 0, a - 1.6, a); cx.stroke(); cx.lineWidth = 1;
      // barrido
      const sx = ((t * 120) % (W + 200)) - 100; const g = cx.createLinearGradient(sx - 80, 0, sx, 0); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,.05)");
      cx.fillStyle = g; cx.fillRect(sx - 80, 0, 80, H);
      if (!quieto && cv.style.display !== "none") requestAnimationFrame(cuadro);
    };
    cuadro();
  }
})();

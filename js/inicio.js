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
    const portada = $(".portada");
    const inicio = () => (portada ? portada.offsetTop + portada.offsetHeight - 64 : 0);   // la regla mide solo lo que va después de la portada
    const recorrido = () => Math.max(1, document.documentElement.scrollHeight - innerHeight - inicio());
    const colocar = () => {
      H = regla.clientHeight;
      const pad = 10, util = H - pad * 2;
      marcas.forEach((m, i) => { m.style.top = pad + (i / N) * util + "px"; });
      regla.querySelectorAll(".num-r").forEach((n) => { n.style.top = pad + (n.dataset.i / N) * util + "px"; });
      secciones.forEach((s, k) => { enlaces[k].style.top = pad + Math.min(1, Math.max(0, s.offsetTop - inicio()) / recorrido()) * util + "px"; });
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
      const p = Math.min(1, Math.max(0, scrollY - inicio()) / recorrido());
      const fuera = scrollY < inicio() - innerHeight * 0.3; regla.classList.toggle("oculta", fuera); etiquetas.classList.toggle("oculta", fuera);
      aguja.style.top = 10 + p * (H - 20) + "px";
      aguja.firstChild.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%";
      let act = 0; secciones.forEach((s, k) => { if (s.offsetTop <= scrollY + innerHeight * 0.35) act = k; });
      enlaces.forEach((a, k) => a.classList.toggle("activo", k === act));
    };
    const ir = (y) => { const f = Math.min(1, Math.max(0, (y - 10) / (H - 20))); scrollTo({ top: inicio() + f * recorrido(), behavior: arrastrando ? "auto" : "smooth" }); };
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
    // espacio exterior: estrellas que derivan, la Tierra asomando abajo y el sol saliendo por su borde
    const cx = cv.getContext("2d"); let W, H, dpr, t = 0, estrellas = [];
    const tam = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      estrellas = Array.from({ length: Math.round((W * H) / 2600) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2, b: Math.random(), v: Math.random() * 0.06 + 0.01 }));
    };
    addEventListener("resize", tam); tam();
    const cuadro = () => {
      t += 0.01; cx.clearRect(0, 0, W, H);
      for (const e of estrellas) {
        if (!quieto) { e.x -= e.v; if (e.x < 0) e.x += W; }
        cx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.7 + e.b * 9)) * e.b; cx.fillStyle = "#dfe8ff";
        cx.beginPath(); cx.arc(e.x, e.y, e.r, 0, Math.PI * 2); cx.fill();
      }
      cx.globalAlpha = 1;
      // planeta: gran disco con el borde iluminado
      const R = Math.max(W, H) * 1.15, px = W * 0.62, py = H * 0.78 + R * 0.92;
      const cuerpo = cx.createRadialGradient(px - R * 0.1, py - R, R * 0.05, px, py, R);
      cuerpo.addColorStop(0, "#1d3a66"); cuerpo.addColorStop(0.55, "#0c1d38"); cuerpo.addColorStop(1, "#030812");
      cx.fillStyle = cuerpo; cx.beginPath(); cx.arc(px, py, R, 0, Math.PI * 2); cx.fill();
      // atmósfera
      const atm = cx.createRadialGradient(px, py, R * 0.985, px, py, R * 1.035);
      atm.addColorStop(0, "rgba(120,180,255,.0)"); atm.addColorStop(0.35, "rgba(120,180,255,.55)"); atm.addColorStop(1, "rgba(60,110,200,0)");
      cx.fillStyle = atm; cx.beginPath(); cx.arc(px, py, R * 1.035, 0, Math.PI * 2); cx.fill();
      // amanecer en el borde, respirando lento
      const sx = W * 0.8, sy = py - Math.sqrt(Math.max(0, R * R - (sx - px) ** 2)) - 2, f = 0.85 + 0.15 * Math.sin(t * 0.4);
      const sol = cx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.35);
      sol.addColorStop(0, `rgba(255,250,240,${0.95 * f})`); sol.addColorStop(0.05, `rgba(255,220,180,${0.5 * f})`); sol.addColorStop(0.3, "rgba(120,170,255,.12)"); sol.addColorStop(1, "rgba(0,0,0,0)");
      cx.fillStyle = sol; cx.fillRect(0, 0, W, H);
      if (!quieto && cv.style.display !== "none") requestAnimationFrame(cuadro);
    };
    cuadro();
  }
})();

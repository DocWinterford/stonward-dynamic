// Dibujos técnicos de las lecciones de Educación (SVG generado, cotas en mm).
// Cada figura devuelve el SVG completo; la lección la pide con figura: "<id>".
(() => {
  const W = 420, H = 250;
  const svg = (c, alto = H) => `<svg viewBox="0 0 ${W} ${alto}" class="fig" role="img">${c}</svg>`;
  const pieza = (d) => `<path class="p" d="${d}"/>`;
  const eje = (x1, y1, x2, y2) => `<line class="e" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const txt = (x, y, t, rot = 0, cls = "c") => `<text class="${cls}" x="${x}" y="${y}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""} text-anchor="middle">${t}</text>`;
  const flecha = (x, y, ang) => { const a = ang * Math.PI / 180, l = 7, s = 0.32; return `<path class="f" d="M${x} ${y}L${x - l * Math.cos(a - s)} ${y - l * Math.sin(a - s)}L${x - l * Math.cos(a + s)} ${y - l * Math.sin(a + s)}Z"/>`; };
  // cota horizontal entre x1 y x2 a la altura y, con líneas de referencia desde yRef
  const cotaH = (x1, x2, y, t, yRef) => `${yRef != null ? `<line class="r" x1="${x1}" y1="${yRef}" x2="${x1}" y2="${y + (y > yRef ? 4 : -4)}"/><line class="r" x1="${x2}" y1="${yRef}" x2="${x2}" y2="${y + (y > yRef ? 4 : -4)}"/>` : ""}<line class="d" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>${flecha(x2, y, 0)}${flecha(x1, y, 180)}${txt((x1 + x2) / 2, y - 5, t)}`;
  const cotaV = (x, y1, y2, t, xRef) => `${xRef != null ? `<line class="r" x1="${xRef}" y1="${y1}" x2="${x + (x > xRef ? 4 : -4)}" y2="${y1}"/><line class="r" x1="${xRef}" y1="${y2}" x2="${x + (x > xRef ? 4 : -4)}" y2="${y2}"/>` : ""}<line class="d" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>${flecha(x, y2, 90)}${flecha(x, y1, -90)}${txt(x - 6, (y1 + y2) / 2, t, -90)}`;
  const nota = (x, y, t, x2, y2) => `<line class="d" x1="${x2}" y1="${y2}" x2="${x}" y2="${y}"/>${flecha(x2, y2, Math.atan2(y2 - y, x2 - x) * 180 / Math.PI)}<line class="d" x1="${x}" y1="${y}" x2="${x + (x > x2 ? 46 : -46)}" y2="${y}"/>${txt(x + (x > x2 ? 23 : -23), y - 5, t)}`;
  const rot = (x, y, t) => `<text class="t" x="${x}" y="${y}">${t}</text>`;
  const circ = (cx, cy, r, cls = "p") => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;

  const F = {};
  // «L» de 60 × 40 con brazos de 15 (escala 3 px/mm)
  F.ele = () => { const s = 3, x = 130, y = 62; const P = (a, b) => `${x + a * s} ${y + b * s}`;
    return svg(pieza(`M${P(0, 0)}L${P(15, 0)}L${P(15, 25)}L${P(60, 25)}L${P(60, 40)}L${P(0, 40)}Z`)
      + cotaH(x, x + 60 * s, y + 40 * s + 22, "60", y + 40 * s) + cotaV(x - 22, y, y + 40 * s, "40", x)
      + cotaH(x, x + 15 * s, y - 14, "15", y) + cotaV(x + 60 * s + 22, y + 25 * s, y + 40 * s, "15", x + 60 * s)
      + rot(12, 20, "VISTA SUPERIOR"), 252); };
  // ranura: dos semicírculos R10 unidos por rectas de 50
  F.ranura = () => { const s = 3, cx = 135, cy = 110, r = 10 * s, L = 50 * s;
    return svg(pieza(`M${cx} ${cy - r}L${cx + L} ${cy - r}A${r} ${r} 0 0 1 ${cx + L} ${cy + r}L${cx} ${cy + r}A${r} ${r} 0 0 1 ${cx} ${cy - r}Z`)
      + eje(cx - r - 14, cy, cx + L + r + 14, cy) + eje(cx, cy - r - 12, cx, cy + r + 12) + eje(cx + L, cy - r - 12, cx + L, cy + r + 12)
      + cotaH(cx, cx + L, cy + r + 34, "50", cy + r + 12) + nota(cx + L + 62, cy - r - 22, "R10", cx + L + r * 0.7, cy - r * 0.7)
      + rot(12, 20, "RANURA · CENTROS A 50 mm")); };
  // eje escalonado Ø20 / Ø15 / Ø10, largos 30 / 40 / 20
  F.eje = () => { const s = 3.2, x = 70, cy = 115, t = [[30, 20], [40, 15], [20, 10]]; let d = "", xx = x, cot = "";
    t.forEach(([l, D]) => { const h = D * s / 2; d += `M${xx} ${cy - h}L${xx + l * s} ${cy - h}L${xx + l * s} ${cy + h}L${xx} ${cy + h}Z`; cot += cotaH(xx, xx + l * s, cy + 52, String(l), cy + h) + txt(xx + l * s / 2, cy + 4, `Ø${D}`, 0, "c dentro"); xx += l * s; });
    return svg(pieza(d) + eje(x - 14, cy, xx + 14, cy) + cot + cotaH(x, xx, cy + 82, "90", cy + 52) + rot(12, 20, "EJE ESCALONADO · REVOLUCIÓN DEL MEDIO PERFIL")); };
  // placa 80 × 40 × 10 en isométrico simple con barreno Ø20
  F.placa = () => { const s = 2.4, o = [110, 150], ix = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], iy = [-Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];
    const p = (a, b, c) => [o[0] + (a * ix[0] + b * iy[0]) * s, o[1] + (a * ix[1] + b * iy[1]) * s - c * s];
    const L = (...q) => q.map((v, i) => `${i ? "L" : "M"}${v[0].toFixed(1)} ${v[1].toFixed(1)}`).join("") + "Z";
    const top = L(p(0, 0, 10), p(80, 0, 10), p(80, -40, 10), p(0, -40, 10)), fr = L(p(0, 0, 0), p(80, 0, 0), p(80, 0, 10), p(0, 0, 10)), la = L(p(80, 0, 0), p(80, -40, 0), p(80, -40, 10), p(80, 0, 10));
    const c = p(40, -20, 10);
    return svg(`<path class="p cara" d="${top}"/><path class="p cara2" d="${fr}"/><path class="p cara3" d="${la}"/><ellipse class="p" cx="${c[0]}" cy="${c[1]}" rx="${10 * s * 1.22}" ry="${10 * s * 0.7}"/>`
      + txt((p(0, 0, 0)[0] + p(80, 0, 0)[0]) / 2 - 6, (p(0, 0, 0)[1] + p(80, 0, 0)[1]) / 2 + 24, "80", 30) + txt((p(80, 0, 0)[0] + p(80, -40, 0)[0]) / 2 + 16, (p(80, 0, 0)[1] + p(80, -40, 0)[1]) / 2 + 18, "40", -30)
      + txt(p(0, 0, 5)[0] - 16, p(0, 0, 5)[1] + 4, "10") + nota(c[0] + 70, c[1] - 52, "Ø20", c[0] + 12, c[1] - 6) + rot(12, 20, "PLACA EXTRUIDA · CORTE PASANTE")); };
  // brida Ø120 con 8 barrenos Ø10 en círculo de Ø95
  F.brida = () => { const s = 1.5, cx = 210, cy = 128, R = 60 * s, Rb = 47.5 * s, rb = 5 * s; let h = "";
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; h += circ(cx + Rb * Math.cos(a), cy + Rb * Math.sin(a), rb); }
    return svg(circ(cx, cy, R) + circ(cx, cy, 30 * s * 0.67) + h + `<circle class="e" cx="${cx}" cy="${cy}" r="${Rb}"/>` + eje(cx - R - 14, cy, cx + R + 14, cy) + eje(cx, cy - R - 14, cx, cy + R + 14)
      + nota(cx + R + 40, cy - R + 4, "Ø120", cx + R * 0.72, cy - R * 0.69) + nota(cx - R - 38, cy - R + 10, "Ø95", cx - Rb * 0.71, cy - Rb * 0.71) + nota(cx + R + 40, cy + R - 4, "8× Ø10", cx + Rb * 0.71 + rb * 0.7, cy + Rb * 0.71 + rb * 0.7)
      + rot(12, 20, "BRIDA · MATRIZ CIRCULAR DE 8")); };
  // soporte en L 60 × 50, espesor 6, nervio 30 × 30
  F.soporte = () => { const s = 2.6, x = 130, y = 58; const P = (a, b) => `${x + a * s} ${y + b * s}`;
    return svg(pieza(`M${P(0, 0)}L${P(6, 0)}L${P(6, 44)}L${P(60, 44)}L${P(60, 50)}L${P(0, 50)}Z`) + `<path class="p nervio" d="M${P(6, 14)}L${P(6, 44)}L${P(36, 44)}Z"/>`
      + cotaH(x, x + 60 * s, y + 50 * s + 22, "60", y + 50 * s) + cotaV(x - 22, y, y + 50 * s, "50", x) + cotaH(x, x + 6 * s, y - 14, "6", y)
      + nota(x + 40 * s, y + 18 * s, "Nervio 30 × 30", x + 18 * s, y + 34 * s) + rot(12, 20, "SOPORTE EN L · VISTA FRONTAL"), 268); };
  // tuerca hexagonal M8: 13 entre caras
  F.hex = () => { const s = 6, cx = 210, cy = 125, a = 13 * s / 2 / Math.cos(Math.PI / 6); let d = "";
    for (let i = 0; i < 6; i++) { const t = Math.PI / 6 + i * Math.PI / 3; d += `${i ? "L" : "M"}${(cx + a * Math.cos(t)).toFixed(1)} ${(cy + a * Math.sin(t)).toFixed(1)}`; }
    return svg(pieza(d + "Z") + circ(cx, cy, 4 * s) + `<circle class="e" cx="${cx}" cy="${cy}" r="${3.32 * s}"/>` + eje(cx - a - 14, cy, cx + a + 14, cy) + eje(cx, cy - a - 10, cx, cy + a + 10)
      + cotaV(cx + a + 28, cy - 13 * s / 2, cy + 13 * s / 2, "13", cx + a * 0.5) + nota(cx - a - 34, cy - a + 6, "M8 × 1,25", cx - 4 * s * 0.7, cy - 4 * s * 0.7)
      + rot(12, 20, "TUERCA HEXAGONAL M8")); };
  // engranes z30 y z15, módulo 1,5: distancia entre centros 33,75
  F.engranes = () => { const s = 2.6, cy = 125, r1 = 22.5 * s, r2 = 11.25 * s, c1 = 150, c2 = c1 + 33.75 * s;
    const rueda = (cx, r, z, fase) => { let d = ""; const ra = r + 1.5 * s, rf = r - 1.875 * s;
      for (let i = 0; i < z; i++) { const t = (i / z) * 2 * Math.PI + fase, w = Math.PI / z;
        const pt = (rr, aa) => `${(cx + rr * Math.cos(aa)).toFixed(1)} ${(cy + rr * Math.sin(aa)).toFixed(1)}`;
        d += `${i ? "L" : "M"}${pt(rf, t - w * 0.55)}L${pt(ra, t - w * 0.3)}L${pt(ra, t + w * 0.3)}L${pt(rf, t + w * 0.55)}`; }
      return pieza(d + "Z") + `<circle class="e" cx="${cx}" cy="${cy}" r="${r}"/>`; };
    return svg(rueda(c1, r1, 30, 0) + rueda(c2, r2, 15, Math.PI / 15 + Math.PI) + eje(c1 - r1 - 12, cy, c2 + r2 + 12, cy) + eje(c1, cy - r1 - 12, c1, cy + r1 + 12) + eje(c2, cy - r2 - 12, c2, cy + r2 + 12)
      + cotaH(c1, c2, cy + r1 + 30, "33,75", cy + 6) + txt(c1, cy - r1 - 18, "z30 · m1,5") + txt(c2 + 6, cy - r2 - 18, "z15")
      + rot(12, 20, "DISTANCIA ENTRE CENTROS = m(z1 + z2) / 2")); };
  // desarrollo de gabinete 200 × 150 con alas de 80
  F.chapa = () => { const s = 0.62, x = 210 - 100 * s, y = 125 - 75 * s, a = 80 * s, w = 200 * s, h = 150 * s;
    return svg(pieza(`M${x} ${y}L${x} ${y - a}L${x + w} ${y - a}L${x + w} ${y}L${x + w + a} ${y}L${x + w + a} ${y + h}L${x + w} ${y + h}L${x + w} ${y + h + a}L${x} ${y + h + a}L${x} ${y + h}L${x - a} ${y + h}L${x - a} ${y}Z`)
      + `<path class="e" d="M${x} ${y}L${x + w} ${y}L${x + w} ${y + h}L${x} ${y + h}Z"/>` + txt(x + w / 2, y + h / 2 + 4, "200 × 150", 0, "c dentro") + txt(x + w / 2, y - a / 2 + 4, "80", 0, "c dentro")
      + rot(12, 20, "DESARROLLO PLANO · LÍNEAS DE DOBLEZ PUNTEADAS")); };
  // recortar: antes y después
  F.recortar = () => { const A = (dx) => `<line class="p" x1="${40 + dx}" y1="70" x2="${170 + dx}" y2="190"/><line class="p" x1="${40 + dx}" y1="190" x2="${170 + dx}" y2="70"/>`;
    return svg(A(0) + `<line class="sel" x1="105" y1="130" x2="170" y2="190"/>` + `<line class="p" x1="250" y1="70" x2="380" y2="190"/><line class="p" x1="250" y1="190" x2="315" y2="130"/>`
      + txt(118, 225, "Antes: clic en el tramo marcado") + txt(315, 225, "Después") + rot(12, 20, "RECORTAR")); };

  window.SM_FIGURAS = F;
})();

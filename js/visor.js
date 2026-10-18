// Visor 3D de máquinas Stonward: abre el mismo paquete .zip que se instala en SolidMaker.
// Lee maquina.json (formato pms-maquina-2) o calibracion.json (PolarONE) y dibuja cada pieza STL con su material.
import * as THREE from "three";
import { OrbitControls } from "three/addons/OrbitControls.js";
import { STLLoader } from "three/addons/STLLoader.js";
import { RoomEnvironment } from "three/addons/RoomEnvironment.js";

const $ = (s) => document.querySelector(s);
const id = new URLSearchParams(location.search).get("m") || "polarone";
const maq = (window.STONWARD_MAQUINAS || []).find((m) => m.id === id) || window.STONWARD_MAQUINAS[0];

// ---- ficha ----
document.title = `${maq.nombre} · Stonward Dynamics`;
$("#f-nombre").textContent = maq.nombre; $("#f-miga").textContent = maq.nombre;
$("#f-modelo").textContent = maq.modelo;
$("#f-resumen").textContent = maq.resumen;
$("#f-datos").innerHTML = maq.datos.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
$("#f-driver").textContent = maq.driver || "";
const desc = $("#f-descargar");
if (maq.paquete) desc.href = maq.paquete; else desc.style.display = "none";
$("#f-otras").innerHTML = window.STONWARD_MAQUINAS.filter((m) => m.id !== maq.id && m.estado === "disponible").map((m) => `<a class="btn chico" href="maquina.html?m=${m.id}">${m.nombre}</a>`).join("");

// ---- escena ----
const caja = $("#visor");
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
caja.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(renderer), 0.04).texture;
const camera = new THREE.PerspectiveCamera(35, 1, 1, 20000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.autoRotate = true; controls.autoRotateSpeed = 0.8;
const luz = new THREE.DirectionalLight(0xffffff, 1.4); luz.position.set(600, 900, 700); scene.add(luz);
scene.add(new THREE.HemisphereLight(0xcfd8e3, 0x1a1c20, 0.5));
const maquina = new THREE.Group(); maquina.rotation.x = -Math.PI / 2; scene.add(maquina);   // las máquinas vienen con Z hacia arriba

const tam = () => { const w = caja.clientWidth, h = caja.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
addEventListener("resize", tam); tam();
(function bucle() { controls.update(); renderer.render(scene, camera); requestAnimationFrame(bucle); })();

// ---- carga del paquete con barra de progreso ----
const barra = $("#barra"), estado = $("#estado");
async function bajar(url) {
  const r = await fetch(url); if (!r.ok) throw new Error(`no se pudo bajar ${url} (${r.status})`);
  const total = +r.headers.get("content-length") || 0;
  if (!r.body || !total) return r.arrayBuffer();
  const lector = r.body.getReader(), trozos = []; let n = 0;
  for (;;) { const { done, value } = await lector.read(); if (done) break; trozos.push(value); n += value.length; barra.style.width = `${(60 * n) / total}%`; estado.textContent = `Bajando ${maq.nombre}… ${(n / 1048576).toFixed(1)} / ${(total / 1048576).toFixed(1)} MB`; }
  const out = new Uint8Array(n); let o = 0; for (const t of trozos) { out.set(t, o); o += t.length; } return out.buffer;
}
function piezasDe(json) {
  if (json.formato === "pms-maquina-2") return json.piezas.map((p) => ({ nombre: p.nombre || p.id, archivo: p.archivo, color: p.color, metal: p.metal, rug: p.rugosidad, opacidad: p.opacidad, eslabon: p.eslabon || "base" }));
  return (json.parts || []).map((p) => ({ nombre: p.name || p.id, archivo: p.geometry && p.geometry.stl, color: p.color, metal: p.metal, rug: p.rugosidad, opacidad: p.opacidad, pos: p.pos, quat: p.quat }));
}
const mallas = [], cables = [];
// Pose de vitrina: si el paquete trae driver (p. ej. la delta), se lo corre para poner el efector a media altura;
// cada eslabón queda con su matriz y los cables (brazos, tubos) se tienden entre ellos.
async function posesDe(json, zip) {
  const out = {};
  if (json.formato !== "pms-maquina-2") return out;
  const q = {}, drv = {};
  if (json.driver && zip.file(json.driver)) {
    try {
      new Function("MachinV2", "THREE", await zip.file(json.driver).async("string"))({ registrarDriver: (t, d) => { drv[t] = d; } }, THREE);
      const a = (json.params && json.params.area) || [0, 0, 0];
      if (drv[json.tipo]) Object.assign(q, drv[json.tipo].ik({ X: 0, Y: 0, Z: Math.round(a[2] * 0.35) }, { params: json.params || {}, eslabones: json.eslabones || [] }));
    } catch (e) { console.warn("driver", e); }
  }
  const por = {}; (json.eslabones || []).forEach((e) => { por[e.id] = e; });
  const de = (id) => {
    if (out[id]) return out[id];
    const e = por[id]; if (!e) return new THREE.Matrix4();
    const b = e.padre ? de(e.padre).clone() : new THREE.Matrix4(), j = e.junta, v = q[id] || 0;
    if (j && j.tipo === "lineal") b.multiply(new THREE.Matrix4().makeTranslation(j.eje[0] * v, j.eje[1] * v, j.eje[2] * v));
    return (out[id] = b);
  };
  Object.keys(por).forEach(de);
  return out;
}
function tenderCables(json, P) {
  (json.cables || []).forEach((c) => {
    const ex = (e) => { const M = P[e.eslabon] || new THREE.Matrix4(); return { p: new THREE.Vector3(...e.punto).applyMatrix4(M), d: new THREE.Vector3(...(e.dir || [0, 0, 1])).normalize().transformDirection(M) }; };
    const A = ex(c.de), B = ex(c.a), k = A.p.distanceTo(B.p) * (c.k ?? 0.4);
    const curva = new THREE.CubicBezierCurve3(A.p, A.p.clone().addScaledVector(A.d, k), B.p.clone().addScaledVector(B.d, k), B.p);
    const op = c.opacidad ?? 1;
    const m = new THREE.Mesh(new THREE.TubeGeometry(curva, 48, c.radio || 2, 10), new THREE.MeshStandardMaterial({ color: c.color || "#ddd", roughness: 0.35, metalness: 0.1, transparent: op < 1, opacity: op }));
    maquina.add(m); cables.push(m);
  });
}
async function cargar() {
  if (!maq.paquete) { estado.textContent = "Esta máquina todavía está en desarrollo."; barra.parentElement.style.display = "none"; return; }
  const zip = await JSZip.loadAsync(await bajar(maq.paquete));
  const f = zip.file("maquina.json") || zip.file("calibracion.json");
  if (!f) throw new Error("el paquete no trae maquina.json ni calibracion.json");
  const json = JSON.parse(await f.async("string")), piezas = piezasDe(json).filter((p) => p.archivo && zip.file(p.archivo));
  const P = await posesDe(json, zip);
  const loader = new STLLoader();
  for (let i = 0; i < piezas.length; i++) {
    const p = piezas[i], geo = loader.parse(await zip.file(p.archivo).async("arraybuffer"));
    geo.computeVertexNormals();
    const op = p.opacidad ?? 1;
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(p.color || "#9aa0a6"), metalness: p.metal ?? 0.2, roughness: p.rug ?? 0.6, transparent: op < 1, opacity: op, depthWrite: op >= 0.95, side: op < 1 ? THREE.DoubleSide : THREE.FrontSide });
    const m = new THREE.Mesh(geo, mat);
    if (p.pos) m.position.fromArray(p.pos); if (p.quat) m.quaternion.fromArray(p.quat);
    if (p.eslabon && P[p.eslabon]) P[p.eslabon].decompose(m.position, m.quaternion, m.scale);
    m.renderOrder = op < 1 ? 2 : 0; m.userData.nombre = p.nombre;
    maquina.add(m); mallas.push(m);
    barra.style.width = `${60 + (40 * (i + 1)) / piezas.length}%`; estado.textContent = `Armando ${maq.nombre}… pieza ${i + 1} de ${piezas.length}`;
  }
  tenderCables(json, P);
  encuadrar(); listaMateriales(piezas.concat((json.cables || []).map((c) => ({ nombre: c.nombre || c.id, color: c.color }))));
  $("#carga").style.display = "none";
}
function encuadrar() {
  maquina.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(maquina), c = b.getCenter(new THREE.Vector3()), s = b.getSize(new THREE.Vector3()).length();
  mallas.forEach((m) => { m.userData.base = m.position.clone(); m.geometry.computeBoundingBox(); m.userData.centro = m.geometry.boundingBox.getCenter(new THREE.Vector3()).applyQuaternion(m.quaternion).add(m.position); });
  maquina.userData.centro = maquina.worldToLocal(c.clone());
  controls.target.copy(c);
  camera.position.copy(c).add(new THREE.Vector3(0.75, 0.42, 0.95).normalize().multiplyScalar(s * 1.55));
  camera.near = s / 100; camera.far = s * 20; camera.updateProjectionMatrix();
}
// Lista de materiales: piezas agrupadas por nombre, con su color.
function listaMateriales(piezas) {
  const g = new Map();
  piezas.forEach((p) => { const k = p.nombre; const e = g.get(k) || { n: 0, color: p.color }; e.n++; g.set(k, e); });
  $("#f-bom").innerHTML = [...g].sort((a, b) => a[0].localeCompare(b[0], "es")).map(([k, e]) => `<tr><td><span class="muestra" style="background:${e.color || "#888"}"></span>${k}</td><td>${e.n} ${e.n > 1 ? "cuerpos" : "cuerpo"}</td></tr>`).join("");
  $("#f-bom-total").textContent = `${piezas.length} cuerpos en ${g.size} grupos, sacados del paquete.`;
}
cargar().catch((e) => { estado.textContent = "No se pudo abrir el paquete: " + e.message; });

// ---- herramientas ----
$("#b-girar").addEventListener("click", (e) => { controls.autoRotate = !controls.autoRotate; e.currentTarget.classList.toggle("primario", controls.autoRotate); });
let abierta = 0, anim = null;
$("#b-explotar").addEventListener("click", (e) => {
  const meta = abierta ? 0 : 1; e.currentTarget.textContent = meta ? "Armar" : "Explosionar";
  const desde = abierta, t0 = performance.now(); cancelAnimationFrame(anim);
  const paso = (t) => {
    const k = Math.min(1, (t - t0) / 900), f = desde + (meta - desde) * (1 - Math.pow(1 - k, 3)); abierta = f;
    const C = maquina.userData.centro;
    mallas.forEach((m) => { const d = m.userData.centro.clone().sub(C); m.position.copy(m.userData.base).addScaledVector(d, 0.6 * f); });
    cables.forEach((m) => { m.visible = f < 0.05; });
    if (k < 1) anim = requestAnimationFrame(paso);
  };
  anim = requestAnimationFrame(paso);
});
$("#b-vista").addEventListener("click", encuadrar);
window.__visor = { controls, camera, renderer };   // para sacar fotos de las tarjetas (render.mjs)

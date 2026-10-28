# Arma la documentación técnica de cada máquina a partir de su paquete .zip:
# lista de materiales (grupos, materiales, cuerpos sólidos, medida del cuerpo mayor) y secuencia de montaje.
# Uso: python3 herramientas/doc_maquinas.py   -> data/doc-maquinas/<id>.json
import json, re, struct, zipfile
from pathlib import Path
import numpy as np

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "data" / "doc-maquinas"

MATERIALES = {
    "acero": "Acero", "acero_pulido": "Acero pulido", "pavonado": "Acero pavonado", "aluminio": "Aluminio",
    "aluminio_negro": "Aluminio anodizado negro", "laton": "Latón", "bronce": "Bronce", "goma": "Caucho",
    "nylon": "Nylon (PA)", "plastico_negro": "Plástico negro", "impreso": "Impresión 3D (PETG)",
    "chasis": "Lámina de acero pintada", "negro": "Plástico negro", "gris": "Plástico gris", "brillo": "Acrílico brillante",
    "vidrio": "Vidrio templado", "vidrio_lat": "Vidrio templado", "vidrio_puerta": "Vidrio templado", "display": "Vidrio de pantalla",
    "ahumado": "Policarbonato ahumado", "pei": "Lámina PEI", "correa": "Correa GT2 (caucho con fibra)", "carbono": "Fibra de carbono",
    "filamento": "Filamento", "carrete": "Carrete de filamento", "reductor": "Reductor (fundición)", "brida": "Brida de acero",
    "eslabon": "Aluminio fundido", "silicona": "Silicona", "calentador": "Cartucho calefactor", "placa_base": "Placa de acero",
    "perfil": "Perfil de aluminio 2020", "placa": "Placa de aluminio", "plastico": "Plástico", "acento": "Acrílico de color",
    "contrapeso": "Hierro fundido", "blanco": "Plástico blanco", "rojo": "Plástico rojo", "amarillo": "Plástico amarillo", "logo": "Acrílico",
}

POR_NOMBRE = {"policarbonato": "Policarbonato ahumado", "silicona": "Silicona", "fibra de carbono": "Fibra de carbono", "pei": "Lámina PEI",
              "aluminio": "Aluminio", "acrílico": "Acrílico", "latón": "Latón", "bronce": "Bronce", "nylon": "Nylon (PA)", "2040": "Perfil de aluminio 2040"}

def material(pid):
    clave = pid.split("_m_")[-1] if "_m_" in pid else pid.split("_")[-1]
    if clave in MATERIALES: return MATERIALES[clave]
    for k, v in sorted(MATERIALES.items(), key=lambda kv: -len(kv[0])):
        if pid.endswith(k): return v
    return clave.replace("_", " ").capitalize()

def triangulos(datos):
    if datos[:5] == b"solid" and b"facet" in datos[:400]:
        v = re.findall(rb"vertex\s+(\S+)\s+(\S+)\s+(\S+)", datos)
        return np.array(v, dtype=np.float64).reshape(-1, 3, 3)
    n = struct.unpack("<I", datos[80:84])[0]
    reg = np.frombuffer(datos, dtype=np.dtype([("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")]), count=n, offset=84)
    return reg["v"].astype(np.float64)

def cuerpos(tri):
    """Cuerpos sólidos (componentes conexas) y la caja de cada uno."""
    if not len(tri): return []
    pts = np.round(tri.reshape(-1, 3), 3)
    _, ind = np.unique(pts, axis=0, return_inverse=True)
    ind = ind.reshape(-1, 3); nv = ind.max() + 1
    lab = np.arange(nv)
    while True:
        m = lab[ind].min(axis=1)
        nuevo = lab.copy()
        for c in range(3): np.minimum.at(nuevo, ind[:, c], m)
        nuevo = nuevo[nuevo]
        if np.array_equal(nuevo, lab): break
        lab = nuevo
    raiz = lab[ind[:, 0]]
    out = []
    for r in np.unique(raiz):
        t = tri[raiz == r].reshape(-1, 3)
        out.append((t.min(0), t.max(0)))
    return out

def documentar(m):
    Z = zipfile.ZipFile(RAIZ / m["paquete"])
    nombres = set(Z.namelist())
    j = json.load(Z.open("maquina.json" if "maquina.json" in nombres else "calibracion.json"))
    if j.get("formato") == "pms-maquina-2":
        piezas = [dict(id=p["id"], nombre=p.get("nombre") or p["id"], archivo=p["archivo"], esl=p.get("eslabon", "base")) for p in j["piezas"]]
        esl = j.get("eslabones", [])
    else:
        piezas = [dict(id=p["id"], nombre=p.get("name") or p["id"], archivo=p["geometry"]["stl"], esl=p.get("bloque", "base")) for p in j["parts"]]
        esl = [{"id": b} for b in dict.fromkeys(p["esl"] for p in piezas)]
    grupos = {}
    for p in piezas:
        if p["archivo"] not in nombres: continue
        tri = triangulos(Z.read(p["archivo"]))
        g = grupos.setdefault(p["nombre"], dict(nombre=p["nombre"], eslabon=p["esl"], materiales=[], archivos=[], cuerpos=0, cajas=[], zmin=1e18))
        mat = material(p["id"])
        if mat not in g["materiales"]: g["materiales"].append(mat)
        g["archivos"].append(p["archivo"])
        for a, b in cuerpos(tri):
            g["cuerpos"] += 1
            g["cajas"].append((b - a).tolist())
            g["zmin"] = min(g["zmin"], float(a[2]))
    for g in grupos.values():
        # pieza principal = cuerpo de mayor volumen envolvente; cantidad = cuerpos con esa misma forma
        vol = lambda d: np.prod(np.maximum(d, 0.5))
        mayor = max(g["cajas"], key=vol)
        ref = sorted(mayor)
        g["cantidad"] = sum(1 for d in g["cajas"] if np.allclose(sorted(d), ref, rtol=0.03, atol=0.2))
        g["mayor"] = [round(x, 1) for x in mayor]
        g.pop("cajas")
        for palabra, mat in POR_NOMBRE.items():
            if palabra in g["nombre"].lower(): g["materiales"] = [mat] + [x for x in g["materiales"] if x != mat][1:]
        if g["nombre"] == g["nombre"].lower():
            g["visible"] = g["nombre"].replace("_", " ").capitalize()
            if g["visible"].lower() in (x.lower() for x in grupos if x != g["nombre"]): g["visible"] += " (complementos)"
    # secuencia de montaje: eslabones en orden del árbol cinemático, dentro de cada uno de abajo hacia arriba
    orden = [e["id"] for e in esl] or ["base"]
    for g in grupos.values():
        if g["eslabon"] not in orden: orden.append(g["eslabon"])
    pasos = sorted(grupos.values(), key=lambda g: (orden.index(g["eslabon"]), round(g["zmin"], 0), g["nombre"]))
    juntas = {e["id"]: dict(padre=e.get("padre"), tipo=(e.get("junta") or {}).get("tipo"), nombre=(e.get("junta") or {}).get("nombre")) for e in esl}
    for g in pasos: g.pop("zmin")
    return dict(id=m["id"], nombre=m["nombre"], eslabones=juntas, orden=orden, grupos=pasos,
                total=dict(grupos=len(pasos), piezas=sum(g["cantidad"] for g in pasos), cuerpos=sum(g["cuerpos"] for g in pasos), archivos=sum(len(g["archivos"]) for g in pasos)))

if __name__ == "__main__":
    txt = (RAIZ / "data" / "maquinas.js").read_text(encoding="utf-8")
    maqs = [dict(id=a, nombre=b, paquete=c) for a, b, c in re.findall(r'id: "([^"]+)",\s*nombre: "([^"]+)",[\s\S]*?paquete: "([^"]+)"', txt)]
    SALIDA.mkdir(parents=True, exist_ok=True)
    for m in maqs:
        d = documentar(m)
        (SALIDA / f"{m['id']}.json").write_text(json.dumps(d, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        print(m["id"], d["total"])

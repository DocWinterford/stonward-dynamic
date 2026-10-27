"""Genera manual.html (Manual de usuario de SolidMaker) desde docs/manual/polarcad-lista.md.

La lista se saca del código de SolidMaker; aquí se le quitan los selectores internos
y se convierte en secciones con su captura real. Uso: python herramientas/generar_manual.py
"""
import html, re, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
LISTA = (RAIZ / "docs/manual/polarcad-lista.md").read_text(encoding="utf-8")
IMG = "img/manual/polarcad/"

# captura de cada menú (por el inicio del título de la sección)
CAPTURAS = {
    "Documento": ["10-menu-documento.jpg"], "Ensamble": ["11-menu-ensamble.jpg"], "Material": ["12-menu-material.jpg"],
    "Herramientas de dibujo": ["13-menu-linea.jpg", "14-menu-circulo.jpg", "15-menu-arco.jpg", "16-menu-rectangulo.jpg", "17-menu-spline.jpg"],
    "Curvas": ["18-menu-curvas.jpg"], "Anotación": ["19-menu-anotacion.jpg"], "Editar": ["20-menu-editar.jpg"],
    "Operaciones": ["21-menu-operaciones.jpg"], "Corte": ["22-menu-corte.jpg"], "Acabado": ["23-menu-acabado.jpg"],
    "Referencia": ["24-menu-referencia.jpg"], "Transformaciones": ["25-menu-transformaciones.jpg"], "Patrones": ["26-menu-patrones.jpg"],
    "Chapa": ["27-menu-chapa.jpg"], "Mecanizado": ["28-menu-mecanizado.jpg"], "Vista y ajustes": ["29-menu-configuracion.jpg", "30-menu-grilla.jpg"],
}
# qué resuelve cada menú, en palabras del usuario
INTRO = {
    "Documento": "Todo lo que tiene que ver con el archivo de la pieza: guardarla en su proyecto, abrirla, exportarla a otros formatos y recuperar trabajo que no alcanzó a guardarse.",
    "Ensamble": "Para juntar varias piezas en un mismo conjunto. La primera pieza que inserte queda fija y sirve de base para las demás.",
    "Material": "Define de qué está hecha la pieza y cómo se ve. El material asignado también sirve para calcular la masa.",
    "Deshacer": "Retroceden o rehacen el último cambio.",
    "Herramientas de dibujo": "Con estas herramientas se dibuja el croquis 2D sobre el plano activo. Cada botón tiene una flecha a su derecha con variantes de la misma herramienta.",
    "Curvas": "Curvas especiales para geometría polar y para copiar un contorno a cierta distancia.",
    "Anotación": "Cotas, mediciones, texto y las relaciones geométricas que dejan el croquis totalmente definido.",
    "Editar": "Herramientas para limpiar el croquis: recortar, extender, dividir y unir trazos.",
    "Operaciones": "Convierten el croquis en un sólido 3D: extruir, revolucionar, barrer o recubrir.",
    "Corte": "Quitan material de un sólido existente usando un croquis.",
    "Acabado": "Redondeos y chaflanes en las esquinas del croquis.",
    "Referencia": "Planos, ejes y puntos auxiliares para dibujar y operar donde no hay una cara a la mano.",
    "Transformaciones": "Mueven, copian, giran, escalan o reflejan los trazos seleccionados, siempre desde un punto base.",
    "Patrones": "Repiten una pieza en línea, en círculo, siguiendo un croquis o por simetría.",
    "Chapa": "Diseño de piezas de lámina: espesor, dobleces y el desarrollo plano para cortarlas.",
    "Mecanizado": "Agujeros y roscas normalizados listos para fabricar: taladros, roscas, avellanados y abocardados.",
    "Vista y ajustes": "Zoom, modo de selección de aristas, idioma de la interfaz y tamaño de la grilla.",
}

def slug(t):
    t = t.lower().replace("▾", " variantes")
    for a, b in zip("áéíóúñü", "aeiounu"): t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")

def limpio(t):
    """Quita selectores internos y convierte **negritas**."""
    t = re.sub(r"\s*`[^`]*`\s*→\s*\w+", "", t)           # `data-cmd`→herramienta
    t = re.sub(r"\(`[^)]*`[^)]*\)", "", t)                 # (`archivo.js`)
    t = re.sub(r"`[^`]*`", "", t)
    t = re.sub(r"[▶╱⊡⌐]\s*", "", t).replace("seg:", "opciones:")
    t = html.escape(t.strip(" ·"))
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return re.sub(r"\s{2,}", " ", t).replace(" ,", ",")

def tabla(filas):
    """Une todas las tablas de la sección (una sección puede traer varias)."""
    out, grupo = [], []
    for k, f in enumerate(filas):
        if k + 1 < len(filas) and re.fullmatch(r"\|[-| ]+\|", filas[k + 1].strip()) and grupo:
            out += tabla_una(grupo); grupo = []
        grupo.append(f)
    return out + tabla_una(grupo)

def tabla_una(filas):
    cab = [c.strip() for c in filas[0].strip("|").split("|")]
    quitar = {i for i, c in enumerate(cab) if c.lower() in ("id", "selector", "data-cmd", "id / data-cmd", "herramienta")}
    out = []
    for f in filas[2:]:
        cel = [c.strip() for c in f.strip("|").split("|")]
        cel = [c for i, c in enumerate(cel) if i not in quitar]
        if not cel: continue
        nombre = limpio(cel[0]); resto = " · ".join(limpio(c) for c in cel[1:] if c)
        pend = "Todavía no está conectado" in resto
        out.append((nombre, resto, pend))
    return out

# ---- lectura de la lista ----
secciones = []
for bloque in re.split(r"\n### ", LISTA)[1:]:
    lineas = bloque.split("\n")
    titulo = re.split(r" — | ▾", lineas[0])[0].strip()
    texto = [l for l in lineas[1:] if l and not l.startswith("|") and not l.startswith("#") and l != "---"]
    filas = [l for l in lineas if l.startswith("|")]
    secciones.append({"titulo": titulo, "id": slug(titulo), "nota": " ".join(limpio(t) for t in texto), "items": tabla(filas) if filas else []})

def captura(nombre, pie):
    # se muestra el recorte alrededor del menú (zoom/); el clic abre la pantalla completa
    return f'<figure class="cap"><a href="{IMG}{nombre}" class="ampliar"><img src="{IMG}zoom/{nombre}" alt="{html.escape(pie)}" loading="lazy"></a><figcaption>{html.escape(pie)} · clic para ver la pantalla completa</figcaption></figure>'

# ---- índice de herramientas (cada una con su hipervínculo) ----
indice = []
for s in secciones:
    links = "".join(f'<a href="#{s["id"]}--{slug(n)}"{" class=pend" if p else ""}>{n}</a>' for n, _, p in s["items"])
    indice.append(f'<div class="grupo"><a class="g" href="#{s["id"]}">{s["titulo"]}</a><div class="hs">{links}</div></div>')

cuerpo = []
for s in secciones:
    caps = "".join(captura(c, f"Menú {s['titulo']} abierto en PolarCAD") for c in CAPTURAS.get(s["titulo"], []))
    filas = "".join(
        f'<article class="herr{" pend" if p else ""}" id="{s["id"]}--{slug(n)}"><h4>{n}{" <span class=sello>Próximamente</span>" if p else ""}</h4><p>{r or "Se ejecuta con un clic, sin ventana de opciones."}</p></article>'
        for n, r, p in s["items"])
    cuerpo.append(f'''<section class="menu-sec" id="{s["id"]}">
  <div class="franja-cab"><span class="rotulo">PolarCAD / Barra de herramientas</span><a class="rotulo tenue" href="#barra">Volver al índice ↑</a></div>
  <div class="menu-cuerpo"><div class="texto-sec"><h3 class="subtitulo">{s["titulo"]}</h3><p class="parrafo">{INTRO.get(s["titulo"], "")}</p>{f'<p class="nota">{s["nota"]}</p>' if s["nota"] else ""}</div>{caps}</div>
  <div class="herrs">{filas}</div>
</section>''')

PLANTILLA = (RAIZ / "herramientas/manual-plantilla.html").read_text(encoding="utf-8")
INDEX = (RAIZ / "index.html").read_text(encoding="utf-8")
nav = re.search(r'<nav class="barra".*?</nav>', INDEX, re.S).group(0)
nav = re.sub(r'href="#(\w+)"', r'href="index.html#\1"', nav).replace('<a href="manual.html">', '<a href="manual.html" class="activo">')
salida = PLANTILLA.replace("<!--NAV-->", nav).replace("<!--INDICE-->", "\n".join(indice)).replace("<!--SECCIONES-->", "\n".join(cuerpo))
(RAIZ / "manual.html").write_text(salida, encoding="utf-8")
print("manual.html:", len(secciones), "secciones,", sum(len(s["items"]) for s in secciones), "herramientas")

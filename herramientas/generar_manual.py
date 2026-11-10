"""Genera manual.html (Manual de usuario de SolidMaker) desde docs/manual/polarcad-lista.md.

La lista se saca del código de SolidMaker; aquí se le quitan los selectores internos
y se convierte en secciones con su captura real. Uso: python herramientas/generar_manual.py
"""
import html, re, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
import json, sys
TR = json.loads((RAIZ / "docs/manual/en.json").read_text(encoding="utf-8")) if (RAIZ / "docs/manual/en.json").exists() else {}
FALTAN = set()
EN = "--en" in sys.argv
def tr(t):
    if not EN or not t: return t
    if t in TR: return TR[t]
    if re.fullmatch(r"-?[\d.]+ a -?[\d.]+", t): return t.replace(" a ", " to ")
    if not re.search(r"[A-Za-zÁÉÍÓÚáéíóúñÑ]{3,}", t): return t
    FALTAN.add(t); return t
def tr_ops(t):
    """Opciones «a / b / c» y valores como «desactivado»: se traduce cada una."""
    return " / ".join(tr(x.strip()) for x in t.split(" / ")) if EN else t

LISTA = (RAIZ / "docs/manual/polarcad-v2-lista.md").read_text(encoding="utf-8").split("\n## Anexo")[1]   # campos de los paneles
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
    return re.sub(r"\s+([,.:;)])", r"\1", re.sub(r"\s{2,}", " ", t))

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

def clip(ancla):
    """Clip real de la herramienta en uso, si ya se grabó (video/manual/polarcad/<ancla>.webm)."""
    ruta = f"video/manual/polarcad/{ancla}.webm"
    if not (RAIZ / ruta).exists(): return ""
    return f'<video class="clip" src="{ruta}" autoplay muted loop playsinline preload="metadata"></video>'

def captura(nombre, pie):
    # se muestra el recorte alrededor del menú (zoom/); el clic abre la pantalla completa
    return f'<figure class="cap"><a href="{IMG}{nombre}" class="ampliar"><img src="{IMG}zoom/{nombre}" alt="{html.escape(pie)}" loading="lazy"></a><figcaption>{html.escape(pie)} · clic para ver la pantalla completa</figcaption></figure>'

# ---- índice de herramientas (cada una con su hipervínculo) ----
# ---- PolarCAD con la cinta nueva (docs/manual/polarcad-v2-lista.md, capturas img/manual/polarcad-v2/) ----
V2 = (RAIZ / "docs/manual/polarcad-v2-lista.md").read_text(encoding="utf-8")
IMG2 = "img/manual/polarcad-v2/"
PRINCIPAL = V2.split("\n## Anexo")[0]
# detalle de los paneles (anexo = lista anterior): nombre de la herramienta -> (ancla antigua, campos)
DETALLE = {}
for s in secciones:
    for n, r, p in s["items"]:
        DETALLE.setdefault(slug(n), (f'{s["id"]}--{slug(n)}', r, p))
# menús que antes estaban bajo otro nombre: se conserva su ancla para no romper enlaces ni clips
ANTES = {"variantes-de-linea": "herramientas-de-dibujo-croquis", "variantes-de-circulo": "herramientas-de-dibujo-croquis",
         "variantes-de-arco": "herramientas-de-dibujo-croquis", "variantes-de-rectangulo": "herramientas-de-dibujo-croquis",
         "variantes-de-spline": "herramientas-de-dibujo-croquis", "uniones": "ensamble"}
# anclas de la versión anterior que ahora son otra herramienta (enlaces de Educación y clips grabados)
ALIAS = {"anotacion--horizontal": ["anotacion--relaciones"], "documento--nuevo-ensamble": ["ensamble--nuevo-ensamble"],
         "documento--insertar-pieza": ["ensamble--insertar-pieza"], "documento--guardar-ensamble": ["ensamble--guardar-ensamble"],
         "actuadores--motor-a-pasos": ["ensamble--actuadores-motores"]}
def articulo(n, r, p, a):
    al = ALIAS.get(a, [])
    v = next((clip(x) for x in [a] + al if clip(x)), "")
    return (f'<article class="herr{" pend" if p else ""}" id="{a}">' + "".join(f'<span id="{x}"></span>' for x in al) +
            f'<h4>{tr(n)}{" <span class=sello>" + tr("Próximamente") + "</span>" if p else ""}</h4><p>{tr(r) or tr("Se ejecuta con un clic, sin ventana de opciones.")}</p>{v}</article>')
INTRO2 = {
    "Croquis": "Todo lo que se dibuja en 2D sobre el plano activo: líneas, círculos, arcos, rectángulos, polígonos y splines, más las curvas especiales, las cotas, las relaciones y la edición de trazos.",
    "Modelo": "Convierte el croquis en sólido y lo trabaja: operaciones, cortes, acabados, transformaciones, patrones, referencias, chapa y mecanizado.",
    "Ensamblar": "Une piezas y les da movimiento: uniones (soldar, deslizante, rotacional), prueba de uniones, interferencias y actuadores.",
    "Inspeccionar": "Mide distancias, centros y propiedades físicas, acomoda piezas entre sí y define su material.",
    "Documento": "Todo lo que tiene que ver con el archivo: guardar la pieza en su proyecto, abrir, exportar, sacar el plano 2D y la lista de materiales, y trabajar con ensambles.",
    "Configuración": "Idioma de la interfaz.", "Configuración de grilla": "Tamaño de cada cuadro de la grilla en milímetros.",
    "Ayuda": "Tutorial guiado, guía de menús y atajos de teclado dentro del programa.",
    "Variantes de Línea": "Cada botón de dibujo tiene una flecha ▾ a su derecha con variantes de la misma herramienta.",
    "Uniones": "Cómo se relacionan y se mueven las piezas de un ensamble. Las uniones nunca reacomodan sus piezas: se integran tal como usted las colocó.",
    "Actuadores": "Lo único que mueve el mecanismo: motores a pasos, DC, servos y BLDC, con su prueba y su estudio de movimiento.",
    "Medir": "Distancias, ángulos, centros y propiedades físicas, más herramientas para acomodar una pieza respecto de otra.",
    "Material": "Apariencia y propiedades del material de la pieza; con él se calcula la masa.",
}
for k, v in INTRO.items(): INTRO2.setdefault(k, v)
usados = set()
def ancla(base):
    a, i = base, 2
    while a in usados: a, i = f"{base}-{i}", i + 1
    usados.add(a); return a
def filas_tabla(txt):
    out = []
    for l in txt.split("\n"):
        if not l.startswith("|") or re.fullmatch(r"\|[-| ]+\|", l.strip()): continue
        c = [x.strip() for x in l.strip().strip("|").split("|")]
        if c[0] in ("Botón", "Ítem"): continue
        out.append((c[0], c[2] if len(c) > 2 else ""))
    return out
def captura2(nombre, pie):
    return f'<figure class="cap"><a href="{IMG2}{nombre}" class="ampliar"><img src="{IMG2}{nombre}" alt="{html.escape(pie)}" loading="lazy"></a><figcaption>{html.escape(pie)} · {tr("clic para ampliar")}</figcaption></figure>'
pestanas = []
for bloque in re.split(r"\n## Pestaña ", PRINCIPAL)[1:]:
    nombre = bloque.split("\n")[0].strip()
    partes = re.split(r"\n### ", bloque)
    cap = re.search(r"Captura:\s*`([^`]+)`", partes[0])
    menus = []
    for m in partes[1:]:
        tit = re.split(r" ▾| — ", m.split("\n")[0])[0].strip()
        mid = ANTES.get(slug(tit), slug(tit))
        c = re.search(r"Captura:\s*`([^`]+)`", m)
        items = []
        for n, que in filas_tabla(m):
            n0 = limpio(n); n0 = re.sub(r"\s*\((icono|campo)\)$", "", n0) or n0
            if n0 in ("(campo)", ""): n0 = tit
            det = DETALLE.get(slug(n0)) or DETALLE.get(slug(re.sub(r"\s*\(.*?\)|…", "", n0)))
            q = limpio(que); extra = det[1] if det else ""
            if extra and slug(q) and slug(q) in slug(extra): q = ""
            texto = " ".join(x for x in [q + ("." if q and not q.endswith((".", ")")) else ""), extra] if x)
            pend = ("próximamente" in que.lower()) or (det[2] if det else False)
            a = ancla(det[0] if det and det[0].startswith(mid + "--") else f"{mid}--{slug(n0)}")
            items.append((n0, texto, pend, a))
        menus.append({"titulo": tit, "id": ancla(mid), "cap": c.group(1) if c else None, "items": items})
    menus_slugs = {slug(m["titulo"]) for m in menus}
    propias = []
    for n, que in filas_tabla(partes[0]):
        n0 = re.sub(r"\s*\((icono|campo|variantes)\)$", "", limpio(n)).strip()
        q = limpio(que)
        if not n0 or n0 == "▾" or slug(n0) in menus_slugs or slug(n0) in ("documento", "deshacer-ctrl-z", "rehacer-ctrl-y", "configuracion", "configuracion-de-grilla", "ayuda", "curvas", "anotacion", "editar", "arista", "ajustar", "1-1"): continue
        base = "herramientas-de-dibujo-croquis" if nombre == "Croquis" else "cinta-" + slug(nombre)
        if f"{base}--{slug(n0)}" in usados: continue
        propias.append((n0, q + ("." if q and not q.endswith(".") else ""), False, ancla(f"{base}--{slug(n0)}")))
    if propias: menus.insert(0, {"titulo": "Botones directos de la pestaña", "id": ancla("cinta-" + slug(nombre) + "-directos"), "cap": None, "items": propias})
    pestanas.append({"nombre": nombre, "id": ancla("cinta-" + slug(nombre)), "cap": cap.group(1) if cap else None,
                     "botones": [(limpio(n), limpio(q)) for n, q in filas_tabla(partes[0])], "menus": menus})

indice, cuerpo = [], []
for t in pestanas:
    grupos = "".join(f'<div class="grupo"><a class="g" href="#{m["id"]}">{tr(m["titulo"])}</a><div class="hs">' + "".join(f'<a href="#{a}"{" class=pend" if p else ""}>{tr(n)}</a>' for n, _, p, a in m["items"]) + "</div></div>" for m in t["menus"])
    PT = tr(f"Pestaña {t['nombre']}")
    indice.append(f'<div class="grupo"><a class="g" href="#{t["id"]}">{PT}</a></div>{grupos}')
    botones = " · ".join(f"<b>{tr(n)}</b>" for n, _ in t["botones"])
    cuerpo.append(f'''<section class="menu-sec" id="{t["id"]}">
  <div class="franja-cab"><span class="rotulo">PolarCAD / {tr("Cinta de herramientas")}</span><a class="rotulo tenue" href="#barra">{tr("Volver al índice ↑")}</a></div>
  <div class="menu-cuerpo"><div class="texto-sec"><h3 class="subtitulo">{PT}</h3><p class="parrafo">{tr(INTRO2.get(t["nombre"], ""))}</p><p class="nota">{tr("Botones de esta pestaña")}: {botones}</p></div>{captura2(t["cap"], PT) if t["cap"] else ""}</div>
</section>''')
    for m in t["menus"]:
        filas = "".join(articulo(*it) for it in m["items"])
        cuerpo.append(f'''<section class="menu-sec" id="{m["id"]}">
  <div class="franja-cab"><span class="rotulo">PolarCAD / {tr(t["nombre"])}</span><a class="rotulo tenue" href="#barra">{tr("Volver al índice ↑")}</a></div>
  <div class="menu-cuerpo"><div class="texto-sec"><h3 class="subtitulo">{tr(m["titulo"])}</h3><p class="parrafo">{tr(INTRO2.get(m["titulo"], ""))}</p></div>{captura2(m["cap"], f"{tr(m['titulo'])} menu open in PolarCAD" if EN else f"Menú {m['titulo']} abierto en PolarCAD") if m["cap"] else ""}</div>
  <div class="herrs">{filas}</div>
</section>''')
secciones_v2 = [m for t in pestanas for m in t["menus"]]

SAL = "manual-en.html" if EN else "manual.html"
PLANTILLA = (RAIZ / ("herramientas/manual-plantilla-en.html" if EN else "herramientas/manual-plantilla.html")).read_text(encoding="utf-8")
INICIO = "index-en.html" if EN else "index.html"
INDEX = (RAIZ / INICIO).read_text(encoding="utf-8")
nav = re.search(r'<nav class="barra".*?</nav>', INDEX, re.S).group(0)
nav = re.sub(r'href="#(\w+)"', rf'href="{INICIO}#\1"', nav).replace('<a href="manual.html">', f'<a href="{SAL}" class="activo">')
if EN: nav = nav.replace('class="idioma" href="index.html"', 'class="idioma" href="manual.html"')
else: nav = nav.replace('class="idioma" href="index-en.html"', 'class="idioma" href="manual-en.html"')
salida = PLANTILLA.replace("<!--NAV-->", nav).replace("<!--INDICE-->", "\n".join(indice)).replace("<!--SECCIONES-->", "\n".join(cuerpo))
(RAIZ / SAL).write_text(salida, encoding="utf-8")
print(SAL + ":", len(secciones_v2), "menús,", sum(len(m["items"]) for m in secciones_v2), "herramientas")


# ---------- módulos 02-05 (listas con «## sección», «Captura:» y tablas de botones y campos) ----------
MODULOS = [("machin", "Machin", "Módulo 02"), ("polarslicer", "PolarSlicer", "Módulo 03"),
           ("laboratory", "Laboratory", "Módulo 04"), ("analizer", "Analizer", "Módulo 05")]

def celdas(f):
    return [c.strip() for c in f.strip().strip("|").split("|")]

# Primeros pasos de cada módulo: el camino mínimo para lograr algo en la primera sesión.
PRIMEROS = {
    "machin": ["En el menú lateral entra a Maquinado: se abre Machin con la máquina por defecto, PolarONE.",
               "En el menú Máquina elige otra máquina Stonward o usa «Adquirir nueva máquina» para instalar un paquete .zip.",
               "Desde PolarSlicer pulsa «Enviar a Machin», o abre un archivo de G-code o S-code.",
               "Pulsa reproducir para simular la trayectoria con la cinemática real. El semáforo avisa si algún punto queda fuera de alcance.",
               "Para mover la máquina real, conecta el controlador por USB y abre la comunicación en el panel izquierdo."],
    "polarslicer": ["En el menú lateral entra a Laminador: se abre PolarSlicer.",
                    "Elige la máquina en el selector junto a «Enviar a Machin». La salida cambia sola entre G-code y S-code según su cinemática.",
                    "Importa la pieza en STL y acomódala en el disco o la cama.",
                    "Ajusta boquilla, extrusor, relleno, soportes y modo de rebanado (plano, diagonal o elíptico).",
                    "Rebana, revisa capa por capa con el deslizador y envía el resultado a Machin."],
    "laboratory": ["En el menú lateral entra a Laboratorio: se abre el banco de pruebas.",
                   "Importa el ensamble de PolarCAD. Sus piezas conservan su nombre y su posición.",
                   "En Cinemática revisa las juntas y usa «Resolver mecanismo» para mecanismos de lazo cerrado.",
                   "En Electrónica agrega fuentes, PLC, sensores y actuadores, y cabléalos.",
                   "En Control programa la escalera, pasa a RUN y observa la máquina y el circuito responder."],
    "analizer": ["En el menú lateral entra a Análisis: se abre Analizer.",
                 "Carga la pieza y genera la malla en la pestaña Malla. Revisa el diagnóstico antes de seguir.",
                 "En FEA asigna material, apoyos y cargas, y calcula esfuerzos y deformaciones.",
                 "En CFD elige viento o flujo, define la velocidad y corre la simulación.",
                 "En Resultados recorre los campos con la escala de color y exporta las imágenes que necesites."],
}

# ---- traducción al inglés (manual-en.html): docs/manual/en.json, texto español -> inglés ----
def modulo_html(clave, nombre, num):
    texto = (RAIZ / f"docs/manual/{clave}-lista.md").read_text(encoding="utf-8")
    cab, *secs = re.split(r"\n## ", texto)
    intro = [tr(limpio(p)) for p in cab.split("\n\n")[1:] if p.strip() and not p.startswith(("Código", "Cada sección", "Fuente", "#"))]
    partes = [f'''<section class="franja mod-sec" id="{clave}">
  <div class="franja-cab"><span class="rotulo">{tr(num)} / {nombre}</span><a class="rotulo tenue" href="#modulos">{tr("Volver a los módulos ↑")}</a></div>
  <div class="relleno-celda" style="border-bottom:1px solid var(--linea)"><h2 class="titulo">{nombre}.</h2>{"".join(f'<p class="parrafo{" grande" if i == 0 else ""}">{p}</p>' for i, p in enumerate(intro))}</div>''']
    if clave in PRIMEROS:
        partes.append('<div class="relleno-celda primeros" style="border-bottom:1px solid var(--linea)"><span class="rotulo">' + tr("Primeros pasos") + '</span><ol>' + "".join(f"<li>{html.escape(tr(x))}</li>" for x in PRIMEROS[clave]) + "</ol></div>")
    indice = []
    for s in secs:
        lin = s.split("\n")
        titulo = re.sub(r"^(Sección|Pestaña|Panel)\s+", "", lin[0].strip()).strip()
        titulo = titulo[:1].upper() + titulo[1:].lower() if titulo.isupper() else titulo
        titulo = tr(titulo)
        sid = f"{clave}--{slug(titulo)}"
        indice.append(f'<a href="#{sid}">{html.escape(titulo)}</a>')
        cap = re.search(r"Captura:\s*`([^`]+)`", s)
        notas = [tr(limpio(l)) for l in lin[1:] if l.strip() and not l.startswith(("|", "Captura"))]
        campos, botones, sueltos = [], [], []
        hdr = None
        for l in lin:
            if not l.startswith("|"): hdr = None; continue
            c = celdas(l)
            if re.fullmatch(r"[-| ]+", l.strip()): continue
            if c[0] in ("Botón", "Campo"): hdr = c[0]; continue
            if hdr == "Campo":
                nom, _, tipo, uni, defe, rango = (c + [""] * 6)[:6]
                det = " · ".join(x for x in [f"{tr('Unidad')}: {uni}" if uni else "", f"{tr('De fábrica')}: <b>{html.escape(tr_ops(defe))}</b>" if defe else "", f"{tr('Rango u opciones')}: {html.escape(tr_ops(rango))}" if rango else ""] if x)
                campos.append((tr(limpio(nom)), det, "Próximamente" in l))
            elif hdr == "Botón":
                nom, _, que = (c + [""] * 3)[:3]
                if que: botones.append((tr(limpio(nom)), tr(limpio(que)), "Próximamente" in que))
                elif nom and nom != "(icono)": sueltos.append(tr(limpio(nom)))
        tarj = "".join(f'<article class="herr{" pend" if p else ""}"><h4>{n}{" <span class=sello>" + tr("Próximamente") + "</span>" if p else ""}</h4><p>{d or tr("Sin opciones adicionales.")}</p></article>' for n, d, p in campos + botones)
        otros = f'<p class="otros"><span class="rotulo tenue">{tr("Otros botones de esta vista")}</span> {" · ".join(sueltos)}</p>' if sueltos else ""
        fig = f'<figure class="cap ancha-mod"><a href="img/manual/{clave}/{cap.group(1)}" class="ampliar"><img src="img/manual/{clave}/{cap.group(1)}" alt="{html.escape(nombre + ": " + titulo)}" loading="lazy"></a><figcaption>{html.escape(nombre)} · {html.escape(titulo)} · {tr("clic para ampliar")}</figcaption></figure>' if cap else ""
        partes.append(f'''  <div class="vista" id="{sid}">
    <div class="relleno-celda"><span class="rotulo tenue">{html.escape(nombre)}</span><h3 class="subtitulo" style="margin:10px 0 0">{html.escape(titulo)}</h3>{"".join(f'<p class="nota">{n}</p>' for n in notas)}</div>
    {fig}
    {f'<div class="herrs">{tarj}</div>' if tarj else ""}{otros}
  </div>''')
    partes.insert(1, f'  <div class="indice-mod">{"".join(indice)}</div>')
    partes.append("</section>")
    return "\n".join(partes)

salida = salida.replace("<!--MODULOS-->", "\n".join(modulo_html(*m) for m in MODULOS))
(RAIZ / SAL).write_text(salida, encoding="utf-8")
print("módulos:", ", ".join(m[1] for m in MODULOS))

if EN:
    (RAIZ / "herramientas/.faltan-en.txt").write_text("\n".join(sorted(FALTAN)), encoding="utf-8")
    print("EN: faltan", len(FALTAN), "frases (herramientas/.faltan-en.txt)")

# PolarCAD — barra superior de herramientas

Fuente: leído del código (no de la interfaz), 2026-10-26.
- Barra: `#toolbar` en `FRONTEND/motores/cad/plantillas/polarcad.html`.
- Desplegables: botón `[data-cdd-toggle="<id>"]` abre `#<id>` (`ui/shell/toolbarSidebar.js`).
- Qué hace cada ítem `[data-cmd]`: `app/main.js` (líneas 60-92) y `ui/shell/toolbarSidebar.js` (`DATA_TOOL_TO_SKETCH`, `DATA_CMD_TO_SKETCH`).
- Campos de los paneles: `ui/operaciones/opDefs.js` (`OP_DEFS`), `features/patrones/patrones.js`, `ui/operaciones/opPanel.js` (Fillet/Chaflán/Recortar…, Malla recubierta), `features/referencia/referencia.js`.
- Los paneles se abren en la Consola de herramientas (izquierda), en `#op-params-panel`, con los botones Aplicar `#op-apply` y Cancelar `#op-cancel`.

Formato de los campos: **Nombre (unidad)** — valor por defecto. "seg" = botones de opción; "select" = lista.

---

## Fila 1

### Documento ▾ — `#btn-documento` → `#documento-dd`
| Ítem | id | Panel / campos |
|---|---|---|
| Guardar | `#doc-guardar` | Sin panel. Guarda la pieza (.pms.json) en su proyecto. Atajo Ctrl+S |
| Guardar como… | `#doc-gestor` | Diálogo: proyecto, carpeta y nombre |
| Abrir archivo… | `#doc-abrir` | Selector de archivo .json del equipo |
| Nuevo | `#doc-nuevo` | Sin panel |
| Exportar pieza… | `#doc-exportar` | Diálogo de formato: STL, OBJ, STEP o IGES |
| Plano 2D… | `#doc-plano2d` | Dibujo técnico (SVG, DXF, PDF) |
| Importar STL | `#doc-importar` | Selector de archivo |
| Descargar copia (.json) | `#doc-descargar` | Sin panel |
| Recuperar trabajo sin guardar | `#doc-recuperar` | Lista de copias automáticas (cada 30 s) |

### Ensamble ▾ — `#btn-ensamble` → `#ensamble-dd` (ítems `[data-ens]`, `features/ensamble/ensamble.js`)
| Ítem | selector | Panel |
|---|---|---|
| Nuevo ensamble | `[data-ens="nuevo"]` | Sin campos (.ens.json vacío) |
| Insertar pieza… | `[data-ens="insertar"]` | Elegir piezas del proyecto. La primera queda fija |
| Fijar / liberar | `[data-ens="fijar"]` | Sin campos |
| Actuadores (motores)… | `[data-ens="actuadores"]` | Sección Actuadores (`features/actuadores/actuadores.js`) |
| Guardar ensamble | `[data-ens="guardar"]` | Sin campos. Atajo Ctrl+S |

### Material ▾ — `#btn-material` → `#material-dd` (ítems `[data-mat]`, `features/materiales/materiales.js`)
| Ítem | selector | Panel |
|---|---|---|
| Apariencia… | `[data-mat="apariencia"]` | Biblioteca, color, acabado y mapas PBR |
| Propiedades… | `[data-mat="propiedades"]` | Material asignado, propiedades mecánicas y masa |
| Copiar apariencia | `[data-mat="copiar"]` | Sin campos |
| Pegar apariencia | `[data-mat="pegar"]` | Sin campos |
| Restablecer | `[data-mat="reset"]` | Sin campos (vuelve a plástico mate) |
| Cargar mapas PBR… | `[data-mat="pbr"]` | Albedo, normal, rugosidad, metalicidad, AO |
| Masa total | `[data-mat="masa"]` | Sin campos |

### Deshacer / Rehacer
| Botón | id | Atajo |
|---|---|---|
| Deshacer | `#btn-undo` | Ctrl+Z |
| Rehacer | `#btn-redo` | Ctrl+Y |

### Herramientas de dibujo (croquis)
Al hacer clic: el botón activa la herramienta en el plano activo. No tienen panel de campos. Se termina con Esc; los splines se cierran con Enter o doble clic. Clics: lo que pide `SKETCH_TOOL_DEFS.n` en `engines/engine2d/tools/sketchToolDefs.js`.

| Botón | selector | Herramienta | Clics |
|---|---|---|---|
| ▶ Seleccionar | `.tb.tool[data-tool="select"]` | — (atajo V) | — |
| ╱ Línea | `[data-tool="line"]` | line (atajo L) | 2 |
| Círculo | `[data-tool="circle"]` | circle (atajo C) | 2 |
| Arco | `[data-tool="arc"]` | arcCenter | 3 |
| Rectángulo | `[data-tool="rect"]` | rectCorner | 2 |
| Polígono | `[data-tool="polygon"]` | polygon | 2 |
| Spline | `[data-tool="spline"]` | spline | varios |

**Polígono, campo en la barra:** Lados — `#poligono-lados`, número entero, mín. 3, máx. 64. Por defecto: **6**.

Variantes (▾ al lado de cada botón):
| Menú | id | Ítems (`data-cmd` → herramienta) |
|---|---|---|
| Línea ▾ | `#line-dd` | Línea `linea`→line · Línea constructiva `linea-constructiva`→construction · Polilínea `polilinea`→polyline (se cierra con doble clic) · Línea encadenada `linea-encadenada`→lineChain (se corta con Esc) · Línea de punto medio `linea-punto-medio`→midline |
| Círculo ▾ | `#circle-dd` | Círculo `circulo`→circle · Elipse `elipse`→ellipse · Círculo de 3 puntos `circulo-3p`→circle3 |
| Arco ▾ | `#arc-dd` | Arco de centro `arco-centro`→arcCenter · Arco de 3 puntos `arco-3p`→arc3 · Arco tangente `arco-tangente`→arcTangent |
| Rectángulo ▾ | `#rect-dd` | De esquina `rect-esquina`→rectCorner · De centro `rect-centro`→rectCenter · De 3 puntos `rect-3p`→rect3 |
| Spline ▾ | `#spline-dd` | Spline `spline`→spline · Spline de estilo (cerrada) `spline-estilo`→splineClosed |

### Curvas ▾ — `[data-cdd-toggle="curvas-dd"]` → `#curvas-dd`
| Ítem | data-cmd | Panel / campos |
|---|---|---|
| Logarítmica | `curva-log` | Herramienta polarLog, 2 clics. Sin campos |
| Offset | `curva-offset` | Panel **Offset** (`OP_DEFS.offset`): Distancia (mm), negativo = hacia adentro — **5** (paso 0,5) · Unión de esquinas, seg: Recta / Redondeada — **Recta** · Motor, seg: Local / Backend — **Backend** |
| PolyPolar | `curva-polar` | Herramienta polyPolar (tramos logarítmicos, 2 o más clics). Sin campos |
| División | `curva-division` | Herramienta div (radios desde el centro). Usa los Lados de `#poligono-lados` (**6**) |

### Anotación ▾ — `[data-cdd-toggle="anot-dd"]` → `#anot-dd`
| Ítem | selector | Panel |
|---|---|---|
| Cota | `[data-cmd="cota"]` | Herramienta dimension, 2 clics |
| Medir | `[data-cmd="medir"]` | Herramienta measure |
| Medir en 3D | `#med-3d` | `features/medicion/medicion.js` |
| Propiedades físicas | `#med-fis` | `features/medicion/medicion.js` |
| Texto | `[data-cmd="texto"]` | Herramienta text |
| Caja de información | `[data-cmd="caja-info"]` | Herramienta infobox |
| Armado de plano | `[data-cmd="armado-plano"]` | Todavía no está conectado (próximamente) |
| Relaciones | `rel-horiz`, `rel-vert`, `rel-par`, `rel-perp`, `rel-eq`, `rel-coinc`, `rel-tan`, `rel-conc`, `rel-fix` | Sin campos. Aplica la relación a los trazos que selecciones (Horizontal, Vertical, Paralela, Perpendicular, Igual, Coincidente, Tangente, Concéntrica, Fija) |
| Ver grados de libertad | `[data-cmd="rel-gl"]` | Sin campos. Pinta en azul lo que todavía se mueve y en blanco lo que está totalmente definido |

### Editar ▾ — `[data-cdd-toggle="editar-dd"]` → `#editar-dd`
| Ítem | data-cmd | Panel |
|---|---|---|
| Recortar | `herr-trim` | Panel "Trim". Sin campos: cada clic quita un trozo. Se termina con «Terminar» |
| Extender | `herr-extend` | Panel "Extend". Sin campos |
| Dividir | `herr-split` | Panel "Split". Sin campos |
| Estirar | `herr-estirar` | Sin panel |
| Unir trazos | `herr-unir` | Sin panel |
| Descomponer | `herr-descomponer` | Sin panel |

---

## Fila 2

### Operaciones ▾ — `#btn-operaciones` → `#operaciones-dd`
| Ítem | id / data-cmd | Panel / campos |
|---|---|---|
| Extruir Contorno (recto) | `#op-extruir` | **Extruir**: Altura (mm) — **20** (mín. 0,1) · Dirección, seg: Arriba / Abajo — **Arriba** · Ángulo de salida (°) — **0** (paso 0,5) |
| Revolución (usa el Perfil) | `#op-revolucion` | **Revolución**: Eje, seg: Auto / Línea… / X / Y / Z — **Auto** · Línea del eje, lista con las líneas del croquis (solo si Eje = Línea) · Ángulo (°) — **360** (de 1 a 360) · Dirección, seg: Normal / Invertida / Simétrica — **Normal** (solo si el ángulo es menor de 360) |
| Combinar en un solo STL | `combinar-stl` | Sin panel. Hay que tener 2 o más piezas seleccionadas |
| Barrido | `#op-barrido` | **Barrido**: Ruta, se elige en el visor — sin valor · Esquinas de la ruta, seg: Inglete / Redondeadas — **Inglete** · Radio de esquina (mm) — **5** (solo si Redondeadas) · Giro a lo largo (°) — **0** · Extremos, seg: Pegar a las caras / Tal cual — **Pegar a las caras** |
| Malla recubierta | `malla-recubierta` | **Malla recubierta**: trazos del borde, se eligen con clic · Densidad, seg: Low (16/5) / Medium (32/10) / High (64/20) / Personalizado — **Medium** · con Personalizado: Muestreo del borde — **32** (mín. 8) y Anillos — **10** (mín. 2) |
| Quitar operación (solo croquis) | `#op-ninguna` | Sin panel |
| Editar última operación de la pieza | `#op-editar` | Vuelve a abrir la última operación con sus valores |

### Corte ▾ — `[data-cdd-toggle="corte-dd"]` → `#corte-dd`
| Ítem | id / data-cmd | Panel / campos |
|---|---|---|
| Corte extruido | `#op-corte-extruido` | **Corte extruido**: Profundidad, seg: Medida / Pasante — **Medida** · Profundidad (mm) — **10** (solo si Medida) · Dirección, seg: Abajo / Arriba / Ambos — **Ambos** (**Abajo** si el plano activo es una cara) · Figura inversa, seg: Quitar figura / Conservar solo figura — **Quitar figura** |
| Corte por revolución | `corte-revolucion` | **Corte por revolución**: los mismos campos de Revolución (Eje **Auto**, Ángulo **360**, Dirección **Normal**) |
| Corte barrido | `corte-barrido` | **Corte por barrido**: los mismos de Barrido sin «Extremos» (Ruta, Esquinas **Inglete**, Radio **5**, Giro **0**) |
| Vaciado | `#corte-vaciado` | **Vaciado**: Grosor de pared (mm) — **2** (mín. 0,1) · Caras abiertas, se eligen en el visor — ninguna |

### Acabado ▾ — `[data-cdd-toggle="acabado-dd"]` → `#acabado-dd`
| Ítem | data-cmd | Panel / campos |
|---|---|---|
| Esquina esférica | `esquina-esferica` | Todavía no está conectado (solo muestra un aviso) |
| Fillet cóncavo | `fillet-concavo` | **Fillet 2D**: Radio (mm) — **5** (mín. 0,1, paso 0,5). Cada clic en una esquina aplica |
| Fillet convexo | `fillet-convexo` | **Fillet 2D**: el mismo campo |
| Chaflán | `chaflan` | **Chaflán 2D**: Distancia (mm) — **5** |

### Referencia ▾ — `[data-cdd-toggle="referencia-dd"]` → `#referencia-dd` (ítems `[data-ref]`, `features/referencia/referencia.js`)
| Ítem | selector | Panel / campos |
|---|---|---|
| Plano de referencia | `[data-ref="plano"]` | Cómo: Desfase / ángulo (**por defecto**), 3 puntos, Normal a eje. **Desfase/ángulo**: Plano de base — **Superior** (o «Cara elegida» si hay una cara activa) · Distancia (mm), negativa = al otro lado — **10** · Ángulo (°) — **0** · Girar alrededor del — **eje X del plano de base**. **3 puntos**: Primer, Segundo y Tercer punto (X, Y, Z en mm o fórmula, botón «Elegir»). **Normal a eje**: Eje — X/Y/Z u otro eje · Distancia a lo largo del eje (mm). Siempre: Nombre (vacío = automático) |
| Eje de referencia | `[data-ref="eje"]` | Cómo: 2 puntos (**por defecto**) → Desde y Hasta (X, Y, Z) · Cruce de 2 planos → Primer plano y Segundo plano · Centro de figura → Figura cerrada del croquis. Además: Nombre |
| Punto de referencia | `[data-ref="punto"]` | Coordenadas: Posición X, Y, Z — **0, 0, 0** · Nombre |
| Mostrar u ocultar todas | `[data-ref="ver"]` | Sin campos |

### Transformaciones ▾ — `[data-cdd-toggle="transform-dd"]` → `#transform-dd`
Se aplican a los trazos seleccionados (`sketchEditor.transformar`). No tienen panel de campos.
| Ítem | data-cmd |
|---|---|
| Mover (punto base) | `xf-mover` |
| Copiar (punto base) | `xf-copiar` |
| Rotar | `xf-rotar` |
| Escalar | `xf-escalar` |
| Simetría de trazos | `xf-simetria` |

### Patrones ▾ — `[data-cdd-toggle="patrones-dd"]` → `#patrones-dd` (`features/patrones/patrones.js`)
| Ítem | data-cmd | Panel / campos |
|---|---|---|
| Matriz lineal | `matriz-lineal` | **Matriz lineal**: Dirección, seg: X / Y / Z — **X** · Cantidad, contando la original — **3** (de 2 a 200) · Separación (mm), negativa = sentido contrario — **tamaño de la pieza en ese eje + 5** (20 si no hay pieza) · Resultado, seg: Piezas separadas / Unir en una — **Piezas separadas** |
| Matriz circular | `matriz-circular` | **Matriz circular**: Eje, seg: X / Y / Z — **Z** · Cantidad, contando la original — **6** (de 2 a 200) · Ángulo total (°), 360 = vuelta completa — **360** · Centro X / Y / Z (mm) — **0 / 0 / 0** · Orientación de las copias, seg: Girar / Mantener — **Girar** · Resultado — **Piezas separadas** |
| Matriz por croquis | `matriz-croquis` | **Matriz por croquis**: Resultado — **Piezas separadas** |
| Simetría | `simetria` | **Simetría**: Plano de simetría, seg: YZ / XZ / XY / Plano activo — **YZ** · Distancia al origen (mm) — **0** (no aparece con Plano activo) · Resultado — **Unir en una** |

### Chapa ▾ — `[data-cdd-toggle="chapa-dd"]` → `#chapa-dd`
| Ítem | data-cmd | Panel / campos |
|---|---|---|
| Brida base | `brida-base` | **Brida base**: Espesor común, lista: Personalizado, 0,5 … 6 mm — **1,5 mm** · Espesor (mm) — **1,5** · Radio de doblez interior (mm) — **1,5** · Factor K (fibra neutra) — **0,44** (de 0,1 a 0,5) · Dirección, seg: Arriba / Abajo — **Arriba** |
| Brida de arista | `brida-arista` | Todavía no está conectado |
| Doblar | `doblar` | **Doblar**: Ángulo (°) — **90** (de 1 a 180) · Radio interior (mm) — **el de la chapa** (1,5 si no hay chapa) · Factor K — **el de la chapa** (0,44 si no hay chapa) · Doblar hacia, seg: Arriba (+normal) / Abajo — **Arriba** · Lado que se dobla, seg: Izquierda / Derecha — **Izquierda** |
| Desplegar | `desplegar` | **Desplegar**: sin campos, solo una nota |
| Pliegues recogidos | `pliegues-recogidos` | Todavía no está conectado |
| Nervio | `nervio` | Todavía no está conectado |

### Mecanizado ▾ — `[data-cdd-toggle="mecanizado-dd"]` → `#mecanizado-dd`
Campos que comparten los cinco (`_orient`): Ubicación, se elige con clic en la pieza · Inclinación (°), de 0 a 360 — **0** · Rotación de la inclinación (°), de 0 a 360 — **0**.

| Ítem | data-cmd | Panel / campos |
|---|---|---|
| Taladro | `taladro` | **Taladro**: Caso común, lista (Pasante M3…M10, Piloto M3, Pasador Ø3, Eje NEMA 17, Alojamientos de rodamientos 608/623/624/625) — **Personalizado** · Serie de brocas, seg: Métrica / Fracc. / Núm. / Letra / Otra — **Métrica** · Broca, lista — **6** (métrica), **16** (fracc.), **7** (núm.), **F** (letra) · Ø (mm) — **6** (solo con Otra) · Profundidad, seg: Medida / Pasante — **Medida** · Profundidad (mm) — **10** · Punta de broca, seg: Plana / 118° / 135° — **Plana** · + los campos comunes |
| Taladro roscado | `taladro-roscado` | **Taladro roscado**: Rosca estándar, lista — **M6** · Ø nominal (mm) — **6** · Paso (mm) — **1** · Ø broca de macho (mm) — **5** · Agujero, seg: Ciego / Pasante roscado — **Ciego** · Profundidad de rosca (mm) — **12** · Profundidad de agujero (mm) — **15** · Sentido, seg: Derecha / Izquierda — **Derecha** · Resolución, seg: Normal / Fina — **Normal** · + los campos comunes |
| Rosca de tornillo | `rosca-tornillo` | **Rosca de tornillo**: Rosca estándar, lista — **Automática (según el Ø detectado)** · Superficie cilíndrica, se elige en el visor · Paso (mm) — **1** · Longitud de rosca (mm) — **10** · Empezar desde, seg: Extremo clicado / Extremo opuesto — **Extremo clicado** · Sentido — **Derecha** · Resolución — **Normal** |
| Avellanado | `avellanado` | **Avellanado**: Caso común, lista — **M3** · Ø tornillo / agujero (mm) — **3,4** · Ø cabeza (mm) — **6,3** · Ángulo del cono (°) — **90** (de 10 a 170) · Agujero, seg: Solo cono / Medida / Pasante — **Pasante** · Profundidad (mm) — **12** (solo con Medida) · + los campos comunes |
| Abocardado | `abocardado` | **Abocardado**: Caso común (ISO 4762), lista — **M3** · Ø agujero (mm) — **3,4** · Ø abocardado (mm) — **6,5** · Profundidad abocardado (mm) — **3,4** · Agujero, seg: Medida / Pasante — **Pasante** · Profundidad (mm) — **12** (solo con Medida) · Punta de broca — **Plana** (no aparece con Pasante) · + los campos comunes |

### Vista y ajustes (final de la fila 2)
| Botón | id | Panel / campos |
|---|---|---|
| ⊡ Ajustar | `#btn-zfit` | Zoom para ver todo (atajo F) |
| 1:1 | `#btn-z1` | Zoom 1:1 |
| ⌐ Arista | `#btn-edge-mode` | Selección de arista (Fillet/Chamfer 3D, todavía en construcción) |
| Configuración (icono de barras ≡) | `#btn-settings` → `#settings-dd` | Idioma, lista `#lang-select`: Español / Deutsch / English / Français / 日本語 / 中文 — **Español** |
| Configuración de grilla (engranaje) | `#btn-grid-settings` → `#grid-settings-dd` | Tamaño de grilla (mm por cuadro) `#inp-grid-size-cfg` — **5** (de 1 a 500) |

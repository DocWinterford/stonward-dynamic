# Laboratory (Laboratorio) — PolarLaboratorio — controles

Banco de ensamble: importa piezas STL o de un proyecto, las une con mates, revisa interferencias, simula cinemática y física, y conecta electrónica y control (paneles, placas, cableado, PLC/Ladder).

Código: `FRONTEND/motores/bench/BenchMAIN.js` y sus módulos en `bench/` (kinematics, interference, plc, modules, components…). Pestaña lateral `.engine-tab[data-engine="bench"]` (rótulo LABORATORIO).

Arriba hay pestañas de modo (Proyecto, Cinemática, Simulación, Electrónica, Control); cada una cambia la cinta de botones y el panel izquierdo. A la derecha, un riel de iconos abre paneles deslizables (Proyecto, Interferencias, Material, Propiedades, Relaciones, Diagnóstico de malla).

Cada sección corresponde a una captura (`img/manual/laboratory/<archivo>.jpg`). Un control que se ve en varias capturas se lista una sola vez, en la más específica. «Qué hace» es el texto de ayuda (title) del propio programa; vacío = el nombre del botón lo dice. Valores por defecto leídos del programa recién abierto, sin pieza cargada.

## Pantalla completa recién abierto (pestaña Proyecto, submodo Material)
Captura: `01-pantalla-completa.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Proyecto | — |  |
| Material | — |  |
| Propiedades | — |  |
| Interferencias | — |  |
| Cinemática | — |  |
| Simulación | — |  |
| Electrónica | — |  |
| Control | — |  |
| mm | `#unit-mm` |  |
| in | `#unit-in` |  |
| Importar STL | `button[data-tid="imp"]` | Importar uno o varios archivos STL del equipo |
| De un proyecto | `button[data-tid="imp-proy"]` | Importar piezas de CAD desde un proyecto, con vista previa (una o todas las de una carpeta) |
| Exportar ensamble | `button[data-tid="exp"]` | Un solo STL fusionado con las piezas visibles |
| Piezas (ZIP) | `button[data-tid="exp-zip"]` | Cada pieza como .stl independiente, ya posicionada |
| Exportar STEP | `button[data-tid="exp-step"]` | Sólidos reales vía kernel CadQuery/OCCT |
| Guardar | `button[data-tid="save"]` | Guardar el ensamble en su proyecto (.bench.json) · Ctrl+S · Ctrl+Mayús+S = Guardar como |
| Abrir | `button[data-tid="open"]` | Abrir un ensamble (.bench.json) de un proyecto, o un .zip del equipo |
| Ayuda | `button[data-tid="help"]` | Atajos de teclado |
| Cargar mapas PBR | `button[data-tid="mt-pack"]` | Albedo, normal, rugosidad, metalicidad y AO (el tipo se reconoce por el nombre del archivo) |
| Copiar apariencia | `button[data-tid="mt-copy"]` | Copia color, acabado y mapas de la pieza activa |
| Pegar apariencia | `button[data-tid="mt-paste"]` | Pega la apariencia copiada en la selección |
| Restablecer | `button[data-tid="mt-reset"]` | Quita mapas y vuelve al plástico mate |
| (icono) | `#left-toggle` | Ocultar / mostrar panel de piezas y mates |
| (icono) | `button[data-tool="select"]` | Seleccionar (Q) |
| (icono) | `button[data-tool="move"]` | Mover (G) |
| (icono) | `button[data-tool="rotate"]` | Rotar (E) |
| (icono) | `button[data-tool="interact"]` | Interactuar (I · o Alt+clic): usa la simulación sin seleccionar ni mover piezas — pulsa botones, gira perillas, pulsa contactos del ladder |
| (icono) | `button[data-action="frame"]` | Encuadrar todo (F) |
| (icono) | `button[data-action="wireframe"]` | Alternar wireframe (Z) |
| (icono) | `button[data-action="ghost"]` | Modo transparencia (rayos X) |
| (icono) | `#tool-toggle-refs` | Ocultar referencias (grilla, ejes, contornos de selección/interferencia) |
| (icono) | `#tool-section` | Vista de sección (corte) |
| (icono) | `#tool-measure` | Medir distancia entre dos puntos |
| (icono) | `#tool-explode` | Vista explosionada (desensamblar por ejes) |
| (icono) | `#tl-first` | Ir al inicio |
| (icono) | `#tl-prev` | Cuadro anterior |
| (icono) | `#tl-play` | Reproducir (Espacio) |
| (icono) | `#tl-next` | Cuadro siguiente |
| (icono) | `#tl-last` | Ir al final |
| (icono) | `#tl-loop` | Repetir en bucle |
| (icono) | `#lab-carpeta` | Proyecto: el mismo panel de CAD (proyectos, piezas, Biblioteca). Doble clic en una pieza la trae al Laboratorio con su nombre, color y material. |
| 0 | `button[data-slide="interf"]` | Interferencias |
| (icono) | `button[data-slide="material"]` | Material |
| (icono) | `button[data-slide="props"]` | Propiedades de la pieza |
| (icono) | `button[data-slide="canales"]` | Relaciones entre piezas |
| (icono) | `button[data-slide="mesh-doctor"]` | Diagnóstico de malla |
| MIA | — | MIA: clic para hablar, clic derecho para escribir |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Rejilla | `#grid-size-input` | number | mm | 5 | ≥ 0.1 |
| Celda | `#grid-cell-input` | number | mm | 10 | ≥ 1 |
| Inicio de la línea de tiempo (s) | `#tl-start` | text | s | 0 |  |
| Fin de la línea de tiempo (s) | `#tl-end` | text | s | 10 |  |

## Pestaña Proyecto, submodo Propiedades
Captura: `02-proyecto-propiedades.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Masa del ensamble | `button[data-tid="pr-mass"]` | Suma la masa de todas las piezas con material asignado |
| Copiar propiedades | `button[data-tid="pr-copy"]` |  |
| Pegar propiedades | `button[data-tid="pr-paste"]` |  |
| (icono) | — | Sacar como ventana flotante |
| Selección | `button[data-scope="sel"]` |  |
| Todas las piezas | `button[data-scope="all"]` |  |

## Pestaña Proyecto, submodo Interferencias
Captura: `03-proyecto-interferencias.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Analizar | `button[data-tid="if-an"]` | Busca interferencias reales |
| Colisión exacta | `button[data-tid="if-ex"]` | Verificación booleana exacta (kernel) |
| Resolver todo | `button[data-tid="if-all"]` | Calcula y acepta todas las soluciones |
| Diagnóstico de malla | `button[data-tid="md"]` | Mallas abiertas / reparación |
| Analizar | `#if-analyze` |  |
| Probar todo | `#if-try-all` | Aplica todas las soluciones en vista previa, sin confirmarlas |
| Resolver todo | `#if-solve-all` | Calcula y acepta todas las soluciones automáticamente |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Tolerancia | `#if-tol` | number | mm | 0.05 | ≥ 0 |
| Ajuste automático máx. | `#if-maxadj` | number | mm | 2 | ≥ 0.1 |
| Incluir pares con mate | `#if-mated` | checkbox |  | desactivado |  |

## Pestaña Cinemática
Captura: `04-pestana-cinematica.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Detección | — |  |
| Joints | — |  |
| Canales | — |  |
| Transmisión | — |  |
| Correr prueba | `button[data-tid="c-sim"]` | Recorre la línea de tiempo y reporta colisiones y límites |
| Validar matriz | `button[data-tid="c-val"]` | Detecta ciclos y scripts con errores |
| Revisar | `button[data-tid="cd-det"]` | Lista las relaciones cinemáticas que Laboratorio reconoce (husillo + tuerca, riel + carro, engranes, ejes…) para aplicarlas |
| Quitar automáticas | `button[data-tid="cd-del"]` | Borra las juntas creadas por la detección |
| ▶ Modo prueba | `#joint-test-toggle` | Anima todos los canales activados entre su mínimo y máximo |
| (icono) | `button[data-slide="script"]` | Scripts |
| (icono) | `button[data-slide="matrix"]` | Canales y matriz (0) |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Buscar pieza | `#tree-search` | text |  |  |  |

## Pestaña Simulación
Captura: `05-pestana-simulacion.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Física | — |  |
| Grabación | — |  |
| Gráficas | — |  |
| Correr prueba | `button[data-tid="s-sim"]` |  |
| Exportar CSV | `button[data-tid="s-csv"]` | Datos de todos los canales |
| Simular | `button[data-tid="f-sim"]` | Gravedad, contacto y fricción. Pulsa otra vez para pausar |
| Reiniciar | `button[data-tid="f-reset"]` | Devuelve las piezas a donde estaban antes de simular |
| Dinámica | `button[data-tid="f-din"]` | Las piezas seleccionadas caen y chocan al simular |
| Fija | `button[data-tid="f-est"]` | Las piezas seleccionadas no se mueven con la física |
| Pivote | `button[data-tid="f-piv"]` | Péndulo: la pieza activa oscila desde su borde superior (con Ctrl, elige antes el soporte) |
| Resorte | `button[data-tid="f-res"]` | Resorte entre 2 piezas: primero el soporte, luego con Ctrl la que cuelga |
| Ej. péndulo | `button[data-tid="f-ej1"]` | Agrega un péndulo listo para simular |
| Ej. arandela | `button[data-tid="f-ej2"]` | Una arandela que cae a lo largo de un tubo |
| Ej. plano inclinado | `button[data-tid="f-ej3"]` | Un bloque que resbala por un plano inclinado |
| (icono) | `button[data-slide="graphs"]` | Gráficas |

## Pestaña Electrónica
Captura: `06-pestana-electronica.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Controles | — |  |
| Placas | — |  |
| Cableado | — |  |
| PLC / Ladder | — |  |
| Tablero | — |  |
| Diagramas | — |  |
| Interactuar | `button[data-tid="e-int"]` | Usar botones, perillas y deslizadores en el visor (I) |
| Panel | `button[data-tid="k-panel"]` | Panel con ranuras |
| Botón | `button[data-tid="k-btn"]` |  |
| Interruptor | `button[data-tid="k-tog"]` |  |
| Perilla | `button[data-tid="k-knob"]` |  |
| Deslizador | `button[data-tid="k-sld"]` |  |
| LED | `button[data-tid="k-led"]` |  |
| Pantalla | `button[data-tid="k-dsp"]` |  |
| + | — | Agregar |
| (icono) | `button[data-slide="logic-blocks"]` | Diagramas de bloques |

## Pestaña Control
Captura: `07-pestana-control.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Scripts | — |  |
| Botoneras | — |  |
| Eventos y vectores | — |  |
| Ejecutar | `button[data-tid="x-run"]` |  |
| Detener | `button[data-tid="x-stop"]` |  |
| Terminal | `button[data-tid="x-term"]` |  |
| Editor | `button[data-tid="sc-ed"]` |  |
| Nuevo script | `button[data-tid="sc-new"]` |  |
| Editor | `button[data-sub="editor"]` |  |
| Terminal | `button[data-sub="terminal"]` |  |
| DSL | `button[data-lang="dsl"]` |  |
| JS | `button[data-lang="js"]` |  |
| PYTHON | `button[data-lang="py"]` |  |
| C++ | `button[data-lang="cpp"]` |  |
| ▶ Ejecutar | `#btn-script-run` |  |
| Detener | `#btn-script-stop` |  |
| (icono) | `button[data-slide="widgets"]` | Botoneras |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Destino del script (canal o placa) | `#script-target` | lista |  | — sin canales ni placas — | — sin canales ni placas — |
| Editor de script | `#script-editor` | textarea |  |  |  |

## Riel derecho: Proyecto (Gestor)
Captura: `08-riel-proyecto.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| (icono) | `button[data-panel="gestor"]` | Gestor de archivos y proyectos |
| (icono) | `button[data-panel="cerrar"]` | Ocultar panel |
| ARCHIVOS | `button[data-modo="archivos"]` |  |
| PROYECTO | `button[data-modo="proyectos"]` |  |
| BIBLIOTECA | `button[data-modo="biblioteca"]` | Piezas genéricas hechas con CadQuery |
| + importar | `#h-btn-importar` | Importar archivos o una carpeta completa (STEP/IGS/STL/OBJ/SVG/DXF/PDF) |
| + proyecto | `#h-btn-nuevo-proyecto` | Crear proyecto nuevo |
| (icono) | `button[data-gp="abrirTodo"]` | Abrir en CAD todas las piezas de este proyecto |
| (icono) | `button[data-gp="carpeta"]` | Nueva carpeta aquí |
| (icono) | `button[data-gp="renombrar"]` | Renombrar |
| (icono) | `button[data-gp="eliminar"]` | Eliminar el proyecto completo |
| Avanzado | `#h-btn-avanzado` | Configuración avanzada del Gestor |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Buscar en el Gestor | `#h-search` | text |  |  |  |

## Riel derecho: Interferencias
Captura: `09-riel-interferencias.jpg`

Sin controles propios: los que se ven están listados en otra sección.

## Riel derecho: Material
Captura: `10-riel-material.jpg`

Sin controles propios: los que se ven están listados en otra sección.

## Riel derecho: Propiedades de la pieza
Captura: `11-riel-propiedades.jpg`

Sin controles propios: los que se ven están listados en otra sección.

## Riel derecho: Relaciones entre piezas
Captura: `12-riel-relaciones.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| + Nueva relación | — |  |

## Riel derecho: Diagnóstico de malla
Captura: `13-riel-diagnostico-malla.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Analizar todas | `#md-all` |  |
| Reparar las que fallan | `#md-fix` |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Tolerancia de soldado | `#md-tol` | number | mm |  | ≥ 0 |
| Huecos hasta aristas | `#md-hole` | number |  | 64 | ≥ 3 |

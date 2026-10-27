# PolarSlicer (Laminador polar) — controles

Prepara una pieza STL para imprimir en la máquina polar: la coloca en el disco, la rebana en capas y genera el S-Code (cinemática polar θ, r, z), que se descarga o se envía a Machin.

Código: `FRONTEND/motores/polarslicer/PolarSlicerMAIN.js`, interfaz en `polarslicer/shell/polarslicer-body.js` y `polarslicer/ui/*.js`. Pestaña lateral `.engine-tab[data-engine="polarslicer"]` (rótulo LAMINADOR POLAR).

El panel izquierdo es un acordeón (`<details>`): cada captura muestra una sección abierta con sus subsecciones. El botón final «Rebanar y generar S-code» (`#ps-btnSlice`) se activa cuando hay una pieza cargada.

Cada sección corresponde a una captura (`img/manual/polarslicer/<archivo>.jpg`). Un control que se ve en varias capturas se lista una sola vez, en la más específica. «Qué hace» es el texto de ayuda (title) del propio programa; vacío = el nombre del botón lo dice. Valores por defecto leídos del programa recién abierto, sin pieza cargada.

## Pantalla completa recién abierto
Captura: `01-pantalla-completa.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Cargar y ajustar al volumen de trabajo | `#ps-btnLoad` |  |
| Cargar de un proyecto | `#ps-btnProyecto` | Elegir la pieza de un proyecto del Gestor (con vista previa). El S-code se guarda como rama bajo su STL. |
| VOLUMEN DE TRABAJO | — |  |
| PIEZAS EN EL DISCO | — |  |
| BOQUILLA | — |  |
| EXTRUSOR flujo, temperatura y velocidades | — |  |
| CÓMO IMPRIMIR | — |  |
| REBANADO | — |  |
| RELLENO cinemática polar | — |  |
| SOPORTES árbol o por capas | — |  |
| RESULTADO | — |  |
| REGISTRO | — |  |
| Rebanar y generar S-code | `#ps-btnSlice` |  |
| ◈ Iso 3D | `button[data-view="iso"]` | Vista isométrica |
| ⬒ Superior | `button[data-view="top"]` | Vista superior |
| ▤ Perfil | `button[data-view="right"]` | Vista lateral |
| ▭ Frontal | `button[data-view="front"]` | Vista frontal |
| (icono) | `#ps-tool-select` | Seleccionar [V] |
| (icono) | `#ps-tool-lock` | Mostrar / ocultar Mover · Rotar · Escalar |
| (icono) | `#ps-layerFirst` | Primera capa (Home) |
| (icono) | `#ps-layerPrev` | Capa anterior (←) |
| (icono) | `#ps-layerPlay` | Reproducir |
| (icono) | `#ps-layerNext` | Capa siguiente (→) |
| (icono) | `#ps-layerLast` | Última capa (End) |
| MIA | — | MIA: clic para hablar, clic derecho para escribir |

## Sección VOLUMEN DE TRABAJO
Captura: `02-volumen-de-trabajo.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Posición de la pieza (avanzado) | — |  |
| Aplicar posición | `#ps-btnApplyPos` |  |
| Centrar automático | `#ps-btnRecenter` |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Radio (mm) | `#ps-wsR` | number | mm | 175 |  |
| Altura (mm) | `#ps-wsZ` | number | mm | 350 |  |
| Pasos/revolución (motor) | `#ps-stepsRev` | number |  | 3200 |  |
| Offset X (mm) | `#ps-posX` | number | mm | 0 |  |
| Offset Y (mm) | `#ps-posY` | number | mm | 0 |  |
| Rotación Z (°) | `#ps-posRot` | number | ° | 0 |  |
| Paso flechas (mm) | `#ps-nudgeStep` | number | mm | 1 |  |

## Sección PIEZAS EN EL DISCO
Captura: `03-piezas-en-el-disco.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| + Agregar pieza al disco | `#ps-btnAddPart` |  |
| Transformar pieza seleccionada | — |  |

## Sección BOQUILLA
Captura: `04-boquilla.jpg`

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Diámetro (mm) | `#ps-nozzleDiameter` | number | mm | 0.4 | ≥ 0.1 |

## Sección EXTRUSOR
Captura: `05-extrusor.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Retracción | — |  |
| Velocidades (mm/s) | — |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Incluir datos de extrusor en el S-code | `#ps-chkExtruderInfo` | checkbox |  | activado |  |
| Tipo | `#ps-extType` | lista |  | Filamento | Filamento / Pasta / Pellet |
| Diámetro de filamento (mm) | `#ps-filamentDiam` | number | mm | 1.75 | ≥ 0.1 |
| Multiplicador de flujo | `#ps-extMult` | number |  | 1.00 | ≥ 0.01 |
| Ventilador (%) | `#ps-fanSpeed` | number | % | 100 | 0 a 100 |
| Temp. boquilla (°C) | `#ps-hotendTemp` | number | °C | 210 | ≥ 0 |
| Temp. cama (°C) | `#ps-bedTemp` | number | °C | 60 | ≥ 0 |
| Distancia (mm) | `#ps-retractDist` | number | mm | 1.0 | ≥ 0 |
| Velocidad (mm/s) | `#ps-retractSpeed` | number | mm/s | 30 | ≥ 0.1 |
| Viaje mínimo para retraer (mm) | `#ps-retractMinTravel` | number | mm | 2 | ≥ 0 |
| Primera capa | `#ps-feedFirst` | number | mm/s | 20 | ≥ 0.1 |
| Pared | `#ps-feedWall` | number | mm/s | 30 | ≥ 0.1 |
| Relleno | `#ps-feedInfill` | number | mm/s | 60 | ≥ 0.1 |
| Soporte | `#ps-feedSupport` | number | mm/s | 60 | ≥ 0.1 |
| Interfaz de soporte | `#ps-feedIface` | number | mm/s | 25 | ≥ 0.1 |
| Viaje (sin extruir) | `#ps-feedTravel` | number | mm/s | 120 | ≥ 0.1 |

## Sección CÓMO IMPRIMIR
Captura: `06-como-imprimir.jpg`

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Estrategia | `#ps-printPreset` | lista |  | Estándar | Estándar / Rápida (menos material) / Resistente (más pared y relleno) / Personalizado |

## Sección REBANADO
Captura: `07-rebanado.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Resolución de detalle (avanzado) | — |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Altura de capa (mm) | `#ps-layerH` | number | mm | 0.2 |  |
| Tolerancia axisimetría (mm) | `#ps-axisTol` | number | mm | 0.05 |  |
| Modo de rebanado | `#ps-modoRebanado` | lista |  | Plano (capas horizontales) | Plano (capas horizontales) / Diagonal (planos inclinados) / Elíptico (capas curvas) |
| Muestras por contorno | `#ps-dftN` | number |  | 180 |  |
| Nivel de detalle (0=máximo) | `#ps-maxHarm` | number |  | 24 |  |

## Sección RELLENO
Captura: `08-relleno.jpg`

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Patrón | `#ps-infillPattern` | lista |  | Concéntrico | Concéntrico / Cebolla (concéntrico + radial) / Radial simple / Radial compensado (densidad pareja) / Radial rotado (malla fina) / Espiral de Arquímedes / Espiral doble entrelazada / Espiral logarítmica / Panal polar |
| Densidad (%) | `#ps-infillDensity` | number | % | 20 | 0 a 100 |
| Ancho de hilo (mm) | `#ps-beadWidth` | number | mm | 0.4 |  |
| Huelgo de pared (mm) | `#ps-wallGap` | number | mm | 0.4 |  |
| Intercalar con radial (cuadrícula) | `#ps-chkAlternate` | checkbox |  | activado |  |
| Ventana Lanczos (reduce Gibbs) | `#ps-chkLanczos` | checkbox |  | activado |  |
| Rotación incremental (°/capa) | `#ps-rotIncrement` | number |  | 15 |  |
| Capas sólidas (arriba y abajo) | `#ps-solidLayers` | number |  | 2 | ≥ 0 |

## Sección SOPORTES
Captura: `09-soportes.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Ángulo, huecos e interfaz | — |  |
| Probar soporte | `#ps-btnTestSupport` |  |
| Convertir grupos en cuerpos | `#ps-btnSupportBodies` |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Generar soportes (un objeto por grupo) | `#ps-chkSupports` | checkbox |  | activado |  |
| Tipo de soporte | `#ps-supMode` | lista |  | Árbol (ramas pentagonales, ahorra material) | Árbol (ramas pentagonales, ahorra material) / Por capas (bloque bajo cada voladizo) / Cascada (se estrecha hacia la cama) / Columnas rectas (popotes) |
| Diámetro mínimo de rama (mm) | `#ps-supTipD` | number | mm | 3 | ≥ 1 |
| Separación de puntas (mm) | `#ps-supTipSpacing` | number | mm | 8 | ≥ 2 |
| Inclinación de rama (° desde la vertical) | `#ps-supBranchAngle` | number | ° | 35 | 5 a 70 |
| Lados del prisma | `#ps-supSides` | number |  | 5 | 3 a 12 |
| Solo desde la cama (nunca apoyados sobre la pieza) | `#ps-supOnlyBed` | checkbox |  | desactivado |  |
| Tamaño de celda para agrupar (mm) | `#ps-hexCellSize` | number | mm | 8 | ≥ 1 |
| Número de grupos | `#ps-hexGroups` | number |  | 6 | ≥ 1 |
| Voladizo sin soporte (° desde la vertical) | `#ps-supAlpha` | number | ° | 45 | 1 a 89 |
| Estrechamiento hacia abajo (°) | `#ps-supBeta` | number | ° | 40 | 0 a 89 |
| Ancho mínimo de cresta (mm) | `#ps-supCore` | number | mm |  | ≥ 0 |
| Capas vacías bajo la pieza | `#ps-supZGap` | number |  | 1 | ≥ 0 |
| Capas de interfaz | `#ps-supIface` | number |  | 2 | ≥ 0 |
| Densidad de interfaz (%) | `#ps-supIfaceDensity` | number | % | 30 | 5 a 100 |
| Holgura soporte–pieza (mm) | `#ps-supGap` | number | mm | 0.4 | ≥ 0 |
| Resolución del cuerpo (mm) | `#ps-supRaster` | number | mm | 0.4 | ≥ 0.05 |
| Relleno de soportes (%) · vacío = igual que la pieza | `#ps-supDensity` | number | % |  | 0 a 100 |

## Sección RESULTADO
Captura: `10-resultado.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Descargar .scode | `#ps-btnDownload` |  |
| Enviar a Machin | `#ps-btnSendMachin` |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Ajuste al volumen - Capas totales - Bloques PRIM REVOLVE - Capas cubiertas por primitivas | `#ps-scodePreview` | textarea |  |  |  |
| Ajuste al volumen - Capas totales - Bloques PRIM REVOLVE - Capas cubiertas por primitivas | `#ps-maquina` | lista |  | PolarONE (polar) | PolarONE (polar) / SD-D1 (delta) / SD-M5 (5 ejes) / SD-R7 (brazo) / SD-C1 (cartesiana) / SD-T2 (torno) |

## Sección REGISTRO
Captura: `11-registro.jpg`

Sin controles propios: los que se ven están listados en otra sección.

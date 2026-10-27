# Analizer (Análisis) — Motor de análisis — controles

Análisis por elementos finitos (FEA, con CalculiX) y de fluidos (CFD viento y flujo) sobre piezas importadas: árbol de simulación, malla, cargas y apoyos, y resultados.

Código: `FRONTEND/motores/analisis/AnalisisMAIN.js` (se carga la primera vez que se abre). Pestaña lateral `.engine-tab[data-engine="analisis"]` (rótulo ANÁLISIS).

Las pestañas de arriba (`[data-tab=…]`: Inicio, Malla, FEA, CFD Viento, CFD Flujo, Resultados) cambian la cinta de botones; el árbol de simulación y el Panel de datos (turbina, gráficas, puntos de monitoreo) quedan fijos. Los botones con punto naranja y título «Próximamente» todavía no están conectados.

Cada sección corresponde a una captura (`img/manual/analizer/<archivo>.jpg`). Un control que se ve en varias capturas se lista una sola vez, en la más específica. «Qué hace» es el texto de ayuda (title) del propio programa; vacío = el nombre del botón lo dice. Valores por defecto leídos del programa recién abierto, sin pieza cargada.

## Pantalla completa recién abierto (pestaña Inicio)
Captura: `01-pantalla-completa.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Inicio | `button[data-tab="inicio"]` |  |
| Malla | `button[data-tab="malla"]` |  |
| FEA | `button[data-tab="fea"]` |  |
| CFD Viento | `button[data-tab="cfd-viento"]` |  |
| CFD Flujo | `button[data-tab="cfd-flujo"]` |  |
| Resultados | `button[data-tab="resultados"]` |  |
| (icono) | — | Configuración |
| Abrir | `#an-tool-import` | Importar .stl sueltos o un .zip de proyecto de BENCH |
| Importar geometría | `button[data-action="import-geometry"]` |  |
| Nuevo | — | Próximamente |
| Guardar | — | Próximamente |
| Importar condiciones | — | Próximamente |
| Exportar reporte | — | Próximamente |
| Deshacer | — | Próximamente |
| Rehacer | — | Próximamente |
| Activar: clic en la pieza a fijar | `#an-tool-fix` |  |
| Activar: clic en la pieza donde va la carga | `#an-tool-load` |  |
| Analizar todo | `#an-tool-analyze` |  |
| Copiar | `#log-copy-btn` | Copiar todo el log |
| Rejilla | `#turb-guard-toggle` |  |
| Estator | `#turb-vanes-toggle` |  |
| Honeycomb | `#turb-hc-toggle` |  |
| Malla | `#turb-wire-toggle` |  |
| Corte de carcasa | `#turb-cut-toggle` |  |
| MIA | — | MIA: clic para hablar, clic derecho para escribir |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Filtrar árbol de simulación | — | text |  |  |  |
| Tamaño global | `#malla-tamano` | range | mm | 5.7 |  |
| Refinamiento | `#malla-refinamiento` | range | × | 2.2 |  |
| RPM | `#turb-rpm` | range |  | 2900 | 0 a 3000 |
| Álabes | `#turb-blades` | range |  | 9 | 3 a 13 |
| Ángulo de paso | `#turb-pitch` | range | ° | 0 | -8 a 14 |
| Cámara lenta | `#turb-ts` | range | % | 8 |  |
| Densidad del humo | `#turb-dens` | range | × | 1.4 | 0.4 a 3 |
| Turbulencia (NS) | `#turb-turb` | range | × | 0.60 |  |
| Intensidad LBM (sub-malla) | `#turb-lbmi` | range | × | 1.00 |  |

## Pestaña Malla
Captura: `02-pestana-malla.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Generar malla | `button[data-action="generar-malla"]` |  |
| Tamaño global | — | Próximamente |
| Refinamiento local | — | Próximamente |
| Verificar calidad | — | Próximamente |
| Vista de malla | — | Próximamente |
| Estadísticas | — | Próximamente |

## Pestaña FEA
Captura: `03-pestana-fea.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Analizar todo | `button[data-action="analizar-backend"]` |  |
| Pausar | — | Próximamente |
| Detener | — | Próximamente |
| Carga distribuida | — | Próximamente |
| Presión | — | Próximamente |
| Temperatura | — | Próximamente — multi-material |
| Monitores | — | Próximamente |
| Config. solver | — | Próximamente |

## Pestaña CFD Viento
Captura: `04-pestana-cfd-viento.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Analizar viento | `button[data-action="analizar-viento"]` |  |
| Mostrar turbina | `#cfd-viento-toggle` | La turbina axial completa (geometría, materiales, Navier–Stokes 3D + LBM acoplado y humo reales) — reacciona contra la pieza real importada, no contra un objeto |
| Humo | `#turb-flow-toggle` |  |
| Humo NS real | `#turb-ns-toggle` | Humo Navier–Stokes: se advecta con el campo 3D resuelto de verdad (RK2), en vez del remolino analítico simple. |
| LBM acoplado | `#turb-lbm-toggle` | Acopla una sub-malla LBM D2Q9+Smagorinsky (la misma clase LBM2D) que le mete la turbulencia fina al humo, por descomposición de Helmholtz + hipótesis de Taylor. |
| Color por vorticidad | `#turb-vort-toggle` |  |
| Corte X | `#cfd-corte-x-toggle` | Corta la pieza importada con un plano perpendicular a X y precalcula el análisis LBM sobre esa pantalla (se desvanece hacia el borde). Se puede combinar con Y y |
| Corte Y | `#cfd-corte-y-toggle` | Corta la pieza importada con un plano perpendicular a Y y precalcula el análisis LBM sobre esa pantalla. Se puede combinar con X y Z a la vez. |
| Corte Z | `#cfd-corte-z-toggle` | Corta la pieza importada con un plano perpendicular a Z (vista en planta) y precalcula el análisis LBM sobre esa pantalla. Se puede combinar con X y Y a la vez. |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Duración del precálculo | `#cfd-corte-duracion` | range | pasos | 600 | 100 a 2000 |

## Pestaña CFD Flujo
Captura: `05-pestana-cfd-flujo.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Analizar flujo | `button[data-action="analizar-flujo"]` |  |
| Cavidad interna | — | Próximamente — Fase 2 |
| Entrada de flujo | — | Próximamente — Fase 2 |
| Salida de flujo | — | Próximamente — Fase 2 |
| Mapa de acumulación | — | Próximamente — Fase 2 |
| Velocidad interna | — | Próximamente — Fase 2 |
| Nivel vs. tiempo | — | Próximamente — Fase 2 |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Caudal de entrada — L/min | — | range |  | 50 |  |

## Pestaña Resultados
Captura: `06-pestana-resultados.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Von Mises | — | Próximamente — selector de mapa de color |
| Desplazamiento | — | Próximamente — selector de mapa de color |
| Cortante | — | Próximamente — Fase 0 no calcula cortante todavía |
| Líneas de corriente | — | Próximamente — depende de CFD Viento |
| Vorticidad | — | Próximamente — depende de CFD Viento |
| Comparar resultados | — | Próximamente |

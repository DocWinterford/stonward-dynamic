# Machin (Maquinado) — Machinelogical Simulator — controles

Simulador y control de la máquina: carga un S-Code (.scode) del Laminador polar, lo reproduce en 3D sobre la máquina activa y lo envía a la máquina real por Bluetooth, WiFi o USB.

Código: `FRONTEND/motores/machin/MachinMAIN.js` (todo el motor en un archivo) y `machin/core/maquinasV2.js` (catálogo de máquinas). Pestaña lateral `.engine-tab[data-engine="machin"]` (rótulo MAQUINADO).

Zonas: barra superior (Ayuda, Máquina), panel izquierdo (coordenadas, jog, restricciones de hardware, ESP32, comunicación, disco θ), visor 3D con línea de tiempo abajo, panel derecho (Decodificador, instrucciones, demo de una capa, velocidad, ejecución y paros).

Cada sección corresponde a una captura (`img/manual/machin/<archivo>.jpg`). Un control que se ve en varias capturas se lista una sola vez, en la más específica. «Qué hace» es el texto de ayuda (title) del propio programa; vacío = el nombre del botón lo dice. Valores por defecto leídos del programa recién abierto, sin pieza cargada.

## Pantalla completa recién abierto
Captura: `01-pantalla-completa.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| Ayuda | `#machin-btn-shortcuts` | Atajos de teclado |
| Máquina | `#machin-btn-machine-menu` | Menú de máquinas |
| (icono) | `#machin-collapseLeft` | Ocultar / mostrar panel izquierdo |
| ↺ | — |  |
| Z+ | — |  |
| ↻ | — |  |
| R- | — |  |
| HOME | — |  |
| R+ | — |  |
| Z- | — |  |
| HOME TOTAL | — |  |
| PAUSE | `#machin-pausePlayBtn` |  |
| PASO | `#machin-stepBtn` |  |
| Bluetooth | `#machin-commBtnBT` |  |
| WiFi | `#machin-commBtnWifi` |  |
| USB | `#machin-commBtnUSB` |  |
| CONECTAR | `#machin-commConnectBtn` |  |
| Iniciar | `#machin-hwThStart` |  |
| Parar | `#machin-hwThStop` |  |
| Invertir | `#machin-hwThInv` |  |
| Guardar posición | `#machin-hwSave` |  |
| Fijar origen | `#machin-hwZero` |  |
| Reiniciar alineación θ | `#machin-hwRealign` |  |
| Depuración | `#machin-hwDbg` |  |
| (icono) | `#machin-tl-start` | Ir a la primera capa |
| (icono) | `#machin-tl-prevlayer` | Capa anterior |
| (icono) | `#machin-tl-stepback` | Instrucción anterior |
| (icono) | `#machin-tl-play` | Preparando datos de la pieza… |
| (icono) | `#machin-tl-stepfwd` | Instrucción siguiente |
| (icono) | `#machin-tl-nextlayer` | Capa siguiente |
| (icono) | `#machin-tl-end` | Ir a la última capa |
| (icono) | `#machin-tl-cine` | Vista cinemática: cámara dramática + iluminación de taller |
| Demo | `#machin-tl-demo` | Generar demo cinematográfico (recorrido de ~26s con guion de cámara y rótulos) y exportarlo a video |
| ♪ Música | `#machin-tl-music` | Música para el demo (opcional): clic = elegir archivo · clic derecho = quitar |
| (icono) | `#machin-collapseRight` | Ocultar / mostrar panel derecho |
| (icono) | `#machin-manualDecodeToggle` | Modo manual: pegar datos BP/FD a mano |
| Ver instrucciones | `#machin-demoLayerView` |  |
| Enviar capa | `#machin-demoLayerSend` |  |
| Paso a paso | `#machin-demoLayerStep` |  |
| Detener | `#machin-demoLayerStop` |  |
| Copiar | `#machin-demoLayerCopy` |  |
| EJECUCIÓN AUTO | `#machin-runAutoBtn` |  |
| RESET | `#machin-resetRunBtn` |  |
| E-STOP | `#machin-estopBtn` |  |
| SOFT STOP | `#machin-softStopBtn` |  |
| REANUDAR | `#machin-resumeBtn` |  |
| MIA | — | MIA: clic para hablar, clic derecho para escribir |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Resolución θ (°) | `#machin-thetaGridDeg` | number | ° | 1 | ≥ 0.0225 |
| Pasos/mm R | `#machin-stepsRPerMm` | number |  | 405.376 | ≥ 1 |
| Pasos/mm Z | `#machin-stepsZPerMm` | number |  | 378.7879 | ≥ 1 |
| Paso Z útil (mm, 0 = el del motor) | `#machin-zQuantumMm` | number | mm | 0 | ≥ 0 |
| Radio máximo (mm) | `#machin-maxRadiusPhys` | number | mm | 200.0 |  |
| Grosor filamento (mm) | `#machin-filamentHeight` | number | mm | 0.2 | ≥ 0.01 |
| Sentido del disco invertido | `#machin-hwSignInv` | checkbox |  | desactivado |  |
| Velocidad del disco (s por vuelta) | `#machin-hwSegVuelta` | number | s | 40 | 20 a 3600 |
| PRUEBA sin extrusor: la máquina real copia θ, R y Z de la virtual, pero no extruye; θ a me | `#machin-hwPruebaTR` | checkbox |  | activado |  |
| Velocidad automática (mira la ruta; la de arriba es el tope) | `#machin-hwVelAuto` | checkbox |  | activado |  |
| PID Kp / Ki / Kd | `#machin-hwKp` | number |  | 0.3 | ≥ 0 |
| PID Kp / Ki / Kd | `#machin-hwKi` | number |  | 0.1 | ≥ 0 |
| PID Kp / Ki / Kd | `#machin-hwKd` | number |  | 0.02 | ≥ 0 |
| Resolución de curva (° entre ajustes de R) | `#machin-hwRes` | number | ° | 1.5 | ≥ 0.2 |
| Velocidad lineal máx. del hotend (mm/s) | `#machin-hwVLin` | number | mm/s | 25 | ≥ 1 |
| Velocidad máx. de R (mm/s) | `#machin-hwVR` | number | mm/s | 15 | ≥ 1 |
| Arranque suave de R/Z/E (pasos de rampa, 0 = sin rampa) | `#machin-hwRampaRZE` | number |  | 400 | 0 a 20000 |
| Espera de calentamiento antes de extruir (s) | `#machin-hwWarmSec` | number | s | 120 | ≥ 0 |
| 🎬 Demo cinematográfico listo Descargar video Abrir ✕ | `#machin-tl-frame` | number |  | 1 | ≥ 1 |
| / | `#machin-tl-speed` | range |  | 1 |  |
| Capa (la 2 por defecto) | `#machin-demoLayerNum` | number |  | 2 | ≥ 1 |
| — | `#machin-demoLayerText` | textarea |  |  |  |
| Velocidad | `#machin-speedSliderLevel` | range |  | 500 | 0 a 1000 |

## Menú Ayuda (atajos de teclado)
Captura: `02-menu-ayuda.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| × | `#machin-close-shortcuts` |  |

## Menú Máquina
Captura: `03-menu-maquina.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| SD-C1 Impresora 3D CoreXY cerrada 250 × 250 × 250 | `button[data-sd="0"]` |  |
| PolarONE Impresora polar θ-R-Z Ø400 activa | `button[data-sd="1"]` |  |
| SD-D1 Impresora 3D delta cerrada Ø300 × 410 | `button[data-sd="2"]` |  |
| SD-R7 Brazo de 6 ejes para impresión 3D + mesa polar Ø300 | `button[data-sd="3"]` |  |
| SD-M5 Centro de mecanizado de 5 ejes, puente móvil y muñón A | `button[data-sd="4"]` |  |
| SD-T2 Torno CNC de bancada inclinada, torreta de 12 estacion | `button[data-sd="5"]` |  |
| Volver a construcción | `#machin-mm-back-to-construction` |  |

## Panel izquierdo desplazado: ESP32, Comunicación, disco θ y ajustes de la máquina real
Captura: `04-panel-izquierdo-abajo.jpg`

Sin controles propios: los que se ven están listados en otra sección.

## Panel derecho: Decodificador en modo manual (pegar datos BP/FD)
Captura: `05-decodificador-manual.jpg`

| Botón | Selector | Qué hace |
|---|---|---|
| BP (t,θ,r) | `button[data-mode="bp"]` |  |
| FD (coef) | `button[data-mode="coeff"]` |  |
| DECODIFICAR | `#machin-decodeBtn` |  |
| LIMPIAR | `#machin-clearListBtn` |  |

| Campo | Selector | Tipo | Unidad | Por defecto | Rango / opciones |
|---|---|---|---|---|---|
| Armónicos: (0 = todos) | `#machin-inputDataArea` | textarea |  | t	theta(deg)	r(mm) 0.0000	0.00	100.00 0.0100	5.00	100.00 0.0200	10.00	100.00 0.0300	15.00	100.00 0.0400	20.00	100.00 0.0500	25.00	100.00 0.0600	30.00	100.00 0.0700	35.00	100.00 0.0800	40.00	100.00 0.0900	45.00	100.00 0.1000	50.00	100.00 0.1100	55.00	100.00 0.1200	60.00	100.00 0.1300	65.00	100.00 0.1400	70.00	100.00 0.1500	75.00	100.00 0.1600	80.00	100.00 0.1700	85.00	100.00 0.1800	90.00	100.00 0.1900	95.00	100.00 0.2000	100.00	100.00 0.2100	105.00	100.00 0.2200	110.00	100.00 0.2300	115.00	100.00 0.2400	120.00	100.00 0.2500	125.00	100.00 0.2600	130.00	100.00 0.2700	135.00	100.00 0.2800	140.00	100.00 0.2900	145.00	100.00 0.3000	150.00	100.00 0.3100	155.00	100.00 0.3200	160.00	100.00 0.3300	165.00	100.00 0.3400	170.00	100.00 0.3500	175.00	100.00 0.3600	180.00	100.00 0.3700	185.00	100.00 0.3800	190.00	100.00 0.3900	195.00	100.00 0.4000	200.00	100.00 0.4100	205.00	100.00 0.4200	210.00	100.00 0.4300	215.00	100.00 0.4400	220.00	100.00 0.4500	225.00	100.00 0.4600	230.00	100.00 0.4700	235.00	100.00 0.4800	240.00	100.00 0.4900	245.00	100.00 0.5000	250.00	100.00 0.5100	255.00	100.00 0.5200	260.00	100.00 0.5300	265.00	100.00 0.5400	270.00	100.00 0.5500	275.00	100.00 0.5600	280.00	100.00 0.5700	285.00	100.00 0.5800	290.00	100.00 0.5900	295.00	100.00 0.6000	300.00	100.00 0.6100	305.00	100.00 0.6200	310.00	100.00 0.6300	315.00	100.00 0.6400	320.00	100.00 0.6500	325.00	100.00 0.6600	330.00	100.00 0.6700	335.00	100.00 0.6800	340.00	100.00 0.6900	345.00	100.00 0.7000	350.00	100.00 0.7100	355.00	100.00 0.7200	360.00	100.00 |  |

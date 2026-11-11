// Máquinas Stonward Dynamics que muestra el sitio.
// Para agregar una: copia un bloque, pon su paquete .zip en descargas/maquinas/ y su imagen en img/.
// estado: "disponible" (se descarga y se ve en 3D) o "desarrollo" (solo ficha).
window.STONWARD_MAQUINAS = [
  {
    id: "polarone",
    nombre: "PolarONE",
    modelo: "Impresora 3D cerrada en coordenadas polares",
    estado: "disponible",
    porDefecto: true,
    imagen: "img/polarone.jpg",
    paquete: "descargas/maquinas/PolarONE.zip",
    resumen: "Impresora 3D por extrusión de material (FFF) en gabinete cerrado cuya cinemática opera en coordenadas cilíndricas: un disco de Ø350 mm gira de forma continua (eje θ) a través de un reductor planetario 6:1, mientras el cabezal se desplaza en radio (R) y en altura (Z).",
    uso: "Fabricación de piezas de revolución y geometrías axisimétricas, como carcasas, toberas, rodetes y recipientes. Sus trayectorias continuas eliminan las inversiones de movimiento de una cinemática cartesiana, lo que reduce vibración y tiempo de ciclo. Se programa con PMS (Polar Manufactury System) mediante S-code con contornos de Fourier.",
    datos: [
      ["Proceso", "Extrusión de material (FFF), extrusor directo con NEMA 17"],
      ["Cinemática", "θ continuo · R · Z"],
      ["Disco θ", "Ø350 mm, reductor planetario 6:1 (sol 12, 3 planetas 24, corona 60), rodamiento de giro Ø250"],
      ["Resolución θ", "0.01875° por micropaso, 57 µm en el borde"],
      ["Eje R", "2 guías MGN12 de 350 mm, husillo Tr8×8, 2.47 µm/paso"],
      ["Eje Z", "4 guías MGN de 400 mm, 2 husillos con 2 NEMA 17, 2.64 µm/paso"],
      ["Estructura", "Perfil 20×20 con escuadras fundidas, paneles de acrílico, puerta con servo, pantalla táctil de 5 in"],
      ["Electrónica", "Fuente 24 V, 5 drivers TB6600 (θ, R, Z1, Z2, E), 2 ESP32 enlazados por ESP-NOW"],
      ["Control", "Firmware v4 con θ continuo (FreeRTOS), lazo abierto; lazo cerrado con encoder AS5600, filtro de Kalman y PI en desarrollo"],
      ["Modelo CAD", "265 piezas, 44 relaciones, 5 NEMA 17, 11 materiales"]
    ],
    driver: "Firmware ESP32 «Theta continuo v4» (protocolo serie G/S, TI, TS, TD±). El paquete del driver se publicará aquí."
  },
  {
    id: "sd-c1",
    nombre: "SD-C1",
    modelo: "Impresora 3D cartesiana CoreXY de cámara cerrada",
    estado: "disponible",
    imagen: "img/sd-c1.jpg",
    paquete: "descargas/maquinas/SD-C1.zip",
    resumen: "Plataforma FFF de cinemática CoreXY con transmisión por correas GT2 y guías lineales MGN12. El eje Z se sostiene sobre tres husillos trapezoidales Tr8 que nivelan la cama en tres puntos.",
    uso: "Producción de piezas técnicas en polímeros de ingeniería (ABS, ASA, PC, nylon) que exigen una cámara térmicamente estable y precisión dimensional repetible.",
    datos: [
      ["Proceso", "Extrusión de material (FFF)"],
      ["Cinemática", "CoreXY + Z triple independiente"],
      ["Volumen", "250 × 250 × 250 mm"],
      ["Guías", "Lineales MGN12"],
      ["Cerramiento", "Vidrio templado, puerta abatible superior, pantalla táctil"]
    ],
    driver: "Usa el driver cartesiano incluido en SolidMaker."
  },
  {
    id: "sd-d1",
    nombre: "SD-D1",
    modelo: "Impresora 3D de cinemática paralela delta",
    estado: "disponible",
    imagen: "img/sd-d1.jpg",
    paquete: "descargas/maquinas/SD-D1.zip",
    resumen: "Tres carros verticales sobre varillas Ø10 accionan, mediante seis brazos de fibra de carbono de 400 mm con rótulas magnéticas, una plataforma efectora de muy baja masa.",
    uso: "Impresión de alta velocidad y alta aceleración de piezas altas y cilíndricas. La baja inercia del efector permite trayectorias rápidas sin sacrificar la calidad superficial.",
    datos: [
      ["Proceso", "Extrusión de material (FFF)"],
      ["Cinemática", "Paralela delta, 3 torres"],
      ["Volumen", "Ø300 × 410 mm"],
      ["Transmisión", "Correas GT2 + NEMA 17 en la base"],
      ["Efector", "Extrusor de doble engrane, hotend V6"]
    ],
    driver: "Driver delta incluido en el paquete (driver.js): calcula la altura de cada carro desde X, Y, Z."
  },
  {
    id: "sd-r7",
    nombre: "SD-R7",
    modelo: "Robot articulado de 6 GDL con mesa rotativa sincronizada",
    estado: "disponible",
    imagen: "img/sd-r7.jpg",
    paquete: "descargas/maquinas/SD-R7.zip",
    resumen: "Manipulador serie de seis ejes rotativos con reductores cicloidales en cada articulación y muñeca esférica, coordinado con una mesa giratoria que actúa como séptimo eje.",
    uso: "Fabricación aditiva multieje: depósito no planar, impresión sobre superficies curvas y piezas sin soportes. Cambiando el efector, sirve para manipulación y procesos de celda robótica.",
    datos: [
      ["Grados de libertad", "6 + 1 (mesa C)"],
      ["Alcance", "Brazo 350 mm + antebrazo 330 mm"],
      ["Reductores", "Cicloidales, pernos de acero y rodillos de bronce"],
      ["Motores", "NEMA 23 en J1–J2, NEMA 17 en J3–J6"],
      ["Control", "Cinemática inversa analítica, gabinete con pantalla de 7\""]
    ],
    driver: "Driver de brazo incluido en el paquete (driver.js): cinemática inversa analítica desde X, Y, Z de la punta y el giro C de la mesa."
  },
  {
    id: "sd-m5",
    nombre: "SD-M5",
    modelo: "Centro de mecanizado CNC de 5 ejes simultáneos",
    estado: "disponible",
    imagen: "img/sd-m5.jpg",
    paquete: "descargas/maquinas/SD-M5.zip",
    resumen: "Arquitectura de puente móvil sobre bancada de fundición, con ejes lineales X, Y y Z sobre guías tamaño 25 y husillos de bolas, y una cuna basculante A con mesa giratoria C en configuración de muñón.",
    uso: "Mecanizado de geometrías complejas en una sola sujeción, como álabes, impulsores, moldes y piezas aeroespaciales o médicas, con control RTCP. El husillo orientable y el plato de garras en C permiten además operaciones de torneado (mill-turn).",
    datos: [
      ["Ejes", "X · Y · Z + A ±110° + C continuo"],
      ["Guías", "Lineales tamaño 25 con patines de bolas"],
      ["Transmisión", "Husillos de bolas Ø25 + servos AC (Y doble)"],
      ["Husillo", "Electrohusillo con orientación M19"],
      ["Control", "RTCP de 5 ejes"]
    ],
    driver: "Driver RTCP incluido en el paquete (driver.js): X, Y, Z del programa están en el marco de la mesa y se transforman con A y C."
  },
  {
    id: "sd-t2",
    nombre: "SD-T2",
    modelo: "Torno CNC de bancada inclinada",
    estado: "disponible",
    imagen: "img/sd-t2.jpg",
    paquete: "descargas/maquinas/SD-T2.zip",
    resumen: "Bancada de fundición inclinada a 45° con guías de rodillos, carros X y Z con husillos de bolas y servomotores, torreta servo de 12 estaciones y contrapunto hidráulico.",
    uso: "Producción de piezas de revolución de precisión, como ejes, bujes, bridas y roscas, en series cortas y medianas. La bancada inclinada facilita la evacuación de viruta y da rigidez frente a cortes pesados.",
    datos: [
      ["Ejes", "X (diámetro) · Z + husillo C"],
      ["Bancada", "Inclinada 45°, guías de rodillos tamaño 35"],
      ["Torreta", "Servo, 12 estaciones BMT"],
      ["Husillo", "A2-6, plato hidráulico 8\", motor 11 kW"],
      ["Periféricos", "Contrapunto hidráulico, transportador de viruta"]
    ],
    driver: "Driver de torno incluido en el paquete (driver.js): X en diámetro, Z desde la cara de la pieza y C para el giro del husillo."
  }
];

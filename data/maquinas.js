// Máquinas Stonward Dynamics que muestra el sitio.
// Para agregar una: copia un bloque, pon su paquete .zip en descargas/maquinas/ y su imagen en img/.
// estado: "disponible" (se descarga y se ve en 3D) o "desarrollo" (solo ficha).
window.STONWARD_MAQUINAS = [
  {
    id: "polarone",
    nombre: "PolarONE",
    modelo: "Impresora polar θ-R-Z, plato Ø400",
    estado: "disponible",
    porDefecto: true,
    imagen: "img/polarone.jpg",
    paquete: "descargas/maquinas/PolarONE.zip",
    resumen: "Nuestra primera máquina real. El plato gira sin detenerse y el cabezal se mueve en radio y altura: imprime piezas redondas sin los vaivenes de una cartesiana.",
    datos: [
      ["Cinemática", "Polar (θ continuo, R, Z)"],
      ["Volumen", "Ø400 × 300 mm"],
      ["Control", "ESP32, θ en lazo abierto"],
      ["Paquete", "calibracion.json + piezas STL"]
    ],
    driver: "Firmware ESP32 «Theta continuo v3». El paquete del driver se publicará aquí."
  },
  {
    id: "sd-c1",
    nombre: "SD-C1",
    modelo: "Impresora 3D CoreXY cerrada 250 × 250 × 250",
    estado: "disponible",
    imagen: "img/sd-c1.jpg",
    paquete: "descargas/maquinas/SD-C1.zip",
    resumen: "CoreXY con correas GT2 y rieles MGN12, eje Z con tres husillos Tr8, cámara cerrada con vidrio y pantalla táctil en la consola.",
    datos: [
      ["Cinemática", "CoreXY + Z triple"],
      ["Volumen", "250 × 250 × 250 mm"],
      ["Cabezal", "Directo, estilo Neptune 4"],
      ["Paquete", "pms-maquina-2 (maquina.json + STL)"]
    ],
    driver: "Usa el driver cartesiano incluido en SolidMaker."
  },
  {
    id: "sd-d1",
    nombre: "SD-D1",
    modelo: "Impresora 3D delta cerrada Ø300 × 410",
    estado: "disponible",
    imagen: "img/sd-d1.jpg",
    paquete: "descargas/maquinas/SD-D1.zip",
    resumen: "Tres torres con varillas Ø10 y rodamientos LM10UU, correas GT2 movidas por NEMA 17 y seis brazos de carbono con rótulas magnéticas. Extrusor de doble engrane, hotend V6, electrónica a la vista tras acrílico ahumado y cámara cerrada con puerta de vidrio.",
    datos: [
      ["Cinemática", "Delta (3 torres, brazos de 400 mm)"],
      ["Volumen", "Ø300 × 410 mm"],
      ["Guías", "2 varillas Ø10 + 4 LM10UU por torre"],
      ["Transmisión", "Correas GT2 cerradas + NEMA 17 en la base"],
      ["Paquete", "pms-maquina-2 + driver.js delta"]
    ],
    driver: "Driver delta incluido en el paquete (driver.js): calcula la altura de cada carro desde X, Y, Z."
  },
  {
    id: "sd-r7",
    nombre: "SD-R7",
    modelo: "Brazo de 6 ejes para impresión 3D + mesa polar Ø300",
    estado: "disponible",
    imagen: "img/sd-r7.jpg",
    paquete: "descargas/maquinas/SD-R7.zip",
    resumen: "Brazo robótico de seis ejes con reductores cicloidales en cada articulación, muñeca esférica y extrusor de doble engrane con hotend V6 en la brida. Trabaja junto a su propia mesa giratoria (7.º eje) para impresión polar, con gabinete de control y pantalla táctil de 7 pulgadas.",
    datos: [
      ["Cinemática", "6 ejes rotativos + mesa giratoria C"],
      ["Alcance", "Brazo 350 + 330 mm, muñeca esférica"],
      ["Reductores", "Cicloidales con pernos de acero y rodillos de bronce"],
      ["Motores", "NEMA 23 en J1-J2, NEMA 17 en J3-J6"],
      ["Paquete", "pms-maquina-2 + driver.js de brazo"]
    ],
    driver: "Driver de brazo incluido en el paquete (driver.js): cinemática inversa analítica desde X, Y, Z de la punta y el giro C de la mesa."
  },
  {
    id: "sd-m5",
    nombre: "SD-M5",
    modelo: "Centro de mecanizado de 5 ejes, puente móvil y muñón A/C",
    estado: "disponible",
    imagen: "img/sd-m5.jpg",
    paquete: "descargas/maquinas/SD-M5.zip",
    resumen: "Bancada de fundición con puente móvil sobre cuatro guías lineales, carro X y carnero Z con husillos de bolas y servomotores en cada eje. Cuna basculante A con motor de par directo y mesa giratoria C ranurada en T con plato de 3 garras para torneado; electrohusillo orientable con herramienta de torneado.",
    datos: [
      ["Cinemática", "X, Y, Z lineales + cuna A ±110° + mesa C continua"],
      ["Guías", "Guías lineales tamaño 25 con patines de bolas"],
      ["Transmisión", "Husillos de bolas Ø25 + servos AC (2 en Y)"],
      ["Husillo", "Electrohusillo con M19 y herramienta de torneado"],
      ["Paquete", "pms-maquina-2 + driver.js RTCP A/C"]
    ],
    driver: "Driver RTCP incluido en el paquete (driver.js): X, Y, Z del programa están en el marco de la mesa y se transforman con A y C."
  },
  {
    id: "sd-t2",
    nombre: "SD-T2",
    modelo: "Torno CNC de bancada inclinada, torreta de 12 estaciones",
    estado: "disponible",
    imagen: "img/sd-t2.jpg",
    paquete: "descargas/maquinas/SD-T2.zip",
    resumen: "Bancada inclinada a 45° de fundición con guías de rodillos, carros Z y X con husillos de bolas y servos, torreta servo de 12 estaciones con cuchillas de exteriores y barras de interiores. Cabezal con plato hidráulico de 3 garras, cilindro trasero y motor de 11 kW con correa; contrapunto hidráulico, cabina con puerta corrediza, transportador de virutas y grupo hidráulico.",
    datos: [
      ["Cinemática", "X (diámetro) y Z + husillo C"],
      ["Bancada", "Inclinada 45°, guías de rodillos tamaño 35"],
      ["Torreta", "Servo, 12 estaciones BMT"],
      ["Husillo", "A2-6, plato hidráulico 8\", motor 11 kW"],
      ["Paquete", "pms-maquina-2 + driver.js de torno"]
    ],
    driver: "Driver de torno incluido en el paquete (driver.js): X en diámetro, Z desde la cara de la pieza y C para el giro del husillo."
  }
];

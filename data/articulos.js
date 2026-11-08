// Repositorio: artículos, documentos y proyectos en los que se basan los trabajos de Stonward Dynamics.
// area: robotica | microbiologia | bionica | ia | fabricacion | software
// Para agregar uno: copia un bloque. "enlace" puede quedar vacío si no hay versión en línea.
window.STONWARD_ARTICULOS = [
  {
    titulo: "A New Approach to Linear Filtering and Prediction Problems",
    autores: "R. E. Kalman",
    fuente: "Journal of Basic Engineering, 1960",
    area: "robotica",
    usa: "Base del lazo cerrado planeado para el plato de PolarONE (encoder + PID + Kalman).",
    enlace: ""
  },
  {
    titulo: "CadCraft: CAD 2D de código abierto en Rust",
    autores: "Equipo ArtCraft y colaboradores",
    fuente: "Repositorio GitHub, licencia MIT / Apache-2.0",
    area: "software",
    usa: "Cantera de algoritmos del croquis 2D de SolidMaker: intersecciones exactas, rastreo, empalmes y restricciones.",
    enlace: "https://github.com/storytold/cadcraft"
  },
  {
    titulo: "CadQuery: modelado paramétrico en Python",
    autores: "Comunidad CadQuery",
    fuente: "Repositorio GitHub, licencia Apache-2.0",
    area: "fabricacion",
    usa: "Motor de sólidos exactos del servidor de SolidMaker y generador de las piezas de cada máquina.",
    enlace: "https://github.com/CadQuery/cadquery"
  },
  {
    titulo: "three.js",
    autores: "Comunidad three.js",
    fuente: "Biblioteca JavaScript, licencia MIT",
    area: "software",
    usa: "Visor 3D de SolidMaker y de las máquinas de este sitio.",
    enlace: "https://threejs.org"
  },
  {
    titulo: "A Kinematic Notation for Lower-Pair Mechanisms Based on Matrices",
    autores: "J. Denavit, R. S. Hartenberg",
    fuente: "Journal of Applied Mechanics, 1955",
    area: "robotica",
    usa: "Convención de eslabones y juntas con la que se describe la cadena del brazo SD-R7 y su cinemática inversa en Machin.",
    enlace: ""
  },
  {
    titulo: "Optimum Settings for Automatic Controllers",
    autores: "J. G. Ziegler, N. B. Nichols",
    fuente: "Transactions of the ASME, 1942",
    area: "robotica",
    usa: "Punto de partida para sintonizar el PID del eje θ de PolarONE.",
    enlace: ""
  },
  {
    titulo: "Open CASCADE Technology",
    autores: "Open Cascade SAS y comunidad",
    fuente: "Núcleo geométrico B-rep, licencia LGPL-2.1",
    area: "fabricacion",
    usa: "Geometría exacta bajo CadQuery: operaciones booleanas, roscas y exportación STEP/IGES.",
    enlace: "https://dev.opencascade.org"
  },
  {
    titulo: "Manifold: geometría sólida robusta",
    autores: "E. Lalish y colaboradores",
    fuente: "Repositorio GitHub, licencia Apache-2.0",
    area: "software",
    usa: "Booleanos de malla rápidos en el navegador para cortes y taladros de PolarCAD.",
    enlace: "https://github.com/elalish/manifold"
  },
  {
    titulo: "Clipper2: recorte y desplazamiento de polígonos",
    autores: "A. Johnson",
    fuente: "Repositorio GitHub, licencia Boost",
    area: "fabricacion",
    usa: "Contornos, perímetros y soportes de PolarSlicer, compilados en C++.",
    enlace: "https://github.com/AngusJohnson/Clipper2"
  },
  {
    titulo: "OndselSolver: solucionador de ensambles multicuerpo",
    autores: "Ondsel y colaboradores",
    fuente: "Repositorio GitHub, licencia LGPL-2.1",
    area: "robotica",
    usa: "Resuelve mecanismos de lazo cerrado en Laboratory, como biela-manivela y cuatro barras.",
    enlace: "https://github.com/Ondsel-Development/OndselSolver"
  },
  {
    titulo: "ngspice: simulador de circuitos",
    autores: "Comunidad ngspice",
    fuente: "Simulador SPICE de código abierto",
    area: "software",
    usa: "Calcula voltajes y corrientes del tablero eléctrico en Laboratory, compilado a WebAssembly.",
    enlace: "https://ngspice.sourceforge.io"
  },
  {
    titulo: "JoltPhysics",
    autores: "J. Rouwé y colaboradores",
    fuente: "Motor de física, licencia MIT",
    area: "robotica",
    usa: "Candidato para la dinámica de Laboratory: engranes, cremalleras, poleas y cuerpos blandos.",
    enlace: "https://github.com/jrouwe/JoltPhysics"
  },
  {
    titulo: "python-control",
    autores: "Comunidad python-control",
    fuente: "Biblioteca Python, licencia BSD-3",
    area: "robotica",
    usa: "Funciones de transferencia y diseño de controladores para la etapa de control de Laboratory.",
    enlace: "https://github.com/python-control/python-control"
  },
  {
    titulo: "PyNite: análisis estructural por elementos finitos",
    autores: "D. Craig y colaboradores",
    fuente: "Biblioteca Python, licencia MIT",
    area: "fabricacion",
    usa: "Análisis de marcos y vigas para verificar estructuras de máquina en Analizer.",
    enlace: "https://github.com/JWock82/PyNite"
  },
  {
    titulo: "Klipper: cinemáticas de impresión 3D",
    autores: "K. O'Connor y colaboradores",
    fuente: "Firmware, licencia GPL-3.0 (consulta de ideas)",
    area: "fabricacion",
    usa: "Referencia de estudio para la cinemática polar de PolarONE; no se copia código.",
    enlace: "https://github.com/Klipper3d/klipper"
  }
];

// English version. Repositorio: artículos, documentos y proyectos en los que se basan los trabajos de Stonward Dynamics.
// area: robotica | microbiologia | bionica | ia | fabricacion | software
// Para agregar uno: copia un bloque. "enlace" puede quedar vacío si no hay versión en línea.
window.STONWARD_ARTICULOS = [
  {
    titulo: "A New Approach to Linear Filtering and Prediction Problems",
    autores: "R. E. Kalman",
    fuente: "Journal of Basic Engineering, 1960",
    area: "robotica",
    usa: "Basis of the closed loop planned for the PolarONE disc (AS5600 encoder + PI + Kalman).",
    enlace: ""
  },
  {
    titulo: "CadCraft: open-source 2D CAD in Rust",
    autores: "ArtCraft team and contributors",
    fuente: "GitHub repository, license MIT / Apache-2.0",
    area: "software",
    usa: "Source of algorithms for the SolidMaker 2D sketcher: exact intersections, tracking, fillets and constraints.",
    enlace: "https://github.com/storytold/cadcraft"
  },
  {
    titulo: "CadQuery: parametric modelling in Python",
    autores: "CadQuery community",
    fuente: "GitHub repository, license Apache-2.0",
    area: "fabricacion",
    usa: "Exact solid engine of the SolidMaker server and generator of every machine's parts.",
    enlace: "https://github.com/CadQuery/cadquery"
  },
  {
    titulo: "three.js",
    autores: "three.js community",
    fuente: "JavaScript library, license MIT",
    area: "software",
    usa: "3D viewer of SolidMaker and of the machines on this site.",
    enlace: "https://threejs.org"
  },
  {
    titulo: "A Kinematic Notation for Lower-Pair Mechanisms Based on Matrices",
    autores: "J. Denavit, R. S. Hartenberg",
    fuente: "Journal of Applied Mechanics, 1955",
    area: "robotica",
    usa: "Link-and-joint convention used to describe the SD-R7 arm chain and its inverse kinematics in Machin.",
    enlace: ""
  },
  {
    titulo: "Optimum Settings for Automatic Controllers",
    autores: "J. G. Ziegler, N. B. Nichols",
    fuente: "Transactions of the ASME, 1942",
    area: "robotica",
    usa: "Starting point for tuning the PID of the PolarONE θ axis.",
    enlace: ""
  },
  {
    titulo: "Open CASCADE Technology",
    autores: "Open Cascade SAS and community",
    fuente: "B-rep geometry kernel, license LGPL-2.1",
    area: "fabricacion",
    usa: "Exact geometry under CadQuery: booleans, threads and STEP/IGES export.",
    enlace: "https://dev.opencascade.org"
  },
  {
    titulo: "Manifold: robust solid geometry",
    autores: "E. Lalish and contributors",
    fuente: "GitHub repository, license Apache-2.0",
    area: "software",
    usa: "Fast in-browser mesh booleans for PolarCAD cuts and holes.",
    enlace: "https://github.com/elalish/manifold"
  },
  {
    titulo: "Clipper2: polygon clipping and offsetting",
    autores: "A. Johnson",
    fuente: "GitHub repository, license Boost",
    area: "fabricacion",
    usa: "PolarSlicer contours, perimeters and supports, compiled in C++.",
    enlace: "https://github.com/AngusJohnson/Clipper2"
  },
  {
    titulo: "OndselSolver: multibody assembly solver",
    autores: "Ondsel and contributors",
    fuente: "GitHub repository, license LGPL-2.1",
    area: "robotica",
    usa: "Solves closed-loop mechanisms in Laboratory, such as slider-cranks and four-bar linkages.",
    enlace: "https://github.com/Ondsel-Development/OndselSolver"
  },
  {
    titulo: "ngspice: circuit simulator",
    autores: "ngspice community",
    fuente: "Open-source SPICE simulator",
    area: "software",
    usa: "Computes voltages and currents of the Laboratory control panel, compiled to WebAssembly.",
    enlace: "https://ngspice.sourceforge.io"
  },
  {
    titulo: "JoltPhysics",
    autores: "J. Rouwé and contributors",
    fuente: "Physics engine, license MIT",
    area: "robotica",
    usa: "Candidate for Laboratory dynamics: gears, racks, pulleys and soft bodies.",
    enlace: "https://github.com/jrouwe/JoltPhysics"
  },
  {
    titulo: "python-control",
    autores: "python-control community",
    fuente: "Python library, license BSD-3",
    area: "robotica",
    usa: "Transfer functions and controller design for the Laboratory control stage.",
    enlace: "https://github.com/python-control/python-control"
  },
  {
    titulo: "PyNite: finite-element structural analysis",
    autores: "D. Craig and contributors",
    fuente: "Python library, license MIT",
    area: "fabricacion",
    usa: "Frame and beam analysis to check machine structures in Analizer.",
    enlace: "https://github.com/JWock82/PyNite"
  },
  {
    titulo: "Klipper: 3D printing kinematics",
    autores: "K. O'Connor and contributors",
    fuente: "Firmware, GPL-3.0 license (ideas only)",
    area: "fabricacion",
    usa: "Study reference for PolarONE polar kinematics; no code is copied.",
    enlace: "https://github.com/Klipper3d/klipper"
  }
];

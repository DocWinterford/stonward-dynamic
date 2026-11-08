// English version of data/maquinas.js (same ids, images and packages).
window.STONWARD_MAQUINAS = [
  {
    id: "polarone", nombre: "PolarONE", modelo: "Polar-coordinate additive manufacturing system",
    estado: "disponible", porDefecto: true, imagen: "img/polarone.jpg", paquete: "descargas/maquinas/PolarONE.zip",
    resumen: "A material-extrusion (FFF) 3D printer whose kinematics work in cylindrical coordinates: a Ø400 mm plate rotates continuously (θ axis) while the print head moves in radius (R) and height (Z).",
    uso: "Production of revolved and axisymmetric parts such as housings, nozzles, impellers and vessels. Its continuous toolpaths remove the direction reversals of Cartesian kinematics, cutting vibration and cycle time.",
    datos: [["Process", "Material extrusion (FFF)"], ["Kinematics", "Continuous θ · R · Z"], ["Build volume", "Ø400 × 300 mm"], ["θ drive", "Stepper 3 A, 3200 microsteps, S-curve ramp"], ["Control", "ESP32, open loop; closed loop with magnetic encoder in development"]],
    driver: "ESP32 firmware «Continuous theta v3». The driver package will be published here."
  },
  {
    id: "sd-c1", nombre: "SD-C1", modelo: "Enclosed CoreXY Cartesian 3D printer",
    estado: "disponible", imagen: "img/sd-c1.jpg", paquete: "descargas/maquinas/SD-C1.zip",
    resumen: "An FFF platform with CoreXY kinematics, GT2 belt drive and MGN12 linear rails. The Z axis rides on three Tr8 lead screws that level the bed at three points.",
    uso: "Production of technical parts in engineering polymers (ABS, ASA, PC, nylon) that need a thermally stable chamber and repeatable dimensional accuracy.",
    datos: [["Process", "Material extrusion (FFF)"], ["Kinematics", "CoreXY + independent triple Z"], ["Build volume", "250 × 250 × 250 mm"], ["Rails", "MGN12 linear rails"], ["Enclosure", "Tempered glass, top-hinged door, touchscreen"]],
    driver: "Uses the Cartesian driver included in SolidMaker."
  },
  {
    id: "sd-d1", nombre: "SD-D1", modelo: "Delta parallel-kinematics 3D printer",
    estado: "disponible", imagen: "img/sd-d1.jpg", paquete: "descargas/maquinas/SD-D1.zip",
    resumen: "Three vertical carriages on Ø10 rods drive a very light effector platform through six 400 mm carbon-fibre arms with magnetic ball joints.",
    uso: "High-speed, high-acceleration printing of tall and cylindrical parts. The low effector inertia allows fast toolpaths without sacrificing surface quality.",
    datos: [["Process", "Material extrusion (FFF)"], ["Kinematics", "Parallel delta, 3 towers"], ["Build volume", "Ø300 × 410 mm"], ["Drive", "GT2 belts + NEMA 17 at the base"], ["Effector", "Dual-gear extruder, V6 hotend"]],
    driver: "Delta driver included in the package (driver.js): computes each carriage height from X, Y, Z."
  },
  {
    id: "sd-r7", nombre: "SD-R7", modelo: "6-DOF articulated robot with synchronised rotary table",
    estado: "disponible", imagen: "img/sd-r7.jpg", paquete: "descargas/maquinas/SD-R7.zip",
    resumen: "A six-axis serial manipulator with cycloidal reducers in every joint and a spherical wrist, coordinated with a rotary table acting as a seventh axis.",
    uso: "Multi-axis additive manufacturing: non-planar deposition, printing on curved surfaces and support-free parts. With a different end effector it handles pick-and-place and robotic cell processes.",
    datos: [["Degrees of freedom", "6 + 1 (C table)"], ["Reach", "Upper arm 350 mm + forearm 330 mm"], ["Reducers", "Cycloidal, steel pins and bronze rollers"], ["Motors", "NEMA 23 on J1–J2, NEMA 17 on J3–J6"], ["Control", "Analytic inverse kinematics, cabinet with 7\" screen"]],
    driver: "Arm driver included in the package (driver.js): analytic inverse kinematics from the tool-tip X, Y, Z and the table rotation C."
  },
  {
    id: "sd-m5", nombre: "SD-M5", modelo: "Simultaneous 5-axis CNC machining centre",
    estado: "disponible", imagen: "img/sd-m5.jpg", paquete: "descargas/maquinas/SD-M5.zip",
    resumen: "A moving-gantry architecture on a cast bed, with X, Y and Z linear axes on size-25 rails and ball screws, and an A tilting cradle with a C rotary table in trunnion configuration.",
    uso: "Machining of complex geometry in a single setup, such as blades, impellers, moulds and aerospace or medical parts, with RTCP control. The orientable spindle and the chuck on C also allow turning operations (mill-turn).",
    datos: [["Axes", "X · Y · Z + A ±110° + continuous C"], ["Rails", "Size-25 linear rails with ball carriages"], ["Drive", "Ø25 ball screws + AC servos (dual Y)"], ["Spindle", "Motor spindle with M19 orientation"], ["Control", "5-axis RTCP"]],
    driver: "RTCP driver included in the package (driver.js): program X, Y, Z are in the table frame and are transformed with A and C."
  },
  {
    id: "sd-t2", nombre: "SD-T2", modelo: "Slant-bed CNC lathe",
    estado: "disponible", imagen: "img/sd-t2.jpg", paquete: "descargas/maquinas/SD-T2.zip",
    resumen: "A cast bed slanted at 45° with roller rails, X and Z slides on ball screws and servo motors, a 12-station servo turret and a hydraulic tailstock.",
    uso: "Production of precision turned parts such as shafts, bushings, flanges and threads in short and medium runs. The slant bed clears chips easily and stays rigid under heavy cuts.",
    datos: [["Axes", "X (diameter) · Z + C spindle"], ["Bed", "45° slant, size-35 roller rails"], ["Turret", "Servo, 12 BMT stations"], ["Spindle", "A2-6, 8\" hydraulic chuck, 11 kW motor"], ["Peripherals", "Hydraulic tailstock, chip conveyor"]],
    driver: "Lathe driver included in the package (driver.js): X in diameter, Z from the part face and C for spindle rotation."
  }
];

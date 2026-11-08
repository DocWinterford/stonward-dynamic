// SolidMaker learning paths, English (educacion-en.html). Same ids as data/cursos.js.
window.SM_CURSOS = [
  {
    id: "fundamentos", titulo: "Fundamentals", nivel: "From scratch",
    resumen: "Get to know the screen and draw your first 2D sketches with exact dimensions.",
    lecciones: [
      {
        id: "f1", titulo: "The PolarCAD screen", minutos: 10, listo: true,
        objetivo: "Find the toolbar, the side menu, the 3D viewer, the project manager and the status bar.",
        pasos: [
          "Open SolidMaker. The module shown is PolarCAD.",
          "At the top is the toolbar: two rows of menus grouped by task (document, drawing, features, finishing…).",
          "On the left, the side menu switches modules: CAD, Laboratory, Machining, Slicer and Analysis.",
          "In the centre is the 3D viewer. Drag with the left button to orbit, use the wheel to zoom and the right button to pan.",
          "The Iso 3D, Top, Side and Front buttons put the camera in standard views. Try each one.",
          "At the bottom, the status bar shows the active plane, the cursor position and the grid size."
        ],
        herr: ["barra", "lateral", "visor", "gestor", "estado"],
        reto: "Without touching the mouse, switch to the Top view and then back to Iso 3D."
      },
      {
        id: "f2", titulo: "Lines and rectangles to size", minutos: 15, listo: true,
        objetivo: "Draw a closed outline by typing lengths instead of guessing them.",
        pasos: [
          "Choose the Top view to draw on the XY plane.",
          "Select Line. Click the origin to start.",
          "Move the cursor to the right, type 80 and press Enter: the stroke is exactly 80 mm long.",
          "Go up, type 40 and Enter. Repeat to the left with 80 and down until you close at the start point.",
          "To draw the same outline in one go, use Rectangle: click a corner and type the width and height.",
          "Press Esc to release the tool."
        ],
        herr: ["herramientas-de-dibujo-croquis--linea", "herramientas-de-dibujo-croquis--rectangulo", "herramientas-de-dibujo-croquis--seleccionar"],
        reto: "Draw an «L» of 60 × 40 mm with 15 mm wide arms using only Line."
      },
      {
        id: "f3", titulo: "Circles, arcs and polygons", minutos: 15, listo: true,
        objetivo: "Combine curves with straight lines using the centre, tangent and quadrant snaps.",
        pasos: [
          "Select Circle, click the centre and type the radius.",
          "With Arc, draw a curve that starts at the end of a line. The tangent snap appears as you get close.",
          "With Polygon, set the number of sides in the bar and draw an inscribed hexagon.",
          "Hover over a circle: the quadrant snaps (0°, 90°, 180°, 270°) give you exact points."
        ],
        herr: ["herramientas-de-dibujo-croquis--circulo", "herramientas-de-dibujo-croquis--arco", "herramientas-de-dibujo-croquis--poligono"],
        reto: "Draw a slot: two R10 semicircles joined by 50 mm straight lines."
      },
      {
        id: "f4", titulo: "Dimensions and relations", minutos: 20, listo: true,
        objetivo: "Lock a sketch with dimensions and geometric relations so it cannot deform.",
        pasos: [
          "With Dimension, click a line and place the number. Type a new value and the sketch adjusts.",
          "Open Relations and apply horizontal, vertical, parallel or tangent between strokes.",
          "Use Show degrees of freedom: whatever can still move is highlighted. Add dimensions until nothing is left free.",
          "Use Measure to check distances without adding dimensions."
        ],
        herr: ["anotacion--cota", "anotacion--relaciones", "anotacion--ver-grados-de-libertad", "anotacion--medir"],
        reto: "Fully dimension the «L» from lesson 2 and change the arm width to 12 mm."
      },
      {
        id: "f5", titulo: "Editing strokes", minutos: 15, listo: true,
        objetivo: "Clean up a sketch with trim, extend, move, copy and mirror.",
        pasos: [
          "Draw two crossing lines. With Trim, click the leftover segment and it disappears.",
          "With Extend, lengthen a line until it meets another.",
          "Select strokes and use Move or Copy with base point: pick a start point and a destination.",
          "With Mirror strokes, reflect half an outline across an axis to get the whole part."
        ],
        herr: ["editar--recortar", "editar--extender", "transformaciones--mover-punto-base", "transformaciones--copiar-punto-base", "transformaciones--simetria-de-trazos"],
        reto: "Draw half the profile of a wrench and complete it with Mirror."
      }
    ]
  },
  {
    id: "solidos", titulo: "Solids", nivel: "Basic",
    resumen: "Turn sketches into parts: extrude, revolve, cut, round and repeat.",
    lecciones: [
      {
        id: "s1", titulo: "Extruding an outline", minutos: 10, listo: true,
        objetivo: "Create your first solid from a closed outline.",
        pasos: [
          "Draw an 80 × 40 mm rectangle.",
          "Choose Features → Straight extrude and type 10 mm thickness.",
          "Orbit the view: it is now a solid plate. Edit last feature lets you change the thickness later."
        ],
        herr: ["operaciones--extruir-contorno-recto", "operaciones--editar-ultima-operacion-de-la-pieza"],
        reto: "Extrude the dimensioned «L» to 20 mm, then change it to 25 mm."
      },
      {
        id: "s2", titulo: "Revolve: shafts and pulleys", minutos: 15, listo: true,
        objetivo: "Make parts of revolution by turning a profile around an axis.",
        pasos: [
          "In the Front view, draw half the profile of the shaft: a closed outline against a line that will act as the axis.",
          "Choose Features → Revolve and select the axis line.",
          "At 360° you get the whole part. Try 180° to see the section."
        ],
        herr: ["operaciones--revolucion-usa-el-perfil", "referencia--eje-de-referencia"],
        reto: "Make a stepped shaft of Ø20, Ø15 and Ø10 mm with lengths of 30, 40 and 20 mm."
      },
      {
        id: "s3", titulo: "Cuts and shells", minutos: 15, listo: true,
        objetivo: "Remove material with a sketch drawn on a face.",
        pasos: [
          "On the plate from lesson 1, draw a Ø20 circle.",
          "Choose Cut → Extruded cut and go through the plate.",
          "Use Shell to leave a hollow box with 2 mm walls."
        ],
        herr: ["corte--corte-extruido", "corte--corte-por-revolucion", "corte--vaciado"],
        reto: "Turn the plate into a hollow cover with a rectangular window."
      },
      {
        id: "s4", titulo: "Fillets and chamfers", minutos: 10, listo: true,
        objetivo: "Finish the edges as on a real part.",
        pasos: [
          "Select the outer edges of the plate.",
          "Apply a 3 mm convex fillet.",
          "On the hole edges, apply a 1 mm chamfer."
        ],
        herr: ["acabado--fillet-convexo", "acabado--fillet-concavo", "acabado--chaflan"],
        reto: "Round only the four vertical corners of the plate."
      },
      {
        id: "s5", titulo: "Patterns and holes", minutos: 15, listo: true,
        objetivo: "Repeat features and make standard holes.",
        pasos: [
          "Make a Ø6 Hole in the plate.",
          "With Linear pattern, repeat it 4 times every 15 mm.",
          "On a round flange, use Circular pattern with 6 copies over 360°.",
          "Change one to an M6 Tapped hole so it is ready for a screw."
        ],
        herr: ["mecanizado--taladro", "mecanizado--taladro-roscado", "patrones--matriz-lineal", "patrones--matriz-circular"],
        reto: "A Ø120 flange with 8 Ø10 holes on a Ø95 bolt circle."
      }
    ]
  },
  {
    id: "clasicas", titulo: "Classic parts", nivel: "Intermediate",
    resumen: "The parts every engineer draws at some point, step by step.",
    lecciones: [
      {
        id: "c1", titulo: "L bracket with rib", minutos: 25, listo: true,
        objetivo: "Model a strong corner bracket: two plates, a stiffening rib and mounting holes.",
        pasos: [
          "In the Front view, draw an «L»: 60 mm horizontal arm, 50 mm vertical arm, 6 mm thick. Fully dimension it.",
          "Extrude the outline 40 mm. You now have both plates in a single part.",
          "On the side face, draw a 30 × 30 mm right triangle resting in the inner corner.",
          "Extrude it 6 mm, centred: that is the rib that stops the «L» from opening under load.",
          "Make two Ø6.5 Holes in each arm, 15 mm from the edges, for M6 screws.",
          "Round the inner corner with a 4 mm concave fillet and the outer ones with a 2 mm convex fillet."
        ],
        herr: ["operaciones--extruir-contorno-recto", "anotacion--cota", "mecanizado--taladro", "acabado--fillet-concavo", "acabado--fillet-convexo"],
        reto: "Add a second rib and change the thickness to 8 mm by editing the first feature."
      },
      {
        id: "c2", titulo: "Flange with a hole pattern", minutos: 20, listo: true,
        objetivo: "Make a pipe flange with a central bore and bolts spread on a circle.",
        pasos: [
          "In the Front view, draw half the profile: a Ø150 × 18 mm disc with a Ø80 × 30 mm neck.",
          "Revolve 360° around the central axis.",
          "Cut the Ø60 central bore with a through Extruded cut.",
          "Make a Ø18 Hole 60 mm from the centre, on the disc face.",
          "Repeat it with Circular pattern: 8 copies over 360°.",
          "Put a 2 mm chamfer on the bore edge and a 3 mm fillet between disc and neck."
        ],
        herr: ["operaciones--revolucion-usa-el-perfil", "corte--corte-extruido", "mecanizado--taladro", "patrones--matriz-circular", "acabado--chaflan"],
        reto: "Turn it into a blind flange: remove the central bore and keep only the bolt holes."
      },
      {
        id: "c3", titulo: "Spur gear from the library", minutos: 15, listo: true,
        objetivo: "Insert a standard gear, set module and teeth, and fit it to a shaft.",
        pasos: [
          "Open the Library in the right panel and search for «gear».",
          "Choose spur gear and type module 1.5 and 30 teeth. The pitch diameter comes out at 45 mm (m × z).",
          "Insert it. It is an exact solid, not a mesh: it can be cut and drilled.",
          "Cut a Ø10 bore in the centre and a 3 × 1.5 mm keyway.",
          "Insert a second 15-tooth gear with the same module: the centre distance is (30 + 15) × 1.5 / 2 = 33.75 mm."
        ],
        herr: ["corte--corte-extruido", "anotacion--medir", "material--propiedades"],
        reto: "Build a 3-gear train with an overall 4:1 ratio using module 1."
      },
      {
        id: "c4", titulo: "20-tooth GT2 pulley", minutos: 15, listo: true,
        objetivo: "Use the library GT2 pulley and understand its profile so the belt seats properly.",
        pasos: [
          "Search for «GT2 pulley» in the Library and choose 20 teeth and a 6 mm belt.",
          "The pitch is 2 mm: 20 teeth give a 40 mm pitch circumference, that is 40 mm of travel per turn.",
          "Check the 5 mm bore for a NEMA 17 motor shaft and the set screw.",
          "Measure the outside diameter with Measure and compare it with the pitch diameter: the difference is the tooth height."
        ],
        herr: ["anotacion--medir", "anotacion--propiedades-fisicas"],
        reto: "Work out how many steps per millimetre a 200-step motor with 16 microsteps needs with this pulley."
      },
      {
        id: "c5", titulo: "Threaded bolt and hex nut", minutos: 25, listo: true,
        objetivo: "Model an M8 bolt and its nut with a real thread, and check that they fit.",
        pasos: [
          "Draw a hexagon 13 mm across flats and extrude it 5.3 mm: that is the M8 head.",
          "On the head, draw a Ø8 circle and extrude it 30 mm: the shank.",
          "Apply Screw thread to the shank with a 1.25 mm pitch (coarse metric thread).",
          "In a new part, draw another 13 mm hexagon and extrude it 6.5 mm: the nut.",
          "Apply an M8 Tapped hole to the centre of the nut.",
          "Put a 0.8 mm chamfer on the edges of the head and the nut, as on a commercial part."
        ],
        herr: ["mecanizado--rosca-de-tornillo", "mecanizado--taladro-roscado", "herramientas-de-dibujo-croquis--poligono", "acabado--chaflan"],
        reto: "Repeat with M5 (8 mm across flats, 0.8 pitch) and compare it with the Library one."
      },
      {
        id: "c6", titulo: "Bent sheet-metal enclosure", minutos: 30, listo: true,
        objetivo: "Design a 1.5 mm sheet-metal box and get its flat pattern for cutting.",
        pasos: [
          "Draw a 200 × 150 mm rectangle and create a 1.5 mm Base flange.",
          "Select the four edges and apply an 80 mm upward Edge flange: you have the box.",
          "Add 15 mm tabs on two sides to screw the lid on.",
          "Cut rectangular vents on one side and repeat them with Linear pattern.",
          "Use Unfold to see the flat sheet with its bend lines; Fold takes it back to the assembled state."
        ],
        herr: ["chapa--brida-base", "chapa--brida-de-arista", "chapa--desplegar", "chapa--doblar", "patrones--matriz-lineal"],
        reto: "Add a Rib on the bottom to stiffen it and export the flat pattern as a 2D drawing."
      }
    ]
  },
  {
    id: "ensambles", titulo: "Assemblies and motion", nivel: "Intermediate",
    resumen: "Join parts with mechanical relations and set them moving with motors.",
    lecciones: [
      {
        id: "e1", titulo: "Inserting parts and fixing the base", minutos: 15, listo: true,
        objetivo: "Create an assembly, bring in parts and fix the one that does not move.",
        pasos: [
          "In the Assembly menu choose New assembly.",
          "With Insert part, bring in the base and then the other parts from your projects or the Library.",
          "Select the base and use Fix/Release: it will no longer move even if you drag the rest.",
          "Place each part by hand where it goes. SolidMaker keeps your placement when you create relations.",
          "Save with Save assembly."
        ],
        herr: ["ensamble--nuevo-ensamble", "ensamble--insertar-pieza", "ensamble--fijar-liberar", "ensamble--guardar-ensamble"],
        reto: "Assemble the L bracket on a plate and fix the plate."
      },
      {
        id: "e2", titulo: "Hinges, sliders and threads", minutos: 25, listo: true,
        objetivo: "Give each part the motion it would have in reality.",
        pasos: [
          "Open the Joints console. Choose Rotational and point to the common axis of two parts: that is a hinge.",
          "Choose Slider between a carriage and its rail: it will only move along it.",
          "Choose Thread between a nut and a lead screw. Check that the diameter matches; the pitch is taken from the Library.",
          "In the Relations section, press Test on each card to watch it move. Stops are set where the part collides.",
          "To join parts as if they were welded, hold Ctrl+A and touch each part; when you release, they are joined."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Make a carriage on a rail driven by a lead screw and set its stops with «Click»."
      },
      {
        id: "e3", titulo: "Gears and GT2 belts", minutos: 25, listo: true,
        objetivo: "Transmit rotation between shafts with gears and with a toothed belt.",
        pasos: [
          "Insert two gears of the same module, mounted on parallel shafts at the correct distance.",
          "Use Join between them: you get a gear relation with the direction of rotation reversed.",
          "For the belt, insert two GT2 pulleys and choose Belt in Joints. The belt is drawn seated in the teeth and gives you its length.",
          "Test the motor on one shaft: the gears and the belt follow the tooth ratio."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Build a 3:1 belt reduction and check the nearest commercial belt length."
      },
      {
        id: "e4", titulo: "Motors and servos: testing the mechanism", minutos: 20, listo: true,
        objetivo: "Set the assembly moving with actuators before you build it.",
        pasos: [
          "Insert a NEMA 17 motor from the Library. In Actuators, define its rotor.",
          "Press Test: the motor spins and drags the parts mounted on it, chained through gears, belts and lead screws.",
          "Insert a servo. Set its range and speed on its card; when it hits something it reverses.",
          "Press Stop: every part returns to its original position."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Make a hinged flap driven by a servo from 0 to 90°."
      },
      {
        id: "e5", titulo: "Interferences and clearances", minutos: 20, listo: true,
        objetivo: "Find overlapping parts before the machine finds them for you.",
        pasos: [
          "Open the Interferences console. It analyses the whole assembly and shows a progress bar.",
          "Each touching pair appears with its per-face clearance map, from −100 to 100.",
          "Adjust the tolerance: parts are inflated by that amount to show whether they fit too tightly.",
          "Resolve proposes moving the overlapping part the minimum needed, one at a time, with Accept or Reject. Welded or related parts are never moved."
        ],
        herr: ["ensamble--fijar-liberar"],
        reto: "Push a screw one millimetre too far into a plate and find the clash with the console."
      }
    ]
  },
  {
    id: "proyectos", titulo: "Complete projects", nivel: "Advanced",
    resumen: "End-to-end designs that bring together everything you have learned.",
    lecciones: [
      {
        id: "p1", titulo: "Volkswagen Beetle boxer engine", minutos: 180, listo: true,
        objetivo: "Model and animate the four-cylinder opposed engine of the Beetle 1600: 85.5 mm bore by 69 mm stroke.",
        pasos: [
          "Plan before you draw: a block in two halves, crankshaft, four connecting rods, four pistons, cylinders, two heads and a camshaft. Create a project with one part per component.",
          "Crankshaft: in the Front view, draw the main journal profile and revolve it. Add the four throws 34.5 mm from the axis (half the stroke) and orient the crank pins for opposed cylinders.",
          "Piston: revolve a Ø85.5 profile with ring grooves. Cut the pin bore with Extruded cut.",
          "Connecting rod: draw the outline in the Top view with two circles (small end and big end), join them with tangent lines, extrude and pocket the web.",
          "Cylinder: revolve a tube of Ø85.5 bore with cooling fins; use Linear pattern to repeat the fins.",
          "Block: extrude each half from its sketch, cut the main bearing seats with Revolved cut and use Mirror for the second half.",
          "Assemble: fix the block, join the crankshaft with a Rotational relation and each rod to the crankshaft and its piston with more Rotationals. Each piston is a Slider inside its cylinder.",
          "Put a motor on the crankshaft and test it. For the closed rod-piston loop, take the assembly to Laboratory and use «Solve mechanism».",
          "Check interferences at top and bottom dead centre of each piston."
        ],
        herr: ["operaciones--revolucion-usa-el-perfil", "corte--corte-por-revolucion", "patrones--matriz-lineal", "patrones--simetria", "ensamble--insertar-pieza", "ensamble--actuadores-motores"],
        reto: "Check that the 1-4-3-2 firing order matches the position of the crankshaft throws."
      },
      {
        id: "p2", titulo: "CoreXY 3D printer", minutos: 240, listo: true,
        objetivo: "Design a complete CoreXY printer like the SD-C1 and leave it ready to be controlled from Machin.",
        pasos: [
          "Define the build volume (for example 250 × 250 × 250 mm) and work out the frame size by adding the travel of the head and carriages.",
          "Frame: insert 2020 extrusions from the Library, place them and weld them with Ctrl+A so they behave as one part.",
          "XY axes: insert MGN12 rails, carriages, two NEMA 17 motors and 20-tooth GT2 pulleys. Join the carriages with Sliders and route the belts with the Belt relation.",
          "Z axis: three Tr8 lead screws with their nuts, joined with Thread. Three motors, one per screw, let you level the bed.",
          "Test each motor with Test and check the stops: the head must cover the full 250 mm without colliding.",
          "Run Interferences on the whole assembly.",
          "Look at the SD-C1 package on its Machines page to see how a machine is described for Machin: links, joints and driver."
        ],
        herr: ["ensamble--nuevo-ensamble", "ensamble--fijar-liberar", "ensamble--actuadores-motores"],
        reto: "Change the volume to 300 × 300 × 300 mm and adjust only the frame dimensions."
      },
      {
        id: "p3", titulo: "Six-axis robot arm", minutos: 240, listo: true,
        objetivo: "Design an articulated six-axis arm, like the SD-R7, with its reducers and its joint chain ready to move.",
        pasos: [
          "Define reach and payload (for example 600 mm and 2 kg). Split the reach between the upper arm (J2-J3) and the forearm (J3-J5).",
          "Base and J1: a fixed pedestal and a turntable on a vertical axis. Join them with a Rotational relation and put a NEMA 23 motor on J1.",
          "Shoulder J2 and elbow J3: model each link as a part hollowed with Shell to lighten it. Place a reducer and a motor at each joint.",
          "Wrist J4, J5 and J6: three axes that intersect at one point. This separates the position of the tool from its orientation.",
          "Join each link to the previous one with a Rotational. Order matters: each joint moves everything after it.",
          "Test each motor on its own with Test, then several at once: the links follow the chain.",
          "Check interferences at the extreme positions of each joint and adjust the stops.",
          "Compare your design with the SD-R7 package in Machines: there the links and joints are described so Machin can compute the inverse kinematics."
        ],
        herr: ["corte--vaciado", "ensamble--insertar-pieza", "ensamble--actuadores-motores", "ensamble--fijar-liberar"],
        reto: "Add a rotary table as a seventh axis and test it together with J1."
      },
      {
        id: "p4", titulo: "PLC test bench in Laboratory", minutos: 120, listo: true,
        objetivo: "Wire a PLC with buttons, sensors and a load, program it in ladder and check the circuit.",
        pasos: [
          "Open Laboratory and the Devices tab. Add a 24 V power supply, a PLC, a start button, a stop button, an inductive sensor and a pilot light.",
          "Connect each terminal. «Tidy cables» routes the wires for you, and each one is labelled with its source and destination.",
          "In the Circuit tab, check voltages and currents: the calculation is done with ngspice. Deal with the short-circuit, overload or unpowered-load alerts.",
          "In the ladder editor, write a latching start-stop: start in parallel with the output, stop in series.",
          "Switch to RUN and press the buttons: the live ladder shows which contacts conduct.",
          "Turn on «Inputs from wiring» so the PLC reads the real voltage at each input."
        ],
        herr: [],
        reto: "Add a timer that switches the pilot light off 5 s after the sensor stops detecting."
      }
    ]
  }
];

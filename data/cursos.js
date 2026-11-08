// Rutas de aprendizaje de SolidMaker (educacion.html).
// Cada lección: pasos en orden; "herr" son anclas del manual (manual.html#<ancla>).
// listo: false = lección anunciada, todavía sin pasos publicados.
window.SM_CURSOS = [
  {
    id: "fundamentos", titulo: "Fundamentos", nivel: "Desde cero",
    resumen: "Conoce la pantalla y dibuja tus primeros croquis 2D con medidas exactas.",
    lecciones: [
      {
        id: "f1", titulo: "La pantalla de PolarCAD", minutos: 10, listo: true,
        objetivo: "Ubicar la barra de herramientas, el menú lateral, el visor 3D, el gestor de proyectos y la barra de estado.",
        pasos: [
          "Abre SolidMaker. El módulo que se muestra es PolarCAD.",
          "Arriba está la barra de herramientas: dos filas de menús agrupados por tarea (documento, dibujo, operaciones, acabado…).",
          "A la izquierda, el menú lateral cambia de módulo: CAD, Laboratorio, Maquinado, Laminador y Análisis.",
          "Al centro está el visor 3D. Arrastra con el botón izquierdo para girar, usa la rueda para acercar y el botón derecho para desplazar.",
          "Los botones Iso 3D, Superior, Perfil y Frontal colocan la cámara en vistas estándar. Prueba cada uno.",
          "Abajo, la barra de estado muestra el plano activo, la posición del cursor y el tamaño de la grilla."
        ],
        herr: ["barra", "lateral", "visor", "gestor", "estado"],
        reto: "Sin tocar el ratón, cambia a la vista Superior y luego vuelve a Iso 3D."
      },
      {
        id: "f2", titulo: "Líneas y rectángulos con medida", minutos: 15, listo: true,
        objetivo: "Dibujar un contorno cerrado tecleando longitudes en lugar de adivinarlas.",
        pasos: [
          "Elige la vista Superior para dibujar sobre el plano XY.",
          "Selecciona Línea. Haz clic en el origen para empezar.",
          "Mueve el cursor hacia la derecha, escribe 80 y pulsa Enter: el trazo mide exactamente 80 mm.",
          "Sube, escribe 40 y Enter. Repite hacia la izquierda con 80 y hacia abajo hasta cerrar en el punto inicial.",
          "Para dibujar el mismo contorno de una vez, usa Rectángulo: haz clic en una esquina y teclea el ancho y el alto.",
          "Pulsa Esc para soltar la herramienta."
        ],
        herr: ["herramientas-de-dibujo-croquis--linea", "herramientas-de-dibujo-croquis--rectangulo", "herramientas-de-dibujo-croquis--seleccionar"],
        reto: "Dibuja una «L» de 60 × 40 mm con brazos de 15 mm de ancho usando solo Línea."
      },
      {
        id: "f3", titulo: "Círculos, arcos y polígonos", minutos: 15, listo: true,
        objetivo: "Combinar curvas con rectas usando los enganches de centro, tangente y cuadrante.",
        pasos: [
          "Selecciona Círculo, haz clic en el centro y escribe el radio.",
          "Con Arco traza una curva que empiece en el extremo de una línea. El enganche de tangente aparece al acercarte.",
          "Con Polígono elige el número de lados en la barra y dibuja un hexágono inscrito.",
          "Pasa el cursor por un círculo: los enganches de cuadrante (0°, 90°, 180°, 270°) te dan puntos exactos."
        ],
        herr: ["herramientas-de-dibujo-croquis--circulo", "herramientas-de-dibujo-croquis--arco", "herramientas-de-dibujo-croquis--poligono"],
        reto: "Dibuja una ranura: dos semicírculos de R10 unidos por rectas de 50 mm."
      },
      {
        id: "f4", titulo: "Cotas y relaciones", minutos: 20, listo: true,
        objetivo: "Fijar un croquis con cotas y relaciones geométricas para que no se deforme.",
        pasos: [
          "Con Cota, haz clic en una línea y coloca el número. Escribe un valor nuevo y el croquis se ajusta.",
          "Abre Relaciones y aplica horizontal, vertical, paralela o tangente entre trazos.",
          "Usa Ver grados de libertad: lo que aún se puede mover se marca. Agrega cotas hasta que no quede nada libre.",
          "Con Medir comprueba distancias sin agregar cotas."
        ],
        herr: ["anotacion--cota", "anotacion--relaciones", "anotacion--ver-grados-de-libertad", "anotacion--medir"],
        reto: "Acota por completo la «L» de la lección 2 y cambia el ancho de los brazos a 12 mm."
      },
      {
        id: "f5", titulo: "Editar trazos", minutos: 15, listo: true,
        objetivo: "Limpiar un croquis con recortar, extender, mover, copiar y simetría.",
        pasos: [
          "Dibuja dos líneas que se crucen. Con Recortar, haz clic en el tramo sobrante y desaparece.",
          "Con Extender, alarga una línea hasta tocar otra.",
          "Selecciona trazos y usa Mover o Copiar con punto base: elige un punto de origen y uno de destino.",
          "Con Simetría de trazos refleja medio contorno sobre un eje para obtener la pieza completa."
        ],
        herr: ["editar--recortar", "editar--extender", "transformaciones--mover-punto-base", "transformaciones--copiar-punto-base", "transformaciones--simetria-de-trazos"],
        reto: "Dibuja medio perfil de una llave y complétalo con Simetría."
      }
    ]
  },
  {
    id: "solidos", titulo: "Sólidos", nivel: "Básico",
    resumen: "Convierte croquis en piezas: extruir, revolucionar, cortar, redondear y repetir.",
    lecciones: [
      {
        id: "s1", titulo: "Extruir un contorno", minutos: 10, listo: true,
        objetivo: "Crear tu primer sólido a partir de un contorno cerrado.",
        pasos: [
          "Dibuja un rectángulo de 80 × 40 mm.",
          "Elige Operaciones → Extruir contorno recto y escribe 10 mm de espesor.",
          "Gira la vista: ya es una placa sólida. Con Editar última operación cambias el espesor después."
        ],
        herr: ["operaciones--extruir-contorno-recto", "operaciones--editar-ultima-operacion-de-la-pieza"],
        reto: "Extruye la «L» acotada a 20 mm y cambia luego a 25 mm."
      },
      {
        id: "s2", titulo: "Revolución: ejes y poleas", minutos: 15, listo: true,
        objetivo: "Hacer piezas de revolución girando un perfil alrededor de un eje.",
        pasos: [
          "En la vista Frontal dibuja medio perfil del eje: un contorno cerrado pegado a una línea que hará de eje.",
          "Elige Operaciones → Revolución y selecciona la línea del eje.",
          "Con 360° obtienes la pieza completa. Prueba 180° para ver el corte."
        ],
        herr: ["operaciones--revolucion-usa-el-perfil", "referencia--eje-de-referencia"],
        reto: "Haz un eje escalonado de Ø20, Ø15 y Ø10 mm con largos de 30, 40 y 20 mm."
      },
      {
        id: "s3", titulo: "Cortes y vaciados", minutos: 15, listo: true,
        objetivo: "Quitar material con un croquis dibujado sobre una cara.",
        pasos: [
          "Sobre la placa de la lección 1 dibuja un círculo de Ø20.",
          "Elige Corte → Corte extruido y atraviesa la placa.",
          "Usa Vaciado para dejar una caja hueca con paredes de 2 mm."
        ],
        herr: ["corte--corte-extruido", "corte--corte-por-revolucion", "corte--vaciado"],
        reto: "Convierte la placa en una tapa hueca con una ventana rectangular."
      },
      {
        id: "s4", titulo: "Redondeos y chaflanes", minutos: 10, listo: true,
        objetivo: "Dar acabado a las aristas como en una pieza real.",
        pasos: [
          "Selecciona las aristas exteriores de la placa.",
          "Aplica Fillet convexo de 3 mm.",
          "En las aristas del agujero aplica Chaflán de 1 mm."
        ],
        herr: ["acabado--fillet-convexo", "acabado--fillet-concavo", "acabado--chaflan"],
        reto: "Redondea solo las cuatro esquinas verticales de la placa."
      },
      {
        id: "s5", titulo: "Patrones y taladros", minutos: 15, listo: true,
        objetivo: "Repetir operaciones y hacer agujeros normalizados.",
        pasos: [
          "Haz un Taladro de Ø6 en la placa.",
          "Con Matriz lineal repítelo 4 veces cada 15 mm.",
          "En una brida redonda, usa Matriz circular con 6 copias a 360°.",
          "Cambia uno a Taladro roscado M6 para que quede listo para tornillo."
        ],
        herr: ["mecanizado--taladro", "mecanizado--taladro-roscado", "patrones--matriz-lineal", "patrones--matriz-circular"],
        reto: "Brida de Ø120 con 8 agujeros de Ø10 a Ø95 entre centros."
      }
    ]
  },
  {
    id: "clasicas", titulo: "Piezas clásicas", nivel: "Intermedio",
    resumen: "Las piezas que todo ingeniero dibuja alguna vez, paso a paso.",
    lecciones: [
      { id: "c1", titulo: "Soporte en L con nervio", minutos: 25, listo: false },
      { id: "c2", titulo: "Brida con agujeros en patrón", minutos: 20, listo: false },
      { id: "c3", titulo: "Engrane recto desde la biblioteca", minutos: 15, listo: false },
      { id: "c4", titulo: "Polea GT2 de 20 dientes", minutos: 15, listo: false },
      { id: "c5", titulo: "Tornillo y tuerca hexagonal con rosca", minutos: 25, listo: false },
      { id: "c6", titulo: "Gabinete de lámina doblada", minutos: 30, listo: false }
    ]
  },
  {
    id: "ensambles", titulo: "Ensambles y movimiento", nivel: "Intermedio",
    resumen: "Une piezas con relaciones mecánicas y ponlas a moverse con motores.",
    lecciones: [
      { id: "e1", titulo: "Insertar piezas y fijar la base", minutos: 15, listo: false },
      { id: "e2", titulo: "Bisagras, deslizantes y roscas", minutos: 25, listo: false },
      { id: "e3", titulo: "Engranes y bandas GT2", minutos: 25, listo: false },
      { id: "e4", titulo: "Motores y servos: probar el mecanismo", minutos: 20, listo: false },
      { id: "e5", titulo: "Interferencias y holguras", minutos: 20, listo: false }
    ]
  },
  {
    id: "proyectos", titulo: "Proyectos completos", nivel: "Avanzado",
    resumen: "Diseños de principio a fin que reúnen todo lo aprendido.",
    lecciones: [
      { id: "p1", titulo: "Motor bóxer del Volkswagen Sedán", minutos: 180, listo: false },
      { id: "p2", titulo: "Impresora 3D CoreXY", minutos: 240, listo: false },
      { id: "p3", titulo: "Brazo robótico de seis ejes", minutos: 240, listo: false },
      { id: "p4", titulo: "Banco de pruebas con PLC en Laboratory", minutos: 120, listo: false }
    ]
  }
];

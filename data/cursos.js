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
      {
        id: "c1", titulo: "Soporte en L con nervio", minutos: 25, listo: true,
        objetivo: "Modelar un soporte de esquina resistente: dos placas, un nervio de refuerzo y taladros de montaje.",
        pasos: [
          "En la vista Frontal dibuja una «L»: brazo horizontal de 60 mm, brazo vertical de 50 mm, espesor de 6 mm. Acótala por completo.",
          "Extruye el contorno 40 mm. Ya tienes las dos placas en una sola pieza.",
          "Sobre la cara lateral dibuja un triángulo rectángulo de 30 × 30 mm apoyado en la esquina interior.",
          "Extrúyelo 6 mm centrado: ese es el nervio que evita que la «L» se abra con la carga.",
          "Haz dos Taladros de Ø6,5 en cada brazo, a 15 mm de los bordes, para tornillos M6.",
          "Redondea la esquina interior con Fillet cóncavo de 4 mm y las exteriores con Fillet convexo de 2 mm."
        ],
        herr: ["operaciones--extruir-contorno-recto", "anotacion--cota", "mecanizado--taladro", "acabado--fillet-concavo", "acabado--fillet-convexo"],
        reto: "Agrega un segundo nervio y cambia el espesor a 8 mm editando la primera operación."
      },
      {
        id: "c2", titulo: "Brida con agujeros en patrón", minutos: 20, listo: true,
        objetivo: "Hacer una brida de tubería con barreno central y pernos repartidos en círculo.",
        pasos: [
          "En la vista Frontal dibuja medio perfil: disco de Ø150 × 18 mm con cuello de Ø80 × 30 mm.",
          "Usa Revolución a 360° alrededor del eje central.",
          "Corta el barreno central de Ø60 con Corte extruido pasante.",
          "Haz un Taladro de Ø18 a 60 mm del centro, sobre la cara del disco.",
          "Repítelo con Matriz circular: 8 copias a 360°.",
          "Pon Chaflán de 2 mm en el borde del barreno y Fillet de 3 mm entre disco y cuello."
        ],
        herr: ["operaciones--revolucion-usa-el-perfil", "corte--corte-extruido", "mecanizado--taladro", "patrones--matriz-circular", "acabado--chaflan"],
        reto: "Convierte la brida en ciega: quita el barreno central y deja solo los pernos."
      },
      {
        id: "c3", titulo: "Engrane recto desde la biblioteca", minutos: 15, listo: true,
        objetivo: "Insertar un engrane normalizado, ajustar módulo y dientes, y adaptarlo a un eje.",
        pasos: [
          "Abre la Biblioteca en el panel derecho y busca «engrane».",
          "Elige engrane recto y escribe módulo 1,5 y 30 dientes. El diámetro primitivo resulta de 45 mm (m × z).",
          "Insértalo. Es un sólido exacto, no una malla: se puede cortar y taladrar.",
          "Corta el barreno de Ø10 en el centro y un chavetero de 3 × 1,5 mm.",
          "Inserta un segundo engrane de 15 dientes con el mismo módulo: la distancia entre centros es (30 + 15) × 1,5 / 2 = 33,75 mm."
        ],
        herr: ["corte--corte-extruido", "anotacion--medir", "material--propiedades"],
        reto: "Arma un tren de 3 engranes con relación total 4:1 usando módulo 1."
      },
      {
        id: "c4", titulo: "Polea GT2 de 20 dientes", minutos: 15, listo: true,
        objetivo: "Usar la polea GT2 de la biblioteca y entender su perfil para que la banda asiente bien.",
        pasos: [
          "Busca «polea GT2» en la Biblioteca y elige 20 dientes y banda de 6 mm.",
          "El paso es de 2 mm: 20 dientes dan una circunferencia primitiva de 40 mm, o sea 40 mm de avance por vuelta.",
          "Revisa el barreno de 5 mm para eje de motor NEMA 17 y el tornillo prisionero.",
          "Mide el diámetro exterior con Medir y compáralo con el primitivo: la diferencia es la altura del diente."
        ],
        herr: ["anotacion--medir", "anotacion--propiedades-fisicas"],
        reto: "Calcula cuántos pasos por milímetro necesita un motor de 200 pasos con 16 micropasos y esta polea."
      },
      {
        id: "c5", titulo: "Tornillo y tuerca hexagonal con rosca", minutos: 25, listo: true,
        objetivo: "Modelar un tornillo M8 y su tuerca con rosca real, y comprobar que encajan.",
        pasos: [
          "Dibuja un hexágono de 13 mm entre caras y extrúyelo 5,3 mm: es la cabeza del M8.",
          "Sobre la cabeza dibuja un círculo de Ø8 y extrúyelo 30 mm: el vástago.",
          "Aplica Rosca de tornillo al vástago con paso 1,25 mm (rosca métrica gruesa).",
          "En una pieza nueva dibuja otro hexágono de 13 mm y extrúyelo 6,5 mm: la tuerca.",
          "Aplica Taladro roscado M8 al centro de la tuerca.",
          "Pon Chaflán de 0,8 mm en las aristas de la cabeza y de la tuerca, como en una pieza comercial."
        ],
        herr: ["mecanizado--rosca-de-tornillo", "mecanizado--taladro-roscado", "herramientas-de-dibujo-croquis--poligono", "acabado--chaflan"],
        reto: "Repite con M5 (8 mm entre caras, paso 0,8) y compáralo con el de la Biblioteca."
      },
      {
        id: "c6", titulo: "Gabinete de lámina doblada", minutos: 30, listo: true,
        objetivo: "Diseñar una caja de lámina de 1,5 mm y obtener su desarrollo plano para corte.",
        pasos: [
          "Dibuja un rectángulo de 200 × 150 mm y crea una Brida base de 1,5 mm.",
          "Selecciona las cuatro aristas y aplica Brida de arista de 80 mm hacia arriba: ya tienes la caja.",
          "Agrega pestañas de 15 mm en dos lados para atornillar la tapa.",
          "Corta ventilas rectangulares en un costado y repítelas con Matriz lineal.",
          "Usa Desplegar para ver la lámina plana con las líneas de doblez; con Doblar regresa al estado armado."
        ],
        herr: ["chapa--brida-base", "chapa--brida-de-arista", "chapa--desplegar", "chapa--doblar", "patrones--matriz-lineal"],
        reto: "Agrega un Nervio en el fondo para rigidizarlo y exporta el desarrollo como plano 2D."
      }
    ]
  },
  {
    id: "ensambles", titulo: "Ensambles y movimiento", nivel: "Intermedio",
    resumen: "Une piezas con relaciones mecánicas y ponlas a moverse con motores.",
    lecciones: [
      {
        id: "e1", titulo: "Insertar piezas y fijar la base", minutos: 15, listo: true,
        objetivo: "Crear un ensamble, traer piezas y dejar fija la que no se mueve.",
        pasos: [
          "En el menú Ensamble elige Nuevo ensamble.",
          "Con Insertar pieza trae la base y luego las demás piezas desde tus proyectos o la Biblioteca.",
          "Selecciona la base y usa Fijar/Liberar: ya no se moverá aunque arrastres lo demás.",
          "Coloca cada pieza a mano donde va. SolidMaker respeta tu posición al crear las relaciones.",
          "Guarda con Guardar ensamble."
        ],
        herr: ["ensamble--nuevo-ensamble", "ensamble--insertar-pieza", "ensamble--fijar-liberar", "ensamble--guardar-ensamble"],
        reto: "Ensambla el soporte en L sobre una placa y fíjala."
      },
      {
        id: "e2", titulo: "Bisagras, deslizantes y roscas", minutos: 25, listo: true,
        objetivo: "Dar a cada pieza el movimiento que tendría en la realidad.",
        pasos: [
          "Abre la consola de Uniones. Elige Rotacional y señala el eje común de dos piezas: es una bisagra.",
          "Elige Deslizante entre un carro y su guía: solo se moverá a lo largo de ella.",
          "Elige Rosca entre una tuerca y un husillo. Revisa que el diámetro coincida; el paso se toma de la Biblioteca.",
          "En la sección Relaciones, pulsa Probar en cada tarjeta para verla moverse. Los topes se calculan donde la pieza choca.",
          "Para unir piezas como si estuvieran soldadas, mantén Ctrl+A y toca cada pieza; al soltar quedan unidas."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Haz un carro sobre guía movido por husillo y fija sus topes con «Clic»."
      },
      {
        id: "e3", titulo: "Engranes y bandas GT2", minutos: 25, listo: true,
        objetivo: "Transmitir giro entre ejes con engranes y con banda dentada.",
        pasos: [
          "Inserta dos engranes del mismo módulo, montados en ejes paralelos a la distancia correcta.",
          "Usa Unir entre los dos: queda una relación de engranaje con el sentido de giro invertido.",
          "Para la banda, inserta dos poleas GT2 y elige Banda en Uniones. La banda se dibuja asentada en los dientes y te da su longitud.",
          "Prueba el motor de un eje: los engranes y la banda siguen la relación de dientes."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Arma una reducción 3:1 por banda y verifica la longitud comercial más cercana."
      },
      {
        id: "e4", titulo: "Motores y servos: probar el mecanismo", minutos: 20, listo: true,
        objetivo: "Poner el ensamble a moverse con actuadores antes de fabricarlo.",
        pasos: [
          "Inserta un motor NEMA 17 de la Biblioteca. En Actuadores define su rotor.",
          "Pulsa Probar: el motor gira y arrastra las piezas montadas en él, en cadena con engranes, bandas y husillos.",
          "Inserta un servo. Ajusta el rango y la velocidad en su tarjeta; al chocar con algo invierte el sentido.",
          "Pulsa Detener: todas las piezas regresan a su posición original."
        ],
        herr: ["ensamble--actuadores-motores"],
        reto: "Haz una compuerta abatible movida por servo de 0 a 90°."
      },
      {
        id: "e5", titulo: "Interferencias y holguras", minutos: 20, listo: true,
        objetivo: "Encontrar piezas que se enciman antes de que lo descubra la máquina.",
        pasos: [
          "Abre la consola de Interferencias. Analiza todo el ensamble y muestra una barra de avance.",
          "Cada pareja que se toca aparece con su mapa de holguras por cara, de −100 a 100.",
          "Ajusta la tolerancia: las piezas se inflan ese valor para mostrar si quedan demasiado justas.",
          "Resolver propone mover la pieza encimada el mínimo necesario, una por una, con Aceptar o Rechazar. Las piezas soldadas o relacionadas no se mueven."
        ],
        herr: ["ensamble--fijar-liberar"],
        reto: "Mete un tornillo un milímetro de más en una placa y encuentra el choque con la consola."
      }
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

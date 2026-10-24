/* =====================================================================
   CONFIGURACIÓN EDITABLE — EL GUION Y LOS DATOS DEL JUEGO
   ---------------------------------------------------------------------
   Puede cambiar cualquier texto de este objeto sin tocar la lógica.

   Cada línea de diálogo es:  ['quién', 'texto', 'ánimo']
     quién  → 'aurelio', 'camila', 'rosa', 'ernesto', 'marta',
              'yo' (el jugador) o 'narrador'
     ánimo  → opcional: 'feliz', 'neutral', 'sorpresa', 'triste', 'pensativo'

   Marcadores dentro de los textos:
     {nombre} → el nombre que escribió el jugador
     {finca}  → el nombre de la finca (abajo)
     {ciudad} → la ciudad de la clienta (abajo)
     {o/a}    → forma masculina/femenina según el avatar. Ej: Bienvenid{o/a}

   Consejo: máximo unos 100 caracteres por línea para que quepa en 2 renglones.
   ===================================================================== */
const CONFIG = {
  titulo: 'El viaje de una rosa',
  titulosAlternativos: ['Punto de corte', 'Hoy corto, mañana florece'],
  subtitulo: 'Lo que cortas hoy, alguien lo recibe en unos días.',
  pie: 'Sabana Hack 2026, reto Corte de rosas',
  finca: 'la finca Las Acacias',
  ciudadCliente: 'Miami',

  personajes: {
    aurelio: { nombre: 'Don Aurelio', color: '#2F5D3A' },
    camila: { nombre: 'Camila, florista', color: '#6B57A0' },
    rosa: { nombre: 'La rosa', color: '#B3122E' },
    ernesto: { nombre: 'Don Ernesto', color: '#3D5A78' },
    marta: { nombre: 'Doña Marta', color: '#A3102A' },
    yo: { nombre: '{nombre}', color: '#4F7A40' },
    narrador: { nombre: '', color: '#4A4440' }
  },
  avatares: { ella: 'Mujer', el: 'Hombre' },
  capitulos: ['Primer día', 'La decisión', 'El viaje', 'La llegada', 'Otra oportunidad', 'Retos'],

  /* Nombres visibles de cada punto de corte */
  puntos: {
    1: 'Punto 0-1, botón cerrado',
    2: 'Punto 2, punto ideal',
    3: 'Punto 3, forma de copa'
  },

  /* ---------------- CAPÍTULO 1: PRIMER DÍA ---------------- */
  cap1: {
    llegada: [
      ['narrador', 'Sabana de Bogotá, 5:40 de la mañana. Es tu primer día en la finca.'],
      ['aurelio', '¡Buenos días, {nombre}! Bienvenid{o/a} a {finca}.', 'feliz'],
      ['aurelio', 'Yo soy Aurelio, su padrino. Llevo 20 años cortando rosas aquí.'],
      ['yo', 'Mucho gusto, Don Aurelio. La verdad, yo no sé nada de flores.', 'pensativo'],
      ['aurelio', 'Tranquil{o/a}, nadie nace sabiendo. Para eso estoy yo.', 'feliz']
    ],
    herramientas: [
      ['aurelio', 'Tenga: sus tijeras y sus guantes. Con eso trabajamos todo el día.', 'feliz']
    ],
    porque: [
      ['aurelio', 'Casi todas estas rosas se van para Estados Unidos. Allá alguien las espera.'],
      ['aurelio', 'Lo que usted decide hoy con la tijera se ve días después, cuando la rosa llega.', 'pensativo'],
      ['aurelio', 'Venga, entremos al invernadero.']
    ],
    invernadero: [
      ['narrador', 'Adentro, la luz pasa suavecita por el plástico del techo.'],
      ['aurelio', 'Esta es una cama de rosas. Cada cama mide un metro con cincuenta.']
    ],
    caminar: 'Caminar por la cama',
    despues: [
      ['aurelio', 'Un cortador con experiencia saca unos 220 tallos por hora.'],
      ['yo', '¿220 por hora? ¡Uy, eso es mucho!', 'sorpresa'],
      ['aurelio', 'La rapidez llega con el tiempo. Primero hay que aprender a mirar.', 'feliz'],
      ['aurelio', 'Y el tallo tiene que medir mínimo 40 centímetros. No se le olvide.']
    ],
    recibiste: 'Recibiste tus herramientas',
    herramientasNombres: ['Tijeras', 'Guantes']
  },

  /* ---------------- CAPÍTULO 2: LA DECISIÓN ---------------- */
  cap2: {
    intro: [
      ['aurelio', 'Mire estas tres rosas. Cada una va en un momento distinto.'],
      ['aurelio', 'Si usted tuviera que cortar una hoy, ¿cuál sería?', 'pensativo'],
      ['aurelio', 'Tóquela para verla de cerca. La puede girar y acercar.']
    ],
    introReintento: [
      ['aurelio', 'Aquí tiene otras tres rosas. Mírelas con calma.'],
      ['aurelio', 'Acuérdese de la pista. ¿Cuál cortaría hoy?', 'pensativo']
    ],
    ayudaCama: 'Toca una rosa para observarla',
    etiquetaRosa: 'Rosa',
    esperarHecho: 'Pasó un día. La rosa siguió abriendo en la planta.',
    esperarMax: 'Si la deja más, se abre del todo aquí y ya no aguanta el viaje.',
    ayudaGirar: 'Arrastra para girarla',
    vistas: { frente: 'Frente', lado: 'Lado', atras: 'Atrás', arriba: 'Desde arriba' },
    botonCortar: 'Cortar',
    botonEsperar: 'Esperar un día',
    botonVolver: 'Volver a la cama',
    regla: 'Regla',
    cortado: [
      ['aurelio', '¡Listo, ya la cortó!', 'feliz'],
      ['aurelio', 'Ahora acompañémosla. Su viaje apenas empieza.']
    ]
  },

  /* ---------------- CAPÍTULO 3: EL VIAJE ----------------
     dia: número de día que muestra el calendario (ilustrativo)
     fondo: poscosecha, hidratacion, frio, empaque, camion, avion, miami
     ambiente: sonido de fondo (sala, frio, camion, avion, ciudad)      */
  cap3: {
    intro: [['narrador', 'Mientras tú sigues en la finca, tu rosa empieza su viaje.']],
    etapas: [
      { fondo: 'poscosecha', dia: 0, ambiente: 'sala', musica: 'viaje', texto: 'Poscosecha: revisan la rosa y la clasifican con las demás.' },
      { fondo: 'hidratacion', dia: 0, ambiente: 'sala', musica: 'viaje', texto: 'Hidratación: el tallo toma agua para aguantar el viaje.' },
      { fondo: 'frio', dia: 1, ambiente: 'frio', musica: 'frio', texto: 'Cuarto frío: con el frío, la rosa descansa antes de salir.' },
      { fondo: 'empaque', dia: 1, ambiente: 'sala', musica: 'frio', texto: 'Empaque: la protegen y la acomodan en una caja.' },
      { fondo: 'camion', dia: 2, ambiente: 'camion', musica: 'viaje', texto: 'Camión: rumbo al aeropuerto El Dorado, en Bogotá.' },
      { fondo: 'avion', dia: 2, ambiente: 'avion', musica: 'frio', texto: 'Avión de carga: vuela hacia el norte, sobre el mar Caribe.' },
      { fondo: 'miami', dia: 3, ambiente: 'ciudad', musica: 'viaje', texto: 'Llegada a {ciudad}: revisan las cajas y siguen el camino.' }
    ],
    calendario: 'Día',
    desde: 'Corte',
    hasta: 'Cliente',
    vozRosa: {
      cerrada: ['rosa', 'Hacía frío y yo seguía cerrada. Quería abrir, pero no tenía fuerzas.'],
      ideal: ['rosa', 'Me fui abriendo despacito, a mi ritmo.'],
      abierta: ['rosa', 'Ya iba muy abierta. Cada movimiento del viaje me fue maltratando.']
    }
  },

  /* ---------------- CAPÍTULO 4: LA LLEGADA ---------------- */
  cap4: {
    diaLlegada: 4,
    llegada: [
      ['narrador', '{ciudad}, día 4. La floristería de Camila abre temprano.'],
      ['camila', '¡Llegaron las rosas de Colombia! A ver cómo vienen…', 'feliz']
    ],
    cerrada: [
      ['camila', 'Mmm, estos botones vienen muy apretados. Les pongo agua y espero.', 'pensativo'],
      ['narrador', 'Día 5.'],
      ['camila', 'No abrieron. Se doblaron sin florecer. No las puedo vender.', 'triste'],
      ['camila', 'Tendré que cancelar el pedido con esa finca.', 'triste']
    ],
    ideal: [
      ['camila', '¡Qué belleza! Abrieron justo como deben.', 'sorpresa'],
      ['narrador', 'Entra Don Ernesto, un cliente de siempre.'],
      ['ernesto', 'Camila, hoy cumplo 50 años de casado. Necesito la rosa más linda.', 'feliz'],
      ['camila', 'Tengo justo la indicada. Llegó de Colombia.', 'feliz']
    ],
    idealCasa: [
      ['narrador', 'Esa noche, en casa.'],
      ['marta', '¡Ernesto! Está perfecta… igualita a la de nuestra boda.', 'feliz']
    ],
    abierta: [
      ['camila', 'Ay, no… estas vienen demasiado abiertas.', 'sorpresa'],
      ['camila', 'Los pétalos llegaron golpeados. Así no sirven para un ramo.', 'triste'],
      ['camila', 'Tengo que rechazarlas.', 'triste']
    ],
    resultado: {
      cerrada: { ok: false, titulo: 'Pedido perdido', texto: 'La rosa no abrió en destino. La finca pierde el pedido y la confianza de la clienta.', valor: 'Valor perdido' },
      ideal: { ok: true, titulo: 'Pedido cumplido', texto: 'La rosa abrió perfecta. La clienta queda feliz y le vuelve a pedir a la finca.', valor: 'Valor ganado' },
      abierta: { ok: false, titulo: 'Rosa rechazada', texto: 'La rosa llegó abierta y maltratada. Pierde su valor y la finca pierde la venta.', valor: 'Valor perdido' }
    },
    enLaFinca: 'Resultado en la finca',
    mientras: [['narrador', 'Mientras tanto, en la finca…']],
    fraseAurelio: {
      cerrada: ['aurelio', 'Las muy cerraditas engañan: se ven bonitas, pero se quedan dormidas.', 'pensativo'],
      ideal: ['aurelio', '¡Eso es! Su rosa llegó a hacer feliz a alguien. Y usted la cortó.', 'feliz'],
      abierta: ['aurelio', 'Cuando la dejamos abrir de más en la planta, el viaje la maltrata.', 'pensativo']
    }
  },

  /* ---------------- CAPÍTULO 5: OTRA OPORTUNIDAD ---------------- */
  cap5: {
    animo: [['aurelio', 'Tranquil{o/a}, {nombre}. Equivocarse es parte de aprender. A mí me pasó muchas veces.', 'feliz']],
    /* Pistas sin dar la respuesta: se usa una distinta en cada intento */
    pistas: {
      cerrada: [
        'Esa estaba muy cerradita. Fíjese en los pétalos de afuera: ¿ya se les ve el color?',
        'Mire la forma de la cabeza. ¿Termina en punta, o ya se ve más cuadradita?',
        'Use la regla de la lupa. ¿Qué tan grande es la cabeza de cada rosa?'
      ],
      abierta: [
        'Esa ya venía abriendo. ¿Su cabeza se veía recta, o ya parecía una copa?',
        'Piense en el viaje: si sale ya abierta, ¿llegará bien después de varios días?',
        'Busque una que muestre color afuera, pero que todavía no se abra como copa.'
      ]
    },
    otraVez: [['aurelio', '¿Lo intentamos otra vez?', 'feliz']],
    botonOtraVez: 'Intentar otra vez',
    aLaPrimera: [['aurelio', '¡A la primera! ¿Fue buen ojo o fue suerte? Veamos por qué funcionó.', 'sorpresa']],
    exito: [['aurelio', '¡Muy bien, {nombre}! ¿Sabe qué miraba yo para escoger? Tres cosas.', 'feliz']],
    rasgos: [
      { id: 'color', titulo: 'Color', corto: 'Color en los pétalos de afuera', linea: ['aurelio', 'El color: ya se ve en los pétalos de afuera. A eso le decimos los visos.'] },
      { id: 'forma', titulo: 'Forma', corto: 'Cabeza cuadrada o recta', linea: ['aurelio', 'La forma: la cabeza se ve cuadrada, recta. Todavía no es una copa.'] },
      { id: 'tamano', titulo: 'Tamaño', corto: 'Cabeza de unos 5 cm', linea: ['aurelio', 'El tamaño: la cabeza mide más o menos 5 centímetros.'] }
    ],
    cierre: [
      ['aurelio', 'Ojo: ninguna decide sola. Se miran juntas, y cambian un poco según la variedad.', 'pensativo'],
      ['aurelio', 'Eso lo vamos a aprender en las siguientes etapas. Usted ya tiene el ojo despierto.', 'feliz']
    ]
  },


  /* ---------------- CAPÍTULO 6: RETOS DE LA FINCA ----------------
     Situaciones con dificultad creciente. Cada rosa admite:
       punto (1, 2 o 3) · o (apertura exacta, opcional, para casos difíciles)
       tallo (largo en cm, por defecto 55) · variedad ('roja' o 'durazno')
     modo: 'una'  → el jugador corta una sola rosa
           'varias' → debe cortar todas las listas y dejar las demás
     En el tercer intento fallido, Don Aurelio marca la respuesta.        */
  retos: {
    intro: [
      ['aurelio', 'Ya tiene el ojo despierto. Ahora le pongo retos como los del día a día.', 'feliz'],
      ['aurelio', 'Van de fáciles a difíciles. Si se equivoca, tranquil{o/a}: cada error también enseña.']
    ],
    etiqueta: 'Reto', de: 'de', dificultad: 'Dificultad', niveles: { 1: 'fácil', 2: 'media', 3: 'difícil' },
    ayudaUna: 'Toca la rosa para observarla y decide',
    terminarRonda: 'Terminar ronda', tiempo: 'Tiempo', meta: 'Meta: 60 s',
    marca: 'Mire esta',
    rondaTitulo: 'Resultado de la ronda',
    rondaLinea: { ideal: 'cortada en su punto', cerrada: 'cortada muy cerrada', abierta: 'cortada muy abierta', tallo: 'tallo muy corto', olvido: 'estaba lista y no se cortó', bien: 'bien dejada en la planta' },
    lista: [
      { id: 'esperar', titulo: '¿Hoy o mañana?', dificultad: 1, modo: 'una', rosas: [{ punto: 1 }],
        intro: [['aurelio', 'Aquí solo hay una rosa. ¿La corta hoy o la deja esperar?', 'pensativo']],
        pistas: ['Si todavía no está lista, ¿qué botón le da tiempo?', '¿Ya se le ve el color afuera? ¿La cabeza ya es cuadrada?'],
        solucion: 'Esta estaba cerradita. Toca esperar un día y cortarla cuando muestre color y forma cuadrada.',
        exito: '¡Eso es! Esperar a tiempo también es saber cortar.' },
      { id: 'lista', titulo: 'Ya está lista', dificultad: 1, modo: 'una', rosas: [{ punto: 2 }],
        intro: [['aurelio', 'Y esta otra, ¿hoy o mañana?', 'pensativo']],
        pistas: ['Mírela bien antes de esperar. ¿Le falta algo o ya está?', 'Si ya tiene color afuera y forma cuadrada, ¿para qué esperar?'],
        solucion: 'Esta ya estaba en punto. Un día más y se vuelve copa.',
        exito: '¡Bien! Supo ver que ya estaba lista.' },
      { id: 'parecidas', titulo: 'Casi iguales', dificultad: 2, modo: 'una', rosas: [{ punto: 1, o: .3 }, { punto: 2, o: .52 }, { punto: 3, o: .78 }],
        intro: [['aurelio', 'Estas se parecen más entre sí. Aquí es donde más se equivoca la gente.', 'pensativo'], ['aurelio', 'Use la lupa: gírelas y mídalas.']],
        pistas: ['Compare la forma de la cabeza: ¿punta, cuadrada o una copa que empieza?', 'Use la regla. ¿Cuál mide unos 5 centímetros?'],
        solucion: 'Le marco la que está en punto: color afuera, forma recta y unos 5 cm.',
        exito: '¡Muy fino ese ojo! Esa diferencia es la más difícil.' },
      { id: 'tallo', titulo: 'Mida el tallo', dificultad: 2, modo: 'una', rosas: [{ punto: 2, tallo: 34 }, { punto: 2, tallo: 52 }, { punto: 1, tallo: 55 }],
        intro: [['aurelio', 'Dos de estas están en punto. Pero una tiene un problema.', 'pensativo'], ['aurelio', 'Acuérdese: no solo cuenta la cabeza.']],
        pistas: ['¿Se acuerda del tallo? ¿Cuánto debe medir mínimo?', 'Active la regla en la lupa: ahí ve el largo del tallo.'],
        solucion: 'El tallo debe medir mínimo 40 cm. Le marco la que sí cumple.',
        exito: '¡Exacto! Cabeza en punto y tallo largo: así sí viaja.' },
      { id: 'variedad', titulo: 'Otra variedad', dificultad: 2, modo: 'una', rosas: [{ punto: 1, variedad: 'durazno' }, { punto: 2, variedad: 'durazno' }, { punto: 3, variedad: 'durazno' }],
        intro: [['aurelio', 'Esta variedad es color durazno. El color cambia, pero el punto se sigue leyendo.'], ['aurelio', 'Mire la forma y el tamaño juntos, no solo el color.', 'pensativo']],
        pistas: ['En esta variedad el color engaña. ¿Cómo está la forma de la cabeza?', 'Mida con la regla. ¿Cuál anda por los 5 centímetros?'],
        solucion: 'Le marco la que está en punto. En otra variedad, la forma y el tamaño ayudan mucho.',
        exito: '¡Bien leído! Ya vio que el criterio cambia un poco con la variedad.' },
      { id: 'ronda', titulo: 'Ronda en la cama', dificultad: 3, modo: 'varias', rosas: [{ punto: 1 }, { punto: 2 }, { punto: 3 }, { punto: 2 }, { punto: 2, tallo: 36 }],
        intro: [['aurelio', 'Último reto: una ronda de verdad. Corte solo las que estén listas para viajar.', 'pensativo'], ['aurelio', 'Las demás se dejan en la planta. Si puede, hágalo en menos de un minuto.']],
        ayuda: 'Corta las que estén listas y luego toca Terminar ronda',
        pistas: ['Revise cada una: punto, forma, tamaño y tallo.', 'Ojo: una de las que están en punto tiene el tallo corto.'],
        solucion: 'Le marco las que sí estaban listas para exportar.',
        exito: '¡Ronda limpia! Así trabaja un cortador de confianza.' }
    ],
    repaso: [['aurelio', 'Antes de terminar, mire los casos que no le tocaron. También pasan en la finca.', 'pensativo']],
    seguir: 'Tranquil{o/a}, ya vio la respuesta. Sigamos con el siguiente.',
    fin: [['aurelio', '¡Terminó todos los retos, {nombre}! Mañana seguimos en el invernadero.', 'feliz']]
  },

  /* ---------------- PERSPECTIVAS DE CADA RESULTADO ----------------
     Cómo vive cada caso la rosa, la clienta y la finca.                  */
  perspectivas: {
    titulo: 'Así lo vive cada uno',
    repaso: 'Repaso: este caso no te tocó',
    quien: { rosa: 'La rosa', cliente: 'Camila, la clienta', finca: 'Don Aurelio, la finca' },
    casos: {
      cerrada: { ok: false, titulo: 'Cortada muy cerrada', rosa: 'Me cortaron antes de tiempo. En el viaje no tuve fuerzas para abrir.', cliente: 'No abrieron en el florero. Así no las puedo vender.', finca: 'Se pierde el pedido y la confianza de la clienta.' },
      ideal: { ok: true, titulo: 'Cortada en su punto', rosa: 'Me fui abriendo despacio y llegué perfecta.', cliente: '¡Hermosas! Le vuelvo a pedir a esa finca.', finca: 'Pedido cumplido. La clienta vuelve.' },
      abierta: { ok: false, titulo: 'Cortada muy abierta', rosa: 'Salí ya abierta y el viaje me maltrató.', cliente: 'Pétalos golpeados. Tengo que rechazarlas.', finca: 'La flor pierde su valor y se pierde la venta.' },
      demas: { ok: false, titulo: 'Esperó de más', rosa: 'Ya estaba lista, pero me dejaron un día más y me pasé.', cliente: 'Vienen muy abiertas, no aguantan en un ramo.', finca: 'Esperar tiene límite: un día de más cuesta la venta.' },
      tallo: { ok: false, titulo: 'Tallo muy corto', rosa: 'Mi cabeza estaba lista, pero mi tallo no alcanzaba.', cliente: 'Necesito tallos largos para mis arreglos.', finca: 'No cumple el mínimo de 40 cm. No sirve para este pedido.' },
      olvido: { ok: false, titulo: 'Se quedó sin cortar', rosa: 'Estaba lista y nadie me cortó. Mañana ya seré copa.', cliente: 'Me llegaron menos rosas de las que pedí.', finca: 'Una rosa en punto que no se corta hoy, mañana se pierde.' }
    },
    orden: ['cerrada', 'ideal', 'abierta', 'demas', 'tallo', 'olvido'],
    nota: 'Caso visto: {caso}.'
  },

  /* ---------------- RECOMPENSAS ----------------
     Puntos ("pétalos"), niveles e insignias. Cambie valores y nombres.   */
  recompensas: {
    unidad: 'pétalos', titulo: 'Mis logros', nivel: 'Nivel',
    faltan: 'Te faltan {n} pétalos para {nivel}', maximo: '¡Llegaste al nivel más alto!',
    nuevaInsignia: '¡Insignia nueva!', nuevoNivel: '¡Subiste de nivel!', bloqueada: 'Por desbloquear',
    insigniasTitulo: 'Insignias',
    puntos: { ideal: 100, primera: 50, aprender: 20, regla: 10, vistas: 10, esperaBien: 30, perspectiva: 15, ronda: 80, rapido: 40, reto: 40 },
    motivos: { ideal: 'Corte en punto', primera: 'A la primera', aprender: 'Aprendiste del error', regla: 'Mediste con la regla', vistas: 'Miraste desde varios lados', esperaBien: 'Esperaste a tiempo', perspectiva: 'Nueva perspectiva', ronda: 'Ronda perfecta', rapido: 'Mano rápida', reto: 'Reto superado' },
    niveles: [
      { min: 0, nombre: 'Aprendiz' },
      { min: 300, nombre: 'Cortador{/a} en práctica' },
      { min: 700, nombre: 'Cortador{/a} de confianza' },
      { min: 1100, nombre: 'Ojo de padrino' }
    ],
    insignias: {
      primer_corte: { nombre: 'Primer corte', desc: 'Hiciste tu primer corte.', icono: 'tijeras' },
      lupa: { nombre: 'Ojo de lupa', desc: 'Mediste la cabeza con la regla.', icono: 'regla' },
      vuelta: { nombre: 'Vuelta completa', desc: 'Miraste una rosa desde las 4 vistas.', icono: 'ojo' },
      paciencia: { nombre: 'Paciencia de campo', desc: 'Esperaste y cortaste en el punto justo.', icono: 'esperar' },
      primera: { nombre: 'Buen ojo', desc: 'Acertaste a la primera.', icono: 'estrella' },
      finales: { nombre: 'Los tres finales', desc: 'Viste la rosa cerrada, en punto y abierta.', icono: 'flor' },
      perspectivas: { nombre: 'Todas las miradas', desc: 'Conociste todas las consecuencias posibles.', icono: 'cuaderno' },
      tallo: { nombre: 'Buena medida', desc: 'Superaste el reto del tallo.', icono: 'regla' },
      variedad: { nombre: 'Ojo de variedad', desc: 'Acertaste con otra variedad.', icono: 'color' },
      ronda: { nombre: 'Ronda perfecta', desc: 'Ronda en la cama sin errores.', icono: 'ok' },
      rapido: { nombre: 'Mano rápida', desc: 'Ronda perfecta en menos de 60 s.', icono: 'reloj' },
      racha: { nombre: 'Racha de 3', desc: 'Tres cortes en punto seguidos.', icono: 'racha' },
      maestro: { nombre: 'Primer día completo', desc: 'Terminaste todos los retos.', icono: 'medalla' }
    }
  },

  /* ---------------- CUADERNO DEL APRENDIZ ---------------- */
  cuaderno: {
    titulo: 'Cuaderno del aprendiz',
    vacio: 'Aquí aparecerá lo que vayas descubriendo.',
    nuevaNota: 'Nueva nota en tu cuaderno',
    herramientas: 'Mis herramientas: tijeras y guantes.',
    tiempo: 'Lo que decido hoy al cortar se ve días después, cuando la rosa llega.',
    tallo: 'El tallo debe medir mínimo 40 cm.',
    meta: 'Un cortador con experiencia corta unos 220 tallos por hora.',
    esperar: 'Esperar también cuenta: la rosa sigue abriendo en la planta.',
    intento: {
      cerrada: 'Intento {n}: corté muy cerrada (punto 0-1). En destino no abrió.',
      ideal: 'Intento {n}: corté en punto 2. Abrió perfecta en destino.',
      abierta: 'Intento {n}: corté ya en copa (punto 3). Llegó maltratada.'
    },
    rasgos: {
      color: 'Color: ya se ve en los pétalos de afuera (los visos).',
      forma: 'Forma: la cabeza se ve cuadrada, recta.',
      tamano: 'Tamaño: la cabeza mide unos 5 cm.',
      juntos: 'Ningún rasgo decide solo: se miran juntos y varían según la variedad.'
    }
  },

  /* ---------------- PANTALLA FINAL ---------------- */
  final: {
    tituloLogro: '¡Primer día superado, {nombre}!',
    mensajeLogro: 'Hoy viste algo que pocos ven: el viaje completo de una rosa. Cada corte tuyo llega a la vida de alguien.',
    tituloSinLogro: 'Buen comienzo, {nombre}',
    mensajeSinLogro: 'Todavía no encontraste el punto ideal, y está bien. Eso es justo lo que vamos a practicar.',
    invitacion: 'Ahora vamos a aprenderlo juntos en el invernadero.',
    comparacionTitulo: 'Así llega cada rosa a {ciudad}',
    comparacion: {
      1: 'Punto 0-1: no abre, se queda dormida',
      2: 'Punto 2: abre perfecta',
      3: 'Punto 3: llega maltratada'
    },
    decisionesTitulo: 'Tus decisiones',
    formadorTitulo: 'Para el formador',
    copiar: 'Copiar resumen',
    copiado: 'Resumen copiado',
    descargar: 'Descargar JSON',
    descargado: 'Archivo listo',
    noCopiado: 'Selecciona el texto de abajo y cópialo',
    jugarOtraVez: 'Jugar otra vez',
    logrosTitulo: 'Tus logros',
    retosTitulo: 'Tus retos',
    perspectivasTitulo: 'Casos que conociste',
    superado: 'superado', noSuperado: 'con ayuda', intentos: 'intentos'
  },

  /* ---------------- INTERFAZ ---------------- */
  ui: {
    comenzar: 'Comenzar',
    quienEres: '¿Quién eres?',
    tuNombre: '¿Cómo te llamas?',
    nombrePlaceholder: 'Escribe tu nombre',
    nombreFalta: 'Escribe tu nombre para que Don Aurelio te salude.',
    empezar: 'Empezar mi primer día',
    continuar: 'Continuar',
    capitulo: 'Capítulo',
    intento: 'Intento',
    pausa: 'Pausa',
    reanudar: 'Reanudar',
    reiniciar: 'Reiniciar desde el inicio',
    sonido: 'Sonido',
    musica: 'Música',
    activado: 'Sí',
    desactivado: 'No',
    tamanoTexto: 'Tamaño del texto',
    textoAnimado: 'Texto letra por letra',
    verCuaderno: 'Ver cuaderno',
    terminar: 'Terminar y ver resumen',
    cerrar: 'Cerrar',
    duracion: 'Duración: 10 a 15 minutos',
    misLogros: 'Mis logros',
    tallo: 'Largo del tallo'
  }
};

/* =====================================================================
   ARTE — todo se dibuja con SVG generado por código (sin imágenes)
   ===================================================================== */
const ART = (() => {
  const TAU = Math.PI * 2;
  let _id = 0;
  const uid = p => `${p}${++_id}`;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const n1 = v => Math.round(v * 10) / 10;
  function rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function mix(a, b, t) {
    t = clamp(t, 0, 1); const A = rgb(a), B = rgb(b);
    return '#' + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, '0')).join('');
  }
  function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647, (s - 1) / 2147483646); }

  /* -------------------------------------------------------------------
     LA ROSA
     Apertura "o":  0 = botón cerrado (punto 0-1) · 0.5 = punto 2
                    1 = punto 3 (copa) · 1.8 = completamente abierta
     Escala del dibujo: 12 px = 1 cm (la regla de la lupa usa esta escala)
     ------------------------------------------------------------------- */
  const CM = 12;
  const PUNTO_O = { 1: 0.05, 2: 0.5, 3: 1.0 };
  /* Paletas por variedad (agregue más aquí) */
  const VARIEDADES = {
    roja: { f: '#D8304A', fb: '#B3122E', s: '#A9142D', sb: '#8E0E25', b: '#7E0C20', bb: '#690B1C', lip: '#E25563', ink: '#6A0A1B', deep: '#4F0613', hi: '#F58A96', te: '#E04B5A' },
    durazno: { f: '#F5A882', fb: '#E8906A', s: '#E0916C', sb: '#CC7A55', b: '#B86A4C', bb: '#A05A40', lip: '#FAD0B6', ink: '#8A4A33', deep: '#7A3A26', hi: '#FFE0CC', te: '#F8CBB0' }
  };
  let PR = VARIEDADES.roja;
  const KEYS = [
    { o: 0.0, H: 47, lean: 0.02, r: 6, w: 24, sq: 0.0, sep: 0.5, green: 0.62, core: 9 },
    { o: 0.5, H: 60, lean: 0.11, r: 9, w: 31, sq: 1.0, sep: 1.85, green: 0.0, core: 12 },
    { o: 1.0, H: 56, lean: 0.62, r: 12, w: 36, sq: 0.45, sep: 2.25, green: 0.0, core: 14 },
    { o: 1.8, H: 40, lean: 1.22, r: 15, w: 41, sq: 0.3, sep: 2.4, green: 0.0, core: 16 }
  ];
  function params(o) {
    o = clamp(o, 0, 1.8); let i = 0;
    while (i < KEYS.length - 2 && o > KEYS[i + 1].o) i++;
    const a = KEYS[i], b = KEYS[i + 1], t = (o - a.o) / (b.o - a.o), out = {};
    for (const k in a) out[k] = lerp(a[k], b[k], t);
    return out;
  }

  function petalD(bx, tx, ty, vw, sq, h) {
    const cx = lerp(bx, tx, 0.55), topW = vw * (0.22 + 0.48 * sq);
    const bulge = vw * 0.85 * (1 - sq) + 3, bw = vw * 0.42;
    return `M${n1(bx - bw)} 0C${n1(bx - vw * 1.05)} ${n1(-h * .12)} ${n1(cx - vw * 1.02)} ${n1(ty * .6)} ${n1(tx - topW)} ${n1(ty)}` +
      `Q${n1(tx)} ${n1(ty - bulge)} ${n1(tx + topW)} ${n1(ty)}C${n1(cx + vw * 1.02)} ${n1(ty * .6)} ${n1(bx + vw * 1.05)} ${n1(-h * .12)} ${n1(bx + bw)} 0Z`;
  }

  function roseDefs(id, P, W) {
    const g = P.green, wilt = c => mix(c, '#5E3A36', W * 0.65);
    const stops = (top, base) => `<stop offset="0" stop-color="${wilt(top)}"/><stop offset=".55" stop-color="${wilt(mix(top, base, .45))}"/><stop offset="1" stop-color="${wilt(base)}"/>`;
    return `<linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1">${stops(PR.f, mix(PR.fb, '#86AE66', g))}</linearGradient>` +
      `<linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1">${stops(PR.s, mix(PR.sb, '#5E8B52', g))}</linearGradient>` +
      `<linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">${stops(PR.b, mix(PR.bb, '#3E6B45', g))}</linearGradient>` +
      `<radialGradient id="${id}t" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="${wilt(PR.ink)}"/><stop offset=".55" stop-color="${wilt(PR.fb)}"/><stop offset="1" stop-color="${wilt(mix(PR.te, '#86AE66', g * .8))}"/></radialGradient>`;
  }

  function sepal(b, ang, len, hugW) {
    const s = Math.sin(b), c = Math.abs(Math.cos(b));
    const dx = s * Math.sin(ang) * len, dy = -Math.cos(ang) * len;
    const bx = s * 7, by = 4, L = Math.hypot(dx, dy) || 1;
    const px = -dy / L, py = dx / L, sw = hugW * (0.45 + 0.55 * c);
    const tx = bx + dx, ty = by + dy, mx = bx + dx * .45, my = by + dy * .45;
    return `M${n1(bx + px * sw)} ${n1(by + py * sw)}Q${n1(mx + px * sw * 1.3)} ${n1(my + py * sw * 1.3)} ${n1(tx)} ${n1(ty)}Q${n1(mx - px * sw * 1.3)} ${n1(my - py * sw * 1.3)} ${n1(bx - px * sw)} ${n1(by - py * sw)}Z`;
  }

  function roseHead(o, yaw, W, D, id) {
    const P = params(o), items = [];
    for (let k = 0; k < 5; k++) {
      if (D > 0.55 && k === 1) continue;           // un pétalo ya se cayó
      items.push({ a: yaw + k * TAU / 5 + 0.3, r: P.r, h: P.H * (.93 + .035 * Math.sin(k * 2.3)), lean: P.lean * (1 + .12 * Math.cos(k * 1.7)), w: P.w, ring: 0 });
    }
    for (let k = 0; k < 3; k++) items.push({ a: yaw + k * TAU / 3 + 1.1, r: P.r * .45, h: P.H * 1.02, lean: P.lean * .45, w: P.w * .78, ring: 1 });
    if (o > 1.0) {
      const op = clamp((o - 1) / .35, 0, 1);
      for (let k = 0; k < 5; k++) {
        if (D > 0.8 && k === 3) continue;
        items.push({ a: yaw + k * TAU / 5 + 0.3 + TAU / 10, r: P.r * 1.12, h: P.H * .88, lean: Math.min(1.45, P.lean * 1.3), w: P.w * 1.02, ring: 2, op });
      }
    }
    items.forEach(it => { it.depth = Math.cos(it.a) * (it.r + it.h * Math.sin(it.lean) * .8 + 2) - (it.ring === 1 ? 1 : 0); });
    items.push({ core: true, depth: 0.2 });
    items.sort((a, b) => a.depth - b.depth);

    const sepW = 2.6 + 3.2 * (1 - clamp((P.sep - .5) / 1.3, 0, 1));
    const sepCol = mix('#3E7346', '#7B7446', W * .6), sepBack = mix('#2B5535', '#5E5A38', W * .6);
    let back = '', front = '';
    for (let k = 0; k < 5; k++) {
      const b = yaw + k * TAU / 5 + 0.3 + TAU / 10, c = Math.cos(b);
      const d = `<path d="${sepal(b, P.sep + W * .25, 30, sepW)}" fill="${c < 0 ? sepBack : sepCol}"/>`;
      if (c < 0) back += d; else front += d;
    }

    let body = '';
    const lipCol = mix(PR.lip, '#7A4A40', W * .6 + D * .35);
    for (const it of items) {
      if (it.core) {
        const ch = P.H * .9, cw = P.core;
        body += `<path d="${petalD(0, 0, -ch, cw / 2, .15, ch)}" fill="url(#${id}s)" stroke="${PR.ink}" stroke-opacity=".4" stroke-width=".6"/>`;
        if (o > 0.55) {
          const k = o - 0.55, yc = -P.H * .86 + k * 10, rx = 5 + k * 8, ry = 2 + k * 3.2;
          body += `<ellipse cx="0" cy="${n1(yc)}" rx="${n1(rx)}" ry="${n1(ry)}" fill="${mix(PR.b, '#4E2A28', W * .6)}"/>` +
            `<path d="M${n1(-rx * .6)} ${n1(yc)}Q0 ${n1(yc - ry * 1.4)} ${n1(rx * .6)} ${n1(yc)}M${n1(-rx * .3)} ${n1(yc + ry * .4)}Q0 ${n1(yc - ry * .5)} ${n1(rx * .35)} ${n1(yc + ry * .2)}" fill="none" stroke="${PR.deep}" stroke-width=".9" stroke-linecap="round"/>`;
        }
        continue;
      }
      const s = Math.sin(it.a), c = Math.cos(it.a);
      const bucket = c > .35 ? 'f' : c > -.35 ? 's' : 'b';
      const bx = s * it.r * .85, tx = bx + s * it.h * Math.sin(it.lean), ty = -it.h * Math.cos(it.lean);
      const vw = it.w / 2 * (.36 + .64 * Math.abs(c));
      const dmgStroke = D > 0 && it.ring !== 1 ? `stroke="${mix(PR.ink, '#5A3A22', D)}" stroke-width="${n1(.7 + D * 1.4)}"` : `stroke="${PR.ink}" stroke-opacity=".45" stroke-width=".7"`;
      body += `<path d="${petalD(bx, tx, ty, vw, P.sq, it.h)}" fill="url(#${id}${bucket})" ${dmgStroke}${it.op !== undefined ? ` opacity="${n1(it.op)}"` : ''}/>`;
      if (bucket === 'f' && W < .5) {
        const tw = vw * (.22 + .48 * P.sq);
        body += `<path d="M${n1(bx - vw * .55)} ${n1(-it.h * .12)}Q${n1(lerp(bx, tx, .5) - vw * .75)} ${n1(ty * .55)} ${n1(tx - tw * .7)} ${n1(ty + 4)}" fill="none" stroke="${PR.hi}" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>`;
      }
      if (it.ring !== 1 && it.lean > .28 && c > -.2) {
        const curl = (it.lean - .28) * 13, topW = vw * (.22 + .6 * P.sq) * 1.15, bulge = vw * .85 * (1 - P.sq) + 1.5;
        body += `<path d="M${n1(tx - topW)} ${n1(ty)}Q${n1(tx)} ${n1(ty + curl * 1.5)} ${n1(tx + topW)} ${n1(ty)}Q${n1(tx)} ${n1(ty - bulge * .6)} ${n1(tx - topW)} ${n1(ty)}Z" fill="${lipCol}"${it.op !== undefined ? ` opacity="${n1(it.op)}"` : ''}/>`;
      }
      if (D > 0.05 && c > 0 && it.ring !== 1) {
        body += `<ellipse cx="${n1(lerp(bx, tx, .6) + vw * .3)}" cy="${n1(ty * .55)}" rx="${n1(2.5 + D * 4)}" ry="${n1(1.8 + D * 3)}" fill="#5A2E22" opacity="${n1(.2 + D * .45)}"/>`;
      }
    }
    const rec = `<ellipse cx="0" cy="6" rx="8.5" ry="7.5" fill="${mix('#4E8A4F', '#7B7446', W * .6)}"/>`;
    return back + body + rec + front;
  }

  function roseTop(o, yaw, W, D, id) {
    const P = params(o);
    const sepCol = mix('#3E7346', '#7B7446', W * .6);
    let s = '';
    const reachS = 8 + 26 * Math.abs(Math.sin(P.sep));
    for (let k = 0; k < 5; k++) {
      const a = (yaw + k * TAU / 5 + .3 + TAU / 10) * 180 / Math.PI;
      s += `<path transform="rotate(${n1(a)})" d="M2 -3Q${n1(reachS * .5)} -5 ${n1(reachS)} 0Q${n1(reachS * .5)} 5 2 3Z" fill="${sepCol}"/>`;
    }
    const ring = (count, off, R, Wd, fill, op = 1, skip = -1) => {
      let r = '';
      for (let k = 0; k < count; k++) {
        if (k === skip) continue;
        const a = (yaw + k * TAU / count + off) * 180 / Math.PI;
        r += `<path transform="rotate(${n1(a)})" d="M${n1(R * .12)} 0C${n1(R * .3)} ${n1(-Wd)} ${n1(R * .95)} ${n1(-Wd * 1.05)} ${n1(R)} 0C${n1(R * .95)} ${n1(Wd * 1.05)} ${n1(R * .3)} ${n1(Wd)} ${n1(R * .12)} 0Z" fill="${fill}" stroke="${PR.ink}" stroke-opacity=".35" stroke-width=".7" opacity="${op}"/>`;
      }
      return r;
    };
    const Rg = P.w * .42 + P.H * .94 * Math.sin(P.lean);
    if (o > 1) s += ring(5, .3 + TAU / 10, Rg * 1.18, Rg * .62, `url(#${id}t)`, n1(clamp((o - 1) / .35, 0, 1)), D > .8 ? 3 : -1);
    s += ring(5, .3, Rg, Rg * .72, `url(#${id}t)`, 1, D > .55 ? 1 : -1);
    const Ri = P.w * .3 + P.H * Math.sin(P.lean * .45);
    s += ring(3, 1.1, Ri, Ri * .8, `url(#${id}f)`);
    const rc = Ri * .42;
    s += `<circle r="${n1(rc)}" fill="${mix(PR.b, '#4E2A28', W * .6)}"/>`;
    let sp = 'M0 0', turns = 2.4;
    for (let i = 1; i <= 40; i++) { const t = i / 40, a = t * turns * TAU + yaw, rr = t * rc * .95; sp += `L${n1(Math.cos(a) * rr)} ${n1(Math.sin(a) * rr)}`; }
    s += `<path d="${sp}" fill="none" stroke="${PR.deep}" stroke-width=".9"/>`;
    if (D > .05) s += `<circle cx="${n1(Rg * .6)}" cy="${n1(Rg * .3)}" r="${n1(2 + D * 4)}" fill="#5A2E22" opacity="${n1(.25 + D * .4)}"/>`;
    return s;
  }

  function leafD() {
    return `<path d="M0 0Q14 -5 30 -15" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
      `<path d="M28 -14C33 -24 46 -27 53 -24C49 -16 39 -10 28 -14Z" fill="currentColor"/>` +
      `<path d="M14 -7C14 -17 22 -23 28 -23C28 -15 22 -9 14 -7Z" fill="currentColor"/>` +
      `<path d="M15 -6C23 -3 29 3 30 9C23 9 16 3 15 -6Z" fill="currentColor"/>` +
      `<path d="M30 -15L50 -23" stroke="#24452B" stroke-width=".6" opacity=".6"/>`;
  }
  function roseStem(L, yaw, W) {
    const col = mix('#3B6E43', '#7C7A46', W * .6);
    const leaves = [{ y: .3, th: .7 }, { y: .58, th: 3.7 }, { y: .86, th: 2.0 }];
    let back = '', front = '';
    for (const lf of leaves) {
      const y = L * lf.y; if (y < 30) continue;
      const a = lf.th + yaw, s = Math.sin(a), c = Math.cos(a);
      const fx = Math.max(.28, Math.abs(s)) * (s >= 0 ? 1 : -1);
      const g = `<g transform="translate(0 ${n1(y)}) scale(${n1(fx * 100) / 100} 1)" color="${c < 0 ? mix('#2F5D3A', '#5E5A38', W * .6) : mix('#4F8A50', '#8A8048', W * .6)}">${leafD()}</g>`;
      if (c < 0) back += g; else front += g;
    }
    let thorns = '';
    [[.18, 1.2], [.42, 4.2], [.7, 2.6]].forEach(([fy, th]) => {
      const s = Math.sin(th + yaw); if (Math.abs(s) < .25) return;
      const y = L * fy, d = s > 0 ? 1 : -1;
      thorns += `<path d="M${2.4 * d} ${n1(y - 3)}L${n1(7 * d * Math.abs(s))} ${n1(y + 2)}L${2.4 * d} ${n1(y + 2)}Z" fill="${mix('#7A4A2E', '#6E5A3A', W)}"/>`;
    });
    const stem = `<path d="M0 12C2 ${n1(L * .35)} -2 ${n1(L * .7)} 0 ${L}" fill="none" stroke="${col}" stroke-width="5.5" stroke-linecap="round"/>` +
      `<path d="M-1.3 14C.7 ${n1(L * .35)} -3.3 ${n1(L * .7)} -1.3 ${L - 2}" fill="none" stroke="#8DBB7C" stroke-width="1.3" opacity=".45"/>`;
    return back + stem + thorns + front;
  }

  function fallenPetals(n, y) {
    let s = '';
    const spots = [[-26, 6, 20], [22, 2, -35], [-6, 9, 70], [34, 8, 140]];
    for (let i = 0; i < Math.min(n, 4); i++) {
      const [x, dy, r] = spots[i];
      s += `<path transform="translate(${x} ${y + dy}) rotate(${r})" d="M-7 0C-6 -6 6 -6 7 0C4 3 -4 3 -7 0Z" fill="#8E2A2E" stroke="#5A2E22" stroke-width=".8"/>`;
    }
    return s;
  }

  /** Devuelve {defs, g} de una rosa. opciones: o, yaw, wilt, damage, stem, top, fallen */
  function rose(opt = {}) {
    const id = uid('r'), o = opt.o ?? .5, yaw = opt.yaw ?? 0, W = opt.wilt || 0, D = opt.damage || 0, L = opt.stem || 0;
    const P = params(o);
    PR = VARIEDADES[opt.variedad] || VARIEDADES.roja;
    let g = '';
    if (opt.top) {
      g = `<g transform="translate(0 ${opt.topY ?? -24}) scale(${opt.topScale ?? 1.25})">${roseTop(o, yaw, W, D, id)}</g>`;
    } else {
      if (L > 0) g += roseStem(L, yaw, W);
      g += `<g transform="rotate(${n1(W * 72)} 0 14)">${roseHead(o, yaw, W, D, id)}</g>`;
      if (opt.fallen) g += fallenPetals(opt.fallen, L - 4);
    }
    return { defs: roseDefs(id, P, W), g };
  }
  function roseSVG(opt, viewBox, extra = '', cls = '') {
    const r = rose(opt);
    return `<svg class="${cls}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${r.defs}</defs>${r.g}${extra}</svg>`;
  }
  function ruler(x = 40) {
    let s = `<g class="regla"><rect x="${x - 2}" y="${-6.4 * CM}" width="15" height="${6.4 * CM + 4}" rx="2" fill="#FFF8EC" stroke="#4A4440" stroke-width=".8" opacity=".95"/>`;
    for (let i = 0; i <= 12; i++) {
      const y = -i * CM / 2, big = i % 2 === 0;
      s += `<line x1="${x - 2}" x2="${x + (big ? 6 : 3.5)}" y1="${y}" y2="${y}" stroke="#4A4440" stroke-width="${big ? .9 : .6}"/>`;
      if (big && i > 0) s += `<text x="${x + 7.5}" y="${y + 2.4}" font-size="6.5" font-weight="800" fill="#4A4440" font-family="Nunito, system-ui, sans-serif">${i / 2}</text>`;
    }
    s += `<text x="${x + 5.5}" y="${-6.4 * CM - 3}" font-size="6.5" font-weight="800" fill="#4A4440" text-anchor="middle" font-family="Nunito, system-ui, sans-serif">cm</text>`;
    s += `<line x1="-30" x2="${x - 2}" y1="0" y2="0" stroke="#4A4440" stroke-width=".6" stroke-dasharray="2 2" opacity=".6"/></g>`;
    return s;
  }

  /* -------------------------------------------------------------------
     PERSONAJES (lienzo 200 × 440, pies en y = 432)
     ------------------------------------------------------------------- */
  const CHARS = {
    aurelio: { skin: '#A56B48', sh: '#87533A', hair: '#E9E4DA', style: 'corto', bigote: true, arrugas: true, sombrero: true, hatC: '#6B4A2F', band: '#2F5D3A', shirt: '#E8DCC4', apron: '#2F5D3A', pants: '#3E4756', feet: 'botas', gloves: '#D3BE7E' },
    ella: { skin: '#C38A62', sh: '#A8714C', hair: '#2A1C15', style: 'trenza', gorra: true, hatC: '#B3122E', shirt: '#F3ECE0', apron: '#6E9E5B', pants: '#3E4756', feet: 'botas', gloves: '#D3BE7E' },
    el: { skin: '#8C5A3C', sh: '#724631', hair: '#1D1511', style: 'corto', gorra: true, hatC: '#2F5D3A', shirt: '#C9BCE0', apron: '#6E9E5B', pants: '#3E4756', feet: 'botas', gloves: '#D3BE7E' },
    camila: { skin: '#B57D56', sh: '#9A6644', hair: '#3A2216', style: 'rizos', shirt: '#F7F1E8', apron: '#8C76B5', pants: '#4A4440', feet: 'zapatos', aretes: true },
    ernesto: { skin: '#D4A783', sh: '#B88B68', hair: '#D8D4CC', style: 'calvo', gafas: true, bigote: true, arrugas: true, shirt: '#F3ECE0', jacket: '#3D5A78', pants: '#4A4440', feet: 'zapatos' },
    marta: { skin: '#C99470', sh: '#AD7A58', hair: '#D2CDC5', style: 'mono', arrugas: true, gafas: false, shirt: '#E04B5A', pants: '#4A4440', feet: 'zapatos', aretes: true, falda: '#7E2A3A' }
  };
  const PORTRAIT_VB = { aurelio: '42 22 116 116', ella: '48 30 106 106', el: '48 30 106 106', camila: '46 30 108 108', ernesto: '50 36 100 100', marta: '48 30 104 104' };

  function mouth(m) {
    const ink = '#6B2E2A';
    switch (m) {
      case 'feliz': return `<path d="M89 114Q100 128 111 114Q100 119 89 114Z" fill="#7A2E2A"/>`;
      case 'sorpresa': return `<ellipse cx="100" cy="119" rx="4.5" ry="5.5" fill="#7A2E2A"/>`;
      case 'triste': return `<path d="M91 122Q100 113 109 122" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
      case 'pensativo': return `<path d="M93 119Q101 117 108 115" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
      default: return `<path d="M92 117Q100 122 108 117" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
    }
  }
  function brows(m, col) {
    const L = { feliz: 'M81 83Q88 78 95 82', sorpresa: 'M81 79Q88 73 95 78', triste: 'M81 84Q88 83 95 79', pensativo: 'M81 82Q88 80 95 83', neutral: 'M81 83Q88 80 95 83' }[m] || 'M81 83Q88 80 95 83';
    const R = { feliz: 'M105 82Q112 78 119 83', sorpresa: 'M105 78Q112 73 119 79', triste: 'M105 79Q112 83 119 84', pensativo: 'M105 80Q112 76 119 80', neutral: 'M105 83Q112 80 119 83' }[m] || 'M105 83Q112 80 119 83';
    return `<path d="${L}M${R.slice(1)}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
  }
  function tijeras(x, y, rot = -30) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0L26 -4M0 0L26 4" stroke="#8C949C" stroke-width="3.2" stroke-linecap="round"/><circle cx="-7" cy="-5" r="5.5" fill="none" stroke="#B3122E" stroke-width="3.4"/><circle cx="-7" cy="6" r="5.5" fill="none" stroke="#B3122E" stroke-width="3.4"/></g>`;
  }

  /** Dibuja un personaje. opt: mood, pose ('normal'|'saludo'|'ofrece'), prop ('tijeras'|'rosa'), roseOpt */
  function figure(key, opt = {}) {
    const C = CHARS[key] || CHARS.ella, mood = opt.mood || 'neutral', pose = opt.pose || 'normal';
    let s = `<ellipse cx="100" cy="434" rx="54" ry="7" fill="#1A1410" opacity=".16"/>`;
    // piernas y calzado
    if (C.falda) s += `<path d="M64 286L136 286L146 372Q100 382 54 372Z" fill="${C.falda}"/><rect x="80" y="368" width="14" height="52" rx="6" fill="${C.skin}"/><rect x="106" y="368" width="14" height="52" rx="6" fill="${C.skin}"/>`;
    else s += `<rect x="72" y="282" width="27" height="128" rx="11" fill="${C.pants}"/><rect x="101" y="282" width="27" height="128" rx="11" fill="${C.pants}"/>`;
    if (C.feet === 'botas') s += `<rect x="67" y="372" width="33" height="60" rx="8" fill="#EDEBE4"/><rect x="100" y="372" width="33" height="60" rx="8" fill="#EDEBE4"/><rect x="67" y="372" width="33" height="7" rx="3" fill="#D6D2C8"/><rect x="100" y="372" width="33" height="7" rx="3" fill="#D6D2C8"/>`;
    else s += `<path d="M66 420Q66 412 80 412L97 412L97 432L66 432Z" fill="#2E2622"/><path d="M134 420Q134 412 120 412L103 412L103 432L134 432Z" fill="#2E2622"/>`;
    // brazo trasero (izquierdo)
    const armCol = C.jacket || C.shirt, hand = C.gloves || C.skin;
    s += `<path d="M70 160Q52 208 58 262" fill="none" stroke="${armCol}" stroke-width="22" stroke-linecap="round"/><circle cx="58" cy="266" r="11" fill="${hand}"/>`;
    // torso
    s += `<path d="M62 168Q60 150 80 144L120 144Q140 150 138 168L142 294Q100 304 58 294Z" fill="${C.shirt}"/>`;
    if (C.jacket) s += `<path d="M62 168Q60 150 80 144L94 144L92 300Q74 300 58 294Z" fill="${C.jacket}"/><path d="M138 168Q140 150 120 144L106 144L108 300Q126 300 142 294Z" fill="${C.jacket}"/><path d="M94 144L100 170L106 144" fill="#fff" opacity=".9"/>`;
    if (C.apron) s += `<path d="M76 176L124 176L134 320Q100 328 66 320Z" fill="${C.apron}"/><path d="M79 178L88 146M121 178L112 146" stroke="${C.apron}" stroke-width="4"/><rect x="86" y="236" width="28" height="22" rx="4" fill="#000" opacity=".12"/>`;
    // cuello y cabeza
    s += `<rect x="90" y="118" width="20" height="32" rx="8" fill="${C.sh}"/>`;
    if (C.style === 'trenza') s += `<g fill="${C.hair}">${[0, 1, 2, 3, 4].map(i => `<ellipse cx="${126 + i * 1.5}" cy="${118 + i * 17}" rx="8" ry="10"/>`).join('')}</g>`;
    if (C.style === 'rizos') s += `<g fill="${C.hair}">${[[66, 86, 16], [134, 86, 16], [70, 112, 14], [130, 112, 14], [74, 132, 11], [126, 132, 11]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
    s += `<ellipse cx="69" cy="97" rx="5.5" ry="8" fill="${C.sh}"/><ellipse cx="131" cy="97" rx="5.5" ry="8" fill="${C.sh}"/>`;
    s += `<ellipse cx="100" cy="93" rx="31" ry="35" fill="${C.skin}"/>`;
    if (C.aretes) s += `<circle cx="69" cy="108" r="2.6" fill="#E0B44A"/><circle cx="131" cy="108" r="2.6" fill="#E0B44A"/>`;
    // pelo
    if (!C.sombrero && !C.gorra) {
      if (C.style === 'rizos') s += `<g fill="${C.hair}">${[[78, 64, 15], [96, 56, 16], [116, 60, 15], [130, 72, 12], [70, 76, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
      else if (C.style === 'calvo') s += `<path d="M69 96Q66 80 74 72L77 92Z M131 96Q134 80 126 72L123 92Z" fill="${C.hair}"/>`;
      else if (C.style === 'mono') s += `<circle cx="100" cy="52" r="13" fill="${C.hair}"/><path d="M69 92Q66 58 100 56Q134 58 131 92Q124 70 100 68Q78 70 69 92Z" fill="${C.hair}"/>`;
      else s += `<path d="M69 92Q66 56 100 55Q134 56 131 92Q125 70 100 67Q80 69 69 92Z" fill="${C.hair}"/>`;
    } else {
      s += `<path d="M69 98Q68 86 72 80L76 96Z M131 98Q132 86 128 80L124 96Z" fill="${C.hair}"/>`;
    }
    // cara
    s += `<circle cx="84" cy="108" r="6" fill="#E04B5A" opacity=".16"/><circle cx="116" cy="108" r="6" fill="#E04B5A" opacity=".16"/>`;
    s += `<g class="ojos"><ellipse cx="88" cy="96" rx="3.4" ry="4.3" fill="#2A1E1A"/><ellipse cx="112" cy="96" rx="3.4" ry="4.3" fill="#2A1E1A"/><circle cx="89.2" cy="94.6" r="1.1" fill="#fff"/><circle cx="113.2" cy="94.6" r="1.1" fill="#fff"/></g>`;
    s += brows(mood, C.style === 'calvo' || C.arrugas ? '#9A928A' : C.hair);
    s += `<path d="M100 99Q104.5 107 99 109.5" fill="none" stroke="${C.sh}" stroke-width="2.2" stroke-linecap="round"/>`;
    if (C.arrugas) s += `<path d="M76 92L72 90M76 97L72 98M124 92L128 90M124 97L128 98M90 74Q100 71 110 74" stroke="${C.sh}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8"/>`;
    s += mouth(mood);
    if (C.bigote) s += `<path d="M88 112Q94 106 100 110Q106 106 112 112Q106 115 100 112.5Q94 115 88 112Z" fill="${C.hair}"/>`;
    if (C.gafas) s += `<g fill="none" stroke="#4A4440" stroke-width="1.8"><circle cx="88" cy="96" r="8"/><circle cx="112" cy="96" r="8"/><path d="M96 96L104 96"/></g>`;
    // sombreros
    if (C.sombrero) s += `<ellipse cx="100" cy="68" rx="54" ry="10.5" fill="${C.hatC}"/><path d="M73 66Q73 35 100 33Q127 35 127 66Z" fill="${mix(C.hatC, '#000', .08)}"/><rect x="73.5" y="55" width="53" height="8" fill="${C.band}"/><ellipse cx="100" cy="67" rx="54" ry="10.5" fill="none" stroke="#000" stroke-opacity=".12"/>`;
    if (C.gorra) s += `<path d="M68 80Q67 46 100 44Q133 46 132 80Z" fill="${C.hatC}"/><path d="M98 76Q138 70 152 81Q130 87 98 82Z" fill="${mix(C.hatC, '#000', .18)}"/><circle cx="100" cy="45" r="3" fill="${mix(C.hatC, '#000', .25)}"/>`;
    // brazo delantero (derecho) y utilería
    let hx = 142, hy = 266, arm = 'M130 160Q148 208 142 262';
    if (pose === 'saludo') { arm = 'M130 160Q164 128 158 88'; hx = 158; hy = 84; }
    if (pose === 'ofrece') { arm = 'M130 160Q150 205 172 226'; hx = 175; hy = 228; }
    s += `<path d="${arm}" fill="none" stroke="${armCol}" stroke-width="22" stroke-linecap="round"/>`;
    if (opt.prop === 'rosa') {
      const r = rose(Object.assign({ o: .9, yaw: .4, stem: 70 }, opt.roseOpt || {}));
      s += `<defs>${r.defs}</defs><g transform="translate(${hx + 2} ${hy - 58}) scale(.82)">${r.g}</g>`;
    }
    s += `<circle cx="${hx}" cy="${hy}" r="11" fill="${hand}"/>`;
    if (opt.prop === 'tijeras') s += tijeras(hx + 6, hy + 4);
    return s;
  }
  function portrait(key, mood) {
    if (key === 'rosa') return `<svg viewBox="-34 -70 68 68" aria-hidden="true">${(() => { const r = rose({ o: .62, yaw: .5 }); return `<defs>${r.defs}</defs>${r.g}`; })()}</svg>`;
    if (!CHARS[key]) return '';
    return `<svg viewBox="${PORTRAIT_VB[key]}" aria-hidden="true"><g class="fig-inner">${figure(key, { mood })}</g></svg>`;
  }

  /* -------------------------------------------------------------------
     FONDOS (lienzo 1600 × 1000; se recortan con "slice")
     ------------------------------------------------------------------- */
  function ridge(ys, base, fill, attrs = '') {
    const n = ys.length, step = 1800 / (n - 1), P = ys.map((y, i) => [-100 + i * step, y]);
    let d = `M-100 ${base}L${P[0][0]} ${P[0][1]}`;
    for (let i = 1; i < n - 1; i++) d += `Q${P[i][0]} ${P[i][1]} ${(P[i][0] + P[i + 1][0]) / 2} ${(P[i][1] + P[i + 1][1]) / 2}`;
    return `<path d="${d}L${P[n - 1][0]} ${P[n - 1][1]}L1700 ${base}Z" fill="${fill}" ${attrs}/>`;
  }
  function eucalipto(x, y, h, col) {
    return `<g><rect x="${x - 3}" y="${y - h * .55}" width="6" height="${h * .55}" fill="#5B4B3E"/>` +
      `<ellipse cx="${x}" cy="${y - h * .7}" rx="${h * .16}" ry="${h * .3}" fill="${col}"/><ellipse cx="${x - h * .1}" cy="${y - h * .52}" rx="${h * .12}" ry="${h * .18}" fill="${col}"/><ellipse cx="${x + h * .11}" cy="${y - h * .58}" rx="${h * .12}" ry="${h * .2}" fill="${mix(col, '#000', .08)}"/></g>`;
  }
  function invernaderos(x0, y, n, w, h, op) {
    let s = `<g opacity="${op}"><rect x="${x0}" y="${y - h * .5}" width="${n * w}" height="${h * .5}" fill="#EEF2EA" opacity=".65"/>`;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * w;
      s += `<path d="M${x} ${y - h * .5}Q${x + w / 2} ${y - h * 1.08} ${x + w} ${y - h * .5}Z" fill="#F6F8F3" opacity=".85" stroke="#C8D2C4" stroke-width="1.5"/>`;
      s += `<line x1="${x}" y1="${y - h * .5}" x2="${x}" y2="${y}" stroke="#C8D2C4" stroke-width="1.2"/>`;
    }
    return s + `<rect x="${x0}" y="${y - 3}" width="${n * w}" height="4" fill="#9FB398" opacity=".7"/></g>`;
  }
  function nubes(cls = 'nube') {
    return `<g class="${cls}" fill="#fff">` + [[200, 180, 1], [700, 120, .8], [1250, 210, 1.1], [1500, 110, .7]].map(([x, y, s]) =>
      `<g transform="translate(${x} ${y}) scale(${s})" opacity=".55"><ellipse cx="0" cy="0" rx="90" ry="24"/><ellipse cx="-40" cy="-14" rx="44" ry="22"/><ellipse cx="34" cy="-18" rx="52" ry="28"/></g>`).join('') + `</g>`;
  }
  const svgWrap = (inner, cls = '') => `<svg class="bg-svg ${cls}" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

  function bgAmanecer() {
    const id = uid('a');
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9A6D3"/><stop offset=".5" stop-color="#E9B9AE"/><stop offset=".68" stop-color="#F6C59F"/><stop offset="1" stop-color="#FBE6CF"/></linearGradient>` +
      `<radialGradient id="${id}s"><stop offset="0" stop-color="#FFF2DC" stop-opacity=".95"/><stop offset=".25" stop-color="#FFE3BC" stop-opacity=".6"/><stop offset="1" stop-color="#FFE3BC" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#FFF4E8" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/><circle cx="1120" cy="585" r="320" fill="url(#${id}s)" class="sol"/><circle cx="1120" cy="585" r="52" fill="#FFF3DF"/>`;
    s += nubes();
    s += `<g class="px1">${ridge([560, 500, 455, 482, 430, 470, 505, 462, 490, 520], 1000, '#A396C3')}</g>`;
    s += `<g class="px2">${ridge([620, 585, 600, 566, 586, 612, 580, 600, 622], 1000, '#93A88F')}</g>`;
    s += `<rect y="560" width="1600" height="170" fill="url(#${id}m)"/>`;
    s += `<g class="px3">${ridge([700, 682, 690, 672, 684, 698, 678, 690, 706], 1000, '#6E9E5B')}`;
    [[90, 690, 150], [150, 694, 120], [470, 682, 170], [530, 686, 130], [1350, 684, 160], [1420, 690, 125], [1520, 694, 140]].forEach(([x, y, h]) => s += eucalipto(x, y, h, '#4E7656'));
    s += invernaderos(180, 742, 7, 64, 62, .95) + invernaderos(760, 744, 9, 62, 60, .95) + `</g>`;
    s += ridge([790, 772, 785, 770, 780, 795, 776, 788], 1000, '#2F5D3A');
    const R = rng(7);
    s += `<g opacity=".55">`; for (let i = 0; i < 9; i++) s += `<path d="M${-100 + i * 220} 1000L${800 + (i - 4) * 40} 800" stroke="#24492E" stroke-width="10"/>`; s += `</g>`;
    s += `<g class="sway-grupo">`; for (let i = 0; i < 26; i++) { const x = R() * 1600, y = 880 + R() * 120; s += `<path class="sway" d="M${n1(x)} ${n1(y)}q-8 -28 4 -46q8 22 -4 46z" fill="#3E7346"/>`; } s += `</g>`;
    return svgWrap(s, 'bg-amanecer');
  }

  function bgInvernadero() {
    const id = uid('i'), R = rng(11);
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F1E4"/><stop offset=".45" stop-color="#E6EEDC"/><stop offset="1" stop-color="#D8E2CE"/></linearGradient>` +
      `<linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6DF" stop-opacity=".7"/><stop offset="1" stop-color="#FFF6DF" stop-opacity="0"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/>`;
    for (let i = -1; i < 5; i++) { const x = i * 400; s += `<path d="M${x} 300Q${x + 200} 40 ${x + 400} 300" fill="#FBFCF6" opacity=".7" stroke="#D2DBCB" stroke-width="5"/><path d="M${x + 100} 230Q${x + 200} 120 ${x + 300} 230" fill="none" stroke="#DCE3D4" stroke-width="2"/>`; }
    s += `<rect y="296" width="1600" height="8" fill="#CFC5B5"/>`;
    s += `<g class="rayos"><path d="M300 0L520 0L900 1000L520 1000Z" fill="url(#${id}r)"/><path d="M900 0L1040 0L1360 1000L1100 1000Z" fill="url(#${id}r)" opacity=".7"/></g>`;
    [160, 560, 1040, 1440].forEach(x => s += `<rect x="${x}" y="300" width="9" height="${520}" fill="#CBBFAE"/>`);
    const vx = 800, vy = 470;
    s += `<path d="M0 ${vy}L1600 ${vy}L1600 1000L0 1000Z" fill="#B9A285"/>`;
    for (let k = -3; k <= 3; k++) {
      if (k === 0) continue;
      const xc = vx + k * 430, x0 = xc - 150, x1 = xc + 150, h0 = vx + (x0 - vx) * .06, h1 = vx + (x1 - vx) * .06;
      s += `<path d="M${h0} ${vy}L${h1} ${vy}L${x1} 1000L${x0} 1000Z" fill="#5E8F50"/><path d="M${h0} ${vy}L${h1} ${vy}L${lerp(h1, x1, .2)} ${vy - 10 + .2 * (1000 - vy)}L${lerp(h0, x0, .2)} ${vy - 10 + .2 * (1000 - vy)}Z" fill="#6E9E5B" opacity=".6"/>`;
      for (let j = 0; j < 22; j++) {
        const t = Math.pow(R(), 1.6), y = vy + t * (1000 - vy) - 6 - 40 * t, xl = lerp(h0, x0, t), xr = lerp(h1, x1, t), x = lerp(xl, xr, R());
        s += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(1.5 + t * 9)}" fill="${R() > .5 ? '#B3122E' : '#C8263E'}"/>`;
      }
    }
    s += `<path d="M${vx - 9} ${vy}L${vx + 9} ${vy}L${vx + 120} 1000L${vx - 120} 1000Z" fill="#C7B293"/>`;
    s += `<g class="walk-layer">`;
    for (let i = 0; i < 40; i++) { const x = i * 80 - 40 + R() * 30, y = 920 + R() * 60; s += `<g class="sway"><path d="M${n1(x)} 1000Q${n1(x + 6)} ${n1(y - 40)} ${n1(x)} ${n1(y - 90)}" stroke="#2F5D3A" stroke-width="5" fill="none"/><ellipse cx="${n1(x - 14)}" cy="${n1(y - 40)}" rx="18" ry="8" fill="#4F8A50" transform="rotate(-25 ${n1(x - 14)} ${n1(y - 40)})"/><ellipse cx="${n1(x + 14)}" cy="${n1(y - 60)}" rx="16" ry="7" fill="#3E7346" transform="rotate(25 ${n1(x + 14)} ${n1(y - 60)})"/><ellipse cx="${n1(x)}" cy="${n1(y - 96)}" rx="6" ry="10" fill="#B3122E"/></g>`; }
    s += `</g>`;
    return svgWrap(s, 'bg-invernadero');
  }

  function bgPoscosecha(variant) {
    const id = uid('p'), R = rng(23);
    let s = `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFE6D7"/><stop offset="1" stop-color="#E2D5C2"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}w)"/><rect y="700" width="1600" height="300" fill="#CDBBA6"/>`;
    [220, 640, 1060].forEach(x => s += `<rect x="${x}" y="150" width="320" height="300" rx="10" fill="#F9F3E6" stroke="#CFC1AE" stroke-width="8"/><line x1="${x + 160}" y1="150" x2="${x + 160}" y2="450" stroke="#CFC1AE" stroke-width="6"/><rect x="${x + 12}" y="162" width="140" height="276" fill="#DDEBD5" opacity=".55"/>`);
    [400, 820, 1240].forEach(x => s += `<line x1="${x}" y1="0" x2="${x}" y2="70" stroke="#8A7F74" stroke-width="3"/><path d="M${x - 40} 70L${x + 40} 70L${x + 26} 92L${x - 26} 92Z" fill="#4A4440"/><ellipse cx="${x}" cy="96" rx="34" ry="8" fill="#FFF3D6" opacity=".9"/>`);
    if (variant !== 'hidratacion') {
      s += `<rect x="120" y="610" width="1360" height="34" rx="6" fill="#9C7B5E"/><rect x="160" y="644" width="18" height="140" fill="#7F634B"/><rect x="1420" y="644" width="18" height="140" fill="#7F634B"/>`;
      for (let i = 0; i < 9; i++) { const x = 220 + i * 140; s += `<g>`; for (let j = 0; j < 6; j++) s += `<line x1="${x - 40 + j * 4}" y1="${612}" x2="${x + 30 + j * 4}" y2="${590}" stroke="#3B6E43" stroke-width="3"/>`; s += `<circle cx="${x + 44}" cy="588" r="9" fill="#B3122E"/><circle cx="${x + 36}" cy="596" r="8" fill="#C8263E"/></g>`; }
    }
    const n = variant === 'hidratacion' ? 7 : 5, sc = variant === 'hidratacion' ? 1.35 : 1;
    for (let i = 0; i < n; i++) {
      const x = 120 + i * (1400 / n) + R() * 30, y = 920;
      s += `<g transform="translate(${n1(x)} ${y}) scale(${sc})">`;
      for (let j = 0; j < 7; j++) { const dx = -36 + j * 12; s += `<path d="M${dx * .5} -60Q${dx} -110 ${dx * 1.3} -150" stroke="#3B6E43" stroke-width="3" fill="none"/><ellipse cx="${dx * 1.3}" cy="-156" rx="6" ry="9" fill="${j % 2 ? '#B3122E' : '#A3102A'}"/>`; }
      s += `<path d="M-48 -70L48 -70L40 0L-40 0Z" fill="#4E7FA6"/><path d="M-48 -70L48 -70L46 -58L-46 -58Z" fill="#6A9BC1"/>${variant === 'hidratacion' ? '<ellipse cx="0" cy="-66" rx="44" ry="5" fill="#BFE0F2" opacity=".9"/>' : ''}</g>`;
    }
    return svgWrap(s, 'bg-poscosecha');
  }

  function bgFrio() {
    const id = uid('f');
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9C2D9"/><stop offset="1" stop-color="#DCE8F1"/></linearGradient><linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".75"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/>`;
    [360, 560, 760].forEach((y, r) => {
      s += `<rect x="0" y="${y}" width="1600" height="14" fill="#7D97AE"/>`;
      for (let i = 0; i < 12; i++) { const x = 40 + i * 135 + (r % 2) * 40; s += `<g transform="translate(${x} ${y})">${[0, 1, 2, 3, 4].map(j => `<line x1="${20 + j * 9}" y1="-40" x2="${18 + j * 10}" y2="-96" stroke="#46705A" stroke-width="3"/><ellipse cx="${18 + j * 10}" cy="-100" rx="5" ry="8" fill="#9C1D33"/>`).join('')}<rect x="6" y="-48" width="64" height="48" rx="5" fill="#5E86A8"/></g>`; }
    });
    s += `<rect x="700" y="40" width="200" height="20" rx="8" fill="#F2F8FC"/><rect x="700" y="60" width="200" height="300" fill="#EAF4FB" opacity=".18"/>`;
    s += `<rect y="760" width="1600" height="240" fill="url(#${id}n)" class="niebla"/>`;
    s += `<g fill="#fff" opacity=".55" class="copos">${[[120, 140], [380, 260], [990, 180], [1300, 300], [1480, 120], [620, 440], [1180, 470]].map(([x, y]) => `<path d="M${x} ${y - 9}L${x} ${y + 9}M${x - 8} ${y - 5}L${x + 8} ${y + 5}M${x - 8} ${y + 5}L${x + 8} ${y - 5}" stroke="#fff" stroke-width="2"/>`).join('')}</g>`;
    return svgWrap(s, 'bg-frio');
  }

  function bgEmpaque() {
    let s = `<rect width="1600" height="1000" fill="#E8DECE"/><rect y="720" width="1600" height="280" fill="#CDB89E"/>`;
    const box = (x, y, w, h) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#C79F74"/><rect x="${x}" y="${y}" width="${w}" height="${h * .16}" fill="#B88E62"/><circle cx="${x + w * .5}" cy="${y + h * .55}" r="${h * .14}" fill="none" stroke="#8C3A3A" stroke-width="3"/><path d="M${x + w * .5} ${y + h * .45}q-6 6 0 12q6 -6 0 -12" fill="#8C3A3A"/></g>`;
    [[80, 520], [80, 340], [300, 520], [300, 340], [1180, 520], [1180, 340], [1400, 520], [1400, 340], [1180, 160]].forEach(([x, y]) => s += box(x, y, 210, 175));
    s += `<rect x="520" y="640" width="560" height="30" rx="6" fill="#9C7B5E"/><rect x="560" y="670" width="16" height="150" fill="#7F634B"/><rect x="1024" y="670" width="16" height="150" fill="#7F634B"/>`;
    s += `<path d="M640 640L960 640L930 560L670 560Z" fill="#C79F74"/><rect x="660" y="600" width="280" height="8" fill="#E8DECE" opacity=".7"/>`;
    return svgWrap(s, 'bg-empaque');
  }

  function bgCamion() {
    const id = uid('c');
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E7DB6"/><stop offset=".6" stop-color="#E9A991"/><stop offset="1" stop-color="#F6C59F"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/><circle cx="300" cy="560" r="44" fill="#FFE7C6"/>`;
    s += ridge([600, 560, 590, 540, 575, 600, 560, 590], 1000, '#7D6E9E');
    s += `<g class="pasa">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => eucalipto(i * 260 + 40, 690, 150, '#4E6B5E')).join('')}${[0, 1, 2, 3, 4, 5, 6, 7].map(i => eucalipto(i * 260 + 1640, 690, 150, '#4E6B5E')).join('')}</g>`;
    s += ridge([700, 690, 700, 686, 696, 704], 1000, '#557A52');
    s += `<rect y="760" width="1600" height="240" fill="#4A4440"/><line class="carril" x1="0" y1="880" x2="1600" y2="880" stroke="#F7F1E8" stroke-width="8" stroke-dasharray="70 60"/>`;
    s += `<g class="camion" transform="translate(560 600)"><rect x="0" y="0" width="360" height="190" rx="8" fill="#F4F2EC"/><rect x="0" y="0" width="360" height="22" rx="6" fill="#DCD8CE"/><text x="180" y="112" text-anchor="middle" font-family="Nunito, system-ui, sans-serif" font-weight="900" font-size="34" fill="#2F5D3A">Flores de Colombia</text><path d="M360 60L440 60L486 120L486 190L360 190Z" fill="#2F5D3A"/><path d="M380 74L436 74L466 116L380 116Z" fill="#BFD7E6"/><g class="rueda"><circle cx="80" cy="200" r="32" fill="#2E2622"/><circle cx="80" cy="200" r="12" fill="#9A928A"/></g><g class="rueda"><circle cx="410" cy="200" r="32" fill="#2E2622"/><circle cx="410" cy="200" r="12" fill="#9A928A"/></g></g>`;
    return svgWrap(s, 'bg-camion');
  }

  function bgAvion() {
    const id = uid('v'), R = rng(5);
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D2A4B"/><stop offset=".6" stop-color="#3D5A8A"/><stop offset="1" stop-color="#7F92BA"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/>`;
    s += `<g fill="#fff">`; for (let i = 0; i < 70; i++) s += `<circle cx="${n1(R() * 1600)}" cy="${n1(R() * 520)}" r="${n1(.8 + R() * 1.8)}" opacity="${n1(.4 + R() * .6)}"/>`; s += `</g>`;
    s += `<circle cx="1300" cy="180" r="46" fill="#F3EEDC"/><circle cx="1318" cy="168" r="42" fill="#2A3A61" opacity=".9"/>`;
    s += `<g class="nubes-pasan" fill="#B8C4DE" opacity=".5">${[0, 1].map(k => [[200, 760], [650, 820], [1100, 740], [1500, 800]].map(([x, y]) => `<g transform="translate(${x + k * 1600} ${y})"><ellipse rx="190" ry="40"/><ellipse cx="-80" cy="-24" rx="90" ry="40"/><ellipse cx="70" cy="-30" rx="110" ry="46"/></g>`).join('')).join('')}</g>`;
    s += `<g class="avion" transform="translate(800 470)"><path d="M-330 0Q-330 -38 -260 -42L260 -42Q350 -40 380 0Q350 40 260 42L-260 42Q-330 38 -330 0Z" fill="#E9ECF2"/><path d="M300 -30Q352 -24 372 -4L300 -4Z" fill="#7F92BA"/><path d="M-260 -42L-330 -150L-280 -150L-180 -42Z" fill="#D6DBE6"/><path d="M-40 10L-200 150L-130 150L80 10Z" fill="#C9CFDC"/><ellipse cx="-110" cy="98" rx="40" ry="14" fill="#AEB6C8"/><path d="M-40 -10L-120 -70L-80 -70L40 -10Z" fill="#C9CFDC" opacity=".8"/><rect x="-200" y="-8" width="380" height="5" fill="#B3122E" opacity=".8"/><circle class="luz" cx="-330" cy="-150" r="5" fill="#E04B5A"/></g>`;
    return svgWrap(s, 'bg-avion');
  }

  function bgMiami() {
    const id = uid('m');
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9A6D3"/><stop offset=".55" stop-color="#F2A98C"/><stop offset="1" stop-color="#F6C59F"/></linearGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/><circle cx="1180" cy="560" r="70" fill="#FFE2B8"/>`;
    const R = rng(31); let x = 0;
    s += `<g fill="#C48A8E" opacity=".85">`; while (x < 1600) { const w = 60 + R() * 90, h = 120 + R() * 300; s += `<rect x="${n1(x)}" y="${n1(680 - h)}" width="${n1(w)}" height="${n1(h)}"/>`; x += w + 6; } s += `</g>`;
    s += `<rect y="680" width="1600" height="320" fill="#6A5A55"/><rect y="680" width="1600" height="40" fill="#8E7A70"/><line x1="0" y1="860" x2="1600" y2="860" stroke="#F7F1E8" stroke-width="6" stroke-dasharray="60 50" opacity=".7"/>`;
    const palma = (px, h) => `<g transform="translate(${px} 690)"><path d="M0 0Q14 ${-h * .5} 6 ${-h}" stroke="#4A3B30" stroke-width="12" fill="none"/>${[-70, -35, 0, 35, 70, 110, -110].map(a => `<path transform="translate(6 ${-h}) rotate(${a})" d="M0 0Q50 -26 110 6Q50 -8 0 0Z" fill="#2F5D3A"/>`).join('')}</g>`;
    s += palma(160, 330) + palma(1420, 360) + palma(1540, 280);
    return svgWrap(s, 'bg-miami');
  }

  function bgTienda() {
    const id = uid('t');
    let s = `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7E3C6"/><stop offset="1" stop-color="#EBC497"/></linearGradient><radialGradient id="${id}l"><stop offset="0" stop-color="#FFE9B8" stop-opacity=".85"/><stop offset="1" stop-color="#FFE9B8" stop-opacity="0"/></radialGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}c)"/>`;
    s += `<rect x="90" y="150" width="420" height="440" rx="14" fill="#F5B89A"/><rect x="90" y="470" width="420" height="120" fill="#8E7A70"/><path d="M200 470Q214 330 206 280" stroke="#4A3B30" stroke-width="8" fill="none"/>${[-70, -30, 10, 50, 100].map(a => `<path transform="translate(206 280) rotate(${a})" d="M0 0Q40 -20 86 4Q40 -6 0 0Z" fill="#2F5D3A"/>`).join('')}<rect x="90" y="150" width="420" height="440" rx="14" fill="none" stroke="#8A5E40" stroke-width="14"/><line x1="300" y1="150" x2="300" y2="590" stroke="#8A5E40" stroke-width="8"/>`;
    [300, 520].forEach(y => s += `<rect x="640" y="${y}" width="900" height="16" rx="4" fill="#9C6B48"/>`);
    const vase = (x, y, c, cols) => `<g transform="translate(${x} ${y})">${cols.map((cc, j) => `<line x1="${-10 + j * 10}" y1="-30" x2="${-18 + j * 18}" y2="-90" stroke="#3B6E43" stroke-width="3"/><circle cx="${-18 + j * 18}" cy="-96" r="13" fill="${cc}"/>`).join('')}<path d="M-26 -34L26 -34L20 0L-20 0Z" fill="${c}"/></g>`;
    const C = ['#E04B5A', '#F6C59F', '#B9A6D3', '#F7F1E8', '#B3122E'];
    for (let i = 0; i < 7; i++) s += vase(700 + i * 125, 300, i % 2 ? '#7C9BB0' : '#D9CBB7', [C[i % 5], C[(i + 2) % 5], C[(i + 3) % 5]]);
    for (let i = 0; i < 7; i++) s += vase(760 + i * 120, 520, i % 2 ? '#D9CBB7' : '#A8C99B', [C[(i + 1) % 5], C[(i + 4) % 5], C[i % 5]]);
    [520, 1000, 1400].forEach(x => s += `<line x1="${x}" y1="0" x2="${x}" y2="90" stroke="#6A5A55" stroke-width="3"/><path d="M${x - 36} 90Q${x} 50 ${x + 36} 90Z" fill="#2F5D3A"/><circle cx="${x}" cy="160" r="160" fill="url(#${id}l)"/>`);
    s += `<rect y="760" width="1600" height="240" fill="#C9966C"/><g opacity=".25">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${i * 200}" y1="760" x2="${i * 200 - 120}" y2="1000" stroke="#7A5638" stroke-width="3"/>`).join('')}</g>`;
    return svgWrap(s, 'bg-tienda');
  }

  function bgCasa() {
    const id = uid('h');
    let s = `<defs><radialGradient id="${id}l" cx=".7" cy=".45" r=".7"><stop offset="0" stop-color="#E8A878"/><stop offset="1" stop-color="#5A3A33"/></radialGradient></defs>`;
    s += `<rect width="1600" height="1000" fill="url(#${id}l)"/>`;
    s += `<rect x="180" y="170" width="360" height="380" rx="10" fill="#2B3A62"/><circle cx="420" cy="280" r="40" fill="#F3EEDC"/><rect x="180" y="170" width="360" height="380" rx="10" fill="none" stroke="#7A5040" stroke-width="16"/><line x1="360" y1="170" x2="360" y2="550" stroke="#7A5040" stroke-width="10"/>`;
    s += `<rect x="1060" y="220" width="210" height="160" rx="6" fill="#F3DFC4" stroke="#8A5E40" stroke-width="12"/><circle cx="1130" cy="290" r="26" fill="#B98C69"/><circle cx="1200" cy="290" r="26" fill="#9A6644"/><path d="M1095 360Q1130 320 1165 360Z M1165 360Q1200 320 1235 360Z" fill="#7E2A3A"/>`;
    s += `<rect y="760" width="1600" height="240" fill="#4A322C"/><circle cx="1400" cy="500" r="220" fill="#FFD9A0" opacity=".18"/>`;
    return svgWrap(s, 'bg-casa');
  }

  const bg = {
    amanecer: bgAmanecer, invernadero: bgInvernadero, poscosecha: () => bgPoscosecha(), hidratacion: () => bgPoscosecha('hidratacion'),
    frio: bgFrio, empaque: bgEmpaque, camion: bgCamion, avion: bgAvion, miami: bgMiami, tienda: bgTienda, casa: bgCasa
  };

  /* -------------------------------------------------------------------
     ÍCONOS de interfaz (no dependemos solo del color)
     ------------------------------------------------------------------- */
  const icon = {
    tijeras: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 8.5L20 18M8.5 15.5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    esperar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    pausa: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor"/></svg>`,
    sonido: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    mudo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    cuaderno: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 3v18M12 8h4M12 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    lupaMas: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 15l5 5M8 10.5h5M10.5 8v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    lupaMenos: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 15l5 5M8 10.5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    regla: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="20" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 6h4M8 10h3M8 14h4M8 18h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    ok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    no: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
    pasos: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="8" cy="8" rx="3" ry="4.5" fill="currentColor"/><ellipse cx="16" cy="15" rx="3" ry="4.5" fill="currentColor"/></svg>`,
    color: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-4 5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6-6-11z" fill="currentColor"/></svg>`,
    forma: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="4 2"/></svg>`,
    nota: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19l1-4L16 5l3 3L9 18z" fill="currentColor"/></svg>`,
    copiar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    bajar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    petalo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C7 7 5 11 5 14a7 7 0 0 0 14 0c0-3-2-7-7-11z" fill="currentColor"/><path d="M12 8v11" stroke="#fff" stroke-width="1.4" opacity=".6"/></svg>`,
    medalla: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h4l1 5-3 2zM17 2h-4l-1 5 3 2z" fill="currentColor" opacity=".7"/><circle cx="12" cy="15" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 11.5l1 2.2 2.3.2-1.8 1.5.6 2.3-2.1-1.3-2.1 1.3.6-2.3-1.8-1.5 2.3-.2z" fill="currentColor"/></svg>`,
    ojo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></svg>`,
    reloj: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l3 2M10 2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    estrella: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="currentColor"/></svg>`,
    candado: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>`,
    flor: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4" fill="currentColor"/><circle cx="8" cy="11.5" r="3.4" fill="currentColor" opacity=".75"/><circle cx="16" cy="11.5" r="3.4" fill="currentColor" opacity=".75"/><circle cx="12" cy="11" r="2" fill="#fff" opacity=".6"/><path d="M12 14v8M12 18l-3-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    racha: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-.5-2-1-3 3 2 4 4 4 7a7 7 0 0 1-14 0c0-6 6-8 8-13z" fill="currentColor"/></svg>`,
    guantes: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 44V24l-4-8c-1-3 3-4 4-2l3 6V8c0-3 4-3 4 0v10V5c0-3 4-3 4 0v13V7c0-3 4-3 4 0v12V11c0-3 4-3 4 0v17c0 9-4 16-10 16z" fill="#D3BE7E" stroke="#8A7440" stroke-width="2"/><rect x="13" y="38" width="20" height="6" rx="2" fill="#2F5D3A"/></svg>`
  };

  return { PUNTO_O, VARIEDADES, CM, rose, roseSVG, ruler, figure, portrait, tijeras, bg, icon, mix, lerp, clamp, CHARS };
})();

/* =====================================================================
   AUDIO — música y efectos generados con Web Audio API (sin archivos)
   El "tiple" usa síntesis de cuerda pulsada (Karplus-Strong).
   ===================================================================== */
const AUDIO = (() => {
  let ctx = null, master, musicBus, sfxBus, ambBus, reverb, noiseBuf;
  let soundOn = true, musicOn = true;
  const cache = new Map();
  const NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
  const nf = n => { const m = n.match(/^([A-G][#b]?)(\d)$/); return 440 * Math.pow(2, (12 * (+m[2] + 1) + NOTE[m[1]] - 69) / 12); };

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = soundOn ? .9 : 0;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3;
    master.connect(comp); comp.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = musicOn ? .55 : 0; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = .9; sfxBus.connect(master);
    ambBus = ctx.createGain(); ambBus.gain.value = .8; ambBus.connect(master);
    // reverberación suave generada
    reverb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.2, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    reverb.buffer = ir;
    const wet = ctx.createGain(); wet.gain.value = .28; reverb.connect(wet); wet.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    setInterval(schedule, 90);
  }

  function pluckBuffer(freq) {
    const key = Math.round(freq * 10);
    if (cache.has(key)) return cache.get(key);
    const sr = ctx.sampleRate, len = Math.floor(sr * 1.7), N = Math.max(2, Math.round(sr / freq));
    const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0), ring = new Float32Array(N);
    for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    for (let i = 1; i < N; i++) ring[i] = ring[i] * .55 + ring[i - 1] * .45;
    const damp = Math.min(.9993, .9962 + freq / 440 * .0016);
    let idx = 0;
    for (let i = 0; i < len; i++) { const nx = (idx + 1) % N, v = ring[idx]; d[i] = v; ring[idx] = damp * .5 * (v + ring[nx]); idx = nx; }
    for (let i = Math.max(0, len - 2000); i < len; i++) d[i] *= (len - i) / 2000;
    cache.set(key, buf);
    return buf;
  }
  function pluck(freq, t, vol = .3, dest = musicBus, pan = 0, send = .5) {
    if (!ctx) return;
    const src = ctx.createBufferSource(); src.buffer = pluckBuffer(freq);
    const g = ctx.createGain(); g.gain.value = vol;
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    src.connect(g);
    if (p) { p.pan.value = pan; g.connect(p); p.connect(dest); } else g.connect(dest);
    if (send > 0) { const s = ctx.createGain(); s.gain.value = send * vol; g.connect(s); s.connect(reverb); }
    src.start(t);
  }
  // rasgueo de tiple: cada nota con su octava (los órdenes del tiple)
  function strum(notes, t, vol = .2, up = false) {
    const list = up ? [...notes].reverse() : notes;
    list.forEach((n, i) => {
      const f = nf(n), tt = t + i * .022;
      pluck(f, tt, vol, musicBus, -.25 + i * .15);
      pluck(f * 2 * 1.002, tt + .004, vol * .35, musicBus, .2 - i * .1, .3);
    });
  }

  /* ---------- Música por ánimo de capítulo ---------- */
  const CH = {
    D: ['D4', 'F#4', 'A4', 'D5'], G: ['D4', 'G4', 'B4', 'D5'], A7: ['C#4', 'G4', 'A4', 'E5'], Bm: ['D4', 'F#4', 'B4', 'D5'], A: ['C#4', 'E4', 'A4', 'E5'],
    Em: ['E4', 'G4', 'B4', 'E5'], C: ['C4', 'E4', 'G4', 'C5'], Am: ['C4', 'E4', 'A4', 'E5'], F: ['C4', 'F4', 'A4', 'C5'], E: ['B3', 'E4', 'G#4', 'B4'], Dm: ['D4', 'F4', 'A4', 'D5']
  };
  const MOODS = {
    finca: { e: .23, prog: ['D', 'G', 'A7', 'D', 'Bm', 'G', 'A7', 'D'], bass: ['D3', 'G2', 'A2', 'D3', 'B2', 'G2', 'A2', 'D3'], pat: 'bambuco', mel: [['A5', 0, 'F#5', 0, 'E5', 'D5'], ['B4', 0, 0, 'D5', 0, 'E5'], ['C#5', 0, 'E5', 0, 'A5', 0], ['F#5', 0, 'E5', 'D5', 0, 0]] },
    decision: { e: .3, prog: ['Em', 'C', 'G', 'D'], bass: ['E3', 'C3', 'G2', 'D3'], pat: 'suave' },
    viaje: { e: .21, prog: ['G', 'D', 'Em', 'C'], bass: ['G2', 'D3', 'E3', 'C3'], pat: 'arpegio', mel: [['B5', 0, 0, 'A5', 0, 0], ['F#5', 0, 0, 'D5', 0, 0], ['G5', 0, 0, 'E5', 0, 0], ['E5', 0, 'D5', 0, 0, 0]] },
    frio: { e: .34, prog: ['Am', 'F', 'C', 'G'], bass: ['A2', 'F2', 'C3', 'G2'], pat: 'arpegio', vol: .6 },
    tienda: { e: .24, prog: ['C', 'Am', 'F', 'G'], bass: ['C3', 'A2', 'F2', 'G2'], pat: 'bambuco', mel: [['E5', 0, 'G5', 0, 'E5', 'D5'], ['C5', 0, 0, 'E5', 0, 0], ['F5', 0, 'A5', 0, 'G5', 'F5'], ['D5', 0, 0, 0, 0, 0]] },
    triste: { e: .36, prog: ['Am', 'Dm', 'E', 'Am'], bass: ['A2', 'D3', 'E3', 'A2'], pat: 'suave', vol: .7 },
    final: { e: .22, prog: ['D', 'A', 'Bm', 'G', 'D', 'A', 'G', 'D'], bass: ['D3', 'A2', 'B2', 'G2', 'D3', 'A2', 'G2', 'D3'], pat: 'bambuco', mel: [['F#5', 0, 'A5', 0, 'B5', 'A5'], ['E5', 0, 0, 'C#5', 0, 'E5'], ['D5', 0, 'F#5', 0, 'B5', 0], ['A5', 0, 'G5', 'F#5', 0, 0]] }
  };
  let mood = null, step = 0, next = 0;
  function playStep(M, st, t) {
    const bar = Math.floor(st / 6) % M.prog.length, e = st % 6, chord = CH[M.prog[bar]], v = M.vol || 1;
    if (e === 0) pluck(nf(M.bass[bar]), t, .42 * v, musicBus, 0, .3);
    if (M.pat === 'bambuco') {
      if (e === 2) strum(chord, t, .15 * v);
      if (e === 3) strum(chord.slice(1), t, .08 * v, true);
      if (e === 5) strum(chord, t, .1 * v);
    } else if (M.pat === 'suave') {
      if (e === 0) pluck(nf(chord[2]), t + .05, .14 * v);
      if (e === 3) strum(chord, t, .09 * v);
    } else {
      const ord = [0, 1, 2, 3, 2, 1];
      pluck(nf(chord[ord[e]]) * (e > 2 ? 2 : 1), t, .12 * v, musicBus, e % 2 ? .3 : -.3);
    }
    if (M.mel && Math.floor(st / (6 * M.mel.length)) % 2 === 1) {
      const n = M.mel[bar % M.mel.length][e];
      if (n) pluck(nf(n), t + .01, .17 * v, musicBus, .15, .7);
    }
  }
  function schedule() {
    if (!ctx || !mood || !musicOn) return;
    const M = MOODS[mood];
    if (next < ctx.currentTime) next = ctx.currentTime + .05;
    while (next < ctx.currentTime + .3) {
      const swing = (step % 2) ? M.e * .08 : 0;
      playStep(M, step, next + swing);
      next += M.e; step++;
    }
  }
  function setMood(name) {
    if (!ctx || name === mood) return;
    const t = ctx.currentTime;
    musicBus.gain.cancelScheduledValues(t);
    musicBus.gain.setValueAtTime(musicBus.gain.value, t);
    musicBus.gain.linearRampToValueAtTime(0, t + .4);
    setTimeout(() => {
      mood = name; step = 0; next = ctx.currentTime + .05;
      const t2 = ctx.currentTime;
      musicBus.gain.cancelScheduledValues(t2);
      musicBus.gain.setValueAtTime(0, t2);
      musicBus.gain.linearRampToValueAtTime(musicOn ? .55 : 0, t2 + .8);
    }, 420);
  }

  /* ---------- Ambientes en bucle ---------- */
  let amb = null;
  function noiseSrc() { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s; }
  function makeAmb(name) {
    const out = ctx.createGain(); out.gain.value = 0; out.connect(ambBus);
    const nodes = [];
    const add = (type, freq, q, vol) => { const n = noiseSrc(), f = ctx.createBiquadFilter(), g = ctx.createGain(); f.type = type; f.frequency.value = freq; f.Q.value = q; g.gain.value = vol; n.connect(f); f.connect(g); g.connect(out); n.start(); nodes.push(n); return { f, g }; };
    const osc = (type, freq, vol, lp) => { const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain(); o.type = type; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = lp; g.gain.value = vol; o.connect(f); f.connect(g); g.connect(out); o.start(); nodes.push(o); return o; };
    if (name === 'viento') {
      const w = add('bandpass', 520, .6, .18);
      const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = .13; lg.gain.value = 260; l.connect(lg); lg.connect(w.f.frequency); l.start(); nodes.push(l);
    } else if (name === 'frio') { add('highpass', 4000, .4, .025); osc('sine', 62, .05, 200); }
    else if (name === 'camion') { add('lowpass', 170, .7, .55); osc('sawtooth', 46, .05, 140); }
    else if (name === 'avion') { add('lowpass', 420, .5, .45); add('bandpass', 1400, 2, .03); }
    else if (name === 'ciudad') { add('bandpass', 900, .3, .05); }
    else if (name === 'sala') { add('lowpass', 300, .5, .06); }
    return { out, nodes };
  }
  function setAmbience(name) {
    if (!ctx) return;
    const t = ctx.currentTime;
    if (amb) { const old = amb; old.out.gain.linearRampToValueAtTime(0, t + .6); setTimeout(() => old.nodes.forEach(n => { try { n.stop(); } catch (e) { } }), 800); amb = null; }
    if (!name) return;
    amb = makeAmb(name);
    amb.out.gain.linearRampToValueAtTime(1, t + 1);
  }

  /* ---------- Efectos ---------- */
  function burst(t, dur, type, freq, vol, q = 1) {
    const n = noiseSrc(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    n.connect(f); f.connect(g); g.connect(sfxBus); n.start(t); n.stop(t + dur + .05);
  }
  function tone(t, freq, dur, vol, type = 'sine', send = .3) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g); g.connect(sfxBus);
    if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s); s.connect(reverb); }
    o.start(t); o.stop(t + dur + .05);
  }
  const SFX = {
    click(t) { pluck(nf('A5'), t, .08, sfxBus, 0, .1); },
    tijera(t) { [0, .11].forEach(d => { burst(t + d, .05, 'highpass', 3500, .5); tone(t + d, 2600, .12, .06, 'triangle', .1); }); },
    paso(t) { burst(t, .09, 'lowpass', 380, .5); tone(t, 85, .1, .12, 'sine', 0); },
    pasos(t) { for (let i = 0; i < 6; i++) SFX.paso(t + i * .38); },
    campanita(t) { [[1318.5, 0], [1760, .16]].forEach(([f, d]) => { tone(t + d, f, 1.4, .12); tone(t + d, f * 2.76, .6, .03); }); },
    exito(t) { ['D5', 'F#5', 'A5', 'D6'].forEach((n, i) => pluck(nf(n), t + i * .09, .25, sfxBus, 0, .6)); },
    error(t) { pluck(nf('A4'), t, .2, sfxBus, 0, .6); pluck(nf('F4'), t + .22, .18, sfxBus, 0, .6); },
    dia(t) { burst(t, .7, 'bandpass', 900, .12, .6); tone(t + .35, 1046.5, .9, .06); },
    pagina(t) { burst(t, .25, 'bandpass', 2200, .18, .8); },
    herramientas(t) { tone(t, 1900, .25, .05, 'triangle'); tone(t + .12, 2400, .3, .05, 'triangle'); }
  };
  function sfx(name) { if (!ctx || !soundOn || !SFX[name]) return; SFX[name](ctx.currentTime + .01); }

  function setSound(on) { soundOn = on; if (ctx) master.gain.setTargetAtTime(on ? .9 : 0, ctx.currentTime, .05); }
  function setMusic(on) { musicOn = on; if (ctx) musicBus.gain.setTargetAtTime(on ? .55 : 0, ctx.currentTime, .1); }
  function duck(on) { if (ctx) musicBus.gain.setTargetAtTime(on ? .15 : (musicOn ? .55 : 0), ctx.currentTime, .15); }

  return { init, setMood, setAmbience, sfx, setSound, setMusic, duck, get soundOn() { return soundOn; }, get musicOn() { return musicOn; } };
})();

/* =====================================================================
   PUNTO DE INTEGRACIÓN CON EL SISTEMA ROBÓTICO (Arduino / ESP32)
   ---------------------------------------------------------------------
   Cada vez que el jugador corta una rosa se llama:
       Integracion.onDecision(punto, resultado, detalle)
         punto     → 1 (0-1, cerrada), 2 (ideal) o 3 (copa)
         resultado → 'cerrada' | 'ideal' | 'abierta'
         detalle   → { intento, esperas, tiempoDecisionSeg, rosa }
   Además se emite el evento del navegador 'rosa:decision', así que otro
   script puede escucharlo sin tocar este código:
       window.addEventListener('rosa:decision', e => console.log(e.detail));

   EJEMPLO (no activo) con Web Serial — solo funciona en Chrome o Edge de
   escritorio y requiere que el usuario elija el puerto con un clic:
       let puerto, escritor;
       async function conectarRobot() {            // llamar desde un botón
         puerto = await navigator.serial.requestPort();
         await puerto.open({ baudRate: 115200 });
         escritor = puerto.writable.getWriter();
       }
       Integracion.onDecision = (punto, resultado) => {
         if (!escritor) return;
         const linea = JSON.stringify({ punto, resultado }) + '\n';
         escritor.write(new TextEncoder().encode(linea));
       };
   En el ESP32, leer la línea con Serial.readStringUntil('\n').
   ===================================================================== */
const Integracion = {
  onDecision(punto, resultado, detalle) { /* reemplazar para conectar el robot */ }
};
function emitirDecision(punto, resultado, detalle) {
  try { Integracion.onDecision(punto, resultado, detalle); } catch (e) { console.warn('onDecision', e); }
  window.dispatchEvent(new CustomEvent('rosa:decision', { detail: Object.assign({ punto, resultado }, detalle) }));
}
window.RosaGame = { Integracion, get metricas() { return buildMetrics(); } };

/* =====================================================================
   MOTOR
   ===================================================================== */
const $ = s => document.querySelector(s);
const T = CONFIG;
const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const Settings = { fontScale: 1, instant: false };
const S = {};
function resetState() {
  Object.assign(S, {
    nombre: '', avatar: 'ella', cap: 0, intentos: [], cuaderno: [], pistas: { cerrada: 0, abierta: 0 },
    inicio: Date.now(), logro: false, notaNueva: false, notasVistas: new Set(),
    puntos: 0, puntosLog: [], insignias: [], racha: 0, vistos: new Set(), retos: [], retosCortes: []
  });
}
resetState();

function fmt(t) {
  return String(t)
    .replace(/\{nombre\}/g, S.nombre || 'aprendiz')
    .replace(/\{finca\}/g, T.finca)
    .replace(/\{ciudad\}/g, T.ciudadCliente)
    .replace(/\{([^{}\/]*)\/([^{}\/]*)\}/g, (m, a, b) => S.avatar === 'el' ? a : b);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const charKey = who => who === 'yo' ? S.avatar : who;

/* ---------- flujos cancelables (para reiniciar en cualquier momento) ---------- */
const CANCEL = Symbol('cancelado');
let RUN = 0;
const rejecters = new Set();
function cancellable(exec) {
  const id = RUN;
  return new Promise((res, rej) => {
    const cancel = () => rej(CANCEL);
    rejecters.add(cancel);
    exec(v => { rejecters.delete(cancel); if (id === RUN) res(v); });
  });
}
function cancelAll() {
  RUN++; rejecters.forEach(f => f()); rejecters.clear();
  clearInterval(Dlg.timer); Dlg.res = null; Dlg.typing = false;
  Loops.stopAll();
}
const wait = ms => cancellable(r => setTimeout(r, ms));
function tween(ms, fn) {
  if (reduced) ms = Math.min(ms, 120);
  return cancellable(r => {
    const id = RUN, t0 = performance.now();
    const f = now => { if (id !== RUN) return; const t = Math.min(1, (now - t0) / ms); fn(t); t < 1 ? requestAnimationFrame(f) : r(); };
    requestAnimationFrame(f);
  });
}
const easeInOut = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
function waitClick(el) { return cancellable(r => { const h = () => { el.removeEventListener('click', h); r(); }; el.addEventListener('click', h); }); }

/* animaciones continuas (rosa del título, viaje, etc.) */
const Loops = {
  map: new Map(),
  start(name, fn) { this.stop(name); let on = true; const f = now => { if (!on) return; fn(now); requestAnimationFrame(f); }; this.map.set(name, () => on = false); requestAnimationFrame(f); },
  stop(name) { const s = this.map.get(name); if (s) { s(); this.map.delete(name); } },
  stopAll() { this.map.forEach(s => s()); this.map.clear(); }
};

/* ---------- diálogo con efecto máquina de escribir ---------- */
const Dlg = { res: null, typing: false, timer: null, full: '', pages: [], page: 0 };
let Paused = false;
/* Divide un texto en cajas de máximo 2 renglones según el ancho real de la pantalla */
function paginate(text) {
  const p = $('#dlgText'), m = $('#dlgMeasure'), w = p.clientWidth;
  if (!w) return [text];
  m.style.width = w + 'px';
  const lh = parseFloat(getComputedStyle(p).lineHeight) || 24, max = lh * 2 + 3;
  const fits = s => { m.textContent = s; return m.offsetHeight <= max; };
  if (fits(text)) return [text];
  const words = text.split(' '), pages = [];
  let cur = [];
  for (const wd of words) {
    if (cur.length && !fits([...cur, wd].join(' '))) {
      let k = -1;
      for (let i = cur.length - 1; i >= Math.floor(cur.length / 3); i--) if (/[.?!:;…]$/.test(cur[i])) { k = i; break; }
      if (k < 0) for (let i = cur.length - 1; i >= Math.floor(cur.length / 2); i--) if (/,$/.test(cur[i])) { k = i; break; }
      if (k >= 0 && k < cur.length - 1) { pages.push(cur.slice(0, k + 1).join(' ')); cur = cur.slice(k + 1); }
      else { pages.push(cur.join(' ')); cur = []; }
    }
    cur.push(wd);
  }
  if (cur.length) pages.push(cur.join(' '));
  return pages;
}
function showPage() {
  const p = $('#dlgText'), txt = Dlg.pages[Dlg.page], dlg = $('#dialog');
  Dlg.full = txt; clearInterval(Dlg.timer); dlg.classList.remove('ready');
  if (Settings.instant || reduced) { p.textContent = txt; Dlg.typing = false; dlg.classList.add('ready'); return; }
  let i = 0; p.textContent = ''; Dlg.typing = true;
  Dlg.timer = setInterval(() => { if (Paused) return; i += 1; p.textContent = txt.slice(0, i); if (i >= txt.length) finishType(); }, 26);
}
function say(who, text, mood) {
  return cancellable(resolve => {
    const ch = T.personajes[who] || T.personajes.narrador, dlg = $('#dialog');
    dlg.hidden = false;
    dlg.classList.toggle('narr', who === 'narrador');
    $('#dlgName').textContent = fmt(ch.nombre);
    $('#dlgName').style.color = ch.color;
    $('#dlgPortrait').innerHTML = who === 'narrador' ? '' : ART.portrait(charKey(who), mood || 'neutral');
    Stage.speaking(charKey(who), mood);
    const full = fmt(text);
    $('#dlgLive').textContent = (ch.nombre ? fmt(ch.nombre) + ': ' : '') + full;
    Dlg.res = resolve; Dlg.pages = paginate(full); Dlg.page = 0;
    showPage();
  });
}
function finishType() { clearInterval(Dlg.timer); Dlg.typing = false; $('#dlgText').textContent = Dlg.full; $('#dialog').classList.add('ready'); }
function advance() {
  if (Paused || !Dlg.res) return;
  if (Dlg.typing) { finishType(); return; }
  AUDIO.sfx('click');
  if (Dlg.page < Dlg.pages.length - 1) { Dlg.page++; showPage(); return; }
  const r = Dlg.res; Dlg.res = null; $('#dialog').classList.remove('ready'); r();
}
async function lines(list) { for (const l of list) await say(l[0], l[1], l[2]); }
function hideDialog() { $('#dialog').hidden = true; Stage.speaking(null); }

/* ---------- escenario: fondo + personajes ---------- */
const Stage = {
  chars: [],
  set(list, extra = '') {
    this.chars = list.map(c => Object.assign({ mood: 'neutral', scale: .98 }, c));
    this.extra = extra;
    this.render();
  },
  figHTML(c) {
    const inner = ART.figure(c.key, c);
    const sc = c.scale, x = c.x - 100 * sc, y = 460 - 440 * sc;
    const flip = c.flip ? `<g transform="translate(200 0) scale(-1 1)">${inner}</g>` : inner;
    return `<g class="fig${c.cls ? ' ' + c.cls : ''}" id="fig-${c.key}" transform="translate(${x} ${y}) scale(${sc})">${flip}</g>`;
  },
  render() {
    const before = this.extra && this.extra.before || '', after = this.extra && this.extra.after || '';
    $('#focal').innerHTML = `<svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${before}${this.chars.map(c => this.figHTML(c)).join('')}${after}</svg>`;
  },
  update(key, props) {
    const c = this.chars.find(c => c.key === key); if (!c) return;
    Object.assign(c, props);
    const g = document.getElementById('fig-' + key);
    if (g) g.outerHTML = this.figHTML(c);
  },
  speaking(key, mood) {
    this.chars.forEach(c => {
      if (key && c.key === key && mood && c.mood !== mood) this.update(c.key, { mood });
      const g = document.getElementById('fig-' + c.key);
      if (!g) return;
      g.classList.toggle('dim', !!key && c.key !== key && this.chars.some(o => o.key === key));
    });
  },
  clear() { this.chars = []; this.extra = ''; $('#focal').innerHTML = ''; }
};
function setBg(name) { $('#bg').innerHTML = ART.bg[name](); $('#app').dataset.scene = name; }
async function transition(build, ms = 420) {
  const c = $('#curtain');
  c.classList.add('on'); await wait(reduced ? 40 : ms);
  build(); await wait(60);
  c.classList.remove('on'); await wait(reduced ? 20 : 260);
}

/* ---------- progreso, banner, toast ---------- */
function setProgress(n) {
  S.cap = n;
  $('#progressList').innerHTML = T.capitulos.map((t, i) => `<li class="${i + 1 < n ? 'done' : i + 1 === n ? 'now' : ''}" ${i + 1 === n ? 'aria-current="step"' : ''}><span class="sr">${T.ui.capitulo} ${i + 1}: ${esc(t)}</span></li>`).join('');
  $('#progressLabel').innerHTML = `<span class="long">${esc(T.ui.capitulo)} ${n} de ${T.capitulos.length}: </span><span class="short">${n}/${T.capitulos.length} </span>${esc(T.capitulos[n - 1])}`;
}
async function chapterBanner(n, sub = '') {
  setProgress(n);
  $('#banSmall').textContent = `${T.ui.capitulo} ${n}`;
  $('#banTitle').textContent = T.capitulos[n - 1];
  $('#banSub').textContent = sub; $('#banSub').hidden = !sub;
  const b = $('#banner'); b.hidden = false;
  await wait(1700);
  b.hidden = true;
}
let toastTimer;
function toast(html) {
  const t = $('#toast'); t.innerHTML = html; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 2600);
}
function addNote(text, icon = 'nota', quiet = false) {
  if (S.cuaderno.some(n => n.text === text)) return;
  S.cuaderno.push({ text, icon });
  S.notaNueva = true; updateNotebookBtn();
  AUDIO.sfx('pagina');
  if (!quiet) toast(`${ART.icon.cuaderno}<span>${esc(T.cuaderno.nuevaNota)}</span>`);
}
function updateNotebookBtn() { $('#btnNotebook').innerHTML = ART.icon.cuaderno + (S.notaNueva ? '<span class="dot" aria-hidden="true"></span>' : ''); }

/* ---------- botón de acción grande ---------- */
async function actionButton(label, icon) {
  const wrap = document.createElement('div'); wrap.className = 'action-wrap';
  wrap.innerHTML = `<button class="btn primary">${icon ? ART.icon[icon] : ''}<span>${esc(label)}</span></button>`;
  $('#ui').appendChild(wrap);
  const b = wrap.querySelector('button'); b.focus({ preventScroll: true });
  try { await waitClick(b); } finally { wrap.remove(); }
  AUDIO.sfx('click');
}

/* =====================================================================
   PANTALLA DE INICIO Y ELECCIÓN DE PERSONAJE
   ===================================================================== */
function showTitle() {
  cancelAll(); resetState();
  ['#topbar', '#dialog', '#calendar', '#summary', '#observe', '#pause', '#notebook', '#setup', '#banner', '#toast'].forEach(s => $(s).hidden = true);
  $('#ui').innerHTML = ''; Stage.clear();
  setBg('amanecer');
  $('#titleH1').textContent = T.titulo;
  $('#titleSub').textContent = T.subtitulo;
  $('#btnStart').textContent = T.ui.comenzar;
  $('#titleNote').textContent = `${T.pie}. ${T.ui.duracion}.`;
  $('#title').hidden = false;
  const box = $('#titleRose');
  Loops.start('titulo', now => {
    const t = now / 1000, o = .62 + Math.sin(t * .7) * .14;
    box.innerHTML = ART.roseSVG({ o, yaw: t * .35, stem: 150 }, '-70 -78 140 240');
  });
}
function showSetup() {
  Loops.stop('titulo');
  $('#title').hidden = true;
  $('#setupTitle').textContent = T.ui.quienEres;
  $('#nameLbl').textContent = T.ui.tuNombre;
  $('#nameInput').placeholder = T.ui.nombrePlaceholder;
  $('#nameInput').value = '';
  $('#nameErr').textContent = '';
  $('#btnBegin').textContent = T.ui.empezar;
  const g = $('#avatarGroup');
  g.innerHTML = Object.entries(T.avatares).map(([k, lbl]) =>
    `<button type="button" class="avatar" role="radio" aria-checked="${S.avatar === k}" data-av="${k}"><svg viewBox="40 20 120 420">${ART.figure(k, { mood: 'feliz' })}</svg><span class="check">${ART.icon.ok}${esc(lbl)}</span></button>`).join('');
  g.querySelectorAll('.avatar').forEach(b => b.onclick = () => {
    S.avatar = b.dataset.av; AUDIO.sfx('click');
    g.querySelectorAll('.avatar').forEach(o => o.setAttribute('aria-checked', o === b));
  });
  $('#setup').hidden = false;
  setTimeout(() => $('#nameInput').focus(), 50);
}
function beginGame() {
  const n = $('#nameInput').value.trim().replace(/\s+/g, ' ');
  if (!n) { $('#nameErr').textContent = T.ui.nombreFalta; $('#nameInput').focus(); return; }
  S.nombre = n.charAt(0).toUpperCase() + n.slice(1);
  S.inicio = Date.now();
  $('#setup').hidden = true;
  $('#topbar').hidden = false;
  updateNotebookBtn(); updateRewardsBtn();
  run(story);
}
async function run(flow) {
  try { await flow(); }
  catch (e) { if (e !== CANCEL) { console.error(e); } }
}

/* =====================================================================
   HISTORIA
   ===================================================================== */
async function story() {
  await chapter1();
  for (;;) {
    const cut = await chapter2();
    await chapter3(cut);
    const res = await chapter4(cut);
    const done = await chapter5(res);
    if (done) break;
  }
  await chapterRetos();
  showSummary();
}

/* ---------- CAPÍTULO 1: Primer día ---------- */
async function chapter1() {
  AUDIO.setMood('finca'); AUDIO.setAmbience('viento');
  await transition(() => {
    setBg('amanecer');
    Stage.set([{ key: 'aurelio', x: 125, mood: 'feliz', pose: 'saludo' }, { key: S.avatar, x: 285, flip: true }]);
  });
  await chapterBanner(1);
  await lines(T.cap1.llegada);
  // entrega de herramientas
  Stage.update('aurelio', { pose: 'ofrece', prop: 'tijeras' });
  AUDIO.sfx('herramientas');
  const card = document.createElement('div'); card.className = 'card-pop';
  card.innerHTML = `<h3>${esc(T.cap1.recibiste)}</h3><div class="tools"><figure><svg viewBox="-20 -20 70 40">${ART.tijeras(8, 0, 0)}</svg><figcaption>${esc(T.cap1.herramientasNombres[0])}</figcaption></figure><figure>${ART.icon.guantes}<figcaption>${esc(T.cap1.herramientasNombres[1])}</figcaption></figure></div>`;
  $('#ui').appendChild(card);
  await lines(T.cap1.herramientas);
  card.remove();
  addNote(T.cuaderno.herramientas);
  Stage.update('aurelio', { pose: 'normal', prop: null });
  Stage.update(S.avatar, { prop: 'tijeras' });
  await lines(T.cap1.porque);
  addNote(T.cuaderno.tiempo);
  // invernadero
  AUDIO.sfx('pasos');
  await transition(() => {
    setBg('invernadero');
    Stage.set([{ key: 'aurelio', x: 120 }, { key: S.avatar, x: 280, flip: true, prop: 'tijeras' }]);
  }, 600);
  AUDIO.setAmbience('sala');
  await lines(T.cap1.invernadero);
  hideDialog();
  await actionButton(T.cap1.caminar, 'pasos');
  $('#bg').classList.add('walking'); AUDIO.sfx('pasos');
  await wait(2700);
  $('#bg').classList.remove('walking');
  const d = T.cap1.despues;
  await say(...d[0]); addNote(T.cuaderno.meta);
  await say(...d[1]); await say(...d[2]); await say(...d[3]);
  addNote(T.cuaderno.tallo);
}

/* ---------- CAPÍTULO 2: La decisión ---------- */
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
/* Al terminar la decisión, la cama deja de aceptar toques: así un toque rápido
   en otra rosa no registra un corte extra (ni puntos ni métricas de más). */
function lockBed(bed) { bed.querySelectorAll('button').forEach(b => { b.onclick = null; b.setAttribute('aria-disabled', 'true'); }); bed.classList.add('locked'); }
const bedRoseSVG = r => ART.roseSVG({ o: r.oOverride ?? ART.PUNTO_O[r.punto], yaw: r.yaw, stem: Math.round((r.tallo || 55) * 3.8), variedad: r.variedad }, '-48 -78 96 300');

async function chapter2() {
  const n = S.intentos.length + 1;
  AUDIO.setMood('decision'); AUDIO.setAmbience('sala');
  await transition(() => { setBg('invernadero'); Stage.clear(); $('#ui').innerHTML = ''; });
  await chapterBanner(2, n > 1 ? `${T.ui.intento} ${n}` : '');
  await lines(n > 1 ? T.cap2.introReintento : T.cap2.intro);
  hideDialog();
  const roses = shuffle([1, 2, 3]).map((p, i) => ({ id: 'ABC'[i], punto: p, puntoInicial: p, yaw: [.4, -.6, 1.2][i], tallo: 55, variedad: 'roja', esperas: 0 }));
  const intento = { tipo: 'historia', modo: 'una', n, inicio: performance.now(), abiertas: 0, rosasVistas: new Set(), vistas: new Set(), usoZoom: false, usoRegla: false, esperas: 0 };
  const bed = document.createElement('div'); bed.className = 'bed';
  bed.innerHTML = `<div class="bed-hint">${esc(T.cap2.ayudaCama)}</div><div class="bed-row">${roses.map(r =>
    `<button class="bed-rose" data-id="${r.id}" aria-label="${esc(T.cap2.etiquetaRosa)} ${r.id}">${bedRoseSVG(r)}<span class="tag">${esc(T.cap2.etiquetaRosa)} ${r.id}</span></button>`).join('')}</div>`;
  $('#ui').appendChild(bed);
  const cut = await cancellable(resolve => {
    bed.querySelectorAll('.bed-rose').forEach(btn => btn.onclick = () => {
      const r = roses.find(x => x.id === btn.dataset.id);
      AUDIO.sfx('click');
      Observe.open(r, intento, btn, resolve);
    });
  });
  // corte hecho
  lockBed(bed);
  const btn = bed.querySelector(`[data-id="${cut.rose.id}"]`);
  if (btn) btn.classList.add('cut');
  await wait(900);
  bed.remove();
  Stage.set([{ key: 'aurelio', x: 200, mood: 'feliz' }]);
  await lines(T.cap2.cortado);
  return cut;
}

/* ---------- Observación de la rosa: zoom, giro, regla, cortar / esperar ---------- */
const Observe = {
  open(rose, intento, bedBtn, onCut) {
    this.rose = rose; this.intento = intento; this.bedBtn = bedBtn; this.onCut = onCut;
    this.yaw = rose.yaw; this.target = rose.yaw; this.top = false; this.zoom = 1; this.ruler = false;
    this.o = rose.oOverride ?? ART.PUNTO_O[rose.punto]; this.busy = false; this.dirty = true; this.vistasEsta = new Set();
    $('#btnWait').hidden = !!intento.noWait; $('#obsStem').hidden = true;
    $('#obsStem').innerHTML = `${ART.icon.regla}<span>${esc(T.ui.tallo)}: ${rose.tallo || 55} cm</span>`;
    this.t0 = performance.now();
    intento.abiertas++; intento.rosasVistas.add(rose.id);
    $('#obsTitle').textContent = `${T.cap2.etiquetaRosa} ${rose.id}`;
    $('#obsBack').textContent = T.cap2.botonVolver;
    $('#obsHint').textContent = T.cap2.ayudaGirar;
    $('#obsHint').hidden = false;
    $('#obsToastWrap').innerHTML = '';
    $('#btnCut').innerHTML = `${ART.icon.tijeras}<span>${esc(T.cap2.botonCortar)}</span>`;
    $('#btnWait').innerHTML = `${ART.icon.esperar}<span>${esc(T.cap2.botonEsperar)}</span>`;
    $('#btnWait').disabled = false;
    $('#btnRuler').innerHTML = `${ART.icon.regla}<span>${esc(T.cap2.regla)}</span>`;
    $('#btnRuler').setAttribute('aria-pressed', 'false');
    $('#zoomIn').innerHTML = ART.icon.lupaMas; $('#zoomOut').innerHTML = ART.icon.lupaMenos;
    const V = T.cap2.vistas;
    $('#obsViews').innerHTML = [['frente', 0], ['lado', Math.PI / 2], ['atras', Math.PI], ['arriba', null]].map(([k, a]) =>
      `<button data-v="${k}" ${a !== null ? `data-a="${a}"` : ''} aria-pressed="false">${esc(V[k])}</button>`).join('');
    $('#obsViews').querySelectorAll('button').forEach(b => b.onclick = () => this.view(b.dataset.v, b.dataset.a));
    this.applyZoom(); this.markViews();
    $('#observe').hidden = false;
    $('#btnCut').focus({ preventScroll: true });
    Loops.start('observar', () => this.frame());
  },
  view(v, a) {
    AUDIO.sfx('click');
    this.intento.vistas.add(v); this.vistasEsta.add(v);
    if (v === 'arriba') { this.top = true; }
    else { this.top = false; const base = +a, k = Math.round((this.yaw - base) / (Math.PI * 2)); this.target = base + k * Math.PI * 2; }
    this.dirty = true; this.markViews();
  },
  markViews() {
    $('#obsViews').querySelectorAll('button').forEach(b => {
      const on = b.dataset.v === 'arriba' ? this.top : !this.top && Math.abs(((this.target - +b.dataset.a) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI) < .3;
      b.setAttribute('aria-pressed', on);
    });
  },
  frame() {
    const d = this.target - this.yaw;
    if (Math.abs(d) > .002 || this.dirty) {
      this.yaw += d * .18; this.dirty = false;
      const yawDeg = ((this.yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const q = Math.round(yawDeg / (Math.PI / 2)) % 4;
      if (Math.abs(d) < .05 && !this.top) { const vv = ['frente', 'lado', 'atras', 'lado'][q]; this.intento.vistas.add(vv); this.vistasEsta.add(vv); }
      const extra = this.ruler && !this.top ? ART.ruler(40) : '';
      $('#obsRose').innerHTML = ART.roseSVG({ o: this.o, yaw: this.yaw, stem: 150, top: this.top, topY: -20, topScale: 1.5, variedad: this.rose.variedad }, '-66 -84 132 180', extra);
    }
  },
  applyZoom() { $('#obsZoom').style.transform = `scale(${this.zoom})`; },
  setZoom(z) { this.zoom = Math.max(1, Math.min(2.6, z)); if (this.zoom > 1) this.intento.usoZoom = true; this.applyZoom(); },
  toast(who, text) {
    const w = $('#obsToastWrap');
    w.innerHTML = `<div class="obs-toast" role="status">${who ? `<span class="pf">${ART.portrait(who, 'pensativo')}</span>` : ''}<span>${esc(fmt(text))}</span></div>`;
    clearTimeout(this.tt); this.tt = setTimeout(() => w.innerHTML = '', 3800);
  },
  async wait() {
    if (this.busy) return;
    if (this.rose.punto >= 3) { this.toast('aurelio', T.cap2.esperarMax); AUDIO.sfx('error'); $('#btnWait').disabled = true; return; }
    this.busy = true; AUDIO.sfx('dia');
    const day = $('#obsDay'); $('#obsDayTxt').textContent = T.cap2.esperarHecho; day.classList.add('on');
    const from = this.o, to = ART.PUNTO_O[this.rose.punto + 1];
    try {
      await tween(1300, t => { this.o = from + (to - from) * easeInOut(t); this.dirty = true; });
    } catch (e) { if (e === CANCEL) return; throw e; }
    if (this.rose.punto === 2) this.rose.overWait = true;
    this.rose.punto++; this.rose.esperas = (this.rose.esperas || 0) + 1; this.rose.oOverride = null; this.intento.esperas++;
    this.bedBtn.querySelector('svg').outerHTML = bedRoseSVG(this.rose);
    setTimeout(() => day.classList.remove('on'), 700);
    this.busy = false;
    addNote(T.cuaderno.esperar, 'esperar');
    if (this.rose.punto >= 3) $('#btnWait').disabled = false;
  },
  cut() {
    if (this.busy) return;
    AUDIO.sfx('tijera');
    const it = this.intento, r = this.rose, p = r.punto;
    const caso = clasificar(r), resultado = caso === 'demas' ? 'abierta' : caso;
    const data = {
      tipo: it.tipo, reto: it.retoId || null, n: it.n, rosa: r.id, variedad: r.variedad || 'roja', talloCm: r.tallo || 55,
      puntoInicial: r.puntoInicial, esperas: r.esperas || 0, puntoCorte: p, resultado, caso,
      tiempoDecisionSeg: Math.round((performance.now() - it.inicio) / 100) / 10,
      rosasObservadas: it.rosasVistas.size, vistasUsadas: [...this.vistasEsta], usoZoom: it.usoZoom, usoRegla: it.usoRegla
    };
    (it.tipo === 'reto' ? S.retosCortes : S.intentos).push(data);
    emitirDecision(p, resultado, { caso, intento: data.n, reto: data.reto, esperas: data.esperas, talloCm: data.talloCm, tiempoDecisionSeg: data.tiempoDecisionSeg, rosa: data.rosa });
    Rewards.onCut(data, this.vistasEsta, it.modo !== 'varias');
    this.close();
    this.onCut({ rose: r, punto: p, resultado, caso, data });
  },
  close() { Loops.stop('observar'); $('#observe').hidden = true; if (this.bedBtn) this.bedBtn.focus({ preventScroll: true }); }
};
function setupObserveControls() {
  const st = $('#obsStage'), ptrs = new Map();
  let lastX = 0, pinch0 = 0, zoom0 = 1;
  st.addEventListener('pointerdown', e => { st.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, e); lastX = e.clientX; if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); zoom0 = Observe.zoom; } $('#obsHint').hidden = true; });
  st.addEventListener('pointermove', e => {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.set(e.pointerId, e);
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); if (pinch0) Observe.setZoom(zoom0 * d / pinch0); return; }
    const dx = e.clientX - lastX; lastX = e.clientX;
    if (Observe.top && Math.abs(dx) > 2) { Observe.top = false; }
    Observe.target += dx * .013; Observe.yaw += dx * .013; Observe.dirty = true; Observe.markViews();
  });
  const up = e => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = 0; };
  st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
  st.addEventListener('wheel', e => { e.preventDefault(); Observe.setZoom(Observe.zoom * (e.deltaY < 0 ? 1.12 : .89)); }, { passive: false });
  $('#zoomIn').onclick = () => { AUDIO.sfx('click'); Observe.setZoom(Observe.zoom + .4); };
  $('#zoomOut').onclick = () => { AUDIO.sfx('click'); Observe.setZoom(Observe.zoom - .4); };
  $('#btnRuler').onclick = () => { AUDIO.sfx('click'); Observe.ruler = !Observe.ruler; if (Observe.ruler) Observe.intento.usoRegla = true; if (Observe.top) Observe.top = false; $('#btnRuler').setAttribute('aria-pressed', Observe.ruler); $('#obsStem').hidden = !Observe.ruler; Observe.dirty = true; Observe.markViews(); };
  $('#btnWait').onclick = () => Observe.wait();
  $('#btnCut').onclick = () => Observe.cut();
  $('#obsBack').onclick = () => { AUDIO.sfx('click'); Observe.close(); };
  st.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { Observe.target -= .5; Observe.dirty = true; } if (e.key === 'ArrowRight') { Observe.target += .5; Observe.dirty = true; } });
  st.tabIndex = 0;
}

/* ---------- CAPÍTULO 3: El viaje ---------- */
function journeyRose(punto, p) {
  const c = ART.clamp;
  if (punto === 1) return { o: .05 + .07 * c(p, 0, 1), wilt: c((p - .92) / .58, 0, 1), damage: 0, fallen: 0 };
  if (punto === 2) return { o: .5 + .12 * c(p / .8, 0, 1) + .75 * c((p - .8) / .7, 0, 1), wilt: 0, damage: 0, fallen: 0 };
  return { o: 1 + .55 * c(p, 0, 1) + .2 * c(p - 1, 0, .5), wilt: .18 * c((p - 1) / .5, 0, 1), damage: c(p / 1.1, 0, 1), fallen: Math.floor(c(p, 0, 1.5) * 2.4) };
}
function medalHTML(punto, p) {
  const r = journeyRose(punto, p);
  const id = 'md' + Math.random().toString(36).slice(2, 7);
  const ring = `<defs><radialGradient id="${id}" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".92"/><stop offset=".8" stop-color="#F7F1E8" stop-opacity=".82"/><stop offset="1" stop-color="#E8DCCB" stop-opacity=".8"/></radialGradient></defs><circle cx="0" cy="20" r="104" fill="url(#${id})" stroke="#FFFFFF" stroke-width="5" opacity=".95"/><ellipse cx="0" cy="96" rx="58" ry="7" fill="#4A4440" opacity=".12"/>`;
  const rs = ART.rose({ o: r.o, yaw: .5, stem: 96, wilt: r.wilt, damage: r.damage, fallen: r.fallen });
  return `<svg viewBox="-110 -90 220 220" style="width:min(60vw,250px);height:min(100%,250px)" aria-hidden="true">${ring}<defs>${rs.defs}</defs><g transform="translate(0 0)">${rs.g}</g></svg>`;
}
const Journey = {
  p: 0, target: 0, punto: 2, day: 0, dayTarget: 0,
  start(punto) {
    this.punto = punto; this.p = 0; this.target = 0;
    Loops.start('viaje', () => {
      const d = this.target - this.p;
      if (Math.abs(d) < .0008 && this.drawn) return;
      this.p += d * .06; this.drawn = true;
      const m = document.querySelector('.medal-wrap');
      if (m) m.innerHTML = medalHTML(this.punto, this.p);
      $('#calFill').style.width = (ART.clamp(this.p, 0, 1) * 100) + '%';
    });
  }
};
async function chapter3(cut) {
  const E = T.cap3.etapas;
  AUDIO.setMood('viaje');
  await transition(() => {
    setBg(E[0].fondo); Stage.clear(); $('#ui').innerHTML = '';
    $('#focal').innerHTML = `<div class="medal-wrap"></div>`;
    $('#calLbl').textContent = T.cap3.calendario; $('#calNum').textContent = '0';
    $('#calFrom').textContent = T.cap3.desde; $('#calTo').textContent = T.cap3.hasta;
    $('#calendar').hidden = false;
    Journey.drawn = false; Journey.start(cut.punto);
  });
  await chapterBanner(3);
  await lines(T.cap3.intro);
  for (let i = 0; i < E.length; i++) {
    const st = E[i];
    if (i > 0 && E[i - 1].fondo !== st.fondo) await transition(() => setBg(st.fondo), 300);
    AUDIO.setAmbience(st.ambiente); AUDIO.setMood(st.musica);
    $('#calNum').textContent = st.dia;
    Journey.target = (i + 1) / E.length;
    await say('narrador', st.texto);
  }
  await say(...T.cap3.vozRosa[cut.resultado]);
  Loops.stop('viaje');
  $('#calendar').hidden = true;
}

/* ---------- CAPÍTULO 4: La llegada ---------- */
function counterExtra(punto, p) {
  const r = journeyRose(punto, p);
  const vase = (x, yaw, dx) => { const rs = ART.rose(Object.assign({}, r, { yaw, stem: 120, fallen: 0 })); return `<defs>${rs.defs}</defs><g transform="translate(${x + dx} 238) scale(.8)">${rs.g}</g>`; };
  const fallen = r.fallen ? Array.from({ length: Math.min(4, r.fallen + 1) }, (_, i) => `<path transform="translate(${170 + i * 22} ${343 - (i % 2) * 3}) rotate(${i * 50})" d="M-7 0C-6 -6 6 -6 7 0C4 3 -4 3 -7 0Z" fill="#8E2A2E" stroke="#5A2E22" stroke-width=".8"/>`).join('') : '';
  return {
    after: `<g>${vase(200, .3, -16)}${vase(200, 2.1, 14)}${vase(200, 4, 0)}<path d="M180 300L222 300L216 344L186 344Z" fill="#7C9BB0"/><path d="M180 300L222 300L221 306L181 306Z" fill="#A9C2D3"/>` +
      `<rect x="-40" y="344" width="330" height="140" fill="#9C6B48"/><rect x="-40" y="338" width="330" height="12" rx="4" fill="#B98058"/>${fallen}</g>`
  };
}
async function resultCard(res) {
  const R = T.cap4.resultado[res];
  const ov = document.createElement('div'); ov.className = 'overlay scrim';
  ov.innerHTML = `<div class="panel result ${R.ok ? 'ok' : 'bad'}" role="dialog" aria-modal="true" aria-labelledby="resT"><div class="badge">${R.ok ? ART.icon.ok : ART.icon.no}</div><small>${esc(T.cap4.enLaFinca)}</small><h2 id="resT">${esc(R.titulo)}</h2><p>${esc(fmt(R.texto))}</p><div class="meter"><span>${R.ok ? ART.icon.ok : ART.icon.no}${esc(R.valor)}</span></div><button class="btn accent wide">${esc(T.ui.continuar)}</button></div>`;
  $('#app').appendChild(ov);
  const b = ov.querySelector('button'); b.focus();
  try { await waitClick(b); } finally { ov.remove(); }
  AUDIO.sfx('click');
}
async function chapter4(cut) {
  const res = cut.resultado;
  AUDIO.setMood('tienda'); AUDIO.setAmbience('ciudad');
  await transition(() => {
    setBg('tienda'); $('#ui').innerHTML = '';
    Stage.set([{ key: 'camila', x: 96, mood: 'feliz' }], counterExtra(cut.punto, 1));
  });
  await chapterBanner(4);
  AUDIO.sfx('campanita');
  await lines(T.cap4.llegada);
  const L = T.cap4[res];
  if (res === 'cerrada') {
    await say(...L[0]);
    AUDIO.setMood('triste');
    await transition(() => { Stage.extra = counterExtra(1, 1.5); Stage.render(); }, 380);
    await say(...L[1]); await say(...L[2]); await say(...L[3]);
    AUDIO.sfx('error');
  } else if (res === 'abierta') {
    await say(...L[0]);
    AUDIO.setMood('triste');
    await say(...L[1]); await say(...L[2]);
    AUDIO.sfx('error');
  } else {
    await transition(() => { Stage.extra = counterExtra(2, 1.5); Stage.render(); }, 380);
    await say(...L[0]);
    AUDIO.sfx('campanita');
    Stage.chars.push({ key: 'ernesto', x: 320, mood: 'feliz', scale: .98, cls: 'enter-right', flip: true });
    Stage.render();
    await say(...L[1]); await say(...L[2]); await say(...L[3]);
    AUDIO.setMood('final');
    const rOpt = journeyRose(2, 1.5);
    await transition(() => {
      setBg('casa');
      Stage.set([{ key: 'ernesto', x: 130, mood: 'feliz', pose: 'ofrece', prop: 'rosa', roseOpt: rOpt }, { key: 'marta', x: 290, flip: true, mood: 'feliz' }]);
    }, 600);
    await lines(T.cap4.idealCasa);
    AUDIO.sfx('exito');
  }
  hideDialog();
  await resultCard(res);
  addNote(fmt(T.cuaderno.intento[res].replace('{n}', cut.data.n)), res === 'ideal' ? 'ok' : 'no');
  markSeen(cut.caso);
  await transition(() => {
    setBg('invernadero');
    Stage.set([{ key: 'aurelio', x: 200, mood: res === 'ideal' ? 'feliz' : 'pensativo' }]);
  }, 500);
  AUDIO.setAmbience('sala'); AUDIO.setMood(res === 'ideal' ? 'final' : 'decision');
  await lines(T.cap4.mientras);
  await say(...T.cap4.fraseAurelio[res]);
  return res;
}

/* ---------- CAPÍTULO 5: Otra oportunidad ---------- */
function traitOverlay(step) {
  const H = 60, s = 2.3;
  let a = '';
  if (step >= 1) a += `<g><circle cx="${-14 * s}" cy="${-30 * s}" r="${15 * s}" fill="none" stroke="#F6C59F" stroke-width="5"/><circle cx="${-14 * s}" cy="${-30 * s}" r="${15 * s}" fill="none" stroke="#4A4440" stroke-width="1.6" stroke-dasharray="5 4"/></g>`;
  if (step >= 2) a += `<rect x="${-19 * s}" y="${-H * s - 4}" width="${38 * s}" height="${H * s * .55}" fill="none" stroke="#2F5D3A" stroke-width="4" stroke-dasharray="8 5" rx="4"/>`;
  if (step >= 3) a += `<g transform="scale(${s})">${ART.ruler(26)}</g>`;
  return a;
}
async function revealTraits() {
  const R = T.cap5.rasgos;
  $('#ui').innerHTML = `<div class="traits">${R.map(r => `<span class="trait" data-t="${r.id}">${ART.icon[r.id === 'tamano' ? 'regla' : r.id]}${esc(r.corto)}</span>`).join('')}</div>`;
  const draw = step => {
    const rs = ART.rose({ o: .5, yaw: .25, stem: 0 });
    $('#focal').innerHTML = `<svg viewBox="-170 -192 340 300" style="width:min(100%,520px);height:100%"><defs>${rs.defs}</defs><g transform="scale(2.3)">${rs.g}</g>${traitOverlay(step)}</svg>`;
  };
  Stage.chars = [];
  draw(0);
  for (let i = 0; i < R.length; i++) {
    draw(i + 1);
    document.querySelector(`.trait[data-t="${R[i].id}"]`).classList.add('on');
    AUDIO.sfx('click');
    await say(...R[i].linea);
    addNote(T.cuaderno.rasgos[R[i].id], R[i].id === 'tamano' ? 'regla' : R[i].id, true);
  }
}
async function chapter5(res) {
  await transition(() => { setBg('invernadero'); Stage.set([{ key: 'aurelio', x: 200, mood: res === 'ideal' ? 'feliz' : 'neutral' }]); });
  await chapterBanner(5);
  if (res !== 'ideal') {
    await lines(T.cap5.animo);
    const list = T.cap5.pistas[res], k = S.pistas[res]++;
    await say('aurelio', list[k % list.length], 'pensativo');
    await lines(T.cap5.otraVez);
    hideDialog();
    await actionButton(T.cap5.botonOtraVez, 'tijeras');
    return false;
  }
  S.logro = true;
  if (S.intentos.length === 1) await lines(T.cap5.aLaPrimera);
  await lines(T.cap5.exito);
  await revealTraits();
  await lines(T.cap5.cierre);
  addNote(T.cuaderno.rasgos.juntos, 'nota', true);
  AUDIO.sfx('exito');
  hideDialog();
  return true;
}

/* =====================================================================
   RESUMEN FINAL Y MÉTRICAS PARA EL FORMADOR
   ===================================================================== */
function buildMetrics() {
  const dur = Math.round((Date.now() - S.inicio) / 1000);
  return {
    juego: T.titulo, version: '1.0', jugador: S.nombre, avatar: S.avatar,
    fechaInicio: new Date(S.inicio).toISOString(), duracionTotalSeg: dur,
    totalIntentos: S.intentos.length, logroPuntoIdeal: S.logro,
    intentoDelLogro: S.logro ? (S.intentos.findIndex(i => i.resultado === 'ideal') + 1) : null,
    intentos: S.intentos.map(i => ({
      intento: i.n, rosa: i.rosa, puntoInicial: i.puntoInicial, esperas: i.esperas, puntoCorte: i.puntoCorte,
      resultado: i.resultado, tiempoDecisionSeg: i.tiempoDecisionSeg, rosasObservadas: i.rosasObservadas,
      vistasUsadas: i.vistasUsadas, usoZoom: i.usoZoom, usoRegla: i.usoRegla
    })),
    cuaderno: S.cuaderno.map(n => n.text),
    recompensas: { puntos: S.puntos, nivel: fmt(T.recompensas.niveles[Rewards.nivelIdx()].nombre), insignias: S.insignias.slice(), detalle: S.puntosLog.slice() },
    retos: S.retos.map(r => ({ id: r.id, titulo: r.titulo, dificultad: r.dificultad, intentos: r.intentos, superado: r.superado, conAyuda: r.conAyuda, casos: r.cortes || [], olvidos: r.olvidos || 0, tiempoSeg: r.tiempoSeg })),
    cortesEnRetos: S.retosCortes,
    perspectivasVistas: T.perspectivas.orden.filter(c => S.vistos.has(c))
  };
}
function compareFigure(p, mine) {
  const r = journeyRose(p, 1.5);
  return `<figure class="${mine ? 'mine' : ''}">${ART.roseSVG(Object.assign({ yaw: .5, stem: 90 }, r), '-62 -80 124 180')}<figcaption><span class="mk">${p === 2 ? ART.icon.ok : ART.icon.no}${esc(T.final.comparacion[p])}</span></figcaption></figure>`;
}
function showSummary() {
  cancelAll();
  hideDialog(); $('#calendar').hidden = true; $('#observe').hidden = true; $('#pause').hidden = true;
  clearTimeout(toastTimer); $('#toast').hidden = true; $('#banner').hidden = true;
  $('#ui').innerHTML = ''; Paused = false;
  AUDIO.setMood('final'); AUDIO.setAmbience('viento');
  setBg('amanecer'); Stage.clear();
  const M = buildMetrics(), F = T.final;
  const last = S.intentos[S.intentos.length - 1];
  const attempts = S.intentos.map(i => `<li class="${i.resultado === 'ideal' ? 'ok' : 'bad'}"><span class="ic">${i.resultado === 'ideal' ? ART.icon.ok : ART.icon.no}</span><span>${esc(T.ui.intento)} ${i.n}: ${esc(T.puntos[i.puntoCorte])}<small>${esc(T.cap2.etiquetaRosa)} ${i.rosa}, ${i.esperas} ${i.esperas === 1 ? 'espera' : 'esperas'}, ${String(i.tiempoDecisionSeg).replace('.', ',')} s para decidir</small></span></li>`).join('') || `<li class="bad"><span class="ic">${ART.icon.no}</span><span>Sin cortes todavía</span></li>`;
  const json = JSON.stringify(M, null, 2);
  const media = M.intentos.length ? (M.intentos.reduce((a, i) => a + i.tiempoDecisionSeg, 0) / M.intentos.length).toFixed(1).replace('.', ',') : '0';
  $('#sumSheet').innerHTML = `
    <div class="sum-hero"><h2 id="sumTitle">${esc(fmt(S.logro ? F.tituloLogro : F.tituloSinLogro))}</h2><p>${esc(fmt(S.logro ? F.mensajeLogro : F.mensajeSinLogro))}</p></div>
    <div class="sum-sec"><h3>${esc(fmt(F.comparacionTitulo))}</h3><div class="compare">${[1, 2, 3].map(p => compareFigure(p, last && last.puntoCorte === p)).join('')}</div></div>
    <div class="sum-sec"><h3>${esc(F.decisionesTitulo)}</h3><ul class="attempts">${attempts}</ul></div>
    ${summaryExtras()}
    <div class="sum-sec"><h3>${esc(T.cuaderno.titulo)}</h3><ul class="notes">${notesHTML()}</ul></div>
    <div class="invite"><svg viewBox="30 20 140 430" aria-hidden="true">${ART.figure('aurelio', { mood: 'feliz', pose: 'saludo' })}</svg><b>${esc(F.invitacion)}</b></div>
    <details class="trainer"><summary>${esc(F.formadorTitulo)}</summary>
      <div class="stats"><div><b>${M.totalIntentos}</b>intentos</div><div><b>${M.logroPuntoIdeal ? 'Sí' : 'No'}</b>llegó al punto ideal</div><div><b>${media} s</b>tiempo medio de decisión</div><div><b>${Math.floor(M.duracionTotalSeg / 60)}:${String(M.duracionTotalSeg % 60).padStart(2, '0')}</b>duración</div></div>
      <div class="export"><button class="btn accent" id="btnCopy">${ART.icon.copiar}<span>${esc(F.copiar)}</span></button><button class="btn ghost" id="btnDl">${ART.icon.bajar}<span>${esc(F.descargar)}</span></button></div>
      <p class="err" id="expMsg" aria-live="polite"></p>
      <label class="sr" for="jsonOut">Resumen en formato JSON</label><textarea id="jsonOut" readonly>${esc(json)}</textarea>
    </details>
    <div class="sum-actions"><button class="btn primary" id="btnAgain">${esc(F.jugarOtraVez)}</button></div>`;
  $('#summary').hidden = false;
  $('#sumSheet').scrollTop = 0;
  $('#btnCopy').onclick = () => copyJSON(json);
  $('#btnDl').onclick = () => downloadJSON(json);
  $('#btnAgain').onclick = () => { AUDIO.sfx('click'); showTitle(); };
  if (S.logro) AUDIO.sfx('exito');
}
async function copyJSON(json) {
  const msg = $('#expMsg');
  try { await navigator.clipboard.writeText(json); msg.style.color = 'var(--ok)'; msg.textContent = T.final.copiado; AUDIO.sfx('click'); }
  catch (e) {
    const ta = $('#jsonOut'); ta.focus(); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (er) { }
    msg.style.color = ok ? 'var(--ok)' : 'var(--bad)';
    msg.textContent = ok ? T.final.copiado : T.final.noCopiado;
  }
}
async function downloadJSON(json) {
  const msg = $('#expMsg'), name = `metricas-corte-de-rosas-${(S.nombre || 'aprendiz').toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-')}.json`;
  try {
    const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) { await dl.save({ filename: name, data: json }); msg.style.color = 'var(--ok)'; msg.textContent = T.final.descargado; return; }
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    msg.style.color = 'var(--ok)'; msg.textContent = T.final.descargado;
  } catch (e) {
    if (e && e.code === 'declined') { msg.textContent = ''; return; }
    const ta = $('#jsonOut'); ta.focus(); ta.select();
    msg.style.color = 'var(--bad)'; msg.textContent = T.final.noCopiado;
  }
}

/* =====================================================================
   CUADERNO, PAUSA Y CONTROLES GENERALES
   ===================================================================== */
function notesHTML() {
  if (!S.cuaderno.length) return `<li class="empty">${esc(T.cuaderno.vacio)}</li>`;
  return S.cuaderno.map(n => `<li>${ART.icon[n.icon] || ART.icon.nota}<span>${esc(n.text)}</span></li>`).join('');
}
function openNotebook() {
  AUDIO.sfx('pagina');
  $('#nbTitle').textContent = T.cuaderno.titulo;
  $('#nbList').innerHTML = notesHTML();
  $('#nbClose').textContent = T.ui.cerrar;
  $('#notebook').hidden = false; S.notaNueva = false; updateNotebookBtn();
  Paused = true; $('#nbClose').focus();
}
function closeNotebook() { $('#notebook').hidden = true; if ($('#pause').hidden) Paused = false; }
function refreshPause() {
  const U = T.ui;
  $('#pauseTitle').textContent = U.pausa; $('#pResume').textContent = U.reanudar;
  $('#pSoundLbl').textContent = U.sonido; $('#pMusicLbl').textContent = U.musica;
  $('#pTypeLbl').textContent = U.textoAnimado; $('#pSizeLbl').textContent = U.tamanoTexto;
  const tg = (el, on) => { el.textContent = on ? U.activado : U.desactivado; el.setAttribute('aria-pressed', on); };
  tg($('#pSound'), AUDIO.soundOn); tg($('#pMusic'), AUDIO.musicOn); tg($('#pType'), !Settings.instant);
  $('#pNotebook').textContent = U.verCuaderno; $('#pRewards').textContent = U.misLogros; $('#pFinish').textContent = U.terminar; $('#pRestart').textContent = U.reiniciar;
}
function openPause() { if ($('#topbar').hidden) return; Paused = true; AUDIO.duck(true); refreshPause(); $('#pause').hidden = false; $('#pResume').focus(); }
function closePause() { $('#pause').hidden = true; Paused = false; AUDIO.duck(false); }
function updateSoundBtn() { $('#btnSound').innerHTML = AUDIO.soundOn ? ART.icon.sonido : ART.icon.mudo; $('#btnSound').setAttribute('aria-label', AUDIO.soundOn ? 'Silenciar sonido' : 'Activar sonido'); }
function setFont(scale) { Settings.fontScale = Math.max(.9, Math.min(1.35, scale)); document.documentElement.style.setProperty('--fs', (17 * Settings.fontScale) + 'px'); }

function wire() {
  $('#btnStart').onclick = () => { AUDIO.init(); AUDIO.setMood('finca'); AUDIO.setAmbience('viento'); AUDIO.sfx('click'); showSetup(); };
  $('#btnBegin').onclick = () => { AUDIO.sfx('click'); beginGame(); };
  $('#nameInput').addEventListener('keydown', e => { if (e.key === 'Enter') beginGame(); });
  $('#dialog').addEventListener('click', advance);
  $('#btnPause').innerHTML = ART.icon.pausa;
  $('#btnPause').onclick = openPause;
  $('#btnNotebook').onclick = openNotebook;
  $('#btnRewards').onclick = openRewards;
  $('#pRewards').onclick = () => { openRewards(); };
  $('#rwClose').onclick = closeRewards;
  $('#btnSound').onclick = () => { AUDIO.setSound(!AUDIO.soundOn); updateSoundBtn(); };
  $('#pResume').onclick = closePause;
  $('#pSound').onclick = () => { AUDIO.setSound(!AUDIO.soundOn); refreshPause(); updateSoundBtn(); };
  $('#pMusic').onclick = () => { AUDIO.setMusic(!AUDIO.musicOn); refreshPause(); };
  $('#pType').onclick = () => { Settings.instant = !Settings.instant; refreshPause(); };
  $('#pSmaller').onclick = () => setFont(Settings.fontScale - .1);
  $('#pBigger').onclick = () => setFont(Settings.fontScale + .1);
  $('#pNotebook').onclick = () => { openNotebook(); };
  $('#pFinish').onclick = () => { closePause(); showSummary(); };
  $('#pRestart').onclick = () => { closePause(); showTitle(); };
  $('#nbClose').onclick = closeNotebook;
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('#notebook').hidden) return closeNotebook();
      if (!$('#rewards').hidden) return closeRewards();
      if (!$('#observe').hidden) return Observe.close();
      if (!$('#pause').hidden) return closePause();
      return openPause();
    }
    if ((e.key === 'Enter' || e.key === ' ') && !$('#dialog').hidden && Dlg.res && $('#pause').hidden && $('#notebook').hidden) {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (tag === 'BUTTON' && document.activeElement.id !== 'dlgNext') return;
      e.preventDefault(); advance();
    }
  });
  setupObserveControls();
  updateSoundBtn();
  $('#dlgNext').textContent = T.ui.continuar;
}

/* =====================================================================
   RECOMPENSAS: pétalos, niveles e insignias
   ===================================================================== */
const Rewards = {
  queue: Promise.resolve(),
  nivelIdx(p = S.puntos) { let i = 0; T.recompensas.niveles.forEach((n, k) => { if (p >= n.min) i = k; }); return i; },
  /* suma varios motivos en un solo aviso flotante */
  add(keys) {
    const R = T.recompensas; keys = keys.filter(k => R.puntos[k]);
    if (!keys.length) return;
    const before = this.nivelIdx();
    let total = 0;
    keys.forEach(k => { total += R.puntos[k]; S.puntosLog.push({ motivo: R.motivos[k], puntos: R.puntos[k] }); });
    S.puntos += total; updateRewardsBtn();
    this.show(`<div class="float-pts" role="status">${ART.icon.petalo}<span>+${total}</span><small>${esc(keys.map(k => R.motivos[k]).join(', '))}</small></div>`, 1700);
    const after = this.nivelIdx();
    if (after > before) this.show(`<div class="badge-pop" role="status"><span class="medal">${ART.icon.medalla}</span><div><small>${esc(R.nuevoNivel)}</small><b>${esc(fmt(R.niveles[after].nombre))}</b><span>${S.puntos} ${esc(R.unidad)}</span></div></div>`, 2600, 'exito');
  },
  unlock(id) {
    if (S.insignias.includes(id)) return;
    S.insignias.push(id); updateRewardsBtn();
    const b = T.recompensas.insignias[id];
    this.show(`<div class="badge-pop" role="status"><span class="medal">${ART.icon[b.icono]}</span><div><small>${esc(T.recompensas.nuevaInsignia)}</small><b>${esc(b.nombre)}</b><span>${esc(b.desc)}</span></div></div>`, 2600, 'exito');
  },
  show(html, ms, snd) {
    const run = RUN;
    this.queue = this.queue.then(() => new Promise(res => {
      if (run !== RUN) return res();
      const box = document.createElement('div'); box.innerHTML = html;
      const node = box.firstElementChild; $('#app').appendChild(node);
      if (snd) AUDIO.sfx(snd);
      setTimeout(() => { node.remove(); res(); }, reduced ? 1200 : ms);
    }));
  },
  onCut(data, vistas, primeraValida) {
    this.unlock('primer_corte');
    const k = [];
    if (data.caso === 'ideal') {
      k.push('ideal'); S.racha++;
      if (data.esperas > 0) { k.push('esperaBien'); this.unlock('paciencia'); }
      if (data.n === 1 && primeraValida) { k.push('primera'); this.unlock('primera'); }
      if (S.racha >= 3) this.unlock('racha');
    } else { k.push('aprender'); S.racha = 0; }
    if (data.usoRegla) { k.push('regla'); this.unlock('lupa'); }
    if (vistas.size >= 3) k.push('vistas');
    if (['frente', 'lado', 'atras', 'arriba'].every(v => vistas.has(v))) this.unlock('vuelta');
    this.add(k);
  }
};
function updateRewardsBtn() {
  const b = $('#btnRewards');
  b.innerHTML = `${ART.icon.petalo}<span>${S.puntos}</span>`;
  b.setAttribute('aria-label', `${T.ui.misLogros}: ${S.puntos} ${T.recompensas.unidad}`);
}
function clasificar(r) {
  if ((r.tallo || 55) < 40) return 'tallo';
  if (r.punto === 1) return 'cerrada';
  if (r.punto === 2) return 'ideal';
  return r.overWait ? 'demas' : 'abierta';
}
function markSeen(caso) {
  if (!caso || S.vistos.has(caso)) return;
  S.vistos.add(caso);
  Rewards.add(['perspectiva']);
  addNote(fmt(T.perspectivas.nota.replace('{caso}', T.perspectivas.casos[caso].titulo.toLowerCase())), T.perspectivas.casos[caso].ok ? 'ok' : 'no', true);
  const v = S.vistos;
  if (v.has('cerrada') && v.has('ideal') && (v.has('abierta') || v.has('demas'))) Rewards.unlock('finales');
  if (T.perspectivas.orden.every(c => v.has(c))) Rewards.unlock('perspectivas');
}
function rewardsHTML() {
  const R = T.recompensas, N = R.niveles, i = Rewards.nivelIdx(), next = N[i + 1];
  const pct = next ? Math.round((S.puntos - N[i].min) / (next.min - N[i].min) * 100) : 100;
  const msg = next ? fmt(R.faltan.replace('{n}', next.min - S.puntos).replace('{nivel}', next.nombre)) : R.maximo;
  const ids = Object.keys(R.insignias), on = ids.filter(id => S.insignias.includes(id)), off = ids.filter(id => !S.insignias.includes(id));
  const li = (id, got) => { const b = R.insignias[id]; return `<li class="${got ? '' : 'off'}"><span class="medal ${got ? '' : 'off'}">${ART.icon[b.icono]}${got ? '' : `<span class="lock">${ART.icon.candado}</span>`}</span><div><b>${esc(b.nombre)}</b><span>${esc(got ? b.desc : R.bloqueada + '. ' + b.desc)}</span></div></li>`; };
  return `<div class="lvl"><small>${esc(R.nivel)} ${i + 1} de ${N.length}</small><b>${esc(fmt(N[i].nombre))}</b><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div><small>${S.puntos} ${esc(R.unidad)}. ${esc(msg)}</small></div>` +
    `<h3 style="margin:0 0 8px">${esc(R.insigniasTitulo)}: ${on.length} de ${ids.length}</h3><ul class="badges">${on.map(id => li(id, true)).join('')}${off.map(id => li(id, false)).join('')}</ul>`;
}
function openRewards() {
  AUDIO.sfx('pagina');
  $('#rwTitle').textContent = T.recompensas.titulo; $('#rwClose').textContent = T.ui.cerrar;
  $('#rwBody').innerHTML = rewardsHTML();
  $('#rewards').hidden = false; Paused = true; $('#rwClose').focus();
}
function closeRewards() { $('#rewards').hidden = true; if ($('#pause').hidden) Paused = false; }

/* =====================================================================
   PERSPECTIVAS: cómo vive cada caso la rosa, la clienta y la finca
   ===================================================================== */
function casoIllu(caso) {
  const vb = '-50 -70 100 170', y = 'yaw: .5';
  const lbl = (t, yy) => `<text x="0" y="${yy}" text-anchor="middle" font-size="10" font-weight="900" fill="#A3102A" font-family="Nunito, system-ui, sans-serif">${t}</text>`;
  let svg;
  if (caso === 'tallo') svg = ART.roseSVG({ o: 1.3, yaw: .5, stem: 50 }, vb, `<line x1="-26" x2="26" y1="92" y2="92" stroke="#A3102A" stroke-width="2" stroke-dasharray="4 3"/>${lbl('40 cm', 87)}`);
  else if (caso === 'olvido') svg = ART.roseSVG({ o: 1.05, yaw: .5, stem: 95 }, vb);
  else { const p = caso === 'cerrada' ? 1 : caso === 'ideal' ? 2 : 3; svg = ART.roseSVG(Object.assign({ yaw: .5, stem: 90 }, journeyRose(p, 1.5)), vb); }
  return svg.replace('<svg class=""', '<svg class="ill"');
}
async function perspectiveCard(caso, { repaso = false } = {}) {
  const P = T.perspectivas, C = P.casos[caso];
  const ov = document.createElement('div'); ov.className = 'overlay scrim';
  const voces = [['rosa', 'rosa', 'neutral'], ['cliente', 'camila', C.ok ? 'feliz' : 'triste'], ['finca', 'aurelio', C.ok ? 'feliz' : 'pensativo']];
  ov.innerHTML = `<div class="panel persp ${C.ok ? 'ok' : 'bad'}" role="dialog" aria-modal="true" aria-labelledby="pt"><div class="head">${casoIllu(caso)}<div>${repaso ? `<span class="rep">${esc(P.repaso)}</span>` : ''}<span class="tagline">${C.ok ? ART.icon.ok : ART.icon.no}${esc(P.titulo)}</span><h2 id="pt">${esc(C.titulo)}</h2></div></div>` +
    `<ul class="voices">${voces.map(([k, who, m]) => `<li><span class="pf">${ART.portrait(who, m)}</span><div><b>${esc(P.quien[k])}</b><span>${esc(fmt(C[k]))}</span></div></li>`).join('')}</ul><button class="btn accent wide">${esc(T.ui.continuar)}</button></div>`;
  $('#app').appendChild(ov);
  AUDIO.sfx(C.ok ? 'exito' : 'error');
  const b = ov.querySelector('button'); b.focus();
  try { await waitClick(b); } finally { ov.remove(); }
  AUDIO.sfx('click');
  markSeen(caso);
}
async function roundCard(roses, cuts) {
  const L = T.retos.rondaLinea;
  const items = roses.map(r => {
    const c = cuts.find(x => x.rose === r); let k, ok;
    if (c) { k = c.caso === 'demas' ? 'abierta' : c.caso; ok = c.caso === 'ideal'; }
    else if (r.bien) { k = 'olvido'; ok = false; } else { k = 'bien'; ok = true; }
    return `<li class="${ok ? 'ok' : 'bad'}"><span class="ic">${ok ? ART.icon.ok : ART.icon.no}</span><span>${esc(T.cap2.etiquetaRosa)} ${r.id}: ${esc(L[k])}</span></li>`;
  }).join('');
  const ov = document.createElement('div'); ov.className = 'overlay scrim';
  ov.innerHTML = `<div class="panel" role="dialog" aria-modal="true" aria-labelledby="rt"><h2 id="rt">${esc(T.retos.rondaTitulo)}</h2><ul class="round-list">${items}</ul><button class="btn accent wide">${esc(T.ui.continuar)}</button></div>`;
  $('#app').appendChild(ov);
  const b = ov.querySelector('button'); b.focus();
  try { await waitClick(b); } finally { ov.remove(); }
  AUDIO.sfx('click');
}

/* =====================================================================
   CAPÍTULO 6: RETOS DE LA FINCA
   ===================================================================== */
async function retoBanner(i, total, reto) {
  const R = T.retos;
  $('#banSmall').textContent = `${R.etiqueta} ${i + 1} ${R.de} ${total}`;
  $('#banTitle').textContent = reto.titulo;
  $('#banSub').hidden = false;
  $('#banSub').innerHTML = `<span class="dif">${[1, 2, 3].map(k => ART.icon.flor.replace('<svg', `<svg class="${k <= reto.dificultad ? 'on' : ''}"`)).join('')} ${esc(R.dificultad)}: ${esc(R.niveles[reto.dificultad])}</span>`;
  const card = $('#banner .card'); card.classList.add('reto-card');
  $('#banner').hidden = false;
  try { await wait(2000); } finally { $('#banner').hidden = true; card.classList.remove('reto-card'); }
}
async function playBed(reto, reg, sol) {
  const varias = reto.modo === 'varias';
  const roses = shuffle(reto.rosas).map((r, i) => ({
    id: 'ABCDE'[i], punto: r.punto, puntoInicial: r.punto, oOverride: r.o ?? null, tallo: r.tallo || 55, variedad: r.variedad || 'roja',
    yaw: [.4, -.6, 1.2, 2.2, -1.6][i], esperas: 0, bien: reto.rosas.length === 1 || r.punto === 2 && (r.tallo || 55) >= 40
  }));
  const intento = { tipo: 'reto', retoId: reto.id, modo: reto.modo, n: reg.intentos, inicio: performance.now(), abiertas: 0, rosasVistas: new Set(), vistas: new Set(), usoZoom: false, usoRegla: false, esperas: 0, noWait: varias };
  const bed = document.createElement('div'); bed.className = 'bed';
  const hint = reto.ayuda || (roses.length === 1 ? T.retos.ayudaUna : T.cap2.ayudaCama);
  bed.innerHTML = `<div class="bed-hint">${esc(hint)}</div><div class="bed-row ${roses.length === 1 ? 'una' : ''}">${roses.map(r => {
    const mk = sol && r.bien;
    return `<button class="bed-rose${mk ? ' sol' : ''}" data-id="${r.id}" aria-label="${esc(T.cap2.etiquetaRosa)} ${r.id}${mk ? ', ' + esc(T.retos.marca) : ''}">${mk ? `<span class="solTag">${esc(T.retos.marca)}</span>` : ''}${bedRoseSVG(r)}<span class="tag">${esc(T.cap2.etiquetaRosa)} ${r.id}</span></button>`;
  }).join('')}</div>` + (varias ? `<div class="bed-foot"><span class="timer">${ART.icon.reloj}<span id="tmr">0 s</span><small>${esc(T.retos.meta)}</small></span><button class="btn primary" id="btnRound">${esc(T.retos.terminarRonda)}</button></div>` : '');
  $('#ui').appendChild(bed);
  if (varias) { const t0 = performance.now(); Loops.start('timer', now => { const el = document.getElementById('tmr'); if (el) el.textContent = Math.floor((now - t0) / 1000) + ' s'; }); }
  const cortes = [];
  const result = await cancellable(resolve => {
    bed.querySelectorAll('.bed-rose').forEach(btn => btn.onclick = () => {
      const r = roses.find(x => x.id === btn.dataset.id);
      if (r.cortada) return;
      AUDIO.sfx('click');
      Observe.open(r, intento, btn, cut => {
        if (!varias) return resolve({ cuts: [cut] });
        r.cortada = true; btn.classList.add('taken'); btn.setAttribute('aria-disabled', 'true'); cortes.push(cut);
      });
    });
    if (varias) $('#btnRound').onclick = () => { AUDIO.sfx('click'); resolve({ cuts: cortes }); };
  });
  Loops.stop('timer');
  lockBed(bed);
  const seg = (performance.now() - intento.inicio) / 1000;
  const casos = result.cuts.map(c => c.caso);
  const olvidos = varias ? roses.filter(r => r.bien && !r.cortada) : [];
  olvidos.forEach(() => casos.push('olvido'));
  const perfecto = casos.length > 0 && casos.every(c => c === 'ideal');
  reg.cortes = (reg.cortes || []).concat(casos); reg.olvidos = (reg.olvidos || 0) + olvidos.length; reg.tiempoSeg = Math.round(seg);
  if (!varias) { const b = bed.querySelector(`[data-id="${result.cuts[0].rose.id}"]`); if (b) b.classList.add('cut'); await wait(700); }
  bed.remove();
  if (varias) {
    await roundCard(roses, result.cuts);
    for (const c of [...new Set(casos)]) if (!S.vistos.has(c)) await perspectiveCard(c);
  } else await perspectiveCard(casos[0]);
  return { perfecto, seg };
}
async function runReto(reto, i, total) {
  const reg = { id: reto.id, titulo: reto.titulo, dificultad: reto.dificultad, intentos: 0, superado: false, conAyuda: false };
  S.retos.push(reg);
  let fallos = 0;
  const aurelio = mood => Stage.set([{ key: 'aurelio', x: 200, mood }]);
  for (;;) {
    reg.intentos++;
    const sol = fallos >= 2;
    await transition(() => { setBg('invernadero'); $('#ui').innerHTML = ''; aurelio('neutral'); }, 360);
    AUDIO.setMood(reto.dificultad >= 3 ? 'viaje' : 'decision');
    if (reg.intentos === 1) { await retoBanner(i, total, reto); await lines(reto.intro); }
    else if (sol) { reg.conAyuda = true; await say('aurelio', reto.solucion, 'pensativo'); }
    else await say('aurelio', reto.pistas[(fallos - 1) % reto.pistas.length], 'pensativo');
    hideDialog(); Stage.clear();
    const res = await playBed(reto, reg, sol);
    if (res.perfecto) {
      reg.superado = true;
      const k = ['reto'];
      if (reto.id === 'tallo') Rewards.unlock('tallo');
      if (reto.id === 'variedad') Rewards.unlock('variedad');
      if (reto.modo === 'varias') { k.push('ronda'); Rewards.unlock('ronda'); if (res.seg <= 60) { k.push('rapido'); Rewards.unlock('rapido'); } }
      Rewards.add(k);
      await transition(() => aurelio('feliz'), 300);
      await say('aurelio', reto.exito, 'feliz');
      return;
    }
    fallos++;
    if (fallos >= 3) { await transition(() => aurelio('feliz'), 300); await say('aurelio', T.retos.seguir, 'feliz'); return; }
  }
}
async function chapterRetos() {
  AUDIO.setMood('finca'); AUDIO.setAmbience('sala');
  await transition(() => { setBg('invernadero'); $('#ui').innerHTML = ''; Stage.set([{ key: 'aurelio', x: 200, mood: 'feliz' }]); });
  await chapterBanner(6);
  await lines(T.retos.intro);
  const L = T.retos.lista;
  for (let i = 0; i < L.length; i++) await runReto(L[i], i, L.length);
  Rewards.unlock('maestro');
  await transition(() => { setBg('invernadero'); $('#ui').innerHTML = ''; Stage.set([{ key: 'aurelio', x: 200, mood: 'feliz' }]); });
  await lines(T.retos.fin);
  /* repaso obligatorio: todo caso que no le tocó al jugador se muestra aquí */
  const faltan = T.perspectivas.orden.filter(c => !S.vistos.has(c));
  if (faltan.length) {
    await lines(T.retos.repaso);
    hideDialog();
    for (const c of faltan) await perspectiveCard(c, { repaso: true });
  }
  hideDialog();
}

/* secciones extra del resumen final */
function summaryExtras() {
  const F = T.final, R = T.recompensas, i = Rewards.nivelIdx();
  const badges = S.insignias.map(id => { const b = R.insignias[id]; return `<figure><span class="medal">${ART.icon[b.icono]}</span><figcaption>${esc(b.nombre)}</figcaption></figure>`; }).join('');
  const retos = S.retos.map(r => `<li class="${r.superado && !r.conAyuda ? 'ok' : 'bad'}"><span class="ic">${r.superado && !r.conAyuda ? ART.icon.ok : ART.icon.no}</span><span>${esc(r.titulo)}<small>${esc(T.retos.dificultad)} ${esc(T.retos.niveles[r.dificultad])}, ${r.intentos} ${esc(F.intentos)}, ${esc(r.superado && !r.conAyuda ? F.superado : F.noSuperado)}</small></span></li>`).join('');
  const checks = T.perspectivas.orden.map(c => `<li>${S.vistos.has(c) ? ART.icon.ok : ART.icon.no}${esc(T.perspectivas.casos[c].titulo)}</li>`).join('');
  return `<div class="sum-sec"><h3>${esc(F.logrosTitulo)}</h3><div class="lvl"><small>${esc(R.nivel)} ${i + 1} de ${R.niveles.length}</small><b>${esc(fmt(R.niveles[i].nombre))}</b><small>${S.puntos} ${esc(R.unidad)}, ${S.insignias.length} de ${Object.keys(R.insignias).length} insignias</small></div><div class="mini-badges">${badges}</div></div>` +
    (retos ? `<div class="sum-sec"><h3>${esc(F.retosTitulo)}</h3><ul class="attempts">${retos}</ul></div>` : '') +
    `<div class="sum-sec"><h3>${esc(F.perspectivasTitulo)}</h3><ul class="checks">${checks}</ul></div>`;
}

wire();
showTitle();

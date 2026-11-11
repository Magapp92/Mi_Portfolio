
/* Contenido de la página de detalle de cada proyecto, por el mismo id que
en proyectos.js. Si imagen está vacía dejamos el hueco para la captura que indica la etiqueta */
export const PROYECTOS_DETALLE = {
    pawcare: {
        titulo: 'PawCare',
        subtitulo: 'Plataforma de reservas para el cuidado de mascotas',
        intro: 'PawCare conecta a dueños de mascotas con cuidadores particulares y profesionales para guardería de día, estancias largas, paseos o peluquería. Es una aplicación Full Stack completa: la diseñé, la desarrollé de principio a fin y la publiqué en producción.',
        portada: { imagen: '/assets/pawcare-portada.webp', etiqueta: 'Captura: página de inicio de PawCare' },
        tecnologias: ['React', 'Vite', 'React Router', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Vercel'],
        enlaces: [
            { id: 'web', texto: 'Ver la web', url: 'https://paw-care-react.vercel.app' },
            { id: 'front', texto: 'Código del front', url: 'https://github.com/Magapp92/pawCareReact' },
            { id: 'api', texto: 'Código de la API', url: 'https://github.com/Magapp92/pawCareApi' }
        ],
        idea: 'La idea parte de las webs de reserva de servicios y actividades: buscar, comparar y reservar en pocos pasos, pero pensado para quienes cuidan de nuestros peludos. La plataforma tiene dos tipos de usuario:',
        perfiles: [
            { id: 'duenos', titulo: 'Dueños de mascotas', texto: 'Buscan cuidador por ciudad, servicio o animal, reservan, gestionan las fichas de sus mascotas y hablan con el cuidador desde cada reserva.' },
            { id: 'cuidadores', titulo: 'Cuidadores', texto: 'Gestionan desde su panel las solicitudes recibidas, sus servicios y tarifas, y responden a los usuarios.' }
        ],
        recorrido: { titulo: 'Recorrido por la app', pasos: [
            { id: 'login', titulo: 'Login', texto: 'Acceso con correo, contraseña y tipo de perfil. La sesión se guarda con un token JWT y cada rol entra en su propio espacio.', imagen: '/assets/proyecto-pawcare.webp', etiqueta: 'Captura: login' },
            { id: 'buscador', titulo: 'Buscador', texto: 'Filtros por ubicación, servicio y tipo de animal. Desde cada tarjeta se puede reservar sin salir de la página.', imagen: '/assets/pawcare-buscador.webp', etiqueta: 'Captura: buscador de cuidadores' },
            { id: 'cuidador', titulo: 'Perfil del cuidador', texto: 'Información, servicios con precios y un carrusel con las opiniones de otros usuarios.', imagen: '/assets/pawcare-cuidador.webp', etiqueta: 'Captura: perfil público del cuidador' },
            { id: 'reserva', titulo: 'Reserva', texto: 'Un modal para elegir mascotas, servicio y fechas. No admite días pasados y avisa si falta la mascota.', imagen: '/assets/pawcare-reserva.webp', etiqueta: 'Captura: modal de reserva' },
            { id: 'perfil', titulo: 'Mi perfil', texto: 'Datos personales y gestión completa de mascotas, cada una con su foto, especie, raza y vacunación.', imagen: '/assets/pawcare-perfil.webp', etiqueta: 'Captura: perfil de usuario' },
            { id: 'reservas', titulo: 'Mis reservas', texto: 'Editar, cancelar o valorar cada reserva, con un hilo de mensajes con el cuidador que se actualiza solo.', imagen: '/assets/pawcare-reservas.webp', etiqueta: 'Captura: mis reservas' },
            { id: 'panel', titulo: 'Panel del cuidador', texto: 'Solicitudes pendientes y confirmadas, edición del perfil, servicios y tarifas, y bandeja de mensajes.', imagen: '/assets/pawcare-panel.webp', etiqueta: 'Captura: panel del cuidador' }
        ] },
        construccion: [
            { id: 'front', titulo: 'Frontend', texto: 'SPA en React con Vite y React Router. La sesión vive en un Context, todas las peticiones pasan por una función común que comprueba la respuesta y las rutas privadas se protegen según el rol.' },
            { id: 'api', titulo: 'API', texto: 'API REST con Express y MongoDB (Mongoose) sobre cuatro colecciones: login, cuidadores, perfiles y reservas. Las rutas de escritura exigen token JWT, helmet, cors y morgan cubren seguridad y registro, y un middleware centraliza los errores.' },
            { id: 'despliegue', titulo: 'Despliegue', texto: 'Front y API publicados en Vercel, con MongoDB Atlas como base de datos en producción.' }
        ],
        flujos: {
            titulo: 'Flujos de la app',
            texto: 'Así se mueve cada tipo de usuario por la aplicación, desde el login hasta la gestión de reservas y mascotas. Pulsa un diagrama para verlo a tamaño completo.',
            diagramas: [
                { id: 'completo', titulo: 'Esquema completo: del login al final', imagen: '/assets/pawcare-flujo-completo.webp' },
                { id: 'sesion', titulo: 'Sesión y navegación', imagen: '/assets/pawcare-flujo-sesion.webp' },
                { id: 'reserva', titulo: 'Ciclo de vida de una reserva', imagen: '/assets/pawcare-flujo-reserva.webp' },
                { id: 'mascotas', titulo: 'Gestión de mascotas', imagen: '/assets/pawcare-flujo-mascotas.webp' }
            ]
        },
        diseno: 'Un verde cálido y natural como color principal, con fondos suaves en azul cielo que aportan luminosidad. Diseñé el logo y las ilustraciones en Illustrator y optimicé las imágenes en Photoshop.',
        colores: [
            { id: 'principal', nombre: 'Principal', hex: '#00b527' },
            { id: 'oscuro', nombre: 'Principal oscuro', hex: '#007219' },
            { id: 'secundario', nombre: 'Verde secundario', hex: '#4dbe31' },
            { id: 'cielo', nombre: 'Cielo', hex: '#EBF2FF' },
            { id: 'fondo', nombre: 'Fondo', hex: '#f8f9ff' },
            { id: 'texto', nombre: 'Texto', hex: '#3e4547' }
        ],
        tipografias: 'Plus Jakarta Sans para títulos y Work Sans para el texto, alojadas en local.',
        logo: { imagen: '/assets/pawcare-logo.webp', etiqueta: 'Logo de PawCare' },
        reto: {
            titulo: 'Retos y segunda versión',
            texto: 'El mayor reto fue crear una reserva desde un único endpoint manteniendo sincronizadas las colecciones de reservas, perfiles y cuidadores.',
            intro: 'Tras la primera evaluación revisé la aplicación a fondo y publiqué una segunda versión más sólida:',
            lista: [
                { id: 'jwt', texto: 'Autenticación con token JWT en todas las rutas de escritura.' },
                { id: 'conexion', texto: 'Conexión con la base de datos comprobada en cada petición: si no responde, la app lo explica en lugar de quedarse esperando.' },
                { id: 'validacion', texto: 'Validación de datos en las actualizaciones y control de errores que llega hasta la interfaz.' },
                { id: 'mensajes', texto: 'Mensajes convertidos en un hilo con fecha que se actualiza cada quince segundos.' }
            ],
            metricas: [
                { id: 'desktop', valor: '100', texto: 'Rendimiento en escritorio' },
                { id: 'mobile', valor: '96', texto: 'Rendimiento en móvil' }
            ],
            nota: 'Puntuaciones de Lighthouse, gracias a imágenes WebP con carga diferida y tipografías alojadas en local.'
        },
        conclusion: 'PawCare me permitió unir frontend y backend en una aplicación real: decidir la arquitectura, resolver problemas de datos y probarla a fondo en local y en producción. Es el proyecto que mejor resume mi salto al desarrollo Full Stack.'
    },

    buscatupeli: {
        titulo: 'Busca tu peli',
        subtitulo: 'Dónde ver cada película, sin recorrer todas las plataformas',
        icono: 'rollo',
        intro: 'Busca tu peli reúne en una sola web 140 películas disponibles en Netflix, Prime Video, Disney+, Max y Apple TV+, con enlace directo a cada plataforma. Es una aplicación completa con API propia y base de datos, contenido que se renueva solo cada semana y comunicación con los usuarios por correo.',
        portada: { imagen: '/assets/buscatupeli-portada.webp', etiqueta: 'Captura: página de inicio de Busca tu peli' },
        tecnologias: ['HTML', 'CSS (SUIT)', 'JavaScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'JWT', 'TMDB', 'Brevo', 'Netlify'],
        enlaces: [
            { id: 'web', texto: 'Ver la web', url: 'https://buscatupeli.com' },
            { id: 'codigo', texto: 'Ver el código', url: 'https://github.com/Magapp92/Busca-tu-peli' }
        ],
        idea: 'Saber dónde ver una película suele obligar a entrar en cada plataforma una a una. Busca tu peli lo resuelve en un solo sitio: buscas la película, ves en qué plataformas está y entras directamente. Además, los usuarios pueden recomendar películas para ampliar el catálogo.',
        recorrido: { titulo: 'Recorrido por la web', pasos: [
            { id: 'inicio', titulo: 'Inicio', texto: 'Carrusel con las películas añadidas recientemente (también con el dedo), plataformas con su número de películas, filas por género y últimas noticias.', imagen: '/assets/buscatupeli-inicio.webp', etiqueta: 'Captura: inicio' },
            { id: 'catalogo', titulo: 'Catálogo', texto: 'Todas las películas, con filtros combinables por plataforma, género y orden que se guardan en la URL.', imagen: '/assets/buscatupeli-catalogo.webp', etiqueta: 'Captura: catálogo con filtros' },
            { id: 'pelicula', titulo: 'Película', texto: 'Ficha completa: tráiler, dónde verla con enlace a cada plataforma, reparto, ficha técnica y películas relacionadas.', imagen: '/assets/buscatupeli-pelicula.webp', etiqueta: 'Captura: ficha de película' },
            { id: 'noticias', titulo: 'Noticias', texto: 'Rankings con datos reales de TMDB que se actualizan solos cada lunes.', imagen: '/assets/buscatupeli-noticias.webp', etiqueta: 'Captura: noticias' },
            { id: 'recomendar', titulo: 'Recomendar', texto: 'Formulario que guarda la sugerencia, envía un correo de agradecimiento y avisa al equipo.', imagen: '/assets/buscatupeli-recomendar.webp', etiqueta: 'Captura: formulario de recomendación' },
            { id: 'buscador', titulo: 'Buscador', texto: 'En la cabecera de todas las páginas, con sugerencias en vivo por título, actor o director.', imagen: '/assets/buscatupeli-buscador.webp', etiqueta: 'Captura: buscador con sugerencias' },
            { id: 'admin', titulo: 'Administración', texto: 'Panel con clave para gestionar películas, noticias y sugerencias, e importar películas desde TMDB con un clic.', imagen: '/assets/buscatupeli-admin.webp', etiqueta: 'Captura: acceso al panel de administración' }
        ] },
        funcionalidades: [
            { id: 'tmdb', titulo: 'Catálogo desde TMDB', texto: 'Una selección propia más las 30 películas más populares de cada plataforma en España. Desde el panel se añade cualquier película con su ficha, el tráiler en español y sus plataformas.' },
            { id: 'noticias', titulo: 'Noticias cada lunes', texto: 'Una función programada genera cada semana los rankings de las más populares y las mejor valoradas de cada plataforma, con póster, nota y enlace a su ficha.' },
            { id: 'correo', titulo: 'Newsletter y avisos', texto: 'Suscripción con doble confirmación y baja con un clic. Quien recomienda una película recibe un agradecimiento y un aviso cuando se añade al catálogo.' }
        ],
        construccion: [
            { id: 'front', titulo: 'Frontend', texto: 'HTML semántico, CSS con metodología SUIT (un archivo por página y componente) y JavaScript sin frameworks. Cada pantalla pide a la API solo lo que necesita y la pinta al momento.' },
            { id: 'api', titulo: 'API', texto: 'API REST con Express 5 y MongoDB Atlas (Mongoose), organizada en rutas, controladores, modelos y middlewares. Todas las respuestas tienen la forma { message, data } y el panel usa tokens JWT de 8 horas.' },
            { id: 'despliegue', titulo: 'Servicios y despliegue', texto: 'Netlify aloja la web y ejecuta la API como función serverless. TMDB aporta los datos de las películas y Brevo envía los correos desde info@buscatupeli.com.' }
        ],
        flujos: {
            titulo: 'Arquitectura',
            texto: 'El navegador carga las páginas y pide los datos a la API. La API y la función de los lunes leen y guardan en MongoDB Atlas, consultan TMDB y envían los correos con Brevo.',
            diagramas: [
                { id: 'arquitectura', titulo: 'La web, su API y los servicios externos', imagen: '/assets/buscatupeli-arquitectura.webp', ampliable: false }
            ]
        },
        diseno: 'Un diseño oscuro y cinematográfico, como el de las propias plataformas de streaming, con el turquesa de la marca como acento en botones, enlaces y elementos activos. Los colores se definen como custom properties comunes a todas las páginas.',
        colores: [
            { id: 'fondo', nombre: 'Fondo', hex: '#07090d' },
            { id: 'superficie', nombre: 'Superficie', hex: '#0f141b' },
            { id: 'texto', nombre: 'Texto', hex: '#eef2f6' },
            { id: 'secundario', nombre: 'Texto secundario', hex: '#93a0b0' },
            { id: 'acento', nombre: 'Turquesa de marca', hex: '#07c5d6' },
            { id: 'nota', nombre: 'Nota y avisos', hex: '#ffc857' }
        ],
        tipografias: 'Outfit para títulos e Inter para el texto, en WOFF2 y servidas desde la propia web: ningún servicio externo recibe la IP del visitante.',
        logo: { imagen: '/assets/buscatupeli-logo.webp', etiqueta: 'Logo de Busca tu peli' },
        reto: {
            titulo: 'Seguridad, rendimiento y comprobaciones',
            texto: 'Al recoger emails y tener un panel de administración público, la seguridad y la privacidad no podían ser un añadido final.',
            intro: 'La web se protegió desde el principio:',
            lista: [
                { id: 'login', texto: 'Login con token JWT de 8 horas y bloqueo de 15 minutos tras 10 intentos fallidos.' },
                { id: 'csp', texto: 'Política de seguridad de contenidos (CSP), cabeceras contra clickjacking y CORS limitado al propio dominio.' },
                { id: 'spam', texto: 'Formularios con límite de envíos por hora, campo trampa para bots y longitud máxima en cada campo.' },
                { id: 'rgpd', texto: 'Cumplimiento del RGPD: política de privacidad, consentimiento expreso y sin cookies de seguimiento.' }
            ],
            extra: {
                intro: 'Después la optimicé con Lighthouse. En escritorio, el rendimiento pasó de 82 a 99, la accesibilidad de 92 a 100 y el SEO de 91 a 100; el peso de la portada bajó de 8,5 MB a 2,1 MB:',
                lista: [
                    { id: 'carrusel', texto: 'Carga prioritaria del carrusel: se pinta en cuanto llegan sus películas y el resto de la portada se pide después de ver su primera imagen.' },
                    { id: 'bajo-demanda', texto: 'Imágenes del carrusel bajo demanda: solo se descarga la primera diapositiva y cada una de las demás justo antes de mostrarse.' },
                    { id: 'tamanos', texto: 'Imágenes del tamaño justo: fondos de 1280 px hasta Full HD, pósters de 185, 342 o 500 px según la tarjeta y decodificación asíncrona.' },
                    { id: 'preconnect', texto: 'Conexión anticipada (preconnect) con el servidor de imágenes de TMDB.' },
                    { id: 'accesibilidad', texto: 'Accesibilidad: contraste mínimo de 4,5:1 en los textos secundarios, buscador declarado como combobox y diapositivas ocultas con inert para que no reciban el foco.' },
                    { id: 'seo', texto: 'SEO: el enlace «Más información» incluye el título de la película para lectores de pantalla.' }
                ]
            },
            metricas: [
                { id: 'escritorio', valor: '99', texto: 'Rendimiento en escritorio' },
                { id: 'movil', valor: '97', texto: 'Rendimiento en móvil' },
                { id: 'cien', valor: '100', texto: 'Accesibilidad, prácticas y SEO' }
            ],
            nota: 'Puntuaciones de Lighthouse en escritorio y móvil.'
        },
        conclusion: 'Busca tu peli me enseñó a separar frontend y backend, diseñar una API REST e integrar servicios de terceros, y a resolver problemas reales de producción al desplegar en Netlify. Mantener una forma de escribir coherente, con SUIT en el CSS y una API ordenada por rutas, controladores y modelos, hizo el código más fácil de entender y de modificar.'
    },

    portaldental: {
        titulo: 'PortalDental',
        subtitulo: 'Tu clínica dental y tu historial, siempre contigo',
        icono: 'diente',
        intro: 'PortalDental es una app móvil para encontrar la clínica dental que mejor se adapta a cada paciente, por especialidad, cercanía y valoraciones, gestionar las citas y tener siempre a mano el historial dental. Es mi proyecto del curso de UX/UI: lo investigué, diseñé y prototipé de principio a fin, junto con una landing para pacientes y clínicas.',
        portada: { imagen: '/assets/portaldental-portada.webp', etiqueta: 'Landing de PortalDental', natural: true },
        tecnologias: ['Figma', 'FigJam', 'Design Thinking', 'Doble diamante', 'Maze', 'Google Forms', 'WCAG'],
        enlaces: [
            { id: 'app', texto: 'Prototipo de la app', url: 'https://www.figma.com/proto/wby1H6xaT5TITH20rIbDYH/App-PortalDental?node-id=68-868&p=f&t=4dpmRFNEhkQZootQ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A19&show-proto-sidebar=1' },
            { id: 'landing', texto: 'Prototipo de la landing', url: 'https://www.figma.com/proto/wby1H6xaT5TITH20rIbDYH/App-PortalDental?node-id=94-1596&p=f&t=JYGI13a4l3Iyq6pz-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=94%3A1596&show-proto-sidebar=1' },
            { id: 'design-thinking', texto: 'Design Thinking', url: 'https://www.figma.com/board/r0f6HL9ekt2FPp6wZA58nl/Design-thinking-PortalDental?node-id=0-1&t=Do7ISXd6wFo0QRHT-1' }
        ],
        idea: 'Ninguna app dental permitía consultar el historial clínico, los tratamientos y las citas en un mismo sitio, ni llevarlos de una clínica a otra. La investigación lo confirmó: el 58,1 % de los encuestados busca clínica por internet y el 59,5 % querría descargar su historial. A partir de ahí definí dos perfiles de usuario:',
        perfiles: [
            { id: 'maria', titulo: 'María, 29 años', texto: 'Ejecutiva con la agenda llena. Quiere encontrar clínicas cercanas con buenas valoraciones, pedir cita desde el móvil sin llamar y tener su historial dental organizado.' },
            { id: 'carlos', titulo: 'Carlos, 45 años', texto: 'Padre de dos hijos. Necesita información clara de especialidades, como la ortodoncia infantil, gestionar las citas de toda la familia y recibir recordatorios.' }
        ],
        recorrido: { titulo: 'Recorrido por el prototipo', pasos: [
            { id: 'login', titulo: 'Inicio de sesión', texto: 'Acceso con correo y contraseña o con Facebook, Google y Apple, tras un onboarding que presenta la app.', imagen: '/assets/portaldental-login.webp', etiqueta: 'Pantalla de inicio de sesión' },
            { id: 'inicio', titulo: 'Favoritos y clínicas cercanas', texto: 'Las clínicas favoritas y un listado de las más cercanas que se filtra por especialidad, con horario, teléfono y dirección.', imagen: '/assets/portaldental-inicio.webp', etiqueta: 'Pantalla de inicio' },
            { id: 'citas', titulo: 'Mis citas', texto: 'Un calendario con las citas programadas y el registro de las anteriores, con clínica, fecha, tratamiento y estado.', imagen: '/assets/portaldental-citas.webp', etiqueta: 'Pantalla de citas' },
            { id: 'historial', titulo: 'Mi historial', texto: 'Última visita, tratamiento y profesional, un odontograma con las intervenciones marcadas y la descarga del historial dental.', imagen: '/assets/portaldental-historial.webp', etiqueta: 'Pantalla de historial dental' },
            { id: 'cuenta', titulo: 'Mi cuenta', texto: 'Datos personales y preferencias de búsqueda: especialidad, valoración mínima, cercanía, horario y días de apertura.', imagen: '/assets/portaldental-cuenta.webp', etiqueta: 'Pantalla de cuenta y preferencias' },
            { id: 'landing', titulo: 'Landing para pacientes', texto: 'Presenta la app y sus ventajas: encontrar la clínica que se adapta a ti y tener siempre a mano tu historial y tus visitas.', imagen: '/assets/portaldental-landing.webp', etiqueta: 'Landing para pacientes' },
            { id: 'landing-clinicas', titulo: 'Landing para clínicas', texto: 'Invita a las clínicas a unirse a la plataforma para ofrecer un mejor servicio y que sus pacientes gestionen sus citas.', imagen: '/assets/portaldental-landing-clinicas.webp', etiqueta: 'Landing para clínicas' }
        ] },
        funcionalidades: [
            { id: 'historial', titulo: 'Historial dental en el bolsillo', texto: 'Consulta y descarga del historial y de los tratamientos, sea cual sea la clínica, para seguir un tratamiento aunque estés fuera de casa.' },
            { id: 'busqueda', titulo: 'La clínica que necesitas', texto: 'Búsqueda por especialidad, cercanía y valoraciones de otros pacientes, con la ficha completa de cada clínica.' },
            { id: 'citas', titulo: 'Citas sin llamadas', texto: 'Pedir, cambiar o anular una cita desde la app, con un calendario de citas y recordatorios.' }
        ],
        construccionTitulo: 'Cómo lo diseñé',
        construccion: [
            { id: 'observar', titulo: 'Observar', texto: 'Desk research, netnografía, encuesta en Google Forms, entrevista a un director de clínica dental, DAFO y benchmarking con apps como ZocDoc o SmileMate.' },
            { id: 'sintetizar', titulo: 'Sintetizar', texto: 'User personas, mapas de empatía, customer journeys y matrices de necesidades para entender qué falla hoy al buscar dentista.' },
            { id: 'idear', titulo: 'Idear', texto: 'Insights, ideas en clusters, matriz de utilidad y viabilidad, In & Out, MoSCoW, propuesta de valor y business model canvas.' },
            { id: 'prototipar', titulo: 'Diseñar y prototipar', texto: 'Moodboard, wireframes, sitemap, flowchart, foundations, UI kit, branding y prototipo interactivo de la app y la landing en Figma.' }
        ],
        flujos: {
            titulo: 'Investigación y arquitectura',
            texto: 'De los usuarios a la estructura de la app: user personas, wireframes del papel a la cuadrícula, mapa del sitio y flujo de navegación. Pulsa un diagrama para verlo a tamaño completo.',
            anchos: true,
            diagramas: [
                { id: 'persona', titulo: 'User personas', imagen: '/assets/portaldental-persona.webp' },
                { id: 'wireframes', titulo: 'Wireframes', imagen: '/assets/portaldental-wireframes.webp' },
                { id: 'sitemap', titulo: 'Sitemap', imagen: '/assets/portaldental-sitemap.webp' },
                { id: 'flowchart', titulo: 'Flowchart', imagen: '/assets/portaldental-flowchart.webp' }
            ]
        },
        diseno: 'El branding transmite accesibilidad, confianza y facilidad: "Portal" es la puerta de entrada al cuidado bucal. Una paleta de azules limpios y luminosos, propia del ámbito sanitario, con un azul intenso para las acciones principales.',
        colores: [
            { id: 'principal', nombre: 'Azul principal', hex: '#0D76BC' },
            { id: 'cielo', nombre: 'Azul cielo', hex: '#D0E6F4' },
            { id: 'fondo', nombre: 'Fondo', hex: '#E0E9EF' },
            { id: 'texto', nombre: 'Texto', hex: '#2B2D37' }
        ],
        tipografias: 'Averia Serif Libre en negrita para títulos y en regular para textos, y Averia Sans Libre para el onboarding.',
        logo: { imagen: '/assets/portaldental-logo.webp', etiqueta: 'Logo de PortalDental' },
        reto: {
            titulo: 'Accesibilidad y testing',
            texto: 'Una app sanitaria tiene que ser fácil para todo el mundo y ganarse la confianza del usuario, así que la diseñé siguiendo las pautas WCAG y la puse a prueba con usuarios reales en Maze.',
            intro: 'Las claves de accesibilidad:',
            lista: [
                { id: 'contraste', texto: 'Contraste entre fondo y texto siempre por encima de la proporción recomendada.' },
                { id: 'tipografia', texto: 'Texto de al menos 16 px para facilitar la lectura.' },
                { id: 'formularios', texto: 'Los formularios indican en qué paso estás y el menú marca la página actual.' },
                { id: 'vision', texto: 'Colores que mantienen la legibilidad para personas con problemas de visión.' }
            ],
            metricas: [
                { id: 'onboarding', valor: '100 %', texto: 'Ve sencillo el onboarding y el login' },
                { id: 'historial', valor: '95 %', texto: 'Ve sencillo explorar clínicas y descargar el historial' },
                { id: 'busqueda', valor: '58,1 %', texto: 'Busca su clínica por internet' }
            ],
            nota: 'Testing de usabilidad en Maze y encuesta previa en Google Forms. El test señaló como mejora la claridad del calendario al cancelar citas.'
        },
        conclusion: 'PortalDental me enseñó que una app clínica tiene que ganarse la confianza del usuario, y que el método del doble diamante, investigando antes de diseñar, es la forma de conseguirlo. Figma me permitió prototipar con todo detalle las interacciones para que el equipo de desarrollo entienda el producto.'
    },

    turismosinbarreras: {
        titulo: 'Turismo Sin Barreras',
        subtitulo: 'Los museos de Madrid, accesibles para todas las personas',
        icono: 'silla',
        intro: 'Turismo Sin Barreras es una app móvil para descubrir los museos y centros culturales de Madrid según su accesibilidad, calcular la ruta más accesible para llegar y organizar la visita con el propio museo. La acompaña una landing que presenta el servicio. Es un proyecto del curso de UX/UI, investigado con Design Thinking y prototipado en Figma.',
        portada: { imagen: '/assets/tsb-portada.webp', etiqueta: 'Landing de Turismo Sin Barreras', natural: true },
        tecnologias: ['Figma', 'FigJam', 'Design Thinking', 'Doble diamante', 'Google Forms', 'Diseño accesible'],
        enlaces: [
            { id: 'app', texto: 'Prototipo de la app', url: 'https://www.figma.com/proto/UpjOmOeLT1rDWlRJMuG06o/accesibilidad-museos?node-id=25-35&p=f&t=N1hbTQSgSaYAqAjD-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A10' },
            { id: 'landing', texto: 'Prototipo de la landing', url: 'https://www.figma.com/proto/UpjOmOeLT1rDWlRJMuG06o/accesibilidad-museos?node-id=104-348&t=gTlEHpxYj2hD7uuz-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A10' },
            { id: 'design-thinking', texto: 'Design Thinking', url: 'https://www.figma.com/board/VZKJMJWbRnL134wv7zosMF/Modelo-Design-Thinking-grupal--Copy-?node-id=6521-4042&t=1wVsEJIdDBwRytxZ-0' }
        ],
        idea: 'Hacer turismo con diversidad funcional obliga a investigar por adelantado si un lugar es accesible y cómo llegar sin obstáculos, y esa información suele ser escasa o poco fiable. En la encuesta, el 88,9 % de las personas con diversidad funcional no usaba ninguna app que le ayudara a hacer turismo, y el 98,1 % de los participantes se veía usando una. De la investigación salieron dos user personas:',
        perfiles: [
            { id: 'marta', titulo: 'Marta, 34 años', texto: 'Diseñadora gráfica freelance en Madrid y apasionada del arte. Tiene parálisis cerebral y usa silla de ruedas eléctrica. Necesita rutas accesibles e información clara sobre accesibilidad antes de ir. «El arte es un derecho de todos; solo falta hacerlo accesible.»' },
            { id: 'javier', titulo: 'Javier, 40 años', texto: 'Terapeuta ocupacional que coordina un centro para personas con diversidad funcional y organiza salidas culturales. Necesita información anticipada sobre accesos y recursos adaptados. «La accesibilidad no es un lujo, es una necesidad básica.»' }
        ],
        recorrido: { titulo: 'Recorrido por el prototipo', pasos: [
            { id: 'museos', titulo: 'Museos', texto: 'Un buscador y el listado de museos de Madrid, cada uno con su puntuación de accesibilidad y una breve descripción.', imagen: '/assets/tsb-museos.webp', etiqueta: 'Listado de museos' },
            { id: 'ficha', titulo: 'Ficha del museo', texto: 'Galería de fotos, accesos directos para contactar o ver la ruta y una tabla que indica, servicio a servicio, qué recursos de accesibilidad ofrece.', imagen: '/assets/tsb-ficha.webp', etiqueta: 'Ficha del museo' },
            { id: 'contactar', titulo: 'Organiza tu visita', texto: 'Datos de contacto del museo y un formulario para organizar la visita o solicitar un guía.', imagen: '/assets/tsb-contactar.webp', etiqueta: 'Formulario para organizar la visita' },
            { id: 'mapa', titulo: 'Museos cercanos', texto: 'Un mapa con los museos de alrededor para elegir la próxima visita a partir de tu dirección.', imagen: '/assets/tsb-mapa.webp', etiqueta: 'Mapa de museos cercanos' },
            { id: 'destino', titulo: 'Elige el destino', texto: 'Escribes desde dónde sales y eliges el museo en un desplegable.', imagen: '/assets/tsb-ruta-museo.webp', etiqueta: 'Selección de destino' },
            { id: 'ruta', titulo: 'Ruta accesible', texto: 'La app calcula y dibuja en el mapa la ruta más accesible hasta el museo elegido.', imagen: '/assets/tsb-ruta.webp', etiqueta: 'Cálculo de la ruta accesible' },
            { id: 'landing', titulo: 'Landing: servicios', texto: 'Presenta lo que ofrece la app: descubrir museos, comparar opiniones, planificar la visita y reservar tours, talleres y guías especializados.', imagen: '/assets/tsb-landing.webp', etiqueta: 'Landing, sección de servicios' },
            { id: 'landing-contacto', titulo: 'Landing: contacto', texto: 'Formulario de contacto y enlaces de descarga en Play Store y App Store.', imagen: '/assets/tsb-landing-contacto.webp', etiqueta: 'Landing, sección de contacto' }
        ] },
        funcionalidades: [
            { id: 'ruta', titulo: 'La ruta más accesible', texto: 'Indicas tu dirección y el museo, y la app traza el camino más accesible hasta la entrada.' },
            { id: 'accesibilidad', titulo: 'Accesibilidad de un vistazo', texto: 'Cada museo muestra su puntuación de accesibilidad y qué recursos ofrece, para decidir antes de salir de casa.' },
            { id: 'visita', titulo: 'Una visita a tu medida', texto: 'Contacto directo con el museo para organizar la visita, pedir un guía o reservar talleres, y opiniones de otros usuarios.' }
        ],
        construccionTitulo: 'Cómo lo diseñé',
        construccion: [
            { id: 'observar', titulo: 'Observar', texto: 'Desk research, netnografía, preguntas de investigación a centros, ayuntamiento y usuarios, benchmarking, DAFO, una encuesta con 52 respuestas y una entrevista a una mujer con discapacidad visual.' },
            { id: 'sintetizar', titulo: 'Sintetizar', texto: 'Dos user personas con sus mapas de empatía, customer journeys de una persona que se mueve con bastón y de una madre cuya hija tiene necesidades especiales, y matrices de necesidades, dolores y ganancias.' },
            { id: 'idear', titulo: 'Idear', texto: 'Insights, In & Out y MoSCoW: imprescindibles las rutas claras para movilidad reducida, saber qué espacios se adaptan a cada diversidad y la información detallada de accesibilidad. Cierra con la propuesta de valor.' },
            { id: 'prototipar', titulo: 'Prototipar', texto: 'Prototipo interactivo de la app y de la landing en Figma, con las funciones priorizadas en el MoSCoW.' }
        ],
        flujos: {
            titulo: 'Investigación',
            texto: 'Algunas piezas del tablero de Design Thinking: las user personas, el customer journey de Pablo y la priorización de ideas con MoSCoW. Pulsa una imagen para verla a tamaño completo.',
            anchos: true,
            diagramas: [
                { id: 'personas', titulo: 'User personas', imagen: '/assets/tsb-personas.webp' },
                { id: 'moscow', titulo: 'MoSCoW', imagen: '/assets/tsb-moscow.webp' },
                { id: 'journey', titulo: 'Customer journey', imagen: '/assets/tsb-journey.webp' }
            ]
        },
        diseno: 'Una identidad cercana y optimista: el logo une el pin de ubicación con el símbolo de accesibilidad, sobre una paleta de morados y un verde menta que destaca las acciones principales. Los colores proceden de las pantallas del prototipo.',
        colores: [
            { id: 'morado', nombre: 'Morado', hex: '#612A90' },
            { id: 'menta', nombre: 'Verde menta', hex: '#4DC79E' },
            { id: 'accion', nombre: 'Menta de acción', hex: '#00FFA2' },
            { id: 'lila', nombre: 'Lila', hex: '#D99DF2' },
            { id: 'fondo', nombre: 'Fondo', hex: '#EEE7F4' }
        ],
        logo: { imagen: '/assets/tsb-logo.webp', etiqueta: 'Logo de Turismo Sin Barreras' },
        reto: {
            titulo: 'Lo que dijo la encuesta',
            texto: 'La encuesta recogió la opinión de 52 personas sobre su forma de hacer turismo; el 34,6 % tiene diversidad funcional. Casi todas veían Madrid como una ciudad adaptada, pero las respuestas abiertas y la entrevista señalaban problemas concretos: ascensores averiados en el metro, escaleras sin marcar, poca señalización y textos imposibles de leer para quien ve mal.',
            intro: 'Las barreras más frecuentes según las personas con diversidad funcional:',
            lista: [
                { id: 'accesibilidad', texto: 'Accesibilidad de los espacios (27,8 %).' },
                { id: 'informacion', texto: 'Falta de información adaptada (22,2 %).' },
                { id: 'personal', texto: 'Falta de personal cualificado, señalización y transporte (16,7 % cada una).' }
            ],
            metricas: [
                { id: 'usaria', valor: '98,1 %', texto: 'Usaría una app así' },
                { id: 'sinapp', valor: '88,9 %', texto: 'No usa ninguna app de ayuda' },
                { id: 'talleres', valor: '38,9 %', texto: 'Valora más la información de talleres y jornadas' }
            ],
            nota: 'Encuesta en Google Forms.'
        },
        conclusion: 'Turismo Sin Barreras me enseñó a diseñar empezando por las personas: escuchar a quienes viven las barreras cambia lo que parece importante. La accesibilidad no es un añadido, es la base del producto, y prototipar en Figma me permitió comprobar que cada pantalla responde a una necesidad real.'
    },

    ahorasomosdos: {
        titulo: 'Ahora Somos Dos',
        subtitulo: 'Cuento infantil ilustrado sobre la llegada de una hermana',
        icono: 'libro',
        intro: 'Ahora Somos Dos es un cuento ilustrado para primeros lectores, basado en una historia real: mi interpretación de cómo se conocieron mis dos perras y su evolución. Es un proyecto académico de diseño editorial en el que escribí el texto, creé las ilustraciones y maqueté el libro completo, preparado para imprenta.',
        portada: { imagen: '/assets/asd-portada.webp', etiqueta: 'Mockup de la portada de Ahora Somos Dos', natural: true },
        tecnologias: ['Illustrator', 'Photoshop', 'InDesign', 'Ilustración vectorial', 'Diseño editorial', 'Maquetación'],
        enlaces: [],
        idea: 'Luna, una chihuahua acostumbrada a tener toda la atención de sus dueños, vive feliz hasta que un día llega a casa Nube, una cachorra de bichón maltés que viene para cambiar la dinámica del hogar. Lo que empieza con celos acaba en complicidad: el cuento habla de la llegada de un hermano y refuerza valores de hermandad, tolerancia y amistad. Los dos personajes se diseñaron para transmitir su carácter:',
        perfiles: [
            { id: 'luna', titulo: 'Luna', texto: 'Representa la fuerza, el carácter y la independencia: formas más definidas, orejas grandes y erguidas y una postura orgullosa.' },
            { id: 'nube', titulo: 'Nube', texto: 'Representa la ternura, la inocencia y la adaptabilidad: formas redondeadas, pelo esponjoso y ojos grandes.' }
        ],
        recorrido: { titulo: 'Recorrido por el libro', pasos: [
            { id: 'portada', titulo: 'Portada', texto: 'La tapa dura con plastificado mate busca un libro resistente para manos pequeñas. Para el título elegí Marhey Bold, una tipografía divertida y expresiva que llama la atención de los niños. El azul del cielo transmite calma y seguridad y el verde invita a la aventura, y presentar a Luna y Nube jugando juntas anticipa de qué va la historia.', imagen: '/assets/asd-mockup-portada.webp', etiqueta: 'Mockup de la portada' },
            { id: 'contraportada', titulo: 'Contraportada', texto: 'Pensé portada y contraportada como una sola escena continua. La sinopsis va en Coming Soon, la misma letra redondeada y amigable del interior, y dentro del marco punteado que acompaña cada página, para dar unidad a todo el libro. Cerrar con las dos perritas juntas de espaldas resume el mensaje de hermandad.', imagen: '/assets/asd-mockup-contraportada.webp', etiqueta: 'Mockup de la contraportada' },
            { id: 'interior', titulo: 'Estructura de página', texto: 'Todas las páginas comparten la misma estructura: marco punteado, cenefa de huellitas, texto arriba e ilustración abajo. Ese orden constante da seguridad a los primeros lectores, y que el texto cuente justo lo que muestra la escena hace la historia fácil de seguir. La Coming Soon a 14 pt y los márgenes amplios facilitan la lectura.', imagen: '/assets/asd-mockup-interior.webp', etiqueta: 'Mockup del libro abierto' },
            { id: 'llegada', titulo: 'Los celos', texto: 'La llegada de Nube es el nudo de la historia. El bocadillo de pensamiento de Luna convierte una emoción difícil, los celos ante un nuevo hermano, en algo que un niño entiende de un vistazo. Los ojos grandes y las cejas móviles de los personajes transmiten lo que sienten incluso sin leer el texto.', imagen: '/assets/asd-pag-llegada.webp', etiqueta: 'Doble página de la llegada de Nube' },
            { id: 'playa', titulo: 'De rivales a hermanas', texto: 'A medida que Luna y Nube se hacen amigas, las escenas salen de casa: la paleta cálida del interior se abre a los verdes de la aventura y los azules de la calma. El cambio de color acompaña el mensaje del libro: aceptar a quien llega y compartir abre la puerta a nuevas aventuras juntos.', imagen: '/assets/asd-pag-playa.webp', etiqueta: 'Doble página de la playa' }
        ] },
        funcionalidades: [
            { id: 'escena', titulo: 'Una página, una escena', texto: 'Cada página es una unidad narrativa y visual: el texto coincide con la ilustración para que la historia sea fácil de seguir.' },
            { id: 'estilo', titulo: 'Estilo pensado para niños', texto: 'Formas simples y redondeadas, cabezas grandes, contornos gruesos y ojos expresivos que transmiten emociones incluso sin texto.' },
            { id: 'lectores', titulo: 'Para primeros lectores', texto: 'Una tipografía redondeada a 14 pt, márgenes amplios y una estructura clásica de introducción, nudo y desenlace.' }
        ],
        construccionTitulo: 'Cómo lo diseñé',
        construccion: [
            { id: 'investigacion', titulo: 'Investigación', texto: 'Referencias de ilustración infantil, de cuentos sobre la amistad y de la maquetación y el tono de editoriales infantiles, y un moodboard para la portada y los textos.' },
            { id: 'personajes', titulo: 'Personajes', texto: 'Bocetos a partir de fotos de mis perras e ilustración vectorial en Illustrator hasta encontrar la personalidad de cada una.' },
            { id: 'escenas', titulo: 'Escenas', texto: 'Primero los elementos sueltos (muebles, juguetes, personajes) y después el montaje de cada escena con su fondo y su marco en Photoshop.' },
            { id: 'maquetacion', titulo: 'Maquetación', texto: 'Retícula, estilos de párrafo, folios y elementos decorativos en InDesign, y el archivo final para imprenta.' }
        ],
        flujos: {
            titulo: 'Proceso de diseño',
            texto: 'Del personaje a la página: las ilustraciones de Luna y Nube, la construcción de una escena y las bases tipográficas y de color del libro.',
            anchos: true,
            diagramas: [
                { id: 'personajes', titulo: 'Luna y Nube', imagen: '/assets/asd-personajes.webp', ampliable: false },
                { id: 'elementos', titulo: 'Elementos de la escena', imagen: '/assets/asd-elementos.webp', ampliable: false },
                { id: 'escena', titulo: 'Escena montada', imagen: '/assets/asd-escena.webp', ampliable: false },
                { id: 'tipografias', titulo: 'Tipografías', imagen: '/assets/asd-tipografias.webp', ampliable: false }
            ]
        },
        diseno: 'Ilustración plana con líneas suaves, colores cálidos y composiciones sencillas. Cada color tiene una intención: el salmón aporta calidez y ternura, el azul calma, el verde invita a la aventura y el blanco roto transmite inocencia. Detalles como la cenefa de huellitas y el marco punteado dan unidad a todo el libro.',
        colores: [
            { id: 'salmon', nombre: 'Naranja salmón', hex: '#F0836E' },
            { id: 'azul', nombre: 'Azul cielo pastel', hex: '#90B9E2' },
            { id: 'verde', nombre: 'Verde', hex: '#80AF59' },
            { id: 'amarillo', nombre: 'Amarillo anaranjado', hex: '#DDAB45' },
            { id: 'marron', nombre: 'Marrón cálido', hex: '#AB8856' },
            { id: 'blanco', nombre: 'Blanco roto', hex: '#FEFCF7' }
        ],
        tipografias: 'Coming Soon a 14 pt para el cuento, redondeada y amigable; Marhey Bold a 52 pt para el título de portada, divertida y expresiva; y Lato para la introducción y la ficha técnica.',
        logo: { imagen: '/assets/asd-luna-nube.webp', etiqueta: 'Luna y Nube, las protagonistas' },
        reto: {
            titulo: 'Producción para imprenta',
            texto: 'El libro está preparado para impresión profesional en tapa dura, con decisiones técnicas pensadas para un producto atractivo y resistente en manos de niños.',
            intro: 'Ficha técnica:',
            lista: [
                { id: 'formato', texto: 'Formato cuadrado de 220 × 220 mm, márgenes de 20 a 25 mm y sangrado de 3 mm.' },
                { id: 'archivo', texto: 'Archivo final en PDF para imprenta, en CMYK y a 300 ppp.' },
                { id: 'papel', texto: 'Tapa dura de cartón rígido forrada con la cubierta impresa y plastificado mate; interior en papel estucado mate de 150 g/m².' },
                { id: 'acabado', texto: 'Impresión digital y encuadernación en tapa dura (cartoné), con lomo impreso con el título y la autora.' }
            ],
            metricas: [
                { id: 'formato', valor: '220 mm', texto: 'Formato cuadrado' },
                { id: 'paginas', valor: '30', texto: 'Páginas de contenido' }
            ],
            nota: 'Proyecto académico: el libro no se ha impreso ni publicado.'
        },
        conclusion: 'Ahora Somos Dos me permitió recorrer todo el proceso editorial: escribir una historia, darle forma con ilustraciones propias y convertirla en un libro listo para imprenta. Combinar Illustrator, Photoshop e InDesign, alejándome de mi estilo habitual, me enseñó a que cada decisión de diseño sirva a la historia y a sus lectores.'
    },

    agenda2026: {
        titulo: 'Agenda 2026',
        subtitulo: 'Una agenda que acerca la historia del arte, mes a mes',
        icono: 'calendario',
        intro: 'La Agenda 2026 es un proyecto editorial: una agenda multifuncional para organizar todo el año. Quise ir más allá de su función organizativa y convertirla en un objeto con valor creativo: cada mes lo protagoniza una vanguardia artística con una ilustración propia y una breve introducción al estilo.',
        portada: { imagen: '/assets/ag-portada.webp', etiqueta: 'Mockup de la cubierta y la contracubierta de la Agenda 2026', natural: true },
        tecnologias: ['Illustrator', 'InDesign', 'Photoshop', 'Ilustración vectorial', 'Diseño editorial', 'Producción gráfica', 'Preimpresión'],
        enlaces: [],
        idea: 'Pensada para un público joven o adulto, la agenda tenía que ser posible, funcional y cumplir los requisitos de producción del proyecto, sin renunciar a una identidad visual propia. Se apoya en dos ideas:',
        perfiles: [
            { id: 'funcional', titulo: 'Funcional', texto: 'Formato A5 manejable, calendario mensual, semana vista con espacio para escribir y páginas de anotaciones para el uso diario.' },
            { id: 'inspiradora', titulo: 'Inspiradora', texto: 'Doce ilustraciones, una por vanguardia, con su introducción, marcapáginas de regalo y un pasatiempo final para los tiempos muertos.' }
        ],
        recorrido: { titulo: 'Recorrido por la agenda', pasos: [
            { id: 'cubierta', titulo: 'Cubierta', texto: 'Elegí cartulina gráfica de 350 g con laminado soft touch mate, agradable al tacto y resistente al uso diario. El foil dorado y el golpe seco en elementos seleccionados aportan brillo y relieve sin recargar. El marco de esquinas achaflanadas, de inspiración Art Déco, y las citas de Paul Klee y Picasso en portada y contraportada anuncian la idea: una agenda que acerca el arte.', imagen: '/assets/ag-mockup-cubiertas.webp', etiqueta: 'Mockup de la cubierta y la contracubierta' },
            { id: 'marcapaginas', titulo: 'Marcapáginas de regalo', texto: 'Al inicio van seis marcapáginas desprendibles a modo de regalo, impresos a doble cara en cartulina de 300 g con laminado mate. El microperforado, indicado con capas y líneas específicas en el archivo de producción, permite separarlos fácilmente, y sus motivos retoman las vanguardias con colores más vivos.', imagen: '/assets/ag-mockup-marcapaginas.webp', etiqueta: 'Mockup de los marcapáginas' },
            { id: 'vanguardias', titulo: 'Doce vanguardias', texto: 'Cada mes lo protagoniza una vanguardia de la primera mitad del siglo XX, del Impresionismo al Pop Art. Diseñé y dibujé cada ilustración en Illustrator, reinterpretando sus rasgos visuales de forma personal y, en muchos meses, con un guiño a la fecha: San Valentín en febrero, Halloween en octubre o la Navidad en diciembre.', imagen: '/assets/ag-vanguardias.webp', etiqueta: 'Las doce ilustraciones mensuales' },
            { id: 'ilustracion', titulo: 'Separador y lámina', texto: 'Cada mes se abre con una breve introducción al estilo que inspira su ilustración, para acercar la historia del arte al usuario. Las láminas van en papel couché mate, que reproduce mejor el color y el detalle, mientras el texto mantiene la misma tipografía sobria para dar todo el protagonismo a la imagen.', imagen: '/assets/ag-mockup-ilustracion.webp', etiqueta: 'Mockup del separador y la lámina de noviembre' },
            { id: 'semana', titulo: 'Semana vista', texto: 'El interior, en papel offset de 100 g, está pensado para escribir: una semana en doble página con espacio para cada día. La encuadernación Wire-O permite abrir la agenda 360° y que quede plana sobre la mesa, y la jerarquía en magenta y ciruela ayuda a orientarse de un vistazo.', imagen: '/assets/ag-mockup-semana.webp', etiqueta: 'Mockup de la semana vista' }
        ] },
        funcionalidades: [
            { id: 'arte', titulo: 'El arte, mes a mes', texto: 'Cada mes presenta una vanguardia con su ilustración y una introducción breve, de modo que usar la agenda es también recorrer la historia del arte.' },
            { id: 'plana', titulo: 'Se abre en plano', texto: 'La encuadernación Wire-O con apertura de 360° deja la agenda plana para escribir cómodamente en cualquier página.' },
            { id: 'regalos', titulo: 'Pequeños regalos', texto: 'Seis marcapáginas desprendibles al principio y una sopa de letras con las doce vanguardias al final, «para esos tiempos muertos».' }
        ],
        construccionTitulo: 'Cómo lo diseñé',
        construccion: [
            { id: 'planteamiento', titulo: 'Planteamiento', texto: 'Una agenda funcional con un hilo conductor inspirador: las vanguardias y estilos artísticos de la primera mitad del siglo XX.' },
            { id: 'estilo', titulo: 'Estilo', texto: 'Una tipografía, una paleta y una estructura fijas y sobrias, para que las ilustraciones sean siempre las protagonistas.' },
            { id: 'bocetos', titulo: 'Bocetos', texto: 'Moodboard, bocetos de la estructura y la jerarquía de las páginas, y bocetos de cada ilustración a partir de los rasgos de su movimiento.' },
            { id: 'produccion', titulo: 'Producción', texto: 'Ajuste del detalle, la paleta y el equilibrio entre imagen y texto, maquetación en InDesign, preparación del archivo para imprenta y, por último, los montajes y mockups en Photoshop para ver la agenda como objeto real.' }
        ],
        flujos: {
            titulo: 'Proceso de diseño',
            texto: 'De los bocetos a lápiz a las páginas finales: la estructura de la agenda, las ideas de cada ilustración, el calendario mensual y el pasatiempo final. Pulsa una imagen para verla a tamaño completo.',
            anchos: true,
            diagramas: [
                { id: 'estructura', titulo: 'Bocetos de estructura', imagen: '/assets/ag-bocetos-estructura.webp' },
                { id: 'ilustraciones', titulo: 'Bocetos de ilustración', imagen: '/assets/ag-bocetos-ilustracion.webp' },
                { id: 'calendario', titulo: 'Anotaciones y calendario', imagen: '/assets/ag-calendario.webp' },
                { id: 'pasatiempo', titulo: 'Pasatiempo final', imagen: '/assets/ag-pasatiempo.webp' }
            ]
        },
        diseno: 'Un estilo sobrio y constante que deja el color a las ilustraciones: morados suaves y desaturados para el papel interior y los fondos, y los tonos más oscuros para la tipografía. Las ilustraciones y los marcapáginas usan secundarios más vivos, propios de cada vanguardia.',
        colores: [
            { id: 'ciruela', nombre: 'Ciruela', hex: '#4B153E' },
            { id: 'magenta', nombre: 'Magenta', hex: '#A4358B' },
            { id: 'lila', nombre: 'Lila', hex: '#B8A0C9' },
            { id: 'lila-claro', nombre: 'Lila claro', hex: '#F1EBF6' }
        ],
        tipografias: 'Space Grotesk para títulos, días y textos, y Work Sans para las citas: sans serif funcionales, legibles y sobrias, inspiradas en las que surgieron con las vanguardias.',
        logo: { imagen: '/assets/ag-lamina-artdeco.webp', etiqueta: 'Lámina de noviembre, Art Déco' },
        reto: {
            titulo: 'Producción para imprenta',
            texto: 'Cada decisión de material y acabado se tomó pensando en un objeto que se usa a diario durante todo un año.',
            intro: 'Ficha técnica:',
            lista: [
                { id: 'formato', texto: 'Formato A5 vertical (148 × 210 mm) con 3 mm de sangrado.' },
                { id: 'papel', texto: 'Interior en papel offset de 100 g y láminas ilustradas en papel couché mate.' },
                { id: 'cubierta', texto: 'Cubierta en cartulina gráfica de 350 g con laminado soft touch mate, foil dorado y golpe seco.' },
                { id: 'encuadernacion', texto: 'Encuadernación Wire-O con apertura de 360°.' },
                { id: 'impresion', texto: 'Impresión en cuatricromía (CMYK) más tinta plana dorada para los acabados de la cubierta.' },
                { id: 'marcapaginas', texto: 'Marcapáginas en cartulina de 300 g con laminado mate, impresos a doble cara y con microperforado.' }
            ],
            metricas: [
                { id: 'formato', valor: 'A5', texto: 'Formato vertical' },
                { id: 'paginas', valor: '162', texto: 'Páginas' }
            ],
            nota: 'Proyecto editorial: agenda multifuncional para 2026, diseñada y preparada para imprenta.'
        },
        conclusion: 'La Agenda 2026 me enseñó a diseñar pensando en la producción: elegir papeles, acabados y encuadernación según el uso, y preparar el archivo para imprenta sin perder una identidad propia. El resultado es una agenda equilibrada entre funcionalidad y expresión gráfica, pensada para el día a día.'
    }
}

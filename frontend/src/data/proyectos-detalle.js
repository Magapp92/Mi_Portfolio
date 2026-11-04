// data/proyectos-detalle.js
// [IA] Contenido de la página de detalle de cada proyecto, indexado por el id
// de data/proyectos.js. `imagen: ''` deja un hueco reservado para la captura
// que corresponde (la `etiqueta` indica cuál).

export const PROYECTOS_DETALLE = {
    pawcare: {
        titulo: 'PawCare',
        subtitulo: 'Plataforma de reservas para el cuidado de mascotas',
        intro: 'PawCare conecta a dueños de mascotas con cuidadores particulares y profesionales para guardería de día, estancias largas, paseos o peluquería. Es una aplicación Full Stack completa: la diseñé, la desarrollé de principio a fin y la publiqué en producción.',
        portada: { imagen: '', etiqueta: 'Captura: página de inicio de PawCare' },
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
        recorrido: [
            { id: 'login', titulo: 'Login', texto: 'Acceso con correo, contraseña y tipo de perfil. La sesión se guarda con un token JWT y cada rol entra en su propio espacio.', imagen: '/assets/proyecto-pawcare.webp', etiqueta: 'Captura: login' },
            { id: 'buscador', titulo: 'Buscador', texto: 'Filtros por ubicación, servicio y tipo de animal. Desde cada tarjeta se puede reservar sin salir de la página.', imagen: '', etiqueta: 'Captura: buscador de cuidadores' },
            { id: 'cuidador', titulo: 'Perfil del cuidador', texto: 'Información, servicios con precios y un carrusel con las opiniones de otros usuarios.', imagen: '', etiqueta: 'Captura: perfil público del cuidador' },
            { id: 'reserva', titulo: 'Reserva', texto: 'Un modal para elegir mascotas, servicio y fechas. No admite días pasados y avisa si falta la mascota.', imagen: '', etiqueta: 'Captura: modal de reserva' },
            { id: 'perfil', titulo: 'Mi perfil', texto: 'Datos personales y gestión completa de mascotas, cada una con su foto, especie, raza y vacunación.', imagen: '', etiqueta: 'Captura: perfil de usuario' },
            { id: 'reservas', titulo: 'Mis reservas', texto: 'Editar, cancelar o valorar cada reserva, con un hilo de mensajes con el cuidador que se actualiza solo.', imagen: '', etiqueta: 'Captura: mis reservas' },
            { id: 'panel', titulo: 'Panel del cuidador', texto: 'Solicitudes pendientes y confirmadas, edición del perfil, servicios y tarifas, y bandeja de mensajes.', imagen: '', etiqueta: 'Captura: panel del cuidador' }
        ],
        construccion: [
            { id: 'front', titulo: 'Frontend', texto: 'SPA en React con Vite y React Router. La sesión vive en un Context, todas las peticiones pasan por una función común que comprueba la respuesta y las rutas privadas se protegen según el rol.' },
            { id: 'api', titulo: 'API', texto: 'API REST con Express y MongoDB (Mongoose) sobre cuatro colecciones: login, cuidadores, perfiles y reservas. Las rutas de escritura exigen token JWT, helmet, cors y morgan cubren seguridad y registro, y un middleware centraliza los errores.' },
            { id: 'despliegue', titulo: 'Despliegue', texto: 'Front y API publicados en Vercel, con MongoDB Atlas como base de datos en producción.' }
        ],
        flujos: [
            { id: 'completo', titulo: 'Esquema completo: del login al final', imagen: '/assets/pawcare-flujo-completo.webp' },
            { id: 'sesion', titulo: 'Sesión y navegación', imagen: '/assets/pawcare-flujo-sesion.webp' },
            { id: 'reserva', titulo: 'Ciclo de vida de una reserva', imagen: '/assets/pawcare-flujo-reserva.webp' },
            { id: 'mascotas', titulo: 'Gestión de mascotas', imagen: '/assets/pawcare-flujo-mascotas.webp' }
        ],
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
        logo: { imagen: '', etiqueta: 'Logo de PawCare' },
        reto: 'El mayor reto fue crear una reserva desde un único endpoint manteniendo sincronizadas las colecciones de reservas, perfiles y cuidadores.',
        mejoras: [
            { id: 'jwt', texto: 'Autenticación con token JWT en todas las rutas de escritura.' },
            { id: 'conexion', texto: 'Conexión con la base de datos comprobada en cada petición: si no responde, la app lo explica en lugar de quedarse esperando.' },
            { id: 'validacion', texto: 'Validación de datos en las actualizaciones y control de errores que llega hasta la interfaz.' },
            { id: 'mensajes', texto: 'Mensajes convertidos en un hilo con fecha que se actualiza cada quince segundos.' }
        ],
        metricas: [
            { id: 'desktop', valor: '100', texto: 'Rendimiento en escritorio' },
            { id: 'mobile', valor: '96', texto: 'Rendimiento en móvil' }
        ],
        conclusion: 'PawCare me permitió unir frontend y backend en una aplicación real: decidir la arquitectura, resolver problemas de datos y probarla a fondo en local y en producción. Es el proyecto que mejor resume mi salto al desarrollo Full Stack.'
    }
}

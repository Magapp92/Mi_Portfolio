
/* Categorías del filtro del slider, en el mismo orden en que aparecen los proyectos */
export const CATEGORIAS = [
    { id: 'desarrollo', texto: 'Desarrollo web' },
    { id: 'ux', texto: 'UX/UI' },
    { id: 'editorial', texto: 'Diseño editorial' }
]

/* Proyectos que se muestran en el slider */
export const PROYECTOS = [
    {
        id: 'pawcare',
        titulo: 'PawCare',
        categoria: 'desarrollo',
        imagen: '/assets/proyecto-pawcare.webp',
        descripcion: 'Aplicación Full Stack para encontrar y reservar cuidadores de mascotas. Cuenta con login para dueños y cuidadores, buscador de cuidadores, reservas con chat entre dueño y cuidador, y un panel para que el cuidador gestione sus servicios. Desarrollada con React, Express y MongoDB.'
    },
    {
        id: 'buscatupeli',
        titulo: 'Busca tu peli',
        categoria: 'desarrollo',
        imagen: '/assets/proyecto-buscatupeli.webp',
        descripcion: 'Web para saber en qué plataforma de streaming ver cada película, con enlace directo a ella. Catálogo de 140 películas con API propia, noticias que se actualizan solas cada semana, newsletter y panel de administración. Desarrollada con HTML, CSS, JavaScript, Express y MongoDB.'
    },
    {
        id: 'portaldental',
        titulo: 'PortalDental',
        categoria: 'ux',
        imagen: '/assets/portaldental-portada.webp',
        imagenEntera: true,
        descripcion: 'Proyecto UX/UI: app móvil y landing para encontrar clínica dental por especialidad y cercanía, gestionar citas y llevar siempre contigo tu historial dental. Diseñada con Design Thinking, prototipada en Figma y validada con usuarios en Maze.'
    },
    {
        id: 'turismosinbarreras',
        titulo: 'Turismo Sin Barreras',
        categoria: 'ux',
        imagen: '/assets/tsb-portada.webp',
        imagenEntera: true,
        descripcion: 'Proyecto UX/UI: app móvil y landing para descubrir los museos de Madrid según su accesibilidad, calcular la ruta más accesible hasta ellos y organizar la visita. Diseñada con Design Thinking a partir de una encuesta a personas con y sin diversidad funcional.'
    },
    {
        id: 'ahorasomosdos',
        titulo: 'Ahora Somos Dos',
        categoria: 'editorial',
        imagen: '/assets/asd-portada.webp',
        imagenEntera: true,
        descripcion: 'Diseño editorial: cuento infantil ilustrado sobre la llegada de una nueva hermana, inspirado en mis dos perras. Escribí el texto, creé las ilustraciones y maqueté el libro completo en InDesign, listo para imprenta.'
    },
    {
        id: 'agenda2026',
        titulo: 'Agenda 2026',
        categoria: 'editorial',
        imagen: '/assets/ag-portada.webp',
        imagenEntera: true,
        descripcion: 'Producción gráfica: agenda A5 que dedica cada mes a una vanguardia artística, del Impresionismo al Pop Art, con una ilustración propia y una breve introducción. Diseñada y preparada para imprenta con Wire-O, foil dorado, golpe seco y marcapáginas desprendibles.'
    }
]

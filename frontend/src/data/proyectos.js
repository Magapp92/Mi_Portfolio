// data/proyectos.js
// Proyectos del slider (antes artículos duplicados en proyectos.html).
// Sustituir imagen y texto cuando haya contenido real de cada proyecto.

export const PROYECTOS = [
    {
        id: 'pawcare',
        titulo: 'PawCare',
        imagen: '/assets/proyecto-pawcare.webp',
        descripcion: 'Aplicación Full Stack para encontrar y reservar cuidadores de mascotas. Cuenta con login para dueños y cuidadores, buscador de cuidadores, reservas con chat entre dueño y cuidador, y un panel para que el cuidador gestione sus servicios. Desarrollada con React, Express y MongoDB.'
    },
    {
        id: 'buscatupeli',
        titulo: 'Busca tu peli',
        imagen: '/assets/proyecto-buscatupeli.webp',
        descripcion: 'Web para saber en qué plataforma de streaming ver cada película, con enlace directo a ella. Catálogo de 140 películas con API propia, noticias que se actualizan solas cada semana, newsletter y panel de administración. Desarrollada con HTML, CSS, JavaScript, Express y MongoDB.'
    },
    {
        id: 'portaldental',
        titulo: 'PortalDental',
        imagen: '/assets/portaldental-portada.webp',
        imagenEntera: true,
        descripcion: 'Proyecto UX/UI: app móvil y landing para encontrar clínica dental por especialidad y cercanía, gestionar citas y llevar siempre contigo tu historial dental. Diseñada con Design Thinking, prototipada en Figma y validada con usuarios en Maze.'
    },
    {
        id: 'turismosinbarreras',
        titulo: 'Turismo Sin Barreras',
        imagen: '/assets/tsb-portada.webp',
        imagenEntera: true,
        descripcion: 'Proyecto UX/UI: app móvil y landing para descubrir los museos de Madrid según su accesibilidad, calcular la ruta más accesible hasta ellos y organizar la visita. Diseñada con Design Thinking a partir de una encuesta a personas con y sin diversidad funcional.'
    },
    {
        id: 'ahorasomosdos',
        titulo: 'Ahora Somos Dos',
        imagen: '/assets/asd-portada.webp',
        imagenEntera: true,
        descripcion: 'Diseño editorial: cuento infantil ilustrado sobre la llegada de una nueva hermana, inspirado en mis dos perras. Escribí el texto, creé las ilustraciones y maqueté el libro completo en InDesign, listo para imprenta.'
    }
]

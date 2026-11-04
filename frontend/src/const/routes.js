// const/routes.js
// [IA] Catálogo central de rutas de la SPA. Cualquier componente que necesite
// navegar usa una constante de aquí — evita strings sueltos por todo el código.

export const ROUTES = Object.freeze({
    HOME: '/',
    SOBRE_MI: '/sobre-mi',
    PROYECTOS: '/proyectos',
    PROYECTO: '/proyectos/:id',
    FORMACION: '/formacion',
    JUEGO: '/juego',
    NOT_FOUND: '*'
})

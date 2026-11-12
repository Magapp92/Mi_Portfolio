import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RUTAS } from '@const/rutas.js'
import { PROYECTOS_DETALLE } from '@data/proyectos-detalle.js'

const NOMBRE = 'Magaly Puente'
const TITULO_INICIO = `${NOMBRE} · Desarrolladora Full Stack y diseñadora UX/UI`

const TITULOS = {
    [RUTAS.INICIO]: TITULO_INICIO,
    [RUTAS.SOBRE_MI]: `Sobre mí · ${NOMBRE}`,
    [RUTAS.PROYECTOS]: `Proyectos · ${NOMBRE}`,
    [RUTAS.FORMACION]: `Formación · ${NOMBRE}`,
    [RUTAS.JUEGO]: `Quiz de Harry Potter · ${NOMBRE}`
}

/* Ponemos en la pestaña del navegador el nombre de la página en la que estamos */
export const useTituloPagina = () => {

    const { pathname } = useLocation()

    useEffect(() => {
        const ruta = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
        const id = ruta.startsWith(`${RUTAS.PROYECTOS}/`) ? ruta.slice(RUTAS.PROYECTOS.length + 1) : null
        const proyecto = id ? PROYECTOS_DETALLE[id] : null

        if (proyecto) document.title = `${proyecto.titulo} · ${NOMBRE}`
        else document.title = TITULOS[ruta] ?? `Página no encontrada · ${NOMBRE}`
    }, [pathname])
}

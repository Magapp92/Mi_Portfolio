// pages/proyectos/proyectos.jsx
// [IA] Página de proyectos. Traslada proyectos.html + js/proyectos.js: slider
// automático e infinito cada 8 s, pausa al pasar el ratón y flechas manuales.
// El setInterval se limpia en el return del useEffect (regla C13). El estado
// sigue el patrón profesor: un useState por variable y setter directo (C6/C7).

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cursor } from '@/components/cursor/cursor.jsx'
import { ROUTES } from '@/const/routes.js'
import { PROYECTOS } from '@/data/proyectos.js'
import { PROYECTOS_DETALLE } from '@/data/proyectos-detalle.js'
import './proyectos.css'

// Bucle infinito: la pista repite los proyectos 3 veces y se trabaja en la copia
// central. Al acabar una animación fuera de ella se salta sin transición a la
// tarjeta equivalente de la copia central, así que el salto no se ve.
const PASO = 2
const TOTAL = PROYECTOS.length
const PISTA = [...PROYECTOS, ...PROYECTOS, ...PROYECTOS]
// translateX en % es relativo al propio contenedor, que mide toda la pista.
const ANCHO_TARJETA = 100 / PISTA.length

const ProyectosPage = () => {

    const [indice, setIndice] = useState(TOTAL)
    const [conTransicion, setConTransicion] = useState(true)
    const [moviendo, setMoviendo] = useState(false)
    const [pausado, setPausado] = useState(false)

    // Handlers en castellano (regla C7b). Se ignoran clics durante la animación
    // para no salir de la pista.
    const mover = (paso) => {
        if (moviendo) return
        setConTransicion(true)
        setMoviendo(true)
        setIndice(indice + paso)
    }
    const siguiente = () => mover(PASO)
    const anterior = () => mover(-PASO)
    const pausarSlider = () => setPausado(true)
    const reanudarSlider = () => setPausado(false)

    const terminarTransicion = (e) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        setMoviendo(false)
        if (indice >= 2 * TOTAL || indice < TOTAL) {
            setConTransicion(false)
            setIndice(indice >= 2 * TOTAL ? indice - TOTAL : indice + TOTAL)
        }
    }

    // Avance automático. Depende de `indice` para que cada tick programe el
    // siguiente sin closures obsoletas; cleanup obligatorio (regla C13).
    useEffect(() => {
        if (pausado) return

        const intervalo = setInterval(siguiente, 8000)

        return () => clearInterval(intervalo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indice, pausado, moviendo])

    return (
        <main className="Proyectos">
            <Cursor variante="halo" />
            <video src="/assets/VideoFondoProyectos.mp4" poster="/assets/VideoFondoProyectos-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="Proyectos-video"></video>
            <div className="Proyectos-wrapper">
                <section className="Proyectos-section">
                    <h2 className="Proyectos-h2">Mis proyectos</h2>
                </section>
                <div className="Proyectos-slider" onMouseOver={pausarSlider} onMouseOut={reanudarSlider}>
                    <div
                        className="Proyectos-container"
                        style={{
                            '--tarjetas': PISTA.length,
                            transform: `translateX(-${ANCHO_TARJETA * indice}%)`,
                            transition: conTransicion ? undefined : 'none'
                        }}
                        onTransitionEnd={terminarTransicion}
                    >
                        {PISTA.map((proyecto, i) =>
                            <ProyectoCard key={`${i}-${proyecto.id}`} {...proyecto} />
                        )}
                    </div>
                    <button className="Slider-arrow Slider-arrow--next" onClick={siguiente} aria-label="Proyecto siguiente"></button>
                    <button className="Slider-arrow Slider-arrow--prev" onClick={anterior} aria-label="Proyecto anterior"></button>
                </div>
            </div>
        </main>
    )
}

// Subcomponente de la tarjeta de proyecto (patrón de map del profesor, C11b).
const ProyectoCard = (props) => {

    const { id, titulo, imagen, descripcion, imagenEntera = false } = props

    const contenido = (
        <>
            {imagen && <img src={imagen} alt={`imagen ${titulo}`} className={`Proyectos-img${imagenEntera ? ' Proyectos-img--entera' : ''}`} />}
            {!imagen && <div className="Proyectos-img" aria-hidden="true"></div>}
            <h3 className="Proyectos-h3">{titulo}</h3>
            <p className="Proyectos-p">{descripcion}</p>
        </>
    )

    // Solo los proyectos con página de detalle llevan enlace.
    if (!PROYECTOS_DETALLE[id]) return <article className="Proyectos-article">{contenido}</article>

    return (
        <article className="Proyectos-article Proyectos-article--enlace">
            <Link to={`${ROUTES.PROYECTOS}/${id}`} className="Proyectos-enlace" title={`ver el proyecto ${titulo}`}>
                {contenido}
            </Link>
        </article>
    )
}

export default ProyectosPage

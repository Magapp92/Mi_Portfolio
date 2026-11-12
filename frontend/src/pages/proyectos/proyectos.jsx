/* Página de proyectos con un slider infinito que avanza solo cada 8 segundos,
se para al pasar el ratón y también se mueve con las flechas */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Cursor } from '@components/cursor/cursor.jsx'
import { RUTAS } from '@const/rutas.js'
import { PROYECTOS, CATEGORIAS } from '@data/proyectos.js'
import { PROYECTOS_DETALLE } from '@data/proyectos-detalle.js'
import './proyectos.css'

/* Para que el slider no se acabe repetimos los proyectos tres veces y nos movemos
por la copia del medio. Si salimos de ella saltamos sin transición a la tarjeta
igual de la copia central y así no se nota el salto */
const PASO = 2
const PASO_MOVIL = 1
// Píxeles que hay que arrastrar en horizontal para que cuente como deslizar
const UMBRAL_SWIPE = 50
const TOTAL = PROYECTOS.length
const PISTA = [...PROYECTOS, ...PROYECTOS, ...PROYECTOS]
// El translateX en % va sobre el propio contenedor, que mide toda la pista
const ANCHO_TARJETA = 100 / PISTA.length

export const Proyectos = () => {

    const [indice, setIndice] = useState(TOTAL)
    const [conTransicion, setConTransicion] = useState(true)
    const [moviendo, setMoviendo] = useState(false)
    const [pausado, setPausado] = useState(false)
    const [arrastre, setArrastre] = useState(0)
    const inicioSwipe = useRef(null)
    const haDeslizado = useRef(false)

    /* Movemos el slider, pero ignoramos los clics mientras dura la animación
    para no salirnos de la pista */
    const mover = (paso) => {
        if (moviendo) return
        setConTransicion(true)
        setMoviendo(true)
        setIndice(indice + paso)
    }

    // En móvil se ve una sola tarjeta, así que avanzamos de una en una
    const calcularPaso = () => window.matchMedia('(max-width: 560px)').matches ? PASO_MOVIL : PASO

    // La categoría activa es la de la primera tarjeta visible, así el filtro sigue al slider
    const categoriaActual = PISTA[indice]?.categoria

    /* El filtro desplaza el slider hasta el primer proyecto de la categoría */
    const irACategoria = (categoria) => {
        if (moviendo) return
        const destino = TOTAL + PROYECTOS.findIndex(proyecto => proyecto.categoria === categoria)
        if (destino === indice) return
        setConTransicion(true)
        setMoviendo(true)
        setIndice(destino)
    }

    const siguiente = () => mover(calcularPaso())
    const anterior = () => mover(-calcularPaso())
    const pausarSlider = () => setPausado(true)
    const reanudarSlider = () => setPausado(false)

    // En móvil y tablet las tarjetas siguen al dedo mientras se arrastra
    const esMovil = () => window.matchMedia('(max-width: 930px)').matches

    /* Deslizar con el dedo o arrastrando con el ratón: guardamos dónde empieza
    y al soltar movemos el slider si el arrastre es suficiente */
    const empezarSwipe = (e) => {
        if (moviendo) return
        inicioSwipe.current = e.clientX
        haDeslizado.current = false
    }

    const seguirSwipe = (e) => {
        if (inicioSwipe.current === null || !esMovil()) return
        setArrastre(e.clientX - inicioSwipe.current)
    }

    const terminarSwipe = (e) => {
        if (inicioSwipe.current === null) return
        const distancia = e.clientX - inicioSwipe.current
        inicioSwipe.current = null
        setArrastre(0)
        if (Math.abs(distancia) < UMBRAL_SWIPE) return
        haDeslizado.current = true
        if (distancia < 0) siguiente()
        else anterior()
    }

    const cancelarSwipe = () => {
        inicioSwipe.current = null
        setArrastre(0)
    }

    // Si acabamos de deslizar no abrimos el proyecto de la tarjeta
    const evitarClicTrasSwipe = (e) => {
        if (!haDeslizado.current) return
        e.preventDefault()
        haDeslizado.current = false
    }

    /* Al acabar la animación, si estamos fuera de la copia central volvemos a ella */
    const terminarTransicion = (e) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        setMoviendo(false)
        if (indice >= 2 * TOTAL || indice < TOTAL) {
            setConTransicion(false)
            setIndice(indice >= 2 * TOTAL ? indice - TOTAL : indice + TOTAL)
        }
    }

    /* Avanzamos solos cada 8 segundos. Volvemos a crear el intervalo cuando cambia
    el índice para que siempre use el valor actual, y lo limpiamos al salir */
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
                    <div className="Proyectos-filtros" role="group" aria-label="Ir a los proyectos de una categoría">
                        {CATEGORIAS.map(categoria =>
                            <button
                                key={categoria.id}
                                type="button"
                                className={`Proyectos-filtro${categoriaActual === categoria.id ? ' isActivo' : ''}`}
                                aria-pressed={categoriaActual === categoria.id}
                                onClick={() => irACategoria(categoria.id)}
                            >
                                {categoria.texto}
                            </button>
                        )}
                    </div>
                </section>
                <div
                    className="Proyectos-slider"
                    onMouseOver={pausarSlider}
                    onMouseOut={reanudarSlider}
                    onPointerDown={empezarSwipe}
                    onPointerMove={seguirSwipe}
                    onPointerUp={terminarSwipe}
                    onPointerCancel={cancelarSwipe}
                    onPointerLeave={cancelarSwipe}
                    onClickCapture={evitarClicTrasSwipe}
                    onDragStart={e => e.preventDefault()}
                >
                    <div
                        className="Proyectos-container"
                        style={{
                            '--tarjetas': PISTA.length,
                            transform: arrastre ? `translateX(calc(-${ANCHO_TARJETA * indice}% + ${arrastre}px))` : `translateX(-${ANCHO_TARJETA * indice}%)`,
                            transition: conTransicion && !arrastre ? undefined : 'none'
                        }}
                        onTransitionEnd={terminarTransicion}
                    >
                        {PISTA.map((proyecto, i) =>
                            <TarjetaProyecto key={`${i}-${proyecto.id}`} {...proyecto} />
                        )}
                    </div>
                    <button className="Slider-arrow Slider-arrow--next" onClick={siguiente} aria-label="Proyecto siguiente"></button>
                    <button className="Slider-arrow Slider-arrow--prev" onClick={anterior} aria-label="Proyecto anterior"></button>
                </div>
            </div>
        </main>
    )
}

/* Tarjeta de cada proyecto, solo enlaza si el proyecto tiene página de detalle */
const TarjetaProyecto = (props) => {

    const { id, titulo, imagen, descripcion, categoria, imagenEntera = false } = props

    const etiqueta = CATEGORIAS.find(item => item.id === categoria)?.texto

    const contenido = (
        <>
            {imagen && <img src={imagen} alt={`imagen ${titulo}`} className={`Proyectos-img${imagenEntera ? ' Proyectos-img--entera' : ''}`} />}
            {!imagen && <div className="Proyectos-img" aria-hidden="true"></div>}
            {etiqueta && <span className="Proyectos-categoria">{etiqueta}</span>}
            <h3 className="Proyectos-h3">{titulo}</h3>
            <p className="Proyectos-p">{descripcion}</p>
        </>
    )

    if (!PROYECTOS_DETALLE[id]) return <article className="Proyectos-article">{contenido}</article>

    return (
        <article className="Proyectos-article Proyectos-article--enlace">
            <Link to={`${RUTAS.PROYECTOS}/${id}`} className="Proyectos-enlace" title={`ver el proyecto ${titulo}`}>
                {contenido}
            </Link>
        </article>
    )
}

// pages/proyecto/proyecto.jsx
// Página de detalle de un proyecto (/proyectos/:id). El contenido sale de
// data/proyectos-detalle.js; si el id no existe se vuelve a la lista. Mantiene
// la estética de Proyectos (caja turquesa y cursor halo) sobre el azul de la
// huella del logo de PawCare.

import { useState, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Cursor } from '@/components/cursor/cursor.jsx'
import { ROUTES } from '@/const/routes.js'
import { PROYECTOS_DETALLE } from '@/data/proyectos-detalle.js'
import './proyecto.css'

const ProyectoPage = () => {

    const { id } = useParams()
    const proyecto = PROYECTOS_DETALLE[id]

    if (!proyecto) return <Navigate to={ROUTES.PROYECTOS} replace />

    const {
        titulo, subtitulo, intro, portada, tecnologias, enlaces, idea, perfiles,
        recorrido, funcionalidades, construccion, flujos, diseno, colores, tipografias, logo,
        reto, conclusion, icono = 'huella', construccionTitulo = 'Cómo está construido'
    } = proyecto

    return (
        <main className={`Proyecto Proyecto--${icono}`}>
            <Cursor variante={icono} />

            <div className="Proyecto-wrapper">
                <Link to={ROUTES.PROYECTOS} className="Proyecto-volver">← Volver a proyectos</Link>

                <section className="Proyecto-cabecera">
                    <div className="Proyecto-presentacion">
                        <h2 className="Proyecto-h2">{titulo}</h2>
                        <p className="Proyecto-subtitulo">{subtitulo}</p>
                        <p className="Proyecto-p">{intro}</p>
                        <ul className="Proyecto-tags">
                            {tecnologias.map(tecnologia =>
                                <li key={tecnologia} className="Proyecto-tag">{tecnologia}</li>
                            )}
                        </ul>
                        <div className="Proyecto-enlaces">
                            {enlaces.map(enlace =>
                                <a key={enlace.id} href={enlace.url} target="_blank" rel="noopener noreferrer" className="Proyecto-boton">{enlace.texto}</a>
                            )}
                        </div>
                    </div>
                    <Imagen {...portada} grande />
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">La idea</h3>
                    <p className="Proyecto-p">{idea}</p>
                    {perfiles &&
                        <div className="Proyecto-grid Proyecto-grid--dos">
                            {perfiles.map(perfil =>
                                <Tarjeta key={perfil.id} {...perfil} />
                            )}
                        </div>
                    }
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">{recorrido.titulo}</h3>
                    <Recorrido pasos={recorrido.pasos} icono={icono} />
                </section>

                {funcionalidades &&
                    <section className="Proyecto-section">
                        <h3 className="Proyecto-h3">Qué la hace diferente</h3>
                        <div className="Proyecto-grid Proyecto-grid--tres">
                            {funcionalidades.map(funcionalidad =>
                                <Tarjeta key={funcionalidad.id} {...funcionalidad} />
                            )}
                        </div>
                    </section>
                }

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">{construccionTitulo}</h3>
                    <div className="Proyecto-grid Proyecto-grid--tres">
                        {construccion.map(parte =>
                            <Tarjeta key={parte.id} {...parte} />
                        )}
                    </div>
                </section>

                {flujos &&
                    <section className="Proyecto-section">
                        <h3 className="Proyecto-h3">{flujos.titulo}</h3>
                        <p className="Proyecto-p">{flujos.texto}</p>
                        <div className={`Proyecto-grid Proyecto-grid--flujos${flujos.anchos ? ' Proyecto-grid--flujosAnchos' : ''}`}>
                            {flujos.diagramas.map(flujo =>
                                <Flujo key={flujo.id} {...flujo} />
                            )}
                        </div>
                    </section>
                }

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Diseño</h3>
                    <div className="Proyecto-diseno">
                        <div className="Proyecto-disenoTexto">
                            <p className="Proyecto-p">{diseno}</p>
                            <ul className="Proyecto-colores">
                                {colores.map(color =>
                                    <li key={color.id} className="Proyecto-color">
                                        <span className="Proyecto-muestra" style={{ backgroundColor: color.hex }}></span>
                                        <span className="Proyecto-colorNombre">{color.nombre}</span>
                                        <span className="Proyecto-colorHex">{color.hex}</span>
                                    </li>
                                )}
                            </ul>
                            {tipografias && <p className="Proyecto-p">{tipografias}</p>}
                        </div>
                        <Imagen {...logo} />
                    </div>
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">{reto.titulo}</h3>
                    <p className="Proyecto-p">{reto.texto}</p>
                    <p className="Proyecto-p">{reto.intro}</p>
                    <ul className="Proyecto-lista">
                        {reto.lista.map(item =>
                            <li key={item.id} className="Proyecto-item">{item.texto}</li>
                        )}
                    </ul>
                    {reto.extra &&
                        <>
                            <p className="Proyecto-p">{reto.extra.intro}</p>
                            <ul className="Proyecto-lista">
                                {reto.extra.lista.map(item =>
                                    <li key={item.id} className="Proyecto-item">{item.texto}</li>
                                )}
                            </ul>
                        </>
                    }
                    <div className="Proyecto-metricas">
                        {reto.metricas.map(metrica =>
                            <div key={metrica.id} className="Proyecto-metrica">
                                <span className="Proyecto-metricaValor">{metrica.valor}</span>
                                <span className="Proyecto-metricaTexto">{metrica.texto}</span>
                            </div>
                        )}
                        <p className="Proyecto-p Proyecto-p--nota">{reto.nota}</p>
                    </div>
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Lo que me llevo</h3>
                    <p className="Proyecto-p">{conclusion}</p>
                </section>
            </div>
        </main>
    )
}

// Imagen del proyecto o, si aún no hay, hueco reservado con su etiqueta.
const Imagen = (props) => {

    const { imagen, etiqueta, grande = false, natural = false } = props
    const clase = `Proyecto-imagen${grande ? ' Proyecto-imagen--grande' : ''}${natural ? ' Proyecto-imagen--natural' : ''}`

    if (imagen) return <img src={imagen} alt={etiqueta} className={clase} loading="lazy" />

    return (
        <div className={`${clase} Proyecto-imagen--hueco`}>
            <span className="Proyecto-etiqueta">{etiqueta}</span>
        </div>
    )
}

// Recorrido por la app: carrusel infinito con flechas, swipe y un rastro de
// huellas que hace de "dots" (cada paso visitado deja una huella, alternando
// pata izquierda y derecha).
// Bucle infinito como el slider de Proyectos: la pista lleva un clon del último
// paso delante y del primero detrás; al terminar la animación sobre un clon se
// salta sin transición al paso real equivalente, así el salto no se ve.
const UMBRAL_SWIPE = 50

const Recorrido = (props) => {

    const { pasos, icono } = props
    const total = pasos.length
    const Icono = ICONOS[icono] ?? Huella
    const pista = [pasos[total - 1], ...pasos, pasos[0]]

    const [indice, setIndice] = useState(1)
    const [conTransicion, setConTransicion] = useState(true)
    const [moviendo, setMoviendo] = useState(false)
    const inicioSwipe = useRef(null)

    // Paso real (0..total-1) que corresponde a la posición en la pista.
    const actual = (indice - 1 + total) % total

    const mover = (destino) => {
        if (moviendo || destino === indice) return

        // Sin animaciones (preferencia del sistema) no hay transitionend:
        // se va directo al paso real.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setConTransicion(false)
            setIndice(((destino - 1 + total) % total) + 1)
            return
        }

        setConTransicion(true)
        setMoviendo(true)
        setIndice(destino)
    }

    const anterior = () => mover(indice - 1)
    const siguiente = () => mover(indice + 1)

    const terminarTransicion = (e) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        setMoviendo(false)
        if (indice === 0 || indice === total + 1) {
            setConTransicion(false)
            setIndice(indice === 0 ? total : 1)
        }
    }

    // Swipe con dedo o ratón: basta un arrastre corto en horizontal.
    const empezarSwipe = (e) => { inicioSwipe.current = e.clientX }
    const terminarSwipe = (e) => {
        if (inicioSwipe.current === null) return
        const distancia = e.clientX - inicioSwipe.current
        inicioSwipe.current = null
        if (Math.abs(distancia) < UMBRAL_SWIPE) return
        if (distancia < 0) siguiente()
        else anterior()
    }

    return (
        <div className="Recorrido">
            <div className="Recorrido-escenario">
                <button className="Recorrido-flecha Recorrido-flecha--prev" onClick={anterior} aria-label="Paso anterior"></button>

                <div className="Recorrido-ventana" onPointerDown={empezarSwipe} onPointerUp={terminarSwipe} onPointerLeave={() => { inicioSwipe.current = null }}>
                    <div
                        className="Recorrido-pista"
                        style={{
                            transform: `translateX(-${indice * 100}%)`,
                            transition: conTransicion ? undefined : 'none'
                        }}
                        onTransitionEnd={terminarTransicion}
                    >
                        {pista.map((paso, i) =>
                            <div key={`${i}-${paso.id}`} className="Recorrido-slide" aria-hidden={i !== indice}>
                                <article className="Recorrido-paso">
                                    <Imagen imagen={paso.imagen} etiqueta={paso.etiqueta} />
                                    <div className="Recorrido-texto">
                                        <h4 className="Recorrido-h4">{paso.titulo}</h4>
                                        <p className="Proyecto-p">{paso.texto}</p>
                                    </div>
                                </article>
                            </div>
                        )}
                    </div>
                </div>

                <button className="Recorrido-flecha Recorrido-flecha--next" onClick={siguiente} aria-label="Paso siguiente"></button>
            </div>

            <div className="Recorrido-huellas">
                {pasos.map((paso, i) =>
                    <button
                        key={paso.id}
                        className={`Recorrido-huella Recorrido-huella--${icono}${i % 2 ? ' Recorrido-huella--derecha' : ''}${i <= actual ? ' is-pisada' : ''}${i === actual ? ' is-actual' : ''}`}
                        onClick={() => mover(i + 1)}
                        aria-label={`Ir al paso ${i + 1}: ${paso.titulo}`}
                        aria-current={i === actual ? 'step' : undefined}
                    >
                        <Icono />
                    </button>
                )}
            </div>
        </div>
    )
}

// Huella de perro: almohadilla y cuatro dedos, apuntando hacia arriba.
const Huella = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path d="M32 34c-9 0-17 8-17 15 0 6 5 9 10 8 3-.5 4.5-2 7-2s4 1.5 7 2c5 1 10-2 10-8 0-7-8-15-17-15z" />
        <ellipse cx="15" cy="27" rx="5.5" ry="7.5" transform="rotate(-25 15 27)" />
        <ellipse cx="25.5" cy="15" rx="5.5" ry="8" transform="rotate(-8 25.5 15)" />
        <ellipse cx="38.5" cy="15" rx="5.5" ry="8" transform="rotate(8 38.5 15)" />
        <ellipse cx="49" cy="27" rx="5.5" ry="7.5" transform="rotate(25 49 27)" />
    </svg>
)

// Rollo de película antiguo: disco con cinco ventanas y el eje central
// (evenodd convierte los círculos interiores en huecos).
const Rollo = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path fillRule="evenodd" d="M4 32a28 28 0 1 0 56 0a28 28 0 1 0-56 0zM28 32a4 4 0 1 0 8 0a4 4 0 1 0-8 0zM25 17a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM39.27 27.36a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM33.82 44.14a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM16.18 44.14a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM10.73 27.36a7 7 0 1 0 14 0a7 7 0 1 0-14 0z" />
    </svg>
)

// Diente (PortalDental): muela con dos raíces.
const Diente = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path d="M20 5C11 5 5 11 5 20c0 7 3 11 5 16 2 6 2 23 9 23 6 0 6-16 13-16s7 16 13 16c7 0 7-17 9-23 2-5 5-9 5-16 0-9-6-15-15-15-5 0-8 3-12 3S25 5 20 5z" />
    </svg>
)

// Silla de ruedas (Turismo Sin Barreras), como la del logo del proyecto.
const Silla = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <circle cx="36" cy="9" r="6" />
        <path d="M31 17h7l2 14h12l6 18-5 2-5-14H33z" />
        <path fillRule="evenodd" d="M11 44a16 16 0 1 0 32 0a16 16 0 1 0-32 0zM16 44a11 11 0 1 0 22 0a11 11 0 1 0-22 0z" />
    </svg>
)

// Libro abierto (Ahora Somos Dos): dos páginas y el lomo en el centro.
const Libro = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path fillRule="evenodd" d="M32 15C25 10 15 9 5 11v40c10-2 20-1 27 4 7-5 17-6 27-4V11c-10-2-20-1-27 4zM31 18h2v33h-2z" />
    </svg>
)

// Icono de los puntos del carrusel según el proyecto.
const ICONOS = { huella: Huella, rollo: Rollo, diente: Diente, silla: Silla, libro: Libro }

// Diagrama de flujo: miniatura que abre la imagen completa en otra pestaña.
const Flujo = (props) => {

    const { titulo, imagen } = props

    return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4 Proyecto-h4--flujo">{titulo}</h4>
            <a href={imagen} target="_blank" rel="noopener noreferrer" className="Proyecto-flujo" title={`ver diagrama: ${titulo}`}>
                <img src={imagen} alt={`Diagrama de flujo: ${titulo}`} className="Proyecto-flujoImg" loading="lazy" />
            </a>
        </article>
    )
}

// Tarjeta turquesa como las del carrusel de Proyectos (C11b).
const Tarjeta = (props) => {

    const { titulo, texto } = props

    return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4">{titulo}</h4>
            <p className="Proyecto-p">{texto}</p>
        </article>
    )
}

export default ProyectoPage

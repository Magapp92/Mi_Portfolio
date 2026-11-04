// pages/proyecto/proyecto.jsx
// [IA] Página de detalle de un proyecto (/proyectos/:id). El contenido sale de
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
        recorrido, construccion, flujos, diseno, colores, tipografias, logo,
        reto, mejoras, metricas, conclusion
    } = proyecto

    return (
        <main className="Proyecto">
            <Cursor variante="huella" />

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
                    <div className="Proyecto-grid Proyecto-grid--dos">
                        {perfiles.map(perfil =>
                            <Tarjeta key={perfil.id} {...perfil} />
                        )}
                    </div>
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Recorrido por la app</h3>
                    <Recorrido pasos={recorrido} />
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Cómo está construido</h3>
                    <div className="Proyecto-grid Proyecto-grid--tres">
                        {construccion.map(parte =>
                            <Tarjeta key={parte.id} {...parte} />
                        )}
                    </div>
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Flujos de la app</h3>
                    <p className="Proyecto-p">Así se mueve cada tipo de usuario por la aplicación, desde el login hasta la gestión de reservas y mascotas. Pulsa un diagrama para verlo a tamaño completo.</p>
                    <div className="Proyecto-grid Proyecto-grid--flujos">
                        {flujos.map(flujo =>
                            <Flujo key={flujo.id} {...flujo} />
                        )}
                    </div>
                </section>

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
                            <p className="Proyecto-p">{tipografias}</p>
                        </div>
                        <Imagen {...logo} />
                    </div>
                </section>

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Retos y segunda versión</h3>
                    <p className="Proyecto-p">{reto}</p>
                    <p className="Proyecto-p">Tras la primera evaluación revisé la aplicación a fondo y publiqué una segunda versión más sólida:</p>
                    <ul className="Proyecto-lista">
                        {mejoras.map(mejora =>
                            <li key={mejora.id} className="Proyecto-item">{mejora.texto}</li>
                        )}
                    </ul>
                    <div className="Proyecto-metricas">
                        {metricas.map(metrica =>
                            <div key={metrica.id} className="Proyecto-metrica">
                                <span className="Proyecto-metricaValor">{metrica.valor}</span>
                                <span className="Proyecto-metricaTexto">{metrica.texto}</span>
                            </div>
                        )}
                        <p className="Proyecto-p Proyecto-p--nota">Puntuaciones de Lighthouse, gracias a imágenes WebP con carga diferida y tipografías alojadas en local.</p>
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

    const { imagen, etiqueta, grande = false } = props
    const clase = `Proyecto-imagen${grande ? ' Proyecto-imagen--grande' : ''}`

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

    const { pasos } = props
    const total = pasos.length
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
                        className={`Recorrido-huella${i % 2 ? ' Recorrido-huella--derecha' : ''}${i <= actual ? ' is-pisada' : ''}${i === actual ? ' is-actual' : ''}`}
                        onClick={() => mover(i + 1)}
                        aria-label={`Ir al paso ${i + 1}: ${paso.titulo}`}
                        aria-current={i === actual ? 'step' : undefined}
                    >
                        <Huella />
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

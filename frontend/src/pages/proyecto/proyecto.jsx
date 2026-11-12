/* Página de detalle de cada proyecto. Si el id no existe volvemos a la lista */

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Cursor } from '@components/cursor/cursor.jsx'
import { RUTAS } from '@const/rutas.js'
import { PROYECTOS } from '@data/proyectos.js'
import { PROYECTOS_DETALLE } from '@data/proyectos-detalle.js'
import './proyecto.css'

/* Buscamos el proyecto por el id de la ruta y pintamos todas sus secciones */
export const Proyecto = () => {

    const { id } = useParams()
    const proyecto = PROYECTOS_DETALLE[id]

    /* Al pasar de un proyecto a otro empezamos desde arriba */
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!proyecto) return <Navigate to={RUTAS.PROYECTOS} replace />

    const {
        titulo, subtitulo, intro, resumen, portada, tecnologias, enlaces, idea, perfiles,
        recorrido, funcionalidades, construccion, flujos, diseno, colores, tipografias, logo,
        reto, aprendizaje, conclusion, icono = 'huella', construccionTitulo = 'Cómo está construido'
    } = proyecto

    // Con la key el carrusel del recorrido vuelve al primer paso al cambiar de proyecto
    return (
        <main key={id} className={`Proyecto Proyecto--${icono}`}>
            <Cursor variante={icono} />

            <div className="Proyecto-wrapper">
                <Link to={RUTAS.PROYECTOS} className="Proyecto-volver">← Volver a proyectos</Link>

                <section className="Proyecto-cabecera">
                    <div className="Proyecto-presentacion">
                        <h2 className="Proyecto-h2">{titulo}</h2>
                        <p className="Proyecto-subtitulo">{subtitulo}</p>
                        <p className="Proyecto-p">{intro}</p>
                        {resumen && <Resumen {...resumen} />}
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
                    {reto.lista &&
                        <ul className="Proyecto-lista">
                            {reto.lista.map(item =>
                                <li key={item.id} className="Proyecto-item">{item.texto}</li>
                            )}
                        </ul>
                    }
                    {reto.ficha && <FichaTecnica filas={reto.ficha} />}
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

                {aprendizaje &&
                    <section className="Proyecto-section">
                        <h3 className="Proyecto-h3">Qué aprendí y qué descarté</h3>
                        <div className="Proyecto-grid Proyecto-grid--dos">
                            <ListaAprendizaje titulo="Qué aprendí" items={aprendizaje.aprendi} />
                            <ListaAprendizaje titulo="Qué descarté y por qué" items={aprendizaje.descarte} />
                        </div>
                    </section>
                }

                <section className="Proyecto-section">
                    <h3 className="Proyecto-h3">Lo que me llevo</h3>
                    <p className="Proyecto-p">{conclusion}</p>
                </section>

                <NavegacionProyectos id={id} />
            </div>
        </main>
    )
}

/* Ficha rápida para quien lee en diagonal: rol, tipo, contexto y resultado */
const Resumen = (props) => {

    const { rol, tipo, contexto, resultado } = props

    const datos = [
        { id: 'rol', nombre: 'Rol', valor: rol },
        { id: 'tipo', nombre: 'Tipo', valor: tipo },
        { id: 'contexto', nombre: 'Contexto', valor: contexto },
        { id: 'resultado', nombre: 'Resultado', valor: resultado }
    ]

    return (
        <dl className="Proyecto-resumen">
            {datos.map(dato =>
                <div key={dato.id} className="Proyecto-resumenFila">
                    <dt className="Proyecto-resumenNombre">{dato.nombre}</dt>
                    <dd className="Proyecto-resumenValor">{dato.valor}</dd>
                </div>
            )}
        </dl>
    )
}

/* Tabla con cada decisión de producción y su porqué */
const FichaTecnica = (props) => {

    const { filas } = props

    return (
        <table className="Proyecto-ficha">
            <thead>
                <tr>
                    <th scope="col" className="Proyecto-fichaCabecera">Elemento</th>
                    <th scope="col" className="Proyecto-fichaCabecera">Decisión</th>
                    <th scope="col" className="Proyecto-fichaCabecera">Por qué</th>
                </tr>
            </thead>
            <tbody>
                {filas.map(fila =>
                    <tr key={fila.id} className="Proyecto-fichaFila">
                        <th scope="row" className="Proyecto-fichaElemento">{fila.elemento}</th>
                        <td className="Proyecto-fichaCelda">{fila.decision}</td>
                        <td className="Proyecto-fichaCelda Proyecto-fichaCelda--motivo">{fila.motivo || '—'}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

/* Recuadro con lo aprendido o lo descartado en el proyecto */
const ListaAprendizaje = (props) => {

    const { titulo, items } = props

    return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4">{titulo}</h4>
            <ul className="Proyecto-lista Proyecto-lista--tarjeta">
                {items.map(item =>
                    <li key={item.id} className="Proyecto-item">{item.texto}</li>
                )}
            </ul>
        </article>
    )
}

/* Al final de cada proyecto: volver a todos o pasar al siguiente, en el orden del slider */
const NavegacionProyectos = (props) => {

    const { id } = props

    const conDetalle = PROYECTOS.filter(proyecto => PROYECTOS_DETALLE[proyecto.id])
    const posicion = conDetalle.findIndex(proyecto => proyecto.id === id)
    const siguiente = conDetalle[(posicion + 1) % conDetalle.length]

    return (
        <nav className="Proyecto-navegacion" aria-label="Navegación entre proyectos">
            <Link to={RUTAS.PROYECTOS} className="Proyecto-boton Proyecto-boton--todos">← Ver todos los proyectos</Link>
            <Link to={`${RUTAS.PROYECTOS}/${siguiente.id}`} className="Proyecto-siguiente">
                <span className="Proyecto-siguienteEtiqueta">Siguiente proyecto</span>
                <span className="Proyecto-siguienteTitulo">{siguiente.titulo} →</span>
            </Link>
        </nav>
    )
}

/* Mostramos la imagen del proyecto o, si todavía no la tenemos,
un hueco con su etiqueta */
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

/* Distancia mínima en píxeles para que un arrastre cuente como swipe */
const UMBRAL_SWIPE = 50

/* Carrusel infinito del recorrido por la app, con flechas, swipe y un rastro de huellas
como puntos. La pista lleva un clon del último paso delante y del primero detrás,
y al llegar a un clon saltamos sin transición al paso real para que no se note */
const Recorrido = (props) => {

    const { pasos, icono } = props
    const total = pasos.length
    const Icono = ICONOS[icono] ?? Huella
    const pista = [pasos[total - 1], ...pasos, pasos[0]]

    const [indice, setIndice] = useState(1)
    const [conTransicion, setConTransicion] = useState(true)
    const [moviendo, setMoviendo] = useState(false)
    const [arrastre, setArrastre] = useState(0)
    const inicioSwipe = useRef(null)

    // Paso real que corresponde a la posición de la pista
    const actual = (indice - 1 + total) % total

    /* Movemos la pista hasta el paso que nos pidan */
    const mover = (destino) => {
        if (moviendo || destino === indice) return

        // Si el sistema pide menos animaciones no llega el transitionend, así que vamos directos
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

    /* Al acabar la animación, si estamos en un clon saltamos al paso real */
    const terminarTransicion = (e) => {
        if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
        setMoviendo(false)
        if (indice === 0 || indice === total + 1) {
            setConTransicion(false)
            setIndice(indice === 0 ? total : 1)
        }
    }

    /* Guardamos dónde empieza el arrastre, con el dedo o con el ratón */
    const empezarSwipe = (e) => {
        if (moviendo) return
        inicioSwipe.current = e.clientX
    }

    /* En móvil y tablet la tarjeta sigue al dedo mientras se arrastra */
    const seguirSwipe = (e) => {
        if (inicioSwipe.current === null || !window.matchMedia('(max-width: 930px)').matches) return
        setArrastre(e.clientX - inicioSwipe.current)
    }

    /* Si el arrastre es lo bastante largo pasamos al paso anterior o al siguiente */
    const terminarSwipe = (e) => {
        if (inicioSwipe.current === null) return
        const distancia = e.clientX - inicioSwipe.current
        inicioSwipe.current = null
        setArrastre(0)
        if (Math.abs(distancia) < UMBRAL_SWIPE) return
        if (distancia < 0) siguiente()
        else anterior()
    }

    /* Si el dedo sale de la ventana soltamos el arrastre */
    const cancelarSwipe = () => {
        inicioSwipe.current = null
        setArrastre(0)
    }

    return (
        <div className="Recorrido">
            <div className="Recorrido-escenario">
                <button className="Recorrido-flecha Recorrido-flecha--prev" onClick={anterior} aria-label="Paso anterior"></button>

                <div className="Recorrido-ventana" onPointerDown={empezarSwipe} onPointerMove={seguirSwipe} onPointerUp={terminarSwipe} onPointerCancel={cancelarSwipe} onPointerLeave={cancelarSwipe}>
                    <div
                        className="Recorrido-pista"
                        style={{
                            transform: arrastre ? `translateX(calc(-${indice * 100}% + ${arrastre}px))` : `translateX(-${indice * 100}%)`,
                            transition: conTransicion && !arrastre ? undefined : 'none'
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
                        className={`Recorrido-huella Recorrido-huella--${icono}${i % 2 ? ' Recorrido-huella--derecha' : ''}${i <= actual ? ' isPisada' : ''}${i === actual ? ' isActual' : ''}`}
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

/* Huella de perro con la almohadilla y cuatro dedos */
const Huella = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path d="M32 34c-9 0-17 8-17 15 0 6 5 9 10 8 3-.5 4.5-2 7-2s4 1.5 7 2c5 1 10-2 10-8 0-7-8-15-17-15z" />
        <ellipse cx="15" cy="27" rx="5.5" ry="7.5" transform="rotate(-25 15 27)" />
        <ellipse cx="25.5" cy="15" rx="5.5" ry="8" transform="rotate(-8 25.5 15)" />
        <ellipse cx="38.5" cy="15" rx="5.5" ry="8" transform="rotate(8 38.5 15)" />
        <ellipse cx="49" cy="27" rx="5.5" ry="7.5" transform="rotate(25 49 27)" />
    </svg>
)

/* Rollo de película antiguo con cinco ventanas y el eje central,
evenodd hace que los círculos de dentro queden huecos */
const Rollo = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path fillRule="evenodd" d="M4 32a28 28 0 1 0 56 0a28 28 0 1 0-56 0zM28 32a4 4 0 1 0 8 0a4 4 0 1 0-8 0zM25 17a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM39.27 27.36a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM33.82 44.14a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM16.18 44.14a7 7 0 1 0 14 0a7 7 0 1 0-14 0zM10.73 27.36a7 7 0 1 0 14 0a7 7 0 1 0-14 0z" />
    </svg>
)

/* Muela con dos raíces para PortalDental */
const Diente = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path d="M20 5C11 5 5 11 5 20c0 7 3 11 5 16 2 6 2 23 9 23 6 0 6-16 13-16s7 16 13 16c7 0 7-17 9-23 2-5 5-9 5-16 0-9-6-15-15-15-5 0-8 3-12 3S25 5 20 5z" />
    </svg>
)

/* Silla de ruedas de Turismo Sin Barreras, como la de su logo */
const Silla = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <circle cx="36" cy="9" r="6" />
        <path d="M31 17h7l2 14h12l6 18-5 2-5-14H33z" />
        <path fillRule="evenodd" d="M11 44a16 16 0 1 0 32 0a16 16 0 1 0-32 0zM16 44a11 11 0 1 0 22 0a11 11 0 1 0-22 0z" />
    </svg>
)

/* Libro abierto de Ahora Somos Dos, con dos páginas y el lomo en medio */
const Libro = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path fillRule="evenodd" d="M32 15C25 10 15 9 5 11v40c10-2 20-1 27 4 7-5 17-6 27-4V11c-10-2-20-1-27 4zM31 18h2v33h-2z" />
    </svg>
)

/* Calendario de Agenda 2026, con las anillas y algunos días marcados */
const Calendario = () => (
    <svg viewBox="0 0 64 64" className="Recorrido-huellaSvg" aria-hidden="true">
        <path fillRule="evenodd" d="M8 12h48v44H8zM12 24h40v28H12zM16 28h6v6h-6zM29 28h6v6h-6zM42 28h6v6h-6zM16 40h6v6h-6zM29 40h6v6h-6z" />
        <path d="M18 6h4v12h-4zM42 6h4v12h-4z" />
    </svg>
)

/* Elegimos el icono de los puntos del carrusel según el proyecto */
const ICONOS = {
    huella: Huella,
    rollo: Rollo,
    diente: Diente,
    silla: Silla,
    libro: Libro,
    calendario: Calendario
}

/* Miniatura del diagrama de flujo que se abre ampliada en el visor */
const Flujo = (props) => {

    const { titulo, imagen, ampliable = true } = props
    const [abierto, setAbierto] = useState(false)
    const alt = `Diagrama de flujo: ${titulo}`

    if (!ampliable) return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4 Proyecto-h4--flujo">{titulo}</h4>
            <div className="Proyecto-flujo Proyecto-flujo--fijo">
                <img src={imagen} alt={alt} className="Proyecto-flujoImg" loading="lazy" />
            </div>
        </article>
    )

    return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4 Proyecto-h4--flujo">{titulo}</h4>
            <button type="button" className="Proyecto-flujo" onClick={() => setAbierto(true)} aria-label={`Ampliar diagrama: ${titulo}`}>
                <img src={imagen} alt={alt} className="Proyecto-flujoImg" loading="lazy" />
            </button>
            {abierto && <Visor imagen={imagen} alt={alt} onCerrar={() => setAbierto(false)} />}
        </article>
    )
}

/* Visor a pantalla completa con la página desenfocada detrás. Lo metemos en un portal
al body para que quede encima del header, y se cierra con Escape, la X o clic fuera */
const Visor = (props) => {

    const { imagen, alt, onCerrar } = props
    const botonCerrar = useRef(null)

    useEffect(() => {
        const previo = document.activeElement
        const overflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        botonCerrar.current?.focus()

        const alPulsar = (e) => {
            if (e.key === 'Escape') onCerrar()
        }
        document.addEventListener('keydown', alPulsar)

        // Al cerrar devolvemos el scroll y el foco como estaban
        return () => {
            document.removeEventListener('keydown', alPulsar)
            document.body.style.overflow = overflow
            previo?.focus()
        }
    }, [onCerrar])

    return createPortal(
        <div className="Visor" role="dialog" aria-modal="true" aria-label={alt} onClick={onCerrar}>
            <button ref={botonCerrar} type="button" className="Visor-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
            <img src={imagen} alt={alt} className="Visor-imagen" onClick={e => e.stopPropagation()} />
        </div>,
        document.body
    )
}

/* Tarjeta de color como las del carrusel de Proyectos */
const Tarjeta = (props) => {

    const { titulo, texto } = props

    return (
        <article className="Proyecto-tarjeta">
            <h4 className="Proyecto-h4">{titulo}</h4>
            <p className="Proyecto-p">{texto}</p>
        </article>
    )
}

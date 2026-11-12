/* Página de inicio con el vídeo de fondo, las especialidades animadas y la frase */

import { Link } from 'react-router-dom'
import { Cursor } from '@components/cursor/cursor.jsx'
import { RUTAS } from '@const/rutas.js'
import { CONTACTO, DISPONIBILIDAD } from '@const/contacto.js'
import { ESTUDIOS } from '@data/estudios.js'
import './inicio.css'

export const Inicio = () => {
    return (
        <main className="Inicio">
            <Cursor variante="punto" conEstela />
            <video src="/assets/VideoFondo.mp4" poster="/assets/VideoFondo-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="Inicio-video"></video>
            <div className="Inicio-content">
                <div className="Inicio-studies">
                    {ESTUDIOS.map(estudio =>
                        <Estudio key={estudio.id} {...estudio} />
                    )}
                </div>
                <div className="Inicio-izquierda">
                    <div className="Inicio-frase">
                        <Link to={RUTAS.SOBRE_MI} className="Inicio-enlace">
                            <h3 className="Inicio-h3">Nunca es tarde para empezar de nuevo</h3>
                        </Link>
                    </div>
                    <Presentacion />
                </div>
            </div>
        </main>
    )
}

/* Cada especialidad enlaza a formación y lleva su modificador para que
aparezcan una detrás de otra */
const Estudio = (props) => {

    const { id, texto } = props

    return (
        <Link to={RUTAS.FORMACION} className="Inicio-enlace">
            <h2 className={`Inicio-h2 Inicio-h2--${id}`}>{texto}</h2>
        </Link>
    )
}

/* Quién soy, si busco empleo y los accesos directos a proyectos y contacto */
const Presentacion = () => {
    return (
        <div className="Inicio-presentacion">
            <p className="Inicio-rol">Magaly Puente · Desarrolladora Full Stack y diseñadora UX/UI</p>
            <div className="Inicio-disponible">
                <p className="Inicio-estado">
                    <span className="Inicio-punto" aria-hidden="true"></span>
                    {DISPONIBILIDAD.ESTADO}
                </p>
                {DISPONIBILIDAD.ZONAS.map(zona =>
                    <p key={zona} className="Inicio-detalle">{zona}</p>
                )}
            </div>
            <div className="Inicio-botones">
                <Link to={RUTAS.PROYECTOS} className="Inicio-boton Inicio-boton--lleno">Ver proyectos</Link>
                <a href={`mailto:${CONTACTO.EMAIL}`} className="Inicio-boton Inicio-boton--borde">Contacto</a>
                <a href={CONTACTO.CV} download className="Inicio-boton Inicio-boton--borde">Descargar CV</a>
            </div>
        </div>
    )
}

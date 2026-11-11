/* Página de formación: cada tarjeta hexagonal gira al pasar el ratón */

import { Cursor } from '@components/cursor/cursor.jsx'
import { FORMACION } from '@data/formacion.js'
import './formacion.css'

export const Formacion = () => {
    return (
        <main className="Formacion">
            <Cursor variante="halo" />
            <video src="/assets/videoFondoFormacion.mp4" poster="/assets/videoFondoFormacion-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="Formacion-video"></video>
            <div className="Formacion-wrapper">
                <section className="Formacion-section">
                    <h2 className="Formacion-h2">Formación</h2>
                    <p className="Formacion-pSection">Formarse es invertir en ti, lo que aprendes hoy transforma tu presente y te abre las puertas al futuro</p>
                </section>
                <div className="Formacion-bottom">
                    {FORMACION.map(formacion =>
                        <TarjetaFormacion key={formacion.id} {...formacion} />
                    )}
                </div>
            </div>
        </main>
    )
}

/* Tarjeta con el título delante y la descripción detrás, el giro lo hace el CSS */
const TarjetaFormacion = (props) => {

    const { titulo, descripcion } = props

    return (
        <article className="Formacion-article">
            <div className="Formacion-front">
                <h3 className="Formacion-h3 Formacion-h3--front">{titulo}</h3>
            </div>
            <div className="Formacion-back">
                <p className="Formacion-p">{descripcion}</p>
            </div>
        </article>
    )
}

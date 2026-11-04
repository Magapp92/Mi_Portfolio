// pages/formacion/formacion.jsx
// [IA] Página de formación. Traslada formacion.html + js/formacion.js: cada
// tarjeta hexagonal gira (flip) al pasar el ratón por encima (CSS :hover).

import { Cursor } from '@/components/cursor/cursor.jsx'
import { FORMACION } from '@/data/formacion.js'
import './formacion.css'

const FormacionPage = () => {
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

// Subcomponente de la tarjeta flip (patrón de map del profesor, C11b).
const TarjetaFormacion = (props) => {

    const { titulo, descripcion } = props

    // El giro lo hace el CSS con :hover.
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

export default FormacionPage

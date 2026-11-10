// pages/home/home.jsx
// Página de inicio. Traslada index.html: vídeo de fondo, especialidades
// animadas y frase. El cursor con estela viene del componente Cursor.

import { Link } from 'react-router-dom'
import { Cursor } from '@/components/cursor/cursor.jsx'
import { ESTUDIOS } from '@/data/estudios.js'
import { ROUTES } from '@/const/routes.js'
import './home.css'

const HomePage = () => {
    return (
        <main className="Home">
            <Cursor variante="punto" conEstela />
            <video src="/assets/VideoFondo.mp4" poster="/assets/VideoFondo-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="Home-video"></video>
            <div className="Home-content">
                <div className="Home-studies">
                    {ESTUDIOS.map(estudio =>
                        <Estudio key={estudio.id} {...estudio} />
                    )}
                </div>
                <div className="Home-frase">
                    <Link to={ROUTES.SOBRE_MI} className="Home-enlace">
                        <h3 className="Home-h3">Nunca es tarde para empezar de nuevo</h3>
                    </Link>
                </div>
            </div>
        </main>
    )
}

// Subcomponente de cada especialidad (patrón de map del profesor, regla C11b).
// El modificador CSS conserva la animación escalonada de la web original.
const Estudio = (props) => {

    const { id, texto } = props

    return (
        <Link to={ROUTES.FORMACION} className="Home-enlace">
            <h2 className={`Home-h2 Home-h2--${id}`}>{texto}</h2>
        </Link>
    )
}

export default HomePage

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RUTAS } from '@const/rutas.js'
import './header.css'

/* Enlaces del menú de navegación */
const ENLACES = [
    { id: 'sobre-mi', ruta: RUTAS.SOBRE_MI, texto: 'Sobre mi', titulo: 'ir a sobre mi' },
    { id: 'proyectos', ruta: RUTAS.PROYECTOS, texto: 'Proyectos', titulo: 'ir a proyectos' },
    { id: 'formacion', ruta: RUTAS.FORMACION, texto: 'Formación', titulo: 'ir a formación' },
    { id: 'juego', ruta: RUTAS.JUEGO, texto: 'Juego', titulo: 'ir al quiz de Harry Potter' }
]

/* Cabecera fija con el logo animado, el nombre y el menú */
export const Header = () => {

    const [conScroll, setConScroll] = useState(false)

    /* Al hacer scroll la cabecera se vuelve translúcida para que se vea
    el contenido de debajo */
    useEffect(() => {
        const comprobarScroll = () => setConScroll(window.scrollY > 0)

        comprobarScroll()
        window.addEventListener('scroll', comprobarScroll, { passive: true })

        return () => window.removeEventListener('scroll', comprobarScroll)
    }, [])

    return (
        <header className={`Header${conScroll ? ' isTranslucida' : ''}`}>
            <div className="Header-logo">
                <Link to={RUTAS.INICIO} className="Header-a">
                    {/* El texto en arco va en otra imagen para que gire solo
                    y pase por detrás del ordenador */}
                    <div className="Header-logoCompleto">
                        <img src="/assets/logo-texto.svg" alt="" className="Header-imgTexto" />
                        <img src="/assets/logo-interior.svg" alt="logo de Magaly Puente, diseñadora y desarrolladora web" className="Header-imgInterior" />
                    </div>
                </Link>
                <h1 className="Header-h1">
                    <Link to={RUTAS.INICIO} title="ir a inicio" className="Header-a">Magaly Puente</Link>
                </h1>
            </div>
            <nav className="Header-nav">
                <ul className="Header-ul">
                    {ENLACES.map(enlace =>
                        <EnlaceNav key={enlace.id} {...enlace} />
                    )}
                </ul>
            </nav>
        </header>
    )
}

/* Cada enlace del menú */
const EnlaceNav = (props) => {

    const { ruta, texto, titulo } = props

    return (
        <li className="Header-li">
            <Link to={ruta} title={titulo} className="Header-a">{texto}</Link>
        </li>
    )
}

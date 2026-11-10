// components/header/header.jsx
// [IA] Cabecera fija con logo animado y navegación. Traslada el <header> de la
// web original a React Router (Link en vez de <a href="*.html">), añadiendo el
// enlace nuevo a la sección del juego.

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/const/routes.js'
import './header.css'

// Enlaces de navegación centralizados para el map (regla C11: key estable, no índice).
const ENLACES = [
    { id: 'sobre-mi', ruta: ROUTES.SOBRE_MI, texto: 'Sobre mi', titulo: 'ir a sobre mi' },
    { id: 'proyectos', ruta: ROUTES.PROYECTOS, texto: 'Proyectos', titulo: 'ir a proyectos' },
    { id: 'formacion', ruta: ROUTES.FORMACION, texto: 'Formación', titulo: 'ir a formación' },
    { id: 'juego', ruta: ROUTES.JUEGO, texto: 'Juego', titulo: 'ir al quiz de Harry Potter' }
]

export const Header = () => {

    const [conScroll, setConScroll] = useState(false)

    // Al bajar, la cabecera pasa a translúcida para dejar ver el contenido que
    // queda debajo. Listener con cleanup (regla C13).
    useEffect(() => {
        const comprobarScroll = () => setConScroll(window.scrollY > 0)

        comprobarScroll()
        window.addEventListener('scroll', comprobarScroll, { passive: true })

        return () => window.removeEventListener('scroll', comprobarScroll)
    }, [])

    return (
        <header className={`Header${conScroll ? ' is-translucida' : ''}`}>
            <div className="Header-logo">
                <Link to={ROUTES.HOME} className="Header-a">
                    {/* El texto en arco va aparte para girar sobre su propio
                        trazo; el interior queda encima y el texto pasa por
                        detrás del ordenador. */}
                    <div className="Header-logoCompleto">
                        <img src="/assets/logo-texto.svg" alt="" className="Header-imgTexto" />
                        <img src="/assets/logo-interior.svg" alt="logo de Magaly Puente, diseñadora y desarrolladora web" className="Header-imgInterior" />
                    </div>
                </Link>
                <h1 className="Header-h1">
                    <Link to={ROUTES.HOME} title="ir a inicio" className="Header-a">Magaly Puente</Link>
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

// Subcomponente del enlace (patrón de map del profesor, regla C11b):
// recibe props con spread y las destructura dentro del cuerpo.
const EnlaceNav = (props) => {

    const { ruta, texto, titulo } = props

    return (
        <li className="Header-li">
            <Link to={ruta} title={titulo} className="Header-a">{texto}</Link>
        </li>
    )
}

export default Header

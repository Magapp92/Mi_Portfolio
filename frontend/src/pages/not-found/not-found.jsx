// pages/not-found/not-found.jsx
// Página 404 del SPA (ruta catch-all '*').

import { Link } from 'react-router-dom'
import { ROUTES } from '@/const/routes.js'
import './not-found.css'

const NotFoundPage = () => {
    return (
        <main className="NotFound">
            <h2 className="NotFound-h2">404</h2>
            <p className="NotFound-p">Esta página no existe… ni con un giratiempo la vas a encontrar.</p>
            <Link to={ROUTES.HOME} className="NotFound-enlace">Volver al inicio</Link>
        </main>
    )
}

export default NotFoundPage

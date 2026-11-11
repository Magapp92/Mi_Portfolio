/* Página 404 que sale cuando la ruta no existe */

import { Link } from 'react-router-dom'
import { RUTAS } from '@const/rutas.js'
import './no-encontrada.css'

export const NoEncontrada = () => {
    return (
        <main className="NoEncontrada">
            <h2 className="NoEncontrada-h2">404</h2>
            <p className="NoEncontrada-p">Esta página no existe… ni con un giratiempo la vas a encontrar.</p>
            <Link to={RUTAS.INICIO} className="NoEncontrada-enlace">Volver al inicio</Link>
        </main>
    )
}

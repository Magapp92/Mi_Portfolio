
/* Punto de entrada: montamos React en #root y envolvemos la app con el
JuegoProvider para compartir el estado del quiz */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JuegoProvider } from '@context/juego-context.jsx'
import App from './app.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <JuegoProvider>
            <App />
        </JuegoProvider>
    </StrictMode>
)

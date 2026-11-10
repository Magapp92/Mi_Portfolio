// main.jsx
// Punto de entrada del SPA. Monta React en #root y envuelve la app con el
// JuegoProvider (estado global del quiz, regla C8).

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JuegoProvider } from '@/context/juego-context.jsx'
import { App } from '@/App.jsx'
import '@/index.css'

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <JuegoProvider>
            <App />
        </JuegoProvider>
    </StrictMode>
)

// hooks/use-juego.js
// Acceso cómodo al contexto del juego. Los componentes importan este hook
// en vez de useContext + JuegoContext por separado.

import { useContext } from 'react'
import { JuegoContext } from '@/context/juego-context.jsx'

/**
 * @returns {{ nick: string, guardarNick: Function, ultimaPuntuacionId: string|null, guardarUltimaPuntuacionId: Function }}
 */
export const useJuego = () => useContext(JuegoContext)

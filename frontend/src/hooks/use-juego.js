
import { useContext } from 'react'
import { JuegoContext } from '@context/juego-context.jsx'

/* Devolvemos el contexto del juego: nick, casa y última puntuación */
export const useJuego = () => useContext(JuegoContext)

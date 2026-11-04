// context/juego-context.jsx
// [IA] Estado global del juego (regla C8: useContext en /context).
// Guarda el nick del jugador y el id de su última puntuación, ambos
// persistidos en localStorage (regla C19) para sobrevivir a recargas.

import { createContext } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage.js'

export const JuegoContext = createContext(null)

/**
 * Provider del estado global del quiz.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export const JuegoProvider = (props) => {

    const { children } = props

    const [nick, setNick] = useLocalStorage('hp-quiz-nick', '')
    const [ultimaPuntuacionId, setUltimaPuntuacionId] = useLocalStorage('hp-quiz-ultima-puntuacion', null)

    // Handlers en castellano (regla C7b).
    const guardarNick = (nuevoNick) => setNick(nuevoNick)
    const guardarUltimaPuntuacionId = (id) => setUltimaPuntuacionId(id)

    const value = {
        nick,
        guardarNick,
        ultimaPuntuacionId,
        guardarUltimaPuntuacionId
    }

    return (
        <JuegoContext.Provider value={value}>
            {children}
        </JuegoContext.Provider>
    )
}

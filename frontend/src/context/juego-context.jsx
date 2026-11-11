
import { createContext } from 'react'
import { useAlmacenamiento } from '@hooks/use-almacenamiento.js'

export const JuegoContext = createContext(null)

/* Guardamos el nick, la casa y la última puntuación del jugador en localStorage
para que sigan ahí al recargar la página */
export const JuegoProvider = (props) => {
    const { children } = props

    const [nick, setNick] = useAlmacenamiento('hp-quiz-nick', '')
    const [casa, setCasa] = useAlmacenamiento('hp-quiz-casa', '')
    const [ultimaPuntuacionId, setUltimaPuntuacionId] = useAlmacenamiento('hp-quiz-ultima-puntuacion', null)

    const guardarNick = (nuevoNick) => setNick(nuevoNick)
    const guardarCasa = (nuevaCasa) => setCasa(nuevaCasa)
    const guardarUltimaPuntuacionId = (id) => setUltimaPuntuacionId(id)

    const value = {
        nick,
        guardarNick,
        casa,
        guardarCasa,
        ultimaPuntuacionId,
        guardarUltimaPuntuacionId
    }

    return (
        <JuegoContext.Provider value={value}>
            {children}
        </JuegoContext.Provider>
    )
}

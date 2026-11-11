
import { useState, useEffect } from 'react'

/* Cronómetro de la partida: suma un segundo mientras está activo */
export const useCronometro = () => {
    const [segundos, setSegundos] = useState(0)
    const [activo, setActivo] = useState(false)

    /* Cada vez que cambian los segundos programamos el siguiente y lo limpiamos
    al parar o al desmontar el componente */
    useEffect(() => {
        if (!activo) return

        const timeout = setTimeout(() => setSegundos(segundos + 1), 1000)

        return () => clearTimeout(timeout)
    }, [activo, segundos])

    /* Empezamos desde cero */
    const iniciarCronometro = () => {
        setSegundos(0)
        setActivo(true)
    }

    const pararCronometro = () => setActivo(false)

    return { segundos, activo, iniciarCronometro, pararCronometro }
}

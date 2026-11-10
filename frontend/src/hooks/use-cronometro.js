// hooks/use-cronometro.js
// Cronómetro del juego. Cuenta segundos mientras está activo.
// El setTimeout se limpia en el return del useEffect (regla C13) y el setter
// se llama con el valor directo `segundos + 1` (patrón profesor, regla C7).

import { useState, useEffect } from 'react'

/**
 * @returns {{ segundos: number, activo: boolean, iniciarCronometro: Function, pararCronometro: Function }}
 */
export const useCronometro = () => {

    const [segundos, setSegundos] = useState(0)
    const [activo, setActivo] = useState(false)

    useEffect(() => {
        if (!activo) return

        // Un tick por segundo; al depender de `segundos` el efecto se re-lanza
        // en cada cambio y no hay closures obsoletas.
        const timeout = setTimeout(() => setSegundos(segundos + 1), 1000)

        // Cleanup del timeout (regla C13).
        return () => clearTimeout(timeout)
    }, [activo, segundos])

    // Handlers en castellano (regla C7b).
    const iniciarCronometro = () => {
        setSegundos(0)
        setActivo(true)
    }

    const pararCronometro = () => setActivo(false)

    return { segundos, activo, iniciarCronometro, pararCronometro }
}

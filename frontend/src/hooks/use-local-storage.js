// hooks/use-local-storage.js
// [IA] Persiste un valor en localStorage (regla C19: guardar datos relevantes
// como el nick del jugador para que sobrevivan a recargas).

import { useState, useEffect } from 'react'

/**
 * Estado sincronizado con localStorage.
 * @template T
 * @param {string} key                Clave de localStorage.
 * @param {T}      initialValue       Valor por defecto.
 * @returns {[T, (next: T) => void]}  [valor, setter] como useState.
 */
export const useLocalStorage = (key, initialValue) => {
    // Función inicializadora para no leer localStorage en cada render.
    const [value, setValue] = useState(() => {
        try {
            const raw = window.localStorage.getItem(key)
            return raw !== null ? JSON.parse(raw) : initialValue
        } catch {
            // Si el JSON está corrupto, partimos del valor inicial.
            return initialValue
        }
    })

    // Cada vez que cambia el valor, lo escribimos en localStorage.
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Si localStorage está lleno o deshabilitado, ignoramos en silencio.
        }
    }, [key, value])

    return [value, setValue]
}

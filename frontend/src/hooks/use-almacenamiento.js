
import { useState, useEffect } from 'react'

/* Funciona como un useState pero guarda el valor en localStorage
para que no se pierda al recargar la página */
export const useAlmacenamiento = (clave, valorInicial) => {
    // Leemos localStorage solo la primera vez
    const [valor, setValor] = useState(() => {
        try {
            const guardado = window.localStorage.getItem(clave)
            return guardado !== null ? JSON.parse(guardado) : valorInicial
        } catch {
            // Si lo guardado no es un JSON válido empezamos con el valor inicial
            return valorInicial
        }
    })

    // Cada vez que cambia el valor lo guardamos
    useEffect(() => {
        try {
            window.localStorage.setItem(clave, JSON.stringify(valor))
        } catch {
            // Si localStorage no está disponible seguimos sin guardar
        }
    }, [clave, valor])

    return [valor, setValor]
}

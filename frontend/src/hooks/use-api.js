// hooks/use-api.js
// [IA] Hook para llamadas GET a la API. Devuelve { data, loading, error, refetch }.
// Sigue el patrón del profesor: un useState por variable, setter directo,
// funciones declaradas como arrow functions (sin useCallback).

import { useState, useEffect } from 'react'
import { apiFetch } from '@/const/api.js'

/**
 * @param {string} path                Ruta de la API (ej. '/quiz').
 * @param {object} [options]
 * @param {object} [options.query]
 * @param {boolean} [options.enabled=true]
 * @returns {{ data, loading, error, refetch }}
 */
export const useApi = (path, options = {}) => {

    const { query, enabled = true } = options

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(enabled)
    const [error, setError] = useState(null)

    // Serializamos la query para usarla como dependencia del useEffect.
    const queryKey = JSON.stringify(query || {})

    const lanzar = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await apiFetch(path, { query })
            setData(result)
            setLoading(false)
        } catch (err) {
            setError(err)
            setData(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (enabled) lanzar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, queryKey, enabled])

    return { data, loading, error, refetch: lanzar }
}

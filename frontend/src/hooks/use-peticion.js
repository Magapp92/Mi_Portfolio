
import { useState, useEffect } from 'react'
import { pedir } from '@const/peticiones.js'

/* Pedimos datos a la API y guardamos el resultado, si está cargando y el error.
Con refetch se puede volver a lanzar la petición */
export const usePeticion = (ruta, opciones = {}) => {
    const { query, enabled = true } = opciones

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(enabled)
    const [error, setError] = useState(null)

    // Pasamos la query a texto para usarla como dependencia del useEffect
    const queryTexto = JSON.stringify(query || {})

    const lanzar = async () => {
        setLoading(true)
        setError(null)
        try {
            const resultado = await pedir(ruta, { query })
            setData(resultado)
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
    }, [ruta, queryTexto, enabled])

    return { data, loading, error, refetch: lanzar }
}

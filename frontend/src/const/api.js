// const/api.js
// Helper único para llamar a la API del juego. Centraliza:
//  - la URL base (de .env, regla C17),
//  - el parseo de la respuesta `{ message, data }` que devuelve la API Express.
//
// Devuelve `data` directamente si todo va bien; lanza un Error con el `message`
// del backend si la respuesta es 4xx/5xx — los componentes lo capturan con
// try/catch y muestran el mensaje en la UI (regla C20: nada de alert()).

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/harrypotter'

/**
 * Llama a un endpoint de la API y devuelve el campo `data` de la respuesta.
 * @param {string} path                     Ruta relativa (ej. '/quiz').
 * @param {object} [opts]
 * @param {string} [opts.method='GET']      Método HTTP.
 * @param {object} [opts.body]              Cuerpo JSON para POST/PUT/PATCH.
 * @param {object} [opts.query]             Query params opcionales.
 * @returns {Promise<*>}                    El `data` del backend.
 */
export const apiFetch = async (path, opts = {}) => {
    const { method = 'GET', body, query } = opts

    // Construye la URL final con query params si los hay.
    const url = new URL(BASE_URL + path)
    if (query) {
        for (const [k, v] of Object.entries(query)) {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
        }
    }

    // Si el servidor no responde, fetch lanza un TypeError ("Failed to fetch");
    // lo traducimos a un mensaje entendible para la UI.
    let res
    try {
        res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined
        })
    } catch {
        throw new Error('Error al conectar')
    }

    const payload = await res.json().catch(() => ({}))

    if (!res.ok) {
        const error = new Error(payload.message || `Error ${res.status}`)
        error.status = res.status
        throw error
    }

    return payload.data
}

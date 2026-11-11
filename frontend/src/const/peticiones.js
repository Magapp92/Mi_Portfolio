
/* La URL de la API sale del .env y, si no está, usamos la de local */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/harrypotter'

/* Hacemos la petición a la API y devolvemos solo el data de la respuesta.
Si la API responde con error lanzamos su message para enseñarlo en pantalla */
export const pedir = async (ruta, opciones = {}) => {
    const { method = 'GET', body, query } = opciones

    // Añadimos a la URL los parámetros de la query que tengan valor
    const url = new URL(BASE_URL + ruta)
    if (query) {
        for (const [clave, valor] of Object.entries(query)) {
            if (valor !== undefined && valor !== null && valor !== '') {
                url.searchParams.set(clave, valor)
            }
        }
    }

    // Si el servidor no responde, fetch falla y mostramos un mensaje más claro
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

    const respuesta = await res.json().catch(() => ({}))

    if (!res.ok) {
        const error = new Error(respuesta.message || `Error ${res.status}`)
        error.status = res.status
        throw error
    }

    return respuesta.data
}

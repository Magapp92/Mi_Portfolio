
const crypto = require('crypto')

/* Creamos un error 404 cuando el endpoint no existe */
const notFound = ( req , res , next ) => {
    const error = new Error(`Endpoint no existe`)
    error.status = 404
    next(error)
}

/* Recogemos cualquier error y respondemos con { message, data }.
Los errores por datos mal enviados devuelven 400 en vez de 500,
porque el fallo está en la petición y no en el servidor */
const errorHandler = ( error , req , res , next )=>{
    let { status , message } = error

    // El id no tiene formato de Mongo
    if (error.name === 'CastError') {
        status  = 400
        message = `Id no válido: ${error.value}`
    }

    // Algún campo no cumple el schema (falta, tipo equivocado, valor no permitido)
    if (error.name === 'ValidationError') {
        status  = 400
        message = `Datos no válidos en: ${Object.keys(error.errors).join(', ')}`
    }

    // El body no es un JSON bien escrito
    if (error.type === 'entity.parse.failed') {
        status  = 400
        message = 'El cuerpo de la petición no es un JSON válido'
    }

    status  = status  || 500
    message = message || `Error interno`

    res.status(status).json({ message , data : null })
}

/* SEGURIDAD */

/* Sacamos el token de la cabecera Authorization: Bearer <token> */
const leerToken = ( req ) => {
    const cabecera = req.get('Authorization') || ''

    return cabecera.startsWith('Bearer ') ? cabecera.slice(7).trim() : ''
}

/* Guardamos y comparamos huellas (hash SHA-256) en vez de los tokens tal cual:
si alguien llegara a ver la base de datos, no podría usar las huellas como token */
const resumirToken = ( token ) => crypto.createHash('sha256').update(token).digest('hex')

/* Comparamos con timingSafeEqual, que tarda lo mismo acierte o falle,
para que no se pueda adivinar el token midiendo cuánto tarda la respuesta */
const coincideToken = ( token , resumenGuardado ) => {
    const recibido = Buffer.from(resumirToken(token))
    const guardado = Buffer.from(resumenGuardado || '')

    return recibido.length === guardado.length && crypto.timingSafeEqual(recibido, guardado)
}

/* Es administrador quien manda el mismo token que API_TOKEN del .env */
const esAdmin = ( req ) => {
    const { API_TOKEN } = process.env
    const token = leerToken(req)

    return Boolean(API_TOKEN && token && coincideToken(token, resumirToken(API_TOKEN)))
}

/* Dejamos pasar solo al administrador. Si API_TOKEN no está configurado
cerramos estas rutas en vez de dejarlas abiertas */
const soloAdmin = ( req , res , next ) => {
    if (!process.env.API_TOKEN) {
        return res.status(503).json({
            message: 'Las operaciones de administración no están configuradas',
            data: null
        })
    }

    if (!leerToken(req)) {
        return res.status(401).json({
            message: 'Falta el token de seguridad',
            data: null
        })
    }

    if (!esAdmin(req)) {
        return res.status(403).json({
            message: 'Token no válido',
            data: null
        })
    }

    next()
}

module.exports = {
    notFound,
    errorHandler,
    leerToken,
    resumirToken,
    coincideToken,
    esAdmin,
    soloAdmin
}

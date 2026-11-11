
/* Creamos un error 404 cuando el endpoint no existe */
const notFound = ( req , res , next ) => {
    const error = new Error(`Endpoint no existe`)
    error.status = 404
    next(error)
}

/* Recogemos cualquier error y respondemos con { message, data }.
Si el id no tiene formato de Mongo devolvemos 400 en vez de 500 */
const errorHandler = ( error , req , res , next )=>{
    let { status , message } = error

    if (error.name === 'CastError') {
        status  = 400
        message = `Id no válido: ${error.value}`
    }

    status  = status  || 500
    message = message || `Error interno`

    res.status(status).json({ message , data : null })
}

module.exports = {
    notFound,
    errorHandler
}

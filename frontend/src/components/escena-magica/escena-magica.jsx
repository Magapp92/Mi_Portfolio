import { useEffect, useRef } from 'react'
import { crearMotorEscenas } from './motor-escenas.js'
import './escena-magica.css'

/* Fondo animado del juego: comedor, mazmorra, bosque o estación */
export const EscenaMagica = (props) => {

    const { escena } = props

    const canvasRef = useRef(null)
    const motorRef = useRef(null)

    /* Creamos el motor una sola vez y lo paramos al desmontar */
    useEffect(() => {
        motorRef.current = crearMotorEscenas(canvasRef.current, escena)
        return () => motorRef.current.destruir()
        // Los cambios de escena los avisamos en el efecto de abajo
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* Avisamos al motor cuando cambia el escenario */
    useEffect(() => {
        if (motorRef.current) motorRef.current.cambiar(escena)
    }, [escena])

    return <canvas ref={canvasRef} className="EscenaMagica" width="240" height="135" aria-hidden="true" />
}


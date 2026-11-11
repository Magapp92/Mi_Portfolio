import { useEffect, useRef } from 'react'
import { CASAS } from '@data/casas.js'
import { dibujarEscudo } from './dibujar-escudo.js'
import './escudo-casa.css'

/* Escudo de la casa: grande al elegir casa y pequeño en el ranking.
Si no llega casa pintamos el escudo neutro */
export const EscudoCasa = (props) => {

    const { casa, tamano = 'pequeno' } = props

    const canvasRef = useRef(null)

    /* Volvemos a pintar el escudo cuando cambia la casa */
    useEffect(() => {
        dibujarEscudo(canvasRef.current, casa)
    }, [casa])

    const nombre = CASAS[casa]?.nombre

    return (
        <canvas
            ref={canvasRef}
            className={`EscudoCasa EscudoCasa--${tamano}`}
            role="img"
            aria-label={nombre ? `Escudo de ${nombre}` : 'Sin casa'}
        />
    )
}


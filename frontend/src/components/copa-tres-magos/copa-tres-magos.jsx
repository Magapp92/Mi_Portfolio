import { useEffect, useRef } from 'react'
import './copa-tres-magos.css'

/* Dibujamos un fotograma de la copa en un canvas de 48x56 */
const pintarCopa = (ctx, t) => {
    ctx.clearRect(0, 0, 48, 56)
    const p = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1) }

    // Llamas azules que salen de la copa
    for (let x = 14; x < 34; x++) {
        const alto = 6 + Math.round(4 * Math.abs(Math.sin(t / 140 + x * .7)) + 3 * Math.sin(t / 90 + x))
        for (let y = 0; y < alto; y++) p(x, 16 - y, y > alto - 3 ? '#e6f6ff' : y > alto / 2 ? '#7cc4ff' : '#2f7be8')
    }

    // Copa, pie, base y asas, con sombreado de plata, gema y filetes azules
    for (let y = 16; y < 56; y++) for (let x = 0; x < 48; x++) {
        const dx = x - 23.5
        let parte = null
        if (y < 34 && Math.abs(dx) <= 13 - (y - 16) * .38) parte = 'cuerpo'
        if (y >= 34 && y < 44 && Math.abs(dx) <= 2.6) parte = 'cuerpo'
        if (y >= 44 && y < 47 && Math.abs(dx) <= 7) parte = 'cuerpo'
        if (y >= 47 && y < 52 && Math.abs(dx) <= 11 - (52 - y) * .4) parte = 'cuerpo'
        const asa = (cx) => Math.abs(Math.hypot(x - cx, y - 23) - 5) < 1.1 && Math.abs(dx) > 12
        if (asa(9) || asa(38)) parte = 'asa'
        if (!parte) continue

        let color = dx < -6 ? '#f4f8fc' : dx < 0 ? '#d4dde8' : dx < 6 ? '#aab7c6' : '#7c8a9c'
        if (parte === 'asa') color = '#b8c4d2'
        if (y === 16 || y === 17) color = '#ffffff'
        if (y >= 22 && y < 28 && Math.abs(dx) < 3.5) color = (Math.abs(dx) < 1.5 && y < 26) ? '#bfe6ff' : '#3a8bff'
        if ((y === 30 || y === 45 || y === 49) && Math.abs(dx) < 11) color = '#3a6fd8'
        p(x, y, color)
    }

    // Destellos alrededor
    for (let k = 0; k < 4; k++) {
        const f = (t / 600 + k * .25) % 1, x = [4, 42, 8, 40][k], y = [10, 14, 40, 44][k]
        if (f >= .5) continue
        const c = f < .25 ? '#ffffff' : '#9ad4ff'
        p(x, y, c); p(x - 1, y, c); p(x + 1, y, c); p(x, y - 1, c); p(x, y + 1, c)
    }
}

/* Aviso con la Copa de los Tres Magos cuando quedamos en primer puesto */
export const CopaTresMagos = (props) => {

    const { onCerrar } = props

    const canvasRef = useRef(null)

    /* Animamos la copa y cancelamos la animación al cerrar el aviso */
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            pintarCopa(ctx, 0)
            return
        }
        let idFrame
        const animar = (t) => {
            pintarCopa(ctx, t)
            idFrame = requestAnimationFrame(animar)
        }
        idFrame = requestAnimationFrame(animar)
        return () => cancelAnimationFrame(idFrame)
    }, [])

    return (
        <div className="CopaTresMagos" role="dialog" aria-modal="true" aria-labelledby="copa-titulo">
            <div className="CopaTresMagos-caja">
                <canvas ref={canvasRef} className="CopaTresMagos-copa" width="48" height="56" aria-hidden="true" />
                <p id="copa-titulo" className="CopaTresMagos-titulo">¡Primer puesto!</p>
                <p className="CopaTresMagos-texto">Has ganado la Copa<br />de los Tres Magos</p>
                <button type="button" className="CopaTresMagos-boton" onClick={onCerrar} autoFocus>Continuar</button>
            </div>
        </div>
    )
}


// components/cursor/cursor.jsx
// Cursor personalizado. Registra mousemove en document y lo limpia al
// desmontar (regla C13: addEventListener siempre con cleanup).
// La estela ya no usa setTimeout escalonados (se veían saltos entre puntos):
// ahora un bucle de requestAnimationFrame interpola cada bolita hacia la
// anterior (easing), formando una cola continua y fluida.
// Variantes: 'punto' (bolita cian con estela, home), 'huella' (pata de perro,
// detalle de proyectos) y 'halo' (círculo
// difuminado rosa, about).

import { useEffect, useRef } from 'react'
import './cursor.css'

// Número de bolitas de la estela en la variante 'punto'.
const NUMERO_ESTELAS = 28

// Cuánto se acerca cada elemento a su objetivo por frame a 60 fps (0-1): más
// alto = más pegado; más bajo = más perezoso. Con estela, el punto principal
// también persigue al ratón (más lento y fluido) y la cola persigue al punto.
const SUAVIZADO_CURSOR = 0.12
const SUAVIZADO_ESTELA = 0.3

// Ajusta el suavizado al tiempo real entre frames para que la velocidad sea
// la misma en pantallas de 60, 120 o 144 Hz.
const suavizar = (factor, delta) => 1 - Math.pow(1 - factor, delta / (1000 / 60))

// Ids estables para el map de la estela (regla C11: nunca el índice como key).
const ESTELAS = Array.from({ length: NUMERO_ESTELAS }, (_, i) => `estela-${i + 1}`)

/**
 * Cursor decorativo que sigue al ratón.
 * @param {object} props
 * @param {'punto'|'halo'|'huella'} [props.variante='punto']  Aspecto del cursor.
 * @param {boolean} [props.conEstela]                Añade la estela de bolitas.
 */
export const Cursor = (props) => {

    const { variante = 'punto', conEstela = false } = props

    // Refs al DOM: movemos los nodos directamente para no re-renderizar React
    // en cada píxel de movimiento.
    const cursorRef = useRef(null)
    const estelasRef = useRef([])

    useEffect(() => {
        // Posición actual del ratón (empieza fuera de pantalla).
        const raton = { x: -100, y: -100 }

        // Posición interpolada del punto principal y de cada bolita de la estela.
        const punto = { x: -100, y: -100 }
        const posiciones = ESTELAS.map(() => ({ x: -100, y: -100 }))

        let animacion
        let anterior = performance.now()

        const mover = (e) => {
            raton.x = e.clientX
            raton.y = e.clientY

            // Sin estela, el punto sigue al ratón sin retardo.
            if (!conEstela && cursorRef.current) {
                cursorRef.current.style.transform = `translate(${raton.x}px, ${raton.y}px)`
            }
        }

        // Bucle de animación: el punto persigue al ratón y cada bolita persigue
        // a la anterior con easing, así el rastro es una curva continua.
        const animar = (ahora) => {
            const delta = Math.min(ahora - anterior, 100)
            anterior = ahora

            const factorCursor = suavizar(SUAVIZADO_CURSOR, delta)
            const factorEstela = suavizar(SUAVIZADO_ESTELA, delta)

            punto.x += (raton.x - punto.x) * factorCursor
            punto.y += (raton.y - punto.y) * factorCursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${punto.x}px, ${punto.y}px)`
            }

            let objetivo = punto

            posiciones.forEach((pos, index) => {
                pos.x += (objetivo.x - pos.x) * factorEstela
                pos.y += (objetivo.y - pos.y) * factorEstela

                const nodo = estelasRef.current[index]
                if (nodo) {
                    // La cola se encoge progresivamente (efecto cometa),
                    // proporcional al largo para no llegar a escala negativa.
                    const escala = 1 - (index / NUMERO_ESTELAS) * 0.9
                    nodo.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${escala})`
                }

                objetivo = pos
            })

            animacion = requestAnimationFrame(animar)
        }

        document.addEventListener('mousemove', mover)
        if (conEstela) animacion = requestAnimationFrame(animar)

        // Cleanup del listener y del bucle de animación (regla C13).
        return () => {
            document.removeEventListener('mousemove', mover)
            cancelAnimationFrame(animacion)
        }
    }, [conEstela])

    return (
        <>
            <div ref={cursorRef} className={`Cursor Cursor--${variante}`} aria-hidden="true"></div>
            {conEstela && ESTELAS.map((id, index) =>
                <div
                    key={id}
                    ref={(nodo) => { estelasRef.current[index] = nodo }}
                    className="Cursor-tail"
                    style={{ opacity: 0.75 * (1 - index / NUMERO_ESTELAS) }}
                    aria-hidden="true"
                ></div>
            )}
        </>
    )
}

export default Cursor

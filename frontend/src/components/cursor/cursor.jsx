/* Cursor personalizado que sigue al ratón, con estela de bolitas opcional */

import { useEffect, useRef } from 'react'
import './cursor.css'

/* Número de bolitas de la estela */
const NUMERO_ESTELAS = 28

/* Cuánto se acerca cada elemento a su objetivo en cada frame (de 0 a 1).
Cuanto más alto, más pegado va al ratón */
const SUAVIZADO_CURSOR = 0.12
const SUAVIZADO_ESTELA = 0.3

/* Ajustamos el suavizado al tiempo entre frames para que vaya igual
en pantallas de 60, 120 o 144 Hz */
const suavizar = (factor, delta) => 1 - Math.pow(1 - factor, delta / (1000 / 60))

/* Ids fijos para usarlos como key en el map de la estela */
const ESTELAS = Array.from({ length: NUMERO_ESTELAS }, (_, i) => `estela-${i + 1}`)

/* Pintamos el cursor según la variante y, si toca, la estela que lo persigue */
export const Cursor = (props) => {

    const { variante = 'punto', conEstela = false } = props

    // Movemos los nodos directamente para no renderizar en cada píxel
    const cursorRef = useRef(null)
    const estelasRef = useRef([])

    /* Escuchamos el ratón y animamos el cursor, y lo limpiamos todo
    al desmontar el componente */
    useEffect(() => {

        // Empezamos fuera de la pantalla
        const raton = { x: -100, y: -100 }
        const punto = { x: -100, y: -100 }
        const posiciones = ESTELAS.map(() => ({ x: -100, y: -100 }))

        let animacion
        let anterior = performance.now()

        /* Guardamos la posición del ratón y, sin estela, movemos el cursor al momento */
        const mover = (e) => {
            raton.x = e.clientX
            raton.y = e.clientY

            if (!conEstela && cursorRef.current) {
                cursorRef.current.style.transform = `translate(${raton.x}px, ${raton.y}px)`
            }
        }

        /* El punto persigue al ratón y cada bolita persigue a la anterior,
        así la estela sale como una curva continua */
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

            posiciones.forEach((posicion, index) => {
                posicion.x += (objetivo.x - posicion.x) * factorEstela
                posicion.y += (objetivo.y - posicion.y) * factorEstela

                const nodo = estelasRef.current[index]

                if (nodo) {
                    // Las bolitas se van haciendo más pequeñas hacia el final de la cola
                    const escala = 1 - (index / NUMERO_ESTELAS) * 0.9
                    nodo.style.transform = `translate(${posicion.x}px, ${posicion.y}px) scale(${escala})`
                }

                objetivo = posicion
            })

            animacion = requestAnimationFrame(animar)
        }

        document.addEventListener('mousemove', mover)

        if (conEstela) {
            animacion = requestAnimationFrame(animar)
        }

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

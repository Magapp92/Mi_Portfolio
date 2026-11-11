/* Dibujamos en un canvas de 40x46 el escudo pixel art de cada casa con su animal.
Los animales se hacen con formas geométricas sobre una rejilla de 32x32 */

import { CASAS } from '@data/casas.js'

/* Escudo neutro para las partidas guardadas antes de poder elegir casa */
const NEUTRA = { id: 'neutra', color: '#6b6b74', borde: '#3a3a42' }
const ANIMAL_DE = { gryffindor: 'leon', slytherin: 'serpiente', ravenclaw: 'aguila', hufflepuff: 'tejon' }

const N = 32

/* Formas básicas: nos dicen si el punto (x, y) cae dentro */
const circulo = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r
const elipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1

/* Comprobamos si el punto está cerca del segmento que va de a hasta b */
const segmento = (x, y, ax, ay, bx, by, r) => {
    const dx = bx - ax
    const dy = by - ay
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(x - ax - t * dx, y - ay - t * dy) <= r
}

/* Comprobamos si el punto está dentro del polígono */
const poligono = (x, y, puntos) => {
    let d = false
    for (let i = 0, j = puntos.length - 1; i < puntos.length; j = i++) {
        const [xi, yi] = puntos[i]
        const [xj, yj] = puntos[j]
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) d = !d
    }
    return d
}

/* Unimos varios segmentos seguidos, como el cuerpo de la serpiente */
const cadena = (x, y, puntos, r) => puntos.some((p, i) => i > 0 && segmento(x, y, ...puntos[i - 1], ...p, r))

/* Cada animal tiene su paleta y una función que nos da el color de cada punto (o null) */
const ANIMALES = {
    leon: {
        pal: { M: '#c47a14', m: '#e9a52c', F: '#f2c76a', h: '#fbe4ad', k: '#3a1a05', n: '#5a2a14', e: '#ffffff', o: '#e08a5a' },
        px: (x, y) => {
            const a = Math.atan2(y - 17, x - 16)
            const rm = 14.2 + 1.6 * Math.sin(9 * a)
            if (segmento(x, y, 16, 22, 16, 23.6, .55) || segmento(x, y, 16, 23.6, 13.6, 25.2, .55) || segmento(x, y, 16, 23.6, 18.4, 25.2, .55)) return 'n'
            if (poligono(x, y, [[13.2, 19.4], [18.8, 19.4], [16, 22.4]])) return 'n'
            if (circulo(x, y, 12.2, 15.6, 1.7) || circulo(x, y, 19.8, 15.6, 1.7)) return (circulo(x, y, 11.7, 15, .7) || circulo(x, y, 19.3, 15, .7)) ? 'e' : 'k'
            if (segmento(x, y, 10, 13, 13.8, 13.4, .5) || segmento(x, y, 18.2, 13.4, 22, 13, .5)) return 'n'
            if (elipse(x, y, 16, 23.2, 5.6, 3.8)) return 'h'
            if (elipse(x, y, 16, 18, 9.2, 10.2)) return 'F'
            if (circulo(x, y, 8.4, 8.6, 3.4) || circulo(x, y, 23.6, 8.6, 3.4)) return (circulo(x, y, 8.4, 8.6, 1.8) || circulo(x, y, 23.6, 8.6, 1.8)) ? 'o' : 'F'
            if (Math.hypot(x - 16, y - 17) <= rm) return Math.hypot(x - 16, y - 17) > rm - 3 ? 'M' : 'm'
            return null
        }
    },
    serpiente: {
        pal: { B: '#2f8a4c', b: '#5fbf6e', v: '#c9e8b0', k: '#0f2a17', y: '#ffd34e', r: '#d43a3a' },
        px: (x, y) => {
            const cuerpo = [[5, 27], [10, 29], [18, 28.5], [24, 25], [24.5, 20], [19, 17.4], [12, 17], [7.4, 13.5], [8.6, 9], [13, 7.4]]
            if (circulo(x, y, 19.2, 7.6, .9)) return 'k'
            if (circulo(x, y, 19.2, 7.6, 1.6)) return 'y'
            if (segmento(x, y, 24, 9, 27.2, 9, .45) || segmento(x, y, 27.2, 9, 29.4, 7.6, .45) || segmento(x, y, 27.2, 9, 29.4, 10.4, .45)) return 'r'
            if (elipse(x, y, 18.4, 8.6, 5.8, 3.6)) return (y > 9.6 ? 'v' : 'B')
            if (cadena(x, y, cuerpo, 1.1)) return 'v'
            if (cadena(x, y, cuerpo, 3.3)) return ((x * 3 + y * 5) % 7 < 2) ? 'b' : 'B'
            return null
        }
    },
    aguila: {
        pal: { P: '#7a4a22', p: '#a8692f', W: '#f4ead6', w: '#d8c7a8', Y: '#f2b51e', y: '#c98a0c', k: '#1a1208', e: '#ffd34e' },
        px: (x, y) => {
            if (circulo(x, y, 13.4, 12.6, .9)) return 'k'
            if (circulo(x, y, 13.4, 12.6, 1.9)) return 'e'
            if (segmento(x, y, 10.4, 10.2, 16.6, 10.6, .6)) return 'k'
            if (poligono(x, y, [[9.6, 11.8], [4, 12.6], [2.2, 15.2], [3, 18.4], [4.6, 16.6], [8, 16.8], [10.6, 15.4]])) return (y > 15.6 ? 'y' : 'Y')
            if (poligono(x, y, [[10, 17.4], [24.6, 15.6], [28.6, 31], [8, 31]])) return (((x - y * .5) | 0) % 4 === 0) ? 'p' : 'P'
            if (elipse(x, y, 17.4, 13.4, 9.4, 8)) return (x > 22 || y > 18.4) ? 'w' : 'W'
            return null
        }
    },
    tejon: {
        pal: { G: '#8d8780', g: '#b2aca4', K: '#1f1b18', W: '#f4efe6', w: '#d9d3c8', e: '#ffffff', n: '#0b0908' },
        px: (x, y) => {
            if (elipse(x, y, 16, 27.4, 2.6, 1.7)) return 'n'
            if (circulo(x, y, 11.4, 16.4, 1.5) || circulo(x, y, 20.6, 16.4, 1.5)) return (circulo(x, y, 11, 15.9, .6) || circulo(x, y, 20.2, 15.9, .6)) ? 'e' : 'n'
            const cabeza = elipse(x, y, 16, 16.4, 12, 10.6) || elipse(x, y, 16, 24, 6.4, 6.2)
            if (cabeza) {
                const d = Math.abs(x - 16)
                if (d < 2.6 + Math.max(0, (14 - y) * .12)) return y > 22 ? 'w' : 'W'
                if (d < 7 && y < 23) return 'K'
                return y > 20 ? 'g' : 'G'
            }
            if (circulo(x, y, 6.2, 8.6, 3.4) || circulo(x, y, 25.8, 8.6, 3.4)) return (circulo(x, y, 6.2, 8.6, 1.6) || circulo(x, y, 25.8, 8.6, 1.6)) ? 'g' : 'K'
            return null
        }
    }
}

/* Aclaramos (k positivo) u oscurecemos (k negativo) un color hex */
const aclara = (hex, k) => {
    const n = parseInt(hex.slice(1), 16)
    const c = [n >> 16, (n >> 8) & 255, n & 255]
    return 'rgb(' + c.map(v => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))).join(',') + ')'
}

/* Pintamos el escudo de la casa y encima su animal con contorno y sombreado */
export const dibujarEscudo = (canvas, id) => {
    const casa = CASAS[id] ?? NEUTRA
    const animal = ANIMALES[ANIMAL_DE[casa.id]]
    const ctx = canvas.getContext('2d')
    const AW = 40
    const AH = 46
    canvas.width = AW
    canvas.height = AH

    // Escudo: rectángulo con punta, borde del color secundario y brillo a la izquierda
    const dentro = (x, y, m) => y >= m && x >= m && x < AW - m && (y < 28 || Math.abs(x + .5 - AW / 2) < (AW / 2 - m) - (y - 28) * 1.05 && y < AH - m)
    for (let y = 0; y < AH; y++) for (let x = 0; x < AW; x++) {
        if (!dentro(x, y, 0)) continue
        let c
        if (!dentro(x, y, 1)) c = '#160c04'
        else if (!dentro(x, y, 3)) c = (x < AW / 2 && y < 28) ? aclara(casa.borde, .3) : casa.borde
        else c = x < 9 ? aclara(casa.color, .14) : (x > AW - 9 ? aclara(casa.color, -.2) : casa.color)
        ctx.fillStyle = c
        ctx.fillRect(x, y, 1, 1)
    }

    // Las partidas antiguas sin casa se quedan con el escudo gris sin animal
    if (!animal) return

    // Muestreamos el animal en el centro de cada píxel
    const g = []
    for (let y = 0; y < N; y++) {
        g.push([])
        for (let x = 0; x < N; x++) g[y].push(animal.px(x + .5, y + .5))
    }

    // Lo pintamos con contorno oscuro, luz arriba a la izquierda y sombra abajo a la derecha
    const ox = 4
    const oy = 5
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const v = g[y][x]
        const vecino = (dx, dy) => g[y + dy] && g[y + dy][x + dx]
        if (!v) {
            if (vecino(1, 0) || vecino(-1, 0) || vecino(0, 1) || vecino(0, -1)) {
                ctx.fillStyle = '#120a04'
                ctx.fillRect(ox + x, oy + y, 1, 1)
            }
            continue
        }
        let c = animal.pal[v]
        if (!vecino(-1, 0) || !vecino(0, -1)) c = aclara(c, .22)
        else if (!vecino(1, 0) || !vecino(0, 1)) c = aclara(c, -.25)
        ctx.fillStyle = c
        ctx.fillRect(ox + x, oy + y, 1, 1)
    }
}

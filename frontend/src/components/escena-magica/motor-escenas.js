/* Escenarios pixel art del juego: Gran Comedor, mazmorra con el aula de pociones,
bosque y estación. Se pintan en un canvas de 240x135 que el CSS amplía sin suavizar */

/* Creamos el motor sobre el canvas y arrancamos la animación. Cada escenario
tiene un fondo fijo que pintamos una sola vez y una capa animada por fotograma */
export const crearMotorEscenas = (canvas, escenaInicial = 'comedor') => {

    const W = 240
    const H = 135
    const m = canvas.getContext('2d')

    /* Generador de números al azar con semilla, para que el dibujo salga siempre igual */
    const azar = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647

    /* Mezclamos dos colores RGB según k (de 0 a 1) */
    const mezcla = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k))

    const rgb = (c) => typeof c === 'string' ? c : `rgb(${c})`

    /* Pintamos un píxel suelto */
    const punto = (ctx, x, y, c) => {
        ctx.fillStyle = rgb(c)
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1)
    }

    /* Pintamos un rectángulo de píxeles */
    const caja = (ctx, x, y, w, h, c) => {
        ctx.fillStyle = rgb(c)
        ctx.fillRect(Math.round(x), Math.round(y), w, h)
    }

    /* Creamos un canvas aparte para guardar el fondo ya pintado */
    const lienzo = (dibujar) => {
        const c = document.createElement('canvas')
        c.width = W
        c.height = H
        dibujar(c.getContext('2d'))
        return c
    }

    const FLAMAS = ['..o..|.oyo.|oyYyo|oyYyo|.oyo.', '.o...|.oyo.|oyYyo|.yYyo|.oyo.', '...o.|.oyo.|oyYyo|oyYy.|.oyo.', '..o..|..yo.|oyYyo|oyYyo|.oyo.']
    const COL_FLAMA = { o: '#e8542a', y: '#ffb340', Y: '#fff3b0' }

    /* Dibujamos la llama de una antorcha cambiando de fotograma con el tiempo */
    const flama = (x, y, t, i) => FLAMAS[Math.floor(t / 110 + i) % 4].split('|').forEach((f, yy) =>
        [...f].forEach((ch, xx) => {
            if (COL_FLAMA[ch]) punto(m, x + xx, y + yy, COL_FLAMA[ch])
        }))

    /* Repartimos estrellas por el cielo */
    const estrellas = (ctx, semilla, n, alto) => {
        const a = azar(semilla)
        for (let i = 0; i < n; i++) punto(ctx, a() * W, a() * alto, a() < .2 ? '#ffffff' : '#9fb3e0')
    }

    /* GRAN COMEDOR */

    /* Pintamos el fondo del comedor: techo encantado, muro, vidrieras, estandartes, suelo y mesas */
    const comedorFondo = lienzo((c) => {
        // Techo encantado
        for (let y = 0; y < 44; y++) caja(c, 0, y, W, 1, mezcla([10, 14, 46], [32, 44, 92], y / 44))
        estrellas(c, 3, 70, 40)
        const a = azar(21)

        // Muro de piedra
        for (let y = 40; y < 104; y++) for (let x = 0; x < W; x++) {
            const fila = Math.floor((y - 40) / 9)
            const junta = (y - 40) % 9 === 0 || (x + fila * 9) % 22 === 0
            punto(c, x, y, junta ? [34, 28, 32] : mezcla([66, 56, 60], [88, 76, 78], a() * .5))
        }

        // Vidrieras góticas
        for (const wx of [8, 210]) {
            for (let y = 46; y < 96; y++) for (let x = 0; x < 22; x++) {
                const dx = x - 10.5
                const dentro = y > 58 || dx * dx / 110 + (y - 58) * (y - 58) / 150 <= 1
                if (!dentro) continue
                const borde = x === 0 || x === 21 || y === 95 || (y <= 58 && dx * dx / 110 + (y - 58) * (y - 58) / 150 > .8)
                const plomo = x % 7 === 0 || (y - 46) % 10 === 0
                punto(c, wx + x, y, borde ? '#1c1418' : plomo ? '#20263a' : mezcla([46, 82, 150], [120, 160, 220], Math.max(0, 1 - Math.hypot(dx, y - 60) / 24)))
            }
        }

        // Estandartes de las cuatro casas
        const casas = [['#ae0001', '#eeba30'], ['#1a472a', '#c0c0c0'], ['#222f5b', '#cd7f32'], ['#ecb939', '#372e29']]
        ;[36, 56, 170, 190].forEach((bx, i) => {
            for (let y = 42; y < 80; y++) for (let x = 0; x < 14; x++) {
                if (y > 72 && Math.abs(x - 6.5) > (80 - y) * .9) continue
                const [c1, c2] = casas[i]
                punto(c, bx + x, y, (x === 0 || x === 13 || y === 42) ? c2 : (x < 4 ? mezcla([255, 255, 255], [0, 0, 0], 1) && c1 : c1))
            }
            caja(c, bx + 4, 52, 6, 6, casas[i][1])
            caja(c, bx + 5, 53, 4, 4, casas[i][0])
            caja(c, bx - 1, 41, 16, 1, '#3a2a14')
        })

        // Suelo de madera
        for (let y = 104; y < H; y++) for (let x = 0; x < W; x++)
            punto(c, x, y, (y - 104) % 6 === 0 ? [40, 24, 14] : mezcla([74, 46, 26], [96, 62, 34], ((x * 13 + (y >> 1) * 7) % 9) / 9))

        // Mesas largas con platos y copas
        for (const ty of [110, 124]) {
            caja(c, 8, ty, W - 16, 4, '#8a5a30')
            caja(c, 8, ty, W - 16, 1, '#b07a44')
            caja(c, 8, ty + 4, W - 16, 2, '#4a2c16')
            for (let x = 14; x < W - 14; x += 10) {
                punto(c, x, ty + 1, '#e8c060')
                punto(c, x + 1, ty + 1, '#e8c060')
                punto(c, x + 4, ty, '#d0d0d8')
            }
        }
    })

    /* Colocamos las velas flotantes en posiciones fijas */
    const velas = (() => {
        const a = azar(101)
        return Array.from({ length: 22 }, () => ({ x: 4 + a() * 232, y: 6 + a() * 44, f: a() * 6 }))
    })()

    /* Animamos el comedor: estrellas que titilan y velas que flotan */
    const comedor = (t) => {
        m.drawImage(comedorFondo, 0, 0)
        {
            const a = azar(505)
            for (let i = 0; i < 8; i++) {
                const x = a() * W
                const y = a() * 38
                if (Math.sin(t / 300 + i * 2) > .7) punto(m, x, y, '#ffffff')
            }
        }
        velas.forEach((v, i) => {
            const y = v.y + Math.sin(t / 700 + v.f) * 1.5
            m.fillStyle = 'rgba(255,200,120,.22)'
            m.fillRect(Math.round(v.x) - 1, Math.round(y) - 2, 3, 1)
            m.fillRect(Math.round(v.x), Math.round(y) - 3, 1, 3)
            caja(m, v.x, y, 1, 5, '#f4ecd2')
            punto(m, v.x + 1, y + 1, '#c9bfa0')
            punto(m, v.x, y - 1, (Math.floor(t / 120 + i) % 3) ? '#ffd34e' : '#fff3b0')
            if ((Math.floor(t / 90 + i) % 4) === 0) punto(m, v.x, y - 2, '#e8542a')
        })
    }

    /* AULA DE POCIONES (dentro de la mazmorra) */

    const FANTASMA = [
        '....wwww....', '..wwwwwwww..', '.wwwwwwwwww.', '.wwkwwwwkww.', 'wwwkwwwwkwww', 'wwwwwwwwwwww', 'wwwwwkkwwwww',
        'wwwwwkkwwwww', 'wwwwwwwwwwww', 'wwwwwwwwwwww', 'w.wwwwwwww.w', '..ww.ww.ww..', '...w..w..w..']

    /* Llenamos las baldas de tarros con tamaños y colores al azar */
    const TARROS = (() => {
        const a = azar(61)
        const cols = ['#5fd14a', '#d14a8a', '#4a8ad1', '#e8b84a', '#9a5ad1', '#d1604a', '#4ad1c0']
        const lista = []
        for (const balda of [54, 70, 86]) for (let x = 212; x < 238;) {
            const w = 3 + Math.floor(a() * 3)
            const h = 4 + Math.floor(a() * 5)
            lista.push({ x, y: balda - h, w, h, c: cols[Math.floor(a() * cols.length)], brilla: a() < .3, f: a() * 6 })
            x += w + 1
        }
        return lista
    })()

    /* Dibujamos el aula de pociones y el fantasma que la cruza */
    const aulaPociones = (t) => {
        // Estanterías con tarros de ingredientes
        for (const balda of [54, 70, 86]) {
            caja(m, 209, balda, 31, 2, '#7a5230')
            caja(m, 209, balda + 2, 31, 1, '#3a2414')
        }
        caja(m, 209, 38, 2, 50, '#5a3a22')
        TARROS.forEach((j) => {
            caja(m, j.x, j.y, j.w, j.h, j.c)
            caja(m, j.x, j.y, j.w, 1, '#d8d0c0')
            punto(m, j.x, j.y + 2, 'rgba(255,255,255,.55)')
            if (j.brilla && Math.sin(t / 400 + j.f) > 0) {
                m.fillStyle = 'rgba(255,255,255,.18)'
                m.fillRect(j.x - 1, j.y - 1, j.w + 2, j.h + 2)
            }
        })

        // Mesa de pociones
        caja(m, 2, 96, 64, 3, '#8a5a30')
        caja(m, 2, 96, 64, 1, '#b07a44')
        caja(m, 2, 99, 64, 2, '#4a2c16')
        caja(m, 5, 101, 2, 19, '#4a2c16')
        caja(m, 60, 101, 2, 19, '#4a2c16')

        // Caldero pequeño sobre la mesa, con burbujas
        for (let y = 0; y < 9; y++) for (let x = 0; x < 14; x++) {
            const dx = (x - 6.5) / 7
            const dy = (y - 2) / 7
            if (dx * dx + dy * dy <= 1 && y > 1) punto(m, 22 + x, 87 + y, dx < -.3 && dy < .4 ? '#4a4a58' : '#1e1e26')
        }
        caja(m, 21, 88, 16, 1, '#5a5a68')
        for (let x = 0; x < 12; x++) punto(m, 23 + x, 87 + Math.round(Math.sin(t / 150 + x / 2) * .6), x % 3 ? '#c86ad8' : '#f0b8ff')
        for (let b = 0; b < 3; b++) {
            const f = (t / 800 + b * .33) % 1
            punto(m, 25 + b * 4, 86 - Math.floor(f * 10), f < .5 ? '#f0b8ff' : 'rgba(240,184,255,.4)')
        }

        // Frascos y libro sobre la mesa
        ;[[8, '#5fd14a'], [13, '#4a8ad1'], [44, '#e8b84a'], [50, '#d14a8a']].forEach(([x, c]) => {
            caja(m, x, 90, 3, 6, c)
            caja(m, x + 1, 88, 1, 2, '#d8d0c0')
            punto(m, x, 91, 'rgba(255,255,255,.6)')
        })
        caja(m, 54, 93, 9, 3, '#6e1f1f')
        caja(m, 54, 93, 9, 1, '#a83a3a')
        caja(m, 55, 94, 7, 1, '#e8dcc0')

        // Taburetes
        for (const sx of [14, 40]) {
            caja(m, sx, 106, 9, 2, '#7a5230')
            caja(m, sx, 106, 9, 1, '#a0703e')
            caja(m, sx + 1, 108, 1, 12, '#4a2c16')
            caja(m, sx + 7, 108, 1, 12, '#4a2c16')
        }

        // Movemos el fantasma de lado a lado flotando por arriba
        const f = (t % 15000) / 15000
        const gx = -14 + f * (W + 28)
        const gy = 16 + Math.sin(t / 500) * 3
        m.globalAlpha = .72 + .12 * Math.sin(t / 300)
        FANTASMA.forEach((fila, yy) => [...fila].forEach((ch, xx) => {
            if (ch === 'w') punto(m, gx + xx + (yy > 9 ? Math.round(Math.sin(t / 200 + yy)) : 0), gy + yy, yy < 3 ? '#ffffff' : '#dce8f4')
            if (ch === 'k') punto(m, gx + xx, gy + yy, '#5a6a80')
        }))
        m.globalAlpha = 1
    }

    /* MAZMORRA */

    /* Generamos las piedras del muro, cada una con su tono, musgo o grieta */
    const piedras = []
    {
        const a = azar(11)
        for (let y = 0; y < 112;) {
            const alto = 7 + Math.floor(a() * 3)
            let x = -Math.floor(a() * 10)
            while (x < W) {
                const w = 10 + Math.floor(a() * 9)
                piedras.push({ x, y, w, h: alto, tono: a(), musgo: a() < .1, grieta: a() < .15, s: Math.floor(a() * 1e6) })
                x += w + 1
            }
            y += alto + 1
        }
    }

    const antorchas = [[22, 34], [214, 34], [70, 30], [166, 30]]
    const chispas = []
    const calido = [255, 170, 90]

    /* Calculamos cuánta luz de las antorchas llega a cada píxel, con un ligero parpadeo */
    const luz = (x, y, t) => {
        let l = 0
        antorchas.forEach(([ax, ay], i) => {
            const f = 1 + .08 * Math.sin(t / 90 + i * 2) + .05 * Math.sin(t / 37 + i)
            l += Math.max(0, 1 - Math.hypot(x - ax - 2, (y - ay) * 1.15) / (40 * f))
        })
        return Math.round(Math.min(1, l) * 6) / 6
    }

    /* Dibujamos la mazmorra iluminada por las antorchas, con el aula y el caldero grande */
    const mazmorra = (t) => {
        caja(m, 0, 0, W, H, '#14141c')

        // Muro de piedra con luz cálida
        for (const p of piedras) {
            const a = azar(p.s)
            for (let yy = 0; yy < p.h; yy++) for (let xx = 0; xx < p.w; xx++) {
                const X = p.x + xx
                const Y = p.y + yy
                if (X < 0 || X >= W || Y >= 112) continue
                let c = mezcla([38, 40, 56], [70, 74, 96], p.tono * .6)
                if (yy === 0 || xx === 0) c = mezcla(c, [110, 114, 140], .45)
                if (yy === p.h - 1 || xx === p.w - 1) c = mezcla(c, [22, 23, 34], .6)
                if (a() < .08) c = mezcla(c, [22, 23, 34], .35)
                if (p.musgo && yy > p.h - 3 && a() < .7) c = [52, 78, 46]
                if (p.grieta && xx === (p.w >> 1) && yy > 1 && yy < p.h - 1 && a() < .8) c = [22, 23, 34]
                punto(m, X, Y, mezcla(c, calido, luz(X, Y, t) * .55))
            }
        }

        // Suelo
        for (let x = 0; x < W; x++) for (let y = 112; y < H; y++) {
            const c = (x % 22 === 0 || y === 112) ? [30, 26, 22] : mezcla([58, 50, 42], [80, 70, 56], ((x * 7 + y * 13) % 5) / 10)
            punto(m, x, y, mezcla(c, calido, luz(x, y, t) * .4))
        }

        // Dibujamos las antorchas y soltamos chispas de vez en cuando
        antorchas.forEach(([ax, ay], i) => {
            ;[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[1,2],[2,2],[3,2]].forEach(([x,y]) => punto(m, ax + x, ay + y, '#2b2b33'))
            ;[[1,1],[2,1],[3,1]].forEach(([x,y]) => punto(m, ax + x, ay + y, '#5a3a22'))
            for (let y = 3; y < 13; y++) {
                punto(m, ax + 1, ay + y, '#4a4a55')
                punto(m, ax + 2, ay + y, '#6c6c7a')
                punto(m, ax + 3, ay + y, '#33333c')
            }
            flama(ax, ay - 6, t, i)
            if (Math.random() < .2) chispas.push({ x: ax + 2, y: ay - 6, vx: (Math.random() - .5) * .3, vy: -.25 - Math.random() * .3, v: 40 })
        })

        // Movemos las chispas y quitamos las que se apagan
        for (let k = chispas.length - 1; k >= 0; k--) {
            const c = chispas[k]
            c.x += c.vx
            c.y += c.vy
            if (--c.v <= 0) {
                chispas.splice(k, 1)
                continue
            }
            punto(m, c.x, c.y, c.v > 20 ? '#ffd34e' : '#e8542a')
        }

        aulaPociones(t)

        // Caldero grande con líquido verde, burbujas y brasas
        {
            const cx = 200
            const cy = 94
            for (let y = 4; y < 20; y++) for (let x = 0; x < 32; x++) {
                const dx = (x - 15.5) / 16
                const dy = (y - 9) / 11
                if (dx * dx + dy * dy > 1) continue
                let c = [26, 26, 32]
                if (dx < -.4 && dy > -.6 && dy < .3) c = [60, 60, 72]
                if (dx < -.55 && dy > -.4 && dy < 0) c = [96, 96, 110]
                if (dy > .55) c = [14, 14, 18]
                punto(m, cx + x, cy + y, mezcla(c, calido, luz(cx + x, cy + y, t) * .3))
            }
            caja(m, cx - 1, cy + 3, 34, 2, '#5a5a68')
            for (let x = 0; x < 30; x++) punto(m, cx + 1 + x, cy + 2 + Math.round(1.2 * Math.sin(t / 160 + x / 3)), x % 4 ? '#5fd14a' : '#b6ff8a')
            for (let b = 0; b < 5; b++) {
                const f = (t / 900 + b * .23) % 1
                punto(m, cx + 6 + ((b * 7) % 22), cy + 1 - Math.floor(f * 14), f < .5 ? '#9cff6e' : 'rgba(156,255,110,.45)')
            }
            caja(m, cx + 4, cy + 18, 2, 4, '#1a1a22')
            caja(m, cx + 26, cy + 18, 2, 4, '#1a1a22')
            for (let x = 8; x < 24; x++) punto(m, cx + x, cy + 21, (x + Math.floor(t / 150)) % 3 ? '#e8542a' : '#ffb340')
        }
    }

    /* BOSQUE */

    /* Pintamos el fondo del bosque: cielo, luna, dos capas de pinos, niebla y hierba */
    const bosqueFondo = lienzo((c) => {
        for (let y = 0; y < H; y++) caja(c, 0, y, W, 1, mezcla([4, 8, 24], [22, 40, 74], y / 100))
        estrellas(c, 9, 60, 70)

        // Luna con halo
        for (let y = -16; y <= 16; y++) for (let x = -16; x <= 16; x++) {
            const d = Math.hypot(x, y)
            if (d <= 11) punto(c, 222 + x, 24 + y, (Math.hypot(x + 4, y - 2) < 3 || Math.hypot(x - 3, y + 4) < 2) ? '#d6d0ae' : (x > 5 ? '#e2dcbb' : '#f3efd6'))
            else if (d <= 15 && (x + y) % 2 === 0) punto(c, 222 + x, 24 + y, 'rgba(240,236,207,.18)')
        }

        // Dibujamos un pino escalonado con su tronco
        const pino = (cx, base, alto, color) => {
            for (let y = 0; y < alto; y++) {
                const ancho = Math.floor((y / alto) * alto * .38) + 1
                for (let x = -ancho; x <= ancho; x++) if ((y % 6) < 5 || Math.abs(x) < ancho - 1) punto(c, cx + x, base - alto + y, color)
            }
            caja(c, cx - 1, base, 3, 4, '#0a0f0a')
        }

        const a = azar(31)
        // Capa lejana de pinos
        for (let x = -10; x < W + 10; x += 9) pino(x + a() * 6, 92, 26 + a() * 18, [20, 44, 40])
        // Niebla entre las dos capas
        for (let y = 86; y < 100; y++) caja(c, 0, y, W, 1, `rgba(170,200,230,${.12 - Math.abs(y - 93) * .012})`)
        // Capa cercana de pinos
        for (let x = -10; x < W + 10; x += 16) pino(x + a() * 8, 112, 40 + a() * 26, [10, 24, 18])
        // Suelo y briznas de hierba
        for (let y = 108; y < H; y++) for (let x = 0; x < W; x++) punto(c, x, y, ((x * 7 + y * 3) % 11 === 0) ? [44, 74, 40] : mezcla([16, 34, 20], [24, 46, 26], (y - 108) / 27))
        for (let x = 0; x < W; x += 3) {
            const h = 2 + (x * 13 % 4)
            caja(c, x, 108 - h, 1, h, '#2a4a2c')
        }
    })

    /* Colocamos las luciérnagas en posiciones fijas */
    const luciernagas = (() => {
        const a = azar(303)
        return Array.from({ length: 24 }, () => ({ x: a() * W, y: 56 + a() * 66, f: a() * 6 }))
    })()

    /* Animamos el bosque con luciérnagas que se encienden y se apagan */
    const bosque = (t) => {
        m.drawImage(bosqueFondo, 0, 0)
        luciernagas.forEach((l) => {
            const x = l.x + Math.sin(t / 1400 + l.f) * 8
            const y = l.y + Math.cos(t / 1100 + l.f) * 4
            if (Math.sin(t / 260 + l.f * 3) > 0) {
                punto(m, x, y, '#d8ff7a')
                m.fillStyle = 'rgba(216,255,122,.25)'
                m.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3)
            }
        })
    }

    /* ESTACIÓN */

    /* Pintamos el fondo de la estación: cubierta, ladrillo, reloj, farola, andén y locomotora */
    const estacionFondo = lienzo((c) => {
        // Cubierta de hierro
        for (let y = 0; y < 22; y++) caja(c, 0, y, W, 1, mezcla([24, 26, 34], [44, 48, 60], y / 22))
        for (let x = 0; x < W; x += 20) for (let y = 0; y < 22; y++) {
            punto(c, x + y * .5, y, '#121218')
            punto(c, x + 20 - y * .5, y, '#121218')
        }
        for (let x = 0; x < W; x++) punto(c, x, 21, '#0c0c10')
        const a = azar(41)

        // Muro de ladrillo
        for (let y = 22; y < 104; y++) for (let x = 0; x < W; x++) {
            const fila = Math.floor((y - 22) / 5)
            const junta = (y - 22) % 5 === 0 || (x + (fila % 2) * 6) % 12 === 0
            punto(c, x, y, junta ? [70, 50, 44] : mezcla([118, 52, 38], [150, 74, 52], a() * .7))
        }

        // Reloj con sus marcas y agujas
        for (let y = -10; y <= 10; y++) for (let x = -10; x <= 10; x++) {
            const d = Math.hypot(x, y)
            if (d > 10) continue
            punto(c, 30 + x, 40 + y, d > 8.6 ? '#2a2a30' : '#f2ecd8')
        }
        for (let k = 0; k < 12; k++) punto(c, 30 + Math.cos(k * Math.PI / 6) * 7, 40 + Math.sin(k * Math.PI / 6) * 7, '#2a2a30')
        for (let r = 0; r < 6; r++) punto(c, 30, 40 - r, '#2a2a30')
        for (let r = 0; r < 4; r++) punto(c, 30 + r, 40, '#2a2a30')

        // Farola
        for (const lx of [52]) {
            caja(c, lx, 50, 2, 54, '#1c1c22')
            caja(c, lx - 3, 46, 8, 5, '#1c1c22')
            caja(c, lx - 2, 47, 6, 3, '#ffd889')
        }

        // Andén con la línea amarilla
        for (let y = 104; y < H; y++) for (let x = 0; x < W; x++)
            punto(c, x, y, y < 107 ? '#d8b030' : ((x % 16 === 0 || (y - 107) % 9 === 0) ? [70, 70, 78] : mezcla([96, 96, 104], [116, 116, 124], ((x * 5 + y * 3) % 7) / 7)))

        // Locomotora de vapor asomando por la derecha (frontal, chimenea y caldera)
        const r = '#a61c1c'
        const rl = '#d43a3a'
        const rs = '#6e1010'
        const oro = '#e8b84a'
        const neg = '#151518'
        for (let y = 64; y < 96; y++) for (let x = 212; x < W; x++) {
            const k = (y - 64) / 32
            punto(c, x, y, k < .2 ? rl : k > .8 ? rs : r)
        }
        caja(c, 212, 68, W - 212, 1, oro)
        caja(c, 212, 90, W - 212, 1, oro)
        caja(c, 226, 64, 1, 32, oro)
        caja(c, 216, 42, 8, 22, neg)
        caja(c, 214, 40, 12, 3, neg)
        caja(c, 230, 56, 8, 8, oro)
        caja(c, 231, 54, 6, 2, oro)
        caja(c, 206, 70, 6, 22, neg)
        caja(c, 202, 88, 10, 4, oro)
        caja(c, 207, 72, 4, 4, '#ffe7a3')
        caja(c, 206, 96, W - 206, 3, neg)
        for (const [wx, wr] of [[222, 7], [240, 7]]) for (let y = -wr; y <= wr; y++) for (let x = -wr; x <= wr; x++) {
            const d = Math.hypot(x, y)
            if (d > wr) continue
            punto(c, wx + x, 101 + y, d > wr - 1.5 ? neg : (Math.abs(x) < 1 || Math.abs(y) < 1 || Math.abs(x - y) < 1) ? rs : r)
        }
    })

    const humo = []

    /* Animamos la estación: humo de la locomotora y brillo de la farola */
    const estacion = (t) => {
        m.drawImage(estacionFondo, 0, 0)
        if (Math.random() < .3) humo.push({ x: 220, y: 40, r: 2, v: 0 })
        for (let k = humo.length - 1; k >= 0; k--) {
            const h = humo[k]
            h.v++
            h.y -= .35
            h.x -= .2 + h.v * .004
            h.r += .05
            if (h.v > 120) {
                humo.splice(k, 1)
                continue
            }
            m.fillStyle = `rgba(230,230,236,${(1 - h.v / 120) * .55})`
            for (let y = -h.r; y <= h.r; y++) for (let x = -h.r; x <= h.r; x++) if (x * x + y * y <= h.r * h.r) m.fillRect(Math.round(h.x + x), Math.round(h.y + y), 1, 1)
        }
        for (const lx of [52]) {
            m.fillStyle = `rgba(255,216,137,${.12 + .04 * Math.sin(t / 200 + lx)})`
            m.fillRect(lx - 6, 44, 14, 12)
        }
    }

    /* VIDA DE LOS ESCENARIOS */

    /* Pintamos un sprite a partir de su mapa de letras y su paleta, con opción de darle la vuelta */
    const sprite = (mapa, pal, x, y, espejo = false) => mapa.forEach((f, yy) => [...f].forEach((ch, xx) => {
        if (pal[ch]) punto(m, x + (espejo ? f.length - 1 - xx : xx), y + yy, pal[ch])
    }))

    /* Dibujamos una antorcha de pared con su resplandor */
    const antorcha = (ax, ay, t, i, chispasLista) => {
        m.fillStyle = 'rgba(255,170,90,.10)'
        m.fillRect(ax - 4, ay - 10, 13, 13)
        ;[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[1,2],[2,2],[3,2]].forEach(([x,y]) => punto(m, ax + x, ay + y, '#2b2b33'))
        ;[[1,1],[2,1],[3,1]].forEach(([x,y]) => punto(m, ax + x, ay + y, '#5a3a22'))
        for (let y = 3; y < 13; y++) {
            punto(m, ax + 1, ay + y, '#4a4a55')
            punto(m, ax + 2, ay + y, '#6c6c7a')
            punto(m, ax + 3, ay + y, '#33333c')
        }
        flama(ax, ay - 6, t, i)
        if (chispasLista && Math.random() < .2) chispasLista.push({ x: ax + 2, y: ay - 6, vx: (Math.random() - .5) * .3, vy: -.25 - Math.random() * .3, v: 40 })
    }

    /* Movemos y pintamos una lista de chispas */
    const pintaChispas = (lista) => {
        for (let k = lista.length - 1; k >= 0; k--) {
            const c = lista[k]
            c.x += c.vx
            c.y += c.vy
            if (--c.v <= 0) {
                lista.splice(k, 1)
                continue
            }
            punto(m, c.x, c.y, c.v > 20 ? '#ffd34e' : '#e8542a')
        }
    }

    /* Búho volando, con dos fotogramas de aleteo */
    const BUHO = [['b.....b', 'bb...bb', '.bbobb.', '..oeo..', '..ooo..', '...y...'],
                  ['.......', '..obo..', 'bboeobb', 'b.ooo.b', '...y...', '.......']]
    const PAL_BUHO = { b: '#8a6a44', o: '#d2b285', e: '#ffd34e', y: '#e8b84a' }

    /* Araña con las patas alternas para caminar */
    const ARANA = [['k.k.k.k', '.kkkkk.', 'kkKkKkk', '.k.k.k.'], ['.k.k.k.', 'kkkkkkk', '.kKkKk.', 'k.k.k.k']]
    const PAL_ARANA = { k: '#141016', K: '#d43a3a' }

    /* Rata y paloma */
    const RATA = [['...pp...', '.gggggg.', 'gggggggeg', '.g..g...tt'], ['...pp...', '.gggggg.', 'gggggggeg', '..g..g.tt.']]
    const PAL_RATA = { g: '#6e6670', p: '#d89aa6', e: '#000000', t: '#d89aa6' }
    const PALOMA = [['..gg..', '.gwgk.', 'ggggg.', '.gGGg.', '..y.y.'], ['..gg..', '.gwgk.', 'ggggg.', '.gGGg.', '.y..y.']]
    const PAL_PALOMA = { g: '#8f939e', G: '#6c6f7a', w: '#ffffff', k: '#e8a33a', y: '#d07a6a' }

    /* Encendemos las antorchas del comedor y hacemos cruzar dos búhos por el techo */
    const vidaComedor = (t) => {
        antorcha(31, 56, t, 0, null)
        antorcha(205, 56, t, 2, null)
        for (const [i, periodo, y0, dir] of [[0, 9000, 18, 1], [1, 13000, 30, -1]]) {
            const f = ((t + i * 4000) % periodo) / periodo
            const x = dir > 0 ? -10 + f * (W + 20) : W + 10 - f * (W + 20)
            sprite(BUHO[Math.floor(t / 160) % 2], PAL_BUHO, x, y0 + Math.sin(t / 300 + i) * 3, dir < 0)
        }
    }

    const ojos = [[18, 98, '#ffd34e', 0], [44, 84, '#ff5a3a', 1.7], [210, 94, '#ffd34e', 3.1], [228, 80, '#9cff6e', 4.4], [6, 76, '#ff5a3a', 5.2]]

    /* Damos vida al bosque: ojos que parpadean y arañas colgando y caminando */
    const vidaBosque = (t) => {
        // Los ojos parpadean y a ratos se cierran
        ojos.forEach(([x, y, c, f]) => {
            const s = Math.sin(t / 700 + f)
            if (s > -.4 && !(s > .93)) {
                punto(m, x, y, c)
                punto(m, x + 3, y, c)
            }
        })

        // Arañas que bajan colgando de su hilo
        for (const [x, f] of [[26, 0], [214, 2.2], [56, 4]]) {
            const largo = 18 + Math.round((Math.sin(t / 1500 + f) + 1) * 16)
            for (let y = 0; y < largo; y++) punto(m, x + 3, y, 'rgba(220,220,235,.45)')
            sprite(ARANA[Math.floor(t / 200) % 2], PAL_ARANA, x, largo)
        }

        // Araña que cruza el suelo
        const f = (t % 11000) / 11000
        sprite(ARANA[Math.floor(t / 120) % 2], PAL_ARANA, -8 + f * (W + 16), 116)
    }

    const gotas = [[48, 0], [120, 1.3], [232, 2.6]]

    /* Hacemos caer gotas del techo y pasar una rata por el suelo de la mazmorra */
    const vidaMazmorra = (t) => {
        gotas.forEach(([x, f]) => {
            const p = ((t / 1600) + f) % 1
            if (p < .7) punto(m, x, 2 + p * 155, '#8fb8e0')
            else {
                punto(m, x - 1, 111, '#8fb8e0')
                punto(m, x + 1, 111, '#8fb8e0')
            }
        })
        const f = (t % 14000) / 14000
        if (f < .55) sprite(RATA[Math.floor(t / 110) % 2], PAL_RATA, W + 10 - (f / .55) * (W + 30), 116, true)
    }

    /* Hacemos parpadear el faro de la locomotora y pasear a la paloma por el andén */
    const vidaEstacion = (t) => {
        if (Math.floor(t / 500) % 2) {
            m.fillStyle = 'rgba(255,231,163,.35)'
            m.fillRect(199, 71, 8, 6)
        }
        const f = (t % 16000) / 16000
        const x = 8 + Math.abs(Math.sin(f * Math.PI)) * 50
        const paso = Math.floor(t / 180) % 2
        sprite(PALOMA[paso], PAL_PALOMA, x, 112 + (paso ? 0 : -1), Math.cos(f * Math.PI) < 0)
    }

    /* VIDA EXTRA EN MÓVIL */
    /* En el móvil la escena se ve entera encima de la pregunta, así que le añadimos
    más detalles en movimiento. En el ordenador no se pintan */

    const MURCIELAGO = [['k.....k', 'kk.k.kk', '.kkrkk.', '..k.k..'], ['.......', '..krk..', 'kkkkkkk', 'k.k.k.k']]
    const PAL_MURCIELAGO = { k: '#1c1622', r: '#d43a3a' }

    const SOBRE = ['wwwww', 'wWrWw', 'wwwww']
    const PAL_SOBRE = { w: '#f2e8cf', W: '#cdbd98', r: '#a61c1c' }

    const LIBRO = [['bbbb.bbbb', 'bpppbpppb', 'bpllbpllb', 'bpppbpppb', 'bbbbbbbbb'], ['.bbb.bbb.', 'bpppbpppb', 'bpllbllpb', 'bpppbpppb', 'bbbbbbbbb']]
    const PAL_LIBRO = { b: '#5a2a1a', p: '#efe3c2', l: '#9a8a6a' }

    const CIERVO = [['.s.s......', '..s.......', '..ss......', '..sssssss.', '...ssssss.', '...s.s.s.s', '...s.s.s.s'],
                    ['.s.s......', '..s.......', '..ss......', '..sssssss.', '...ssssss.', '..s..s.s..', '..s...s.s.']]
    const PAL_CIERVO = { s: '#cfe6ff' }

    const LECHUZA = [['w.....w', 'ww...ww', '.wwkww.', '..wew..', '..www..', '...y...'],
                     ['.......', '..wkw..', 'wwwewww', 'w.www.w', '...y...', '.......']]
    const PAL_LECHUZA = { w: '#f4f4f0', k: '#9aa0a8', e: '#e8b84a', y: '#e8a33a' }

    /* Personajes en pixel art: el trío y tres profesores */
    const TUNICA = { k: '#1e1e26', s: '#f0c8a0', d: '#3a2a1a', r: '#ae0001', y: '#eeba30' }
    const HARRY = ['..hhhh..', '.hhhhhhh', '.hssceh.', '.geggeg.', '.ssssss.', '..ssss..', '.rryyrr.', 'kkkrrkkk', 'kkkkkkkk', 'skkkkkks', '.kkkkkk.', '.kkkkkk.', '.kk..kk.', '.dd..dd.']
    const PAL_HARRY = { ...TUNICA, h: '#1a1410', g: '#2a2a2a', e: '#3a8a3a', c: '#c0504a' }
    const HERMIONE = ['.bbbbbb.', 'bbbbbbbb', 'bbssssbb', 'bseesseb', 'bbssssbb', 'bb.ss.bb', '.rryyrr.', 'kkkkkkkk', 'kkkkkkkk', 'skkkkkks', '.kkkkkk.', '.kkkkkk.', '.kk..kk.', '.dd..dd.']
    const PAL_HERMIONE = { ...TUNICA, b: '#7a4a22', e: '#4a2a10' }
    const RON = ['..oooo..', '.oooooo.', '.osssso.', '.sesses.', '.ssffss.', '..ssss..', '.rryyrr.', 'kkkkkkkk', 'kkkkkkkk', 'skkkkkks', '.kkkkkk.', '.kkkkkk.', '.kk..kk.', '.dd..dd.']
    const PAL_RON = { ...TUNICA, o: '#e0672a', e: '#3a6ab0', f: '#d08a5a' }
    const SNAPE = ['..kkkk..', '.kkkkkk.', 'kkppppkk', 'kpeppepk', 'kkpppnkk', 'kk.pp.kk', '.kkkkkk.', 'kkkkkkkk', 'kkkkkkkk', 'pkkkkkkp', 'kkkkkkkk', 'kkkkkkkk', 'kkkkkkkk', 'kkkkkkkk']
    const PAL_SNAPE = { k: '#121216', p: '#e8dcc8', e: '#000000', n: '#cdbda5' }
    const MCGONAGALL = ['....g...', '...gg...', '..ggg...', '.gggggg.', 'gggggggg', '.ssssss.', '.lsslsl.', '.ssssss.', '..ssss..', '.GGGGGG.', 'GGGGGGGG', 'sGGGGGGs', 'GGGGGGGG', 'GGGGGGGG', 'GGGGGGGG']
    const PAL_MCGONAGALL = { g: '#1f4a2a', G: '#2e6b3c', s: '#f0c8a0', l: '#c8c8d0' }
    const DUMBLEDORE = ['....p...', '...pp...', '..ppp...', '.pppppp.', 'pppppppp', '.wssssw.', 'wslsslsw', 'wsswwssw', '.wwwwww.', '.wwwwww.', 'pwwwwwwp', 'ppwwwwpp', 'spppwpps', 'pppppppp', 'pppppppp', 'pppppppp']
    const PAL_DUMBLEDORE = { p: '#5a2a8a', w: '#f0f0f0', s: '#f0c8a0', l: '#c8b45a' }

    /* Estudiantes de las cuatro casas, con pelo y piel variados y la bufanda de su casa */
    const CHICO = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '.ssssss.', '..ssss..', '.AABBAA.', 'kkkAAkkk', 'kkkkkkkk', 'skkkkkks', '.kkkkkk.', '.kkkkkk.', '.kk..kk.', '.dd..dd.']
    const CHICA = ['.hhhhhh.', 'hhhhhhhh', 'hhsssshh', 'hseessh.', 'hhssssh.', 'h.ssss.h', '.AABBAA.', 'kkkAAkkk', 'kkkkkkkk', 'skkkkkks', '.kkkkkk.', '.kkkkkk.', '.kk..kk.', '.dd..dd.']
    const PELOS = ['#1a1410', '#7a4a22', '#e0c068', '#3a2a1a', '#a0522d', '#e0672a']
    const PIELES = ['#f0c8a0', '#c89870', '#8a5a3a', '#f5d6b8']
    const BUFANDAS = [['#ae0001', '#eeba30'], ['#1a472a', '#c0c0c0'], ['#222f5b', '#cd7f32'], ['#ecb939', '#372e29']]

    /* Creamos una lista de estudiantes siempre iguales a partir de una semilla */
    const crearEstudiantes = (semilla, posiciones) => {
        const a = azar(semilla)
        return posiciones.map(([x, y]) => {
            const [A, B] = BUFANDAS[Math.floor(a() * 4)]
            return {
                x,
                y,
                mapa: a() < .5 ? CHICO : CHICA,
                pal: { k: '#1e1e26', d: '#3a2a1a', e: '#2a2a2a', h: PELOS[Math.floor(a() * PELOS.length)], s: PIELES[Math.floor(a() * PIELES.length)], A, B },
                f: a() * 6
            }
        })
    }

    /* Estudiantes sentados a las mesas del comedor (se ve de la bufanda para arriba) */
    const comensales = crearEstudiantes(707, [
        ...[10, 21, 32, 74, 85, 96, 142, 153, 164, 175, 197, 208, 219].map((x) => [x, 102]),
        ...[8, 19, 30, 72, 83, 94, 105, 116, 127, 138, 149, 160, 182, 193, 204, 215, 226].map((x) => [x, 117])
    ])

    /* Estudiantes de pie en la clase de pociones */
    const alumnos = crearEstudiantes(808, [[6, 132], [18, 132], [30, 132], [44, 132], [100, 112], [128, 132], [140, 132], [152, 132]])

    /* Pintamos un personaje de pie con un pequeño balanceo; si va andando, también da pasitos */
    const personaje = (mapa, pal, x, pies, t, f, andando = false, espejo = false) => {
        const salto = andando ? Math.floor(t / 180 + f) % 2 : (Math.sin(t / 600 + f) > .85 ? 1 : 0)
        sprite(mapa, pal, x, pies - mapa.length - salto, espejo)
    }

    /* Luz en la punta de la varita */
    const varita = (x, y, t) => {
        punto(m, x, y, '#8a6a44')
        punto(m, x + 1, y - 1, '#8a6a44')
        punto(m, x + 2, y - 2, Math.sin(t / 120) > 0 ? '#ffffff' : '#fff6c8')
        m.fillStyle = 'rgba(255,250,210,.25)'
        m.fillRect(x + 1, y - 3, 3, 3)
    }

    /* Destello en cruz que se enciende y se apaga */
    const destello = (x, y, t, f, color = '#fff6c8') => {
        const s = Math.sin(t / 400 + f)
        if (s < .3) return
        punto(m, x, y, color)
        if (s > .75) {
            punto(m, x - 1, y, color)
            punto(m, x + 1, y, color)
            punto(m, x, y - 1, color)
            punto(m, x, y + 1, color)
        }
    }

    /* Murciélago que cruza la escena aleteando en zigzag */
    const murcielago = (t, periodo, desfase, y0, dir) => {
        const f = ((t + desfase) % periodo) / periodo
        const x = dir > 0 ? -10 + f * (W + 20) : W + 10 - f * (W + 20)
        sprite(MURCIELAGO[Math.floor(t / 120) % 2], PAL_MURCIELAGO, x, y0 + Math.sin(t / 220 + desfase) * 4, dir < 0)
    }

    const cartas = [[30, 0], [85, .35], [140, .7], [190, .2], [215, .55]]
    const vajilla = [16, 40, 64, 88, 112, 136, 160, 184, 208]

    /* Comedor: vajilla dorada en las mesas, cartas que caen del techo y destellos en los estandartes */
    const extraComedor = (t) => {
        vajilla.forEach((x, i) => {
            for (const y of [109, 123]) {
                caja(m, x, y, 3, 1, '#d8d8e0')
                punto(m, x + 5, y - 1, '#eeba30')
                punto(m, x + 5, y, '#c9962a')
                if ((i + y) % 3 === 0) punto(m, x + 9, y, '#d14a4a')
            }
        })
        cartas.forEach(([x, f]) => {
            const p = ((t / 7000) + f) % 1
            if (p > .8) return
            sprite(SOBRE, PAL_SOBRE, x + Math.sin(t / 500 + f * 9) * 6, -4 + p * 130, false)
        })
        ;[[43, 48], [62, 50], [176, 47], [196, 52]].forEach(([x, y], i) => destello(x, y, t, i * 1.7))
        comensales.forEach((c) => sprite(c.mapa.slice(0, 8), c.pal, c.x, c.y - (Math.sin(t / 700 + c.f) > .9 ? 1 : 0), false))
        personaje(DUMBLEDORE, PAL_DUMBLEDORE, 112, 105, t, 0)
        personaje(MCGONAGALL, PAL_MCGONAGALL, 124, 105, t, 2)
        sprite(HARRY.slice(0, 8), PAL_HARRY, 43, 102, false)
        sprite(RON.slice(0, 8), PAL_RON, 53, 102, false)
        sprite(HERMIONE.slice(0, 8), PAL_HERMIONE, 63, 102, false)
    }

    const burbujasGrandes = [[206, 0], [214, .3], [222, .6], [210, .8]]

    /* Mazmorra: murciélagos, un libro de pociones que flota y burbujas que suben del caldero */
    const extraMazmorra = (t) => {
        murcielago(t, 8000, 0, 22, 1)
        murcielago(t, 11000, 5000, 40, -1)
        const y = 50 + Math.sin(t / 700) * 3
        sprite(LIBRO[Math.floor(t / 900) % 2], PAL_LIBRO, 116, y, false)
        ;[[110, 0], [131, 2], [120, 4]].forEach(([x, f]) => destello(x, y + Math.sin(t / 300 + f) * 4, t, f))
        burbujasGrandes.forEach(([x, f]) => {
            const p = ((t / 2600) + f) % 1
            const by = 92 - p * 40
            const c = p < .8 ? '#7cff6e' : '#c8ffc0'
            punto(m, x + Math.sin(t / 300 + f * 7) * 2, by, c)
            if (p < .5) punto(m, x + 1 + Math.sin(t / 300 + f * 7) * 2, by, c)
        })
        alumnos.forEach((c) => personaje(c.mapa, c.pal, c.x, c.y, t, c.f))
        personaje(HARRY, PAL_HARRY, 68, 112, t, 0)
        personaje(RON, PAL_RON, 78, 112, t, 1.5)
        personaje(HERMIONE, PAL_HERMIONE, 88, 112, t, 3)
        if (Math.sin(t / 900) > .4) caja(m, 95, 96, 1, 3, '#f0c8a0')
        const ida = (t % 12000) / 12000
        const sx = 112 + Math.abs(Math.sin(ida * Math.PI)) * 58
        personaje(SNAPE, PAL_SNAPE, sx, 112, t, 0, true, Math.cos(ida * Math.PI) < 0)
    }

    const luciernagasExtra = (() => {
        const a = azar(909)
        return Array.from({ length: 12 }, () => ({ x: a() * W, y: 60 + a() * 60, f: a() * 6 }))
    })()

    /* Bosque: estrella fugaz, murciélagos ante la luna, un ciervo plateado y más luciérnagas */
    const extraBosque = (t) => {
        const e = (t % 7000) / 7000
        if (e < .12) {
            const k = e / .12
            for (let i = 0; i < 6; i++) punto(m, 40 + k * 120 - i * 2, 8 + k * 22 - i, i < 2 ? '#ffffff' : '#9fb8e8')
        }
        murcielago(t, 9000, 0, 18, -1)
        murcielago(t, 12000, 4000, 30, 1)
        const c = (t % 20000) / 20000
        const cx = -12 + c * (W + 24)
        sprite(CIERVO[Math.floor(t / 260) % 2], PAL_CIERVO, cx, 100, false)
        const paseo = (t % 26000) / 26000
        const px = -40 + paseo * (W + 60)
        personaje(HERMIONE, PAL_HERMIONE, px, 124, t, 1, true)
        personaje(RON, PAL_RON, px + 10, 124, t, 2, true)
        personaje(HARRY, PAL_HARRY, px + 20, 124, t, 0, true)
        varita(px + 28, 116, t)
        luciernagasExtra.forEach((l) => {
            const s = Math.sin(t / 500 + l.f)
            if (s > 0) punto(m, l.x + Math.sin(t / 1300 + l.f) * 6, l.y + Math.cos(t / 900 + l.f) * 3, s > .6 ? '#e6ff8a' : '#9cc84a')
        })
    }

    /* Estación: carrito con baúl y jaula, lechuza blanca volando, cartas al viento y vapor por el andén */
    const extraEstacion = (t) => {
        caja(m, 84, 106, 22, 10, '#6e3b1e')
        caja(m, 84, 106, 22, 1, '#8a5530')
        caja(m, 86, 109, 18, 1, '#c9962a')
        caja(m, 82, 116, 26, 2, '#3a3a42')
        punto(m, 85, 119, '#151518')
        punto(m, 104, 119, '#151518')
        caja(m, 108, 104, 1, 13, '#3a3a42')
        caja(m, 88, 97, 9, 9, '#c9962a')
        caja(m, 89, 98, 7, 7, '#2a2418')
        sprite(LECHUZA[0].slice(2, 5), PAL_LECHUZA, 89, 100, false)
        personaje(HARRY, PAL_HARRY, 112, 122, t, 0)
        personaje(RON, PAL_RON, 122, 122, t, 1.2)
        personaje(HERMIONE, PAL_HERMIONE, 132, 122, t, 2.4)
        const f = (t % 10000) / 10000
        sprite(LECHUZA[Math.floor(t / 150) % 2], PAL_LECHUZA, W + 10 - f * (W + 20), 30 + Math.sin(t / 280) * 3, true)
        ;[[0, 70], [.4, 56], [.75, 84]].forEach(([d, y0]) => {
            const p = ((t / 9000) + d) % 1
            sprite(SOBRE, PAL_SOBRE, W + 6 - p * (W + 12), y0 + Math.sin(t / 400 + d * 9) * 5, false)
        })
        for (let i = 0; i < 4; i++) {
            const p = ((t / 3000) + i * .25) % 1
            m.fillStyle = `rgba(235,235,240,${.35 * (1 - p)})`
            m.fillRect(196 - p * 70, 108 - p * 6, 6 + p * 8, 4 + p * 3)
        }
    }

    const EXTRAS = { comedor: extraComedor, mazmorra: extraMazmorra, bosque: extraBosque, estacion: extraEstacion }
    let conExtras = false

    /* MOTOR: ESCENARIO ACTUAL Y TRANSICIÓN */

    /* Juntamos el fondo y la vida de cada escenario */
    const ESCENAS = {
        comedor: (t) => {
            comedor(t)
            vidaComedor(t)
        },
        mazmorra: (t) => {
            mazmorra(t)
            vidaMazmorra(t)
        },
        bosque: (t) => {
            bosque(t)
            vidaBosque(t)
        },
        estacion: (t) => {
            estacion(t)
            vidaEstacion(t)
        }
    }

    let actual = ESCENAS[escenaInicial] ? escenaInicial : 'comedor'
    let siguiente = null
    let inicioTrans = 0
    let idFrame = null

    /* Preparamos los bloques de 5x5 de la transición, cada uno con su turno al azar */
    const bloques = []
    {
        const a = azar(77)
        for (let y = 0; y < H; y += 5) for (let x = 0; x < W; x += 5) bloques.push([x, y, a()])
    }

    // Con "reducir movimiento" pintamos un solo fotograma por escenario, sin bucle ni transición
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Pintamos cada fotograma y, si toca, la transición de bloques */
    /* Pintamos el escenario actual y, en móvil, su vida extra */
    const pintar = (t) => {
        ESCENAS[actual](t)
        if (conExtras) EXTRAS[actual](t)
    }

    const bucle = (t) => {
        pintar(t)
        if (siguiente) {
            // De 0 a 1 se cubre la pantalla y de 1 a 2 se descubre
            const p = (t - inicioTrans) / 450
            if (p >= 1 && actual !== siguiente) actual = siguiente
            const umbral = p < 1 ? p : 2 - p
            m.fillStyle = '#05050a'
            bloques.forEach(([x, y, r]) => {
                if (r < umbral) m.fillRect(x, y, 5, 5)
            })
            if (p >= 2) siguiente = null
        }
        idFrame = requestAnimationFrame(bucle)
    }

    /* Cambiamos de escenario con transición (o directamente si no hay movimiento) */
    const cambiar = (nombre) => {
        if (!ESCENAS[nombre] || nombre === actual) return
        if (sinMovimiento) {
            actual = nombre
            pintar(0)
            return
        }
        siguiente = nombre
        inicioTrans = performance.now()
    }

    /* Activamos o quitamos la vida extra del móvil */
    const ponerMovil = (activo) => {
        conExtras = activo
        if (sinMovimiento) pintar(0)
    }

    /* Paramos la animación */
    const destruir = () => {
        if (idFrame) cancelAnimationFrame(idFrame)
    }

    if (sinMovimiento) pintar(0)
    else idFrame = requestAnimationFrame(bucle)

    return { cambiar, ponerMovil, destruir }
}

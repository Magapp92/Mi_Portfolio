// vite.config.js
// [IA] Config de Vite. Habilita el plugin de React y define el alias `@`
// apuntando a /src — cumple la regla C3 (importaciones absolutas).

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// __dirname no existe en ESM, lo recreamos.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // import Foo from '@/components/foo/foo.jsx' funciona desde cualquier carpeta.
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        // Puerto por defecto de Vite.
        port: 5173,
        open: false
    }
})

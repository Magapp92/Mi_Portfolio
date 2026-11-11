import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/* En ESM no existe __dirname, así que lo recreamos a partir de la URL del archivo */
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* Activamos el plugin de React y definimos los alias para importar
desde cualquier carpeta sin rutas relativas */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@const': path.resolve(__dirname, 'src/const'),
            '@data': path.resolve(__dirname, 'src/data')
        }
    },
    server: {
        port: 5173,
        open: false
    }
})

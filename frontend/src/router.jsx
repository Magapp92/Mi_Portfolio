
/* Rutas de la web. Cargamos cada página con lazy para que solo se descargue
cuando se visita */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Header } from '@components/header/header.jsx'
import { Footer } from '@components/footer/footer.jsx'
import { RUTAS } from '@const/rutas.js'

const Inicio = lazy(() => import('@pages/inicio/inicio.jsx').then(({ Inicio }) => ({ default: Inicio })))
const SobreMi = lazy(() => import('@pages/sobre-mi/sobre-mi.jsx').then(({ SobreMi }) => ({ default: SobreMi })))
const Proyectos = lazy(() => import('@pages/proyectos/proyectos.jsx').then(({ Proyectos }) => ({ default: Proyectos })))
const Proyecto = lazy(() => import('@pages/proyecto/proyecto.jsx').then(({ Proyecto }) => ({ default: Proyecto })))
const Formacion = lazy(() => import('@pages/formacion/formacion.jsx').then(({ Formacion }) => ({ default: Formacion })))
const Juego = lazy(() => import('@pages/juego/juego.jsx').then(({ Juego }) => ({ default: Juego })))
const NoEncontrada = lazy(() => import('@pages/no-encontrada/no-encontrada.jsx').then(({ NoEncontrada }) => ({ default: NoEncontrada })))

/* Estructura común a todas las páginas: header, contenido y footer */
const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<p style={{ padding: '8rem 2rem', textAlign: 'center', color: '#EDEDED' }}>Cargando…</p>}>
                <Outlet />
            </Suspense>
            <Footer />
        </>
    )
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: RUTAS.INICIO, element: <Inicio /> },
            { path: RUTAS.SOBRE_MI, element: <SobreMi /> },
            { path: RUTAS.PROYECTOS, element: <Proyectos /> },
            { path: RUTAS.PROYECTO, element: <Proyecto /> },
            { path: RUTAS.FORMACION, element: <Formacion /> },
            { path: RUTAS.JUEGO, element: <Juego /> },
            // La 404 va dentro del layout para que siga saliendo el header y el footer
            { path: RUTAS.NO_ENCONTRADA, element: <NoEncontrada /> }
        ]
    }
])

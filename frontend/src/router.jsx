// router.jsx
// Definición central de rutas. Cumple regla C12: TODAS las páginas se
// cargan con React.lazy + Suspense (code splitting + loader durante la descarga).

import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Header } from '@/components/header/header.jsx'
import { Footer } from '@/components/footer/footer.jsx'
import { ROUTES } from '@/const/routes.js'

// Imports diferidos — cada page va en su propio chunk.
const HomePage      = lazy(() => import('@/pages/home/home.jsx'))
const AboutPage     = lazy(() => import('@/pages/about/about.jsx'))
const ProyectosPage = lazy(() => import('@/pages/proyectos/proyectos.jsx'))
const ProyectoPage  = lazy(() => import('@/pages/proyecto/proyecto.jsx'))
const FormacionPage = lazy(() => import('@/pages/formacion/formacion.jsx'))
const JuegoPage     = lazy(() => import('@/pages/juego/juego.jsx'))
const NotFoundPage  = lazy(() => import('@/pages/not-found/not-found.jsx'))

// Layout común: header fijo + main + footer (misma estructura que la web original).
function Layout() {
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
            { path: ROUTES.HOME, element: <HomePage /> },
            { path: ROUTES.SOBRE_MI, element: <AboutPage /> },
            { path: ROUTES.PROYECTOS, element: <ProyectosPage /> },
            { path: ROUTES.PROYECTO, element: <ProyectoPage /> },
            { path: ROUTES.FORMACION, element: <FormacionPage /> },
            { path: ROUTES.JUEGO, element: <JuegoPage /> },
            // Catch-all 404 dentro del layout para conservar header/footer.
            { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> }
        ]
    }
])

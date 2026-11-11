
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'

/* Componente raíz: le pasamos el router con todas las páginas */
const App = () => {
    return <RouterProvider router={router} />
}

export default App

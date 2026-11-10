// App.jsx
// Raíz de la aplicación: delega el enrutado al RouterProvider definido en
// router.jsx. Aquí no metemos lógica — solo conecta los dos.

import { RouterProvider } from 'react-router-dom'
import { router } from '@/router.jsx'

export function App() {
    return <RouterProvider router={router} />
}

export default App

import { createBrowserRouter } from 'react-router-dom'
import Main from '../pages/Main'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/page/:page',
    element: <Main />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
])

export default router

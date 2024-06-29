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
    caseSensitive: true,
    element: <Main />,
  },
  {
    path: '/tag/:tag',
    caseSensitive: true,
    element: <Main />,
  },
  {
    path: '/tag/:tag/page/:page',
    caseSensitive: true,
    element: <Main />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router

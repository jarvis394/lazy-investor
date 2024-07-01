import { createBrowserRouter } from 'react-router-dom'
import Main from '../pages/Main'
import NotFound from '../pages/NotFound'
import Search from '../pages/Search'
import NoResults from '../pages/NoResults'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/search',
    caseSensitive: true,
    element: <Search />,
  },
  {
    path: '/search/:search',
    caseSensitive: true,
    element: <Main />,
  },
  {
    path: '/search/:search/page/:page',
    caseSensitive: true,
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
    path: '/no-results',
    caseSensitive: true,
    element: <NoResults />,
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

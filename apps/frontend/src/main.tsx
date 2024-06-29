import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from './config/theme'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import { Provider } from 'react-redux'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import './styles/global.css'

dayjs.locale('ru')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

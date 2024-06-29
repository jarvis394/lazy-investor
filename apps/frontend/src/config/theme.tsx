import { Palette, createTheme } from '@mui/material/styles'
import { CSSProperties } from 'react'

declare module '@mui/material' {
  type CustomPalette = {
    buttonHint: {
      main: string
      hovered: string
    }
    buttonContrast: {
      main: string
      color: string
      colorHovered: string
    }
  }
  interface PaletteOptions {
    buttonHint: {
      main: string
      hovered: string
    }
    buttonContrast: {
      main: string
      color: string
      colorHovered: string
    }
  }
  interface TypeText {
    hint: string
    secondary: string
    primary: string
  }
  interface Mixins {
    button: CSSProperties
  }
  interface Theme {
    palette: Palette & CustomPalette
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    buttonContrast: {
      main: '#000000',
      color: '#ffffff',
      colorHovered: '#000000',
    },
    buttonHint: {
      main: 'rgba(0, 0, 0, 0.05)',
      hovered: 'rgba(0, 0, 0, 0.16)',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.63)',
      hint: 'rgba(0, 0, 0, 0.46)',
    },
  },
  typography: {
    fontFamily: '"Inter"',
  },
  mixins: {
    button: {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      outlineColor: '#000000',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease',
      textAlign: 'initial',
      textDecoration: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      // small
      sm: 600,
      // medium
      md: 960,
      // large
      lg: 1300,
      // extra-large
      xl: 1400,
    },
  },
})

export const CARD_COLORS: string[] = [
  '#F7E6D4',
  '#E6E0EA',
  '#F5F2E2',
  '#E4EDDA',
  '#FCDEDC',
  '#DBE6F9',
  '#D8F3FC',
  '#DAF8D7',
  '#F9E8F8',
]

export default theme

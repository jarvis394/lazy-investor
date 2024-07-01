import { styled, ButtonBase, ButtonBaseProps, alpha } from '@mui/material'
import cx from 'classnames'
import React from 'react'

const Root = styled(ButtonBase)(({ theme }) => ({
  ...theme.mixins.button,
  borderRadius: 16,
  padding: theme.spacing(2, 3),
  gap: theme.spacing(2),
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '24px',
  fontFamily: 'Inter',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  transitionDuration: `${theme.transitions.duration.short}ms`,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.buttonHint.main,
  },
  '&:active': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.buttonHint.main, 0.07),
    transitionDuration: `${theme.transitions.duration.shortest}ms`,
  },
  '&.Button--fullWidth': {
    width: '100%',
  },
  '&.Button--primary': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 0 0 2px inset transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: '0 0 0 2px inset ' + theme.palette.text.primary,
    },
    '&:active': {
      backgroundColor: alpha(theme.palette.text.primary, 0.05),
    },
  },
  '&.Button--secondary': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.buttonHint.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.buttonHint.main, 0.07),
    },
    '&:active': {
      backgroundColor: theme.palette.buttonHint.hovered,
    },
  },
  '&.Button--contrast': {
    color: theme.palette.buttonContrast.color,
    backgroundColor: theme.palette.buttonContrast.main,
    boxShadow: '0 0 0 2px inset transparent',
  },
  '&.Button--contrast.Button--hoverDefault': {
    '&:hover': {
      color: theme.palette.buttonContrast.color,
      backgroundColor: alpha(theme.palette.buttonContrast.main, 0.85),
      boxShadow: 'none',
    },
    '&:active': {
      color: theme.palette.buttonContrast.color,
      backgroundColor: alpha(theme.palette.buttonContrast.main, 0.63),
      boxShadow: 'none',
    },
  },
  '&.Button--contrast.Button--hoverInverse': {
    '&:hover': {
      color: theme.palette.buttonContrast.colorHovered,
      backgroundColor: 'transparent',
      boxShadow: '0 0 0 2px inset ' + theme.palette.buttonContrast.colorHovered,
    },
    '&:active': {
      boxShadow: '0 0 0 2px inset ' + theme.palette.buttonContrast.colorHovered,
      color: theme.palette.buttonContrast.colorHovered,
      backgroundColor: alpha(theme.palette.buttonContrast.colorHovered, 0.05),
    },
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
    lineHeight: '32px',
    padding: theme.spacing(2, 3),
    borderRadius: 20,
  },
  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}))

export type ButtonProps = ButtonBaseProps & {
  variant?: 'default' | 'contrast' | 'primary' | 'secondary'
  hoverVariant?: 'inverse' | 'default'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  hoverVariant = 'default',
  fullWidth,
  ...props
}) => {
  return (
    <Root
      {...props}
      disableRipple
      disableTouchRipple
      className={cx(className, {
        'Button--primary': variant === 'primary',
        'Button--secondary': variant === 'secondary',
        'Button--contrast': variant === 'contrast',
        'Button--hoverDefault': hoverVariant === 'default',
        'Button--hoverInverse': hoverVariant === 'inverse',
        'Button--fullWidth': fullWidth,
      })}
    />
  )
}

export default React.memo(Button)

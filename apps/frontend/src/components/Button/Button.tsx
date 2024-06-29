import { styled, ButtonBase, ButtonBaseProps, alpha } from '@mui/material'
import cx from 'classnames'
import React from 'react'

const Root = styled(ButtonBase)(({ theme }) => ({
  ...theme.mixins.button,
  borderRadius: 20,
  padding: theme.spacing(2.5, 3),
  gap: theme.spacing(2),
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '21px',
  fontFamily: 'Inter',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  transitionDuration: `${theme.transitions.duration.short}ms`,
  '&:active': {
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
    lineHeight: '30px',
  },
  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}))

type ButtonProps = ButtonBaseProps & {
  variant?: 'contrast' | 'primary' | 'secondary'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
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
        'Button--fullWidth': fullWidth,
      })}
    />
  )
}

export default Button

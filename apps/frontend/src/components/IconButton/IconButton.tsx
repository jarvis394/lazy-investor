import React from 'react'
import { alpha, styled } from '@mui/material'

const Root = styled('button')(({ theme }) => ({
  ...theme.mixins.button,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  transitionDuration: `${theme.transitions.duration.short}ms`,
  '&:hover': {
    backgroundColor: theme.palette.buttonHint.main,
  },
  '&:active': {
    backgroundColor: alpha(theme.palette.buttonHint.main, 0.07),
  },
}))

type IconButtonProps = React.PropsWithChildren &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return <Root {...props}>{children}</Root>
}

export default React.memo(IconButton)

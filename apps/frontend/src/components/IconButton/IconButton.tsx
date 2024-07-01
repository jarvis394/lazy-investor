import React from 'react'
import { styled } from '@mui/material'
import Button, { ButtonProps } from '../Button/Button'

const Root = styled(Button)(({ theme }) => ({
  ...theme.mixins.button,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  transitionDuration: `${theme.transitions.duration.short}ms`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
  },
}))

const IconButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Root {...props}>{children}</Root>
}

export default React.memo(IconButton)

import React from 'react'
import { InputBase, alpha, styled } from '@mui/material'

const Input = styled(InputBase)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.text.primary, 0.06),
  padding: theme.spacing(1.5, 3),
  borderRadius: 16,
  fontWeight: 500,
  gap: theme.spacing(2),
  fontFamily: 'Inter Tight',
  fontSize: 20,
  lineHeight: '32px',
  width: 400,
  transition: theme.transitions.create('all'),
  'label + &': {
    marginTop: theme.spacing(4),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    border: 'none',
    padding: 0,
    height: 'auto',
  },
  '&.Mui-error .MuiInputBase-input': {
    boxShadow: `0 0 0 1px ${theme.palette.error.main} inset`,
  },
  '&[data-valid=true] .MuiInputBase-input:not(:focus)': {
    boxShadow: `0 0 0 1px ${theme.palette.success.main} inset`,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 3),
    borderRadius: 20,
  },
}))

export default React.memo(Input)

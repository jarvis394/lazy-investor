import React from 'react'
import { styled, TabProps as MUITabProps, alpha } from '@mui/material'
import Button, { ButtonProps } from '../Button/Button'

const Root = styled(Button)(({ theme }) => ({
  '&.Tab': {
    fontSize: 14,
    height: 36,
    margin: theme.spacing(0, 0.25),
    padding: theme.spacing(0, 2),
    borderRadius: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
      height: 48,
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(0, 2.5),
      borderRadius: 16,
    },
  },
  '&.Button--contrast': {
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
}))

type TabProps = {
  label: string
  selected?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: React.ChangeEvent<unknown>, newValue: any) => void
} & ButtonProps &
  MUITabProps

const Tab: React.FC<TabProps> = ({
  label,
  value,
  onChange,
  selected,
  style,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (selected) return
    onChange?.(e, value)
  }

  return (
    <Root
      onClick={handleClick}
      variant={selected ? 'contrast' : 'primary'}
      className="Tab"
      style={style}
    >
      {label}
    </Root>
  )
}

export default React.memo(Tab)

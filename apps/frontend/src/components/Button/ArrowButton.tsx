import React from 'react'
import { styled } from '@mui/material'
import Button, { ButtonProps } from './Button'
import ArrowLeft from '../svg/ArrowLeft'
import ArrowRight from '../svg/ArrowRight'
import cx from 'classnames'

const Root = styled(Button)(({ theme }) => ({
  '&.ArrowButton--left, &.ArrowButton--right': {
    padding: theme.spacing(1, 0.5),
  },
  height: 36,
  minWidth: 36,
  borderRadius: 12,
  padding: 0,
  margin: theme.spacing(0, 0.25),
  flexShrink: 0,
  [theme.breakpoints.up('sm')]: {
    height: 48,
    minWidth: 48,
    borderRadius: 16,
    '&.ArrowButton--left, &.ArrowButton--right': {
      padding: theme.spacing(1.5, 2.5),
    },
  },
}))

export const ArrowButtonLeft: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Root className={cx('ArrowButton--left', className)} {...props}>
      <ArrowLeft />
    </Root>
  )
}

export const ArrowButtonRight: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Root className={cx('ArrowButton--right', className)} {...props}>
      <ArrowRight />
    </Root>
  )
}

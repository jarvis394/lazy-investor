import React from 'react'
import { ADMIN_EMAIL } from '../../config/constants'
import { styled } from '@mui/material'
import CopyRight from '../svg/CopyRight'
import IconButton from '../IconButton/IconButton'
import cx from 'classnames'

const Root = styled('div')(({ theme }) => ({
  gap: theme.spacing(2),
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  fontSize: 20,
  fontWeight: 500,
  [theme.breakpoints.up('xl')]: {
    fontSize: 16,
    fontWeight: 400,
  },
  '&.EmailContainer--visibleOnXL': {
    display: 'none',
    [theme.breakpoints.up('xl')]: {
      display: 'flex',
    },
  },
  '&.EmailContainer--visibleUpToXL': {
    display: 'flex',
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}))

type EmailContainerProps = {
  visibleOnXL?: boolean
  visibleUpToXL?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const EmailContainer: React.FC<EmailContainerProps> = ({
  visibleOnXL = false,
  visibleUpToXL = false,
  className,
  ...props
}) => {
  return (
    <Root
      className={cx('EmailContainer', className, {
        'EmailContainer--visibleUpToXL': visibleUpToXL,
        'EmailContainer--visibleOnXL': visibleOnXL,
      })}
      {...props}
    >
      {ADMIN_EMAIL}
      <IconButton>
        <CopyRight />
      </IconButton>
    </Root>
  )
}

export default EmailContainer

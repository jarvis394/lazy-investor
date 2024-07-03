import React, { useEffect, useState } from 'react'
import { ADMIN_EMAIL } from '../../config/constants'
import { Fade, styled } from '@mui/material'
import CopyRight from '../svg/CopyRight'
import IconButton from '../IconButton/IconButton'
import cx from 'classnames'
import Check from '../svg/Check'

const Root = styled('div')(({ theme }) => ({
  gap: theme.spacing(1),
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  fontSize: 20,
  fontWeight: 500,
  position: 'relative',
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

const Icon = styled('div')({
  position: 'absolute',
  width: 24,
  height: 24,
})

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
  const [copied, setCopied] = useState(false)
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(ADMIN_EMAIL)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false)
      }, 3000)

      return () => {
        clearTimeout(id)
      }
    }

    return
  }, [copied])

  return (
    <Root
      className={cx('EmailContainer', className, {
        'EmailContainer--visibleUpToXL': visibleUpToXL,
        'EmailContainer--visibleOnXL': visibleOnXL,
      })}
      {...props}
    >
      {ADMIN_EMAIL}
      <IconButton sx={{ width: 56, height: 56 }} onClick={copyEmailToClipboard}>
        <Fade in={!copied} appear={false}>
          <Icon>
            <CopyRight />
          </Icon>
        </Fade>
        <Fade in={copied}>
          <Icon>
            <Check />
          </Icon>
        </Fade>
      </IconButton>
    </Root>
  )
}

export default EmailContainer

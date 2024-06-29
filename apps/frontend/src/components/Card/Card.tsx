import React, { useMemo } from 'react'
import { Skeleton, styled, useTheme } from '@mui/material'
import cx from 'classnames'
import { Pulse } from '@prisma/client'
import Button from '../Button/Button'
import ArrowUpRight from '../svg/ArrowUpRight'
import dayjs from 'dayjs'
import { CARD_COLORS } from '../../config/theme'

const Root = styled('div')(({ theme }) => ({
  WebkitTapHighlightColor: 'transparent',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(5),
  borderRadius: 30,
  padding: theme.spacing(2.5),
  background: 'var(--cardBackground)',
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(7.5),
  },
}))

const Header = styled('div')(({ theme }) => ({
  flexGrow: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
  display: 'flex',
  gap: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}))

const Tag = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2.5),
  fontFamily: '"Inter Tight"',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '16px',
  userSelect: 'none',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 20,
  letterSpacing: '0.03em',
}))

const Share = styled('h2')(() => ({
  margin: 0,
  fontFamily: '"Inter Tight"',
  fontWeight: 400,
  fontSize: 24,
  letterSpacing: '0.03em',
}))

const Timestamp = styled('span')(({ theme }) => ({
  margin: 0,
  fontFamily: '"Inter Tight"',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.text.hint,
  userSelect: 'none',
  letterSpacing: '0.03em',
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(4),
}))

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  gap: theme.spacing(2),
}))

const VerticalContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3.75),
  flex: '1 1 0',
}))

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  fontFamily: '"Inter Tight"',
  fontWeight: 500,
  fontSize: 20,
  lineHeight: '20px',
  letterSpacing: '0.03em',
  color: theme.palette.text.primary,
  wordBreak: 'break-word',
  flex: '1 1 0',
  [theme.breakpoints.up('sm')]: {
    fontSize: 36,
    lineHeight: '36px',
  },
}))

const Label = styled('h6')(({ theme }) => ({
  margin: 0,
  fontFamily: '"Inter Tight"',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.text.hint,
  userSelect: 'none',
  letterSpacing: '0.02em',
}))

const PotentialPercentage = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 36,
  lineHeight: '36px',
  wordBreak: 'break-all',
  [theme.breakpoints.up('sm')]: {
    fontSize: 80,
    lineHeight: '80px',
  },
}))

type BaseCardProps =
  | {
      skeleton: true
      pulse?: never
    }
  | {
      pulse: Pulse
      skeleton?: never
    }

export type CardProps = BaseCardProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Card: React.FC<CardProps> = ({
  pulse,
  className,
  style,
  skeleton,
  ...props
}) => {
  const theme = useTheme()
  const cardBackground = useMemo(() => {
    if (skeleton) {
      return theme.palette.buttonHint.main
    }

    const numbers =
      (pulse.shareTag + pulse.share)?.split('').map((e) => e.charCodeAt(0)) ||
      []
    let res = 0
    numbers.forEach((e) => (res += e))
    return CARD_COLORS[res % CARD_COLORS.length]
  }, [pulse?.share, pulse?.shareTag, skeleton, theme.palette.buttonHint.main])
  const formattedTimestamp = useMemo(
    () => dayjs(pulse?.timestamp).format('DD.MM.YYYY'),
    [pulse?.timestamp]
  )

  return (
    <Root
      className={cx('Card', className)}
      style={{
        ...style,
        ['--cardBackground' as string]: cardBackground,
      }}
      {...props}
    >
      <Timestamp>
        {skeleton ? <Skeleton width={72} height={21} /> : formattedTimestamp}
      </Timestamp>

      <Header>
        <Tag>
          {skeleton ? <Skeleton width={38} height={16} /> : pulse.shareTag}
        </Tag>
        <Share>
          {skeleton ? <Skeleton width={128} height={36} /> : pulse.share}
        </Share>
      </Header>

      <Content>
        <Item>
          <Label>
            {skeleton ? <Skeleton width={68} height={17} /> : 'Потенциал'}
          </Label>
          <PotentialPercentage>
            {skeleton ? (
              <Skeleton width={'70%'} height={80} />
            ) : (
              pulse.potentialPercentage + '%'
            )}
          </PotentialPercentage>
        </Item>
        <VerticalContainer>
          <Item>
            <Label>
              {skeleton ? <Skeleton width={32} height={16} /> : 'Цель'}
            </Label>
            {skeleton ? <Skeleton width={'50%'} height={50} /> : pulse.goal}
          </Item>
          {(pulse?.investmentSuccessTime || skeleton) && (
            <Item>
              <Label>
                {skeleton ? (
                  <Skeleton width={64} height={16} />
                ) : (
                  'Срок реализации'
                )}
              </Label>
              {skeleton ? (
                <Skeleton width={100} height={50} />
              ) : (
                pulse.investmentSuccessTime
              )}
            </Item>
          )}
        </VerticalContainer>
      </Content>

      <Button
        component={'a'}
        // @ts-expect-error MUI types bug
        href={pulse?.buttonUrl}
        disabled={skeleton}
        rel="noopener noreferrer"
        target="_blank"
        fullWidth
      >
        {skeleton ? (
          <Skeleton width={210} height={20} />
        ) : (
          <>
            {pulse?.buttonText}
            <ArrowUpRight />
          </>
        )}
      </Button>
    </Root>
  )
}

export default Card

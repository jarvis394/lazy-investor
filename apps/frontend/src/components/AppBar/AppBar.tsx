import React from 'react'
import { AppBar as AppBarBase, styled } from '@mui/material'
import Logo from '../svg/Logo'
import Search from '../svg/Search'
import { APP_MIN_WIDTH } from '../../config/constants'
import EmailContainer from '../EmailContainer/EmailContainer'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const Root = styled(AppBarBase)(({ theme }) => ({
  background: theme.palette.background.paper,
  minWidth: APP_MIN_WIDTH,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: theme.spacing(2.5, 2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5, 5),
  },
}))

const StyledLogo = styled(Logo)(({ theme }) => ({
  width: 'auto',
  height: 48,
  [theme.breakpoints.up('md')]: {
    height: 56,
  },
}))

const Content = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const Container = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2.5),
  },
}))

const LogoContainer = styled('a')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2.5),
  },
}))

const Title = styled('h1')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 500,
  lineHeight: '30px',
  letterSpacing: '0.03em',
  display: 'none',
  userSelect: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}))

const StyledSearchIcon = styled(Search)(() => ({
  display: 'flex',
  flexShrink: 0,
  width: 24,
  height: 24,
}))

const SearchInput = styled(Input)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    width: 240,
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: 320,
  },
}))

const SearchButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderRadius: 16,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const ChannelLinkButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2.25, 2.5),
  lineHeight: '20px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5, 3),
  },
}))

const AppBar: React.FC = () => {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Root position="static" elevation={0}>
      <Content>
        <LogoContainer onClick={handleGoHome}>
          <StyledLogo />
          <Title>Ленивый инвестор</Title>
        </LogoContainer>
        <EmailContainer visibleOnXL />
        <Container>
          <SearchButton variant="secondary">
            <StyledSearchIcon />
          </SearchButton>
          <SearchInput
            placeholder="Поиск"
            endAdornment={<StyledSearchIcon />}
          />
          <ChannelLinkButton
            variant="contrast"
            component={'a'}
            // @ts-expect-error MUI types bug
            href="https://t.me/leniviy_investor"
            rel="noreferrer noopener"
            target="_blank"
          >
            Перейти в канал
          </ChannelLinkButton>
        </Container>
      </Content>
    </Root>
  )
}

export default React.memo(AppBar)

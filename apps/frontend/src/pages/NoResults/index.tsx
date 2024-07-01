import * as React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import { styled } from '@mui/material'
import { APP_MIN_WIDTH } from '../../config/constants'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import SadSmile from '../../components/svg/SadSmile'

const Root = styled('div')(() => ({
  minWidth: APP_MIN_WIDTH,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(12),
}))

const Illustration = styled(SadSmile)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Subtitle = styled('p')(({ theme }) => ({
  fontSize: 20,
  fontWeight: 500,
  margin: 0,
  letterSpacing: '0.03em',
  fontFamily: '"Inter Tight"',
  color: theme.palette.text.hint,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}))

const NoResults: React.FC = () => {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Root>
      <AppBar />
      <Container>
        <Illustration />
        <Subtitle>
          К сожалению, по вашему запросу
          <br />
          ничего не найдено
        </Subtitle>
        <Button variant="contrast" onClick={handleGoHome} component={'a'}>
          На главную
        </Button>
      </Container>
    </Root>
  )
}

export default NoResults

import * as React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import { Pagination, styled } from '@mui/material'
import { APP_MIN_WIDTH } from '../../config/constants'
import Card from '../../components/Card/Card'
import { usePulsesGetPageQuery } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'

const Root = styled('div')(() => ({
  minWidth: APP_MIN_WIDTH,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  '& *': {
    boxSizing: 'border-box',
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(7.5),
  padding: theme.spacing(5),
  flexGrow: 1,
  width: '100%',
}))

const CardsContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gridGap: theme.spacing(3.75),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}))

type Props = {
  page?: string
}

const Main: React.FC = () => {
  const { page = '1' } = useParams<Props>()
  const navigate = useNavigate()
  const parsedPage = Number(page) || 1
  const { data, isFetching, isSuccess } = usePulsesGetPageQuery(parsedPage)
  const skeletons = React.useMemo(() => {
    const array = new Array(12).fill(null)
    return array.map((_, i) => <Card key={i} skeleton />)
  }, [])

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    navigate('/page/' + newPage)
  }

  React.useEffect(() => {
    if (isSuccess && parsedPage > data.pages) {
      navigate('/404')
    }
  }, [isSuccess, data?.pages, parsedPage, navigate])

  return (
    <Root>
      <AppBar />
      <Container>
        <Pagination
          onChange={handlePageChange}
          page={parsedPage}
          count={data?.pages}
        />
        <CardsContainer>
          {isFetching && skeletons}
          {isSuccess &&
            data.pulses.map((pulse) => <Card key={pulse.id} pulse={pulse} />)}
        </CardsContainer>
      </Container>
    </Root>
  )
}

export default Main

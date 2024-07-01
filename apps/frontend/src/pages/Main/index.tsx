import React, { startTransition } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import { Fade, TabScrollButtonProps, styled } from '@mui/material'
import { APP_MIN_WIDTH } from '../../config/constants'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import { usePulsesGetPageQuery, useShareTagsGetListQuery } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import TabsWithRef from '../../components/Tabs/Tabs'
import Tab from '../../components/Tabs/Tab'
import {
  ArrowButtonLeft,
  ArrowButtonRight,
} from '../../components/Button/ArrowButton'
import EmailContainer from '../../components/EmailContainer/EmailContainer'
import { Pulse } from '@prisma/client'

const ALL_TAGS_KEY = 'all'
const DEFAULT_GET_LIST_LIMIT = 12

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
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(4),
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(7.5),
    padding: theme.spacing(5),
  },
}))

const CardsContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gridGap: theme.spacing(2.5),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridGap: theme.spacing(3.75),
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}))

const TabsContainer = styled('div')(({ theme }) => ({
  gap: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // TODO: work out a better solution for flex wrap
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    width: 'auto',
  },
}))

const HorizontalContainer = styled('div')(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}))

const Spacer = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}))

const Footer = styled('footer')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('xl')]: {
    display: 'none',
  },
}))

const ScrollButton: React.FC<TabScrollButtonProps> = ({
  direction,
  disabled,
  onClick,
}) => {
  if (direction === 'left') {
    return (
      <ArrowButtonLeft
        disabled={disabled}
        onClick={onClick}
        variant="secondary"
      />
    )
  } else if (direction === 'right') {
    return (
      <ArrowButtonRight
        disabled={disabled}
        onClick={onClick}
        variant="secondary"
      />
    )
  } else {
    return null
  }
}

type Props = {
  page?: string
  tag?: string
  search?: string
}

const Main: React.FC = () => {
  const { page = '1', tag: paramsShareTag, search } = useParams<Props>()
  const navigate = useNavigate()
  const parsedPage = Number(page) || 1
  const { data, isFetching, isSuccess } = usePulsesGetPageQuery({
    page: parsedPage,
    filter: {
      shareTag: paramsShareTag,
      search,
    },
  })
  const { data: tags } = useShareTagsGetListQuery({})
  const [selectedTag, setSelectedTag] = React.useState(
    paramsShareTag || ALL_TAGS_KEY
  )
  const skeletonsArray = new Array<Pulse | undefined>(
    DEFAULT_GET_LIST_LIMIT
  ).fill(undefined)
  const dataArray = data?.pulses || skeletonsArray

  const handleSelectedTagChange = (
    _event: React.SyntheticEvent,
    newTag: string
  ) => {
    startTransition(() => {
      setSelectedTag(newTag)
      navigate('/tag/' + newTag)
    })
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage === parsedPage) return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    const pathWithPage = (path: string, page: number) => {
      const missingSlash = path[path.length - 1] === '/' ? '' : '/'
      if (page === 1) {
        return path
      } else {
        return path + `${missingSlash}page/` + page
      }
    }

    startTransition(() => {
      if (selectedTag && selectedTag !== ALL_TAGS_KEY) {
        navigate(pathWithPage('/tag/' + selectedTag, newPage))
      } else if (search) {
        navigate(pathWithPage('/search/' + search, newPage))
      } else {
        navigate(pathWithPage('/', newPage))
      }
    })
  }

  const handleSelectAllTags = () => {
    startTransition(() => {
      setSelectedTag(ALL_TAGS_KEY)
      navigate('/')
    })
  }

  React.useEffect(() => {
    if (data?.count === 0) {
      return navigate('/no-results')
    }

    if (isNaN(Number(page)) || (isSuccess && parsedPage > data.pages)) {
      navigate('/404')
    }
  }, [page, isSuccess, data?.pages, parsedPage, navigate, data?.count])

  return (
    <Root>
      <AppBar search={search} />
      <Container>
        <HorizontalContainer>
          <TabsContainer>
            <Tab
              value={ALL_TAGS_KEY}
              onChange={handleSelectAllTags}
              label="Все"
              selected={selectedTag === ALL_TAGS_KEY}
            />
            {tags?.tags && (
              <Fade in>
                <TabsWithRef
                  ScrollButtonComponent={ScrollButton}
                  variant="scrollable"
                  onChange={handleSelectedTagChange}
                  value={selectedTag === ALL_TAGS_KEY ? false : selectedTag}
                >
                  {tags.tags.map((tag) => (
                    <Tab value={tag} label={tag} key={tag} />
                  ))}
                </TabsWithRef>
              </Fade>
            )}
          </TabsContainer>
          {data?.pages && (
            <Fade in>
              <Pagination
                onChange={handlePageChange}
                page={parsedPage}
                count={data?.pages}
              />
            </Fade>
          )}
        </HorizontalContainer>
        <CardsContainer>
          {dataArray.map((pulse, i) => (
            <Card key={i} pulse={pulse} skeleton={isFetching} />
          ))}
        </CardsContainer>
        <HorizontalContainer>
          <Spacer />
          <Pagination
            onChange={handlePageChange}
            page={parsedPage}
            count={data?.pages}
          />
        </HorizontalContainer>
      </Container>
      <Footer>
        <EmailContainer visibleUpToXL />
      </Footer>
    </Root>
  )
}

export default React.memo(Main)

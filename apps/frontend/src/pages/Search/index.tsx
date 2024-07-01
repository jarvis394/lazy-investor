import * as React from 'react'
import { APP_MIN_WIDTH } from '../../config/constants'
import { useNavigate } from 'react-router-dom'
import { AppBar as AppBarBase, styled } from '@mui/material'
import SearchBar from '../../components/SearchBar/SearchBar'
import ChevronLeft from '../../components/svg/ChevronLeft'
import SearchIcon from '../../components/svg/Search'
import IconButton from '../../components/IconButton/IconButton'
import { useAppSelector } from '../../store'
import Button from '../../components/Button/Button'

const SEARCH_PAGE_MAX_WIDTH = 960

const Root = styled('div')(() => ({
  minWidth: APP_MIN_WIDTH,
  maxWidth: SEARCH_PAGE_MAX_WIDTH,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  margin: '0 auto',
}))

const AppBar = styled(AppBarBase)(({ theme }) => ({
  background: theme.palette.background.paper,
  minWidth: APP_MIN_WIDTH,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: theme.spacing(2.5, 2),
  width: '100%',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5, 5),
  },
}))

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}))

const ListItemButton = styled(Button)(({ theme }) => ({
  borderRadius: '0 !important',
  padding: theme.spacing(3, 4),
  gap: theme.spacing(4),
  justifyContent: 'flex-start',
}))

const StyledSearchBar = styled(SearchBar)({
  width: '100%',
})

const Search: React.FC = () => {
  const navigate = useNavigate()
  const searchHistory = useAppSelector((store) => store.app.searchHistory)

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleAutocompleteItemClick = (search: string) => {
    navigate('/search/' + search)
  }

  return (
    <Root>
      <AppBar position="static" elevation={0}>
        <IconButton onClick={handleGoBack}>
          <ChevronLeft />
        </IconButton>
        <StyledSearchBar withSearchButton />
      </AppBar>
      <Container>
        {searchHistory.map((e, i) => (
          <ListItemButton
            onClick={handleAutocompleteItemClick.bind(null, e)}
            key={i}
          >
            <SearchIcon />
            {e}
          </ListItemButton>
        ))}
      </Container>
    </Root>
  )
}

export default Search

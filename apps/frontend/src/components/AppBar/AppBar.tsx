import React, { useState } from 'react'
import {
  AppBar as AppBarBase,
  ClickAwayListener,
  alpha,
  styled,
} from '@mui/material'
import Logo from '../svg/Logo'
import Search from '../svg/Search'
import { APP_MIN_WIDTH } from '../../config/constants'
import EmailContainer from '../EmailContainer/EmailContainer'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import IconButton from '../IconButton/IconButton'
import { useAppSelector } from '../../store'
import SearchIcon from '../../components/svg/Search'
import cx from 'classnames'

const Root = styled(AppBarBase)(({ theme }) => ({
  background: theme.palette.background.paper,
  minWidth: APP_MIN_WIDTH,
  flexDirection: 'row',
  padding: theme.spacing(2.5, 2),
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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

const StyledSearchBar = styled(SearchBar)(({ theme }) => ({
  display: 'none',
  zIndex: 10,
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    width: 240,
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: 320,
  },
  '& .AppBar__search': {
    transitionDuration: '0ms !important',
  },
  '& .AppBar__search--focused': {
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
  },
}))

const SearchButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 20,
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: theme.zIndex.modal,
}))

const AutocompleteContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'absolute',
  top: 64,
  backgroundColor: theme.palette.background.paper,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  overflow: 'hidden',
  zIndex: -1,
  boxShadow: `0 0 4px 0 ${alpha(theme.palette.text.primary, 0.07)},
    0 0 16px 0 ${alpha(theme.palette.text.primary, 0.07)}`,
}))

const AutocompleteItemButton = styled(Button)(({ theme }) => ({
  borderRadius: '0 !important',
  padding: theme.spacing(3, 4),
  gap: theme.spacing(4),
  justifyContent: 'flex-start',
}))

type AppBarProps = {
  search?: string
}

const AppBar: React.FC<AppBarProps> = ({ search }) => {
  const navigate = useNavigate()
  const searchHistory = useAppSelector((store) => store.app.searchHistory)
  const [searchBoxFocused, setSearchBoxFocused] = useState(false)

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoToSearch = () => {
    navigate('/search')
  }

  const handleAutocompleteItemClick = (search: string) => {
    navigate('/search/' + search)
    setSearchBoxFocused(false)
  }

  const handleSearchBoxFocus = () => {
    setSearchBoxFocused(true)
  }

  const handleClickAway = () => {
    setSearchBoxFocused(false)
  }

  return (
    <Root position="static" elevation={0}>
      <LogoContainer onClick={handleGoHome}>
        <StyledLogo />
        <Title>Ленивый инвестор</Title>
      </LogoContainer>
      <EmailContainer visibleOnXL />
      <Container>
        <SearchButton onClick={handleGoToSearch} variant="secondary">
          <StyledSearchIcon />
        </SearchButton>
        <ClickAwayListener onClickAway={handleClickAway}>
          <SearchContainer>
            <StyledSearchBar
              inputProps={{
                onFocus: handleSearchBoxFocus,
                className: cx('AppBar__search', {
                  'AppBar__search--focused':
                    searchBoxFocused && searchHistory.length !== 0,
                }),
              }}
              onSubmit={handleClickAway}
              defaultValue={search}
            />
            {searchBoxFocused && (
              <AutocompleteContainer>
                {searchHistory.map((e, i) => (
                  <AutocompleteItemButton
                    onClick={handleAutocompleteItemClick.bind(null, e)}
                    key={i}
                  >
                    <SearchIcon />
                    {e}
                  </AutocompleteItemButton>
                ))}
              </AutocompleteContainer>
            )}
          </SearchContainer>
        </ClickAwayListener>

        <Button
          variant="contrast"
          hoverVariant="inverse"
          component={'a'}
          // @ts-expect-error MUI types bug
          href="https://t.me/leniviy_investor"
          rel="noreferrer noopener"
          target="_blank"
        >
          Перейти в канал
        </Button>
      </Container>
    </Root>
  )
}

export default React.memo(AppBar)

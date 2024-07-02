import { InputBaseProps, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Search from '../svg/Search'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../Button/Button'
import { useAppDispatch } from '../../store'
import { addSearchToHistory } from '../../store/app'

const SEARCH_MIN_LENGTH = 2
const SEARCH_MAX_LENGTH = 128

const Root = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const SearchInput = styled(Input)(() => ({
  width: '100%',
}))

const StyledSearchIcon = styled(Search)(() => ({
  display: 'flex',
  flexShrink: 0,
  width: 24,
  height: 24,
}))

type SearchBarProps = {
  inputProps?: InputBaseProps
  withSearchButton?: boolean
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

const SearchBar: React.FC<SearchBarProps> = ({
  inputProps,
  withSearchButton,
  ...props
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState(params.search || '')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formattedSearch = search.replace(/\W/g, '')

    if (
      formattedSearch.length < SEARCH_MIN_LENGTH ||
      formattedSearch.length > SEARCH_MAX_LENGTH
    ) {
      return
    }

    dispatch(addSearchToHistory(formattedSearch))
    navigate('/search/' + formattedSearch)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (params.search !== search) {
      setSearch(params.search || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.search])

  return (
    <Root {...props} onSubmit={handleSubmit}>
      <SearchInput
        name="search"
        placeholder="Поиск"
        autoComplete="off"
        endAdornment={<StyledSearchIcon />}
        value={search}
        onChange={handleChange}
        {...inputProps}
      />
      {withSearchButton && (
        <Button variant="contrast" type="submit">
          Искать
        </Button>
      )}
    </Root>
  )
}

export default React.memo(SearchBar)

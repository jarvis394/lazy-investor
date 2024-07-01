import { InputBaseProps, styled } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import Search from '../svg/Search'
import { useNavigate } from 'react-router-dom'
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

interface FormElements extends HTMLFormElement {
  search: HTMLInputElement
}

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
  const dispatch = useAppDispatch()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const elements = (e.target as HTMLFormElement)
      .elements as unknown as FormElements
    const search = elements.search.value.trim().replace(/\W/g, '')

    if (
      search.length < SEARCH_MIN_LENGTH ||
      search.length > SEARCH_MAX_LENGTH
    ) {
      return
    }

    dispatch(addSearchToHistory(search))
    navigate('/search/' + search)
  }

  return (
    <Root {...props} onSubmit={handleSubmit}>
      <SearchInput
        name="search"
        placeholder="Поиск"
        autoComplete="off"
        endAdornment={<StyledSearchIcon />}
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

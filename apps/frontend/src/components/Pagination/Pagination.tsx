import React from 'react'
import {
  Pagination as MUIPagination,
  PaginationItemProps,
  PaginationProps,
  styled,
} from '@mui/material'
import Button from '../Button/Button'
import { ArrowButtonLeft, ArrowButtonRight } from '../Button/ArrowButton'

const StyledMUIPagination = styled(MUIPagination)(({ theme }) => ({
  width: '100%',
  '& .MuiPagination-ul': {
    justifyContent: 'space-between',
    width: '100%',
  },
  '& .MuiPagination-ul li:not(:first-child):not(:last-child)': {
    display: 'flex',
    flexGrow: 1,
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    '& .MuiPagination-ul': {
      justifyContent: 'flex-start',
    },
    '& .MuiPagination-ul li': {
      display: 'flex',
      flexGrow: 0,
    },
  },
}))

const StyledPaginationItem = styled(Button)(({ theme }) => ({
  '&.PaginationItem': {
    fontSize: 14,
  },
  height: 36,
  minWidth: 36,
  maxWidth: 64,
  borderRadius: 12,
  padding: '0 !important',
  margin: theme.spacing(0, 0.25),
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    borderRadius: 16,
    height: 48,
    minWidth: 48,
    '&.PaginationItem': {
      fontSize: 16,
    },
  },
}))

const PaginationItemEllipsis = styled('div')(({ theme }) => ({
  fontSize: 16,
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: theme.palette.text.primary,
  height: 'auto',
  '&:disabled': {
    opacity: theme.palette.action.disabledOpacity,
  },
}))

const PaginationItem: React.FC<PaginationItemProps<'button'>> = ({
  page,
  selected,
  type,
  ...props
}) => {
  if (type === 'previous') {
    return (
      <ArrowButtonLeft
        {...props}
        className="PaginationItem PaginationItem--previous"
        variant="secondary"
      />
    )
  }

  if (type === 'next') {
    return (
      <ArrowButtonRight
        {...props}
        className="PaginationItem PaginationItem--next"
        variant="secondary"
      />
    )
  }

  if (type === 'end-ellipsis' || type === 'start-ellipsis') {
    return <PaginationItemEllipsis>…</PaginationItemEllipsis>
  }

  return (
    <StyledPaginationItem
      {...props}
      className="PaginationItem"
      variant={selected ? 'contrast' : 'primary'}
    >
      {page}
    </StyledPaginationItem>
  )
}

const PaginationWithRef = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    return (
      <StyledMUIPagination
        ref={ref}
        renderItem={(item) => <PaginationItem {...item} />}
        {...props}
      />
    )
  }
)

export default React.memo(PaginationWithRef)

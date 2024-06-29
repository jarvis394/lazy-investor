import React from 'react'
import { Tabs as MUITabs, TabsTypeMap, styled } from '@mui/material'

const Root = styled(MUITabs)(({ theme }) => ({
  border: 'none',
  maxWidth: 870,
  minHeight: 36,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 48,
  },
}))

const TabsWithRef = React.forwardRef<HTMLDivElement, TabsTypeMap['props']>(
  function Tabs(props, ref) {
    return <Root ref={ref} {...props} />
  }
)

export default React.memo(TabsWithRef)

import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const ArrowUpRight: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (
  props
) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.62464 7.08062L17.1466 7.0805M17.1466 7.0805L17.1466 15.4813M17.1466 7.0805L7.24714 16.98"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowUpRight

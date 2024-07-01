import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const ChevronLeft: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (
  props
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 17L8 12L13 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronLeft

import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const ArrowLeft: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (
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
        d="M11.1667 16.375L7 12M7 12L11.1667 7.625M7 12H17"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowLeft

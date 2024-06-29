import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const ArrowRight: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (
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
        d="M12.8333 16.375L17 12M17 12L12.8333 7.625M17 12H7"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowRight

import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const Check: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (props) => {
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
        d="M16.8 8.40002L9.64043 15.6L7.19995 13.1457"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Check

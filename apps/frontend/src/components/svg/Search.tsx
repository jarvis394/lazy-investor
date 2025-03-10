import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const Search: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (props) => {
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
        d="M16.9269 17.04L20.4 20.4M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11009 19.28 3.60001 15.7699 3.60001 11.44C3.60001 7.11006 7.11009 3.59998 11.44 3.59998C15.7699 3.59998 19.28 7.11006 19.28 11.44Z"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Search

import React from 'react'
import { SvgIconTypeMap } from '@mui/material'

const CopyRight: React.FC<SvgIconTypeMap<unknown, 'svg'>['props']> = (
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
        d="M20.5283 13.125L20.5283 5.99991C20.5283 4.34304 19.1852 2.99989 17.5283 2.99991L10.4033 2.99999M14.5283 21L7.77832 21C6.53568 21 5.52832 19.9926 5.52832 18.75L5.52832 8.99999C5.52832 7.75735 6.53568 6.74999 7.77832 6.74999L14.5283 6.74999C15.771 6.74999 16.7783 7.75735 16.7783 8.99999L16.7783 18.75C16.7783 19.9926 15.771 21 14.5283 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default CopyRight

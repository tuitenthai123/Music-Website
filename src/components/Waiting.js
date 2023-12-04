import React from 'react'
import { memo } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const waiting = () => {
  return (
    <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="30"
  visible={true}
/>
  )
}

export default memo(waiting)
import React from 'react'
import { memo } from 'react'
import {Audio } from 'react-loader-spinner'

const LoadingSong = () => {
  return (
    <Audio
  height="60"
  width="60"
  color="white"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>
  )
}

export default memo(LoadingSong)
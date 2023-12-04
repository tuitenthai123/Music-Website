import React from 'react'
import icons from '../ultis/icon'
import {Search} from './'

const {IoMdArrowRoundBack,IoMdArrowRoundForward,TbMusicSearch} =icons

const header = () => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-6 w-full'>
          <div className='flex gap-8 flex items-center text-gray-400'>
            <span>
              <IoMdArrowRoundBack size={28} />
            </span>
            <span>
              <IoMdArrowRoundForward size={28} />
            </span>
           
          </div>
          <div className='w-1/2'>
              <span>
              <Search />
              </span>
          </div>
          
      </div>
          <div>
            login
          </div>
    </div>
  )
}

export default header
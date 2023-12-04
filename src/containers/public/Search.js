import React from 'react'
import { Outlet } from 'react-router-dom'
//import { Scrollbars } from 'react-custom-scrollbars-2'
const Search = () => {
  return (
    <div className='w-full'>
        <div className='flex h-[50px] mb-7 items-center text-sm border-b pl-[60px] border-gray-400 pb-1'>
          <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết Quả Tìm Kiếm </span>
          <div className='flex items-center'>
              <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Tất Cả</span>
              <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Bài Hát</span>
              <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Playlist/Album</span>
          </div>
        </div>
        <div className='w-full'>     
              <Outlet/>
        </div>

        <div className='w-full h-[90px]'></div>
    </div>
  )
}

export default Search
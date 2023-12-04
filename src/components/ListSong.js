import React,{memo} from 'react'
import {Listitems} from './'
import icons from '../ultis/icon'
import moment from 'moment'
import { UseSelector, useSelector } from 'react-redux'

const{GoDotFill} = icons
const ListSong = ({totalDuration}) => {
const {songs} = useSelector(state => state.nhac)
  return (
    
    <div className='w-full flex flex-col text-xs text-gray-600'>
        <div className='flex justify-between items-center p-[10px] font-semibold'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>
        <div className='flex flex-col'>
            {songs?.map(items => (
              <Listitems  key={items.encodeId} songData={items}/>
            ))}   
        </div>
        <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
          <span>{`${songs?.length} Bài Hát`}</span>
          <GoDotFill size={24} />
          <span>{moment.utc(totalDuration*1000).format('HH:mm:ss')}</span>
          <span></span>
        </span>
    </div>
  )
}

export default memo(ListSong)
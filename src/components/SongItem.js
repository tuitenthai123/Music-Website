import React from 'react'
import { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({thumbnail,title,artists,sid,releaseDate,order,percent,style,size}) => {
  const dispatch = useDispatch()
  return (
    <div 
    className={`w-full flex p-[10px] justify-between items-center rounded-lg gap-[10px] cursor-pointer ${style || 'text-black hover:bg-main-200'}`}
    onClick={() => {
      dispatch(actions.setCurSongId(sid))
      dispatch(actions.play(true))
    }}
    >
        <div className='flex gap-4'>
        {order && <span className={`${order === 1 ? 'text-shoadow-1':order === 2 ? 'text-shoadow-2' : 'text-shoadow-3'} text-[32px] text-[rgba(77,34,104,0.9)]`}>{order}</span>}
        <img src={thumbnail} alt='thumbnail' className={`${size || 'w-[60px] h-[60px] '} object-cover rounded-lg`} />
        <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{title?.length > 30 ? `${title?.slice(0,30)}...` : title}</span>
            <span className='text-xs opacity-70'>{artists?.length > 30 ? `${artists?.slice(0,30)}...` : artists}</span>
            {releaseDate &&<span className={`text-xs opacity-70 ${order?'opacity-70':'text-gray-700'}`}>{moment(releaseDate*1000).fromNow()}</span>}
        </div>
        </div>
        {percent && <span className='font-bold'>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItem)
import React,{memo} from 'react'
import icons from '../ultis/icon'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
const {IoMusicalNotesOutline} = icons

const Listitems = ({songData,isHideAlbum}) => {
    const dispatch = useDispatch()
  return (
    <div className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
    onClick={() =>{
      dispatch(actions.playAlbum(true))
      dispatch(actions.setCurSongId(songData?.encodeId))
      dispatch(actions.play(true))
    }}>
        <div className='flex items-center gap-3 flex-1'>
            {!isHideAlbum && <span><IoMusicalNotesOutline  /></span>}
            <img src={songData?.thumbnail} alt='thumbnailM' className='w-10 h-10 object-cover rounded-lg' />
            <span className='flex flex-col w-full'>
                <span className='text-sm font-semibold'>{songData?.title?.length>30? `${ songData?.title?.slice(0,40)}...` : songData?.title}</span>
                <span className='text-xs opacity-70'>{songData?.artistsNames}</span>
            </span>
        </div>
        {isHideAlbum && <div className='flex-1 flex justify-center'>
            {songData?.album?.title?.length>30? `${ songData?.album?.title?.slice(0,40)}...` : songData?.album?.title}
            </div>}
        <div className='flex-1 flex justify-end'>{moment.utc(songData?.duration *1000).format('mm:ss')}</div>
    </div>
  )
}

export default memo(Listitems)
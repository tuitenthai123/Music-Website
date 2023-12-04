import React from 'react'
import icons from '../ultis/icon'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {SongItem} from './'
import { apiGetPlaylist } from '../apis'
import {Scrollbars} from 'react-custom-scrollbars-2'

const {FaTrashCan} = icons


const SidebarRight = () => {
  const {CurSongData,curAlbumId, isPlaying} = useSelector(state => state.nhac)
  const [playlist, setplaylist] = useState()
  const [isRecent, setisRecent] = useState(false)
  // console.log(CurSongData)
  const fetchDetailPlaylist = async () => {
    const response = await apiGetPlaylist(curAlbumId)
    if(response.data?.err === 0){
      setplaylist(response?.data?.data.song.items)
    }
}

  useEffect(()=>{
    curAlbumId && fetchDetailPlaylist()
  },[])

  useEffect(()=>{
    if(curAlbumId && isPlaying) fetchDetailPlaylist()
  },[curAlbumId,isPlaying])

  return (
    <div className='flex flex-col text-xs w-full h-full bg-main-200'>
      <div className='h-[70px] justify-between w-full flex-none py-[14px] px-2 flex items-center gap-8'>
        <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
          <span 
          className={`py-[5px] ${!isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          onClick={() => setisRecent(prev => !prev)}
          >
            Danh Sách Phát
          </span>
          <span 
          className={`py-[5px] ${isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
          onClick={()=>setisRecent(prev => !prev)}
          >
            Nghe Gần Đây
          </span>
        </div>
        <span className='p-1 rounded-full cursor-pointer hover:bg-main-100'><FaTrashCan size={18}/></span>
      </div>
      {isRecent ? <div>ngheganday</div>:
      <div className='w-full flex-col flex-auto flex px-2'>
      <Scrollbars style={{width: '100%', height: '100%'}} autoHide>
      <SongItem
          thumbnail={CurSongData?.thumbnail}
          title={CurSongData?.title}
          artists={CurSongData?.artistsNames}
          sid={CurSongData?.encodeId}
          sm
          style='bg-main-500 text-white'
        />
        <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
          <span className='text-sm font-bold'>tiếp theo</span>
          <span className='opacity-70 flex gap-1 text-xs'>
            <span >Từ Playlist </span>
            <span className='font-semibold text-main-500'>
            {CurSongData?.album?.title.length > 30 ? `${CurSongData?.album?.title.slice(0,30)}...`:CurSongData?.album?.title}
            </span>
          </span>
        </div>
        {playlist && <div className='flex flex-auto flex-col'>
        
            {playlist?.map(item => (
              <SongItem
                  key={item?.encodeId}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.encodeId}
                  size= 'w-[40px] h-[40px]'
              />
            ))}
        </div>}
      </Scrollbars>
      </div>}
      <div className='w-full h-[90px]'></div>
    </div>
  )
}

export default SidebarRight
import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment/moment'
import { ListSong,LoadingSong } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch,useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icon'


const {FaPlay} =icons

const Album = () => {
  const {pid} = useParams()
  const {isPlaying} = useSelector(state => state.nhac )
  const[playlistData, setPlaylistData] = useState({})
  const dispatch = useDispatch()
  const[isLoading,setisLoading] = useState(false);

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async ()=>{
      dispatch(actions.loadingpage(true))
      const response = await apis.apiGetPlaylist(pid)
      dispatch(actions.loadingpage(false))
      if(response?.data.err===0){
          setPlaylistData(response?.data.data)
          dispatch(actions.setPlaylist(response.data?.data?.song?.items))
      }
    }
    fetchDetailPlaylist()
  },[pid])
  return (
        <div className='flex relative gap-8 w-full h-full px-[59px]'>
          <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
            <div className='w-full relative overflow-hidden'>
              <img src={playlistData?.thumbnailM} alt="thumbnail" className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-lg animate-rotate-center-pause'}`}/>
                <div className='absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 text-white flex items-center justify-center'>
                  <span className='p-3 border border-white rounded-full'>
                    {isPlaying ? <LoadingSong /> :<FaPlay size={50}/>}</span>
                </div>
            </div>
          <div className='flex flex-col items-center gap-1'>
            <h3 className='text-[20px] font-bold item-center text-gray-800'> {playlistData?.title}</h3>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>
              <span>Ngày Cập Nhật: </span>
              <span> {moment.unix(playlistData?.contentLastUpdate).format("DD/MM//YYYY")}</span>
            </span>
            <span className='flex gap-2 items-center text-gray-500 text-xs'>{playlistData?.artistsNames}</span>
            {/* cho nay chinh lai */}
            <span className='flex gap-2 items-center text-gray-500 text-xs'>{`${playlistData?.like / 1000} Người Yêu Thích`}</span>
          </div>
      </div>
    <Scrollbars style={{width: '100%', height:'80%'}} autoHide>
      <div className='flex-aut mb-40'>
          <span className='text-sm text-gray-600'>
            <span >Lời Tựa: </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <div>
  {playlistData?.song?.items && (
    <ListSong
      totalDuration={playlistData?.song?.totalDuration}
    />
  )}
</div>
    </div>
    </Scrollbars>
    </div>
   
  )
}

export default Album
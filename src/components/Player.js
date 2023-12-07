import React,{useEffect, useRef, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icon'
import * as actions from '../store/actions'
import moment from 'moment/moment'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Waiting} from './'
import { BsDisplay } from 'react-icons/bs'


const{ FaRegKissWinkHeart,FaKissWinkHeart,HiDotsHorizontal,TbPlayerSkipBack,TbPlayerSkipForward,FaPause,FaPlay,FaShuffle,CiRepeat,TbRepeatOnce,BsMusicNoteList,FiVolume,FiVolume1,FiVolume2,IoMdVolumeOff} = icons
var intervalId
const Player = ({setisShowRight}) => {
  const [audio , setAudio] = useState(new Audio())
  const {curSongId,isPlaying,songs} = useSelector(state => state.nhac )
  const [songInfo,setSongInfo] = useState(null)
  const [duration,setDuration] =useState(0)
  const [isshuffe,setIsShuffe] = useState(false)
  const [repeatMode,setreatMode] = useState(1)
  const [curSeconds,setCurSeconds] =useState(0)
  const [iswaiting,setiswaiting] = useState(true)
  const [volume,setvolume] = useState(100)
  const dispatch = useDispatch()
  const thumbRef = useRef()
  const trackRef = useRef()

  useEffect(()=>{
    audio.volume = volume / 100
  }, [volume])

  useEffect(() => {
    const handleEnded =()=>{
        if(isshuffe){
          handleShuffle();
        }else if(repeatMode){
          repeatMode === 1 ?  handleRepeatone(): handleNextSong();
        }else{
          audio.pause()
          dispatch(actions.play(false))
        }
    }
    audio.addEventListener('ended',handleEnded)
    return()=>{
      audio.removeEventListener('ended',handleEnded)
    }
  },[audio,isshuffe,repeatMode])

  useEffect(() => {
      const fetchDetailSong = async () =>{
          setiswaiting(false)
          const [res1,res2] = await Promise.all([
            apis.getDetaiSong(curSongId),
            apis.apiGetSong(curSongId)
          ])
          setiswaiting(true)
          if(res1.data.err === 0){
              setSongInfo(res1.data.data)
              dispatch(actions.setCurSongData(res1.data.data))
          }
          if (res2?.data?.err === 0) {
            audio.pause()
            setAudio(new Audio(res2.data.data['128']))
          }else{
            audio.pause()
            setAudio(new Audio())
            dispatch(actions.play(false))
            toast.warn(res2.data.msg)
            setCurSeconds(0)
            thumbRef.current.style.cssText = `right: 100%`
          }
      }
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if (isPlaying && thumbRef.current)
    {
        audio.play()
        intervalId = setInterval(() =>{
          let percent = Math.round(audio.currentTime*10000/songInfo.duration) / 100
          thumbRef.current.style.cssText = `right: ${100-percent}%`
          setCurSeconds(Math.round(audio.currentTime))
      },200)
    }
  }, [audio]);
  
  const handleMusicplay = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play()
      dispatch(actions.play(true));
    }
  };

  const handleclickprogress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    let percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = percent * songInfo.duration / 100;
    setCurSeconds(Math.round(percent * songInfo.duration / 100));
  };
  
 const handleNextSong = () => {
    if (songs) {
      if (isshuffe) {
        const randomIndex = Math.round(Math.random()* songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
      } else {
        let currentSongIndex;
        songs?.forEach((item, index) => {
          if (item.encodeId === curSongId) currentSongIndex = index;
        });
  
        if (currentSongIndex === songs.length - 1) {
          dispatch(actions.setCurSongId(songs[0].encodeId));
        } else {
          dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
        }
      }
      dispatch(actions.play(true));
    }
  };
  const handleBackSong = () =>{
    if(songs){
        let currentSongIndex
        songs?.forEach((item,index) => {
          if(item.encodeId === curSongId) currentSongIndex = index          
        })
        dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
        dispatch(actions.play(true))
    }
  }

  const handleRepeatone = () => {
      audio.play()
  }
  
  const handleShuffle = () =>{
    const randomIndex = Math.round(Math.random()* songs?.length) - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
  }
  return (
    <div className='bg-main-400 px-5 h-full flex py-2'>
      <div className='w-[30%] flex-auto flex gap-3 items-center'>
        <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col '>
          <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
          <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
          </div>  
          <div className='flex gap-4 pl-2' >
            <span>
              <FaRegKissWinkHeart size={16} />
            </span>
            <span>
            <HiDotsHorizontal  size={16}/>
            </span>
          </div>
      </div>
      <div className='w-[40%] flex-auto flex items-center justify-center gap-2 flex-col'>
        <div className='flex gap-8 justify-center items-center'>
              <span 
              onClick={() => setIsShuffe(prev =>!prev)} title='Bật Phát Ngẫu Nhiên' className={`cursor-pointer font-bold ${isshuffe ? 'text-purple-600' : 'text-black'}`}><FaShuffle  size={23} /></span>
              <span onClick={handleBackSong} className={`${!songs ? 'text-gray-500':'cursor-pointer'}`}><TbPlayerSkipBack  size={23} /></span>
              <span className='p-2 cursor-pointer border border-gray-700 hover:text-main-500 rounded-full' onClick={handleMusicplay}>
                
              {!iswaiting ? <Waiting /> : isPlaying ? < FaPause size={30}/> : < FaPlay size={30}/> }
                {}
              </span>
              <span onClick={handleNextSong}  className={`${!songs ? 'text-gray-500':'cursor-pointer'}`}><TbPlayerSkipForward size={23} /></span>
              <span onClick={()=>setreatMode(prev=>prev === 2 ? 0 : prev + 1)} className={`cursor-pointer ${repeatMode && 'text-purple-600'}`} title='Bật Phát Lại Tất Cả'>
                
                {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
                </span>
        </div>

        <div className='w-full flex items-center justify-center gap-3 text-sm'>
            <span className=''>{moment.utc(curSeconds*1000).format('mm:ss')}</span>
            <div className='w-3/5 h-[3px] hover:h-[8px] relative rounded-l-full rounded-r-full cursor-pointer h-[3px] bg-[rgba(0,0,0,0.1)]'
                 onClick={handleclickprogress}
                 ref={trackRef}>
               <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0E8080]'></div>
            </div>
            <span>{moment.utc(songInfo?.duration*1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center justify-end gap-4'> 
         <div className='flex gap-2 items-center'>
          <span onClick={() => setvolume(prev => +prev ===0 ? 60 : 0 )}>
            {+volume >=50 ? <FiVolume2 size={25} /> : +volume === 0 ? <IoMdVolumeOff size={25}/> : <FiVolume1 size={25} />}
          </span>
         <input type="range" step={1} min={0} max = {100} value={volume} color='#0E8080' onChange={(e) => setvolume(e.target.value)} />
         </div>
         
          <span onClick={() => setisShowRight(prev => !prev)} className='p-1 rounded-lg bg-main-500 opacity-90 hover:opacity-100'><BsMusicNoteList size={20} /></span>
      </div>
    </div>
  )
}

export default Player

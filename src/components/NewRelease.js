import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {SongItem} from './'
import { useEffect } from 'react'



const NewRelease = () => {
  const {newRelease} = useSelector(state => state.app)
  const [isActived,setActived] = useState(0)
  const[songs,setSongs] = useState([])
  useEffect(()=>{
    isActived ? setSongs(newRelease?.items?.others) :setSongs(newRelease?.items?.vPop) 
  },[isActived,newRelease])
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold'>{newRelease?.title}</h3>
        <span className='text-xs'>TẤT CẢ</span>
      </div>
      <div className='flex items-center gap-5 text-xs'>
        <button type='button' className= {`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${isActived ===0 && 'bg-main-500 text-white'}`}
        onClick={()=>setActived(0)}
        >
                VIỆT NAM
        </button>
        <button type='button' className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400  ${isActived ===1 && 'bg-main-500 text-white'}`}
         onClick={()=>setActived(1)}>
                QUỐC TẾ
        </button>
      </div>
      <div className='flex flex-wrap w-full'>
        {songs?.map(item =>(
          <div key={item.encodeId} className='w-[45%] min-[1024px]:w-[30%] '>
              <SongItem 
          key={item.encodeId}
          thumbnail={item.thumbnail}
          title={item.title}
          artists={item.artistsNames}
          releaseDate={item.releaseDate}
          sid={item.encodeId}
          size='w-[40px] h-[40px]'
          />
          </div>
        ))}
      </div>
    </div>
        
  )
}

export default NewRelease
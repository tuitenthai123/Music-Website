import React from 'react'
import { useSelector } from 'react-redux'
import {handlenumber} from '../../ultis/fnevent'
import {Listitems, SongItem,Section} from '../../components'
import { data } from 'autoprefixer'


const SearchAll = () => {
  const {searchData} = useSelector(state => state.nhac)
  // console.log(searchData)
  return (
    <div className='w-full flex flex-col px-[60px] gap-[60px]'>
        <div className='flex flex-col'>
          <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
          <div className='flex gap-8 '>
          {
          searchData?.top && 
          <div className='p-[10px] bg-main-200 rounded-lg flex-1 flex gap-8 items-center cursor-pointer'>
            <img src={searchData.top.thumbnail} alt='avatar' className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full'}`}/>
            <div className='flex flex-col text-xs'>
                <span className='mb-[6px]'>{searchData.top.objectType === 'artist'?'nghệ sĩ': ""}</span>
                <span className='text-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>
                {searchData.top.objectType === 'artist' && <span>{handlenumber(searchData?.artists[0]?.totalFollow) + " Quan Tâm"} </span>}
            
            </div>
            </div>
          }
          
          {searchData?.songs?.filter((item,index) => [...Array(2).keys()].some(i=>i === index))?.map(item => (
            <div key={item.encodeId} className='flex-1'>
                <SongItem
              thumbnail={item.thumbnail}
              sid={item.encodeId}
              title={item.title}
              artists={item.artistsNames}
              size='w-[84px] h-[84px]'
              style='bg-main-200'
            />
            </div>
          ))}
          </div>  
        </div>


        <div className='flex flex-col w-full'>
              <h3 className='text-lg font-bold mb-5'>Bài Hát</h3>             
                  <div className='flex justify-between w-full flex-wrap' >
                    {searchData?.songs?.map( (item,index) => (
                      <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !==0 ? 'pl-4' : 'pr-4'}`}>
                        <Listitems songData={item} isHideAlbum/>
                      </div>
                    ))}
                  </div>           
          </div>
    </div>
  )
}

export default SearchAll
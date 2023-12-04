import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getArrslider } from '../ultis/fnevent';
import * as actions from '../store/actions'
import { Navigate, useNavigate } from 'react-router-dom';


const Slider = () => {
  const { banner } = useSelector(state => state.app);
  const dispatch = useDispatch()
  const Navigate = useNavigate()
 //animation banner
  useEffect(()=>{
   
    const sliderEls = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const intervalId = setInterval(() => {
      const list = getArrslider(min,max,sliderEls.length-1)
      for (let i = 0; i < sliderEls.length; i++) {
        // xoa animation
        sliderEls[i].classList?.remove('animate-slide-right', 'order-last', 'z-20');  
        sliderEls[i].classList?.remove('animate-slide-left','order-first','z-10') 
        sliderEls[i].classList?.remove('animate-slide-left2','order-2','z-10') 
        // hien hinh nay kia
        if(list.some(items => items === i)){
            sliderEls[i].style.cssText ='display: block'
          } else{
            sliderEls[i].style.cssText ='display: none'
          }
        }

      //animation ne
      list.forEach(items => {
        if(items === max){
          sliderEls[items].classList?.add('animate-slide-right', 'order-last', 'z-20');
        }else if(items === min){
            sliderEls[items].classList?.add('animate-slide-left','order-first','z-10')
        }else{
          sliderEls[items].classList?.add('animate-slide-left2', 'order-2', 'z-10');
        }
      })
        //toan tu 3 ngoi vjp pro moi hoc duoc
      min = (min === sliderEls.length - 1) ? 0 :min+1
      max = (max === sliderEls.length - 1) ? 0 :max+1
    },2000)
    return () => {
      intervalId && clearInterval(intervalId)
    }
  },[])

  const handldeClickBanner = items => {
    if(items?.type === 1)
    {
      dispatch(actions.setCurSongId(items.encodeId))
      dispatch(actions.play(true))
      dispatch(actions.setPlaylist(null))
    }else if(items?.type === 4){
      const albumPath = items?.link?.split('.')[0]
      Navigate(albumPath)
    }else{
      dispatch(actions.setPlaylist(null))
    }
  }

  return (
<div className='w-full overflow-hidden px-[59px]'>
<div className='flex gap-8 w-full overflow-hidden px-[59px] pt-8'>
    {banner?.map((items, index) => (
        <img
            key={items.encodeId}
            src={items.banner}
            onClick={() => handldeClickBanner(items)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
        />
    ))}
</div>
</div>

  );
}

export default Slider;
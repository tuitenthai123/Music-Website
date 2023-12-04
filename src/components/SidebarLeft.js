import React from 'react'
import logo from '../assets/Thiết_kế_chưa_có_tên-removebg-preview.png'
import { SidebarMenu } from '../ultis/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../ultis/path'


const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center'
const activeStyle = 'py-2 px-[25px] font-bold text-[#0f7070] text-[13px] flex gap-[12px] items-center'

const SidebarLeft = () => {
  const navigate = useNavigate()
  return (
    
    <div className='flex h-full flex-col bg-main-200'>
        <div onClick={() => navigate(path.HOME)} className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer'>
            <img src={logo} alt='logo' className='w-[120px] h-15' />
        </div>
        <div className='flex flex-col'>
        {SidebarMenu.map(items => (
                <NavLink to={items.path} key={items.path} end={items.end} className={({isActive})=> isActive ? activeStyle:notActiveStyle}>
                    {items.icons}
                    <span>{items.text}</span>    
                </NavLink>         
            ))}
            
        </div>
    </div>
  )
}

export default SidebarLeft
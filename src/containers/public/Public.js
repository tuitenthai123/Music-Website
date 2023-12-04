import React,{useState}from "react";
import { Outlet } from "react-router-dom";
import {Player, SidebarLeft,SidebarRight,Header,LoadingPage} from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSelector } from "react-redux";

const Public = () =>{
    
    const[isShowRight,setisShowRight] = useState(true)
    const {isLoadPage} = useSelector(state => state.app);
    return(
        <div className="w-full relative h-screen flex flex-col bg-main-300">
            <div className="w-full h-full flex flex-auto ">
                <div className="w-[240px] h-full flex-none ">
                    <SidebarLeft />
                </div>
                <div className="flex-auto relative flex flex-col ">
                    {isLoadPage && <div className='absolute top-0 bottom-0 z-20 left-0 right-0 bg-main-200 flex items-center justify-center'>
                    <LoadingPage/>
                </div>}
                
                <div className="h-[70px] px-[59px] flex-none flex items-center mb-5">
                    <Header />
                </div>
                    <div className="flex-auto w-full">
                        <Scrollbars style={{width: '100%', height:'100%'}} autoHide>
                            <Outlet/>
                        </Scrollbars>
                    </div> 
                </div>
                        {isShowRight && 
                <div className="w-[329px] hidden 1600:flex flex-none h-screen animate-slide-left">
                <SidebarRight/>
                </div>}
            </div>
                <div className="fixed bottom-0 z-50 left-0 right-0 h-[90px] ">
                    <Player setisShowRight ={setisShowRight}/>
                </div>
        </div>
    )
}
export default Public
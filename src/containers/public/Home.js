import React,{useEffect} from "react";
import {Slider,Section,NewRelease,ChartSection} from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
const Home = () => {
    const{friday, newEveryday,top100,albumhot,weekChart} = useSelector(state =>state.app)
    return(
        <div className="overflow-y-auto w-full">
                <Slider />
                <Section data={friday}/>
                <Section data={newEveryday}/>
                <NewRelease />
                <Section data={top100}/>
                <Section data={albumhot}/>
                <ChartSection />
                <div className="flex items-center px-[43px] w-full mt-12">
                    {weekChart?.map(item => (
                        <Link to={item?.link?.split('.')[0]} key={item.link} className="flex-1 px-4" >
                                <img src={item.cover} alt="cover" className="w-full object-cover rounded-lg" />
                        </Link>
                    ))}
                </div>
                <div className="w-full h-[500px]"></div>
        </div>
    )
}
export default Home
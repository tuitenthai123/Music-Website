import React, { memo, useState, useEffect,useRef } from 'react';
import bg from '../assets/Amin.jpg';
import { Bubble, Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import {SongItem} from './'
import { isEqual } from 'lodash';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import path from '../ultis/path';
import icons from '../ultis/icon'
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const {FaPlay} = icons

const ChartSection = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector(state => state.app);
    const [tooltipState,setTooltipState] = useState({
        opacity:0,
        top:0,
        left:0,
    })
    const [selected, setselected] = useState(null)
    const chartRef = useRef()
    const options = {
        responsive: true,
        pointRadius: 0,
        aspectRatio: 4,
        maintainAspectRatio:false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { borderDash: [4, 4], color: 'rgba(255,255,255,0.1)',drawTicks:false},
                min: chart?.minScrore,
                max: chart?.maxScore,
                border:{dash:[3,4]}
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip:{
                enabled:false,
                external: ({tooltip}) => {
                    if(!chartRef || !chartRef.current) return
                    if(tooltip.opacity ===0)
                    {
                        if(tooltipState.opacity !==0) setTooltipState(prev => ({...prev,opacity:0}))
                        return
                    }

                    const counters = []
                    for(let i=0;i<3;i++){
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 ===0)?.map(item => item.counter),
                            encodeId:Object.keys(chart?.items)[i]
                        })
                    }
                    //lay noi dung counter bo dau , vi no tra ve kieu chuoi theo dang 11,121
                    const rs = counters.find(i => i.data.some(n => n === +tooltip.body[0]?.lines[0]?.replace(',','')))
                    setselected(rs.encodeId)

                    const newTooltipData = {
                        opacity: 1,
                        left:tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if(!_.isEqual(tooltipState,newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover:{
            mode:'dataset',
            intersect:false
        }
    };
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`);
        const datasets = [];
        if(chart?.items){
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.3,
                    borderWidth: 2,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'white',
                    pointHitRadius: 5,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    animation: false,
                    pointHoverBorderWidth: 5
                });
            }
            
            setData({ labels, datasets });
        }
    }, [chart]);

    return (
        <div className='px-[59px] mt-12 relative max-h-[430px] rounded-lg '>
            <img src={bg} alt='bg-chart' className='w-full object-cover rounded-2xl max-h-[430px]'/>
            <div className='absolute top-0 z-10 left-[59px] bg-[rgba(77,34,104,0.9)] right-[59px] bottom-0 rounded-2xl'></div>
            <div className='absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8'>
                <Link to={path.THAI_CHART} className='flex gap-2 items-center text-white hover:text-green-600'>
                <h3 className='text-2xl  font-bold '>#BẢNG XẾP HẠNG</h3>
                <span className='p-1 rounded-full bg-white'><FaPlay size={13} color='green'/></span>
                </Link>
                <div className='flex gap-4 h-full'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {rank?.filter((i,index) => index < 3)?.map((item,index) => (
                            <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            sid={item.encodeId}
                            order={index+1}
                            percent={Math.round(+item.score * 100 / +chart?.totalScore)}
                            style='text-white bg-[hsla(0,0%,100%,0.07)] hover:bg-[#945EA7]'
                            />
                        ))}
                        <Link to={path.THAI_CHART} className='text-white px-4 py-3 rounded-l-full rounded-r-full border border-white  m-auto'>Xem Thêm</Link>
                    </div>
                    <div className='flex-7 h-[90%] relative'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div className='tooltip' style={{top:tooltipState.top,left:tooltipState.left,opacity:tooltipState.opacity,position:'absolute',zIndex:'100'}}>
                        <SongItem
                            thumbnail={rank?.find(i=>i.encodeId === selected)?.thumbnail}
                            title={rank?.find(i=>i.encodeId === selected)?.title}
                            artists={rank?.find(i=>i.encodeId === selected)?.artistsNames}
                            sid={rank?.find(i=>i.encodeId === selected)?.encodeId}
                            style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);

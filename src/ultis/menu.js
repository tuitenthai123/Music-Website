import icons from "./icon"
const {MdOutlineLibraryMusic,FiPieChart,TbChartArcs,FaRegNewspaper} = icons
export const SidebarMenu = [ 
    {
        path: 'mymusic',
        text:'Cá Nhân',
        icons: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text:'Khám Phá',
        end:true,
        icons: <TbChartArcs size={24} />
    },
    {
        path: 'chart',
        text:'Bảng Xếp Hạng',
        icons: <FiPieChart size={24} />
    },
    {
        path: 'follows ',
        text:'Theo Dõi',
        icons: <FaRegNewspaper size={24} />
    }
]
import actionTypes from "../actions/actionTypes";

const initState ={
    banner: [],
    Friday: {},
    newEveryday: {},
    top100:{},
    albumhot:{},
    isLoadPage: false,
    newRelease:{},
    weekChart:[],
    chart:{},
    rank:[]
}

const appReducer = (state = initState, action) =>{
switch (action.type) {
    case actionTypes.GET_HOME:
        return {
            ...state,
            banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
            friday: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
            newEveryday: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || {},
            top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
            albumhot: {...action.homeData?.find(item => item.sectionId === 'hAlbum'),title: 'Nhạc Mới'} || {},
            newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
            weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
            chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || [],
            rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
        }
    case actionTypes.LOADPAGE:
        return{
            ...state,
            isLoadPage: action.flag
        }
    default:
        return state
}
}


export default appReducer
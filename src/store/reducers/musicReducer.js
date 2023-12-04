import actionTypes from "../actions/actionTypes";

const initState ={
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
    CurSongData: null,
    curAlbumId: null,
    searchData: {},
}

const musicReducer = (state = initState, action) =>{
switch (action.type) {
   case actionTypes.SET_CUR_SONG_ID:
    return{
        ...state,
        curSongId:action.sid || null
    } 
    case actionTypes.PLAY:
    return{
        ...state,
        isPlaying:action.flag
    } 
    case actionTypes.SET_ALBUM:
    return{
        ...state,
        atAlbum:action.flag
    }
    case actionTypes.PLAYLIST:
    return{
        ...state,
        songs:action.songs || null
    }  
    case actionTypes.SET_CUR_SONG_DATA:
    return{
        ...state,
        CurSongData:action.data || null
    }  
    case actionTypes.SET_CUR_ALBUM_ID:
    return{
        ...state,
        curAlbumId:action.pid || null
    }  
    case actionTypes.SEARCH:
    return{
        ...state,
        searchData:action.data || {}
    }  
    default:
        return state
}
}


export default musicReducer
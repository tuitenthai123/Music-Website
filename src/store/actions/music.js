import actionTypes from "./actionTypes";
import * as apis from '../../apis'
export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})
export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})
export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})

export const loadingpage = (flag) => ({
    type: actionTypes.LOADPAGE,
    flag
})

export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})
export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})

export const seach = (keyword) => async (dispatch) =>{
    try {
        const respone = await apis.apiSearch(keyword)
        if (respone.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: respone.data.data
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data:null
        })
    }
}

// export const fetchDetailSong = (pid) => async (dispatch) =>{
//     try {
//         const respone = await apis.apiGetPlaylist(pid)
//             if(respone?.data.err===0){
//                 dispatch({
//                     type: actionTypes.PLAYLIST,
//                     songs: respone.data?.data?.song?.items
//                 })
//             }
//     } catch (error) {
//         dispatch({
//             type:actionTypes.PLAYLIST,
//             songs: null
//         })
//     }
// }
import axios from '../ultis/axios'

export const apiGetSong = (sid) => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params:{id:sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getDetaiSong = (sid) => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params:{id:sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getLoginInfo = (sid) => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/login',
            method: 'get',
            params:{id:sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPlaylist = (pid) => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/detailplaylist',
            method: 'get',
            params:{id:pid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSearch = (keyword) => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/search',
            method: 'get',
            params:{keyword:keyword}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
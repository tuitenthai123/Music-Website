import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});
 //nhận gì trước khi gửi dữ liệu
axios.interceptors.request.use(function (config){
    return config;
},function (error){
    return Promise.reject(error);
})

//get token khi bị lỗi sẽ thay đổi api khác mục đích ko cho xảy ra lỗi khi api bị lỗi
axios.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
});

export default instance


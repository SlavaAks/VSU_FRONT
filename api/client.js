// import axios from "axios";
// export default axios.create({
//  baseURL: "http://127.0.0.1:8000",
// });


import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export const API_URL = `http://10.0.2.2:8000/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    // AsyncStorage.getItem('userToken').then((userToken) => {
       
      
            config.headers = {Authorization : `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFrczhzbGF2YUBtYWlsLnJ1IiwiZXhwIjoxNjUwNzYzMTMzLCJlbWFpbCI6ImFrczhzbGF2YUBtYWlsLnJ1In0.XW2JIIQJxKM8xNdz2Lf-J-VQ_EC9ZhgxeJoE1Dx__A0"}`}
            return config;

        
    // });

});


export default $api;
// import axios from "axios";
// export default axios.create({
//  baseURL: "http://127.0.0.1:8000",
// });


import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export const API_URL = `https://djangodockerher.herokuapp.com/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(async (config) => {
    //  AsyncStorage.getItem('userToken').then((userToken) => {
       
      
            config.headers = {Authorization : `Bearer ${await AsyncStorage.getItem('userToken')}`}
            return config;
        
    //  });

});


export default $api;
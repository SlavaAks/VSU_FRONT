import $api from "../api/client";

import axios from 'axios';

export default class AuthService {
    static async login(data){
        try{
       
        const JWT=await $api.post('login/',data).catch(err=>console.log(err))
        return JWT
        }
        catch(e){
            console.error(e)
        }
    }

    static async registration(data) {
        ///в api для регистрации не нужно указывать Bearer иначе Unautorazion
        const API_URL = `https://djangodockerher.herokuapp.com/`
        const $api = axios.create({
        withCredentials: true,
            baseURL: API_URL
            })
        return await $api.post('user/',data).catch(err=>console.log(err))
    }

    static async refresh(data){
        // console.log(data)
        data={token:data}
        let JWT=null;
        await $api.post('refresh/',data).then(resp=>{JWT=resp}).catch(err=>console.log(err))
        return JWT
    }


    // static async logout(): Promise<void> {
    //     return $api.post('/logout/')
    // }

}
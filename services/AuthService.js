import $api from "../api/client";


export default class AuthService {
    static async login(data){
        try{
       
        const JWT=await $api.post('login',data).catch(err=>console.log(err))
        return JWT
        }
        catch(e){
            console.error(e)
        }
    }

    // static async registration(login, password):  {
    //     const form=new FormData()
    //     form.append("username",login)
    //     form.append("password",password)
    //     return $api.post<AuthResponse>('/registration/',form)
    // }

    // static async logout(): Promise<void> {
    //     return $api.post('/logout/')
    // }

}
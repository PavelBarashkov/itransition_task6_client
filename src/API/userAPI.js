import { $authHost, $host} from "./index";
import jwt_decode  from "jwt-decode";


export const login = async(name) => {
    const {data} = await $host.post('api/user/login', { name });
    localStorage.setItem('token', data.token)
    return jwt_decode (data.token);
}


export const check = async () => {  
    const {data} = await $authHost.get('api/user/auth' );
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

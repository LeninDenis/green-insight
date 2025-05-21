import {authAxios, baseAxios} from "./axiosInstance";

export default class UserService{
    static async getUserById(id){
        const response = await baseAxios.get("/user/public/"+id);
        return response;
    }

    static async promote(id, scope){
        const params = new URLSearchParams();
        params.append('scope', scope);
        const response = await authAxios.post(`/user/protected/promote/${id}?${params.toString()}`);
        return response;
    }

    static async update(id, data){
        const response = await authAxios.patch(`/user/protected/${id}`, data, null);
        return response;
    }
}
import {baseAxios} from "./axiosInstance";

export default class UserService{
    static async getUserById(id){
        const response = await baseAxios.get("/user/public/"+id);
        return response;
    }
}
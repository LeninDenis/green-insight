import {baseAxios} from "./axiosInstance";

export default class CategoryService{
    static async getCategories(){
        const response = await baseAxios.get('/platform/public/category');
        return response;
    }
}
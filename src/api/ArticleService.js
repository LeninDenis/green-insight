import {authAxios, baseAxios} from "./axiosInstance";

export default class ArticleService{
    static async getAllArticles(){
        const response = await baseAxios.get('/platform/public/article');
        return response;
    }

    static async getArticlesByUId(id){
        const response = await baseAxios.get('/platform/public/article?creator='+id);
        return response;
    }

    static async getArticlesByUIdProtected(id){
        const response = await authAxios.get('/platform/protected/article?creator='+id);
        return response;
    }

    static async create(data){
        const response = await authAxios.post('/platform/protected/article', data, null);
        return response;
    }
}
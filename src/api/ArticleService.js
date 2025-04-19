import {authAxios, baseAxios} from "./axiosInstance";

export default class ArticleService{
    static async getAllArticles(){
        const response = await baseAxios.get('/platform/public/article');
        return response;
    }

    static async getArticleById(id){
        const response = await baseAxios.get('/platform/public/article/'+id);
        return response;
    }

    static async getArticleByIdProtected(id){
        const response = await authAxios.get('/platform/protected/article/'+id);
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

    static async getInteraction(userId, articleId){
        const params = new URLSearchParams();
        params.append('user', userId);
        params.append('article', articleId);
        const response = await authAxios.get(`/platform/protected/interact?${params.toString()}`);
        return response;
    }

    static async interact(id, like, view, rating) {
        const params = new URLSearchParams();
        if (like !== null) params.append('like', like);
        if (view !== null) params.append('view', view);
        if (rating !== null) params.append('rating', rating);

        const response = await authAxios.post(`/platform/protected/interact/${id}?${params.toString()}`);
        return response;
    }
}
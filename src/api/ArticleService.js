import {authAxios, baseAxios} from "./axiosInstance";

export default class ArticleService{
    static async getAllArticles(auth, sort, status, paid, creator, category, page, size){
        const params = new URLSearchParams();
        sort && params.append("sort", sort);
        status && params.append("status", status);
        paid && params.append("paid", paid);
        creator && params.append("creator", creator);
        category && params.append("category", category);
        page && params.append("page", page);
        size && params.append("size", size);
        let response = auth
            ? await authAxios.get(`/platform/protected/article?${params.toString()}`)
            : await baseAxios.get(`/platform/public/article?${params.toString()}`);
        return response;
    }

    static async search(auth, query){
        const params = new URLSearchParams();
        params.append("query", query);
        let response = auth
            ? await authAxios.get(`/platform/protected/article/search?${params.toString()}`)
            : await authAxios.get(`/platform/public/article/search?${params.toString()}`);
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

    static async getArticlesProtected(id, status){
        const params = new URLSearchParams();
        id && params.append('creator', id);
        status && params.append('status', status);
        const response = await authAxios.get(`/platform/protected/article?${params.toString()}`);
        return response;
    }

    static async getRecommendations(){
        const response = await authAxios.get('/platform/protected/article/recommend');
        return response;
    }

    static async create(data){
        const response = await authAxios.post('/platform/protected/article', data, null);
        return response;
    }

    static async moderate(id, status){
        const params = new URLSearchParams();
        params.append('status', status);
        const response = await authAxios.patch(`/platform/protected/article/moderate/${id}?${params.toString()}`);
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
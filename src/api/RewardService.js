import {authAxios} from "./axiosInstance";

export default class RewardService{
    static async getRewards(id){
        const res = await authAxios.get(`/platform/protected/reward/${id}`);
        return res;
    }
}
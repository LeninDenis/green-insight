import {authAxios} from "./axiosInstance";

export default class PaymentService{
  static async create(planId){
      const response = await authAxios.post(`/payment/protected/subscription/create/${planId}`);
      return response;
  }

  static async cancel(){
      const response = await authAxios.post(`/payment/protected/subscription/cancel`);
      return response;
  }

    static async resume(){
        const response = await authAxios.post(`/payment/protected/subscription/resume`);
        return response;
    }

    static async refund(){
        const response = await authAxios.post(`/payment/protected/subscription/refund`);
        return response;
    }

  static async getActive(){
      const response = await authAxios.get(`/payment/protected/subscription`);
      return response;
  }

    static async listAll(id) {
        const path = id ? `/payment/protected/subscription/list/${id}` : `/payment/protected/subscription/list`;
        const response = await authAxios.get(path);
        return response;
    }
}
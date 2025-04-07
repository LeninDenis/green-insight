import axios from "axios";
import { Buffer } from 'buffer';

export default class AuthService{
    static async login(userData){
        const authString = Buffer
            .from(`${userData.email}:${userData.password}`)
            .toString('base64');
        const headers = {
            Authorization: `Basic ${authString}`
        };
        const response = await axios
            .post('http://localhost:8080/auth/login',null, {headers});
        return response;
    }

    // {"fname": "", "lname": "", "email": "", "password": ""}
    static async register(newUserForm){
        const response = await axios
            .post('http://localhost:8080/auth/register', newUserForm);
        return response;
    }

    static async refresh(refreshToken){
        const body = {
            token: refreshToken,
            tokenType: "REFRESH"
        };
        const response = await axios
            .post('http://localhost:8080/auth/refresh', body);
        return response;
    }
}
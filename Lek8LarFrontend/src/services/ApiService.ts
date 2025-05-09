import axios, { AxiosRequestConfig } from "axios";

class ApiService {
    readonly BASE_URL = process.env.REACT_APP_API_URL;
    readonly BASE_URL_LOCAL = process.env.REACT_APP_API_URL_LOCAL;



    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        console.log("API URL:", process.env.REACT_APP_API_URL);
        const response = await axios.post(`${this.BASE_URL}/api/${endpoint}`, data, config);
        return response.data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        console.log("API URL from get:", process.env.REACT_APP_API_URL);

        const response = await axios.get(`${this.BASE_URL}/api/${endpoint}`, { params });
        return response.data;
    }
}

export const apiService = new ApiService();

import axios, { AxiosRequestConfig } from "axios";

class ApiService {
    readonly BASE_URL = process.env.REACT_APP_API_URL;

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        const response = await axios.post(`${this.BASE_URL}/${endpoint}`, data, config);
        return response.data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        const response = await axios.get(`${this.BASE_URL}/${endpoint}`, { params });
        return response.data;
    }
}

export const apiService = new ApiService();

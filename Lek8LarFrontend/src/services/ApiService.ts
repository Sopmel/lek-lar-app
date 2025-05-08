import axios, { AxiosRequestConfig } from "axios";

class ApiService {
    private baseUrl = "http://localhost:5000/api";

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, config);
        return response.data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, { params });
        return response.data;
    }
}

export const apiService = new ApiService();

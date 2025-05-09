import axios, { AxiosRequestConfig } from "axios";

class ApiService {
    readonly BASE_URL =
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_URL_LOCAL
            : process.env.REACT_APP_API_URL;

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        console.log("POST to:", `${this.BASE_URL}/${endpoint}`);
        const response = await axios.post(`${this.BASE_URL}/${endpoint}`, data, config);
        return response.data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        console.log("GET from:", `${this.BASE_URL}/${endpoint}`);
        const response = await axios.get(`${this.BASE_URL}/${endpoint}`, { params });
        return response.data;
    }
}

export const apiService = new ApiService();

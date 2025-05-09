import axios, { AxiosRequestConfig } from "axios";

class ApiService {
    readonly BASE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_API_URL_LOCAL
            : import.meta.env.VITE_API_URL;

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        console.log("POST to:", `${this.BASE_URL}/${endpoint}`);
        return (await axios.post(`${this.BASE_URL}/${endpoint}`, data, config)).data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        console.log("GET from:", `${this.BASE_URL}/${endpoint}`);
        return (await axios.get(`${this.BASE_URL}/${endpoint}`, { params })).data;
    }
}

export const apiService = new ApiService();

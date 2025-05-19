import axios, { AxiosRequestConfig } from "axios";
import { authService } from "./AuthService";

class ApiService {
    readonly BASE_URL =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_API_URL_LOCAL
            : import.meta.env.VITE_API_URL;

    private getAuthHeaders(): Record<string, string> {
        const token = authService.getToken?.();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
        console.log("POST to:", `${this.BASE_URL}/${endpoint}`);
        return (
            await axios.post(
                `${this.BASE_URL}/${endpoint}`,
                data,
                {
                    ...config,
                    headers: {
                        ...this.getAuthHeaders(),
                        ...(config?.headers || {}),
                    },
                }
            )
        ).data;
    }

    async get(endpoint: string, params?: Record<string, string>) {
        console.log("GET from:", `${this.BASE_URL}/${endpoint}`);
        return (
            await axios.get(`${this.BASE_URL}/${endpoint}`, {
                params,
                headers: this.getAuthHeaders(),
            })
        ).data;
    }
}

export const apiService = new ApiService();

import { makeAutoObservable } from "mobx";
import { apiService } from "./ApiService";

class AuthService {
    user: string | null = null;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadSession();
    }

    async login(username: string, password: string) {
        try {
            const response = await apiService.post("auth/login", { username, password });
            this.user = response.username;
            this.token = response.token;
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", response.username);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async register(username: string, password: string) {
        try {
            await apiService.post("auth/register", { username, password });
            await this.login(username, password);

        } catch (error) {
            console.error("Register failed:", error);
            throw error;
        }
    }

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    private loadSession() {
        this.user = localStorage.getItem("user");
        this.token = localStorage.getItem("token");
    }
}

export const authService = new AuthService();

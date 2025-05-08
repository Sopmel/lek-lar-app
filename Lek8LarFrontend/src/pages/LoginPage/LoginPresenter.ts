import { authService } from "../../services/AuthService";


class LoginPresenter {
    async login(username: string, password: string) {
        await authService.login(username, password);
    }
}

export const loginPresenter = new LoginPresenter();

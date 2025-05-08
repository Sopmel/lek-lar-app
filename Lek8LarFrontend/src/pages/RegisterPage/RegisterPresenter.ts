import { authService } from "../../services/AuthService";

class RegisterPresenter {
    async register(username: string, password: string) {
        if (!username || !password) {
            return { success: false, message: "Användarnamn och lösenord krävs." };
        }

        try {
            await authService.register(username, password);
            return { success: true, message: "Registrering lyckades!" };
        } catch (error) {
            console.error("RegisterPresenter: Fel vid registrering", error);
            return { success: false, message: "Registrering misslyckades. Försök igen." };
        }
    }
}

export const registerPresenter = new RegisterPresenter();

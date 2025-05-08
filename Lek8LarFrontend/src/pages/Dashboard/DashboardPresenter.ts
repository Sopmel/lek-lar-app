import { authService } from "../../services/AuthService";


class DashboardPresenter {
    logout() {
        authService.logout();
    }
}

export default DashboardPresenter;

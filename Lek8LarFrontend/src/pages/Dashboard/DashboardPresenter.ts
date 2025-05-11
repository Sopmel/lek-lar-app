import { authService } from "../../services/AuthService";

interface DashboardVm {
    cardTitle: string;
    logoutText: string;
    mathGameRowTitle: string;
    ABCGameRowTitle: string;
    memoryGameRowTitle: string;
}

export class DashboardPresenter {

    get viewModel(): DashboardVm {
        return {
            cardTitle: "🎮 Välj ett spel",
            logoutText: "Logout",
            mathGameRowTitle: "➕ Matte – Nivå 1",
            ABCGameRowTitle: "🔤 ABC – Nivå 1",
            memoryGameRowTitle: "🧠 Memory – Nivå 1",

        };
    }

    public logout() {
        authService.logout();
    }
}

export default DashboardPresenter;

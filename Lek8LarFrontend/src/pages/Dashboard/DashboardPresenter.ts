import { makeObservable, observable, computed, action } from "mobx";
import { authService } from "../../services/AuthService";
import { inject } from "inversify";
import { DashboardApiService } from "../../services/DashboardApiService";

interface DashboardVm {
    cardTitle: string;
    logoutText: string;
    mathGameRowTitle: string;
    ABCGameRowTitle: string;
    memoryGameRowTitle: string;
    playerName: string;
    starsPerGame: StarsPerGameVm;
    currentLevel: number;
    levelStars: number;
    starsToNextLevel: number;
    totalStars: number;
}

interface StarsPerGameVm {
    CountGame: number;
    ShapesGame: number;
    PlusGame: number;
    LetterHunt: number;
    WordMatch: number;
    LetterBubbleGame: number;
    MemoryGame: number;
    ColorMixGame: number;
    WhatsMissing: number;
}

export class DashboardPresenter {
    playerName: string = "Gäst";
    progress: Map<string, number> = new Map();

    constructor(
        @inject(DashboardApiService)
        private dashboardApiService: DashboardApiService,
    ) {
        makeObservable(this, {
            playerName: observable,
            progress: observable,
            viewModel: computed,
            loadUserInfo: action,
            loadProgress: action,
            totalStars: computed,
        });

        this.loadUserInfo();
        this.loadProgress();
    }

    get viewModel(): DashboardVm {
        const progress = Object.fromEntries(this.progress);

        const starsPerGame: StarsPerGameVm = {
            CountGame: progress.CountGame ?? 0,
            ShapesGame: progress.ShapesGame ?? 0,
            PlusGame: progress.PlusGame ?? 0,
            LetterHunt: progress.LetterHunt ?? 0,
            WordMatch: progress.WordMatch ?? 0,
            LetterBubbleGame: progress.LetterBubbleGame ?? 0,
            MemoryGame: progress.MemoryGame ?? 0,
            ColorMixGame: progress.ColorMixGame ?? 0,
            WhatsMissing: progress.WhatsMissing ?? 0,
        };

        const totalStars = Object.values(starsPerGame).reduce((sum, stars) => sum + stars, 0);
        const currentLevel = Math.floor(totalStars / 35) + 1;
        const levelStars = totalStars % 35;
        const starsToNextLevel = 35 - levelStars;

        return {
            cardTitle: "🎮 Välj ett spel",
            logoutText: "Logout",
            mathGameRowTitle: "➕ Matte – Nivå 1",
            ABCGameRowTitle: "🔤 ABC – Nivå 1",
            memoryGameRowTitle: "🧠 Memory – Nivå 1",
            playerName: this.playerName,
            starsPerGame,
            currentLevel,
            levelStars,
            starsToNextLevel,
            totalStars: this.totalStars

        };
    }

    get totalStars(): number {
        return Array.from(this.progress.values()).reduce((sum, stars) => sum + stars, 0);
    }


    public loadUserInfo() {
        const user = authService.getUser();
        this.playerName = user?.name ?? "Gäst";
    }

    public logout() {
        authService.logout();
    }

    public async loadProgress() {
        const res = await this.dashboardApiService.getProgress();
        this.playerName = res.playerId;

        const perGameStars: Record<string, number> = {};

        res.progress.forEach(entry => {
            const game = entry.gameKey;
            if (!perGameStars[game] || entry.stars > perGameStars[game]) {
                perGameStars[game] = entry.stars;
            }
        });

        this.progress = new Map(Object.entries(perGameStars));
    }
}

export default DashboardPresenter;

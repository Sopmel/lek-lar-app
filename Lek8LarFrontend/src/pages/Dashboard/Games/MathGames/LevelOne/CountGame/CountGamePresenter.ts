import { makeObservable, observable, computed, action } from "mobx";
import { injectable, inject } from "inversify";
import { CountGameApiService } from "../../../../../../services/CountGameApiService";
import {
    Question,
    GameResult,
} from "./CountGameTypes";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";

export interface CountGameViewModel {
    imageElements: { key: number; src: string; alt: string }[];
    options: number[];
    cardTitle: string
    game: {
        gameTitle: string;
        correctText: string;
        incorrectText: string;
        finnishedLevelText: string;
        feedback: string;
    }
    stars: {
        starText: string;
        fiveStarText: string;
        starCount: number;
    };
    backToDashboardSymbol: string;
    playAgainSymbol: string;
    nextGameSymbol: string;
    isPerfect: boolean;
    isLoading: boolean;
    isLoadingMessage: string;

}

@injectable()
export class CountGamePresenter {
    level: number = 1;
    sessionId: string | null = null;
    question: Question | null = null;
    feedback: string = "";
    stars: number = 0;
    gameOver: boolean = false;
    isLoading: boolean = true;

    constructor(
        @inject(CountGameApiService)
        private countGameApiService: CountGameApiService,

        @inject(GameProgressManager)
        private gameProgressManager: GameProgressManager
    ) {
        makeObservable(this, {
            level: observable,
            sessionId: observable,
            question: observable,
            feedback: observable,
            stars: observable,
            gameOver: observable,
            isLoading: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): CountGameViewModel {
        const { objectImageUrl, objectCount, options } = this.question ?? {};

        const safeImageUrl = objectImageUrl ?? "";
        const safeObjectCount = objectCount ?? 0;

        return {
            imageElements: Array.from({ length: safeObjectCount }).map((_, i) => ({
                key: i,
                src: `images/gameImages/${safeImageUrl}`,
                alt: `objekt: ${safeImageUrl.split(".")[0]}`,
            })),
            options: options ?? [],
            cardTitle: "🎉 Spelet är klart!",
            game: {
                gameTitle: "🧮 Hur många ser du?",
                correctText: "🎉 Rätt!",
                incorrectText: "❌ Fel, försök igen!",
                finnishedLevelText: "🥳 Superbra jobbat! Du klarade nivå 1!",
                feedback: this.feedback,
            },
            stars: {
                starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
                fiveStarText: "Du fick 5 stjärnor:",
                starCount: this.stars,
            },
            backToDashboardSymbol: "↩️",
            playAgainSymbol: "🔄",
            nextGameSymbol: "➡️",
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar...",
        };
    }

    public async startGame(): Promise<void> {
        this.gameOver = false;
        this.stars = 0;
        this.feedback = "";
        this.question = null;
        this.isLoading = true;

        try {
            const res = await this.countGameApiService.startGame(this.level);
            this.sessionId = res.sessionId;
            await this.fetchQuestion();
        } catch (error) {
            console.error("Kunde inte starta spelet:", error);
            this.isLoading = false;
        }
    }


    public async submitAnswer(answer: number): Promise<void> {
        if (!this.sessionId) return;

        try {
            const res = await this.countGameApiService.submitAnswer(this.sessionId, answer);

            if (res.gameOver) {
                this.gameOver = true;
                this.stars = res.stars;

                if ('level' in res && typeof res.level === "number") {
                    this.level = res.level;
                }
                this.gameProgressManager.setStars("CountGame", this.level, res.stars);
            } else {
                this.feedback = res.correct
                    ? this.viewModel.game.correctText
                    : this.viewModel.game.incorrectText;

                setTimeout(() => {
                    this.feedback = "";
                    this.fetchQuestion();
                }, 1000);
            }
        } catch (error) {
            console.error("Fel vid svar:", error);
        }
    }

    public async fetchQuestion(): Promise<void> {
        if (!this.sessionId) return;

        try {
            this.isLoading = true;
            const res = await this.countGameApiService.fetchQuestion(this.sessionId);
            this.isLoading = false;

            if (this.isGameResult(res)) {
                this.gameOver = true;
                this.stars = res.stars;
                this.question = null;

                if ('level' in res && typeof res.level === "number") {
                    this.level = res.level;
                }
            } else {
                this.question = res;
            }
        } catch (error) {
            console.error("Kunde inte hämta fråga:", error);
            this.isLoading = false;
        }
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}

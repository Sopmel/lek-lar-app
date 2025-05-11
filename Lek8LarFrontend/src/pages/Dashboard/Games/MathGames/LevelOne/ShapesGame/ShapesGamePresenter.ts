import { makeObservable, observable, action, computed } from "mobx";
import { injectable, inject } from "inversify";
import { ShapeGameApiService } from "../../../../../../services/ShapeGameApiService";
import { ShapeQuestion, GameResult } from "./ShapesGameTypes";

export interface ShapeGameViewModel {
    imageUrl: string;
    options: string[];
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
    }
    isPerfect: boolean;
    isLoading: boolean;
    isLoadingMessage: string;


}

@injectable()
export class ShapesGamePresenter {
    question: ShapeQuestion | null = null;
    feedback: string = "";
    gameOver: boolean = false;
    sessionId: string = "";
    stars: number = 0;
    isLoading: boolean = true;
    isPerfect: boolean = false;

    constructor(
        @inject(ShapeGameApiService) private shapeGameApiService: ShapeGameApiService
    ) {
        makeObservable(this, {
            question: observable,
            feedback: observable,
            gameOver: observable,
            sessionId: observable,
            stars: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): ShapeGameViewModel {

        return {
            imageUrl: `images/gameImages/${this.question?.shapeImageUrl}`,
            options: this.question?.options ?? [],
            cardTitle: "🎉 Spelet är klart!",
            game: {
                gameTitle: "🔷 Vilken form är detta?",
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
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar fråga...",
        };
    }

    async startGame(): Promise<void> {
        try {
            const res = await this.shapeGameApiService.startGame();
            this.sessionId = res.sessionId;
            await this.fetchQuestion();
        } catch (error) {
            console.error("Kunde inte starta spelet:", error);
        }
    }

    async fetchQuestion(): Promise<void> {
        try {
            const res = await this.shapeGameApiService.fetchQuestion(this.sessionId);

            if (this.isGameResult(res)) {
                this.gameOver = true;
                this.stars = res.stars;
                this.question = null;
            } else {
                this.question = res;
            }
        } catch (error) {
            console.error("Kunde inte hämta fråga:", error);
        }
    }


    async submitAnswer(answer: string): Promise<void> {
        if (!this.question) return;

        try {
            const res = await this.shapeGameApiService.submitAnswer(
                this.question.id,
                answer,
                this.sessionId
            );

            this.feedback = res.correct
                ? this.viewModel?.game.correctText ?? ""
                : this.viewModel?.game.incorrectText ?? "";

            this.stars = res.stars;
            if (res.gameOver) {
                this.gameOver = true;
            } else {
                setTimeout(() => {
                    this.feedback = "";
                    this.fetchQuestion();
                }, 1000);
            }
        } catch (error) {
            console.error("Kunde inte skicka svar:", error);
        }
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }

}

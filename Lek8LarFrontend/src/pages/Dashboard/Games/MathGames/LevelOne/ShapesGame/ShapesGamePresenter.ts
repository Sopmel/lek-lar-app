import { makeObservable, observable, action, computed } from "mobx";
import { injectable, inject } from "inversify";
import { ShapeGameApiService } from "../../../../../../services/ShapeGameApiService";
import { ShapeQuestion, GameResult } from "./ShapesGameTypes";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface ShapeGameViewModel {
    imageUrl: string;
    options: string[];
    cardTitle: string;
    game: {
        gameTitle: string;
        correctText: string;
        incorrectText: string;
        finnishedLevelText: string;
        feedback: string;
    };
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
    answerFeedback?: {
        selected: string;
        correct: boolean;
    } | null;
}

@injectable()
export class ShapesGamePresenter {
    level: number = 1;
    question: ShapeQuestion | null = null;
    feedback: string = "";
    gameOver: boolean = false;
    sessionId: string = "";
    stars: number = 0;
    isLoading: boolean = true;
    lastAnswer: string | null = null;
    wasCorrect: boolean | null = null;

    constructor(
        @inject(ShapeGameApiService) private shapeGameApiService: ShapeGameApiService,
        @inject(GameProgressManager) private gameProgressManager: GameProgressManager
    ) {
        makeObservable(this, {
            level: observable,
            question: observable,
            feedback: observable,
            gameOver: observable,
            sessionId: observable,
            stars: observable,
            isLoading: observable,
            lastAnswer: observable,
            wasCorrect: observable,
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
            backToDashboardSymbol: "↩️",
            playAgainSymbol: "🔄",
            nextGameSymbol: "➡️",
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar fråga...",
            answerFeedback: this.lastAnswer
                ? {
                    selected: this.lastAnswer,
                    correct: this.wasCorrect ?? false,
                }
                : null,
        };
    }

    public async startGame(): Promise<void> {
        this.gameOver = false;
        this.stars = 0;
        this.feedback = "";
        this.question = null;
        this.isLoading = true;

        try {
            const res = await this.shapeGameApiService.startGame(this.level);
            this.sessionId = res.sessionId;
            await this.fetchQuestion();
        } catch (error) {
            console.error("Kunde inte starta spelet:", error);
            this.isLoading = false;
        }
    }

    async fetchQuestion(): Promise<void> {
        try {
            const res = await this.shapeGameApiService.fetchQuestion(this.sessionId, this.level);

            if (this.isGameResult(res)) {
                this.gameOver = true;
                this.stars = res.stars;
                this.question = null;

                this.gameProgressManager.setStars("ShapesGame", this.level, res.stars);
            } else {
                this.question = res;

                SpeechHelper.speak(`Vilken form är detta?`);
            }
        } catch (error) {
            console.error("Kunde inte hämta fråga:", error);
        }
    }

    async submitAnswer(answer: string): Promise<void> {
        if (!this.question) return;

        try {
            const res = await this.shapeGameApiService.submitAnswer(this.question.id, answer, this.sessionId);

            this.lastAnswer = answer;
            this.wasCorrect = res.correct;

            this.feedback = res.correct
                ? this.viewModel.game.correctText
                : this.viewModel.game.incorrectText;

            this.stars = res.stars;

            if (res.gameOver) {
                this.gameOver = true;
                this.gameProgressManager.setStars("ShapesGame", this.level, res.stars);
            } else {
                setTimeout(() => {
                    this.feedback = "";
                    this.lastAnswer = null;
                    this.wasCorrect = null;
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

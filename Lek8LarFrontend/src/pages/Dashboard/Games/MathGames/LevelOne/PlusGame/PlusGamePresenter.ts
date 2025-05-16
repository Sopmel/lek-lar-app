import { makeObservable, observable, computed, action } from "mobx";
import { injectable, inject } from "inversify";
import { PlusGameApiService } from "../../../../../../services/PlusGameApiService";
import { Question, GameResult } from "./PlusGameTypes";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface PlusGameViewModel {
    groupAImages: { key: string; src: string; alt: string }[];
    groupBImages: { key: string; src: string; alt: string }[];
    options: number[];
    cardTitle: string;
    game: {
        gameTitle: string;
        correctText: string;
        incorrectText: string;
        finnishedLevelText: string;
        feedback: string;
        rightAnswer: number;
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
    showAnswerFeedback: boolean;
    isCorrectAnswer: boolean | null;
}

@injectable()
export class PlusGamePresenter {
    level = 1;
    sessionId: string | null = null;
    question: Question | null = null;
    feedback = "";
    stars = 0;
    gameOver = false;
    isLoading = true;
    showAnswerFeedback = false;
    isCorrectAnswer: boolean | null = null;

    constructor(
        @inject(PlusGameApiService) private api: PlusGameApiService,
        @inject(GameProgressManager) private progress: GameProgressManager
    ) {
        makeObservable(this, {
            level: observable,
            sessionId: observable,
            question: observable,
            feedback: observable,
            stars: observable,
            gameOver: observable,
            isLoading: observable,
            showAnswerFeedback: observable,
            isCorrectAnswer: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): PlusGameViewModel {
        const image = this.question?.objectImageUrl ?? "";
        const groupA = this.question?.groupA ?? 0;
        const groupB = this.question?.groupB ?? 0;
        const total = groupA + groupB;

        const images = (count: number, prefix: string) =>
            Array.from({ length: count }).map((_, i) => ({
                key: `${prefix}-${i}`,
                src: image,
                alt: `objekt: ${image.split(".")[0]}`,
            }));

        return {
            groupAImages: images(groupA, "A"),
            groupBImages: images(groupB, "B"),
            options: this.question?.options ?? [],
            cardTitle: "🎉 Spelet är klart!",
            game: {
                gameTitle: "➕ Hur många saker ser du totalt?",
                correctText: "🎉 Rätt!",
                incorrectText: "❌ Fel, försök igen!",
                finnishedLevelText: "🥳 Du klarade plusspelet!",
                feedback: this.feedback,
                rightAnswer: total,
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
            showAnswerFeedback: this.showAnswerFeedback,
            isCorrectAnswer: this.isCorrectAnswer,
        };
    }

    async startGame() {
        this.resetState();

        try {
            const res = await this.api.startGame(this.level);
            this.sessionId = res.sessionId;
            await this.fetchQuestion();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    public async submitAnswer(answer: number): Promise<void> {
        if (!this.sessionId) return;

        try {
            const res = await this.api.submitAnswer(this.sessionId, answer);

            const isCorrect = answer === res.correctAnswer;
            this.isCorrectAnswer = isCorrect;
            this.showAnswerFeedback = true;
            this.feedback = isCorrect
                ? this.viewModel.game.correctText
                : this.viewModel.game.incorrectText;

            this.question = res;

            if (res.gameResult?.gameOver) {
                setTimeout(() => {
                    this.gameOver = true;
                    this.stars = res.gameResult!.stars;
                    this.progress.setStars("PlusGame", this.level, res.gameResult!.stars);
                }, 1200);
            } else {
                setTimeout(() => {
                    this.feedback = "";
                    this.fetchQuestion();
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    }


    async fetchQuestion() {
        if (!this.sessionId) return;

        this.isLoading = true;

        try {
            const res = await this.api.fetchQuestion(this.sessionId);
            this.isLoading = false;
            this.showAnswerFeedback = false;
            this.isCorrectAnswer = null;

            if (this.isGameResult(res)) {
                this.gameOver = true;
                this.stars = res.stars;

            } else {
                this.question = res;
                SpeechHelper.speak(`Hur många ser du totalt?`);
            }
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    private resetState() {
        this.gameOver = false;
        this.stars = 0;
        this.feedback = "";
        this.question = null;
        this.isLoading = true;
        this.showAnswerFeedback = false;
        this.isCorrectAnswer = null;
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}

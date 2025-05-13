import { makeObservable, observable, computed, action } from "mobx";
import { injectable, inject } from "inversify";
import { LetterHuntApiService } from "../../../../../../services/LetterHuntApiService";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { LetterQuestion, GameResult } from "./LetterHuntTypes";

export interface LetterHuntViewModel {
    imageUrl: string;
    options: string[];
    stars: {
        starText: string;
        fiveStarText: string;
        starCount: number;
    };
    game: {
        gameTitle: string;
        correctText: string;
        incorrectText: string;
        finishedText: string;
        feedback: string;
        correctLetter: string;
        partialWord: string;
    };
    backToDashboardSymbol: string;
    playAgainSymbol: string;
    nextGameSymbol: string;
    showAnswerFeedback: boolean;
    isCorrectAnswer: boolean | null;
    isPerfect: boolean;
    isLoading: boolean;
    isLoadingMessage: string;
}

@injectable()
export class LetterHuntPresenter {
    level = 1;
    sessionId = "";
    question: LetterQuestion | null = null;
    feedback = "";
    stars = 0;
    gameOver = false;
    isLoading = true;
    showAnswerFeedback = false;
    isCorrectAnswer: boolean | null = null;

    constructor(
        @inject(LetterHuntApiService) private letterHuntApiService: LetterHuntApiService,
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

    get viewModel(): LetterHuntViewModel {
        return {
            imageUrl: `images/gameImages/${this.question?.imageUrl}`,
            options: this.question?.options ?? [],
            stars: {
                starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
                fiveStarText: "Du fick 5 stjärnor:",
                starCount: this.stars,
            },
            game: {
                gameTitle: "🔤 Vad börjar detta ord på?",
                correctText: "🎉 Rätt!",
                incorrectText: "❌ Fel, försök igen!",
                finishedText: "🎊 Du klarade bokstavspelet!",
                feedback: this.feedback,
                correctLetter: this.question?.correctLetter ?? "",
                partialWord: this.question?.partialWord ?? "",
            },
            backToDashboardSymbol: "↩️",
            playAgainSymbol: "🔄",
            nextGameSymbol: "➡️",
            showAnswerFeedback: this.showAnswerFeedback,
            isCorrectAnswer: this.isCorrectAnswer,
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar...",
        };
    }

    async startGame() {
        this.gameOver = false;
        this.stars = 0;
        this.feedback = "";
        this.showAnswerFeedback = false;
        this.isCorrectAnswer = null;
        this.isLoading = true;

        const res = await this.letterHuntApiService.startGame(this.level);
        this.sessionId = res.sessionId;
        await this.fetchQuestion();
    }

    async fetchQuestion() {
        this.isLoading = true;
        const res = await this.letterHuntApiService.fetchQuestion(this.sessionId);
        this.isLoading = false;

        this.showAnswerFeedback = false;
        this.isCorrectAnswer = null;

        if (this.isGameResult(res)) {
            this.stars = res.stars;
            this.gameOver = true;
            this.progress.setStars("LetterHunt", this.level, res.stars);
        } else {
            this.question = res;
        }
    }

    async submitAnswer(answer: string) {
        const res = await this.letterHuntApiService.submitAnswer(this.sessionId, answer);
        this.stars = res.stars;
        this.isCorrectAnswer = res.correct;
        this.showAnswerFeedback = true;

        this.feedback = res.correct
            ? this.viewModel.game.correctText
            : this.viewModel.game.incorrectText;

        if (res.gameOver) {
            setTimeout(() => {
                this.gameOver = true;
                this.progress.setStars("LetterHunt", this.level, res.stars);
            }, 1200);
        } else {
            setTimeout(() => {
                this.feedback = "";
                this.fetchQuestion();
            }, 1000);
        }
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}

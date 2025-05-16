import { makeObservable, observable, computed, action } from "mobx";
import { injectable, inject } from "inversify";
import { WordMatchApiService } from "../../../../../../services/WordMatchApiService";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { MatchQuestion, GameResult } from "./WordMatchTypes";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface WordMatchViewModel {
    mainImage: string;
    optionImages: { key: string; src: string }[];
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
    };
    backToDashboardSymbol: string;
    playAgainSymbol: string;
    nextGameSymbol: string;
    isPerfect: boolean;
    isLoading: boolean;
    isLoadingMessage: string;
    showAnswerFeedback: boolean;
    isCorrectAnswer: boolean | null;
    selectedImage: string | null;
}

@injectable()
export class WordMatchPresenter {
    level = 1;
    sessionId = "";
    question: MatchQuestion | null = null;
    feedback = "";
    stars = 0;
    gameOver = false;
    isLoading = true;
    showAnswerFeedback = false;
    isCorrectAnswer: boolean | null = null;
    selectedImage: string | null = null;

    constructor(
        @inject(WordMatchApiService) private wordMatchApiService: WordMatchApiService,
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
            selectedImage: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): WordMatchViewModel {
        return {
            mainImage: `images/gameImages/${this.question?.imageUrl}`,
            optionImages:
                this.question?.options.map((opt, i) => ({
                    key: `opt-${i}`,
                    src: `images/gameImages/${opt}`,
                })) ?? [],
            stars: {
                starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
                fiveStarText: "Du fick 5 stjärnor:",
                starCount: this.stars,
            },
            game: {
                gameTitle: "🧩 Vad hör ihop?",
                correctText: "🎉 Rätt!",
                incorrectText: "❌ Fel, försök igen!",
                finishedText: "🥳 Du klarade nivå 1!",
                feedback: this.feedback,
            },
            backToDashboardSymbol: "↩️",
            playAgainSymbol: "🔄",
            nextGameSymbol: "➡️",
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar...",
            showAnswerFeedback: this.showAnswerFeedback,
            isCorrectAnswer: this.isCorrectAnswer,
            selectedImage: this.selectedImage,
        };
    }

    async startGame() {
        this.resetState();
        const res = await this.wordMatchApiService.startGame(this.level);
        this.sessionId = res.sessionId;
        await this.fetchQuestion();
    }

    async fetchQuestion() {
        this.isLoading = true;
        const res = await this.wordMatchApiService.fetchQuestion(this.sessionId);
        this.isLoading = false;
        this.showAnswerFeedback = false;
        this.isCorrectAnswer = null;
        this.selectedImage = null;

        if (this.isGameResult(res)) {
            this.stars = res.stars;
            this.gameOver = true;
            this.progress.setStars("WordMatch", this.level, res.stars);
        } else {
            this.question = res;
            SpeechHelper.speak("Vad hör ihop med bilden?");
        }
    }

    async submitAnswer(imageName: string) {
        const res = await this.wordMatchApiService.submitAnswer(this.sessionId, imageName);

        this.stars = res.stars;
        this.selectedImage = imageName;
        this.isCorrectAnswer = res.correct;
        this.showAnswerFeedback = true;

        this.feedback = res.correct
            ? this.viewModel.game.correctText
            : this.viewModel.game.incorrectText;

        if (res.gameOver) {
            setTimeout(() => {
                this.gameOver = true;
                this.progress.setStars("WordMatch", this.level, res.stars);
            }, 1200);
        } else {
            setTimeout(() => {
                this.feedback = "";
                this.fetchQuestion();
            }, 1000);
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
        this.selectedImage = null;
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}

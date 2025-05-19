import { makeObservable, observable, action, computed } from "mobx";
import { inject, injectable } from "inversify";
import { LetterBubbleQuestion, GameResult } from "./LetterBubblesTypes";
import { LetterBubblesApiService } from "../../../../../../services/LetterBubblesApiService";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface LetterBubbleViewModel {
    targetLetter: string;
    options: string[];
    isAnswerCorrect: boolean | null;
    showAnswerFeedback: boolean;
    gameOver: boolean;
    isPerfect: boolean;
    result: GameResult;
    isLoading: boolean;
    texts: {
        gameTitle: string;
        instruction: string;
        correctText: string;
        incorrectText: string;
        loadingMessage: string;
        finishedText: string;
        resultText: string;
        playAgain: string;
    };
    stars: {
        starText: string;
        fiveStarText: string;
        starCount: number;
    };
    backToDashboardSymbol: string;
    playAgainSymbol: string;
    nextGameSymbol: string;
}


@injectable()
export class LetterBubblesPresenter {
    currentQuestion: LetterBubbleQuestion | null = null;
    correctAnswers = 0;
    isAnswerCorrect: boolean | null = null;
    gameOver = false;
    isLoading = true;
    level = 1;
    stars = 0;

    constructor(
        @inject(LetterBubblesApiService) private letterBubbleApiService: LetterBubblesApiService,
        @inject(GameProgressManager) private gameProgressManager: GameProgressManager
    ) {
        makeObservable(this, {
            currentQuestion: observable,
            correctAnswers: observable,
            isAnswerCorrect: observable,
            gameOver: observable,
            isLoading: observable,
            load: action,
            answer: action,
            fetchNextQuestion: action,
            viewModel: computed,
        });
    }

    get viewModel(): LetterBubbleViewModel {
        return {
            targetLetter: this.currentQuestion?.targetLetter ?? "",
            options: this.currentQuestion?.options ?? [],
            isAnswerCorrect: this.isAnswerCorrect,
            showAnswerFeedback: this.isAnswerCorrect !== null,
            gameOver: this.gameOver,
            isPerfect: this.correctAnswers === 5,
            result: {
                correctAnswers: this.correctAnswers,
                totalQuestions: 5,
            },
            isLoading: this.isLoading,
            texts: {
                gameTitle: "🫧 Bokstavsbubblor",
                instruction: "Hitta bokstaven:",
                correctText: "✅ Rätt!",
                incorrectText: "❌ Fel bokstav!",
                loadingMessage: "Laddar...",
                finishedText: "🎊 Du klarade bokstavsbubblorna!",
                resultText: `Du fick ${this.correctAnswers} av 5 rätt!`,
                playAgain: "🔄 Spela igen",
            },
            stars: {
                starText: "⭐".repeat(this.correctAnswers).padEnd(5, "☆"),
                fiveStarText: "Du fick 5 stjärnor:",
                starCount: this.correctAnswers,
            },
            backToDashboardSymbol: "↩️",
            playAgainSymbol: "🔄",
            nextGameSymbol: "➡️",
        };
    }



    async load() {
        this.correctAnswers = 0;
        this.isAnswerCorrect = null;
        this.gameOver = false;
        this.currentQuestion = null;
        this.isLoading = true;

        await this.letterBubbleApiService.startGame();
        await this.fetchNextQuestion();
    }

    async fetchNextQuestion() {
        const question = await this.letterBubbleApiService.getQuestion();

        if (question.gameResult?.gameOver) {
            this.gameOver = true;

            this.stars = question.gameResult.stars;
            this.level = question.gameResult.level;

            this.gameProgressManager.setStars("LetterBubbleGame", this.level, this.stars);
            await this.letterBubbleApiService.sendProgress(this.level, this.stars);

            this.isLoading = false;
            return;
        }


        this.currentQuestion = question;
        this.isLoading = false;

        SpeechHelper.speak(`Hitta bokstaven ${question.targetLetter}`);
    }

    async answer(letter: string) {
        if (!this.currentQuestion) return;

        const res = await this.letterBubbleApiService.submitAnswer(letter);
        const wasCorrect = res.gameResult?.correct ?? false;

        this.isAnswerCorrect = wasCorrect;

        if (wasCorrect) {
            this.correctAnswers++;
        }

        setTimeout(() => {
            this.isAnswerCorrect = null;
            this.currentQuestion = null;
            this.fetchNextQuestion();
        }, 1000);
    }
}

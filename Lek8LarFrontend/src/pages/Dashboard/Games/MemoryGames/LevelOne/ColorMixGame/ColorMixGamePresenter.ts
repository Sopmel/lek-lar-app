import { makeObservable, observable, computed, action } from "mobx";
import { inject } from "inversify";
import { ColorMixApiService } from "../../../../../../services/ColorMixApiService";
import { ColorMixQuestion, GameResult } from "./ColorMixTypes";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface ColorMixViewModel {
    color1: string;
    color1Name: string;
    color2: string;
    color2Name: string;
    options: string[];
    feedback: string;
    gameOver: boolean;
    isPerfect: boolean;
    stars: {
        starCount: number;
        starText: string;
        fiveStarText: string;
    };
    symbols: {
        backToDashboard: string;
        playAgain: string;
        nextGame: string;
    };
    isLoading: boolean;
    selectedAnswer: string | null;
}

export class ColorMixGamePresenter {
    question: ColorMixQuestion | null = null;
    stars = 0;
    round = 0;
    maxRounds = 5;
    gameOver = false;
    sessionId: string = "";
    answerFeedback: string = "";
    selectedAnswer: string | null = null;

    constructor(
        @inject(ColorMixApiService)
        private colorMixApiService: ColorMixApiService
    ) {
        makeObservable(this, {
            question: observable,
            stars: observable,
            round: observable,
            gameOver: observable,
            answerFeedback: observable,
            selectedAnswer: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): ColorMixViewModel {
        return {
            color1: this.question?.color1 ?? "",
            color1Name: this.colorNameMap[this.question?.color1 ?? ""] ?? "",
            color2: this.question?.color2 ?? "",
            color2Name: this.colorNameMap[this.question?.color2 ?? ""] ?? "",
            options: this.question?.options ?? [],
            feedback: this.answerFeedback,
            gameOver: this.gameOver,
            isPerfect: this.stars === this.maxRounds,
            stars: {
                starCount: this.stars,
                starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
                fiveStarText: `Du fick ${this.stars} stjärnor:`,
            },
            symbols: {
                backToDashboard: "↩️",
                playAgain: "🔄",
                nextGame: "➡️",
            },
            isLoading: !this.question,
            selectedAnswer: this.selectedAnswer,
        };
    }

    public async startGame() {
        this.stars = 0;
        this.gameOver = false;
        this.answerFeedback = "";
        this.selectedAnswer = null;
        const response = await this.colorMixApiService.startGame(1);
        this.sessionId = response.sessionId;
        await this.fetchQuestion();
    }

    public async fetchQuestion() {
        this.question = await this.colorMixApiService.fetchQuestion(this.sessionId);
        this.answerFeedback = "";
        this.selectedAnswer = null;
        const c1 = this.colorNameMap[this.question?.color1 ?? ""] ?? this.question?.color1;
        const c2 = this.colorNameMap[this.question?.color2 ?? ""] ?? this.question?.color2;
        SpeechHelper.speak(`Vad får vi för färg om vi blandar ${c1} med ${c2}?`);
    }

    public async submitAnswer(answer: string) {
        this.selectedAnswer = answer;

        const res = await this.colorMixApiService.submitAnswer(this.sessionId, answer);
        const correct = res.correct;
        this.answerFeedback = correct ? "✅ Rätt!" : "❌ Fel!";
        if (correct) this.stars++;

        if (res.gameOver) {
            this.gameOver = true;

            const result: GameResult = {
                gameOver: true,
                stars: this.stars,
                level: 1,
                levelCleared: this.stars >= this.maxRounds,
            };

            await this.colorMixApiService.sendProgress(result);
            return;
        }

        setTimeout(async () => {
            await this.fetchQuestion();
        }, 1000);
    }

    public readonly colorNameMap: Record<string, string> = {
        red: "Röd",
        yellow: "Gul",
        blue: "Blå",
        green: "Grön",
        orange: "Orange",
        purple: "Lila",
        pink: "Rosa",
        gray: "Grå",
        white: "Vit",
        black: "Svart",
    };

}

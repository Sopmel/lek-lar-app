import { makeObservable, observable, computed, action, set } from "mobx";
import { inject } from "inversify";
import { WhatsMissingApiService } from "../../../../../../services/WhatsMissingApiService";
import { WhatsMissingQuestion } from "./WhatsMissingTypes";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

export interface WhatsMissingViewModel {
    visibleImages: string[];
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
    showingFullSet: boolean;
}


export class WhatsMissingPresenter {
    question: WhatsMissingQuestion | null = null;
    stars = 0;
    gameOver = false;
    sessionId: string = "";
    showingFullSet: boolean = true;
    answerFeedback: string = "";
    round = 0;
    maxRounds = 5;

    constructor(
        @inject(WhatsMissingApiService)
        private whatsMissingApiService: WhatsMissingApiService
    ) {
        makeObservable(this, {
            question: observable,
            stars: observable,
            round: observable,
            gameOver: observable,
            viewModel: computed,
            showingFullSet: observable,
            answerFeedback: observable,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action,
            hideFullSet: action,
            showFullSetAgain: action,
        });

        this.startGame();
    }

    get viewModel(): WhatsMissingViewModel {
        const imagesToShow = this.showingFullSet
            ? this.question?.allImages ?? []
            : this.question?.remainingImages ?? [];

        return {
            visibleImages: imagesToShow,
            options: this.question?.options ?? [],
            feedback: this.answerFeedback,
            gameOver: this.gameOver,
            isPerfect: this.stars === this.maxRounds,
            stars: {
                starCount: this.stars,
                starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
                fiveStarText: "Du fick " + this.stars + " stjärnor:",
            },
            symbols: {
                backToDashboard: "↩️",
                playAgain: "🔄",
                nextGame: "➡️",
            },
            isLoading: !this.question,
            showingFullSet: this.showingFullSet,
        };
    }

    public async startGame() {
        this.stars = 0;
        this.round = 0;
        this.answerFeedback = "";
        this.gameOver = false;
        SpeechHelper.speak("Titta noga på bilderna!");

        const response = await this.whatsMissingApiService.startGame();
        this.sessionId = response.sessionId;
        await this.fetchQuestion();
    }

    public async fetchQuestion() {
        this.question = await this.whatsMissingApiService.fetchQuestion(this.sessionId);
        this.answerFeedback = "";
        this.showingFullSet = true;
        SpeechHelper.speak("kom ihåg bilderna.");
        setTimeout(() => {
            SpeechHelper.speak("titta noga, vilken bild är borta?.");
        }
            , 2000);

        setTimeout(() => {
            this.showingFullSet = false;
        }, 2000);
    }

    public async submitAnswer(answer: string) {
        const res = await this.whatsMissingApiService.submitAnswer(this.sessionId, answer);
        const wasCorrect = answer === this.question?.correctAnswer;

        if (wasCorrect) {
            this.stars++;
            this.answerFeedback = "✅ Rätt!";
        } else {
            this.answerFeedback = "❌ Fel!";
        }

        this.round++;

        if (this.round >= this.maxRounds) {
            this.gameOver = true;
            await this.whatsMissingApiService.sendProgress({
                gameOver: true,
                stars: this.stars,
                level: 1,
                levelCleared: this.stars >= this.maxRounds,
            });
            return;
        }


        setTimeout(async () => {
            await this.fetchQuestion();
        }, 1000);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    public hideFullSet() {
        this.showingFullSet = false;
    }

    public showFullSetAgain() {
        this.showingFullSet = true;
        setTimeout(() => {
            this.hideFullSet();
        }, 2000);
    }
}

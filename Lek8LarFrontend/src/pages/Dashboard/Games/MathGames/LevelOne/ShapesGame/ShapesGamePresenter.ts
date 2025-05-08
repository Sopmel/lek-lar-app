import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

export type ShapeQuestion = {
    id: number;
    shapeImageUrl: string;
    options: string[];
    correctAnswer: string;
    gameOver: boolean;
    sessionId: string;
};

export type GameResult = {
    gameOver: boolean;
    stars: number;
    levelCleared: boolean;
};

export class ShapesGamePresenter {
    question: ShapeQuestion | null = null;
    feedback: string = "";
    gameOver: boolean = false;
    sessionId: string = "";
    stars: number = 0;

    constructor() {
        makeAutoObservable(this);
        this.startGame();
    }

    async startGame() {
        try {
            const res = await axios.post("http://localhost:5000/api/ShapeGame/start");
            runInAction(() => {
                this.sessionId = res.data.sessionId;
            });
            await this.fetchQuestion();
        } catch (err) {
            console.error("Kunde inte starta spelet:", err);
        }
    }

    async fetchQuestion() {
        try {
            const res = await axios.get(`http://localhost:5000/api/ShapeGame/question`, {
                params: { sessionId: this.sessionId }
            });
            console.log("Fråga från backend:", res.data);

            runInAction(() => {
                if (res.data.gameOver) {
                    this.gameOver = true;
                } else {
                    this.question = res.data;
                }
            });
        } catch (err) {
            console.error("Kunde inte hämta fråga:", err);
        }
    }

    async submitAnswer(answer: string) {
        if (!this.question) return;

        try {
            const res = await axios.post("http://localhost:5000/api/ShapeGame/answer", {
                questionId: this.question.id,
                answer,
                sessionId: this.sessionId
            });

            runInAction(() => {
                this.feedback = res.data.correct ? "🎉 Rätt!" : "❌ Fel, försök igen!";
                this.stars = res.data.stars;
                if (res.data.gameOver) {
                    this.gameOver = true;
                } else {
                    setTimeout(() => {
                        runInAction(() => {
                            this.feedback = "";
                        });
                        this.fetchQuestion();
                    }, 1000);
                }
            });
        } catch (err) {
            console.error("Kunde inte skicka svar:", err);
        }
    }
}
import { makeObservable, observable, action, computed } from "mobx";
import { LetterBubbleQuestion, GameResult } from "./LetterBubblesTypes";
import { LetterBubblesApiService } from "../../../../../../services/LetterBubblesApiService";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { inject, injectable } from "inversify";
import { SpeechHelper } from "../../../../../../utils/SpeechHelper";

@injectable()
export class LetterBubblesPresenter {
    questions: LetterBubbleQuestion[] = [];
    currentIndex = 0;
    correctAnswers = 0;
    isAnswerCorrect: boolean | null = null;
    gameOver = false;

    constructor(
        @inject(LetterBubblesApiService) private api: LetterBubblesApiService,
        @inject(GameProgressManager) private gameProgressManager: GameProgressManager
    ) {
        makeObservable(this, {
            questions: observable,
            currentIndex: observable,
            correctAnswers: observable,
            isAnswerCorrect: observable,
            gameOver: observable,
            currentQuestion: computed,
            load: action,
            answer: action,
            next: action,
        });
    }

    get currentQuestion(): LetterBubbleQuestion | null {
        return this.questions[this.currentIndex] ?? null;
    }


    get result(): GameResult {
        return {
            correctAnswers: this.correctAnswers,
            totalQuestions: this.questions.length,
        };
    }

    public async load() {
        this.questions = await this.api.getQuestions();
        this.currentIndex = 0;
        this.correctAnswers = 0;
        this.gameOver = false;
    }

    public answer(letter: string) {
        if (!this.currentQuestion) return;

        this.isAnswerCorrect = letter === this.currentQuestion.targetLetter;

        if (this.isAnswerCorrect) {
            this.correctAnswers++;
        }

        setTimeout(() => {
            this.next();
        }, 1000);
    }

    public async next() {
        this.isAnswerCorrect = null;

        if (this.currentIndex + 1 < this.questions.length) {
            this.currentIndex++;

            SpeechHelper.speak(`Hitta bokstaven ${this.currentQuestion?.targetLetter}`)

        } else {
            this.gameOver = true;

            const allCorrect = this.correctAnswers === this.questions.length;


            const stars = this.correctAnswers;
            this.gameProgressManager.setStars("LetterBubbleGame", 1, stars);


            await this.api.sendProgress({
                level: 1,
                stars,
                gameOver: true,
                levelCleared: allCorrect,
            });
        }
    }
}

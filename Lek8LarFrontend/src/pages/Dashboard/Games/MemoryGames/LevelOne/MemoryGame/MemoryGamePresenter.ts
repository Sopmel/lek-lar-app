import { action, computed, makeObservable, observable } from "mobx";
import { GameProgressManager } from "../../../../Services/GameProgressManager/GameProgressManager";
import { inject, injectable } from "inversify";
import { MemoryGameApiService } from "../../../../../../services/MemoryGameApiService";


export interface MemoryGameViewModel {
    cards: MemoryCard[];
    matchedPairs: number;
    isGameOver: boolean;
    isPerfect: boolean;
    isLoading: boolean;
    game: {
        gameTitle: string;
        correctText: string;
        incorrectText: string;
        finishedText: string;
    };
    stars: {
        starText: string;
        fiveStarText: string;
        starCount: number;
    };
    symbols: {
        backToDashboard: string;
        playAgain: string;
        nextGame: string;
    };
    isAnswerFeedbackVisible: boolean;
    isAnswerCorrect: boolean | null;
    loadingMessage: string;
}

export interface MemoryCard {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}



@injectable()
export class MemoryGamePresenter {
    cards: MemoryCard[] = [];
    flippedCards: MemoryCard[] = [];
    matchedPairs = 0;
    gameOver = false;

    constructor(
        @inject(GameProgressManager) private progress: GameProgressManager,
        @inject(MemoryGameApiService) private memoryGameApiService: MemoryGameApiService,
    ) {
        makeObservable(this, {
            cards: observable,
            flippedCards: observable,
            matchedPairs: observable,
            gameOver: observable,
            viewModel: computed,
            flipCard: action,
            loadGame: action,
        });

        this.loadGame();
    }

    get viewModel(): MemoryGameViewModel {
        return {
            cards: this.cards,
            matchedPairs: this.matchedPairs,
            isGameOver: this.gameOver,
            isPerfect: this.matchedPairs === 5,
            isLoading: false,
            game: {
                gameTitle: "🧠 Memory",
                correctText: "✅ Match!",
                incorrectText: "❌ Försök igen!",
                finishedText: "🎉 Du matchade alla par!",
            },
            stars: {
                starText: "⭐".repeat(this.matchedPairs).padEnd(5, "☆"),
                fiveStarText: "Du fick 5 stjärnor:",
                starCount: this.matchedPairs,
            },
            symbols: {
                backToDashboard: "↩️",
                playAgain: "🔄",
                nextGame: "➡️",
            },
            isAnswerFeedbackVisible: false,
            isAnswerCorrect: null,
            loadingMessage: "Laddar...",
        };
    }


    public loadGame() {
        this.matchedPairs = 0;
        this.gameOver = false;
        const images = ["apple.png", "banana.png", "sol.png", "blomma.png", "ball.png"];
        const deck = [...images, ...images].map((img, i) => ({
            id: i,
            image: img,
            isFlipped: false,
            isMatched: false,
        }));

        this.cards = deck.sort(() => Math.random() - 0.5);
    }

    public async flipCard(card: MemoryCard) {
        if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

        card.isFlipped = true;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            const [a, b] = this.flippedCards;
            if (a.image === b.image) {
                a.isMatched = true;
                b.isMatched = true;
                this.matchedPairs++;
                this.flippedCards = [];

                if (this.matchedPairs === 5) {
                    this.gameOver = true;
                    this.progress.setStars("MemoryGame", 1, 5);
                    await this.memoryGameApiService.sendProgress(1, 5);
                }
            } else {
                setTimeout(() => {
                    a.isFlipped = false;
                    b.isFlipped = false;
                    this.flippedCards = [];
                }, 1000);
            }
        }
    }
}

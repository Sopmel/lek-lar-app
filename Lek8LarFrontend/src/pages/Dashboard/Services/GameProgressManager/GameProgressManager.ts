import { makeAutoObservable } from "mobx";

export class GameProgressManager {
    progress: Record<string, number> = {};

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    setStars(gameKey: string, level: number, stars: number) {
        const key = `${gameKey}-Level${level}`;
        this.progress[key] = Math.max(this.progress[key] ?? 0, stars);
        this.saveToStorage();
    }

    getStars(gameKey: string, level: number): number {
        return this.progress[`${gameKey}-Level${level}`] ?? 0;
    }

    getUnlockedLevel(gameKey: string): number {
        let level = 1;
        while (this.getStars(gameKey, level) === 5) {
            level++;
        }
        return level;
    }

    private saveToStorage() {
        localStorage.setItem("gameProgress", JSON.stringify(this.progress));
    }

    private loadFromStorage() {
        const saved = localStorage.getItem("gameProgress");
        if (saved) {
            try {
                this.progress = JSON.parse(saved);
            } catch {
                this.progress = {};
            }
        }
    }
}

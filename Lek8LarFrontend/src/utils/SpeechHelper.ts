export class SpeechHelper {
    static async speak(text: string, options?: { lang?: string; rate?: number }) {
        await this.waitForVoices(); // 👈 nu funkar det

        speechSynthesis.cancel(); // 🧹 rensa tidigare tal

        const voices = speechSynthesis.getVoices();

        const alva = voices.find(v => v.voiceURI.toLowerCase().includes("alva"));
        const femaleSwedish = voices.find(v =>
            v.lang === "sv-SE" &&
            /alva|emma|elin|anna|agnes|maria|karin/i.test(v.name)
        );
        const anySwedish = voices.find(v => v.lang === "sv-SE");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = alva ?? femaleSwedish ?? anySwedish ?? null;
        utterance.lang = options?.lang ?? "sv-SE";
        utterance.rate = options?.rate ?? 0.7;

        speechSynthesis.speak(utterance);
    }

    // ✅ Lägg till denna helper
    private static waitForVoices(): Promise<void> {
        return new Promise((resolve) => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                resolve();
                return;
            }

            const onVoicesChanged = () => {
                if (speechSynthesis.getVoices().length > 0) {
                    speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
                    resolve();
                }
            };

            speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
        });
    }
}

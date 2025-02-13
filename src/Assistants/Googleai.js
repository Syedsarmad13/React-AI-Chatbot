import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY)



class Assistant {
#chat
    constructor(model= "gemini-1.5-flash"){
        const gemini = googleAI.getGenerativeModel({ model })
        this.#chat = gemini.startChat({history: []})
    }

    async chat(content) {
        try {
            const result = await this.#chat.sendMessage(content);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }
}

export default Assistant
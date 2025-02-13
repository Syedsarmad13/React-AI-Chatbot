import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from ".../assistants/Openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
    dangerouslyAllowBrowser: true
});

class Assistant extends OpenAIAssistant{
    constructor(model= "deepseek-chat", client = openai) {
        super(model, client)
    }

}

export default Assistant;

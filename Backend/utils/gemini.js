import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getGeminiAPIResponse = async (message) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: message }],
        });
        return completion.choices[0].message.content;
    } catch (err) {
        if (err?.status === 429) {
            console.warn("[Groq] Rate limit hit (429). Please try again shortly.");
            return "I'm currently experiencing high demand. Please try again in a minute!";
        }
        console.error("Error fetching Groq response:", err);
        throw err;
    }
};

export default getGeminiAPIResponse;

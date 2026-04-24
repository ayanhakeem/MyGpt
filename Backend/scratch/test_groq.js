import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: "Hello" }],
        });
        console.log("Response:", completion.choices[0].message.content);
    } catch (err) {
        console.error("Error:", err);
    }
}

test();

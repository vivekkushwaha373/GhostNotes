import { GoogleGenerativeAI } from "@google/generative-ai";
// import { StreamingTextResponse, OpenAIStream } from 'ai';
export const config = {
    runtime: "edge", // Ensure it runs on Edge
};
export async function POST(req: Request) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL as string});

        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience.For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, be it personal professional or friendly";

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // console.log(responseText);
        
        return Response.json({
            message: responseText,
            success:true
        },{status:200});

       
    }
    catch (error) {
        console.log('An unexpected error occured ', error);
        return Response.json({
            success: false,
            message: "Api error occured"

        }, { status: 500 })
    }
}



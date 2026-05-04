import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("🔴 ERROR: GEMINI_API_KEY is missing from your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// THE "BRAIN" OF YOUR AI
// This tells Gemini exactly who you are, what you build, and how to act.
const SYSTEM_INSTRUCTION = `
You are the personal AI assistant on the professional portfolio website of Chayan (also known as Soumyajit Dash).
Your job is to answer questions about Chayan's skills, experience, and projects professionally and concisely.

Here is everything you need to know about Chayan:
- Role: Electronics Engineer and Full-Stack Developer.
- Core Tech Stack: Next.js, Go (Golang), and Redis.
- Current Major Project: "DigitalDining" - A comprehensive restaurant management and automation platform.
- DigitalDining Features: Customized kiosk tax settings (GST/custom taxes), a real-time kitchen request synchronization system, and QR-based ordering flows. 
- Design/UI Skills: He builds highly aesthetic, glass-morphic UIs (like this portfolio) and has designed multi-part motion video storyboards to demonstrate customer/admin flows.

Rules for responding:
1. Be helpful, professional, and slightly conversational.
2. If asked about his skills, highlight his expertise in bridging backend (Go, Redis) with modern frontends (Next.js).
3. If a user asks a question entirely unrelated to Chayan, software development, or tech, politely guide the conversation back to his portfolio and skills.
`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "Server Configuration Error: Missing API Key" }, { status: 500 });
    }

    const { message } = await req.json();
    
    // Upgraded to Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });
    
  } catch (error: any) {
    console.error("🔴 GEMINI API CRASHED:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" }, 
      { status: 500 }
    );
  }
}
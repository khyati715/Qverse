import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());

const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

// Initialize Gemini client (NEW API)
const ai = new GoogleGenAI({
  apiKey: GEMINI_KEY,
});

// Root route
app.get("/", (req, res) => {
  res.send("Qverse AI running 🌌 — visit /api/insight");
});

// AI Insight route
app.get("/api/insight", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an AI assistant for a university app called Qverse.

Context:
- Campus status: Active
- Active queues: 3 locations
- Average wait time: 12 minutes

Task:
Give ONE short, practical insight (1–2 sentences) to help students reduce waiting time.
Be specific and actionable.
`,
    });

    res.json({
      text: response.text,
    });

  } catch (err) {
    console.error("Gemini SDK error:", err);
    res.status(500).json({ error: "Gemini failed 🌌" });
  }
});

app.listen(3000, () => {
  console.log("Qverse AI running 🌌 on http://localhost:3000");
});
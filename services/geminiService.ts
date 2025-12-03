import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Construct chat history for context
    // Ideally we use ai.chats.create for stateful chats, but for simplicity in this stateless service wrapper
    // we will just use generateContent with the history as context or use the chat API if persistent.
    // Let's use the Chat API properly.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "Lo siento, tuve un pequeño problema técnico. ¿Me lo repites? ✨";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "¡Ups! Mi sentido de la moda está recargándose. Intenta de nuevo en unos segundos. 👗";
  }
};
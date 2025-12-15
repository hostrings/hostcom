import { GoogleGenAI } from "@google/genai";
import { StoreStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessInsights = async (stats: StoreStats): Promise<string> => {
  if (!process.env.API_KEY) return "API Key not configured. Unable to generate insights.";

  try {
    const prompt = `
      You are a senior e-commerce analyst for a high-volume store doing 3000+ orders a day.
      Analyze the following daily snapshot and provide 3 brief, high-impact executive insights or action items.
      Keep it professional and concise (under 100 words total).

      Data:
      - Revenue: $${stats.totalRevenue.toLocaleString()}
      - Total Orders: ${stats.totalOrders.toLocaleString()}
      - AOV: $${stats.averageOrderValue.toFixed(2)}
      - Growth Rate: ${stats.growthRate}%
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights available.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "AI service temporarily unavailable.";
  }
};

export const analyzeMigrationLog = async (logs: string[]): Promise<string> => {
    if (!process.env.API_KEY) return "API Key not configured.";
    
    try {
        const logText = logs.slice(-20).join('\n'); // Last 20 logs
        const prompt = `
            Analyze this WooCommerce to Hostcom migration log snippet. 
            Is the migration proceeding normally? If there are warnings, summarize them in one sentence.
            
            Logs:
            ${logText}
        `;
        
         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text || "Analysis complete.";
    } catch (e) {
        return "Log analysis unavailable.";
    }
}
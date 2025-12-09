import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookRecommendations = async (idea: string): Promise<Book[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `I am researching the following idea or topic: "${idea}". 
      Please act as a librarian and search your database to recommend 5 to 8 real, high-quality, and relevant books that would assist me. 
      Prioritize seminal works, highly-rated academic resources, or influential popular science/non-fiction books depending on the tone of the query.
      Provide a brief description of the book and specifically why it is relevant to my research idea.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The full title of the book",
              },
              author: {
                type: Type.STRING,
                description: "The name(s) of the author(s)",
              },
              publishedYear: {
                type: Type.STRING,
                description: "Year of publication",
              },
              description: {
                type: Type.STRING,
                description: "A concise summary of the book's content (max 2 sentences).",
              },
              relevance: {
                type: Type.STRING,
                description: "A specific explanation of why this book is useful for the provided research idea.",
              },
              category: {
                type: Type.STRING,
                description: "The genre or academic field of the book (e.g., Philosophy, Computer Science).",
              },
            },
            required: ["title", "author", "description", "relevance", "category"],
          },
        },
      },
    });

    if (response.text) {
      const books = JSON.parse(response.text) as Book[];
      return books;
    }
    
    throw new Error("No data returned from the library system.");
  } catch (error) {
    console.error("Library Service Error:", error);
    throw new Error("Unable to retrieve book recommendations at this time.");
  }
};

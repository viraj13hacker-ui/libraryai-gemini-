import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";
import { libraryCatalog } from "../data/sampleLibrary";

export const getBookRecommendations = async (idea: string): Promise<Book[]> => {
  try {
    // Check for API Key explicitly
    // @ts-ignore
    if (typeof process === 'undefined' || !process.env.API_KEY) {
      throw new Error("API_KEY is missing. Please ensure the environment variable is set.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We inject the dataset directly into the prompt (Context Injection)
    const prompt = `
    I am acting as a librarian for a specific library collection.
    
    USER QUERY: "${idea}"
    
    Below is the FULL LIST of books available in my library (in JSON format):
    ${JSON.stringify(libraryCatalog)}

    INSTRUCTIONS:
    1. Search ONLY the "Library Catalog" provided above.
    2. Select the 3 to 6 books that are most relevant to the USER QUERY.
    3. If the user's query is vague, find the best matches based on keywords or themes (e.g., if they ask for "coding", look for Computer Science books).
    4. You MUST NOT invent books. You MUST NOT recommend books outside this list.
    5. For each selected book, generate a specific "relevance" field explaining why it fits the query.
    6. Return the result as a JSON array.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title exactly as it appears in the catalog.",
              },
              author: {
                type: Type.STRING,
                description: "The author exactly as it appears in the catalog.",
              },
              publishedYear: {
                type: Type.STRING,
                description: "Year of publication from the catalog.",
              },
              description: {
                type: Type.STRING,
                description: "The description from the catalog.",
              },
              relevance: {
                type: Type.STRING,
                description: "A generated explanation of why this specific book from the catalog is useful for the user's idea.",
              },
              category: {
                type: Type.STRING,
                description: "The category from the catalog.",
              },
            },
            required: ["title", "author", "description", "relevance", "category"],
            propertyOrdering: ["title", "author", "publishedYear", "category", "description", "relevance"],
          },
        },
      },
    });

    if (response.text) {
      const books = JSON.parse(response.text) as Book[];
      return books;
    }
    
    throw new Error("No data returned from the library system.");
  } catch (error: any) {
    console.error("Library Service Error:", error);
    throw new Error(error.message || "Unable to retrieve book recommendations.");
  }
};
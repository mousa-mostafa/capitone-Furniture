
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkCustomizationAvailability = async (productName: string, fabricColor: string, paintColor: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير في مصنع Capitone Furniture للأثاث الراقي في دمياط، هل يمكن تنفيذ طقم صالون "${productName}" بقماش لون "${fabricColor}" ودهان خشبي لون "${paintColor}"؟ 
      رد بصيغة JSON توضح الحالة (متاح/غير متاح) وسبب تقني بسيط أو نصيحة جمالية.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            available: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            alternative: { type: Type.STRING }
          },
          required: ["available", "message"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Error:", error);
    return { available: true, message: "سيتم مراجعة طلبك من قبل الفنيين وتأكيده خلال ساعات." };
  }
};

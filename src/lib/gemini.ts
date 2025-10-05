const GEMINI_API_KEY = "AIzaSyAYmEj1tHJMiRm7lMsQbJ83Tf3IfkkY0Fg";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function queryGemini(prompt: string, context?: string): Promise<string> {
  const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
  
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function analyzeSDGData(country: string): Promise<string> {
  const prompt = `Analyze ${country}'s Sustainable Development Goals (SDG) performance. Provide a clear, structured response without using markdown formatting, asterisks, or special characters. Use plain text with numbers and bullet points only:

1. Top 3 strongest SDGs with specific metrics
2. 2 weakest SDGs with areas of concern
3. 1 actionable suggestion per weak SDG`;
  
  return queryGemini(prompt);
}

export async function getTopPerformingCountries(): Promise<string> {
  const prompt = `List the top 5 countries performing best on Sustainable Development Goals globally. For each country, provide plain text without markdown:
- Country name and flag emoji
- Overall SDG score or ranking
- 2-3 key achievements
Keep the response clear and concise in plain text format.`;
  
  return queryGemini(prompt);
}

export async function getLeastProgressingCountries(): Promise<string> {
  const prompt = `List 5 countries facing the most challenges with Sustainable Development Goals. For each country, provide plain text without markdown:
- Country name and flag emoji
- Key SDG challenges
- 1-2 areas needing urgent attention
Keep the response clear and concise in plain text format.`;
  
  return queryGemini(prompt);
}

export async function getGlobalSDGComparison(sdgNumber: number, countries: string[]): Promise<string> {
  const prompt = `Compare SDG ${sdgNumber} progress between these countries: ${countries.join(', ')}. 
Highlight leaders, laggards, and global average trend. Provide specific data points and insights.`;
  
  return queryGemini(prompt);
}

export async function chatWithSDGAssistant(message: string, conversationHistory: GeminiMessage[]): Promise<string> {
  const systemContext = `You are an expert SDG (Sustainable Development Goals) analyst. 
Provide accurate, data-driven insights about SDG progress worldwide. 
Be concise but informative. Use specific metrics when possible.`;
  
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: systemContext }]
        },
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

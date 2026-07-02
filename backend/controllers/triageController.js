import { Assessment } from '../models/Assessment.js';
import { GoogleGenAI, Type } from '@google/genai';

const RED_FLAGS = [
  'chest pain',
  'shortness of breath',
  'difficulty breathing',
  'stiff neck',
  'sudden numbness',
  'loss of vision',
  'confusion'
];

export const assessSymptoms = async (req, res) => {
  try {
    const { age, gender, symptomDescription } = req.body;

    if (!age || !gender || !symptomDescription) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cleanDescription = symptomDescription.toLowerCase();

    // 1. Check for emergency red flags
    const hasRedFlag = RED_FLAGS.some(flag => cleanDescription.includes(flag));

    let severityLevel = 'Low';
    let recommendedAction = '';
    let remedies = [];
    let redFlagsToWatch = [];

    if (hasRedFlag) {
      severityLevel = 'High';
      recommendedAction = 'URGENT: Seek immediate medical attention or call emergency services.';
    } else {
      // 2. Call Gemini API for dynamic symptom triage
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not defined or initialized.' });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = `You are a medical triage assistant. A user has provided the following details:
Age: ${age}
Gender: ${gender}
Symptoms: "${symptomDescription}"

Based on these symptoms, evaluate the severity level ('Low' or 'High'). If it is not a medical emergency, return 'Low'. 
Provide a recommended action, a list of home remedies, and a list of red flags to watch for.`;

      console.log('[Triage] Calling Gemini API...');

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              severityLevel: {
                type: Type.STRING,
                description: "Must be exactly 'Low' or 'High'"
              },
              recommendedAction: {
                type: Type.STRING,
                description: "A short sentence advising the user"
              },
              remedies: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of home remedies"
              },
              redFlagsToWatch: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of worsening symptoms to watch out for"
              }
            },
            required: ['severityLevel', 'recommendedAction', 'remedies', 'redFlagsToWatch']
          }
        }
      });

      console.log('[Triage] Gemini raw response text:', response.text);

      const jsonResult = JSON.parse(response.text);
      severityLevel = jsonResult.severityLevel === 'High' ? 'High' : 'Low';
      recommendedAction = jsonResult.recommendedAction || 'Monitor your symptoms.';
      remedies = jsonResult.remedies || [];
      redFlagsToWatch = jsonResult.redFlagsToWatch || [];
    }

    // 3. Save assessment transaction to MongoDB
    const newAssessment = new Assessment({
      age,
      gender,
      symptomDescription,
      severityLevel,
      recommendedAction
    });

    await newAssessment.save();

    res.status(200).json({
      success: true,
      data: {
        assessmentId: newAssessment._id,
        severityLevel,
        recommendedAction,
        remedies,
        redFlagsToWatch
      }
    });

  } catch (error) {
    console.error('[Triage] ERROR:', error.message);
    console.error('[Triage] Full error detail trace:', error);
    res.status(500).json({ error: `Assessment processing breakdown: ${error.message}` });
  }
};
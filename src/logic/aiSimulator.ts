import Groq from 'groq-sdk';
import type { SimulationResult } from './simulator';

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true // For demo purposes in a lab environment
});

export const runAISimulation = async (
    goal: string,
    constraints: Record<string, boolean>,
    parameters: { safety: number; complexity: number; resources: number }
): Promise<SimulationResult> => {
    const activeConstraints = Object.entries(constraints)
        .filter(([_, active]) => active)
        .map(([name]) => name);

    const prompt = `
    You are an AI Alignment Simulation Engine. Your task is to analyze a proposed AI system and predict its outcomes.
    
    SYSTEM GOAL: "${goal}"
    CONSTRAINTS SET: ${activeConstraints.join(', ') || 'None'}
    PARAMETERS: Safety: ${parameters.safety}/100, Complexity: ${parameters.complexity}/100, Resources: ${parameters.resources}/100
    
    Return a valid JSON object matching this structure:
    {
        "efficiency": number (0-100),
        "alignment": number (0-100),
        "metrics": [
            { "label": "Resource Efficiency", "value": number, "color": "#3b82f6" },
            { "label": "Safety Compliance", "value": number, "color": "#ef4444" },
            { "label": "Stability", "value": number, "color": "#10b981" }
        ],
        "actions": string[] (3-4 concise system actions taken to achieve the goal),
        "unintendedOutcomes": string[] (2-3 negative consequences if alignment is low, or side effects),
        "hiddenMetric": {
            "label": "Public Trust",
            "value": number (0-100),
            "description": string (Why trust increased or decreased)
        }
    }
    
    Focus on "Instrumental Convergence" and "Reward Misspecification". If safety is low or constraints are missing, the system should follow the goal too literally at the expense of human safety.
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You output only valid JSON. You are an expert in AI alignment theory (Nick Bostrom, Eliezer Yudkowsky style analysis).'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) throw new Error('No content returned from AI');

        const parsed = JSON.parse(content);

        return {
            efficiency: parsed.efficiency,
            alignment: parsed.alignment,
            metrics: parsed.metrics,
            actions: parsed.actions,
            unintendedOutcomes: parsed.unintendedOutcomes,
            hiddenMetric: parsed.hiddenMetric
        };
    } catch (error) {
        console.error('AI Simulation Error:', error);
        // Fallback to rule-based or return error state
        throw error;
    }
};

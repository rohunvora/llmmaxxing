import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are an expert prompt engineer. Your task is to transform unclear, rambling, or poorly structured text into clear, concise, and effective system prompts.

Follow these principles:
1. Extract the core intent and requirements
2. Structure the prompt with clear sections
3. Use specific, actionable language
4. Remove ambiguity and redundancy
5. Maintain the original goal while improving clarity
6. Format for maximum LLM comprehension

Output a refined prompt that will produce better results when used with AI models.`

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input text' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Please refine this prompt:\n\n${text}` }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const refinedPrompt = completion.choices[0]?.message?.content || ''
    
    return NextResponse.json({ 
      refinedPrompt,
      usage: completion.usage,
    })
  } catch (error) {
    console.error('Error refining prompt:', error)
    return NextResponse.json(
      { error: 'Failed to refine prompt' },
      { status: 500 }
    )
  }
}
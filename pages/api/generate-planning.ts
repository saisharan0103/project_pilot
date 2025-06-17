import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { projectName, projectDescription, aiTool } = req.body as {
    projectName?: string
    projectDescription?: string
    aiTool?: string
  }

  if (!projectName || !projectDescription) {
    return res
      .status(400)
      .json({ error: 'projectName and projectDescription are required' })
  }

  try {
    const apiKey = process.env.AI_API_KEY
    if (!apiKey) {
      throw new Error('AI_API_KEY not set')
    }

    const prompt = `You are an experienced product planner. Based on the project name "${projectName}" and the description below, generate a product requirements document (PRD), a recommended tech stack and a short prompt pack for the chosen AI tool ${aiTool ?? ''}. Respond in JSON with keys prd, techStack and promptPack.\n\n${projectDescription}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('OpenAI error:', errText)
      return res.status(500).json({ error: 'OpenAI API error' })
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? ''

    // Try parsing JSON response
    try {
      const json = JSON.parse(text)
      return res.status(200).json(json)
    } catch {
      return res.status(200).json({ text })
    }
  } catch (err) {
    console.error('Planning generation error:', err)
    return res.status(500).json({ error: 'Failed to generate planning' })
  }
}

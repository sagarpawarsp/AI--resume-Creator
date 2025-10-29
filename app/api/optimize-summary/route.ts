import { generateText } from "ai"

export async function POST(req: Request) {
  const { personalInfo, experience, skills, jobDescription } = await req.json()

  const prompt = `You are an expert resume writer. Create a compelling 2-3 sentence professional summary for a resume.

The person has:
- Experience: ${experience.map((e: any) => `${e.title} at ${e.company}`).join(", ")}
- Skills: ${skills.join(", ")}
- Current summary: ${personalInfo.summary}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Create a professional summary that:
1. Highlights key achievements and expertise
2. Is ATS-optimized with relevant keywords
3. Is compelling and concise
4. ${jobDescription ? "Aligns with the job description" : "Is general and versatile"}

Respond with only the summary text, no additional formatting.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt,
      maxOutputTokens: 300,
      temperature: 0.7,
    })

    return Response.json({ summary: text.trim() })
  } catch (error) {
    console.error("Error optimizing summary:", error)
    return Response.json({ error: "Failed to optimize summary" }, { status: 500 })
  }
}

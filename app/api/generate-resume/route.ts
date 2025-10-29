import { generateText } from "ai"

export async function POST(req: Request) {
  const { resume, jobDescription } = await req.json()

  const prompt = `You are an expert resume writer and ATS optimization specialist. 
  
Based on the following resume information and job description, generate an optimized resume with:
1. A compelling professional summary tailored to the job
2. Improved bullet points for each experience entry that highlight relevant skills and achievements
3. Suggested keywords from the job description that should be included
4. ATS-optimized formatting recommendations

Resume Information:
- Name: ${resume.personalInfo.fullName}
- Email: ${resume.personalInfo.email}
- Phone: ${resume.personalInfo.phone}
- Location: ${resume.personalInfo.location}
- Current Summary: ${resume.personalInfo.summary}

Experience:
${resume.experience.map((exp: any) => `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`).join("\n")}

Education:
${resume.education.map((edu: any) => `- ${edu.degree} in ${edu.field} from ${edu.school} (${edu.year})`).join("\n")}

Skills: ${resume.skills.join(", ")}

Job Description:
${jobDescription}

Please provide:
1. An optimized professional summary (2-3 sentences)
2. For each experience entry, provide 3-4 improved bullet points
3. A list of top 10 keywords from the job description that should be emphasized
4. Any additional skills that should be added based on the job description

Format your response as JSON with the following structure:
{
  "summary": "...",
  "experienceBullets": [
    {
      "title": "...",
      "company": "...",
      "bullets": ["...", "...", "..."]
    }
  ],
  "keywords": ["...", "..."],
  "suggestedSkills": ["...", "..."]
}`

  try {
    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt,
      maxOutputTokens: 2000,
      temperature: 0.7,
    })

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const result = JSON.parse(jsonMatch[0])
    return Response.json(result)
  } catch (error) {
    console.error("Error generating resume:", error)
    return Response.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}

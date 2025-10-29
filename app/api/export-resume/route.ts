import { jsPDF } from "jspdf"

export async function POST(req: Request) {
  const { resume, format } = await req.json()

  try {
    if (format === "pdf") {
      // Create PDF using jsPDF
      const doc = new jsPDF()
      let yPosition = 20
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      const maxWidth = pageWidth - 2 * margin

      // Helper function to add text with wrapping
      const addWrappedText = (text: string, fontSize: number, isBold = false) => {
        doc.setFontSize(fontSize)
        if (isBold) doc.setFont(undefined, "bold")
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, margin, yPosition)
        yPosition += lines.length * (fontSize / 2.5) + 2
        if (isBold) doc.setFont(undefined, "normal")
      }

      // Header
      addWrappedText(resume.personalInfo.fullName, 16, true)

      // Contact info
      const contactInfo = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location]
        .filter(Boolean)
        .join(" • ")
      addWrappedText(contactInfo, 10)
      yPosition += 5

      // Professional Summary
      if (resume.personalInfo.summary) {
        addWrappedText("PROFESSIONAL SUMMARY", 11, true)
        addWrappedText(resume.personalInfo.summary, 10)
        yPosition += 3
      }

      // Experience
      if (resume.experience.length > 0) {
        addWrappedText("EXPERIENCE", 11, true)
        resume.experience.forEach((exp: any) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage()
            yPosition = 20
          }
          addWrappedText(`${exp.title} at ${exp.company}`, 10, true)
          addWrappedText(`${exp.startDate} - ${exp.endDate}`, 9)
          addWrappedText(exp.description, 9)
          yPosition += 3
        })
        yPosition += 3
      }

      // Education
      if (resume.education.length > 0) {
        if (yPosition > pageHeight - 30) {
          doc.addPage()
          yPosition = 20
        }
        addWrappedText("EDUCATION", 11, true)
        resume.education.forEach((edu: any) => {
          addWrappedText(`${edu.degree} in ${edu.field}`, 10, true)
          addWrappedText(`${edu.school} • ${edu.year}`, 9)
          yPosition += 3
        })
        yPosition += 3
      }

      // Skills
      if (resume.skills.length > 0) {
        if (yPosition > pageHeight - 20) {
          doc.addPage()
          yPosition = 20
        }
        addWrappedText("SKILLS", 11, true)
        const skillsText = resume.skills.join(", ")
        addWrappedText(skillsText, 9)
      }

      const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${resume.personalInfo.fullName || "resume"}.pdf"`,
        },
      })
    } else if (format === "docx") {
      // For DOCX, we'll return a simple formatted text that can be opened in Word
      // In production, you'd use a library like docx or mammoth
      const docContent = `${resume.personalInfo.fullName}

${[resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location].filter(Boolean).join(" • ")}

PROFESSIONAL SUMMARY
${resume.personalInfo.summary}

EXPERIENCE
${resume.experience
  .map(
    (exp: any) =>
      `${exp.title} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}`,
  )
  .join("\n\n")}

EDUCATION
${resume.education.map((edu: any) => `${edu.degree} in ${edu.field}\n${edu.school} • ${edu.year}`).join("\n\n")}

SKILLS
${resume.skills.join(", ")}`

      return new Response(docContent, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${resume.personalInfo.fullName || "resume"}.docx"`,
        },
      })
    }

    return Response.json({ error: "Invalid format" }, { status: 400 })
  } catch (error) {
    console.error("Error exporting resume:", error)
    return Response.json({ error: "Failed to export resume" }, { status: 500 })
  }
}

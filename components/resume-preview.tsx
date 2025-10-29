"use client"

import { Card } from "@/components/ui/card"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    year: number
  }>
  skills: string[]
}

interface ResumePreviewProps {
  resume: ResumeData
  template?: string
}

export default function ResumePreview({ resume, template = "modern" }: ResumePreviewProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case "classic":
        return {
          container: "border-l-4 border-slate-900",
          header: "border-b-2 border-slate-900",
          sectionTitle: "text-slate-900 border-b border-slate-300",
        }
      case "minimal":
        return {
          container: "bg-slate-50",
          header: "border-b border-slate-200",
          sectionTitle: "text-slate-900",
        }
      default: // modern
        return {
          container: "bg-gradient-to-br from-blue-50 to-white",
          header: "border-b-2 border-blue-500",
          sectionTitle: "text-blue-600 border-b-2 border-blue-200",
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <Card className={`p-8 bg-white border-slate-200 shadow-lg ${styles.container}`}>
      <div className="space-y-6 text-sm">
        {/* Header */}
        <div className={`pb-4 ${styles.header}`}>
          <h1 className="text-2xl font-bold text-slate-900">{resume.personalInfo.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-4 text-slate-600 mt-2 text-xs">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wide mb-2 pb-1 ${styles.sectionTitle}`}>
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-xs">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wide mb-3 pb-1 ${styles.sectionTitle}`}>Experience</h2>
            <div className="space-y-3">
              {resume.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900">{exp.title || "Job Title"}</p>
                      <p className="text-slate-600">{exp.company || "Company"}</p>
                    </div>
                    <p className="text-slate-600 text-xs">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="text-slate-700 mt-1 text-xs leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wide mb-3 pb-1 ${styles.sectionTitle}`}>Education</h2>
            <div className="space-y-2">
              {resume.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-slate-900">
                    {edu.degree || "Degree"} in {edu.field || "Field"}
                  </p>
                  <p className="text-slate-600">
                    {edu.school || "School"} • {edu.year || "Year"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wide mb-2 pb-1 ${styles.sectionTitle}`}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded text-xs ${
                    template === "classic"
                      ? "bg-slate-200 text-slate-900"
                      : template === "minimal"
                        ? "bg-slate-100 text-slate-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

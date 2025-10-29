"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Sparkles, Download, Loader, Save } from "lucide-react"
import ResumePreview from "@/components/resume-preview"
import ExportDialog from "@/components/export-dialog"
import TemplateSelector from "@/components/template-selector"
import { useResumeStore } from "@/lib/resume-store"

export default function BuilderPage() {
  const {
    resume,
    template,
    setTemplate,
    updatePersonalInfo,
    addExperience,
    removeExperience,
    updateExperience,
    addEducation,
    removeEducation,
    updateEducation,
    addSkill,
    removeSkill,
    updateSkill,
    saveResume,
    getSavedResumes,
  } = useResumeStore()
  const [activeTab, setActiveTab] = useState("personal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [showJobInput, setShowJobInput] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [resumeName, setResumeName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleGenerateAI = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description first")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) throw new Error("Failed to generate resume")

      const data = await response.json()

      updatePersonalInfo({ summary: data.summary })

      data.experienceBullets.forEach((exp: any, idx: number) => {
        if (idx < resume.experience.length) {
          updateExperience(idx, {
            description: exp.bullets.join("\n• "),
          })
        }
      })

      data.suggestedSkills.forEach((skill: string) => {
        if (!resume.skills.includes(skill)) {
          addSkill()
          updateSkill(resume.skills.length, skill)
        }
      })

      alert("Resume optimized successfully!")
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate resume. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveResume = () => {
    if (!resumeName.trim()) {
      alert("Please enter a resume name")
      return
    }
    saveResume(resumeName)
    alert(`Resume saved as "${resumeName}"`)
    setShowSaveDialog(false)
    setResumeName("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowJobInput(!showJobInput)}>
              <Sparkles className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
            <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowExportDialog(true)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Description Input */}
        {showJobInput && (
          <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Paste Job Description</h3>
            <Textarea
              placeholder="Paste the job description here to tailor your resume..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleGenerateAI}
                disabled={isGenerating || !jobDescription.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Optimized Resume
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowJobInput(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Save Dialog */}
        {showSaveDialog && (
          <Card className="mb-6 p-6 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Save Resume</h3>
            <Input
              placeholder="Enter resume name (e.g., 'Software Engineer - 2025')"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button onClick={handleSaveResume} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Resume
              </Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <Input
                        placeholder="John Doe"
                        value={resume.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={resume.personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        value={resume.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <Input
                        placeholder="City, State"
                        value={resume.personalInfo.location}
                        onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Professional Summary</label>
                      <Textarea
                        placeholder="Brief overview of your professional background..."
                        value={resume.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Work Experience</h3>
                    <Button size="sm" variant="outline" onClick={() => addExperience()}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {resume.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-slate-900">Position {idx + 1}</h4>
                          <Button size="sm" variant="ghost" onClick={() => removeExperience(idx)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateExperience(idx, { title: e.target.value })}
                        />
                        <Input
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, { company: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Start Date"
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
                          />
                          <Input
                            placeholder="End Date"
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
                          />
                        </div>
                        <Textarea
                          placeholder="Job description and achievements..."
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(idx, { description: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                    <Button size="sm" variant="outline" onClick={() => addEducation()}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-slate-900">School {idx + 1}</h4>
                          <Button size="sm" variant="ghost" onClick={() => removeEducation(idx)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        <Input
                          placeholder="School/University Name"
                          value={edu.school}
                          onChange={(e) => updateEducation(idx, { school: e.target.value })}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(idx, { degree: e.target.value })}
                        />
                        <Input
                          placeholder="Field of Study"
                          value={edu.field}
                          onChange={(e) => updateEducation(idx, { field: e.target.value })}
                        />
                        <Input
                          placeholder="Graduation Year"
                          type="number"
                          value={edu.year}
                          onChange={(e) => updateEducation(idx, { year: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
                    <Button size="sm" variant="outline" onClick={() => addSkill()}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {resume.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          placeholder="Skill name"
                          value={skill}
                          onChange={(e) => updateSkill(idx, e.target.value)}
                          className="flex-1"
                        />
                        <Button size="sm" variant="ghost" onClick={() => removeSkill(idx)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="sticky top-24 h-fit space-y-4">
            <TemplateSelector selectedTemplate={template} onSelectTemplate={setTemplate} />
            <ResumePreview resume={resume} template={template} />
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      {showExportDialog && <ExportDialog resume={resume} onClose={() => setShowExportDialog(false)} />}
    </div>
  )
}

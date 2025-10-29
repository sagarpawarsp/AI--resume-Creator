"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, File } from "lucide-react"

interface ExportDialogProps {
  resume: any
  onClose: () => void
}

export default function ExportDialog({ resume, onClose }: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: "pdf" | "docx") => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/export-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, format }),
      })

      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${resume.personalInfo.fullName || "resume"}.${format === "pdf" ? "pdf" : "docx"}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to export resume")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Download Resume</h2>
        <p className="text-slate-600 mb-6">Choose your preferred format:</p>

        <div className="space-y-3">
          <Button
            onClick={() => handleExport("pdf")}
            disabled={isExporting}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download as PDF
          </Button>
          <Button
            onClick={() => handleExport("docx")}
            disabled={isExporting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <File className="w-4 h-4 mr-2" />
            Download as DOCX
          </Button>
        </div>

        <Button variant="outline" onClick={onClose} disabled={isExporting} className="w-full mt-4 bg-transparent">
          Cancel
        </Button>
      </Card>
    </div>
  )
}

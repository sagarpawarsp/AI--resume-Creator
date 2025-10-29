"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean, contemporary design with accent colors",
      preview: "bg-gradient-to-br from-blue-50 to-slate-50",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional, professional layout",
      preview: "bg-white border-l-4 border-slate-900",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Minimalist design with focus on content",
      preview: "bg-slate-50",
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">Resume Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <button key={template.id} onClick={() => onSelectTemplate(template.id)} className="relative">
            <Card
              className={`p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id ? "ring-2 ring-blue-500 border-blue-500" : "hover:border-slate-300"
              }`}
            >
              <div className={`h-20 rounded mb-3 ${template.preview}`} />
              <p className="text-sm font-medium text-slate-900">{template.name}</p>
              <p className="text-xs text-slate-600 mt-1">{template.description}</p>
            </Card>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

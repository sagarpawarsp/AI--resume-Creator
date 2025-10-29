"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, FileText, Download, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ResumifyAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition">
              How It Works
            </a>
            <Link href="/builder">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-sm font-semibold text-blue-700">✨ AI-Powered Resume Builder</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Create Your Perfect Resume in Minutes
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let AI help you craft an ATS-optimized resume that gets noticed. Generate, edit, and download your
            professional resume instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-slate-300 bg-transparent">
              Upload Resume
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 p-8 border border-slate-200">
            <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Resume Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600">Everything you need to create a standout resume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Generation</h3>
              <p className="text-slate-600">
                Let AI analyze your experience and generate compelling resume content optimized for ATS systems.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-Time Preview</h3>
              <p className="text-slate-600">
                See your resume update instantly as you type. Choose from multiple professional templates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Multiple Formats</h3>
              <p className="text-slate-600">
                Download your resume as PDF or DOCX. Perfect for any application or job board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">How It Works</h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Fill Your Information",
                desc: "Enter your personal details, experience, education, and skills",
              },
              {
                step: 2,
                title: "Add Job Description",
                desc: "Paste the job description to tailor your resume for that specific role",
              },
              {
                step: 3,
                title: "Generate with AI",
                desc: "Let our AI create optimized content and suggest improvements",
              },
              { step: 4, title: "Download & Apply", desc: "Download your ATS-ready resume and start applying" },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Resume?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who've landed their dream jobs with ResumifyAI
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg">
              Start Building Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white">ResumifyAI</span>
              </div>
              <p className="text-sm">AI-powered resume builder for modern job seekers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2025 ResumifyAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { create } from "zustand"
import { persist } from "zustand/middleware"

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

interface ResumeStore {
  resume: ResumeData
  template: string
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void
  addExperience: () => void
  removeExperience: (index: number) => void
  updateExperience: (index: number, data: Partial<ResumeData["experience"][0]>) => void
  addEducation: () => void
  removeEducation: (index: number) => void
  updateEducation: (index: number, data: Partial<ResumeData["education"][0]>) => void
  addSkill: () => void
  removeSkill: (index: number) => void
  updateSkill: (index: number, skill: string) => void
  setTemplate: (template: string) => void
  saveResume: (name: string) => void
  loadResume: (name: string) => void
  getSavedResumes: () => string[]
  deleteResume: (name: string) => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
        },
        experience: [],
        education: [],
        skills: [],
      },
      template: "modern",
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),
      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              { title: "", company: "", startDate: "", endDate: "", description: "" },
            ],
          },
        })),
      removeExperience: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((_, i) => i !== index),
          },
        })),
      updateExperience: (index, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp, i) => (i === index ? { ...exp, ...data } : exp)),
          },
        })),
      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              { school: "", degree: "", field: "", year: new Date().getFullYear() },
            ],
          },
        })),
      removeEducation: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((_, i) => i !== index),
          },
        })),
      updateEducation: (index, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu, i) => (i === index ? { ...edu, ...data } : edu)),
          },
        })),
      addSkill: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [...state.resume.skills, ""],
          },
        })),
      removeSkill: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((_, i) => i !== index),
          },
        })),
      updateSkill: (index, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((s, i) => (i === index ? skill : s)),
          },
        })),
      setTemplate: (template) => set({ template }),
      saveResume: (name) => {
        const state = get()
        const saved = JSON.parse(localStorage.getItem("saved_resumes") || "{}")
        saved[name] = state.resume
        localStorage.setItem("saved_resumes", JSON.stringify(saved))
      },
      loadResume: (name) => {
        const saved = JSON.parse(localStorage.getItem("saved_resumes") || "{}")
        if (saved[name]) {
          set({ resume: saved[name] })
        }
      },
      getSavedResumes: () => {
        const saved = JSON.parse(localStorage.getItem("saved_resumes") || "{}")
        return Object.keys(saved)
      },
      deleteResume: (name) => {
        const saved = JSON.parse(localStorage.getItem("saved_resumes") || "{}")
        delete saved[name]
        localStorage.setItem("saved_resumes", JSON.stringify(saved))
      },
    }),
    {
      name: "resume-store",
    },
  ),
)

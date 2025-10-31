# AI--resume-Creator
The AI Resume Builder is a full-stack web application designed to help users create professional resumes effortlessly using artificial intelligence. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, it offers a sleek, modern interface with seamless backend API integration for smart resume generation and optimization.
# 🧠 AI Resume Builder

An **AI-powered Resume Builder** built with **Next.js 14, TypeScript, and Tailwind CSS**.  
This application helps users generate, optimize, and export professional resumes using integrated AI APIs.

---

## 🚀 Features

- ⚡ **AI-Generated Resumes** – Automatically create and format resumes using smart AI models  
- 🧩 **Template Selector** – Choose from multiple resume templates  
- 🧠 **Summary Optimizer** – Improve your resume summary with AI  
- 📄 **Export Options** – Download your resume as PDF or Word  
- 🎨 **Modern UI** – Built with ShadCN/UI + Tailwind for a sleek and responsive design  
- 🔒 **Serverless APIs** – Next.js route handlers for all backend logic  

---

## 🧰 Tech Stack

| Category | Tools / Frameworks |
|-----------|--------------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, PostCSS |
| **UI Library** | ShadCN/UI (Radix Primitives) |
| **AI Layer** | OpenAI / Custom AI APIs (see `app/api/` routes) |
| **Package Manager** | pnpm (recommended) |

---ai-resume-builder/
├── app/
│ ├── api/
│ │ ├── generate-resume/route.ts # AI resume generation
│ │ ├── optimize-summary/route.ts # AI summary optimization
│ │ └── export-resume/route.ts # Export logic (PDF/docx)
│ ├── builder/page.tsx # Resume builder UI page
│ ├── layout.tsx # Root layout
│ └── globals.css # Global styles
├── components/
│ ├── ui/ # ShadCN reusable UI components
│ ├── resume-preview.tsx
│ ├── export-dialog.tsx
│ └── template-selector.tsx
├── package.json
├── next.config.mjs
├── tsconfig.json
└── postcss.config.mjs


---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js **v18+**
- pnpm (**recommended**) or npm/yarn

### Steps

```bash
# 1️⃣ Clone this repository
git clone https://github.com/yourusername/ai-resume-builder.git

# 2️⃣ Navigate to the project folder
cd ai-resume-builder

# 3️⃣ Install dependencies
pnpm install
# or
npm install

# 4️⃣ Run the development server
pnpm run dev
# or
npm run dev
| Endpoint                | Description                              |
| ----------------------- | ---------------------------------------- |
| `/api/generate-resume`  | Generates a full resume using AI         |
| `/api/optimize-summary` | Enhances user summaries and descriptions |
| `/api/export-resume`    | Exports resume to PDF or DOCX            |
🧠 Environment Variables

Create a .env.local file in the root folder:

OPENAI_API_KEY=your_openai_api_key_here


(If your app uses another AI provider, adjust accordingly.)

🛠️ Build for Production
pnpm run build
pnpm start
Sagar Pawar
Software Developer | Full-Stack Engineer
🌐 LinkedIn
 · GitHub

## 📁 Folder Structure


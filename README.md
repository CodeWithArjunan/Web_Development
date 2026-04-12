# 🌐 Web Development Projects

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

> A growing collection of frontend projects built while learning **HTML, CSS, JavaScript, React**, and AI-powered tooling. Each folder is a standalone project or structured learning module.

---

## 📋 Table of Contents

- [Repository Structure](#-repository-structure)
- [HTML & CSS Projects](#-html--css-projects)
- [JavaScript Projects](#-javascript-projects)
- [React Learning Series](#-react--learning-series)
- [Agentic Resume Screening](#-agentic-resume-screening)
- [Getting Started](#-getting-started)
- [Learning Roadmap](#-learning-roadmap)
- [Connect](#-connect-with-me)

---

## 📁 Repository Structure

```
Web_Development/
│
├── 📂 HTML & CSS/
│   ├── DejitalClock--main/            # Real-time digital clock
│   ├── Genarate_OR_Code/              # QR Code generator
│   ├── MusicBox--main/                # Music player UI
│   └── create-a-calculator--main/     # Functional calculator
│
├── 📂 JavaScript/
│   └── create-a-Amazon-Mo.../         # Amazon-style e-commerce clone
│       ├── Javascript/
│       ├── backend/
│       ├── data/
│       ├── styles/
│       ├── amazon.html
│       ├── checkout.html
│       ├── orders.html
│       └── tracking.html
│
├── 📂 React/
│   ├── EP-2 Project-Setup
│   ├── Ep3-Component
│   ├── EP4_Style-EventHandling
│   ├── EP5-State
│   ├── EP6-Conditional_Rendering
│   ├── EP7-DataPassing
│   ├── EP8_ContextAPI
│   ├── EP9_ListRendering
│   ├── EP10_ControlInput
│   └── EP11_TodoApp
│
└── 📂 Agentic_Resume_Screening/       # AI-powered resume screener
    ├── app/
    │   ├── agents/
    │   │   ├── candidate_evaluation_agent.py
    │   │   ├── jd_extractor_agent.py
    │   │   └── resume_extractor_agent.py
    │   ├── main.py
    │   ├── parsepdf.py
    │   ├── prompts.py
    │   └── resume_screener.py
    ├── resources/
    ├── ui/
    ├── output.json
    └── requirements.txt
```

---

## 🎨 HTML & CSS Projects

| # | Project | Description | Tech |
|---|---|---|---|
| 1 | [Digital Clock](./HTML%20%26%20CSS/DejitalClock--main) | Real-time clock updating every second with a clean modern UI | HTML, CSS, JS |
| 2 | [QR Code Generator](./HTML%20%26%20CSS/Genarate_OR_Code) | Generates scannable QR codes from any text or URL input | HTML, CSS, JS |
| 3 | [Music Box](./HTML%20%26%20CSS/MusicBox--main) | Interactive music player UI with playback controls | HTML, CSS, JS |
| 4 | [Calculator](./HTML%20%26%20CSS/create-a-calculator--main) | Fully functional calculator with all basic arithmetic operations | HTML, CSS, JS |

---

## ⚡ JavaScript Projects

| # | Project | Description | Tech |
|---|---|---|---|
| 1 | [Amazon Clone](./JavaScript/create-a-Amazon-Mo...) | Multi-page Amazon-style e-commerce site with product listing, cart, checkout, orders & order tracking | HTML, CSS, JS |

### Amazon Clone — Pages

| Page | Description |
|---|---|
| `amazon.html` | Main product listing / homepage |
| `checkout.html` | Cart and checkout flow |
| `orders.html` | Order history page |
| `tracking.html` | Live order tracking page |

---

## ⚛️ React — Learning Series

A structured React learning series covering all core concepts from setup to a complete mini-app.

| Episode | Folder | Topic | Key Concepts |
|---|---|---|---|
| EP-2 | [EP-2 Project-Setup](./React/EP-2%20Project-Setup) | Project Setup | Vite / CRA, folder structure, first render |
| EP-3 | [Ep3-Component](./React/Ep3-Component) | Components | Functional components, JSX syntax |
| EP-4 | [EP4_Style-EventHandling](./React/EP4_Style-EventHandling) | Styling & Events | CSS modules, `onClick`, event handlers |
| EP-5 | [EP5-State](./React/EP5-State) | State | `useState` hook, re-rendering |
| EP-6 | [EP6-Conditional_Rendering](./React/EP6-Conditional_Rendering) | Conditional Rendering | Ternary operator, `&&` short-circuit |
| EP-7 | [EP7-DataPassing](./React/EP7-DataPassing) | Data Passing | Props, parent → child communication |
| EP-8 | [EP8_ContextAPI](./React/EP8_ContextAPI) | Context API | `useContext`, `createContext`, global state |
| EP-9 | [EP9_ListRendering](./React/EP9_ListRendering) | List Rendering | `.map()`, unique keys, dynamic lists |
| EP-10 | [EP10_ControlInput](./React/EP10_ControlInput) | Controlled Inputs | Controlled vs uncontrolled form inputs |
| EP-11 | [EP11_TodoApp](./React/EP11_TodoApp) | Todo App | Full mini-app combining all React concepts |

---

## 🤖 Agentic Resume Screening

An AI-powered resume screening tool built with Python using a **multi-agent architecture**. It automatically parses job descriptions, extracts resume data, and scores candidates.

| Module | Role |
|---|---|
| `jd_extractor_agent.py` | Extracts required skills & qualifications from job descriptions |
| `resume_extractor_agent.py` | Parses and extracts structured data from PDF resumes |
| `candidate_evaluation_agent.py` | Scores and evaluates candidates against the job description |
| `resume_screener.py` | Orchestrates the full multi-agent screening pipeline |
| `parsepdf.py` | PDF reading and text extraction utilities |
| `prompts.py` | LLM prompt templates for each agent |
| `output.json` | Final structured screening results |

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/CodeWithArjunan/Web_Development.git
cd Web_Development
```

### Run any HTML / CSS / JS project

Open `index.html` in your browser directly, or use the **Live Server** extension in VS Code for hot reload.

### Run a React project

```bash
cd "React/EP11_TodoApp"
npm install
npm start
```

### Run the Resume Screening tool

```bash
cd Agentic_Resume_Screening
pip install -r requirements.txt
python app/main.py
```

---

## 📈 Learning Roadmap

- [x] HTML5 & CSS3 fundamentals
- [x] JavaScript (DOM manipulation, events, async)
- [x] Mini projects — Clock, Calculator, QR Generator, Music Box
- [x] JavaScript — Amazon Clone (multi-page app)
- [x] React core concepts (components, state, props, context, hooks)
- [x] React — Todo App (capstone mini project)
- [x] Agentic AI with Python (multi-agent pipeline)
- [ ] Next.js & Server Side Rendering
- [ ] TypeScript
- [ ] Full Stack (Node.js / Django + REST API)
- [ ] Deployment (Vercel, Netlify, AWS)

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Markup & Styling** | HTML5, CSS3 |
| **Scripting** | JavaScript ES6+ |
| **Frontend Framework** | React.js |
| **AI / Backend** | Python, LLM Agents |
| **Tools** | VS Code, Git & GitHub, Vite, Live Server |

---

## 🤝 Connect with Me

[![GitHub](https://img.shields.io/badge/GitHub-CodeWithArjunan-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CodeWithArjunan)

---

> ⭐ **Star this repo** if you find it useful or are following along the learning journey!

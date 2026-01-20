# 🧪 Alignment Lab

> An interactive educational platform for exploring AI alignment concepts through hands-on simulation.

![Research Prototype](https://img.shields.io/badge/Status-Research%20Prototype-blue)
![Version](https://img.shields.io/badge/Version-1.0-green)

## 🎯 What is Alignment Lab?

Alignment Lab transforms abstract AI safety concepts into visceral, hands-on experiences. Users design AI systems, watch them fail in realistic ways, and learn why alignment is humanity's most critical technical challenge.

### Core Features

- **Interactive Simulation Engine** - Design goals, set constraints, deploy systems
- **Irreversible Deployment** - Experience the weight of deploying AI that can't be easily recalled
- **Hidden Variables** - Discover metrics you didn't optimize for (like Public Trust)
- **Deceptive Scenarios** - See how "Maximize Happiness" leads to wireheading
- **Interactive Reflection** - Quiz-based learning with real-world context
- **AI-Powered Narratives** - Dynamic outcomes via Groq/Llama 3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account (for auth)
- Groq API key (for AI simulations)

### Installation

```bash
# Clone the repository
git clone https://github.com/soham999a/AI-alignment.git
cd AI-alignment

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```env
VITE_GROQ_API_KEY=your_groq_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS |
| State | Zustand |
| Routing | React Router DOM |
| Visualization | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| AI | Groq SDK (Llama 3 70B) |
| Backend | Firebase (Auth + Firestore) |

## 📚 Learning Outcomes

Users will understand:

- **Reward Hacking** - Systems game metrics without achieving intent
- **Instrumental Convergence** - Sub-goals like self-preservation emerge naturally
- **Goodhart's Law** - When a measure becomes a target, it ceases to be good
- **Deployment Risk** - Alignment must be solved before deployment

## 🌐 Deployment

This project is configured for Vercel deployment:

```bash
npm run build
```

## 📄 License

MIT License - Built for educational purposes.

## 👤 Author

**Soham**

- Twitter: [@dassoham345](https://x.com/dassoham345)
- LinkedIn: [sohamdev999](https://www.linkedin.com/in/sohamdev999/)

---

*Alignment Lab v1.0 — Research Prototype*  
*Built to explore alignment intuition, not to deploy real-world AI systems.*

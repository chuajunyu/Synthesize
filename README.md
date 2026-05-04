# Synthesize

An AI-powered form building and feedback analysis platform. Create surveys, collect responses via an adaptive AI chatbot, and get actionable business insights automatically synthesized from your data.

## Features

- **AI Form Builder** — Generate survey questions from a business context and information goals
- **Manual Form Builder** — Create custom forms with full control over questions
- **AI Chatbot Survey** — Respondents answer through a conversational GPT-4o agent that adapts follow-up questions based on their answers
- **Automated Analysis** — Responses are processed incrementally using GPT-4o to extract sentiment (positive/negative) and actionable suggestions
- **Dashboard** — View aggregated sentiments, statistics, and prioritized actionable insights per form
- **Project Organisation** — Group forms under projects for multi-study workflows

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Radix UI, Redux Toolkit |
| Backend | Python, FastAPI, Uvicorn |
| AI | OpenAI GPT-4o |
| Database | Firebase Firestore |
| Auth | Firebase Authentication (email/password, Google, GitHub) |

## Project Structure

```
Synthesize/
├── backend/
│   ├── main.py                        # FastAPI app & API routes
│   ├── requirements.txt
│   └── services/
│       ├── OpenAiService.py           # GPT-4o: analysis, merging, chatbot
│       ├── FirebaseService.py         # Firestore read/write
│       ├── ChatBotService.py          # Adaptive survey chatbot logic
│       └── utils/
│           └── system_prompt_templates.py
└── frontend/
    ├── app/
    │   ├── auth/                      # Login & signup pages
    │   └── platform/
    │       ├── (withNavbar)/
    │       │   ├── homepage/          # Home dashboard
    │       │   ├── projects/          # Project management
    │       │   ├── form/              # Form creation (AI & manual)
    │       │   ├── formsCreated/      # View forms & responses
    │       │   └── dashboard/        # Insights dashboard
    │       └── (withoutNavbar)/
    │           └── chat/              # AI chatbot survey interface
    ├── components/                    # Reusable UI components
    ├── database/                      # Firebase CRUD functions
    ├── lib/
    │   ├── firebase/                  # Firebase config & auth helpers
    │   └── types.ts                   # Shared TypeScript types
    └── redux/                         # Auth state management
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Firebase project (Firestore enabled)
- OpenAI API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` from the example:

```bash
cp .env.example .env
```

```env
OPENAI_API_KEY="your_openai_api_key"
DATABASE_URL="your_firebase_database_url"
SECRET_KEY="your_secret_key"
```

Place your Firebase service account credentials at `backend/firebase_credentials.json`.

Start the server:

```bash
uvicorn main:app --reload
# API available at http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local` from the example:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_NODE_ENV="local"
NEXT_PUBLIC_MOCK_USER_EMAIL="your_email@example.com"
```

Start the dev server:

```bash
npm run dev
# App available at http://localhost:3000
```

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/get_form_analysis/{formId}?secret=...` | Trigger or retrieve AI analysis for a form |
| POST | `/chat/{projectId}/{formId}` | Send a message to the AI survey chatbot |

The `/get_form_analysis` endpoint uses a 10-minute cache — if an analysis was run within the last 10 minutes it returns the stored result without calling OpenAI again.

## Running Tests

```bash
cd frontend
npm test
```

Tests use Jest + React Testing Library. Coverage reports are written to `frontend/coverage/`.

## Deployment

The frontend is deployed on **Vercel**. The backend CORS policy allows:

- `http://localhost:3000` (local dev)
- `https://synthesize-two.vercel.app` (production)
- `https://synthesize-git-develop-jun-yus-projects.vercel.app` (preview)

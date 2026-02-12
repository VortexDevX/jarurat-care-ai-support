# Jarurat Care — AI-Enabled Patient Support App

A mini healthcare support web application built as an internship assignment
for **Jarurat Care NGO**. The app allows patients, caregivers, and family
members to submit support requests, which are then analyzed by AI to
generate summaries, urgency classifications, and actionable recommendations.

## 🚀 Live Demo

🔗 [Deployed on Vercel](https://your-app.vercel.app)

## 🛠 Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 15 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| AI         | OpenAI GPT-3.5 Turbo    |
| Deployment | Vercel                  |

## 🤖 AI Feature

When a user submits a patient support form, the backend sends the data
to OpenAI's API, which returns:

- **3-line Summary** — concise overview of the request
- **Urgency Level** — Low / Medium / High classification
- **Urgency Reason** — why that level was assigned
- **Recommendation** — actionable next step for volunteers

## 🏥 NGO Use-Case

Jarurat Care receives support requests from cancer patients and caregivers.
Volunteers currently read each request manually to assess priority.

This app automates that workflow:

1. Patient/caregiver fills a structured form
2. AI instantly summarizes and classifies urgency
3. Volunteers see prioritized, actionable summaries
4. Reduces response time for critical cases

## 📂 Project Structure

```
src/
├── app/
│ ├── api/analyze/route.ts ← AI endpoint
│ ├── layout.tsx
│ ├── page.tsx ← Main page
│ └── globals.css
└── components/
├── Header.tsx
├── PatientForm.tsx
├── ResultCard.tsx
└── Footer.tsx
```

## ⚡ Run Locally

Create `.env.local`:

```
OPENAI_API_KEY=sk-your-key
```

```bash
git clone https://github.com/VortexDevX/jarurat-care-app.git
cd jarurat-care-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 License

Built for Jarurat Care NGO internship evaluation.

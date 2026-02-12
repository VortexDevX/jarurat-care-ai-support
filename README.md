# Jarurat Care — AI-Enabled Patient Support App

A mini healthcare support web application built as an internship assignment
for **Jarurat Care NGO**. The app allows patients, caregivers, and family
members to submit support requests, which are then analyzed by AI to
generate summaries, urgency classifications, and actionable non-medical
recommendations.

## ✅ Project Status

This project is a **concept-level prototype** built for internship evaluation.
It focuses on clarity, safety, and responsible AI usage rather than production
scale or clinical decision-making.

## 🚀 Live Demo

🔗 [Deployed on Vercel](https://your-app.vercel.app)

## 🛠 Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 15 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS v4         |
| AI         | Groq (LLaMA 3 family)   |
| Deployment | Vercel                  |

## 🤖 AI Features

> ⚠️ This application does not provide medical advice, diagnosis, or treatment recommendations.

### 1. Support Request Analysis

When a user submits a patient support form, the backend sends the data
to Groq's API, which returns:

- **3-line Summary** — concise overview of the request
- **Urgency Level** — Low / Medium / High classification
- **Urgency Reason** — why that level was assigned
- **Suggested Next Steps** — actionable non-medical recommendation

All recommendations are non-medical, non-diagnostic, and focused on
support coordination, resources, or volunteer actions only.

### 2. FAQ AI Rephraser

The FAQ feature includes an AI-assisted rephrasing layer that helps users
find relevant information from predefined FAQs. The AI does not generate
new content or provide medical advice and safely redirects users when
queries fall outside scope.

**System prompt rule:**

> "You are an assistant that rephrases predefined FAQ answers for a
> healthcare NGO. You must answer ONLY using the provided FAQ content.
> If the question is medical, diagnostic, or outside scope, politely
> refuse and suggest submitting a support request."

**Fallback message:**

> "I can help with general information about Jarurat Care's support
> services. For medical questions or personalised help, please submit
> a support request so our volunteer team can assist you."

The FAQ AI only rephrases existing FAQ content. It cannot generate new
information, provide medical advice, or answer questions outside the
defined FAQ scope.

## 🏥 NGO Use-Case

Jarurat Care receives support requests from cancer patients and caregivers.
Volunteers currently read each request manually to assess priority.

This app automates that workflow:

1. Patient/caregiver fills a structured form
2. AI instantly summarizes and classifies urgency
3. Volunteers see prioritized, actionable summaries
4. Reduces response time for critical cases

Volunteer interaction is supported through volunteer-ready summaries
and clearly prioritized requests, reducing manual triage effort.

## 📄 Pages

| Route  | Purpose                               |
| ------ | ------------------------------------- |
| `/`    | Healthcare Support Form + AI Analysis |
| `/faq` | FAQ with AI-assisted search           |

## 📂 Project Structure

```
src/
├── app/
│ ├── api/
│ │ ├── analyze/route.ts ← Support request AI endpoint
│ │ └── faq/
│ │ ├── route.ts ← FAQ AI rephraser endpoint
│ │ └── log/route.ts ← Query logging endpoint
│ ├── faq/page.tsx ← FAQ page
│ ├── layout.tsx
│ ├── page.tsx ← Main support form page
│ └── globals.css
├── components/
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── PatientForm.tsx
│ ├── ResultCard.tsx
│ ├── Skeleton.tsx
│ ├── Toast.tsx
│ ├── FAQAccordion.tsx
│ └── FAQSearch.tsx
└── data/
└── faqData.ts ← Static FAQ content
```

## ♿ Accessibility

- Keyboard navigation for FAQ accordion (Arrow keys, Enter, Home, End)
- ARIA labels on all interactive elements
- Focus-visible outlines
- Semantic HTML structure
- WCAG AA contrast compliance

## 🖨 Print Support

- Clean print layout for AI analysis results
- Interactive elements hidden in print
- Timestamp and disclaimer preserved

## ⚡ Run Locally

```bash
git clone https://github.com/VortexDevX/jarurat-care-ai-support.git
cd jarurat-care-ai-support
npm install
```

Create `.env.local`:

```
GROQ_API_KEY=gsk_your-key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Data & Privacy Notes

- No personal data is stored permanently
- Requests are processed in-memory for demo purposes
- AI is used only for summarization and prioritization
- No data is shared with third parties

## 🔮 Future Improvements

- Volunteer dashboard for managing requests
- Admin authentication and role-based access
- Persistent storage for requests
- Multilingual support (Hindi + English)
- PDF export for AI analysis reports
- Email notifications for volunteer team

## 📝 License

Built as part of the Jarurat Care NGO internship evaluation.
This project is intended for demonstration and learning purposes only.

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  bullets?: string[];
  category: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Jarurat Care?",
    answer:
      "Jarurat Care is a non-profit organization focused on building one of India's largest cancer care support communities.",
    bullets: [
      "We raise awareness about preventive cancer care.",
      "We support patients, caregivers, and families.",
      "We create sustainable healthcare support networks through mentorship and community.",
    ],
    category: "About",
  },
  {
    id: 2,
    question: "Who can request support from Jarurat Care?",
    answer:
      "Cancer patients, their caregivers, and family members can request support.",
    bullets: [
      "We welcome anyone affected by a cancer diagnosis.",
      "Support includes financial aid, emotional support, healthcare-related information and support coordination, transportation, and treatment information.",
    ],
    category: "Eligibility",
  },
  {
    id: 3,
    question: "Is Jarurat Care's support free?",
    answer:
      "Yes, all support services coordinated through Jarurat Care are provided free of charge.",
    bullets: [
      "We are a non-profit funded by donations and community contributions.",
      "There are no hidden fees or costs.",
    ],
    category: "About",
  },
  {
    id: 4,
    question: "How do I submit a support request?",
    answer:
      "You can submit a support request through the Healthcare Support Request form on our website.",
    bullets: [
      "Fill in your details including the type of support you need.",
      "Describe your situation briefly.",
      "Our volunteer team will review and respond as soon as possible.",
    ],
    category: "Process",
  },
  {
    id: 5,
    question: "How long does it take to get a response?",
    answer: "Our volunteer team reviews requests regularly.",
    bullets: [
      "High-urgency requests are prioritized and are usually reviewed as quickly as possible, often within 24 hours depending on volunteer availability.",
      "Medium and low urgency requests are typically handled within 2–5 business days.",
    ],
    category: "Process",
  },
  {
    id: 6,
    question: "What kind of financial assistance is available?",
    answer:
      "Jarurat Care connects patients with available financial support resources.",
    bullets: [
      "This includes government schemes, hospital charity programs, and crowdfunding guidance.",
      "We help navigate the process but do not directly provide monetary funds.",
    ],
    category: "Support",
  },
  {
    id: 7,
    question: "Does Jarurat Care provide medical advice?",
    answer:
      "No. Jarurat Care does not provide medical advice, diagnosis, or treatment recommendations.",
    bullets: [
      "We connect patients with verified informational resources.",
      "We help them prepare questions for their healthcare professionals.",
      "For medical decisions, please consult licensed healthcare professionals.",
    ],
    category: "Medical",
  },
  {
    id: 8,
    question: "How can I volunteer with Jarurat Care?",
    answer:
      "You can register as a volunteer through our Volunteer Registration page.",
    bullets: [
      "We welcome people with diverse skills including counseling, logistics, and outreach.",
      "No medical background is required for most volunteer roles.",
    ],
    category: "Volunteering",
  },
  {
    id: 9,
    question: "What emotional support services are available?",
    answer:
      "Jarurat Care connects individuals with trained support volunteers and peer support groups.",
    bullets: [
      "We facilitate connections with verified counseling resources.",
      "We do not provide therapy directly but help you find appropriate support.",
    ],
    category: "Support",
  },
  {
    id: 10,
    question: "Can caregivers also seek help?",
    answer:
      "Absolutely. Caregiver burnout is real and we actively support caregivers.",
    bullets: [
      "You can submit a support request as a caregiver.",
      "Access emotional support resources, respite care information, and connect with other caregivers.",
    ],
    category: "Eligibility",
  },
  {
    id: 11,
    question: "How is my data handled?",
    answer:
      "Your information is used solely to process and prioritize your support request.",
    bullets: [
      "We do not sell or share personal data with third parties.",
      "AI is used only to summarize and classify requests for our volunteer team.",
    ],
    category: "Privacy",
  },
  {
    id: 12,
    question: "What does the AI feature do?",
    answer:
      "Our AI feature summarizes support requests and classifies their urgency level to help volunteers prioritize responses.",
    bullets: [
      "The AI summarizes requests to help volunteers triage; it does not diagnose or recommend treatments.",
      "It is a workflow tool, not a clinical tool.",
    ],
    category: "AI",
  },
  {
    id: 13,
    question: "Can Jarurat Care help with transportation to hospitals?",
    answer: "Jarurat Care can help coordinate transportation support.",
    bullets: [
      "We connect patients with local volunteer drivers and community transport services.",
      "NGO partners may also provide travel assistance for treatment visits.",
    ],
    category: "Support",
  },
  {
    id: 14,
    question: "Is Jarurat Care available across India?",
    answer: "Jarurat Care is building a pan-India support network.",
    bullets: [
      "Our strongest volunteer presence is currently in major cities.",
      "We accept requests from anywhere in India and connect you with local resources.",
    ],
    category: "About",
  },
  {
    id: 15,
    question: "How do I contact Jarurat Care directly?",
    answer: "You can reach us through the support request form on our website.",
    bullets: [
      "Additional contact options may be available on Jarurat Care's official channels.",
    ],
    category: "Contact",
  },
];

export const faqCategories = [
  "All",
  "About",
  "Eligibility",
  "Process",
  "Support",
  "Medical",
  "Volunteering",
  "Privacy",
  "AI",
  "Contact",
];

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: faqData.length };
  faqData.forEach((faq) => {
    counts[faq.category] = (counts[faq.category] || 0) + 1;
  });
  return counts;
}

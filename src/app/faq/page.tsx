"use client";

import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import FAQSearch, { AIAnswerCard } from "@/components/FAQSearch";
import { faqData, faqCategories, getCategoryCounts } from "@/data/faqData";
import { FaInfoCircle, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

interface AIResult {
  answer: string;
  matchedFaqId: number | null;
  matched: boolean;
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [aiResult, setAIResult] = useState<AIResult | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const filteredFAQs = useMemo(() => {
    let items = faqData;

    // Category filter
    if (activeCategory !== "All") {
      items = items.filter((faq) => faq.category === activeCategory);
    }

    // Text filter from search input
    if (textFilter.trim()) {
      const lower = textFilter.toLowerCase();
      items = items.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lower) ||
          faq.answer.toLowerCase().includes(lower) ||
          faq.bullets?.some((b) => b.toLowerCase().includes(lower)),
      );
    }

    return items;
  }, [activeCategory, textFilter]);

  const handleAIResponse = useCallback((result: AIResult) => {
    setAIResult(result);
  }, []);

  const handleFilterChange = useCallback((query: string) => {
    setTextFilter(query);
    setLastQuery(query);
  }, []);

  const clearAIResponse = useCallback(() => {
    setAIResult(null);
  }, []);

  return (
    <>
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 print:hidden"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-gray-600 transition no-underline"
          >
            Home
          </Link>
          <FaChevronRight className="text-[8px]" />
          <span className="text-gray-600 font-medium">FAQ</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked <span className="text-rose-600">Questions</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Find answers to common questions about Jarurat Care&apos;s support
            services, or ask in your own words using our AI assistant.
          </p>

          {/* Page disclaimer */}
          <div className="inline-flex items-center gap-1.5 mt-3">
            <FaInfoCircle className="text-gray-400 text-xs" />
            <p className="text-xs text-gray-500">
              This section provides general information only. No medical advice
              is given.
            </p>
          </div>
        </div>

        {/* AI Search — hidden in print */}
        <div className="mb-6 print:hidden">
          <FAQSearch
            onAIResponse={handleAIResponse}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* AI Response */}
        {aiResult && (
          <div className="mb-6">
            <AIAnswerCard
              result={aiResult}
              query={lastQuery}
              onDismiss={clearAIResponse}
            />
          </div>
        )}

        {/* Category Filters — sticky, scrollable */}
        <div className="sticky top-0 z-10 bg-[#f8f9fb] pb-3 pt-1 print:hidden">
          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
            role="tablist"
            aria-label="FAQ category filters"
          >
            {faqCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Filter by ${cat}, ${count} questions`}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition cursor-pointer shrink-0 min-h-11 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isActive
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  {cat}
                  <span
                    className={`text-xs ${
                      isActive
                        ? "bg-white/20 text-white px-1.5 py-0.5 rounded-full"
                        : "text-gray-400"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Count */}
        <div className="flex items-center justify-between mb-4 print:hidden">
          <p className="text-xs text-gray-400">
            Showing {filteredFAQs.length} of {faqData.length} questions
            {textFilter.trim() && (
              <span className="ml-1">
                for &ldquo;
                <span className="font-medium text-gray-600">{textFilter}</span>
                &rdquo;
              </span>
            )}
          </p>
          {textFilter.trim() && (
            <button
              onClick={() => {
                setTextFilter("");
              }}
              className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* FAQ List */}
        <FAQAccordion items={filteredFAQs} />

        {/* Bottom Disclaimer */}
        <div className="mt-8 text-center print:mt-4">
          <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <FaInfoCircle className="text-gray-400 text-xs" />
            <p className="text-xs text-gray-500">
              This section provides general information only. No medical advice
              is given.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

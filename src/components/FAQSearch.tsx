"use client";

import { useState, FormEvent, useCallback } from "react";
import {
  FaSearch,
  FaSpinner,
  FaRobot,
  FaInfoCircle,
  FaFlag,
  FaTimes,
} from "react-icons/fa";

interface FAQSearchResult {
  answer: string;
  matchedFaqId: number | null;
  matched: boolean;
}

interface FAQSearchProps {
  onAIResponse: (result: FAQSearchResult) => void;
  onFilterChange: (query: string) => void;
}

export default function FAQSearch({
  onAIResponse,
  onFilterChange,
}: FAQSearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastQueryTime, setLastQueryTime] = useState(0);

  const RATE_LIMIT_MS = 3000;

  const handleInputChange = (value: string) => {
    setQuery(value);
    onFilterChange(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Client-side rate limit
    const now = Date.now();
    if (now - lastQueryTime < RATE_LIMIT_MS) {
      setError("Please wait a moment before asking another question.");
      return;
    }

    setLoading(true);
    setError("");
    setLastQueryTime(now);

    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      onAIResponse({
        answer: data.answer,
        matchedFaqId: data.matchedFaqId,
        matched: data.matched,
      });

      // Log if unmatched
      if (!data.matched) {
        fetch("/api/faq/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query.trim(),
            matched: false,
            matchedFaqId: null,
            type: "unanswered",
          }),
        }).catch(() => {});
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 md:p-6 space-y-4 print:hidden">
      <div className="flex items-center gap-2">
        <FaRobot className="text-rose-500" />
        <h3 className="text-base font-bold text-gray-900">Ask a Question</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Ask a question in your own words (e.g., 'Can you help with transport?')"
            aria-label="Ask a question about Jarurat Care services"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleInputChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
              aria-label="Clear search"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          aria-label="Find answer using AI"
          className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed shrink-0 min-h-11"
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSearch className="text-xs" />
          )}
          <span>Find Answer</span>
        </button>
      </form>

      <p className="text-xs text-gray-500">
        AI will match your question to an existing FAQ. Use plain language.
      </p>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex items-center gap-1.5">
        <FaInfoCircle className="text-gray-300 text-xs shrink-0" />
        <p className="text-xs text-gray-400">
          This section provides general information only. No medical advice is
          given.
        </p>
      </div>
    </div>
  );
}

// AI Answer Display — exported separately for use in page
export function AIAnswerCard({
  result,
  query,
  onDismiss,
}: {
  result: { answer: string; matchedFaqId: number | null; matched: boolean };
  query: string;
  onDismiss: () => void;
}) {
  const [reported, setReported] = useState(false);

  const handleReport = useCallback(async () => {
    try {
      await fetch("/api/faq/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          matched: result.matched,
          matchedFaqId: result.matchedFaqId,
          type: "report",
        }),
      });
      setReported(true);
    } catch {
      // Silent fail
    }
  }, [query, result]);

  return (
    <div className="animate-fade-in print:hidden">
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <FaRobot className="text-rose-500 shrink-0" />
            <h3 className="text-sm font-bold text-rose-800">
              AI Answer (from predefined FAQ)
            </h3>
            <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full border border-rose-200">
              Informational only
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {result.matchedFaqId && (
              <span className="text-xs bg-white text-rose-500 px-2 py-0.5 rounded-full border border-rose-200">
                Source: FAQ #{result.matchedFaqId}
              </span>
            )}
            <button
              onClick={onDismiss}
              aria-label="Dismiss AI answer"
              className="text-xs text-rose-400 hover:text-rose-600 transition cursor-pointer font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Answer */}
        <p className="text-sm text-rose-900 leading-relaxed">{result.answer}</p>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-rose-100">
          <div className="flex items-center gap-1.5">
            <FaInfoCircle className="text-rose-300 text-xs shrink-0" />
            <p className="text-xs text-rose-400">
              This answer rephrases our official FAQ content.
            </p>
          </div>

          {!reported ? (
            <button
              onClick={handleReport}
              className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-600 transition cursor-pointer"
              aria-label="Report incorrect answer"
            >
              <FaFlag className="text-[10px]" />
              Report wrong answer
            </button>
          ) : (
            <span className="text-xs text-rose-500 font-medium">
              ✓ Reported — thank you
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

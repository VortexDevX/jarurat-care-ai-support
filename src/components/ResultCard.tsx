"use client";

import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaHandsHelping,
  FaRobot,
} from "react-icons/fa";

interface AnalysisResult {
  summary: string;
  urgency: "Low" | "Medium" | "High";
  urgencyReason: string;
  suggestedNextSteps: string;
}

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
  source?: "ai" | "fallback";
}

const URGENCY_CONFIG = {
  Low: {
    color: "bg-emerald-50 border-emerald-300 text-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-300",
    icon: <FaCheckCircle className="text-emerald-500" />,
    label: "Low Urgency",
  },
  Medium: {
    color: "bg-amber-50 border-amber-300 text-amber-800",
    badge: "bg-amber-100 text-amber-700 border-amber-300",
    icon: <FaInfoCircle className="text-amber-500" />,
    label: "Medium Urgency",
  },
  High: {
    color: "bg-red-50 border-red-300 text-red-800",
    badge: "bg-red-100 text-red-700 border-red-300",
    icon: <FaExclamationTriangle className="text-red-500" />,
    label: "High Urgency",
  },
};

function getTimestamp(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${month} ${year}, ${time}`;
}

export default function ResultCard({
  result,
  onReset,
  source,
}: ResultCardProps) {
  const config = URGENCY_CONFIG[result.urgency] || URGENCY_CONFIG.Medium;
  const timestamp = getTimestamp();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 md:p-8 space-y-5 animate-fade-in print:shadow-none print:border print:border-gray-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FaRobot className="text-rose-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            AI Analysis
          </h2>
          {source === "fallback" && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
              Rule-Based
            </span>
          )}
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border w-fit ${config.badge}`}
        >
          {config.icon}
          {config.label}
        </span>
      </div>

      {/* 1. Summary */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Summary
        </h3>
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* 2. Urgency Reason */}
      <div className={`rounded-xl p-4 sm:p-5 border ${config.color}`}>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-80">
          Urgency Reason
        </h3>
        <p className="text-sm sm:text-base leading-relaxed">
          {result.urgencyReason}
        </p>
      </div>

      {/* 3. Suggested Next Steps */}
      <div className="bg-blue-50 rounded-xl p-4 sm:p-5 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <FaHandsHelping className="text-blue-500" />
          <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Suggested Next Steps (Non-Medical)
          </h3>
        </div>
        <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
          {result.suggestedNextSteps}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <FaInfoCircle className="text-gray-300 text-xs shrink-0" />
        <p className="text-xs text-gray-400">
          AI is used only to summarize and prioritize requests. No medical
          advice or diagnosis is generated.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1 print:hidden">
        <button
          onClick={onReset}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
        >
          Submit Another Request
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition cursor-pointer"
        >
          Print / Save
        </button>
      </div>

      {/* Timestamp */}
      <div className="text-center pt-2 print:pt-4">
        <p className="text-xs text-gray-400 print:text-gray-600">
          Generated on: {timestamp}
        </p>
      </div>
    </div>
  );
}

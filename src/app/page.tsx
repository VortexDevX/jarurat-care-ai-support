"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatientForm from "@/components/PatientForm";
import ResultCard from "@/components/ResultCard";
import { FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

interface AnalysisResult {
  summary: string;
  urgency: "Low" | "Medium" | "High";
  urgencyReason: string;
  suggestedNextSteps: string;
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [source, setSource] = useState<"ai" | "fallback">("ai");
  const [error, setError] = useState<string>("");

  const handleResult = (data: AnalysisResult, src?: "ai" | "fallback") => {
    setError("");
    setResult(data);
    setSource(src || "ai");
  };

  const handleError = (msg: string) => {
    setResult(null);
    setError(msg);
  };

  const handleReset = () => {
    setResult(null);
    setError("");
  };

  return (
    <>
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10 print:hidden">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Healthcare Support,{" "}
            <span className="text-rose-600">AI-Powered</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Submit a patient support request and let our AI instantly summarize,
            classify urgency, and recommend next steps for the volunteer team.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 print:hidden">
          {[
            { icon: <FaClock />, text: "Instant AI Analysis" },
            { icon: <FaShieldAlt />, text: "Urgency Classification" },
            { icon: <FaUsers />, text: "Volunteer-Ready Summaries" },
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full shadow-sm"
            >
              <span className="text-rose-500">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-6 text-sm animate-fade-in">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Form or Result */}
        {result ? (
          <ResultCard result={result} onReset={handleReset} source={source} />
        ) : (
          <PatientForm onResult={handleResult} onError={handleError} />
        )}
      </main>

      <Footer />
    </>
  );
}

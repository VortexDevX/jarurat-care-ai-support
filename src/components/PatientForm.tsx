"use client";

import { useState, FormEvent } from "react";
import {
  FaPaperPlane,
  FaSpinner,
  FaHandHoldingHeart,
  FaInfoCircle,
} from "react-icons/fa";

interface FormData {
  name: string;
  cancerType: string;
  role: string;
  supportType: string;
  message: string;
}

interface AnalysisResult {
  summary: string;
  urgency: "Low" | "Medium" | "High";
  urgencyReason: string;
  suggestedNextSteps: string;
}

interface PatientFormProps {
  onResult: (data: AnalysisResult, source?: "ai" | "fallback") => void;
  onError: (msg: string) => void;
  onLoading: (loading: boolean) => void;
}

const CANCER_TYPES = [
  "Breast Cancer",
  "Lung Cancer",
  "Oral Cancer",
  "Cervical Cancer",
  "Blood Cancer (Leukemia)",
  "Colorectal Cancer",
  "Prostate Cancer",
  "Stomach Cancer",
  "Liver Cancer",
  "Brain Tumor",
  "Other",
];

const SUPPORT_TYPES = [
  "Financial Assistance",
  "Emotional / Mental Health Support",
  "Medical Guidance",
  "Transportation Help",
  "Caregiver Support",
  "Treatment Information",
  "Other",
];

export default function PatientForm({
  onResult,
  onError,
  onLoading,
}: PatientFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    cancerType: "",
    role: "",
    supportType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        onError(data.error || "Something went wrong.");
        return;
      }

      onResult(data.data, data.source);
    } catch {
      onError("Network error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 md:p-8 space-y-5"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Healthcare Support Request
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below. Our AI will summarize and prioritize your
          request for the volunteer team.
        </p>
      </div>

      {/* 1. Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          You are a <span className="text-rose-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {["Patient", "Caregiver", "Family Member"].map((r) => (
            <label
              key={r}
              className={`flex-1 text-center cursor-pointer border-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                form.role === r
                  ? "bg-rose-50 border-rose-500 text-rose-700 shadow-sm"
                  : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-600"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={form.role === r}
                onChange={handleChange}
                required
                className="sr-only"
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Support Type */}
      <div>
        <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1.5">
          <FaHandHoldingHeart className="text-rose-400 text-xs" />
          What kind of support do you need?{" "}
          <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Select the primary type of help you are looking for.
        </p>
        <select
          name="supportType"
          value={form.supportType}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white"
        >
          <option value="">Select support type</option>
          {SUPPORT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Cancer Type (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cancer Type{" "}
          <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          This helps us route your request more accurately.
        </p>
        <select
          name="cancerType"
          value={form.cancerType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white"
        >
          <option value="">Select cancer type</option>
          {CANCER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* 5. Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe Your Situation <span className="text-rose-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Briefly describe your situation, the kind of help you need, and any urgency or treatment context."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      {/* Submit */}
      <div className="space-y-2 pt-1">
        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <FaPaperPlane />
          Submit Request
        </button>
        <p className="text-xs text-gray-500 text-center">
          Our volunteer team will review and respond as soon as possible.
        </p>
      </div>

      {/* AI Disclosure */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
          <FaInfoCircle className="text-gray-300 shrink-0" />
          AI is used only to summarize and prioritize requests. No medical
          advice or diagnosis is generated.
        </p>
      </div>
    </form>
  );
}

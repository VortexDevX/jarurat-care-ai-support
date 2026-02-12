"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronDown, FaCopy, FaCheck, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const copyAnswer = useCallback(async (item: FAQItem) => {
    const text = item.bullets
      ? `${item.answer}\n${item.bullets.map((b) => `• ${b}`).join("\n")}`
      : item.answer;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number, itemId: number) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (index < items.length - 1) {
            setFocusIndex(index + 1);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (index > 0) {
            setFocusIndex(index - 1);
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          toggle(itemId);
          break;
        case "Home":
          e.preventDefault();
          setFocusIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusIndex(items.length - 1);
          break;
      }
    },
    [items.length, openId],
  );

  useEffect(() => {
    if (focusIndex >= 0 && buttonRefs.current[focusIndex]) {
      buttonRefs.current[focusIndex]?.focus();
    }
  }, [focusIndex]);

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        No FAQs found matching your search.
      </div>
    );
  }

  return (
    <div
      className="space-y-2.5"
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const isCopied = copiedId === item.id;

        return (
          <div
            key={item.id}
            className={`bg-white rounded-xl border transition-all duration-200 ${
              isOpen
                ? "border-rose-200 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index, item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-header-${item.id}`}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left cursor-pointer min-h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1 rounded-xl"
            >
              <span
                className={`text-sm font-medium pr-3 flex-1 ${
                  isOpen ? "text-rose-700" : "text-gray-800"
                }`}
              >
                {item.question}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hidden sm:inline">
                  {item.category}
                </span>
                <FaChevronDown
                  className={`text-gray-400 text-xs transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-header-${item.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 sm:px-5 pb-4 border-t border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed pt-3">
                  {item.answer}
                </p>

                {item.bullets && (
                  <ul className="mt-2 space-y-1.5">
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 leading-relaxed flex gap-2"
                      >
                        <span className="text-rose-400 mt-1 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium no-underline transition"
                    aria-label="Submit a support request for more help"
                  >
                    Need more help?
                    <FaArrowRight className="text-[10px]" />
                  </Link>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyAnswer(item);
                    }}
                    aria-label={`Copy answer for: ${item.question}`}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-2 py-1"
                  >
                    {isCopied ? (
                      <>
                        <FaCheck className="text-emerald-500" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <FaCopy />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

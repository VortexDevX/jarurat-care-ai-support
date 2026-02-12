"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  show,
  onClose,
  duration = 4000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setExiting(false);

      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300
        left-1/2 -translate-x-1/2 top-4 w-[calc(100%-2rem)] max-w-sm
        sm:left-auto sm:translate-x-0 sm:right-6 sm:top-6 sm:w-full
        ${
          exiting
            ? "opacity-0 -translate-y-2 sm:-translate-y-2"
            : "opacity-100 translate-y-0"
        }`}
    >
      <div className="bg-white border border-emerald-200 shadow-lg rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 flex items-start gap-3">
        <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            Request Analyzed
          </p>
          <p className="text-xs text-gray-500 mt-0.5 wrap-break-word">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setExiting(true);
            setTimeout(() => {
              setVisible(false);
              onClose();
            }, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition cursor-pointer shrink-0 p-1"
          aria-label="Dismiss notification"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
}

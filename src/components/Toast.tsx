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
      className={`fixed top-6 right-6 z-50 max-w-sm w-full transition-all duration-300 ${
        exiting ? "opacity-0 -translate-y-2.5" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="bg-white border border-emerald-200 shadow-lg rounded-xl px-5 py-4 flex items-start gap-3">
        <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Request Analyzed
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{message}</p>
        </div>
        <button
          onClick={() => {
            setExiting(true);
            setTimeout(() => {
              setVisible(false);
              onClose();
            }, 300);
          }}
          className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </div>
  );
}

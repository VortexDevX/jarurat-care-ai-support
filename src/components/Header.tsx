"use client";

import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm print:shadow-none">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="bg-rose-100 text-rose-600 p-2 rounded-xl">
            <FaHeartbeat className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              Jarurat Care
            </h1>
            <p className="text-xs text-gray-500">
              Cancer Care Support Community
            </p>
          </div>
        </Link>

        {/* Badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-200 print:hidden">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          AI-Enabled Support
        </span>
      </div>
    </header>
  );
}

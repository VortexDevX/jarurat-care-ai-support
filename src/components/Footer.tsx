"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-16 print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>
          Built with ❤️ for{" "}
          <span className="font-semibold text-gray-700">Jarurat Care NGO</span>
        </p>
        <p className="text-xs sm:text-sm">
          Full Stack Developer (AI-Enabled) — Internship Assignment
        </p>
      </div>
    </footer>
  );
}

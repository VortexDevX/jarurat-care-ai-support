"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

const NAV_LINKS = [
  { href: "/", label: "Support Form" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm print:shadow-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
          aria-label="Go to homepage"
        >
          <div className="bg-rose-100 text-rose-600 p-2 rounded-xl">
            <FaHeartbeat className="text-2xl" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              Jarurat Care
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Cancer Care Support Community
            </p>
          </div>
        </button>

        {/* Nav */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition no-underline relative ${
                    isActive
                      ? "bg-rose-50 text-rose-700 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-200 print:hidden">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            AI-Enabled
          </span>
        </div>
      </div>
    </header>
  );
}

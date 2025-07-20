'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Головна", page: "home" },
    { href: "/events", label: "Події", page: "events" },
    { href: "/archive", label: "Архів", page: "archive" },
    { href: "/blog", label: "Блог", page: "blog" },
    { href: "/contact", label: "Контакти", page: "contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/LiterAktiv_Web.png"
              alt="LiterAktiv Logo"
              width={80}
              height={80}
              className="rounded-lg p-1.5"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LiterAktiv</h1>
              <p className="text-sm text-gray-600">Літературні зустрічі у Відні</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${currentPage === item.page
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700 hover:text-orange-600"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-orange-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${currentPage === item.page
                      ? "bg-orange-100 text-orange-700 font-semibold"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 
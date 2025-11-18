'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t('nav.home'), page: "home" },
    { href: "/events", label: t('nav.events'), page: "events" },
    { href: "/archive", label: t('nav.archive'), page: "archive" },
    { href: "/blog", label: t('nav.blog'), page: "blog" },
    { href: "/contact", label: t('nav.contact'), page: "contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  // Get path without locale for language switching
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift(); // Remove locale
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href={`/${locale}`} className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <Image
              src="/LiterAktiv_Web.png"
              alt="LiterAktiv Logo"
              width={80}
              height={80}
              className="rounded-lg p-1.5"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
              <p className="text-sm text-gray-600">{t('subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`transition-colors ${currentPage === item.page
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={toggleLangMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                aria-label="Change language"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-sm font-medium text-gray-700 uppercase">{locale}</span>
                <svg className={`w-4 h-4 text-gray-700 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={`/${loc}${pathWithoutLocale}`}
                      onClick={() => setIsLangMenuOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        locale === loc
                          ? 'bg-orange-50 text-orange-700 font-semibold'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{localeNames[loc]}</span>
                        <span className="text-xs uppercase text-gray-500">{loc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

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
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${currentPage === item.page
                      ? "bg-orange-100 text-orange-700 font-semibold"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="border-t border-orange-200 pt-4 mt-2">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2">Language</p>
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${pathWithoutLocale}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      locale === loc
                        ? 'bg-orange-100 text-orange-700 font-semibold'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{localeNames[loc]}</span>
                      <span className="text-xs uppercase text-gray-500">{loc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

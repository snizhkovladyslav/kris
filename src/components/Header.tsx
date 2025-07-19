import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { href: "/", label: "Головна", page: "home" },
    { href: "/events", label: "Події", page: "events" },
    { href: "/archive", label: "Архів", page: "archive" },
    { href: "/blog", label: "Блог", page: "blog" },
    { href: "/contact", label: "Контакти", page: "contact" },
  ];

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
        </div>
      </div>
    </header>
  );
} 
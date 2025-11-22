'use client';

import { useTranslations } from 'next-intl';
import { FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">LiterAktiv</h4>
            <p className="text-gray-300 mb-4">{t('subtitle')}</p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/groups/literaktiv"
                className="text-gray-400 hover:text-[#1877F2] transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://t.me/literaktiv"
                className="text-gray-400 hover:text-[#229ED9] transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram size={28} />
              </a>
              <a
                href="https://instagram.com/literaktiv_wien"
                className="text-gray-400 hover:text-[#E4405F] transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={28} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t('partners')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('partner1')}</li>
              <li>{t('partner2')}</li>
              <li>{t('partner3')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t('contacts')}</h4>
            <p className="text-gray-300 mb-2">{t('location')}</p>
            <a
              href="mailto:info@literaktiv.at"
              className="text-gray-300 hover:text-white transition-colors"
            >
              info@literaktiv.at
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} LiterAktiv. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

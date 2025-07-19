"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function SubmitEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        eventTitle: formData.get('eventTitle'),
        eventType: formData.get('eventType'),
        eventDate: formData.get('eventDate'),
        eventTime: formData.get('eventTime'),
        eventDescription: formData.get('eventDescription'),
        contactName: formData.get('contactName'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        organization: formData.get('organization'),
        venue: formData.get('venue'),
        maxParticipants: formData.get('maxParticipants'),
        requirements: formData.get('requirements'),
        additionalInfo: formData.get('additionalInfo')
      };

      const response = await fetch('/api/submit-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        e.currentTarget.reset();
      } else {
        setMessage({ type: 'error', text: result.error || 'Виникла помилка при відправці форми' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Виникла помилка при відправці форми. Будь ласка, спробуйте ще раз.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Запропонувати подію</h2>
          <p className="text-xl text-gray-600 mb-8">
            Ми завжди відкриті до нових ідей та співпраці. Заповніть форму нижче, щоб запропонувати свою подію.
          </p>
        </div>
      </section>

      {/* Message Display */}
      {message && (
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`p-4 rounded-lg ${message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
              {message.text}
            </div>
          </div>
        </section>
      )}

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Details */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Деталі події</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Назва події *
                  </label>
                  <input
                    type="text"
                    id="eventTitle"
                    name="eventTitle"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Введіть назву події"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип події *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Оберіть тип події</option>
                    <option value="meeting">Зустріч з письменником</option>
                    <option value="workshop">Творча вправа</option>
                    <option value="lecture">Лекція</option>
                    <option value="reading-club">Читацький клуб</option>
                    <option value="open-mic">Вільний мікрофон</option>
                    <option value="other">Інше</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Дата події *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Час події *
                  </label>
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Опис події *
                  </label>
                  <textarea
                    id="eventDescription"
                    name="eventDescription"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Детально опишіть вашу подію, її формат та очікувані результати"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактна інформація</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше ім&apos;я *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+43 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Організація (якщо є)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Назва організації"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Додаткова інформація</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                    Місце проведення
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Адреса або назва місця проведення"
                  />
                </div>

                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                    Максимальна кількість учасників
                  </label>
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Спеціальні вимоги або побажання
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Опишіть будь-які спеціальні вимоги, обладнання або підготовку"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                    Додаткова інформація
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Будь-яка додаткова інформація, яка може бути корисною"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="partnership"
                    name="partnership"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="partnership" className="ml-2 block text-sm text-gray-700">
                    Це партнерська подія (спільна організація)
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-orange-600 hover:to-red-600'
                  }`}
              >
                {isSubmitting ? 'Відправляємо...' : 'Відправити пропозицію'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Що відбувається далі?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Розгляд пропозиції</h4>
              <p className="text-gray-600 text-sm">Ми розглянемо вашу пропозицію протягом 3-5 днів</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Зворотній зв&apos;язок</h4>
              <p className="text-gray-600 text-sm">Ми зв&apos;яжемося з вами для обговорення деталей</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Планування події</h4>
              <p className="text-gray-600 text-sm">Разом плануємо та організовуємо подію</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
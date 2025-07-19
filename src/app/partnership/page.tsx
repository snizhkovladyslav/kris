import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Партнерство</h2>
          <p className="text-xl text-gray-600 mb-8">
            Разом ми можемо більше для української культури в Австрії. Заповніть форму для обговорення можливостей співпраці.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Типи партнерства</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-200">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Організаційне партнерство</h4>
              <p className="text-gray-600 mb-4">Спільна організація подій, лекцій та культурних заходів</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Спільні проекти</li>
                <li>• Обмін ресурсами</li>
                <li>• Координація діяльності</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Бібліотечне партнерство</h4>
              <p className="text-gray-600 mb-4">Співпраця з бібліотеками та культурними закладами</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Обмін літературою</li>
                <li>• Спільні виставки</li>
                <li>• Культурні програми</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Фінансове партнерство</h4>
              <p className="text-gray-600 mb-4">Підтримка проектів та культурних ініціатив</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Спонсорство подій</li>
                <li>• Грантова підтримка</li>
                <li>• Інвестиції в культуру</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="space-y-8">
            {/* Organization Details */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Інформація про організацію</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-2">
                    Назва організації *
                  </label>
                  <input
                    type="text"
                    id="orgName"
                    name="orgName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Введіть назву організації"
                  />
                </div>

                <div>
                  <label htmlFor="orgType" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип організації *
                  </label>
                  <select
                    id="orgType"
                    name="orgType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Оберіть тип організації</option>
                    <option value="library">Бібліотека</option>
                    <option value="cultural-center">Культурний центр</option>
                    <option value="publisher">Видавництво</option>
                    <option value="media">Медіа організація</option>
                    <option value="foundation">Фонд</option>
                    <option value="embassy">Посольство</option>
                    <option value="other">Інше</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Веб-сайт
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Місцезнаходження *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Місто, країна"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="orgDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Опис діяльності організації *
                  </label>
                  <textarea
                    id="orgDescription"
                    name="orgDescription"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Опишіть основну діяльність та місію вашої організації"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Partnership Proposal */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Пропозиція партнерства</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип партнерства *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Оберіть тип партнерства</option>
                    <option value="organizational">Організаційне партнерство</option>
                    <option value="library">Бібліотечне партнерство</option>
                    <option value="financial">Фінансове партнерство</option>
                    <option value="media">Медіа партнерство</option>
                    <option value="other">Інше</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="proposal" className="block text-sm font-medium text-gray-700 mb-2">
                    Детальна пропозиція *
                  </label>
                  <textarea
                    id="proposal"
                    name="proposal"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Опишіть детально вашу пропозицію партнерства, цілі та очікувані результати"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Бажана дата початку співпраці
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Тривалість партнерства
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Оберіть тривалість</option>
                      <option value="one-time">Одноразова подія</option>
                      <option value="3-months">3 місяці</option>
                      <option value="6-months">6 місяців</option>
                      <option value="1-year">1 рік</option>
                      <option value="long-term">Довгострокове</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактна особа</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Ім&apos;я контактної особи *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Введіть ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="contactPosition" className="block text-sm font-medium text-gray-700 mb-2">
                    Посада *
                  </label>
                  <input
                    type="text"
                    id="contactPosition"
                    name="contactPosition"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Введіть посаду"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="contact@organization.com"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+43 XXX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105"
              >
                Відправити пропозицію партнерства
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
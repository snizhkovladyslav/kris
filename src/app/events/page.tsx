import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header currentPage="events" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Календар подій</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Зустрічі з письменниками, творчі вправи, лекції та читацькі клуби
          </p>
        </div>
      </section>

      {/* Events Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold">
              Всі події
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Наші події
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Партнерські події
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Творчі вправи
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Вільний мікрофон
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">15</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-orange-600 font-medium">15 грудня 2024</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Зустріч</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Презентація нової книги</h3>
                <p className="text-gray-600 mb-4">Зустріч з автором та обговорення творчості. Презентація нової книги українського письменника.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">19:00 - 21:00</span>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">22</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-green-600 font-medium">22 грудня 2024</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Творча вправа</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Письменницька майстерність</h3>
                <p className="text-gray-600 mb-4">Практичні вправи з написання текстів. Розвиток творчих навичок.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">18:00 - 20:00</span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">10</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 font-medium">10 грудня 2024</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Партнерська</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Лекція з класичної літератури</h3>
                <p className="text-gray-600 mb-4">Спільна подія з українською бібліотекою. Обговорення класичних творів.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">17:00 - 19:00</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>

            {/* Event Card 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">29</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-purple-600 font-medium">29 грудня 2024</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Вільний мікрофон</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Вільний мікрофон</h3>
                <p className="text-gray-600 mb-4">Презентація власної творчості учасників - прози та поезії українською мовою.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">19:00 - 22:00</span>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>

            {/* Event Card 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">5</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-yellow-600 font-medium">5 січня 2025</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Читацький клуб</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Читацький клуб</h3>
                <p className="text-gray-600 mb-4">Обговорення сучасної української літератури. Аналіз творів та дискусії.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">18:30 - 20:30</span>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>

            {/* Event Card 6 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">12</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-red-600 font-medium">12 січня 2025</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Лекція</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Лекція про поезію</h3>
                <p className="text-gray-600 mb-4">Лекція про сучасну українську поезію та її розвиток в діаспорі.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">19:00 - 21:00</span>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Завантажити більше подій
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Хочете запропонувати свою подію?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Ми завжди відкриті до нових ідей та співпраці. Заповніть форму та ми зв&apos;яжемося з вами.
          </p>
          <Link
            href="/submit-event"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Запропонувати подію
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
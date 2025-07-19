import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Популяризація української літератури в Австрії
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Доступ українців, що перебувають в Австрії, до мовного, літературного, культурного середовища
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#events"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
            >
              Найближчі події
            </Link>
            <Link
              href="#about"
              className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section id="events" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Календар подій</h3>
            <p className="text-gray-600">Зустрічі з письменниками, творчі вправи та читацькі клуби</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Our Events */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Наші події</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-600 font-medium">15 грудня 2024</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Зустріч</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Презентація нової книги</h5>
                  <p className="text-sm text-gray-600 mt-1">Зустріч з автором та обговорення творчості</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-600 font-medium">22 грудня 2024</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Творча вправа</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Письменницька майстерність</h5>
                  <p className="text-sm text-gray-600 mt-1">Практичні вправи з написання текстів</p>
                </div>
              </div>
            </div>

            {/* All Events */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Усі події</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">10 грудня 2024</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Партнерська</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Лекція з класичної літератури</h5>
                  <p className="text-sm text-gray-600 mt-1">Спільна подія з українською бібліотекою</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">29 грудня 2024</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Вільний мікрофон</span>
                  </div>
                  <h5 className="font-semibold text-gray-900">Вільний мікрофон</h5>
                  <p className="text-sm text-gray-600 mt-1">Презентація власної творчості учасників</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
            >
              Переглянути всі події
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Про нас</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Ми створюємо простір для українських авторів презентувати свою творчість в Австрії
              та забезпечуємо доступ українців до мовного, літературного, культурного середовища.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Що ми робимо</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Наша діяльність спрямована на популяризацію української літератури та створення культурного простору
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Зустрічі з письменниками</h4>
              <p className="text-gray-600">Організація зустрічей з письменниками та презентація їхніх книжок</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Творчі вправи</h4>
              <p className="text-gray-600">Виконання творчих вправ із письменницької майстерності</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Лекції та клуби</h4>
              <p className="text-gray-600">Лекції та читацькі клуби з класичної і сучасної української літератури</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Вільний мікрофон</h4>
              <p className="text-gray-600">Презентація відвідувачами власної творчості - прози та поезії</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Наша команда</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Знайомтеся з організаторами літературних зустрічей LiterAktiv
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">Г</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Ганна Гнедкова</h4>
                <p className="text-orange-600 font-semibold">Організаторка та ведуча літературних зустрічей</p>
              </div>
              <p className="text-gray-700 text-center">
                Ганна відповідає за організацію та проведення літературних зустрічей,
                створюючи теплу атмосферу для обговорення української літератури.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">Х</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Христина Касьянова</h4>
                <p className="text-orange-600 font-semibold">Координаторка проектів та медіа-партнерств</p>
              </div>
              <p className="text-gray-700 text-center">
                Христина координує проекти та розвиває медіа-партнерства,
                забезпечуючи зростання та популяризацію української культури у Відні.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Приєднуйтесь до нас</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Хочете запропонувати нам свою подію?</h4>
              <p className="text-gray-700 mb-4">Ми завжди відкриті до нових ідей та співпраці</p>
              <Link
                href="/submit-event"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              >
                Запропонувати подію
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Хочете запропонувати нам партнерство?</h4>
              <p className="text-gray-700 mb-4">Разом ми можемо більше для української культури</p>
              <Link
                href="/partnership"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                Стати партнером
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

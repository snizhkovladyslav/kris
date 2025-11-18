"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface Event {
  date: string;
  title: string;
  description: string;
  time: string;
  type: string;
  status: string;
  color: string;
  image: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setPostsError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setPostsLoading(false);
      }
    };

    fetchEvents();
    fetchPosts();
  }, []);

  // Фільтруємо тільки активні та майбутні події
  const activeEvents = Array.isArray(events) ? events.filter(event => event.status !== 'Завершена') : [];

  // Беремо перші 4 події для показу на головній сторінці
  const featuredEvents = activeEvents.slice(0, 4);

  // Беремо перші 3 статті для показу на головній сторінці
  const featuredPosts = posts.slice(0, 3);

  const getTypeColor = (type: string) => {
    const typeColorMap: { [key: string]: string } = {
      'Зустріч': 'bg-orange-100 text-orange-700',
      'Творча вправа': 'bg-green-100 text-green-700',
      'Партнерська': 'bg-blue-100 text-blue-700',
      'Вільний мікрофон': 'bg-purple-100 text-purple-700',
      'Читацький клуб': 'bg-yellow-100 text-yellow-700',
      'Лекція': 'bg-red-100 text-red-700',
    };
    return typeColorMap[type] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryColor = (category: string) => {
    const categoryColorMap: { [key: string]: string } = {
      'Література': 'bg-orange-100 text-orange-700',
      'Творчість': 'bg-green-100 text-green-700',
      'Події': 'bg-blue-100 text-blue-700',
      'Інтерв\'ю': 'bg-purple-100 text-purple-700',
      'Рецензії': 'bg-yellow-100 text-yellow-700',
      'Новини': 'bg-red-100 text-red-700',
    };
    return categoryColorMap[category] || 'bg-gray-100 text-gray-700';
  };
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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Завантаження подій...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Помилка завантаження подій</p>
              <p className="text-gray-600">Спробуйте оновити сторінку</p>
            </div>
          ) : featuredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Наразі немає запланованих подій</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Featured Events */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Найближчі події</h4>
                <div className="space-y-4">
                  {featuredEvents.slice(0, 2).map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-orange-600 font-medium">{event.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <h5 className="font-semibold text-gray-900">{event.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* More Events */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Більше подій</h4>
                <div className="space-y-4">
                  {featuredEvents.slice(2, 4).map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 font-medium">{event.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <h5 className="font-semibold text-gray-900">{event.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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

      {/* Blog Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Останні статті</h3>
            <p className="text-gray-600">Статті про літературу, творчість, події та інтерв&apos;ю з письменниками</p>
          </div>

          {postsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Завантаження статей...</p>
            </div>
          ) : postsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Помилка завантаження статей</p>
              <p className="text-gray-600">Спробуйте оновити сторінку</p>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Наразі немає статей</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover"
                        onError={() => {
                          // Fallback handled by Next.js Image component
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 font-medium">{post.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Автор: {post.author}</span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Читати далі
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
            >
              Переглянути всі статті
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Приєднуйтесь до нас</h3>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Хочете запропонувати нам свою подію?</h4>
            <p className="text-gray-700 mb-6">Ми завжди відкриті до нових ідей та співпраці. Заповніть форму та ми зв&apos;яжемося з вами найближчим часом.</p>
            <Link
              href="/submit-event"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
            >
              Запропонувати подію
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

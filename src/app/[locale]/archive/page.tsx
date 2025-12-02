'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

interface Event {
  date: string;
  title: string;
  description: string;
  time: string;
  type: string;
  status: 'Активна' | 'Скасована' | 'Майбутня' | 'Завершена';
  color: string;
  image: string;
}

export default function ArchivePage() {
  const t = useTranslations('archive');
  const tEvents = useTranslations('events');
  const tTypes = useTranslations('eventTypes');
  const locale = useLocale();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    // Оновлюємо відображувані події при зміні фільтра або кількості
    const filtered = events.filter(event => {
      if (activeFilter === 'all') return true;
      return event.type === activeFilter;
    });

    setDisplayedEvents(filtered.slice(0, visibleCount));
  }, [events, activeFilter, visibleCount]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events?locale=${locale}`);
      const data = await response.json();

      if (response.ok) {
        const eventsData = data.events || [];
        // Фільтруємо тільки завершені події для архіву
        const completedEvents = eventsData.filter((event: Event) => event.status === 'Завершена');
        setEvents(completedEvents);

        // Отримуємо унікальні типи подій тільки з завершених подій
        const types = [...new Set(completedEvents.map((event: Event) => event.type))] as string[];
        setUniqueTypes(types);
      } else {
        setError(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreEvents = () => {
    setVisibleCount(prev => prev + 9);
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      orange: 'from-orange-400 to-red-500',
      green: 'from-green-400 to-blue-500',
      blue: 'from-blue-400 to-purple-500',
      purple: 'from-purple-400 to-pink-500',
      yellow: 'from-yellow-400 to-orange-500',
      red: 'from-red-400 to-pink-500',
    };
    return colorMap[color] || 'from-orange-400 to-red-500';
  };

  const getTypeColor = (type: string) => {
    const typeColorMap: { [key: string]: string } = {
      'Зустріч': 'bg-orange-100 text-orange-700',
      'Творчий Воркшоп': 'bg-green-100 text-green-700',
      'Партнерська': 'bg-blue-100 text-blue-700',
      'Вільний мікрофон': 'bg-purple-100 text-purple-700',
      'Читацький клуб': 'bg-yellow-100 text-yellow-700',
      'Лекція': 'bg-red-100 text-red-700',
    };
    return typeColorMap[type] || 'bg-gray-100 text-gray-700';
  };

  const getFilterButtonColor = (filterType: string) => {
    const filterColorMap: { [key: string]: string } = {
      'Зустріч': 'bg-orange-100 text-orange-700',
      'Творчий Воркшоп': 'bg-green-100 text-green-700',
      'Партнерська': 'bg-blue-100 text-blue-700',
      'Вільний мікрофон': 'bg-purple-100 text-purple-700',
      'Читацький клуб': 'bg-yellow-100 text-yellow-700',
      'Лекція': 'bg-red-100 text-red-700',
    };
    return filterColorMap[filterType] || 'bg-gray-100 text-gray-700';
  };

  const filteredEvents = events.filter(event => {
    if (activeFilter === 'all') return true;
    return event.type === activeFilter;
  });

  const hasMoreEvents = displayedEvents.length < filteredEvents.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="archive" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">{tEvents('loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="archive" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{tEvents('error')}</p>
            <button
              onClick={fetchEvents}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {tEvents('retry')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header currentPage="archive" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Events Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Кнопка "Всі події" завжди присутня */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`cursor-pointer px-6 py-2 rounded-full font-semibold transition-colors ${activeFilter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
            >
              {tEvents('filterAll')} ({events.length})
            </button>

            {/* Динамічні кнопки фільтрів на основі типів з таблиці */}
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`cursor-pointer px-6 py-2 rounded-full font-semibold transition-colors ${activeFilter === type
                  ? 'bg-orange-500 text-white'
                  : `${getFilterButtonColor(type)} hover:bg-orange-100 hover:text-orange-700`
                  }`}
              >
                {tTypes(type)} ({events.filter(event => event.type === type).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{tEvents('noEvents')}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      <div className={`h-full bg-gradient-to-br ${getColorClasses(event.color)} flex items-center justify-center ${event.image ? 'hidden' : ''}`}>
                        <span className="text-white text-4xl font-bold">
                          {event.date}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 font-medium">{event.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                          {tTypes(event.type)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{event.time}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Завершена
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreEvents && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMoreEvents}
                    className="cursor-pointer bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                  >
                    {tEvents('loadMore')} ({filteredEvents.length - displayedEvents.length})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{t('ctaTitle')}</h3>
          <p className="text-lg text-gray-600 mb-8">
            {t('ctaDescription')}
          </p>
          <Link
            href={`/${locale}/events`}
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

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

export default function BlogPage() {
  const t = useTranslations('blog');
  const tCategories = useTranslations('categories');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Оновлюємо відображувані пости при зміні фільтра або кількості
    const filtered = posts.filter(post => {
      if (activeFilter === 'all') return true;
      return post.category === activeFilter;
    });

    setDisplayedPosts(filtered.slice(0, visibleCount));
  }, [posts, activeFilter, visibleCount]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();

      if (response.ok) {
        const postsData = data.posts || [];
        setPosts(postsData);

        // Отримуємо унікальні категорії
        const categories = [...new Set(postsData.map((post: BlogPost) => post.category))] as string[];
        setUniqueCategories(categories);
      } else {
        setError(data.error || 'Failed to fetch blog posts');
      }
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    setVisibleCount(prev => prev + 6);
  };

  const getCategoryColor = (category: string) => {
    const categoryColorMap: { [key: string]: string } = {
      'Література': 'bg-orange-100 text-orange-700',
      'Творчість': 'bg-green-100 text-green-700',
      'Події': 'bg-blue-100 text-blue-700',
      'Інтерв&apos;ю': 'bg-purple-100 text-purple-700',
      'Рецензії': 'bg-yellow-100 text-yellow-700',
      'Новини': 'bg-red-100 text-red-700',
    };
    return categoryColorMap[category] || 'bg-gray-100 text-gray-700';
  };

  const getFilterButtonColor = (filterCategory: string) => {
    const filterColorMap: { [key: string]: string } = {
      'Література': 'bg-orange-100 text-orange-700',
      'Творчість': 'bg-green-100 text-green-700',
      'Події': 'bg-blue-100 text-blue-700',
      'Інтерв&apos;ю': 'bg-purple-100 text-purple-700',
      'Рецензії': 'bg-yellow-100 text-yellow-700',
      'Новини': 'bg-red-100 text-red-700',
    };
    return filterColorMap[filterCategory] || 'bg-gray-100 text-gray-700';
  };

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.category === activeFilter;
  });

  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="blog" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="blog" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{t('error')}</p>
            <button
              onClick={fetchPosts}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t('retry')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header currentPage="blog" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Blog Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Кнопка "Всі статті" завжди присутня */}
            <button
              onClick={() => setActiveFilter('all')}
              className={`cursor-pointer px-6 py-2 rounded-full font-semibold transition-colors ${activeFilter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
            >
              {t('filterAll')} ({posts.length})
            </button>

            {/* Динамічні кнопки фільтрів на основі категорій з таблиці */}
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`cursor-pointer px-6 py-2 rounded-full font-semibold transition-colors ${activeFilter === category
                  ? 'bg-orange-500 text-white'
                  : `${getFilterButtonColor(category)} hover:bg-orange-100 hover:text-orange-700`
                  }`}
              >
                {tCategories(category)} ({posts.filter(post => post.category === category).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t('noPosts')}</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.map((post, index) => (
                  <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 font-medium">{post.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                          {tCategories(post.category)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{t('author')}: {post.author}</span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/${locale}/blog/${post.id}`}
                          className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                        >
                          {t('readMore')}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMorePosts}
                    className="cursor-pointer bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                  >
                    {t('loadMore')} ({filteredPosts.length - displayedPosts.length})
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
            href={`/${locale}/submit-article`}
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
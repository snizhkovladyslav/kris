'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const data = await response.json();

      if (response.ok) {
        const posts = data.posts || [];
        const foundPost = posts.find((p: BlogPost) => p.id === slug);

        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Стаття не знайдена');
        }
      } else {
        setError(data.error || 'Помилка завантаження статті');
      }
    } catch (err) {
      setError('Помилка завантаження статті');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="blog" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Завантаження статті...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header currentPage="blog" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Стаття не знайдена'}</p>
            <Link
              href="/blog"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Повернутися до блогу
            </Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/blog" className="hover:text-orange-600 transition-colors">
                  Блог
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Теги:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Повернутися до блогу</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
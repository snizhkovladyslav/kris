# Задача 3: Детальний огляд події (Event Detail Page)

## Опис
Додати повноцінну сторінку огляду події з коротким описом, довгим описом та галереєю фото.

## Пріоритет
**Середній** - основна фіча, потребує більше часу

## Поточний стан
- Події мають тільки одне поле `description` (колонка C)
- Немає окремої сторінки для перегляду події
- Одне зображення на подію (колонка H)
- Картки показують весь опис без обмеження

## Що потрібно зробити

### 1. Google Sheets - Нові колонки

| Колонка | Назва | Опис | Приклад |
|---------|-------|------|---------|
| I | `short_description` | Короткий опис для карток (1-2 речення) | "Зустріч з українською письменницею..." |
| J | `long_description` | Повний опис для сторінки події | Детальний текст з абзацами |
| K | `photos` | Список URL фото через кому | `url1,url2,url3` |

**Примітка:** Колонка `photos` містить Google Drive URL через кому, без пробілів.

### 2. API (`src/app/api/events/route.ts`)

#### Оновити range:
```typescript
// Було
range: `events_${safeLocale}!A2:H`

// Стало
range: `events_${safeLocale}!A2:K`
```

#### Оновити маппінг:
```typescript
const events = rows.map((row: string[]) => ({
  date: row[0] || '',
  title: row[1] || '',
  description: row[2] || '',  // Залишити для сумісності
  time: row[3] || '',
  type: row[4] || '',
  status: row[5] || '',
  color: row[6] || 'orange',
  image: convertGoogleDriveUrl(row[7] || ''),
  external_url: row[8] || '',
  short_description: row[9] || row[2] || '',  // Fallback на description
  long_description: row[10] || row[2] || '',   // Fallback на description
  photos: (row[11] || '').split(',').filter(Boolean).map(url => convertGoogleDriveUrl(url.trim())),
}));
```

#### Додати slug генерацію:
```typescript
// Функція для створення slug з title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-яіїєґ0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// В маппінгу
const events = rows.map((row: string[]) => ({
  // ... інші поля
  slug: generateSlug(row[1] || ''),
}));
```

### 3. Нова сторінка (`src/app/[locale]/events/[slug]/page.tsx`)

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  date: string;
  title: string;
  short_description: string;
  long_description: string;
  time: string;
  type: string;
  status: string;
  color: string;
  image: string;
  external_url: string;
  photos: string[];
  slug: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events?locale=${locale}`);
        const data = await response.json();
        const foundEvent = data.find((e: Event) => e.slug === params.slug);
        setEvent(foundEvent || null);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [locale, params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">{t('eventDetail.notFound')}</h1>
        <Link href={`/${locale}/events`} className="text-orange-600 hover:underline">
          {t('eventDetail.backToEvents')}
        </Link>
      </div>
    );
  }

  const allPhotos = [event.image, ...event.photos].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`h-full bg-gradient-to-br from-orange-400 to-red-500`} />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/90 mb-4`}>
              {t(`eventTypes.${event.type}`)}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🕐</span>
            <span>{event.time}</span>
          </div>
          {event.status === 'Завершена' && (
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {t('eventDetail.completed')}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="whitespace-pre-wrap">{event.long_description}</p>
        </div>

        {/* Photo Gallery */}
        {allPhotos.length > 1 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('eventDetail.gallery')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={photo}
                    alt={`${event.title} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Registration Button */}
        {event.status !== 'Завершена' && (
          <div className="text-center">
            {event.type === 'Партнерська' ? (
              event.external_url && (
                <a
                  href={event.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  {t('events.details')}
                </a>
              )
            ) : (
              <button
                onClick={() => {/* Google Form logic */}}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {t('events.register')}
              </button>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/events`}
            className="text-orange-600 hover:underline"
          >
            ← {t('eventDetail.backToEvents')}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-75"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedPhoto}
              alt="Photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

### 4. Оновити картки подій (`src/app/[locale]/events/page.tsx`)

#### Додати Link на детальну сторінку:
```tsx
import Link from 'next/link';

// В картці події
<Link href={`/${locale}/events/${event.slug}`}>
  <h3 className="font-semibold text-lg text-gray-900 hover:text-orange-600 transition-colors">
    {event.title}
  </h3>
</Link>

// Використовувати short_description замість description
<p className="text-gray-600 text-sm line-clamp-2">
  {event.short_description}
</p>
```

### 5. Переклади

**`messages/uk.json`:**
```json
{
  "eventDetail": {
    "notFound": "Подію не знайдено",
    "backToEvents": "Назад до подій",
    "completed": "Завершено",
    "gallery": "Фотогалерея"
  }
}
```

**`messages/de.json`:**
```json
{
  "eventDetail": {
    "notFound": "Veranstaltung nicht gefunden",
    "backToEvents": "Zurück zu Veranstaltungen",
    "completed": "Abgeschlossen",
    "gallery": "Fotogalerie"
  }
}
```

**`messages/en.json`:**
```json
{
  "eventDetail": {
    "notFound": "Event not found",
    "backToEvents": "Back to events",
    "completed": "Completed",
    "gallery": "Photo Gallery"
  }
}
```

## Файли для зміни/створення

| Файл | Дія |
|------|-----|
| `src/app/api/events/route.ts` | Розширити range, додати нові поля, slug |
| `src/app/[locale]/events/page.tsx` | Додати Link, використовувати short_description |
| `src/app/[locale]/events/[slug]/page.tsx` | **СТВОРИТИ** - детальна сторінка |
| `messages/uk.json` | Додати ключі eventDetail.* |
| `messages/de.json` | Додати ключі eventDetail.* |
| `messages/en.json` | Додати ключі eventDetail.* |

## Структура Google Sheets (оновлена)

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| date | title | description | time | type | status | color | image | external_url | short_description | long_description | photos |

## Тестування

1. **API:** Перевірити, що нові поля повертаються коректно
2. **Slug:** Перевірити генерацію slug для різних назв (кирилиця, спецсимволи)
3. **Детальна сторінка:**
   - Завантаження за slug
   - Відображення всіх даних
   - Галерея фото
   - Lightbox при кліку на фото
   - Кнопка реєстрації/детальніше
4. **Картки:** Перевірити, що посилання на детальну сторінку працює
5. **Fallback:** Якщо short_description порожній, використовується description
6. **404:** Якщо події не існує, показується повідомлення

## Примітки

- **Slug:** Генерується з title, підтримує кирилицю
- **Fallback:** Якщо нові поля порожні, використовується старий description
- **Фото:** Масив URL, конвертуються з Google Drive формату
- **Lightbox:** Простий, без бібліотек (можна замінити на react-lightbox пізніше)
- **SEO:** Можна додати metadata для кращого SEO пізніше

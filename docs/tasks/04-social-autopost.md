# Задача 4: Автопостинг у соціальні мережі

## Опис
Автоматична публікація подій у Facebook та Telegram при додаванні нової події в Google Sheets.

## Пріоритет
**Низький** - складна задача, потребує налаштування зовнішніх сервісів

## Архітектура

```
Google Sheets → Google Apps Script → Webhook API → Facebook/Telegram
```

1. Адмін додає нову подію в Google Sheets
2. Google Apps Script детектує зміну
3. Викликає webhook на сайті
4. Webhook публікує подію в Facebook та Telegram

## Передумови (поза кодом)

### Facebook
1. **Створити Facebook App:**
   - Зайти на [developers.facebook.com](https://developers.facebook.com)
   - Create App → Business → Manage Business Assets
   - Додати продукт "Facebook Login for Business"

2. **Отримати Page Access Token:**
   - Підключити сторінку до App
   - Згенерувати Long-lived Page Access Token
   - Потрібні дозволи: `pages_manage_posts`, `pages_read_engagement`

3. **Зберегти credentials:**
   - `FACEBOOK_PAGE_ID` - ID сторінки
   - `FACEBOOK_ACCESS_TOKEN` - Page Access Token

### Telegram
1. **Створити бота:**
   - Написати [@BotFather](https://t.me/BotFather) в Telegram
   - `/newbot` → ввести назву → отримати токен

2. **Додати бота до каналу:**
   - Додати бота як адміністратора каналу
   - Дати права на публікацію повідомлень

3. **Отримати Chat ID каналу:**
   - Для публічного каналу: `@channel_username`
   - Для приватного: використати [@userinfobot](https://t.me/userinfobot)

4. **Зберегти credentials:**
   - `TELEGRAM_BOT_TOKEN` - токен бота
   - `TELEGRAM_CHANNEL_ID` - ID або @username каналу

## Environment Variables

Додати в `.env.local`:
```env
# Facebook
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_ACCESS_TOKEN=your_long_lived_token

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel_or_id

# Webhook Security
WEBHOOK_SECRET=your_random_secret_key
```

## Файли для створення

### 1. Утиліти (`src/lib/social.ts`)

```typescript
// Форматування тексту для соц. мереж
export function formatEventPost(event: {
  title: string;
  short_description: string;
  date: string;
  time: string;
  type: string;
}, locale: string): string {
  const emoji = getTypeEmoji(event.type);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://literaktiv.at';

  return `${emoji} ${event.title}

📅 ${event.date}
🕐 ${event.time}

${event.short_description}

👉 ${siteUrl}/${locale}/events`;
}

function getTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    'Зустріч': '🤝',
    'Творчий Воркшоп': '🎨',
    'Партнерська': '🤝',
    'Вільний мікрофон': '🎤',
    'Читацький клуб': '📚',
    'Лекція': '🎓',
  };
  return emojis[type] || '📢';
}

// Facebook API
export async function postToFacebook(message: string, imageUrl?: string): Promise<boolean> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.error('Facebook credentials not configured');
    return false;
  }

  try {
    const endpoint = imageUrl
      ? `https://graph.facebook.com/v18.0/${pageId}/photos`
      : `https://graph.facebook.com/v18.0/${pageId}/feed`;

    const body = imageUrl
      ? { url: imageUrl, caption: message, access_token: accessToken }
      : { message, access_token: accessToken };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Facebook API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Facebook posting error:', error);
    return false;
  }
}

// Telegram API
export async function postToTelegram(message: string, imageUrl?: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!botToken || !channelId) {
    console.error('Telegram credentials not configured');
    return false;
  }

  try {
    const endpoint = imageUrl
      ? `https://api.telegram.org/bot${botToken}/sendPhoto`
      : `https://api.telegram.org/bot${botToken}/sendMessage`;

    const body = imageUrl
      ? { chat_id: channelId, photo: imageUrl, caption: message, parse_mode: 'HTML' }
      : { chat_id: channelId, text: message, parse_mode: 'HTML' };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Telegram posting error:', error);
    return false;
  }
}
```

### 2. Webhook API (`src/app/api/webhook/new-event/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { formatEventPost, postToFacebook, postToTelegram } from '@/lib/social';

interface EventData {
  date: string;
  title: string;
  description: string;
  time: string;
  type: string;
  status: string;
  color: string;
  image: string;
  external_url: string;
  short_description: string;
  long_description: string;
  photos: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-webhook-secret');
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { event, locale } = body as { event: string[]; locale: string };

    // Map array to object
    const eventData: EventData = {
      date: event[0] || '',
      title: event[1] || '',
      description: event[2] || '',
      time: event[3] || '',
      type: event[4] || '',
      status: event[5] || '',
      color: event[6] || '',
      image: event[7] || '',
      external_url: event[8] || '',
      short_description: event[9] || event[2] || '',
      long_description: event[10] || '',
      photos: event[11] || '',
    };

    // Don't post completed or cancelled events
    if (eventData.status === 'Завершена' || eventData.status === 'Скасована') {
      return NextResponse.json({ message: 'Event skipped (completed/cancelled)' });
    }

    // Don't post partner events (they have their own promotion)
    if (eventData.type === 'Партнерська') {
      return NextResponse.json({ message: 'Event skipped (partner event)' });
    }

    // Format message
    const message = formatEventPost({
      title: eventData.title,
      short_description: eventData.short_description,
      date: eventData.date,
      time: eventData.time,
      type: eventData.type,
    }, locale);

    // Convert Google Drive URL if needed
    const imageUrl = eventData.image ? convertGoogleDriveUrl(eventData.image) : undefined;

    // Post to social media
    const [fbResult, tgResult] = await Promise.all([
      postToFacebook(message, imageUrl),
      postToTelegram(message, imageUrl),
    ]);

    return NextResponse.json({
      success: true,
      facebook: fbResult,
      telegram: tgResult,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function convertGoogleDriveUrl(url: string): string {
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.match(/\/d\/([^/]+)/)?.[1];
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  return url;
}
```

### 3. Google Apps Script

Додати в Google Sheets (Extensions → Apps Script):

```javascript
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();

  // Only process events sheets
  if (!sheetName.startsWith('events_')) return;

  const row = e.range.getRow();

  // Skip header row
  if (row === 1) return;

  // Get event data (columns A-L)
  const data = sheet.getRange(row, 1, 1, 12).getValues()[0];
  const locale = sheetName.split('_')[1]; // 'uk', 'de', or 'en'

  // Check if this is a new event (title was just added)
  const title = data[1];
  const oldTitle = e.oldValue;

  if (title && !oldTitle) {
    // This is a new event, trigger webhook
    triggerWebhook(data, locale);
  }
}

function triggerWebhook(eventData, locale) {
  const webhookUrl = 'https://literaktiv.vercel.app/api/webhook/new-event';
  const webhookSecret = 'YOUR_WEBHOOK_SECRET'; // Замінити на реальний секрет

  try {
    const response = UrlFetchApp.fetch(webhookUrl, {
      method: 'POST',
      contentType: 'application/json',
      headers: {
        'x-webhook-secret': webhookSecret
      },
      payload: JSON.stringify({
        event: eventData,
        locale: locale
      }),
      muteHttpExceptions: true
    });

    Logger.log('Webhook response: ' + response.getContentText());
  } catch (error) {
    Logger.log('Webhook error: ' + error);
  }
}

// Ручний тригер для тестування
function testWebhook() {
  const testEvent = [
    '15.01.2025',           // date
    'Тестова подія',        // title
    'Короткий опис',        // description
    '18:00',                // time
    'Зустріч',              // type
    'Активна',              // status
    'orange',               // color
    '',                     // image
    '',                     // external_url
    'Короткий опис тесту',  // short_description
    'Довгий опис тесту',    // long_description
    ''                      // photos
  ];

  triggerWebhook(testEvent, 'uk');
}
```

## Тестування

### 1. Локальне тестування
```bash
# Telegram тест
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "@channel", "text": "Test message"}'

# Facebook тест (потрібен access token)
curl -X POST "https://graph.facebook.com/v18.0/<PAGE_ID>/feed" \
  -d "message=Test post" \
  -d "access_token=<TOKEN>"
```

### 2. Webhook тест
```bash
curl -X POST "http://localhost:3000/api/webhook/new-event" \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your_secret" \
  -d '{"event": ["15.01.2025", "Test Event", "Description", "18:00", "Зустріч", "Активна", "orange", "", "", "Short desc", "Long desc", ""], "locale": "uk"}'
```

### 3. Google Apps Script тест
- Відкрити Apps Script в Google Sheets
- Запустити функцію `testWebhook()`
- Перевірити логи (View → Logs)

## Файли для створення/зміни

| Файл | Дія |
|------|-----|
| `src/lib/social.ts` | **СТВОРИТИ** - утиліти для соц. мереж |
| `src/app/api/webhook/new-event/route.ts` | **СТВОРИТИ** - webhook endpoint |
| `.env.local` | Додати credentials |
| Google Apps Script | Додати скрипт в таблицю |

## Безпека

1. **Webhook Secret** - захист від несанкціонованих викликів
2. **Environment Variables** - токени в .env.local, не в коді
3. **Rate Limiting** - розглянути додавання для захисту від спаму
4. **Logging** - логувати всі спроби публікації

## Альтернативний підхід: Колонка "Published"

Замість webhook можна додати колонку `published` (M) в Google Sheets:
- Пусто = не опубліковано
- "fb" = опубліковано в Facebook
- "tg" = опубліковано в Telegram
- "fb,tg" = опубліковано в обох

Cron job перевіряє кожні 5 хвилин і публікує нові події.

## Примітки

- **Facebook:** Потребує верифікації бізнес-акаунту для продакшену
- **Telegram:** Простіший у налаштуванні, рекомендую почати з нього
- **Зображення:** Google Drive URL потрібно конвертувати в прямий формат
- **Партнерські події:** Не публікуються автоматично (мають власну промоцію)
- **Завершені події:** Не публікуються автоматично

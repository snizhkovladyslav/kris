# Джерела даних проекту

Аналіз показав, що дані в проекті беруться з **Google Sheets** через API.

## Потік даних

1.  **Frontend (`src/app/[locale]/page.tsx`)**:
    *   Виконує HTTP запити до власних API роутів: `/api/events` та `/api/blog`.
    *   Використовує `fetch` для отримання даних при завантаженні сторінки.

2.  **Backend API (`src/app/api/*`)**:
    *   **Events**: `src/app/api/events/route.ts`
        *   Підключається до Google Sheets API.
        *   Читає дані з листа **"events"** (діапазон `A2:H`).
        *   Поля: date, title, description, time, type, status, color, image.
    *   **Blog**: `src/app/api/blog/route.ts`
        *   Підключається до Google Sheets API.
        *   Читає дані з листа **"posts"** (діапазон `A2:Z`).
        *   Поля: id, title, excerpt, content, author, date, category, image, tags.

## Конфігурація

Для роботи необхідні змінні середовища (в `.env.local`):
*   `GOOGLE_SHEETS_SPREADSHEET_ID`: ID таблиці.
*   `GOOGLE_SHEETS_CLIENT_EMAIL`: Email сервісного акаунту Google.
*   `GOOGLE_SHEETS_PRIVATE_KEY`: Приватний ключ сервісного акаунту.

## CSV файли
Файли `demo-events.csv` та `demo-posts.csv` в корені проекту **не використовуються** в коді (`src`). Ймовірно, вони слугують як приклад структури даних або бекап.

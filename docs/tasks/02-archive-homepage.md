# Задача 2: Архівні події на головній сторінці

## Опис
Показувати секцію з архівними (завершеними) подіями на головній сторінці.

## Пріоритет
**Високий** - швидка задача

## Поточний стан
- Головна сторінка показує тільки **4 активні події** (`src/app/[locale]/page.tsx:82-86`)
- Архівні події доступні тільки на окремій сторінці `/archive`
- Фільтр: `events.filter(event => event.status !== 'Завершена')`

## Що потрібно зробити

### 1. Головна сторінка (`src/app/[locale]/page.tsx`)

#### Додати фільтрацію архівних подій (після рядка 86):
```typescript
// Існуючий код
const activeEvents = events.filter(event => event.status !== 'Завершена');
const featuredEvents = activeEvents.slice(0, 4);

// ДОДАТИ
const archivedEvents = events.filter(event => event.status === 'Завершена');
const featuredArchive = archivedEvents.slice(0, 4); // Останні 4 завершені
```

#### Додати нову секцію (після секції подій, ~рядок 220):
```tsx
{/* Archive Section */}
{featuredArchive.length > 0 && (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('home.archive.title')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('home.archive.subtitle')}
          </p>
        </div>
        <Link
          href={`/${locale}/archive`}
          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
        >
          {t('home.archive.viewAll')}
          <span>→</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredArchive.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Event Image */}
            {event.image ? (
              <div className="h-40 relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  {event.date}
                </span>
              </div>
            ) : (
              <div className={`h-40 bg-gradient-to-br ${getGradientColor(event.color)} flex items-center justify-center`}>
                <span className="text-white text-lg font-bold opacity-75">
                  {event.date}
                </span>
              </div>
            )}

            {/* Event Content */}
            <div className="p-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getTypeColor(event.type)}`}>
                {t(`eventTypes.${event.type}`)}
              </span>
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

### 2. Переклади

**`messages/uk.json`:**
```json
{
  "home": {
    "archive": {
      "title": "Минулі події",
      "subtitle": "Що вже відбулося",
      "viewAll": "Переглянути всі"
    }
  }
}
```

**`messages/de.json`:**
```json
{
  "home": {
    "archive": {
      "title": "Vergangene Veranstaltungen",
      "subtitle": "Was bereits stattgefunden hat",
      "viewAll": "Alle ansehen"
    }
  }
}
```

**`messages/en.json`:**
```json
{
  "home": {
    "archive": {
      "title": "Past Events",
      "subtitle": "What has already happened",
      "viewAll": "View all"
    }
  }
}
```

## Файли для зміни
| Файл | Дія |
|------|-----|
| `src/app/[locale]/page.tsx` | Додати секцію архіву |
| `messages/uk.json` | Додати ключі home.archive.* |
| `messages/de.json` | Додати ключі home.archive.* |
| `messages/en.json` | Додати ключі home.archive.* |

## Дизайн секції
- Фон: світло-сірий (`bg-gray-50`) для контрасту
- Картки: білі, з тінню
- Зображення: з opacity 75% (щоб показати, що це минуле)
- Градієнт на зображенні знизу для читабельності дати
- 4 колонки на десктопі, 2 на планшеті

## Тестування
1. Переконатися, що секція показується тільки якщо є завершені події
2. Перевірити, що показуються максимум 4 події
3. Перевірити посилання "Переглянути всі" → `/archive`
4. Перевірити адаптивність (mobile, tablet, desktop)
5. Перевірити всі 3 мови

## Примітки
- Секція показується тільки якщо `featuredArchive.length > 0`
- Розташування: після секції активних подій, перед блогом
- Стиль карток спрощений (без кнопки реєстрації - події вже завершені)

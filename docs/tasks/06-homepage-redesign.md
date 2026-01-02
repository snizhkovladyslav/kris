# Задача 6: Редизайн головної сторінки (Landing Page)

## Опис
Зробити головну сторінку більш інформативною як лендінг з покращеним відображенням подій, соц. мереж та можливістю швидкого додавання події.

## Пріоритет
**Середній** - комплексна задача з кількома компонентами

## Поточний стан

| Секція | Що є | Проблема |
|--------|------|----------|
| Hero | Заголовок + 2 кнопки | Немає соц. мереж, мало візуалу |
| Події | 4 події (2+2 колонки) | Мінімум інформації, немає зображень |
| Блог | 3 пости з фото | Нормально |
| About | Текст | Ок |
| What We Do | 4 картки | Ок |
| Team | 2 члени команди | Немає фото |
| CTA | Кнопка "Запропонувати подію" | Веде на окрему сторінку |
| Footer | Соц. мережі (маленькі іконки) | Єдине місце з соц. мережами |

---

## Обрані покращення

### 1. Картки подій з фото

**Замість:** Поточний текстовий список 2+2 колонки

**Нове:**
- 4 колонки на десктопі, 2 на мобільному
- Зображення події (або градієнт якщо немає)
- Дата в overlay на фото
- Бейдж типу події з кольором
- Назва (line-clamp-2)
- Час події
- Кнопка "Детальніше"

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {featuredEvents.map((event, index) => (
    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48">
        {event.image ? (
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        ) : (
          <div className={`h-full bg-gradient-to-br ${getGradientColor(event.color)}`} />
        )}
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-sm font-medium">
          {event.date}
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${getTypeColor(event.type)}`}>
          {t(`eventTypes.${event.type}`)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{event.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{event.time}</span>
          <Link href={`/${locale}/events/${event.slug}`} className="text-orange-600 text-sm font-medium">
            {t('events.details')} →
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
```

### 2. Секція статистики в числах

**Розташування:** Після Hero секції

```tsx
const stats = [
  { value: 50, suffix: '+', label: t('stats.events') },
  { value: 500, suffix: '+', label: t('stats.guests') },
  { value: 10, suffix: '+', label: t('stats.authors') },
  { value: 3, suffix: '', label: t('stats.years') },
];

<section className="py-12 bg-gradient-to-r from-orange-500 to-red-500">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
      {stats.map((stat, i) => (
        <div key={i}>
          <div className="text-4xl md:text-5xl font-bold">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-sm md:text-base opacity-90 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3. Банер найближчої події

**Розташування:** Перед списком всіх подій

```tsx
{featuredEvents.length > 0 && (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🔥</span>
        <h2 className="text-2xl font-bold text-gray-900">{t('home.nextEvent.title')}</h2>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-auto">
            {featuredEvents[0].image ? (
              <Image src={featuredEvents[0].image} alt={featuredEvents[0].title} fill className="object-cover" />
            ) : (
              <div className={`h-full min-h-[300px] bg-gradient-to-br ${getGradientColor(featuredEvents[0].color)}`} />
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <span className={`inline-block w-fit px-3 py-1 rounded-full text-sm font-medium mb-4 ${getTypeColor(featuredEvents[0].type)}`}>
              {t(`eventTypes.${featuredEvents[0].type}`)}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {featuredEvents[0].title}
            </h3>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{featuredEvents[0].date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>{featuredEvents[0].time}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 line-clamp-3">
              {featuredEvents[0].description}
            </p>
            <div>
              <Link
                href={`/${locale}/events/${featuredEvents[0].slug}`}
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {t('home.nextEvent.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}
```

### 4. Секція соц. мереж "Слідкуйте за нами"

**Розташування:** Після секції "Команда"

```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">{t('social.title')}</h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/groups/literaktiv"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow group"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
          <FaFacebook className="text-3xl text-blue-500 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Facebook</h3>
        <p className="text-gray-500 mb-4">{t('social.facebookDesc')}</p>
        <span className="text-blue-500 font-medium">{t('social.join')} →</span>
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/literaktiv"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow group"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors">
          <FaTelegram className="text-3xl text-sky-500 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Telegram</h3>
        <p className="text-gray-500 mb-4">{t('social.telegramDesc')}</p>
        <span className="text-sky-500 font-medium">{t('social.subscribe')} →</span>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/literaktiv_wien"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow group"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-colors">
          <FaInstagram className="text-3xl text-pink-500 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Instagram</h3>
        <p className="text-gray-500 mb-4">{t('social.instagramDesc')}</p>
        <span className="text-pink-500 font-medium">{t('social.follow')} →</span>
      </a>
    </div>
  </div>
</section>
```

### 5. Embedded Google Form

**Розташування:** В кінці сторінки, перед Footer

```tsx
<section id="submit-event" className="py-16 bg-white">
  <div className="max-w-3xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-4">{t('submitEvent.title')}</h2>
    <p className="text-gray-600 text-center mb-8">{t('submitEvent.description')}</p>

    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdxgFUHGg_76Rm0P3e26yGpagH664TdlnzM91FGkof7_qHehA/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        className="border-0"
      >
        {t('submitEvent.loading')}
      </iframe>
    </div>
  </div>
</section>
```

---

## Новий порядок секцій

1. **Hero** (існуючий)
2. **Статистика** ⭐ новий
3. **Найближча подія** ⭐ новий (великий банер)
4. **Найближчі події** ⭐ оновлений (картки з фото)
5. **Архівні події** ⭐ новий
6. **Блог** (існуючий)
7. **Про нас** (існуючий)
8. **Що ми робимо** (існуючий)
9. **Команда** (існуючий)
10. **Соц. мережі** ⭐ новий
11. **Форма події** ⭐ новий (embedded)
12. **Footer** (існуючий)

---

## Переклади для додавання

**`messages/uk.json`:**
```json
{
  "stats": {
    "events": "подій",
    "guests": "гостей",
    "authors": "авторів",
    "years": "роки"
  },
  "home": {
    "nextEvent": {
      "title": "Найближча подія",
      "register": "Зареєструватися"
    }
  },
  "social": {
    "title": "Слідкуйте за нами",
    "facebookDesc": "Приєднуйтесь до нашої спільноти",
    "telegramDesc": "Отримуйте сповіщення про події",
    "instagramDesc": "Дивіться фото з наших заходів",
    "join": "Приєднатися",
    "subscribe": "Підписатися",
    "follow": "Підписатися"
  },
  "submitEvent": {
    "title": "Запропонуйте свою подію",
    "description": "Заповніть форму і ми зв'яжемося з вами",
    "loading": "Завантаження форми..."
  }
}
```

**`messages/de.json`:**
```json
{
  "stats": {
    "events": "Veranstaltungen",
    "guests": "Gäste",
    "authors": "Autoren",
    "years": "Jahre"
  },
  "home": {
    "nextEvent": {
      "title": "Nächste Veranstaltung",
      "register": "Registrieren"
    }
  },
  "social": {
    "title": "Folgen Sie uns",
    "facebookDesc": "Treten Sie unserer Community bei",
    "telegramDesc": "Erhalten Sie Event-Benachrichtigungen",
    "instagramDesc": "Sehen Sie Fotos von unseren Events",
    "join": "Beitreten",
    "subscribe": "Abonnieren",
    "follow": "Folgen"
  },
  "submitEvent": {
    "title": "Schlagen Sie Ihre Veranstaltung vor",
    "description": "Füllen Sie das Formular aus und wir werden uns bei Ihnen melden",
    "loading": "Formular wird geladen..."
  }
}
```

**`messages/en.json`:**
```json
{
  "stats": {
    "events": "events",
    "guests": "guests",
    "authors": "authors",
    "years": "years"
  },
  "home": {
    "nextEvent": {
      "title": "Next Event",
      "register": "Register"
    }
  },
  "social": {
    "title": "Follow Us",
    "facebookDesc": "Join our community",
    "telegramDesc": "Get event notifications",
    "instagramDesc": "See photos from our events",
    "join": "Join",
    "subscribe": "Subscribe",
    "follow": "Follow"
  },
  "submitEvent": {
    "title": "Suggest Your Event",
    "description": "Fill out the form and we will contact you",
    "loading": "Loading form..."
  }
}
```

---

## Файли для зміни

| Файл | Зміни |
|------|-------|
| `src/app/[locale]/page.tsx` | Всі нові секції |
| `messages/uk.json` | Переклади |
| `messages/de.json` | Переклади |
| `messages/en.json` | Переклади |

---

## Тестування

1. Перевірити відображення карток подій з фото
2. Перевірити статистику (числа правильні?)
3. Перевірити банер найближчої події
4. Перевірити секцію соц. мереж (посилання працюють?)
5. Перевірити embedded Google Form
6. Перевірити всі 3 мови
7. Перевірити адаптивність (mobile, tablet, desktop)
8. Перевірити швидкість завантаження сторінки

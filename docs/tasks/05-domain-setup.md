# Задача 5: Налаштування домену literaktiv

## Опис
Придбати та налаштувати доменне ім'я для сайту.

## Пріоритет
**Адміністративна задача** - не потребує змін у коді

## Варіанти доменів

| Домен | Ціна (орієнтовно) | Примітки |
|-------|-------------------|----------|
| `literaktiv.at` | ~15-20€/рік | Австрійський домен, найкраще для локальної аудиторії |
| `literaktiv.com` | ~12-15€/рік | Міжнародний, універсальний |
| `literaktiv.org` | ~12-15€/рік | Для некомерційних організацій |
| `literaktiv.eu` | ~10-12€/рік | Європейський |

**Рекомендація:** `literaktiv.at` - підкреслює австрійську локацію організації.

## Де придбати домен

### Для .at домену
- [nic.at](https://www.nic.at) - офіційний реєстратор
- [world4you.com](https://www.world4you.com) - австрійський хостинг
- [easyname.at](https://www.easyname.at) - австрійський реєстратор

### Для .com/.org/.eu
- [Namecheap](https://www.namecheap.com) - бюджетний варіант
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - без націнки
- [Google Domains](https://domains.google) - простий інтерфейс

## Кроки налаштування

### 1. Придбати домен
1. Обрати реєстратора
2. Перевірити доступність домену
3. Зареєструвати на 1-2 роки
4. Зберегти дані для входу в панель керування

### 2. Налаштувати DNS у Vercel

**Варіант A: Vercel як DNS (рекомендовано)**

1. Зайти в [Vercel Dashboard](https://vercel.com/dashboard)
2. Обрати проект → Settings → Domains
3. Натиснути "Add Domain"
4. Ввести домен: `literaktiv.at`
5. Vercel покаже DNS записи для налаштування
6. У реєстратора змінити Nameservers на:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

**Варіант B: Зберегти DNS у реєстратора**

Додати записи в DNS реєстратора:
```
Тип    Ім'я    Значення                  TTL
A      @       76.76.21.21               3600
CNAME  www     cname.vercel-dns.com.     3600
```

### 3. Налаштувати в Vercel

1. Settings → Domains → Add Domain
2. Ввести `literaktiv.at`
3. Додати `www.literaktiv.at` як redirect
4. Vercel автоматично налаштує SSL сертифікат

### 4. Перевірка

1. Почекати 5-30 хвилин на DNS propagation
2. Відкрити https://literaktiv.at
3. Перевірити SSL сертифікат (замок у браузері)
4. Перевірити redirect з www на основний домен

## Зміни в коді (опціонально)

### Environment Variables

Додати в Vercel (Settings → Environment Variables):
```
NEXT_PUBLIC_SITE_URL=https://literaktiv.at
```

### next.config.ts (якщо потрібні redirects)

```typescript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/uk',
        permanent: true,
      },
    ];
  },
};
```

### Sitemap (опціонально)

Створити `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://literaktiv.at/uk</loc>
    <lastmod>2025-01-02</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://literaktiv.at/de</loc>
    <lastmod>2025-01-02</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://literaktiv.at/en</loc>
    <lastmod>2025-01-02</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://literaktiv.at/uk/events</loc>
    <lastmod>2025-01-02</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://literaktiv.at/uk/blog</loc>
    <lastmod>2025-01-02</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### robots.txt (опціонально)

Створити `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://literaktiv.at/sitemap.xml
```

## Чеклист

- [ ] Обрати доменне ім'я
- [ ] Придбати домен у реєстратора
- [ ] Налаштувати DNS (Vercel або записи)
- [ ] Додати домен у Vercel Dashboard
- [ ] Дочекатися SSL сертифікату
- [ ] Перевірити роботу сайту на новому домені
- [ ] Оновити посилання в соц. мережах
- [ ] Оновити NEXT_PUBLIC_SITE_URL в Vercel
- [ ] (Опціонально) Додати sitemap.xml
- [ ] (Опціонально) Додати robots.txt

## Вартість

| Елемент | Вартість |
|---------|----------|
| Домен .at | ~15-20€/рік |
| Vercel Hosting | Безкоштовно (Hobby plan) |
| SSL сертифікат | Безкоштовно (через Vercel) |

**Загалом:** ~15-20€/рік

## Примітки

- DNS зміни можуть зайняти до 48 годин (зазвичай 5-30 хвилин)
- Vercel автоматично оновлює SSL сертифікати
- Старий домен (vercel.app) продовжить працювати
- Можна додати кілька доменів до одного проекту

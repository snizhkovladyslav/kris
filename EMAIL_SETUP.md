# Налаштування відправки пошти

## Варіант 1: Gmail (з nodemailer)

### 1. Створіть файл `.env.local` в корені проекту

```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=info@literaktiv.at
```

### 2. Налаштування Gmail для відправки пошти

#### Для Gmail потрібно використовувати App Password:

1. **Увійдіть в свій Google Account**
2. **Увімкніть 2-Step Verification** (якщо ще не увімкнено)
3. **Перейдіть до Security > App passwords**
4. **Згенеруйте новий app password для "Mail"**
5. **Використовуйте цей пароль в EMAIL_PASS**

### 3. Встановіть nodemailer

```bash
npm install nodemailer @types/nodemailer
```

---

## Варіант 2: Resend (рекомендований)

### 1. Зареєструйтесь на [resend.com](https://resend.com)

### 2. Отримайте API ключ

### 3. Створіть файл `.env.local`

```bash
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=info@literaktiv.at
```

### 4. Встановіть Resend

```bash
npm install resend
```

### 5. Використовуйте Resend роут

Замініть в `src/app/submit-event/page.tsx`:

```javascript
const response = await fetch('/api/submit-event/resend', {
  // замість '/api/submit-event'
```

---

## Тестування

Після налаштування:

1. Запустіть сервер: `npm run dev`
2. Перейдіть на `http://localhost:3000/submit-event`
3. Заповніть форму та відправте
4. Перевірте, чи отримали ви пошту

## Безпека

- Ніколи не комітьте `.env.local` в Git
- Використовуйте App Passwords замість звичайних паролів
- Регулярно оновлюйте паролі

## Troubleshooting

### Gmail помилки:

#### Помилка "Invalid login"
- Перевірте, чи правильно вказаний EMAIL_USER
- Переконайтеся, що використовуєте App Password, а не звичайний пароль

#### Помилка "Connection timeout"
- Перевірте інтернет-з'єднання
- Переконайтеся, що Gmail не блокує з'єднання

#### Помилка "Authentication failed"
- Увімкніть "Less secure app access" в Gmail (не рекомендується)
- Або використовуйте App Password

### Resend помилки:

#### Помилка "Invalid API key"
- Перевірте, чи правильно скопійований API ключ
- Переконайтеся, що домен підтверджений в Resend

#### Помилка "Domain not verified"
- Підтвердіть свій домен в Resend Dashboard
- Або використовуйте підтверджений домен Resend

## Переваги Resend:

✅ Простіше налаштування  
✅ Кращі deliverability  
✅ Детальна аналітика  
✅ Webhook підтримка  
✅ Безкоштовний план (3000 email/місяць) 
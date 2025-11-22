import { NextResponse } from 'next/server';
import { google } from 'googleapis';

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

export async function GET(request: Request) {
  try {
    // Ініціалізуємо Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID not configured' },
        { status: 500 }
      );
    }

    // Отримуємо локаль з query параметрів
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'uk';
    
    // Валідація локалі
    const validLocales = ['uk', 'de', 'en'];
    const safeLocale = validLocales.includes(locale) ? locale : 'uk';

    // Читаємо дані з листа "posts_{locale}"
    const range = `posts_${safeLocale}!A2:Z`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    // Перетворюємо рядки в об'єкти BlogPost
    const posts: BlogPost[] = rows.map((row, index) => {
      const [id, title, excerpt, author, date, category, image, tagsString, content] = row;

      // Парсимо теги з рядка (розділені пробілами)
      const tags = tagsString ? tagsString.split(' ').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) : [];
      
      // Розраховуємо приблизний час читання на основі довжини контенту
      const wordCount = content ? content.split(' ').length : 0;
      const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' хв';
      
      return {
        id: id || `post-${index + 1}`,
        title: title || 'Без назви',
        excerpt: excerpt || 'Опис відсутній',
        content: content || excerpt || 'Контент відсутній',
        author: author || 'Невідомий автор',
        date: date || new Date().toLocaleDateString('uk-UA'),
        category: category || 'Інше',
        image: image || '',
        readTime: readTime,
        tags: tags,
      };
    }).filter(Boolean) as BlogPost[];

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
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

    // Читаємо дані з листа "posts"
    const range = 'posts!A2:J'; // Припускаємо, що дані починаються з рядка 2
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
      // Перевіряємо, чи є достатньо колонок
      if (row.length < 10) {
        console.warn(`Row ${index + 2} has insufficient columns:`, row);
        return null;
      }
      
      const [id, title, excerpt, content, author, date, category, image, readTime, tagsString] = row;
      
      // Парсимо теги з рядка (розділені пробілами)
      const tags = tagsString ? tagsString.split(' ').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) : [];
      
      return {
        id: id || `post-${index + 1}`,
        title: title || 'Без назви',
        excerpt: excerpt || 'Опис відсутній',
        content: content || '',
        author: author || 'Невідомий автор',
        date: date || new Date().toLocaleDateString('uk-UA'),
        category: category || 'Інше',
        image: image || '',
        readTime: readTime || '5 хв',
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
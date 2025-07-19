import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Налаштування Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID not configured' },
        { status: 500 }
      );
    }

    // Отримуємо дані з таблиці "events"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'events!A2:G', // Від рядка 2 до кінця, колонки A-G
    });

    const rows = response.data.values || [];

    // Перетворюємо дані в об'єкти
    const events = rows.map((row) => ({
      date: row[0] || '',
      title: row[1] || '',
      description: row[2] || '',
      time: row[3] || '',
      type: row[4] || '',
      status: row[5] || '',
      color: row[6] || 'orange',
    }));

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 
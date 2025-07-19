import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventTitle,
      eventType,
      eventDate,
      eventTime,
      eventDescription,
      contactName,
      contactEmail,
      contactPhone,
      organization,
      venue,
      maxParticipants,
      requirements,
      additionalInfo
    } = body;

    // Валідація обов'язкових полів
    if (!eventTitle || !eventType || !eventDate || !eventTime || !eventDescription || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: 'Будь ласка, заповніть всі обов\'язкові поля' },
        { status: 400 }
      );
    }

    // Налаштування транспортера для відправки пошти
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // або інший сервіс
      auth: {
        user: process.env.EMAIL_USER, // додайте в .env
        pass: process.env.EMAIL_PASS  // додайте в .env
      }
    });

    // Формування HTML повідомлення
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
          Нова пропозиція події - LiterAktiv
        </h2>
        
        <h3 style="color: #374151; margin-top: 30px;">Деталі події</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Назва події:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${eventTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Тип події:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${eventType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Дата:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${eventDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Час:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${eventTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Опис:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${eventDescription}</td>
          </tr>
        </table>

        <h3 style="color: #374151; margin-top: 30px;">Контактна інформація</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Ім'я:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${contactName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Email:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${contactEmail}</td>
          </tr>
          ${contactPhone ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Телефон:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${contactPhone}</td>
          </tr>
          ` : ''}
          ${organization ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Організація:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${organization}</td>
          </tr>
          ` : ''}
        </table>

        ${venue || maxParticipants || requirements || additionalInfo ? `
        <h3 style="color: #374151; margin-top: 30px;">Додаткова інформація</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          ${venue ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Місце проведення:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${venue}</td>
          </tr>
          ` : ''}
          ${maxParticipants ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Максимальна кількість учасників:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${maxParticipants}</td>
          </tr>
          ` : ''}
          ${requirements ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Вимоги до учасників:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${requirements}</td>
          </tr>
          ` : ''}
          ${additionalInfo ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">Додаткова інформація:</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${additionalInfo}</td>
          </tr>
          ` : ''}
        </table>
        ` : ''}

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
          <p style="margin: 0; color: #92400e;">
            <strong>Час відправки:</strong> ${new Date().toLocaleString('uk-UA')}
          </p>
        </div>
      </div>
    `;

    // Відправка пошти
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'info@literaktiv.at', // додайте в .env
      subject: `Нова пропозиція події: ${eventTitle}`,
      html: htmlContent,
      replyTo: contactEmail
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ваша пропозиція успішно відправлена! Ми зв\'яжемося з вами найближчим часом.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Помилка відправки форми:', error);
    return NextResponse.json(
      { 
        error: 'Виникла помилка при відправці форми. Будь ласка, спробуйте ще раз або зв\'яжіться з нами безпосередньо.' 
      },
      { status: 500 }
    );
  }
} 
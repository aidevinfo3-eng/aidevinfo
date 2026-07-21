import { NextResponse } from 'next/server';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botcheck?: string;
};

export async function POST(request: Request) {
  try {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json(
        { success: false, message: 'Form is not configured.' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactBody;

    if (body.botcheck) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully.',
      });
    }

    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const subject = body.subject?.trim() ?? 'General Inquiry';
    const message = body.message?.trim() ?? '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `[AI Dev Info] ${subject}`,
        message,
        from_name: 'AI Dev Info Contact',
        replyto: email,
      }),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Failed to send message. Please try again.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

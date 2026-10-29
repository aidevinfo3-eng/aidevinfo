import { NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljjgaja';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botcheck?: string;
};

export async function POST(request: Request) {
  try {
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

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `[AI Dev Info] ${subject}`,
        _replyto: email,
      }),
    });

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as {
        error?: string;
        errors?: Array<{ message?: string }>;
      } | null;

      const messageFromFormspree =
        result?.error ||
        result?.errors?.[0]?.message ||
        'Failed to send message. Please try again.';

      return NextResponse.json(
        { success: false, message: messageFromFormspree },
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

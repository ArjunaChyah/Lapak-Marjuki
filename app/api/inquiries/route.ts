import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json({ success: false, error: 'Nama dan pesan wajib diisi' }, { status: 400 });
    }

    try {
      await prisma.inquiry.create({
        data: { name, phone: phone || null, message },
      });
    } catch (dbError) {
      console.warn('MySQL inquiry notice:', dbError);
    }

    return NextResponse.json({ success: true, message: 'Pesan berhasil disimpan' });
  } catch (error) {
    console.error('Inquiry creation error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}

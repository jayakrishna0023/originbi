import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const result = await sql`SELECT 1 AS ok`;
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('DB test error:', error);
    return NextResponse.json(
      { success: false, error: String(error?.message || error) },
      { status: 500 }
    );
  }
}

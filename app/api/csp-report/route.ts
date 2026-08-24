import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const report: unknown = await request.json().catch(() => null);

    console.warn('CSP violation report:', JSON.stringify(report, null, 2));

    return new NextResponse(null, { status: 204 });
}

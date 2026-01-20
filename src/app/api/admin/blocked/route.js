import { NextResponse } from 'next/server';
import { getBlockedSlots, addBlockedSlot, removeBlockedSlot } from '@/lib/db';

export async function GET() {
    const slots = await getBlockedSlots();
    return NextResponse.json(slots);
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.date) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        // If time is empty string or null, treat as full day block (keep as is)
        const newSlot = await addBlockedSlot({
            date: body.date,
            time: body.time || null,
            startTime: body.startTime || null,
            endTime: body.endTime || null
        });

        return NextResponse.json(newSlot, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to block slot' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        await removeBlockedSlot(body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to unblock slot' }, { status: 500 });
    }
}

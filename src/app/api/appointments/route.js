import { NextResponse } from 'next/server';
import { getAppointments, saveAppointment } from '@/lib/db';

export async function GET() {
    const appointments = getAppointments();
    return NextResponse.json(appointments);
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email || !body.date || !body.time) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check for blocked slots
        const { getBlockedSlots } = await import('@/lib/db');
        const blockedSlots = getBlockedSlots();

        const isBlocked = blockedSlots.some(slot => {
            if (slot.date === body.date) {
                // Legacy: Blocked if full day (no time) OR matching time
                if (!slot.time && !slot.startTime && !slot.endTime) return true;
                if (slot.time && slot.time === body.time) return true;

                // Range Blocking
                if (slot.startTime || slot.endTime) {
                    const start = slot.startTime || "00:00";
                    const end = slot.endTime || "23:59";
                    return body.time >= start && body.time <= end;
                }
            }
            return false;
        });

        if (isBlocked) {
            return NextResponse.json(
                { error: 'This slot is not available' },
                { status: 400 }
            );
        }

        const newAppointment = saveAppointment(body);
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create appointment' },
            { status: 500 }
        );
    }
}

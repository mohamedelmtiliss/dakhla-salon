import { NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const updatedAppointment = await updateAppointmentStatus(id, body.status);

        if (!updatedAppointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            );
        }

        // Mock Email Sending
        console.log(`
      ---------------------------------------------------
      [MOCK EMAIL SERVICE]
      To: ${updatedAppointment.email}
      Subject: Appointment Update - Dakhla Salon
      
      Dear ${updatedAppointment.name},
      
      Your appointment for ${updatedAppointment.service} on ${updatedAppointment.date} at ${updatedAppointment.time} has been ${updatedAppointment.status.toUpperCase()}.
      
      ${updatedAppointment.status === 'approved'
                ? 'We look forward to seeing you!'
                : 'Please contact us to reschedule.'}
      
      Best,
      Dakhla Salon Team
      ---------------------------------------------------
    `);

        return NextResponse.json(updatedAppointment);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update appointment' },
            { status: 500 }
        );
    }
}


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const { deleteAppointment } = await import('@/lib/db');

        const success = await deleteAppointment(id);

        if (!success) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete appointment' },
            { status: 500 }
        );
    }
}

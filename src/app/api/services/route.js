import { NextResponse } from 'next/server';
import { getServices, updateService } from '@/lib/db';

export async function GET() {
    const services = getServices();
    return NextResponse.json(services);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { id, updates } = body;

        if (!id || !updates) {
            return NextResponse.json(
                { error: 'Missing id or updates' },
                { status: 400 }
            );
        }

        const updatedService = updateService(id, updates);

        if (!updatedService) {
            return NextResponse.json(
                { error: 'Service not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedService);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

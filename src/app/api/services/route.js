import { NextResponse } from 'next/server';
import { getServices, updateService } from '@/lib/db';

export async function GET() {
    const services = await getServices();
    return NextResponse.json(services);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { id, updates } = body;

        if (!id || !updates) {
            return NextResponse.json({ error: 'Missing id or updates' }, { status: 400 });
        }

        const updatedItem = await updateService(id, updates);

        if (!updatedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

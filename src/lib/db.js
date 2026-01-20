import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'appointments.json');
const servicesFile = path.join(dataDir, 'services.json');
const blockedFile = path.join(dataDir, 'blocked.json');

// Helper to check if we should use Vercel KV
const useKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

// Ensure local data directory exists if not using KV
if (!useKV) {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));
    if (!fs.existsSync(blockedFile)) fs.writeFileSync(blockedFile, JSON.stringify([]));
    if (!fs.existsSync(servicesFile)) fs.writeFileSync(servicesFile, JSON.stringify([]));
}

// --- Generic Helpers ---

async function readData(key, filepath) {
    if (useKV) {
        return (await kv.get(key)) || [];
    } else {
        try {
            const fileData = fs.readFileSync(filepath, 'utf8');
            return fileData ? JSON.parse(fileData) : [];
        } catch (error) {
            return [];
        }
    }
}

async function writeData(key, filepath, data) {
    if (useKV) {
        await kv.set(key, data);
    } else {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    }
}

// --- Appointments ---

export async function getAppointments() {
    return await readData('appointments', dataFile);
}

export async function saveAppointment(appointment) {
    const appointments = await getAppointments();
    const newAppointment = {
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...appointment,
    };
    appointments.push(newAppointment);
    await writeData('appointments', dataFile, appointments);
    return newAppointment;
}

export async function updateAppointmentStatus(id, status) {
    const appointments = await getAppointments();
    const index = appointments.findIndex(app => app.id === id);

    if (index !== -1) {
        appointments[index].status = status;
        appointments[index].updatedAt = new Date().toISOString();
        await writeData('appointments', dataFile, appointments);
        return appointments[index];
    }
    return null;
}

export async function deleteAppointment(id) {
    let appointments = await getAppointments();
    const initialLength = appointments.length;
    appointments = appointments.filter(app => app.id !== id);

    if (appointments.length !== initialLength) {
        await writeData('appointments', dataFile, appointments);
        return true;
    }
    return false;
}

// --- Services ---

export async function getServices() {
    return await readData('services', servicesFile);
}

export async function updateService(itemId, updates) {
    const services = await getServices();
    const category = services.find(c => c.items.some(i => i.id === itemId));

    if (category) {
        const itemIndex = category.items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            category.items[itemIndex] = { ...category.items[itemIndex], ...updates };
            await writeData('services', servicesFile, services);
            return category.items[itemIndex];
        }
    }
    return null;
}

// --- Blocked Slots ---

export async function getBlockedSlots() {
    return await readData('blocked', blockedFile);
}

export async function addBlockedSlot(slot) {
    const slots = await getBlockedSlots();
    const exists = slots.some(s =>
        s.date === slot.date &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    );
    if (!exists) {
        slots.push(slot);
        await writeData('blocked', blockedFile, slots);
    }
    return slot;
}

export async function removeBlockedSlot(slot) {
    let slots = await getBlockedSlots();
    slots = slots.filter(s => !(
        s.date === slot.date &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    ));
    await writeData('blocked', blockedFile, slots);
    return true;
}

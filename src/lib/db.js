import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'appointments.json');
const servicesFile = path.join(dataDir, 'services.json');
const blockedFile = path.join(dataDir, 'blocked.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure data files exist
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));
if (!fs.existsSync(blockedFile)) fs.writeFileSync(blockedFile, JSON.stringify([]));
if (!fs.existsSync(servicesFile)) fs.writeFileSync(servicesFile, JSON.stringify([]));

// --- Appointments ---

export function getAppointments() {
    try {
        const fileData = fs.readFileSync(dataFile, 'utf8');
        return fileData ? JSON.parse(fileData) : [];
    } catch (error) {
        return [];
    }
}

export function saveAppointment(appointment) {
    const appointments = getAppointments();
    const newAppointment = {
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...appointment,
    };
    appointments.push(newAppointment);
    fs.writeFileSync(dataFile, JSON.stringify(appointments, null, 2));
    return newAppointment;
}

export function updateAppointmentStatus(id, status) {
    const appointments = getAppointments();
    const index = appointments.findIndex(app => app.id === id);

    if (index !== -1) {
        appointments[index].status = status;
        appointments[index].updatedAt = new Date().toISOString();
        fs.writeFileSync(dataFile, JSON.stringify(appointments, null, 2));
        return appointments[index];
    }
    return null;
}

export function deleteAppointment(id) {
    let appointments = getAppointments();
    const initialLength = appointments.length;
    appointments = appointments.filter(app => app.id !== id);

    if (appointments.length !== initialLength) {
        fs.writeFileSync(dataFile, JSON.stringify(appointments, null, 2));
        return true;
    }
    return false;
}

// --- Services ---

export function getServices() {
    try {
        const fileData = fs.readFileSync(servicesFile, 'utf8');
        return fileData ? JSON.parse(fileData) : [];
    } catch (error) {
        return [];
    }
}

export function updateService(itemId, updates) {
    const services = getServices();
    // Find the category containing the item
    const category = services.find(c => c.items.some(i => i.id === itemId));

    if (category) {
        const itemIndex = category.items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            category.items[itemIndex] = { ...category.items[itemIndex], ...updates };
            fs.writeFileSync(servicesFile, JSON.stringify(services, null, 2));
            return category.items[itemIndex];
        }
    }
    return null;
}

// --- Blocked Slots ---

export function getBlockedSlots() {
    try {
        const fileData = fs.readFileSync(blockedFile, 'utf8');
        return fileData ? JSON.parse(fileData) : [];
    } catch (error) {
        return [];
    }
}

export function addBlockedSlot(slot) {
    const slots = getBlockedSlots();
    // Avoid duplicates
    const exists = slots.some(s =>
        s.date === slot.date &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    );
    if (!exists) {
        slots.push(slot);
        fs.writeFileSync(blockedFile, JSON.stringify(slots, null, 2));
    }
    return slot;
}

export function removeBlockedSlot(slot) {
    let slots = getBlockedSlots();
    slots = slots.filter(s => !(
        s.date === slot.date &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    ));
    fs.writeFileSync(blockedFile, JSON.stringify(slots, null, 2));
    return true;
}

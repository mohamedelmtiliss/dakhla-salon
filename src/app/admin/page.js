"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("appointments"); // appointments, services, availability

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
        } else {
            alert("Invalid password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-neutral-900">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border rounded-lg text-neutral-900"
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setActiveTab("appointments")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "appointments" ? "bg-primary text-white" : "bg-white text-neutral-700 hover:bg-gray-100"}`}
                        >
                            Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab("services")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "services" ? "bg-primary text-white" : "bg-white text-neutral-700 hover:bg-gray-100"}`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => setActiveTab("availability")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "availability" ? "bg-primary text-white" : "bg-white text-neutral-700 hover:bg-gray-100"}`}
                        >
                            Availability
                        </button>
                    </div>
                </div>

                {activeTab === "appointments" && <AppointmentsTab />}
                {activeTab === "services" && <ServicesTab />}
                {activeTab === "availability" && <AvailabilityTab />}

            </div>
        </div>
    );
}

function AppointmentsTab() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/appointments");
            const data = await res.json();
            setAppointments(data.reverse());
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setAppointments(prev => prev.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ));
            }
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const deleteAppointment = async (id) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return;

        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setAppointments(prev => prev.filter(app => app.id !== id));
            } else {
                alert("Failed to delete appointment");
            }
        } catch (error) {
            alert("Error deleting appointment");
        }
    };



    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-neutral-900">Bookings</h2>
                <button onClick={fetchAppointments} className="text-sm text-primary hover:underline">Refresh</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((app) => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(app.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                    <div className="text-sm text-gray-500">{app.email}</div>
                                    <div className="text-sm text-gray-500">{app.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{app.service}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{app.date}</div>
                                    <div className="text-sm text-gray-500">{app.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {app.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {app.status === 'pending' && (
                                        <>
                                            <button onClick={() => updateStatus(app.id, 'approved')} className="text-green-600 hover:text-green-900">Approve</button>
                                            <button onClick={() => updateStatus(app.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                                        </>
                                    )}
                                    {app.status !== 'pending' && (
                                        <button onClick={() => deleteAppointment(app.id)} className="text-gray-500 hover:text-red-600">Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ServicesTab() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    const handlePriceChange = async (itemId, newPrice) => {
        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: itemId, updates: { price: newPrice } }),
            });

            if (res.ok) {
                // Refresh data
                const updated = await res.json();
                setServices(prev => prev.map(cat => ({
                    ...cat,
                    items: cat.items.map(item => item.id === itemId ? updated : item)
                })));
                alert("Price updated!");
            }
        } catch (error) {
            alert("Failed to update price");
        }
    };

    return (
        <div className="space-y-8">
            {services.map((category, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow overflow-hidden p-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">{category.category}</h2>
                    <div className="space-y-4">
                        {category.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-gray-600">Price:</label>
                                    <input
                                        type="text"
                                        defaultValue={item.price}
                                        onBlur={(e) => {
                                            if (e.target.value !== item.price) {
                                                handlePriceChange(item.id, e.target.value);
                                            }
                                        }}
                                        className="border border-gray-300 rounded px-2 py-1 w-24 text-right text-neutral-900"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AvailabilityTab() {
    const [blockedSlots, setBlockedSlots] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [newStartTime, setNewStartTime] = useState("");
    const [newEndTime, setNewEndTime] = useState("");

    const fetchBlocked = () => {
        fetch("/api/admin/blocked")
            .then(res => res.json())
            .then(data => setBlockedSlots(data));
    };

    useEffect(() => {
        fetchBlocked();
    }, []);

    const handleBlock = async (e) => {
        e.preventDefault();
        if (!newDate) return;

        try {
            const res = await fetch("/api/admin/blocked", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: newDate,
                    startTime: newStartTime || null,
                    endTime: newEndTime || null
                }),
            });

            if (res.ok) {
                fetchBlocked();
                setNewDate("");
                setNewStartTime("");
                setNewEndTime("");
            }
        } catch (error) {
            alert("Failed to block slot");
        }
    };

    const handleUnblock = async (slot) => {
        try {
            const res = await fetch("/api/admin/blocked", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slot),
            });

            if (res.ok) {
                fetchBlocked();
            }
        } catch (error) {
            alert("Failed to unblock slot");
        }
    };

    const formatTimeDisplay = (slot) => {
        if (slot.time) return `at ${slot.time}`; // Legacy support
        if (slot.startTime && slot.endTime) return `${slot.startTime} - ${slot.endTime}`;
        if (slot.startTime) return `From ${slot.startTime}`;
        if (slot.endTime) return `Until ${slot.endTime}`;
        return "Full Day";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Block New Slot */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Block Availability</h2>
                <form onSubmit={handleBlock} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-neutral-900"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                                type="time"
                                value={newStartTime}
                                onChange={(e) => setNewStartTime(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-neutral-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <input
                                type="time"
                                value={newEndTime}
                                onChange={(e) => setNewEndTime(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-neutral-900"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Leave both empty to block the entire day.<br />
                        Leave Start empty for "Until [End Time]".<br />
                        Leave End empty for "From [Start Time]".
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Block
                    </button>
                </form>
            </div>

            {/* List Blocked Slots */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Blocked Slots</h2>
                <div className="space-y-3">
                    {blockedSlots.length === 0 && <p className="text-gray-500 italic">No blocked slots.</p>}
                    {blockedSlots.map((slot, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <span className="font-medium text-gray-900">{slot.date}</span>
                                <span className="ml-2 text-sm text-gray-600">
                                    {formatTimeDisplay(slot)}
                                </span>
                            </div>
                            <button
                                onClick={() => handleUnblock(slot)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                                Unblock
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

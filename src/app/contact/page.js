"use client";
import { useState, useEffect } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: ""
    });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [blockedSlots, setBlockedSlots] = useState([]);
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        fetch('/api/admin/blocked')
            .then(res => res.json())
            .then(data => setBlockedSlots(data))
            .catch(err => console.error("Failed to fetch blocked slots", err));
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === 'date') {
            const isDateBlocked = blockedSlots.some(slot =>
                slot.date === value &&
                !slot.time && !slot.startTime && !slot.endTime // Full day block only
            );
            if (isDateBlocked) {
                setDateError("This date is unavailable. Please choose another.");
                setFormData(prev => ({ ...prev, [id]: "" }));
                return;
            } else {
                setDateError("");
            }
        }

        if (id === 'time' && formData.date) {
            const isTimeBlocked = blockedSlots.some(slot => {
                if (slot.date === formData.date) {
                    // Legacy exact match
                    if (slot.time && slot.time === value) return true;

                    // Range match
                    if (slot.startTime || slot.endTime) {
                        const start = slot.startTime || "00:00";
                        const end = slot.endTime || "23:59";
                        return value >= start && value <= end;
                    }
                }
                return false;
            });

            if (isTimeBlocked) {
                setDateError("This time slot is unavailable.");
                setFormData(prev => ({ ...prev, [id]: "" }));
                return;
            } else {
                setDateError("");
            }
        }

        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/30 py-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    We&apos;d love to hear from you. Book your appointment or ask us anything.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="flex items-start">
                                    <span className="font-bold text-primary w-24">Address:</span>
                                    <span>123 Beauty Avenue, Suite 100<br />New York, NY 10001</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="font-bold text-primary w-24">Phone:</span>
                                    <span>+1 (555) 123-4567</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="font-bold text-primary w-24">Email:</span>
                                    <span>hello@dakhlasalon.com</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Opening Hours</h2>
                            <div className="space-y-2 text-muted-foreground">
                                <div className="flex justify-between max-w-xs border-b border-gray-200 pb-2">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 7:00 PM</span>
                                </div>
                                <div className="flex justify-between max-w-xs border-b border-gray-200 pb-2">
                                    <span>Saturday</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between max-w-xs border-b border-gray-200 pb-2">
                                    <span>Sunday</span>
                                    <span>10:00 AM - 5:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative shadow-md">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://maps.google.com/maps?q=23.688000686227056,-15.951092398858789&hl=en&z=14&output=embed"
                                title="Salon Location"
                                className="absolute inset-0"
                            >
                            </iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/30">
                        <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Book an Appointment</h2>

                        {status === "success" && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> Your appointment request has been sent. We will confirm shortly.</span>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline"> Something went wrong. Please try again.</span>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">Date *</label>
                                    <input
                                        type="date"
                                        id="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900 ${dateError ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-1">Time *</label>
                                    <input
                                        type="time"
                                        id="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-1">Service Interested In *</label>
                                <select
                                    id="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                >
                                    <option value="">Select a service...</option>
                                    <option value="Hair Styling">Hair Styling</option>
                                    <option value="Nail Care">Nail Care</option>
                                    <option value="Spa Treatment">Spa Treatment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                                    placeholder="Any special requests?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {status === "loading" ? "Sending..." : "Book Appointment"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

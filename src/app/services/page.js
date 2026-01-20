"use client";
import { useState, useEffect } from "react";

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch services", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading services...</div>;
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/30 py-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    Discover our full range of premium beauty treatments designed to help you look and feel your best.
                </p>
            </div>

            {/* Services List */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
                {services.map((category, idx) => (
                    <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="flex items-center mb-8">
                            <h2 className="font-serif text-3xl font-bold text-primary mr-4">{category.category}</h2>
                            <div className="flex-grow h-px bg-secondary"></div>
                        </div>

                        <div className="grid gap-6">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 border border-transparent hover:border-secondary/50 group">
                                    <div className="flex-grow pr-8">
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-neutral-900">{item.name}</h3>
                                        <p className="text-muted-foreground text-sm mt-1 group-hover:text-neutral-600">{item.description}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 whitespace-nowrap">
                                        <span className="font-serif text-xl font-bold text-primary">{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Note */}
            <div className="max-w-4xl mx-auto px-4 mt-16 text-center text-sm text-muted-foreground italic">
                * Prices may vary based on hair length, texture, and stylist level. Consultations are complimentary.
            </div>
        </div>
    );
}

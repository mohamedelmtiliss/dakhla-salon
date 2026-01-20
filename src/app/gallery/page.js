import Image from "next/image";

export default function Gallery() {
    const images = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1488282687151-c5e6582e7cf1?q=80&w=1976&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2069&auto=format&fit=crop",
    ];

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/30 py-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Gallery</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    A showcase of our finest work and the beautiful atmosphere of Dakhla Salon.
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, idx) => (
                        <div
                            key={idx}
                            className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

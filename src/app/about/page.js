import Image from "next/image";

export default function About() {
    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/30 py-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Story</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    A journey of passion, style, and dedication to beauty.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
                {/* Who We Are */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1544843776-7c98a52e08a4" // Placeholder - ensure this exists or use a valid path
                            alt="Salon Interior"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Who We Are</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Welcome to Dakhla Salon, where beauty meets tranquility. Founded with a vision to create a sanctuary for self-care, we have grown into one of the city's most premier beauty destinations.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our team of expert stylists and therapists are passionate about their craft, constantly updating their skills to bring you the latest trends and techniques. We believe that every visit should be an experience, not just an appointment.
                        </p>
                    </div>
                </div>

                {/* Our Values */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="font-bold text-xl text-neutral-900 mb-3">Excellence</h3>
                            <p className="text-gray-600">We never compromise on quality, using only the finest products and techniques.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">🌿</span>
                            </div>
                            <h3 className="font-bold text-xl text-neutral-900 mb-3">Relaxation</h3>
                            <p className="text-gray-600">Your comfort is our priority. We create a calm environment for you to unwind.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="font-bold text-xl text-neutral-900 mb-3">Community</h3>
                            <p className="text-gray-600">We are proud to be a part of the local community and treat every client like family.</p>
                        </div>
                    </div>
                </div>

                {/* Meet the Team (Placeholder) */}
                <div>
                    <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-12 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        <span className="text-4xl">👤</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-neutral-900">Stylist Name</h3>
                                <p className="text-primary text-sm">Senior Stylist</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

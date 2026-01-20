import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-primary font-bold">Dakhla Salon</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Elevating beauty through premium services and personalized care.
                            Experience the ultimate in relaxation and style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg text-primary">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg text-primary">Visit Us</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>123 Beauty Avenue, Suite 100</li>
                            <li>New York, NY 10001</li>
                            <li className="pt-2">Mon - Sat: 9:00 AM - 7:00 PM</li>
                            <li>Sun: 10:00 AM - 5:00 PM</li>
                            <li className="pt-2 text-primary font-medium">+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Dakhla Salon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

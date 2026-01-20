import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop"
          alt="Luxury Salon Interior"
          fill
          className="object-cover object-center z-0"
          priority
        />

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Redefine Your Beauty
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light tracking-wide text-gray-100">
            Experience the ultimate in luxury and care at Dakhla Salon.
            Where style meets sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book an Appointment
            </Link>
            <Link
              href="/services"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <span className="text-primary font-serif italic text-xl">Welcome to Luxe</span>
        <h2 className="text-4xl font-serif font-bold mt-2 mb-6 text-foreground">
          Your Sanctuary of Style
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          At Dakhla Salon, we believe that beauty is an art form. Our team of expert stylists
          and therapists are dedicated to providing you with a personalized experience that
          leaves you looking and feeling your absolute best. From precision cuts to
          rejuvenating spa treatments, we offer a full range of premium services.
        </p>
      </section>

      {/* Featured Services */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground">Our Signature Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop"
                  alt="Hair Styling"
                  fill
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3 text-neutral-900">Hair Styling</h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Precision cuts, vibrant coloring, and styling tailored to your unique personality.
                </p>
                <Link href="/services" className="text-primary font-medium hover:text-primary/80 uppercase text-xs tracking-widest border-b border-primary pb-1">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop"
                  alt="Nail Care"
                  fill
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3 text-neutral-900">Nail Care</h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Luxurious manicures and pedicures using premium polishes and techniques.
                </p>
                <Link href="/services" className="text-primary font-medium hover:text-primary/80 uppercase text-xs tracking-widest border-b border-primary pb-1">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                  alt="Spa Treatments"
                  fill
                  className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl font-bold mb-3 text-neutral-900">Spa Treatments</h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Relax and rejuvenate with our range of facials, massages, and body treatments.
                </p>
                <Link href="/services" className="text-primary font-medium hover:text-primary/80 uppercase text-xs tracking-widest border-b border-primary pb-1">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-neutral-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready for a Transformation?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Book your appointment today and let our experts take care of you.
              Walk-ins are also welcome based on availability.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 inline-block"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

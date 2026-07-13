import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden font-sans group">
      
      {/* Background Image with subtle zoom on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/mercedes_hero.png"
          alt="About Us Background"
          fill
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[10000ms] ease-out"
          priority
        />
        {/* Dark sophisticated overlay */}
        <div className="absolute inset-0 bg-[#0a1128]/70 mix-blend-multiply"></div>
        
        {/* Dynamic Gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/40 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1EA1F1]/30 via-transparent to-[#1EA1F1]/30 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
        {/* Small decorative accent */}
        <div className="w-16 h-1 bg-[#1EA1F1] mb-6 rounded-full shadow-[0_0_10px_rgba(30,161,241,0.5)]"></div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[0.2em] uppercase drop-shadow-2xl mb-6">
          About Us
        </h1>
        
        <p className="text-base md:text-lg text-gray-200 font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
          Driving digital transformation for garage owners with innovative, high-performance solutions.
        </p>
      </div>

      {/* Bottom decorative curve/divider (optional premium touch) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent opacity-10"></div>
    </section>
  );
}

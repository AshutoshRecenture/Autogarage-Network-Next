import Image from "next/image";

export default function AboutStatsAndStory() {
  const stats = [
    { value: "550K+", label: "Active Users", color: "text-[#1bb098]" },
    { value: "200+", label: "Team Members", color: "text-[#1f8dec]" },
    { value: "65+", label: "Mobile App's", color: "text-[#273a8f]" },
    { value: "6 Years", label: "In Business", color: "text-[#f9a620]" },
    { value: "425+", label: "Clients Worldwide", color: "text-[#273a8f]" },
    { value: "500+", label: "Projects Completed", color: "text-[#1f8dec]" },
  ];

  return (
    <section className="pt-12 pb-24 bg-gradient-to-b from-white to-gray-50 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Text and Stats */}
          <div className="flex-1 flex flex-col pt-4">
            <h4 className="text-[#8492a6] font-bold text-sm mb-3 uppercase tracking-[0.15em]">Our Story</h4>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#0f172a] mb-8 leading-[1.2]">
              Every Great Story Starts with a Friendly Team
            </h2>
            
            <div className="text-gray-600 text-[15px] leading-relaxed space-y-6 mb-12 pr-0 lg:pr-12">
              <p>
                At Auto Garage Network, we specialise in delivering tailor-made solutions for garage owners' website needs. Our mission is to create high-performing, user-friendly websites that drive digital transformation for major tyre companies across the UK, enabling them to run their businesses seamlessly online.
              </p>
              <p>
                Established in Melton Mowbray, Leicestershire, we were founded with a singular focus: to modernise workshop administrative workflows and digital customer engagement. Today, we support workshops across the UK, allowing managers to reclaim wasted hours, reduce no-shows, and compete effectively with national dealer networks.
              </p>
            </div>
          </div>

          {/* Right Side: Image Composition */}
          <div className="flex-1 relative w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/3] max-w-[650px]">
              <Image
                src="/images/about-img-add.jpg"
                alt="Our Team"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats Grid (Full Width, Single Line) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mt-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-black mb-1 tracking-tight ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-gray-800 font-bold text-[10px] xl:text-[11px] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-8 font-sans text-center">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Top Gradient Mesh/Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] opacity-40 pointer-events-none flex justify-center items-center">
        <div className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] -ml-[200px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] mt-[100px] -mr-[100px]"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 z-10">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#1e3a8a] to-slate-900 mb-2 tracking-tight uppercase drop-shadow-sm">
          Pricing
        </h1>

        <div className="mt-2 space-y-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Credit Options Now Available
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Please contact our sales team
          </p>
        </div>
      </div>
    </section>
  );
}

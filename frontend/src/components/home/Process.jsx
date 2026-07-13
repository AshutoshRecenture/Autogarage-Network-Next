import {
  FaCheckCircle,
  FaClock,
  FaClipboardList,
  FaLaptopCode,
  FaRocket,
} from "react-icons/fa";

export default function Process() {
  const steps = [
    {
      id: 1,
      title: "Web Brief",
      time: "15 mins",
      icon: <FaClock className="text-blue-400" size={24} />,
      desc: "Quick initial consultation",
    },
    {
      id: 2,
      title: "Data Capture",
      time: "60 mins",
      icon: <FaClipboardList className="text-indigo-400" size={24} />,
      desc: "Gathering your requirements",
    },
    {
      id: 3,
      title: "Site Build",
      time: "Fast Turnaround",
      icon: <FaLaptopCode className="text-purple-400" size={24} />,
      desc: "Our experts craft your site",
    },
    {
      id: 4,
      title: "GO LIVE!",
      time: "Ready for business",
      icon: <FaRocket className="text-green-400" size={24} />,
      desc: "Launch your new digital presence",
    },
  ];

  return (
    <section className="py-16 bg-[#0a1128] text-white font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Short build times mean you are ready to go{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                LIVE quickly...
              </span>
            </h2>
            <p className="text-xl text-blue-100/80 font-light leading-relaxed">
              ...with all the services you need to grow & maintain your business
              smoothly.
            </p>

            <ul className="space-y-6 pt-4">
              <li className="flex items-start gap-4">
                <FaCheckCircle
                  className="text-blue-500 mt-1 shrink-0"
                  size={22}
                />
                <div>
                  <h4 className="text-[19px] font-bold text-white mb-1">
                    Hassle free set-up & switch
                  </h4>
                  <p className="text-gray-400 text-[15px]">
                    All part of the service from domains to emails
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle
                  className="text-blue-500 mt-1 shrink-0"
                  size={22}
                />
                <div>
                  <h4 className="text-[19px] font-bold text-white mb-1">
                    Flexible payment structure
                  </h4>
                  <p className="text-gray-400 text-[15px]">
                    With no upfront build costs
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle
                  className="text-blue-500 mt-1 shrink-0"
                  size={22}
                />
                <div>
                  <h4 className="text-[19px] font-bold text-white mb-1">
                    Dedicated account manager
                  </h4>
                  <p className="text-gray-400 text-[15px]">
                    And 24/7 premium support
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Process Graphic (Modern Grid) */}
          <div className="relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-2 border-dashed border-blue-500/30 rounded-full z-0 animate-[spin_20s_linear_infinite]"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:bg-white/10 flex flex-col`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-3">
                    {step.time}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

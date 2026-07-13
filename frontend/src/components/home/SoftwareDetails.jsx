import {
  FaCheckCircle,
  FaShoppingCart,
  FaTruck,
  FaTools,
  FaUsers,
  FaFileInvoiceDollar,
  FaHeadset,
  FaChartLine,
  FaMobileAlt,
  FaCarSide,
  FaCogs,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

export default function SoftwareDetails() {
  return (
    <section className="relative py-16 bg-slate-50 font-sans overflow-hidden">
      {/* Background ambient lighting - Light mode */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100 blur-[150px] -z-10 rounded-full mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-50 blur-[150px] -z-10 rounded-full mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section (Hero) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
              Garage Management <br /> Software for <br />
              <span className="text-blue-600">Streamlined Operations</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              We provide top-tier garage management software, websites, and
              technical data. Hundreds of auto repair shops trust us to help
              them save time, reduce costs, and increase sales.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-blue-600/30">
                Book a Demo <FaArrowRight />
              </button>
              <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-7 rounded-xl border border-slate-300 transition-all shadow-sm">
                Explore Features
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500 text-lg" /> Easy to Use
              </div>
              <div className="flex items-center gap-2">
                <FaChartLine className="text-blue-500 text-lg" /> Powerful
                Analytics
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-500 text-lg" /> Secure &
                Reliable
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {/* Background decoration for the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/50 to-indigo-100/50 rounded-[40px] transform rotate-3 scale-105 -z-10 blur-md"></div>
            <img
              src="/images/dashboard-mockup.png"
              alt="Dashboard Mockup"
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Unified System & Core Features Grid */}
        <div className="mb-28">
          <div className="text-center mb-14">
           
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              A Unified Platform for Every Aspect of Your Business
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-6">
            {[
              {
                title: "E-commerce",
                icon: <FaShoppingCart />,
                desc: "Sell spare parts and accessories online.",
              },
              {
                title: "Supplier Integration",
                icon: <FaTruck />,
                desc: "Automate your purchasing.",
              },
              {
                title: "Workshop Management",
                icon: <FaTools />,
                desc: "Manage jobs and workflows.",
              },
              {
                title: "Customer Relations",
                icon: <FaUsers />,
                desc: "Build stronger relationships.",
              },
              {
                title: "Accounting",
                icon: <FaFileInvoiceDollar />,
                desc: "Handle invoices & reports.",
              },
              {
                title: "Technical Support",
                icon: <FaHeadset />,
                desc: "Get dedicated assistance.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2 leading-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Smarter Operations - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-28">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-4">
              
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Smarter Operations, <br />
              <span className="text-blue-600">Clearer Decisions</span>
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              AGN provides holistic business visibility through real-time
              dashboards and structured workflow management.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-5 py-2">
              Your garage will work proactively to solve problems. Base
              decisions on dashboard data and trends to complete tasks faster.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Measure Output",
                desc: "Track and optimize technician productivity with ease.",
                icon: <FaChartLine />,
              },
              {
                title: "Stock Levels",
                desc: "Real-time inventory tracking to prevent shortages.",
                icon: <FaCheckCircle />,
              },
              {
                title: "Cost Accuracy",
                desc: "Update product costs instantly for better margins.",
                icon: <FaCheckCircle />,
              },
              {
                title: "Customer Bookings",
                desc: "Seamless appointment scheduling and management.",
                icon: <FaCheckCircle />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-400 transition-colors duration-300 flex flex-col shadow-lg shadow-slate-200/50"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-5">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Boosting Workshop */}
        <div className="mb-12">
          <div className="text-center mb-14">
            
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Boosting Workshop Beyond Front Desk
            </h3>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Auto Garage Network is a digital ecosystem. It manages workshop
              flow and turns customer experience into revenue opportunities by
              integrating next-generation tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Mobile Flexibility Card */}
            <div className="group relative bg-gradient-to-b from-blue-50/60 to-white rounded-[32px] p-8 lg:p-10 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center text-2xl mb-6 shadow-md shadow-blue-500/20">
                <FaMobileAlt />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Mobile Flexibility
              </h4>
              <p className="text-slate-600 leading-relaxed text-[14px]">
                Mechanics can update job status and take photos of parts from
                the bay. They can clock into efficiency trackers using our
                mobile app.
              </p>
            </div>

            {/* Digital Inspections Card */}
            <div className="group relative bg-gradient-to-b from-emerald-50/60 to-white rounded-[32px] p-8 lg:p-10 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-2xl mb-6 shadow-md shadow-emerald-500/20">
                <FaCarSide />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Digital Inspections
              </h4>
              <p className="text-slate-600 leading-relaxed text-[14px]">
                Deliver digital inspection reports to your customers'
                smartphones. Send breakdown summaries by text or email,
                including photos and videos.
              </p>
            </div>

            {/* Predictive Analytics Card */}
            <div className="group relative bg-gradient-to-b from-purple-50/60 to-white rounded-[32px] p-8 lg:p-10 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-purple-900/10 transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-purple-500 text-white flex items-center justify-center text-2xl mb-6 shadow-md shadow-purple-500/20">
                <FaCogs />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Predictive Analytics
              </h4>
              <p className="text-slate-600 leading-relaxed text-[14px]">
                The platform analyses past vehicle data to predict future wear
                and tear. It prompts your team to upsell the right service at
                the right moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

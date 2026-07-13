import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaGlobe } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content Area */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Contact Our Professional Staff today to know about our Services
            </h2>
            <p className="text-lg text-slate-600">
              We promote smart ideas into technology so it becomes easier for you to manage your auto garage.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
            
            {/* Left Column: Form */}
            <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <ContactForm />
            </div>

            {/* Right Column: Head Office Info */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                  Head Office
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-[#1ea1f1] flex items-center justify-center text-xl group-hover:bg-[#1ea1f1] group-hover:text-white transition-all shadow-sm">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-slate-600 leading-relaxed mt-1">
                        The Chestnuts, 46 Middle Lane, <br /> Nether Broughton, LE14 3HD
                      </p>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 group">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-[#1ea1f1] flex items-center justify-center text-xl group-hover:bg-[#1ea1f1] group-hover:text-white transition-all shadow-sm">
                      <FaEnvelope />
                    </div>
                    <div>
                      <a href="mailto:info@autogaragenetwork.com" className="text-slate-600 hover:text-[#1ea1f1] transition-colors">
                        info@autogaragenetwork.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 group">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-[#1ea1f1] flex items-center justify-center text-xl group-hover:bg-[#1ea1f1] group-hover:text-white transition-all shadow-sm">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <a href="tel:01702655556" className="text-slate-600 hover:text-[#1ea1f1] transition-colors block">
                        01702 655556
                      </a>
                      <a href="tel:07947906789" className="text-slate-600 hover:text-[#1ea1f1] transition-colors block">
                        07947 906789
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 group">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-[#1ea1f1] flex items-center justify-center text-xl group-hover:bg-[#1ea1f1] group-hover:text-white transition-all shadow-sm">
                      <FaGlobe />
                    </div>
                    <div>
                      <a href="https://www.autogaragenetwork.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#1ea1f1] transition-colors">
                        www.autogaragenetwork.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
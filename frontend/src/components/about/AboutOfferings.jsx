import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function AboutOfferings() {
  const checklist = [
    "Website for Garages",
    "Autotech Data",
    "Wholesale",
    "MOT Diary",
    "Search Engine Optimisation"
  ];

  return (
    <section className="pt-12 pb-24 bg-[#f3f4f6] font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col gap-10 lg:pr-8">
            
            {/* Block 1 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                At Auto Garage Network, we provide innovative and functional digital solutions tailored to meet the needs of modern garages. Our multidisciplinary approach ensures seamless integration of advanced features to help you stay ahead in the competitive automotive industry.
              </p>
            </div>

            {/* Block 2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Lifetime e-Partners</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                We don't believe in one-time solutions. At Auto Garage Network, we aim to be your lifetime e-partners. That's why we go the extra mile to deliver feature-rich, user-friendly websites that empower you with control and ensure a smooth experience for your customers.
              </p>
            </div>

            {/* Block 3 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Garage Owners' Competitive Edge</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Every Auto Garage Network website is designed to help garage owners streamline operations. From configuring ramps for specialised services to granting rule-based access for technicians to update attendance or booking statuses, our solutions are built for efficiency. With our intelligent pricing tools, garage owners can control service and product pricing while accessing real-time reports on inventory, sales, and profits-all in one place.
              </p>
            </div>

            {/* Block 4 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">We Understand Your Customers</h3>
              <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                At Auto Garage Network, we focus on delivering results-not workarounds. We understand the unique needs of diverse clients and are equipped to offer niche services such as:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 text-[15px]">
                <li>Filter-specific tyre selection.</li>
                <li>Automated tyre bookings and online purchases.</li>
                <li>Online MOT test bookings.</li>
                <li>Our solutions are designed to make your customers' experience seamless and your garage operations more effective.</li>
                <li>Products & Services-Garage Website</li>
              </ul>
            </div>

          </div>

          {/* Right Image Content */}
          <div className="flex-1 relative flex items-start justify-center lg:justify-end pt-8">
            <div className="relative w-full max-w-[600px] h-[600px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/feature-img3.jpg"
                alt="Express Garage Exterior"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlay Checklist */}
            <div className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
              {checklist.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white py-5 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center w-[280px] lg:w-[320px] transition-transform duration-300 hover:translate-x-2 animate-[slide-right_0.6s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <span className="font-bold text-lg text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

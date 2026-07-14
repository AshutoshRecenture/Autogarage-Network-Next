"use client";

import { useState, useRef } from "react";
import { FaCheckCircle, FaUser, FaBuilding, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaSyncAlt, FaTimes, FaChevronDown, FaClipboardList } from "react-icons/fa";
import GoogleReCaptcha from "@/components/common/GoogleReCaptcha";

export default function GmsHero() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interestedIn: "Garage Management System",
    address: "",
    message: ""
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [isRobot, setIsRobot] = useState(true);
  const [formInteracted, setFormInteracted] = useState(false);
  const recaptchaResetRef = useRef(null);

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!formInteracted) {
      setFormInteracted(true);
    }
  };

  const handleVerify = (token) => {
    setCaptchaToken(token);
    setIsRobot(false);
  };

  const handleExpired = () => {
    setCaptchaToken("");
    setIsRobot(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRobot || !captchaToken) {
      setStatus({ ...status, error: "Please verify you are not a robot." });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name,
          garageName: formData.company,
          email: formData.email,
          phone: formData.phone,
          interestedIn: formData.interestedIn,
          address: formData.address,
          message: formData.message,
          captchaToken 
        }),
      });

      const data = await res.json();

      if (data.status) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          interestedIn: "Garage Management System",
          address: "",
          message: ""
        });
        setIsRobot(true);
        setCaptchaToken("");
        setFormInteracted(false);
        recaptchaResetRef.current?.();
      } else {
        setStatus({
          loading: false,
          error: data.message || "Something went wrong.",
          success: false,
        });
        recaptchaResetRef.current?.();
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: "Network error. Please try again.",
        success: false,
      });
      recaptchaResetRef.current?.();
    }
  };

  const bulletPoints = [
    "Effortlessly streamline your workshop operations with our GMS",
    "Acquire completely Free Setup & Free Training",
    "Accessibility to a thorough comparison with our competitors",
    "Advanced Autodata services will be at your disposal",
    "1000+ people using AGN's Garage Management System"
  ];

  return (
    <section 
      className="relative bg-[#0a1128] pt-24 pb-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop')" }}
    >
      {/* Lighter gradient overlay so the image is clearly visible */}
      <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-[#0a1128]/90 md:via-[#0a1128]/70 md:to-transparent"></div>
      
      {/* Decorative background grid & glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex-1 text-white">
         
          
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] mb-8 tracking-tight drop-shadow-xl">
            Revolutionize Your Workshop With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Premium GMS</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 font-medium mb-10 max-w-2xl drop-shadow-md">
            The most advanced software designed exclusively for Tyre Fitting, MOT & Repair Garages.
          </p>

          <div className="space-y-5 mb-10">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <FaCheckCircle className="text-blue-400 text-xl mt-1 shrink-0" />
                <span className="text-lg text-gray-300 leading-relaxed font-medium">{point}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-400 italic border-l-4 border-blue-500 pl-4 py-1 max-w-2xl">
            With so many features you can rest assured, there is no match for us & we have the best system ever.
          </p>

          {/* Trusted By / Integrations Placeholder */}
          <div className="mt-12 pt-10 border-t border-white/10 flex items-center gap-8 opacity-80">
            <div className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2 w-full">Integrated With</div>
            <div className="flex gap-8 items-center">
              <div className="text-xl font-black text-white flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-sm inline-block"></span> TecRMI <span className="text-green-400 italic text-sm">inside</span>
              </div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">SOLERA</span> | Autodata
              </div>
            </div>
          </div>
        </div>

        {/* Right Form - Glassmorphism Card */}
        <div className="w-full lg:w-[550px] shrink-0">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative">
            
            {status.success && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm rounded-3xl transition-all">
                <div className="bg-white rounded-2xl shadow-xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                  <div className="bg-emerald-500 p-6 flex flex-col items-center justify-center text-white relative">
                    <button
                      onClick={() => setStatus({ ...status, success: false })}
                      className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all flex items-center justify-center z-10 shadow-sm"
                    >
                      <FaTimes size={24} />
                    </button>
                    <FaCheckCircle size={64} className="mb-4 shadow-sm rounded-full" />
                    <h4 className="text-2xl font-bold mb-1">Booking Successful!</h4>
                    <p className="text-emerald-50 text-center text-sm px-4">
                      Your request has been submitted securely.
                    </p>
                    <button
                      onClick={() => setStatus({ ...status, success: false })}
                      className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-8 -mt-8 px-8 py-5 rounded-t-3xl mb-8 border-b border-blue-400/30">
              <h3 className="text-2xl font-black text-white">Book Now</h3>
              <p className="text-blue-100 text-sm mt-1">Get further information from our experts</p>
            </div>

            {status.error && (
              <div className="mb-6 p-4 bg-red-500/20 text-red-100 rounded-lg border border-red-500/50 text-sm">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Company/Garage Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Auto Fix Ltd" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Email <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Phone No. <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="01234 567890" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Interested In? <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select 
                      name="interestedIn" 
                      value={formData.interestedIn} 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer [&>option]:text-gray-900"
                    >
                      <option value="Garage Management System">Garage Management System</option>
                      <option value="Website for Garages">Website for Garages</option>
                      <option value="Autotech Data">Autotech Data</option>
                      <option value="SEO">SEO</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="123 Street Name" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-1.5">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              
              {/* Google reCAPTCHA */}
              {formInteracted && (
                <div className="mt-2 flex justify-center sm:justify-start">
                  <GoogleReCaptcha
                    onVerify={handleVerify}
                    onExpired={handleExpired}
                    resetRef={recaptchaResetRef}
                  />
                </div>
              )}

              <button 
                type="submit" 
                disabled={status.loading || isRobot}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_rgba(59,130,246,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

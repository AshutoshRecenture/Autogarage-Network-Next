"use client";

import { useState, useRef } from "react";
import { FaSyncAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import GoogleReCaptcha from "@/components/common/GoogleReCaptcha";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedIn: "",
    message: "",
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
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const data = await res.json();

      if (data.status) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({
          name: "",
          email: "",
          phone: "",
          interestedIn: "",
          message: "",
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

  return (
    <div className="w-full">
      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">Contact Form</h3>

      {status.success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-emerald-500 p-6 flex flex-col items-center justify-center text-white relative">
              <button
                onClick={() => setStatus({ ...status, success: false })}
                className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all flex items-center justify-center z-10 shadow-sm"
              >
                <FaTimes size={24} />
              </button>
              <FaCheckCircle size={64} className="mb-4" />
              <h4 className="text-2xl font-bold text-center">
                Submission Successful!
              </h4>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-600 mb-6">
                Thank you for contacting Auto Garage Network. Our team has
                received your message and will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus({ ...status, success: false })}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {status.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Name <span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-slate-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email <span className="text-blue-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-slate-400"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Phone No. <span className="text-blue-500">*</span>
            </label>
            <input
              type="number"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-slate-400"
            />
          </div>

          {/* Enquiry Field */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enquiry For? <span className="text-blue-500">*</span>
            </label>
            <select
              name="interestedIn"
              required
              value={formData.interestedIn}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 appearance-none"
            >
              <option value="" disabled>
                Select Product
              </option>
              <option value="MOT Diary">MOT Diary</option>
              <option value="AutoTech Data">AutoTech Data</option>
              <option value="Standard Website">Standard Website</option>
              <option value="Premium Website">Premium Website</option>
              <option value="Professional Website">Professional Website</option>
              <option value="Garage Management System">
                Garage Management System
              </option>
              <option value="SEO">SEO</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Message <span className="text-blue-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-slate-400 resize-y"
          ></textarea>
        </div>

        {/* Google reCAPTCHA */}
        {formInteracted && (
          <div className="flex justify-start">
            <GoogleReCaptcha
              onVerify={handleVerify}
              onExpired={handleExpired}
              resetRef={recaptchaResetRef}
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status.loading || isRobot}
            className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.5)] hover:-translate-y-1"
          >
            {status.loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

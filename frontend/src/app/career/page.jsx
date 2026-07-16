"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import GoogleReCaptcha from "@/components/common/GoogleReCaptcha";

export default function CareerPage() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openJobId, setOpenJobId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    applyFor: "",
    experience: "",
    message: "",
  });
  const [file, setFile] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const recaptchaResetRef = useRef(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await fetch("/api/career");
        if (res.ok) {
          const data = await res.json();
          setVacancies(data);
          if (data.length > 0) {
            setOpenJobId(data[0]._id);
            setFormData((prev) => ({ ...prev, applyFor: data[0].role }));
          }
        }
      } catch (error) {
        console.error("Failed to load vacancies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleJobClick = (job) => {
    setOpenJobId(openJobId === job._id ? null : job._id);
    if (openJobId !== job._id) {
      setFormData({ ...formData, applyFor: job.role });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setStatus({
        loading: false,
        error: "Please verify that you are not a robot.",
        success: false,
      });
      return;
    }
    if (!file) {
      setStatus({
        loading: false,
        error: "Please upload your resume.",
        success: false,
      });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    submitData.append("resume", file);
    submitData.append("captchaToken", captchaToken);

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        body: submitData,
      });
      const data = await res.json();

      if (data.status) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({
          name: "",
          email: "",
          city: "",
          phone: "",
          applyFor: "",
          experience: "",
          message: "",
        });
        setFile(null);
        const fileInput = document.getElementById("resumeUpload");
        if (fileInput) fileInput.value = "";

        if (recaptchaResetRef.current) recaptchaResetRef.current();
        setCaptchaToken(null);
      } else {
        setStatus({
          loading: false,
          error: data.message || "Something went wrong.",
          success: false,
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: "Failed to submit application. Please try again later.",
        success: false,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      {/* Modern Premium Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/career_bg_v2.png"
            alt="Corporate Careers Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Elegant overlay: subtle dark wash with short gradient for text pop */}
          <div className="absolute inset-0 bg-[#0B1120]/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8FAFC] to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">AGN</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium drop-shadow-md">
            Join our mission to revolutionize the automotive industry. Explore open roles and build the future of garage management with us.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Job Listings */}
          <div className="xl:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Open Positions
              </h2>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-slate-100 rounded-2xl"></div>
                  ))}
                </div>
              ) : vacancies.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  </div>
                  <p className="text-slate-500 font-medium">No open positions currently available.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vacancies.map((job) => (
                    <div 
                      key={job._id}
                      className={`group rounded-2xl border transition-all duration-300 ease-in-out ${
                        openJobId === job._id 
                          ? "bg-blue-50/50 border-blue-200 shadow-md ring-1 ring-blue-500/10" 
                          : "bg-white border-slate-200/60 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
                      }`}
                    >
                      <button
                        onClick={() => handleJobClick(job)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none rounded-2xl"
                      >
                        <div>
                          <h3 className={`font-bold text-lg transition-colors ${openJobId === job._id ? "text-blue-700" : "text-slate-800 group-hover:text-blue-600"}`}>
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-sm">
                            {job.salary && (
                              <span className="flex items-center text-emerald-600 font-medium">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {job.salary}
                              </span>
                            )}
                            {job.workingHours && (
                              <span className="flex items-center text-slate-500 font-medium">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {job.workingHours}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openJobId === job._id ? "bg-blue-100 text-blue-600 rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openJobId === job._id ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="p-6 pt-0 border-t border-slate-200/60 mt-2">
                          <div className="text-[15px] text-slate-600 pt-4">
                            {job.requirements && job.requirements.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-bold text-slate-900 mb-3 tracking-wide">Requirements & Skills</h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                      <span className="leading-relaxed">{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {job.jobDescription && job.jobDescription.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-bold text-slate-900 mb-3 tracking-wide">Job Description</h4>
                                <ul className="space-y-2">
                                  {job.jobDescription.map((desc, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                      <span className="leading-relaxed">{desc}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {job.description && (!job.requirements?.length && !job.jobDescription?.length) && (
                              <div className="prose prose-slate prose-sm" dangerouslySetInnerHTML={{ __html: job.description }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 lg:p-12">
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Submit Your Application</h2>
                <p className="text-slate-500 text-lg">Tell us about yourself and why you'd be a great fit for the team.</p>
              </div>

              {status.success && (
                <div className="mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4 animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-emerald-800 font-bold text-lg mb-1">Application Submitted Successfully!</h3>
                    <p className="text-emerald-700">Thank you for applying to Auto Garage Network. Our hiring team will review your application and get back to you shortly.</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-8 p-6 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 flex items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p className="font-medium">{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">City <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="London"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7700 900000"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Apply For */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Position Applying For <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="applyFor"
                      required
                      value={formData.applyFor}
                      onChange={handleChange}
                      placeholder="Select a job on the left"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Years of Experience <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 3 years"
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Upload Resume */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Upload Resume / CV <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resumeUpload"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-3.5 file:px-6
                        file:rounded-xl file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        border border-slate-200 rounded-xl bg-slate-50/50
                        transition-all duration-300 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">Max size: 5MB. Formats: PDF, DOC, DOCX.</p>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Cover Letter / Message (Optional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us why you are a great fit for this role..."
                    className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* reCAPTCHA */}
                  <div className="w-full lg:w-auto rounded-xl border border-slate-200/60 bg-slate-50 overflow-hidden shrink-0 shadow-sm">
                    <GoogleReCaptcha
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpired={() => setCaptchaToken(null)}
                      resetRef={recaptchaResetRef}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full lg:w-auto min-w-[200px] px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-[0_8px_16px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_20px_-6px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {status.loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

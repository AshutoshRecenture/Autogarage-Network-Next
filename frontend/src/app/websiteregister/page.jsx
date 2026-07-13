"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaClock, 
  FaGlobe, 
  FaSlidersH, 
  FaFileAlt, 
  FaUserAlt, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaCloudUploadAlt,
  FaTimes,
  FaSyncAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaUpload,
  FaCheck
} from "react-icons/fa";

const TIME_OPTIONS = [
  "Closed",
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00"
];

const DESIGN_STYLES = [
  "Modern & Clean (Default)",
  "Dark & Bold",
  "Classic & Corporate",
  "Vibrant & Sporty (Blue/Red accents)",
  "Minimalist & Elegant"
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function WebsiteRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Information
    monFriFrom: "08:30",
    monFriTo: "17:30",
    satFrom: "09:00",
    satTo: "13:00",
    sunFrom: "Closed",
    sunTo: "Closed",
    email: "",
    address: "",
    contactName: "",
    phone: "",

    // Domain Information
    domainName: "",
    domainRegUrl: "",
    domainUsername: "",
    domainPassword: "",
    noDomainName: false,

    // Tyre, Servicing & Social Media
    sellTyres: "No",
    offerServices: "No",
    useSocialMedia: "No",

    // Essential Info & Documents
    companyNumber: "",
    companyAge: "",
    socialInfo: "",

    // Sales Person & Design
    salesPerson: "",
    designStyle: "Modern & Clean (Default)",
  });

  const [files, setFiles] = useState({
    termsDoc: null,
    privacyDoc: null,
    returnsDoc: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [isRobot, setIsRobot] = useState(true);

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear validation error on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const setExplicitValue = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [key]: e.target.files[0],
      }));
    }
  };

  const removeFile = (key) => {
    setFiles((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  // Validate current step fields
  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.contactName.trim()) errors.contactName = "Contact name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      if (!formData.companyNumber.trim()) errors.companyNumber = "Company registration number is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const verifyCaptcha = async (e) => {
    const checked = e.target.checked;
    if (!checked) {
      setIsRobot(true);
      setCaptchaToken("");
      return;
    }

    setCaptchaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/captcha/token`);
      const data = await res.json();
      if (data.token) {
        setCaptchaToken(data.token);
        setIsRobot(false);
      }
    } catch (error) {
      console.error("Captcha verification failed", error);
      setValidationErrors((prev) => ({
        ...prev,
        captcha: "Could not fetch captcha verification token. Please try again."
      }));
    } finally {
      setCaptchaLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1)) {
      setCurrentStep(1);
      return;
    }
    if (isRobot || !captchaToken) {
      setValidationErrors((prev) => ({
        ...prev,
        captcha: "Please verify you are not a robot."
      }));
      return;
    }

    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      const submissionData = new FormData();
      
      // Append all form values
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });
      
      // Append files if selected
      if (files.termsDoc) submissionData.append("termsDoc", files.termsDoc);
      if (files.privacyDoc) submissionData.append("privacyDoc", files.privacyDoc);
      if (files.returnsDoc) submissionData.append("returnsDoc", files.returnsDoc);
      
      // Append captcha token
      submissionData.append("captchaToken", captchaToken);

      const response = await fetch(`${API_BASE}/api/website-register`, {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (data.status) {
        setSubmitStatus({ loading: false, error: null, success: true });
        // Reset states
        setFormData({
          monFriFrom: "08:30",
          monFriTo: "17:30",
          satFrom: "09:00",
          satTo: "13:00",
          sunFrom: "Closed",
          sunTo: "Closed",
          email: "",
          address: "",
          contactName: "",
          phone: "",
          domainName: "",
          domainRegUrl: "",
          domainUsername: "",
          domainPassword: "",
          noDomainName: false,
          sellTyres: "No",
          offerServices: "No",
          useSocialMedia: "No",
          companyNumber: "",
          companyAge: "",
          socialInfo: "",
          salesPerson: "",
          designStyle: "Modern & Clean (Default)",
        });
        setFiles({
          termsDoc: null,
          privacyDoc: null,
          returnsDoc: null,
        });
        setIsRobot(true);
        setCaptchaToken("");
      } else {
        setSubmitStatus({
          loading: false,
          error: data.message || "Failed to submit website requirement form.",
          success: false,
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        loading: false,
        error: "Server connection failed. Please check your network and try again.",
        success: false,
      });
    }
  };

  const stepsList = [
    { number: 1, name: "Business Details", icon: FaUserAlt },
    { number: 2, name: "Operating Hours", icon: FaClock },
    { number: 3, name: "Domain Settings", icon: FaGlobe },
    { number: 4, name: "Features & Socials", icon: FaSlidersH },
    { number: 5, name: "Preferences & Docs", icon: FaFileAlt },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Premium Hero Banner */}
      <div 
        className="bg-slate-950 text-white py-20 md:py-28 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/slide-1.png')" }}
      >
        {/* Sleek Blue-to-Black Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/85 z-0" />
        
        {/* Soft Glowing Orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] z-0" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-400/5 rounded-full blur-[100px] z-0" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Main Title Section */}
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              <span className="block text-white">Website Requirement</span>
              <span className="block mt-1 bg-gradient-to-r from-[#1ea1f1] to-cyan-400 bg-clip-text text-transparent">
                Gathering Form
              </span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
              Complete your requirement checklist in 5 easy steps to claim your <strong className="text-white">FREE trial version</strong> and receive <strong className="text-[#1ea1f1]">100 complimentary lookup credits</strong> instantly.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="bg-white/10 px-3 py-1.5 rounded-full text-white backdrop-blur">🚀 Instant Setup Ready</span>
              <span className="bg-[#1ea1f1]/10 border border-[#1ea1f1]/20 px-3 py-1.5 rounded-full text-[#1ea1f1]">🎁 100 Free Credits Included</span>
            </div>
          </div>
          
          {/* Quick Inquiries Side Card */}
          <div className="w-full lg:w-auto shrink-0">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1ea1f1]/10 rounded-full blur-xl transition-all group-hover:scale-150 duration-500" />
              <h3 className="text-xs uppercase tracking-widest text-[#1ea1f1] font-bold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#1ea1f1] rounded-full animate-ping"></span>
                Quick Assistance
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#1ea1f1] border border-blue-500/20">
                    <FaPhoneAlt size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Sales Inquiry</p>
                    <a href="tel:07947906789" className="text-base font-extrabold text-white hover:text-[#1ea1f1] transition-colors">
                      07947 906789
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#1ea1f1] border border-blue-500/20">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Customer Support</p>
                    <a href="tel:01702655556" className="text-base font-extrabold text-white hover:text-[#1ea1f1] transition-colors">
                      01702 655556
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Form Content Area */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          
          {/* Progress Indicator Stepper */}
          <div className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-black tracking-widest text-[#1ea1f1] uppercase bg-blue-50 px-3 py-1 rounded-full">Step {currentStep} of 5</span>
                <h2 className="text-xl font-extrabold text-slate-800 mt-2">{stepsList[currentStep - 1].name}</h2>
              </div>
              
              <div className="flex items-center gap-2 max-w-full overflow-x-auto py-2 pr-2">
                {stepsList.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = step.number === currentStep;
                  const isCompleted = step.number < currentStep;
                  return (
                    <div key={step.number} className="flex items-center">
                      <button 
                        type="button"
                        onClick={() => {
                          if (step.number < currentStep || validateStep(currentStep)) {
                            setCurrentStep(step.number);
                          }
                        }}
                        disabled={step.number > currentStep}
                        className={`flex items-center justify-center w-11 h-11 rounded-2xl font-bold transition-all duration-300 ${
                          isActive 
                            ? "bg-gradient-to-r from-[#1ea1f1] to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105" 
                            : isCompleted 
                              ? "bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer shadow-md shadow-emerald-500/10" 
                              : "bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-200"
                        }`}
                        title={step.name}
                      >
                        {isCompleted ? <FaCheck size={12} /> : <Icon size={14} />}
                      </button>
                      {idx < stepsList.length - 1 && (
                        <div className={`w-6 sm:w-10 h-[3px] mx-1 rounded-full transition-colors duration-300 ${
                          step.number < currentStep ? "bg-emerald-500" : "bg-slate-200/60"
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Card Container */}
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.05)] border border-slate-100/80 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 md:p-14">
              
              {/* Step 1: Business Details */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Business Contact Details</h3>
                    <p className="text-slate-400 text-sm mt-1">Let's start with your baseline identity and key details.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Contact Name *</label>
                      <input 
                        type="text" 
                        name="contactName" 
                        value={formData.contactName} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3.5 rounded-2xl border ${validationErrors.contactName ? 'border-red-500 bg-red-50/10' : 'border-slate-200/80'} focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400`} 
                        placeholder="e.g. John Smith" 
                      />
                      {validationErrors.contactName && <p className="text-red-500 text-xs mt-2 font-semibold">{validationErrors.contactName}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Business Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3.5 rounded-2xl border ${validationErrors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-200/80'} focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400`} 
                        placeholder="e.g. hello@yourgarage.com" 
                      />
                      {validationErrors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{validationErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Phone Number *</label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3.5 rounded-2xl border ${validationErrors.phone ? 'border-red-500 bg-red-50/10' : 'border-slate-200/80'} focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400`} 
                        placeholder="e.g. 07911 123456" 
                      />
                      {validationErrors.phone && <p className="text-red-500 text-xs mt-2 font-semibold">{validationErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Company Reg Number *</label>
                      <input 
                        type="text" 
                        name="companyNumber" 
                        value={formData.companyNumber} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3.5 rounded-2xl border ${validationErrors.companyNumber ? 'border-red-500 bg-red-50/10' : 'border-slate-200/80'} focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400`} 
                        placeholder="e.g. 12345678" 
                      />
                      {validationErrors.companyNumber && <p className="text-red-500 text-xs mt-2 font-semibold">{validationErrors.companyNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Company Age (Years)</label>
                      <input 
                        type="text" 
                        name="companyAge" 
                        value={formData.companyAge} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400" 
                        placeholder="e.g. 5" 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Full Workshop Address</label>
                      <textarea 
                        name="address" 
                        rows="1"
                        value={formData.address} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none" 
                        placeholder="Workshop address here..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Garage Hours */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Workshop Opening Hours</h3>
                    <p className="text-slate-400 text-sm mt-1">Specify your active operating hours. Select 'Closed' to mark days off.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Monday - Friday */}
                    <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-50 duration-200">
                      <div>
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1ea1f1]" />
                          Monday - Friday
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5 ml-4">Weekday regular hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">From</span>
                          <select 
                            name="monFriFrom" 
                            value={formData.monFriFrom} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">To</span>
                          <select 
                            name="monFriTo" 
                            value={formData.monFriTo} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Saturday */}
                    <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-50 duration-200">
                      <div>
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                          Saturday
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5 ml-4">Weekend special hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">From</span>
                          <select 
                            name="satFrom" 
                            value={formData.satFrom} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">To</span>
                          <select 
                            name="satTo" 
                            value={formData.satTo} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Sunday */}
                    <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-50 duration-200">
                      <div>
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                          Sunday
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5 ml-4">Weekend special hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">From</span>
                          <select 
                            name="sunFrom" 
                            value={formData.sunFrom} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">To</span>
                          <select 
                            name="sunTo" 
                            value={formData.sunTo} 
                            onChange={handleInputChange} 
                            className="bg-transparent font-bold text-slate-800 text-sm outline-none cursor-pointer border-none focus:ring-0"
                          >
                            {TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Domain details */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Domain Registry Details</h3>
                    <p className="text-slate-400 text-sm mt-1">Specify whether you already own a domain name or need assistance.</p>
                  </div>

                  {/* High-end Segmented Cards Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setExplicitValue("noDomainName", false)}
                      className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 relative ${
                        !formData.noDomainName 
                          ? "border-[#1ea1f1] bg-blue-50/10 shadow-lg shadow-blue-500/5" 
                          : "border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      {!formData.noDomainName && (
                        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#1ea1f1] flex items-center justify-center text-white">
                          <FaCheck size={9} />
                        </span>
                      )}
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1ea1f1] flex items-center justify-center text-base">
                        🔗
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-850 text-sm">I own a website domain</h4>
                        <p className="text-xs text-slate-400 mt-1">We can configure your current registrar details.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setExplicitValue("noDomainName", true)}
                      className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 relative ${
                        formData.noDomainName 
                          ? "border-[#1ea1f1] bg-blue-50/10 shadow-lg shadow-blue-500/5" 
                          : "border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      {formData.noDomainName && (
                        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#1ea1f1] flex items-center justify-center text-white">
                          <FaCheck size={9} />
                        </span>
                      )}
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-500 flex items-center justify-center text-base">
                        🆕
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-850 text-sm">I need a new domain</h4>
                        <p className="text-xs text-slate-400 mt-1">Our team will search & register one on your behalf.</p>
                      </div>
                    </div>
                  </div>

                  {!formData.noDomainName ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Registered Domain Name</label>
                        <input 
                          type="text" 
                          name="domainName" 
                          value={formData.domainName} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400" 
                          placeholder="e.g. www.yourgarage.com" 
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Registrar URL / Provider</label>
                        <input 
                          type="text" 
                          name="domainRegUrl" 
                          value={formData.domainRegUrl} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400" 
                          placeholder="e.g. GoDaddy, 123Reg" 
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Registrar Username / Email</label>
                        <input 
                          type="text" 
                          name="domainUsername" 
                          value={formData.domainUsername} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400" 
                          placeholder="Provider login credentials" 
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Registrar Password</label>
                        <input 
                          type="password" 
                          name="domainPassword" 
                          value={formData.domainPassword} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400" 
                          placeholder="••••••••••••••" 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#1ea1f1]/5 p-6 rounded-3xl border border-blue-500/10 animate-fadeIn">
                      <div className="flex gap-4 items-start">
                        <FaGlobe className="text-xl text-[#1ea1f1] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">Desired Domain Suggestion</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1 mb-4">
                            Tell us what domain names you prefer (e.g. `fastgarage.co.uk`). We'll check the registrar and claim it if available.
                          </p>
                          <input 
                            type="text" 
                            name="domainName" 
                            value={formData.domainName} 
                            onChange={handleInputChange} 
                            className="w-full max-w-lg px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition" 
                            placeholder="e.g. speedyshop.co.uk" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Integrations & Socials */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Features & Integrations</h3>
                    <p className="text-slate-400 text-sm mt-1">Activate essential service models and configurations.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Sell Tyres */}
                    <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition hover:bg-slate-50 duration-200">
                      <div className="max-w-md">
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">🚘 Sell Tyres Online</span>
                        <p className="text-xs text-slate-500 mt-1 ml-6">Enable tire inventory databases and direct checkout portals for customers.</p>
                      </div>
                      <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("sellTyres", "Yes")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.sellTyres === "Yes" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          Yes
                        </button>
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("sellTyres", "No")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.sellTyres === "No" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Offer Booking Services */}
                    <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition hover:bg-slate-50 duration-200">
                      <div className="max-w-md">
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">📅 Offer Online Bookings</span>
                        <p className="text-xs text-slate-500 mt-1 ml-6">Integrate live MOT diaries, service calendars, and automatic customer reminders.</p>
                      </div>
                      <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("offerServices", "Yes")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.offerServices === "Yes" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          Yes
                        </button>
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("offerServices", "No")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.offerServices === "No" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Use Social Media */}
                    <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition hover:bg-slate-50 duration-200">
                      <div className="max-w-md">
                        <span className="font-bold text-slate-800 text-base flex items-center gap-2">🌐 Social Media Marketing</span>
                        <p className="text-xs text-slate-500 mt-1 ml-6">Connect active social network channels for feeds and customer feedback.</p>
                      </div>
                      <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("useSocialMedia", "Yes")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.useSocialMedia === "Yes" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          Yes
                        </button>
                        <button 
                          type="button"
                          onClick={() => setExplicitValue("useSocialMedia", "No")}
                          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                            formData.useSocialMedia === "No" 
                              ? "bg-white text-slate-900 shadow" 
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.useSocialMedia === "Yes" && (
                    <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100 animate-fadeIn">
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Social Handles / Accounts links</label>
                      <textarea 
                        name="socialInfo" 
                        rows="3"
                        value={formData.socialInfo} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3.5 bg-white rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400 text-sm" 
                        placeholder="e.g. Facebook page link, Instagram URL etc."
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Docs & Style */}
              {currentStep === 5 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Design & Document Handovers</h3>
                    <p className="text-slate-400 text-sm mt-1">Specify design preferences and attach active policy draft templates.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Design Theme Style</label>
                      <select 
                        name="designStyle" 
                        value={formData.designStyle} 
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-200/80 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 outline-none cursor-pointer focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10"
                      >
                        {DESIGN_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">Sales Agent Code / Referrer</label>
                      <input 
                        type="text" 
                        name="salesPerson" 
                        value={formData.salesPerson} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200/80 focus:border-[#1ea1f1] focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-800 placeholder-slate-400" 
                        placeholder="e.g. Sales Desk Rep" 
                      />
                    </div>
                  </div>

                  {/* Document Uploader Cards */}
                  <div>
                    <span className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">Attach Documents (Optional)</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      {/* Terms & Conditions */}
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 flex flex-col justify-between items-center text-center h-48 hover:bg-slate-50 transition-all duration-300">
                        <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block mb-1">Terms & Conditions</span>
                        {!files.termsDoc ? (
                          <label className="cursor-pointer group flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#1ea1f1]/5 text-[#1ea1f1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-[#1ea1f1]">Choose file</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, "termsDoc")} 
                              accept=".pdf,.doc,.docx,.txt"
                            />
                          </label>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-650 font-bold max-w-[130px] truncate mb-2">{files.termsDoc.name}</span>
                            <button 
                              type="button" 
                              onClick={() => removeFile("termsDoc")}
                              className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                            >
                              <FaTimes size={10} /> Remove
                            </button>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-450">PDF, Word docs</span>
                      </div>

                      {/* Privacy Policy */}
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 flex flex-col justify-between items-center text-center h-48 hover:bg-slate-50 transition-all duration-300">
                        <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block mb-1">Privacy Policy</span>
                        {!files.privacyDoc ? (
                          <label className="cursor-pointer group flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#1ea1f1]/5 text-[#1ea1f1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-[#1ea1f1]">Choose file</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, "privacyDoc")} 
                              accept=".pdf,.doc,.docx,.txt"
                            />
                          </label>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-650 font-bold max-w-[130px] truncate mb-2">{files.privacyDoc.name}</span>
                            <button 
                              type="button" 
                              onClick={() => removeFile("privacyDoc")}
                              className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                            >
                              <FaTimes size={10} /> Remove
                            </button>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-450">PDF, Word docs</span>
                      </div>

                      {/* Returns/Refund Policy */}
                      <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 flex flex-col justify-between items-center text-center h-48 hover:bg-slate-50 transition-all duration-300">
                        <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block mb-1">Returns / Refund</span>
                        {!files.returnsDoc ? (
                          <label className="cursor-pointer group flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#1ea1f1]/5 text-[#1ea1f1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <FaUpload size={14} />
                            </div>
                            <span className="text-xs font-bold text-[#1ea1f1]">Choose file</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, "returnsDoc")} 
                              accept=".pdf,.doc,.docx,.txt"
                            />
                          </label>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-slate-650 font-bold max-w-[130px] truncate mb-2">{files.returnsDoc.name}</span>
                            <button 
                              type="button" 
                              onClick={() => removeFile("returnsDoc")}
                              className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                            >
                              <FaTimes size={10} /> Remove
                            </button>
                          </div>
                        )}
                        <span className="text-[9px] text-slate-450">PDF, Word docs</span>
                      </div>

                    </div>
                  </div>

                  {/* Google Captcha Container */}
                  <div className="border-t border-slate-100 pt-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between max-w-sm shadow-inner shadow-slate-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!isRobot && !!captchaToken} 
                          onChange={verifyCaptcha}
                          className="w-5 h-5 rounded text-[#1ea1f1] border-slate-350 focus:ring-[#1ea1f1] focus:ring-offset-2"
                          disabled={captchaLoading}
                        />
                        {captchaLoading ? (
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                            <FaSyncAlt className="animate-spin text-sm text-[#1ea1f1]" />
                            Verifying...
                          </span>
                        ) : (
                          <span className="text-xs font-extrabold text-slate-700">I'm not a robot</span>
                        )}
                      </label>
                      <div className="text-center">
                        <img 
                          src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                          alt="reCAPTCHA" 
                          className="w-7 h-7 mx-auto mb-0.5 object-contain" 
                        />
                        <span className="text-[8px] text-slate-400 block leading-none font-bold">reCAPTCHA</span>
                      </div>
                    </div>
                    {validationErrors.captcha && <p className="text-red-500 text-xs mt-2 font-semibold">{validationErrors.captcha}</p>}
                  </div>

                  {/* Submission Status Message */}
                  {submitStatus.error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 text-sm font-semibold flex items-center gap-3">
                      <FaTimes className="shrink-0 text-base" />
                      {submitStatus.error}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="mt-12 border-t border-slate-100 pt-8 flex items-center justify-between">
                <div>
                  {currentStep > 1 && (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-6 py-3.5 rounded-2xl transition duration-200 shadow-sm"
                    >
                      <FaArrowLeft size={12} /> Back
                    </button>
                  )}
                </div>

                <div>
                  {currentStep < 5 ? (
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1ea1f1] to-blue-600 hover:from-[#1b93dd] hover:to-blue-700 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-500/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Next Step <FaArrowRight size={12} />
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      disabled={submitStatus.loading}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all duration-255 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitStatus.loading ? (
                        <>
                          <FaSyncAlt className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Requirements <FaCheckCircle size={14} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Success Modal Popup */}
      {submitStatus.success && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-[32px] p-8 md:p-10 max-w-md w-full text-center border border-slate-100 shadow-2xl relative">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-[24px] mx-auto mb-6 text-4xl shadow-inner shadow-emerald-100">
              <FaCheckCircle />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Submission Successful!</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Thank you for providing your garage requirements. Our design and deployment teams will review the details and reach out shortly to finalize your portal setup.
            </p>

            <button 
              onClick={() => setSubmitStatus({ ...submitStatus, success: false })}
              className="w-full bg-[#1ea1f1] hover:bg-[#1588cf] text-white font-extrabold py-4 rounded-2xl transition duration-200 shadow-lg shadow-blue-500/15"
            >
              Continue back to site
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

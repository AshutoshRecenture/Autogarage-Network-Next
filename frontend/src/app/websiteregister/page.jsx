"use client";

import { useState, useRef } from "react";
import GoogleReCaptcha from "@/components/common/GoogleReCaptcha";
import {
  FaCheckCircle,
  FaTimes,
  FaSyncAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUpload,
  FaClock,
  FaGlobe,
  FaLaptopCode,
  FaStore,
  FaTools,
  FaFileContract,
  FaUserAlt,
  FaFileAlt,
  FaRegCheckCircle,
} from "react-icons/fa";

const HOURS_LIST = [
  "Closed",
  "00",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
];
const MINUTE_LIST = ["00", "15", "30", "45"];

const API_BASE = "http://localhost:5000";

export default function WebsiteRegisterPage() {
  const [formData, setFormData] = useState({
    // Business Information
    monFriFromHour: "08",
    monFriFromMin: "30",
    monFriToHour: "17",
    monFriToMin: "30",

    satFromHour: "09",
    satFromMin: "00",
    satToHour: "13",
    satToMin: "00",

    sunFromHour: "Closed",
    sunFromMin: "00",
    sunToHour: "Closed",
    sunToMin: "00",

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

    // Website Template
    websiteTemplate: "No",

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
    designStyle: "", // Maps to custom site design notes
  });

  const [files, setFiles] = useState({
    termsDoc: null,
    privacyDoc: null,
    returnsDoc: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState("");
  const [isRobot, setIsRobot] = useState(true);
  const [formInteracted, setFormInteracted] = useState(false);
  const recaptchaResetRef = useRef(null);

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    if (!formInteracted) setFormInteracted(true);

    // Clear the error for the changed field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // When noDomainName is checked, clear all domain-related errors
    if (name === "noDomainName" && checked) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.domainName;
        delete next.domainUsername;
        return next;
      });
    }
  };

  const setExplicitValue = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (!formInteracted) setFormInteracted(true);
  };

  const handleFileChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [key]: e.target.files[0],
      }));
      if (!formInteracted) setFormInteracted(true);
    }
  };

  const removeFile = (key) => {
    setFiles((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  // Validation checking
  const validateForm = () => {
    const errors = {};

    // Contact Name
    if (!formData.contactName.trim()) {
      errors.contactName = "Contact Name is required";
    } else if (formData.contactName.trim().length < 2) {
      errors.contactName = "Contact Name must be at least 2 characters";
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone – accepts UK formats: 07xxx, +44, 01xxx, 02xxx etc.
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(\+44\s?|0)(7\d{9}|[1-9]\d{8,9})$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Enter a valid UK phone number (e.g. 07700 900000)";
    }

    // Address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    // Domain fields (skip all if noDomainName is checked)
    if (!formData.noDomainName) {
      if (!formData.domainName.trim()) {
        errors.domainName = "Domain name is required unless registration is checked";
      }
      if (!formData.domainUsername.trim()) {
        errors.domainUsername = "Username is required when providing domain details";
      }
    }

    // Company Number
    if (!formData.companyNumber.trim()) {
      errors.companyNumber = "Company Registration Number is required";
    }

    // Company Age – optional but must be a positive number if filled
    if (formData.companyAge.trim() && (isNaN(Number(formData.companyAge)) || Number(formData.companyAge) <= 0)) {
      errors.companyAge = "Company age must be a positive number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleVerify = (token) => {
    setCaptchaToken(token);
    setIsRobot(false);
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next.captcha;
      return next;
    });
  };

  const handleExpired = () => {
    setCaptchaToken("");
    setIsRobot(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }
    if (isRobot || !captchaToken) {
      setValidationErrors((prev) => ({
        ...prev,
        captcha: "Please confirm reCAPTCHA checkbox.",
      }));
      return;
    }

    setSubmitStatus({ loading: true, error: null, success: false });

    try {
      const submissionData = new FormData();

      // Form Hours mapping to Schema strings
      const formattedData = {
        ...formData,
        monFriFrom:
          formData.monFriFromHour === "Closed"
            ? "Closed"
            : `${formData.monFriFromHour}:${formData.monFriFromMin}`,
        monFriTo:
          formData.monFriToHour === "Closed"
            ? "Closed"
            : `${formData.monFriToHour}:${formData.monFriToMin}`,
        satFrom:
          formData.satFromHour === "Closed"
            ? "Closed"
            : `${formData.satFromHour}:${formData.satFromMin}`,
        satTo:
          formData.satToHour === "Closed"
            ? "Closed"
            : `${formData.satToHour}:${formData.satToMin}`,
        sunFrom:
          formData.sunFromHour === "Closed"
            ? "Closed"
            : `${formData.sunFromHour}:${formData.sunFromMin}`,
        sunTo:
          formData.sunToHour === "Closed"
            ? "Closed"
            : `${formData.sunToHour}:${formData.sunToMin}`,
      };

      Object.keys(formattedData).forEach((key) => {
        submissionData.append(key, formattedData[key]);
      });

      if (files.termsDoc) submissionData.append("termsDoc", files.termsDoc);
      if (files.privacyDoc)
        submissionData.append("privacyDoc", files.privacyDoc);
      if (files.returnsDoc)
        submissionData.append("returnsDoc", files.returnsDoc);

      submissionData.append("captchaToken", captchaToken);

      const response = await fetch(`${API_BASE}/api/website-register`, {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (data.status) {
        setSubmitStatus({ loading: false, error: null, success: true });
        // Reset state
        setFormData({
          monFriFromHour: "08",
          monFriFromMin: "30",
          monFriToHour: "17",
          monFriToMin: "30",
          satFromHour: "09",
          satFromMin: "00",
          satToHour: "13",
          satToMin: "00",
          sunFromHour: "Closed",
          sunFromMin: "00",
          sunToHour: "Closed",
          sunToMin: "00",
          email: "",
          address: "",
          contactName: "",
          phone: "",
          domainName: "",
          domainRegUrl: "",
          domainUsername: "",
          domainPassword: "",
          noDomainName: false,
          websiteTemplate: "No",
          sellTyres: "No",
          offerServices: "No",
          useSocialMedia: "No",
          companyNumber: "",
          companyAge: "",
          socialInfo: "",
          salesPerson: "",
          designStyle: "",
        });
        setFiles({
          termsDoc: null,
          privacyDoc: null,
          returnsDoc: null,
        });
        setIsRobot(true);
        setCaptchaToken("");
        recaptchaResetRef.current?.();
      } else {
        setSubmitStatus({
          loading: false,
          error: data.message || "Requirement specifier upload failed.",
          success: false,
        });
        recaptchaResetRef.current?.();
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        loading: false,
        error: "Server connection failed. Please check status and try again.",
        success: false,
      });
      recaptchaResetRef.current?.();
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24 font-sans antialiased">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: custom-blink 1s step-end infinite;
        }
      `}} />
      {/* Hero Banner Header */}
      <section className="bg-[url('/images/slide-1.png')] bg-cover bg-center bg-no-repeat py-32 md:py-44 text-center select-none relative border-b border-[#0c2340]/10">
        <div className="absolute inset-0 bg-[#0c2340]/50 pointer-events-none" />
        <div className="max-w-[1450px] mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight max-w-4xl">
            Garage Management System
            <span className="block text-blue-400">Requirement Gathering Form</span>
          </h1>
          <p className="text-blue-100 text-sm md:text-base font-medium drop-shadow-md max-w-xl">
            Fill in your details below and our team will be in touch shortly.
          </p>
        </div>
      </section>

      {/* Announcement Header */}
      <section className="max-w-[1450px] mx-auto px-6 py-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
            Fill in this form to access our <strong>Garage Management System</strong> — try our TRIAL version absolutely <strong className="text-green-600">FREE</strong>. As a bonus, you'll also receive{" "}
            <span className="text-[#0062ff] font-extrabold animate-blink">100 complimentary lookups</span>{" "}upon signup.
          </h2>
          <p className="text-xs text-red-500 mt-3 font-semibold tracking-wide uppercase">
            ★ Limited period offer — don't miss out!
          </p>
        </div>
      </section>

      {/* Main Form Sheet */}
      <section className="max-w-[1450px] mx-auto px-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            {/* 01 Business Information */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  01
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaClock className="text-[#0062ff]" /> Business Information
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  {/* Left Column: Garage Opening Days/Times */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0c2340] uppercase mb-4 flex items-center gap-1.5">
                      <FaClock className="text-[#0062ff]" /> Garage Opening Days/Times
                    </h4>

                    {/* Monday - Saturday Group */}
                    <div className="mb-6">
                      <div className="bg-[#0062ff] text-white text-[11px] font-bold px-3 py-1.5 rounded mb-3">
                        Monday - Saturday
                      </div>

                      <div className="space-y-4">
                        {/* Mon-Fri row */}
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-bold w-10">From</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="monFriFromHour"
                              value={formData.monFriFromHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.monFriFromHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="monFriFromMin"
                                  value={formData.monFriFromMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>

                          <span className="text-[10px] text-slate-500 font-bold w-6 text-center">To</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="monFriToHour"
                              value={formData.monFriToHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.monFriToHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="monFriToMin"
                                  value={formData.monFriToMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Sat row */}
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-bold w-10">From</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="satFromHour"
                              value={formData.satFromHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.satFromHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="satFromMin"
                                  value={formData.satFromMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>

                          <span className="text-[10px] text-slate-500 font-bold w-6 text-center">To</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="satToHour"
                              value={formData.satToHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.satToHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="satToMin"
                                  value={formData.satToMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sunday Group */}
                    <div>
                      <div className="bg-[#0062ff] text-white text-[11px] font-bold px-3 py-1.5 rounded mb-3">
                        Sunday
                      </div>

                      <div className="space-y-4">
                        {/* Sun row 1 */}
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-bold w-10">From</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="sunFromHour"
                              value={formData.sunFromHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.sunFromHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="sunFromMin"
                                  value={formData.sunFromMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>

                          <span className="text-[10px] text-slate-500 font-bold w-6 text-center">To</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              name="sunToHour"
                              value={formData.sunToHour}
                              onChange={handleInputChange}
                              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-20 cursor-pointer"
                            >
                              {HOURS_LIST.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                            {formData.sunToHour !== "Closed" && (
                              <>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  name="sunToMin"
                                  value={formData.sunToMin}
                                  onChange={handleInputChange}
                                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-slate-800 outline-none w-16 cursor-pointer"
                                >
                                  {MINUTE_LIST.map((m) => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Dummy closed row */}
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-bold w-10">From</span>
                          <select
                            disabled
                            value="Closed"
                            className="bg-gray-55 border border-gray-300 rounded px-2 py-1 text-xs text-slate-400 outline-none w-20"
                          >
                            <option>Closed</option>
                          </select>
                          <span className="text-[10px] text-slate-500 font-bold w-6 text-center">To</span>
                          <select
                            disabled
                            value="Closed"
                            className="bg-gray-55 border border-gray-300 rounded px-2 py-1 text-xs text-slate-400 outline-none w-20"
                          >
                            <option>Closed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Email / Address */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0c2340] uppercase mb-4 flex items-center gap-1.5">
                      <FaEnvelope className="text-[#0062ff]" /> Email address to receive enquiries:
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          className={`w-full px-3 py-2 text-xs border ${
                            validationErrors.email ? "border-red-500" : "border-gray-300"
                          } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition`}
                        />
                        {validationErrors.email && (
                          <p className="text-red-500 text-[10px] mt-1 font-bold">
                            {validationErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter address"
                          rows="4"
                          className={`w-full px-3 py-2 text-xs border ${
                            validationErrors.address ? "border-red-500" : "border-gray-300"
                          } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition resize-none h-[116px]`}
                        />
                        {validationErrors.address && (
                          <p className="text-red-500 text-[10px] mt-1 font-bold">
                            {validationErrors.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Name & Phone Row */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h4 className="text-xs font-bold text-[#0c2340] uppercase mb-4">
                    Contact Name and Number
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                        Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Enter contact name"
                        className={`w-full px-3 py-2 text-xs border ${
                          validationErrors.contactName ? "border-red-500" : "border-gray-300"
                        } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition`}
                      />
                      {validationErrors.contactName && (
                        <p className="text-red-500 text-[10px] mt-1 font-bold">
                          {validationErrors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                        Phone No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={`w-full px-3 py-2 text-xs border ${
                          validationErrors.phone ? "border-red-500" : "border-gray-300"
                        } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition`}
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-[10px] mt-1 font-bold">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Domain Information */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  02
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaGlobe className="text-[#0062ff]" /> Domain Information
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Domain Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="domainName"
                      value={formData.domainName}
                      onChange={handleInputChange}
                      placeholder="Enter domain name"
                      disabled={formData.noDomainName}
                      className={`w-full px-3 py-2 text-xs border ${
                        validationErrors.domainName ? "border-red-500" : "border-gray-300"
                      } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition disabled:bg-gray-55 disabled:text-slate-400`}
                    />
                    {validationErrors.domainName && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {validationErrors.domainName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Domain name registrar login credentials
                    </label>
                    <input
                      type="text"
                      name="domainRegUrl"
                      value={formData.domainRegUrl}
                      onChange={handleInputChange}
                      placeholder="Domain registrar URL"
                      disabled={formData.noDomainName}
                      className="w-full px-3 py-2 text-xs border border-gray-300 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition disabled:bg-gray-55 disabled:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="domainUsername"
                      value={formData.domainUsername}
                      onChange={handleInputChange}
                      placeholder="Enter Username"
                      disabled={formData.noDomainName}
                      className={`w-full px-3 py-2 text-xs border ${
                        validationErrors.domainUsername ? "border-red-500" : "border-gray-300"
                      } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition disabled:bg-gray-55 disabled:text-slate-400`}
                    />
                    {validationErrors.domainUsername && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {validationErrors.domainUsername}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                      Password
                    </label>
                    <input
                      type="text"
                      name="domainPassword"
                      value={formData.domainPassword}
                      onChange={handleInputChange}
                      placeholder="Enter Password"
                      disabled={formData.noDomainName}
                      className="w-full px-3 py-2 text-xs border border-gray-300 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition disabled:bg-gray-55 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-red-500 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    name="noDomainName"
                    checked={formData.noDomainName}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span>* Please check this box if you do not currently have a domain name, we can arrange to register one on your behalf.</span>
                </label>
              </div>
            </div>

            {/* Website Template Selection (Standard fixed template) */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  03
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaLaptopCode className="text-[#0062ff]" /> Website Template
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#0c2340]">
                  Standard set fix template Website
                </span>
                
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="websiteTemplate"
                      value="Yes"
                      checked={formData.websiteTemplate === "Yes"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="websiteTemplate"
                      value="No"
                      checked={formData.websiteTemplate === "No"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* 03 Tyre Information */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  03
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaStore className="text-[#0062ff]" /> Tyre Information
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#0c2340]">
                  Do You Sell Tyres?
                </span>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="sellTyres"
                      value="Yes"
                      checked={formData.sellTyres === "Yes"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="sellTyres"
                      value="No"
                      checked={formData.sellTyres === "No"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* 04 Servicing */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  04
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaTools className="text-[#0062ff]" /> Servicing
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#0c2340]">
                  Do you offer services?
                </span>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="offerServices"
                      value="Yes"
                      checked={formData.offerServices === "Yes"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="offerServices"
                      value="No"
                      checked={formData.offerServices === "No"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* 05 Social Media */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  05
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaFileContract className="text-[#0062ff]" /> Social Media
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#0c2340]">
                  Do you use social media to promote your business?
                </span>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="useSocialMedia"
                      value="Yes"
                      checked={formData.useSocialMedia === "Yes"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="useSocialMedia"
                      value="No"
                      checked={formData.useSocialMedia === "No"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0062ff] border-gray-300 focus:ring-[#0062ff]"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* 06 Essential Business Information Documents Required */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  06
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaFileContract className="text-[#0062ff]" /> Essential Business Information Documents Required
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Company Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="companyNumber"
                      value={formData.companyNumber}
                      onChange={handleInputChange}
                      placeholder="Enter company number"
                      className={`w-full px-3 py-2 text-xs border ${
                        validationErrors.companyNumber ? "border-red-500" : "border-gray-300"
                      } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition`}
                    />
                    {validationErrors.companyNumber && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {validationErrors.companyNumber}
                      </p>
                    )}
                  </div>

                  {/* Terms and conditions upload */}
                  <div>
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Terms & Conditions Doc
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-md p-1 bg-white">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "termsDoc")}
                        accept=".pdf,.doc,.docx,.txt"
                        className="text-xs text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full"
                      />
                      {files.termsDoc && (
                        <button
                          type="button"
                          onClick={() => removeFile("termsDoc")}
                          className="text-xs text-red-500 font-bold hover:underline shrink-0 pr-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Privacy policy upload */}
                  <div>
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Privacy Policy Doc
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-md p-1 bg-white">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "privacyDoc")}
                        accept=".pdf,.doc,.docx,.txt"
                        className="text-xs text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full"
                      />
                      {files.privacyDoc && (
                        <button
                          type="button"
                          onClick={() => removeFile("privacyDoc")}
                          className="text-xs text-red-500 font-bold hover:underline shrink-0 pr-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Returns policy upload */}
                  <div>
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Returns Policy Doc
                    </label>
                    <div className="flex items-center gap-3 border border-gray-300 rounded-md p-1 bg-white">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "returnsDoc")}
                        accept=".pdf,.doc,.docx,.txt"
                        className="text-xs text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer w-full"
                      />
                      {files.returnsDoc && (
                        <button
                          type="button"
                          onClick={() => removeFile("returnsDoc")}
                          className="text-xs text-red-500 font-bold hover:underline shrink-0 pr-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Company Age (In Years)
                    </label>
                    <input
                      type="text"
                      name="companyAge"
                      value={formData.companyAge}
                      onChange={handleInputChange}
                      placeholder="Enter company age"
                      className={`w-full px-3 py-2 text-xs border ${
                        validationErrors.companyAge ? "border-red-500" : "border-gray-300"
                      } outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition`}
                    />
                    {validationErrors.companyAge && (
                      <p className="text-red-500 text-[10px] mt-1 font-bold">
                        {validationErrors.companyAge}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#0c2340] mb-1.5 block">
                      Social Information (If Any)
                    </label>
                    <textarea
                      name="socialInfo"
                      value={formData.socialInfo}
                      onChange={handleInputChange}
                      placeholder="Enter information"
                      rows="4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-850 placeholder-slate-400 transition resize-none leading-relaxed h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 07 Sales Person Name */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  07
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaUserAlt className="text-[#0062ff]" /> Sales Person Name
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white">
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                  Sales Person Name
                </label>
                <select
                  name="salesPerson"
                  value={formData.salesPerson}
                  onChange={handleInputChange}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-xs w-full max-w-md focus:border-blue-500 outline-none cursor-pointer text-slate-800"
                >
                  <option value="">Select sales person</option>
                  <option value="Matt Hutchings">Matt Hutchings</option>
                  <option value="Jatinder Singh Bassi">Jatinder Singh Bassi</option>
                  <option value="Martin Gallagher">Martin Gallagher</option>
                  <option value="Vickie Scott">Vickie Scott</option>
                </select>
              </div>
            </div>

            {/* 07 Design */}
            <div className="mb-8">
              <div className="bg-[#e6efff] border border-[#c2d9ff] rounded-t-lg p-3 flex items-center gap-3">
                <span className="bg-[#0062ff] text-white w-6 h-6 flex items-center justify-center rounded text-xs font-bold shrink-0">
                  07
                </span>
                <h3 className="text-xs font-bold text-[#0c2340] uppercase tracking-wide flex items-center gap-1.5">
                  <FaFileAlt className="text-[#0062ff]" /> Design
                </h3>
              </div>

              <div className="border-x border-b border-gray-200 rounded-b-lg p-6 bg-white">
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                  Please let us know how you would like your site to look
                </label>
                <textarea
                  name="designStyle"
                  value={formData.designStyle}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter How You Would Like Your Site To Look"
                  className="w-full px-3 py-2 text-xs border border-gray-300 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition leading-relaxed resize-none h-[100px]"
                />
              </div>
            </div>

            {/* Action buttons and Captcha */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-10">
              {/* Google reCAPTCHA */}
              {formInteracted ? (
                <div className="flex justify-start">
                  <GoogleReCaptcha
                    onVerify={handleVerify}
                    onExpired={handleExpired}
                    resetRef={recaptchaResetRef}
                  />
                </div>
              ) : (
                <div className="w-64 shrink-0" />
              )}

              {/* Submit trigger and status errors */}
              <div className="w-full sm:w-auto text-right">
                {submitStatus.error && (
                  <div className="text-red-500 text-xs font-bold mb-3 flex items-center justify-end gap-1.5 animate-pulse">
                    <FaTimes /> {submitStatus.error}
                  </div>
                )}
                {validationErrors.captcha && (
                  <div className="text-red-500 text-xs font-bold mb-3 flex items-center justify-end gap-1.5 animate-pulse">
                    <FaTimes /> {validationErrors.captcha}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full sm:w-auto bg-[#0062ff] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3 rounded shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitStatus.loading ? (
                    <span className="flex items-center gap-2">
                      <FaSyncAlt className="animate-spin" /> Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Successmodal wrapper */}
      {submitStatus.success && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 md:p-11 max-w-md w-full text-center border border-slate-100 shadow-2xl relative">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 flex items-center justify-center rounded-2xl mx-auto mb-6 text-3xl shadow-inner shadow-emerald-100">
              <FaCheckCircle />
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              Submission Successful!
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Thank you for providing your garage requirements. Our design and
              deployment teams will review the details and reach out shortly to
              finalize your portal setup.
            </p>

            <button
              onClick={() => {
                setSubmitStatus({ ...submitStatus, success: false });
                setFormInteracted(false);
              }}
              className="w-full bg-[#0062ff] hover:bg-blue-700 text-white font-extrabold py-3 rounded transition duration-200 shadow-lg cursor-pointer text-xs uppercase tracking-wider"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

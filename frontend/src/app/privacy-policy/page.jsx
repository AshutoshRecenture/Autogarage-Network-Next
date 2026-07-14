"use client";

import Link from "next/link";
import { FaShieldAlt, FaLock, FaEye, FaFileSignature, FaUserCheck, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      icon: <FaShieldAlt className="text-blue-500 text-lg" />,
      title: "1. Introduction",
      content: (
        <>
          <p className="mb-3">
            Auto Garage Network Ltd (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (including <a href="https://www.autogaragenetwork.com" className="text-blue-600 hover:underline">www.autogaragenetwork.com</a>) and use our Garage Management System (GMS), website design services, and search engine optimization (SEO) tools.
          </p>
          <p>
            Please read this policy carefully to understand our views and practices regarding your personal data and how we treat it. By using our website and services, you consent to the data practices described in this policy.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      icon: <FaEye className="text-blue-500 text-lg" />,
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-3">
            We may collect and process the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Personal Information:</strong> Name, business name, address, email address, phone number, and billing details provided when registering for a portal, subscribing to our services, or submitting forms (like the Website Registration Form).
            </li>
            <li>
              <strong>Domain & Credentials:</strong> If you request domain registration or management services, we may collect domain credentials, registrar login URLs, usernames, and passwords to execute operations on your behalf.
            </li>
            <li>
              <strong>Business Operations Data:</strong> Hours of opening, staff rosters, invoice templates, customer information, and tyre inventories uploaded or configured in the Garage Management System.
            </li>
            <li>
              <strong>Technical & Usage Data:</strong> IP address, browser type, operating system, page views, clickstream data, and tracking technologies (like cookies) when you interact with our platforms.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      icon: <FaFileSignature className="text-blue-500 text-lg" />,
      title: "3. How We Use Your Information",
      content: (
        <>
          <p className="mb-3">
            We use the information we collect for various business purposes, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To set up, configure, and maintain your Garage Management System portal.</li>
            <li>To design, deploy, and host your bespoke garage website.</li>
            <li>To handle customer service requests, troubleshoot technical issues, and provide active training/support.</li>
            <li>To process payments and manage your subscriptions.</li>
            <li>To communicate with you regarding updates, offers, system maintenance alerts, and changes to our terms.</li>
            <li>To align our services with compliance guidelines and improve website performance.</li>
          </ul>
        </>
      ),
    },
    {
      id: "information-sharing",
      icon: <FaUserCheck className="text-blue-500 text-lg" />,
      title: "4. Sharing of Information",
      content: (
        <>
          <p className="mb-3">
            We do not sell, rent, or lease your personal information to third parties. We may share data with trusted partners to perform critical integration services, such as:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Automotive Data Integrations:</strong> Partners like TecRMI, Solera, and Autodata to fetch MOT history, servicing logs, and repair details directly into your GMS.
            </li>
            <li>
              <strong>Payment Gateways:</strong> Safe third-party merchant service providers to process subscription billing.
            </li>
            <li>
              <strong>Legal Compliance:</strong> When required by law or to protect our rights, safety, and property.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-security",
      icon: <FaLock className="text-blue-500 text-lg" />,
      title: "5. Data Security",
      content: (
        <>
          <p className="mb-3">
            We utilize robust administrative, technical, and physical security measures to protect your personal and business data. This includes secure database clusters, SSL encryption during data transmission, and strict authorization rules for accessing server backends.
          </p>
          <p>
            While we take all reasonable steps to secure your data, please be aware that no security system is completely impenetrable.
          </p>
        </>
      ),
    },
    {
      id: "gdpr-rights",
      icon: <FaShieldAlt className="text-blue-500 text-lg" />,
      title: "6. Your Rights (GDPR & UK Data Protection)",
      content: (
        <>
          <p className="mb-3">
            Depending on your location (including the United Kingdom and the EEA), you have specific rights under the General Data Protection Regulation (GDPR) and the Data Protection Act 2018:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Right of Access:</strong> You can request a copy of the personal information we hold about you.</li>
            <li><strong>Right to Rectification:</strong> You can request correction of any inaccurate or incomplete details.</li>
            <li><strong>Right to Erasure:</strong> You can request that we delete your personal data under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You can object to or ask to restrict how we process your information.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans antialiased">
      {/* Hero Banner */}
      <section className="bg-[url('/images/slide-1.png')] bg-cover bg-center bg-no-repeat py-20 text-center select-none relative border-b border-[#0c2340]/10">
        <div className="absolute inset-0 bg-[#0062ff]/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2340]/50 to-[#0c2340]/80 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-sm md:text-base mt-3 font-medium drop-shadow-md">
            Last Updated: July 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-28 h-fit">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4 pb-2 border-b border-slate-100">
                On this page
              </h4>
              <nav className="flex flex-col gap-3">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-slate-500 hover:text-blue-600 transition-colors text-xs font-semibold uppercase tracking-wide flex items-center gap-2"
                  >
                    <span>•</span> {sec.title.split(". ")[1]}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Privacy Text */}
          <div className="flex-1 space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-sm space-y-10">
              {sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="p-2 bg-blue-50 rounded-lg shrink-0">{sec.icon}</span>
                    <h2 className="text-slate-900 font-extrabold text-lg md:text-xl tracking-tight">
                      {sec.title}
                    </h2>
                  </div>
                  <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-3">
                    {sec.content}
                  </div>
                </div>
              ))}

              {/* Contact Block */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
                <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" /> 7. Contact Us
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If you have any questions or concerns regarding this Privacy Policy, your data protection rights, or if you wish to exercise any of your GDPR rights, please contact us at:
                </p>
                <div className="text-xs md:text-sm font-semibold text-slate-700 space-y-2">
                  <p className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-slate-400 mt-1 shrink-0" />
                    <span>
                      Auto Garage Network Ltd<br />
                      The Chestnuts, 46 Middle Lane,<br />
                      Nether Broughton, LE14 3HD
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-slate-400 shrink-0" />
                    <a href="mailto:info@autogaragenetwork.com" className="text-blue-600 hover:underline">
                      info@autogaragenetwork.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

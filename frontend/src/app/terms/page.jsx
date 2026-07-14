"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFileContract, FaRegHandshake, FaGlobe, FaCreditCard, FaUserShield, FaExclamationTriangle, FaTimesCircle, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "agreement",
      icon: <FaRegHandshake className="text-blue-500 text-lg" />,
      title: "1. Agreement to Terms",
      content: (
        <>
          <p className="mb-3">
            These Terms & Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot; or &quot;client&quot;), and Auto Garage Network Ltd (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), concerning your access to and use of our website (<a href="https://www.autogaragenetwork.com" className="text-blue-600 hover:underline">www.autogaragenetwork.com</a>) and our software services, including our Garage Management System (GMS), MOT Diary portal, and website customization platforms.
          </p>
          <p>
            By accessing our website or using our services, you confirm that you have read, understood, and agreed to be bound by all of these Terms & Conditions. If you do not agree with all of these terms, you are prohibited from using the services and must discontinue use immediately.
          </p>
        </>
      ),
    },
    {
      id: "services-scope",
      icon: <FaGlobe className="text-blue-500 text-lg" />,
      title: "2. Services and Account Setup",
      content: (
        <>
          <p className="mb-3">
            Auto Garage Network Ltd provides a range of products including a digital workshop database (GMS), custom website design, domain registration support, and SEO marketing packages.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong>Account Registration:</strong> You agree to provide accurate, current, and complete business information during registration (including opening hours, registration numbers, contact details). You are responsible for safeguarding your credentials.
            </li>
            <li>
              <strong>Third-Party Integrations:</strong> Our systems display data from third-party networks (e.g. TecRMI, Solera, Autodata). Your usage of these integrations must comply with their respective API bounds and guidelines.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "billing-trials",
      icon: <FaCreditCard className="text-blue-500 text-lg" />,
      title: "3. Subscriptions, Fees, and Trials",
      content: (
        <>
          <p className="mb-3">
            We offer subscription-based access, including potential trial versions of our systems:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Trials:</strong> Trial accounts are provided for testing purposes for independent garages. Free trials are subject to limitations defined at sign-up.
            </li>
            <li>
              <strong>Complimentary Lookups:</strong> If your sign-up package includes complimentary database lookups (e.g. 100 complimentary lookups), these lookups expire at the end of the trial period or within the promotional period specified, and cannot be rolled over or exchanged.
            </li>
            <li>
              <strong>Payments & Renewals:</strong> Subscriptions are billed in advance on a recurring monthly or annual basis. Failure to process payments may result in immediate suspension of GMS portal access or temporary site hosting teardowns.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "user-conduct",
      icon: <FaUserShield className="text-blue-500 text-lg" />,
      title: "4. User Representations & Conduct",
      content: (
        <>
          <p className="mb-3">
            By using our platforms, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You have the legal capacity and authority to bind your business entity to these terms.</li>
            <li>You will not upload or transmit viruses, corrupted files, or data that violates any third party&apos;s privacy or property.</li>
            <li>You will not scrape, reverse-engineer, or attempt to exploit the GMS platform core code or databases.</li>
            <li>Your website domain setup details do not infringe upon trademarks or business names of others.</li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      icon: <FaExclamationTriangle className="text-blue-500 text-lg" />,
      title: "5. Limitation of Liability",
      content: (
        <>
          <p className="mb-3">
            In no event shall Auto Garage Network Ltd, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the GMS or hosting services.
          </p>
          <p>
            Our systems and websites are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranty that our services will be uninterrupted, secure, or free from bugs or errors.
          </p>
        </>
      ),
    },
    {
      id: "termination",
      icon: <FaTimesCircle className="text-blue-500 text-lg" />,
      title: "6. Termination",
      content: (
        <>
          <p className="mb-3">
            These terms shall remain in full force while you use our services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>By You:</strong> You may cancel your subscription at any time by contacting support or within your dashboard. Cancellation terms require 30 days written notice unless stated otherwise.</li>
            <li><strong>By Us:</strong> We reserve the right to terminate accounts, block portal access, or suspend website hosting for breaches of these terms, non-payment, or security hazards.</li>
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
            Terms & Conditions
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

          {/* Main Terms Text */}
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
                  <FaEnvelope className="text-blue-500" /> 7. Contact Info
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For questions or cancellations regarding these terms or your services, please contact:
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

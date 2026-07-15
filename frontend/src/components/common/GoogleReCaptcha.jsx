"use client";

import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function GoogleReCaptcha({ onVerify, onExpired, resetRef }) {
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Expose the reset mechanism to the parent via resetRef
  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => {
        if (recaptchaRef.current) {
          try {
            recaptchaRef.current.reset();
          } catch (e) {
            console.error("Failed to reset reCAPTCHA:", e);
          }
        }
      };
    }
  }, [resetRef]);

  if (!siteKey) {
    return (
      <div className="text-red-500 text-xs font-semibold p-2 border border-red-200 rounded bg-red-50">
        Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing.
      </div>
    );
  }

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={onVerify}
        onExpired={onExpired}
      />
    </div>
  );
}

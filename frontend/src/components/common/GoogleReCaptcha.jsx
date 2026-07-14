"use client";

import { useEffect, useRef, useState } from "react";

export default function GoogleReCaptcha({ onVerify, onExpired, resetRef }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [grecaptcha, setGrecaptcha] = useState(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Check if grecaptcha script is already loaded and ready
    const checkGrecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        setGrecaptcha(window.grecaptcha);
        return true;
      }
      return false;
    };

    if (checkGrecaptcha()) return;

    // Load grecaptcha script if not present
    const scriptId = "recaptcha-script";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (checkGrecaptcha()) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!grecaptcha || !containerRef.current || widgetIdRef.current !== null) return;

    try {
      const widgetId = grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => {
          if (onVerify) onVerify(token);
        },
        "expired-callback": () => {
          if (onExpired) onExpired();
        },
      });
      widgetIdRef.current = widgetId;
    } catch (err) {
      console.error("Failed to render reCAPTCHA:", err);
    }

    return () => {
      if (widgetIdRef.current !== null && grecaptcha && grecaptcha.reset) {
        try {
          grecaptcha.reset(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [grecaptcha, siteKey, onVerify, onExpired]);

  // Expose reset mechanism if resetRef is provided
  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => {
        if (grecaptcha && widgetIdRef.current !== null) {
          try {
            grecaptcha.reset(widgetIdRef.current);
          } catch (e) {}
        }
      };
    }
  }, [resetRef, grecaptcha]);

  if (!siteKey) {
    return (
      <div className="text-red-500 text-xs font-semibold p-2 border border-red-200 rounded bg-red-50">
        Error: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing.
      </div>
    );
  }

  return <div ref={containerRef} className="recaptcha-container" />;
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  TOKEN_KEY,
  USER_KEY,
  AUTH_EXPIRED_EVENT,
  isTokenExpired,
} from "@/hooks/useAdmin";

// Pages that don't require auth (login itself)
const PUBLIC_PATHS = ["/administrator/login"];

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [showExpiredBanner, setShowExpiredBanner] = useState(false);
  // Prevents multiple concurrent redirects (race condition guard)
  const redirectingRef = useRef(false);

  const isPublicPage = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));

  // ── Guard: check token on every mount / route change ──────────────────────
  useEffect(() => {
    if (isPublicPage) {
      setChecked(true);
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token || isTokenExpired(token)) {
      if (redirectingRef.current) return; // already redirecting
      redirectingRef.current = true;
      // Clear stale data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      router.replace("/administrator/login?reason=expired");
      return;
    }

    // Reset redirect guard when we have a valid token
    redirectingRef.current = false;
    setChecked(true);
  }, [pathname, isPublicPage, router]);

  // ── Guard: listen for 401 events from api-client ──────────────────────────
  useEffect(() => {
    const handler = () => {
      if (redirectingRef.current) return; // already redirecting
      redirectingRef.current = true;
      setShowExpiredBanner(true);
      setTimeout(() => {
        router.replace("/administrator/login?reason=expired");
      }, 2000);
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handler);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handler);
  }, [router]);

  // ── Render ────────────────────────────────────────────────────────────────

  // While we're still verifying the token, render nothing to avoid flicker
  if (!checked && !isPublicPage) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>
      {/* Session-expired toast */}
      {showExpiredBanner && (
        <div
          style={{
            position: "fixed",
            top: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#7c3aed",
            color: "#fff",
            padding: "0.85rem 1.75rem",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "slideDown 0.25s ease",
          }}
        >
          <span>🔒</span>
          <span>Sesi Anda telah berakhir. Mengalihkan ke halaman login…</span>
        </div>
      )}

      {children}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

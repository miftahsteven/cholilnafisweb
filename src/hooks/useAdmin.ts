"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const TOKEN_KEY = "admin_token";
export const USER_KEY = "admin_user";

/** Custom event name fired by api-client when a 401 is received */
export const AUTH_EXPIRED_EVENT = "admin:auth-expired";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  role: string;
}

// ─── Token helpers (module-level, usable outside React) ───────────────────────

/** Returns true when the token is missing. We rely on API 401s for actual expiry auth. */
export function isTokenExpired(token: string | null): boolean {
  return !token || token.trim() === '';
}

/** Clear credentials from localStorage and dispatch the expiry event. */
export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Check if there's a non-expired token saved in localStorage */
  const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && !isTokenExpired(token);
  };

  /** Get the saved admin user info */
  const getUser = (): AdminUser | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  };

  /** Get the JWT token (returns null if expired) */
  const getToken = (): string | null => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(TOKEN_KEY);
    return isTokenExpired(token) ? null : token;
  };

  /** Logout: clears stored credentials and redirects to login */
  const logout = useCallback(
    (reason?: string) => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      const url =
        reason === "expired"
          ? "/administrator/login?reason=expired"
          : "/administrator/login";
      router.push(url);
    },
    [router]
  );

  /**
   * Check token expiry proactively.
   * Returns true if still valid, false (and triggers logout) if expired.
   */
  const checkAndLogoutIfExpired = useCallback((): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (isTokenExpired(token)) {
      logout("expired");
      return false;
    }
    return true;
  }, [logout]);

  // NOTE: AUTH_EXPIRED_EVENT is handled centrally in layout.tsx.
  // Do NOT add another listener here to avoid double logout triggers.

  /**
   * Login with username + password.
   * On success: saves token + user to localStorage and redirects to dashboard.
   * On failure: sets error message.
   */
  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Login gagal. Periksa username dan password.");
          return false;
        }

        // Persist token and user info
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));

        router.push("/dashboard");
        return true;
      } catch {
        setError("Tidak dapat terhubung ke server. Coba lagi.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
    getToken,
    checkAndLogoutIfExpired,
    loading,
    error,
    setError,
  };
}

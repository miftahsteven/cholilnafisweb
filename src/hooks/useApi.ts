import axios from "axios";

// Definisikan base URL dari environment variable atau default sementara
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/v1";

/**
 * Custom hook atau utilitas untuk koneksi API terpisah
 * Menggunakan Axios instance lengkap dengan interceptor
 */
export const useApi = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    // Timeout 10 detik
    timeout: 10000, 
  });

  // Interceptor untk validasi atau memasukkan token (misal dari localStorage)
  api.interceptors.request.use(
    (config) => {
      // Contoh:
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle error global di sini (misal log out jika 401)
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

import { useState, useCallback } from "react";
import { apiClient, AuthExpiredError } from "@/lib/api-client";
import { TOKEN_KEY } from "./useAdmin";

export interface Media {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  mimeType: string;
  alt: string | null;
  showInGallery: boolean;
  createdAt: string;
}

export function useMediaAdmin() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  };

  const fetchMedia = useCallback(async (pageNum = 1, type?: string) => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await apiClient.getMedia(pageNum, type, token);
      setMedia(res.data || []);
      setPage(res.page || 1);
      setTotalPages(res.totalPages || 1);
      setTotal(res.total || 0);
    } catch (err: any) {
      if (!(err instanceof AuthExpiredError)) {
        setError(err.message || "Gagal mengambil data media.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadMediaLocal = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const token = getToken();
      const res = await apiClient.uploadMediaLocal(file, token);
      setSuccess("File berhasil diunggah!");
      setTimeout(() => setSuccess(""), 3000);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah file.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMediaUrl = async (url: string) => {
    setUploading(true);
    setError("");
    try {
      const token = getToken();
      const res = await apiClient.uploadMediaUrl(url, token);
      setSuccess("Gambar berhasil didownload dan disimpan!");
      setTimeout(() => setSuccess(""), 3000);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mendownload gambar dari URL.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const registerMedia = async (data: { url: string; filename: string; type: string; mimeType: string; size: number; alt?: string }) => {
    setUploading(true);
    setError("");
    try {
      const token = getToken();
      const res = await apiClient.registerMedia(data, token);
      setSuccess("Media berhasil ditambahkan!");
      setTimeout(() => setSuccess(""), 3000);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mendaftarkan media.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    setDeleting(id);
    setError("");
    try {
      const token = getToken();
      await apiClient.deleteMedia(id, token);
      setSuccess("Media berhasil dihapus.");
      setTimeout(() => setSuccess(""), 3000);
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal menghapus media.");
      return false;
    } finally {
      setDeleting(null);
    }
  };

  const toggleGallery = async (id: string, showInGallery: boolean) => {
    setToggling(id);
    try {
      const token = getToken();
      const res = await apiClient.toggleMediaGallery(id, showInGallery, token);
      // Optimistically update local state
      setMedia(prev => prev.map(m => m.id === id ? { ...m, showInGallery } : m));
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mengubah status galeri.");
      return null;
    } finally {
      setToggling(null);
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const uploadPdf = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const token = getToken();
      const res = await apiClient.uploadPdf(file, token);
      setSuccess("File PDF berhasil diunggah!");
      setTimeout(() => setSuccess(""), 3000);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah file PDF.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadPdfUrl = async (url: string) => {
    setUploading(true);
    setError("");
    try {
      const token = getToken();
      const res = await apiClient.uploadPdfUrl(url, token);
      setSuccess("File PDF berhasil didownload dan disimpan!");
      setTimeout(() => setSuccess(""), 3000);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Gagal mendownload PDF dari URL.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    media,
    loading,
    uploading,
    deleting,
    toggling,
    error,
    success,
    page,
    totalPages,
    total,
    fetchMedia,
    uploadMediaLocal,
    uploadMediaUrl,
    uploadPdf,
    uploadPdfUrl,
    registerMedia,
    deleteMedia,
    toggleGallery,
    clearMessages,
  };
}

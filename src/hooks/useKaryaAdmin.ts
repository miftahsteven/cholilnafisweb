import { useState, useCallback } from "react";
import { apiClient, AuthExpiredError } from "@/lib/api-client";
import { TOKEN_KEY } from "./useAdmin";
import { Status } from "./usePostsAdmin";

export interface Karya {
  id: string;
  category: "ArtikelKoran" | "KaryaBuku" | "Khotbah" | "Artikel" | "Materi";
  sumber: string;
  title: string;
  shortcontent: string | null;
  fullcontent: string;
  fileUrl: string | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface KaryaForm {
  category: "ArtikelKoran" | "KaryaBuku" | "Khotbah" | "Artikel" | "Materi";
  sumber: string;
  title: string;
  shortcontent: string;
  fullcontent: string;
  fileUrl: string;
  status: Status;
}

export const EMPTY_KARYA_FORM: KaryaForm = {
  category: "Artikel",
  sumber: "cholilnafis.id",
  title: "",
  shortcontent: "",
  fullcontent: "",
  fileUrl: "",
  status: "DRAFT",
};

export const DEMO_KARYAS: Karya[] = [
  {
    id: "demo-k-1",
    category: "ArtikelKoran",
    sumber: "Republika",
    title: "Membangun Ekonomi Syariah di Tengah Krisis",
    shortcontent: "Pentingnya memperkuat pondasi ekonomi umat...",
    fullcontent: "<p>Ekonomi syariah merupakan solusi untuk menyeimbangkan pasar yang saat ini tidak menentu...</p>",
    fileUrl: null,
    status: "PUBLISHED",
    createdAt: "2024-12-15T08:00:00Z",
    updatedAt: "2024-12-15T08:00:00Z",
  },
  {
    id: "demo-k-2",
    category: "KaryaBuku",
    sumber: "cholilnafis.id",
    title: "Fiqih Keluarga Modern",
    shortcontent: "Buku panduan keluarga sakinah",
    fullcontent: "<p>Buku ini ditulis sebagai oase di tengah gempuran pemikiran ekstrem radikal...</p>",
    fileUrl: null,
    status: "DRAFT",
    createdAt: "2025-01-20T09:00:00Z",
    updatedAt: "2025-01-20T09:00:00Z",
  },
];

export function useKaryaAdmin() {
  const [karyas, setKaryas] = useState<Karya[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  };

  const fetchKaryas = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        setKaryas(DEMO_KARYAS);
        return;
      }
      const res = await apiClient.getKaryasAdmin(token);
      setKaryas(res.data?.length ? res.data : DEMO_KARYAS);
    } catch (err) {
      if (err instanceof AuthExpiredError) return;
      setKaryas(DEMO_KARYAS);
    } finally {
      setLoading(false);
    }
  }, []);

  const createKarya = async (payload: Partial<KaryaForm>) => {
    setSaving(true);
    setError("");
    try {
      const token = getToken();
      await apiClient.createKarya(payload, token);
      setSuccess("Karya berhasil ditambahkan!");
      setTimeout(() => setSuccess(""), 3000);
      await fetchKaryas();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal menambahkan Karya.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateKarya = async (id: string, payload: Partial<KaryaForm>) => {
    setSaving(true);
    setError("");
    try {
      const token = getToken();
      await apiClient.updateKarya(id, payload, token);
      setSuccess("Karya berhasil diperbarui!");
      setTimeout(() => setSuccess(""), 3000);
      await fetchKaryas();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui Karya.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteKarya = async (id: string) => {
    setDeleting(id);
    setError("");
    try {
      const token = getToken();
      await apiClient.deleteKarya(id, token);
      setSuccess("Karya berhasil dihapus.");
      setTimeout(() => setSuccess(""), 3000);
      await fetchKaryas();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal menghapus Karya.");
      return false;
    } finally {
      setDeleting(null);
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return {
    karyas,
    loading,
    saving,
    deleting,
    error,
    success,
    fetchKaryas,
    createKarya,
    updateKarya,
    deleteKarya,
    clearMessages,
  };
}

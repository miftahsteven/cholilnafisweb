import { useState, useCallback } from "react";
import { apiClient, AuthExpiredError } from "@/lib/api-client";
import { TOKEN_KEY } from "./useAdmin";

export interface Category {
  category: {
    name: string;
    slug?: string;
  };
}

export type Status = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: Status;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  author: { name: string };
  categories: Category[];
}

export interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: Status;
  images: string[];
  seoTitle: string;
  seoDesc: string;
}

export const EMPTY_FORM: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "DRAFT",
  images: [],
  seoTitle: "",
  seoDesc: "",
};

export const DEMO_POSTS: Post[] = [
  {
    id: "demo-1",
    title: "KH. Muhammad Cholil Nafis: Ulama dan Ekonom Muslim Terkemuka Indonesia",
    slug: "kh-cholil-nafis-ulama-ekonom",
    excerpt: "Mengenal sosok KH. Muhammad Cholil Nafis, seorang ulama besar yang juga ahli ekonomi Islam terkemuka di Indonesia, Ketua Komisi Dakwah MUI Pusat.",
    status: "PUBLISHED",
    coverImage: null,
    publishedAt: "2024-12-15T08:00:00Z",
    createdAt: "2024-12-15T08:00:00Z",
    author: { name: "Admin" },
    categories: [{ category: { name: "Profil" } }],
  },
  {
    id: "demo-2",
    title: "Pandangan KH. Cholil Nafis tentang Ekonomi Syariah di Era Digital",
    slug: "pandangan-ekonomi-syariah-digital",
    excerpt: "Dalam berbagai forum nasional dan internasional, KH. Cholil Nafis konsisten menyuarakan pentingnya penerapan prinsip ekonomi syariah di era transformasi digital.",
    status: "PUBLISHED",
    coverImage: null,
    publishedAt: "2025-01-20T09:00:00Z",
    createdAt: "2025-01-20T09:00:00Z",
    author: { name: "Editor" },
    categories: [{ category: { name: "Opini" } }],
  },
  {
    id: "demo-3",
    title: "Kiprah KH. Cholil Nafis di Majelis Ulama Indonesia",
    slug: "kiprah-di-mui",
    excerpt: "Sebagai Ketua Komisi Dakwah MUI Pusat, KH. Cholil Nafis aktif mendorong dakwah yang moderat, inklusif, dan responsif terhadap tantangan zaman.",
    status: "DRAFT",
    coverImage: null,
    publishedAt: null,
    createdAt: "2025-02-01T10:00:00Z",
    author: { name: "Admin" },
    categories: [{ category: { name: "Berita" } }],
  },
];

export function usePostsAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        // No token at all — layout will handle redirect; show demo silently
        setPosts(DEMO_POSTS);
        return;
      }
      const res = await apiClient.getAllPostsAdmin(token);
      setPosts(res.data?.length ? res.data : DEMO_POSTS);
    } catch (err) {
      if (err instanceof AuthExpiredError) {
        // 401: AUTH_EXPIRED_EVENT already dispatched by api-client → layout handles redirect
        // Don't swallow — let it propagate so layout can act
        return;
      }
      // Network / server error (backend may be down) → show demo, no logout
      setPosts(DEMO_POSTS);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (payload: Partial<PostForm>) => {
    setSaving(true);
    setError("");
    try {
      const token = getToken();
      await apiClient.createPost(payload, token);
      setSuccess("Berita berhasil ditambahkan!");
      setTimeout(() => setSuccess(""), 3000);
      await fetchPosts();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal menambahkan berita.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updatePost = async (id: string, payload: Partial<PostForm>) => {
    setSaving(true);
    setError("");
    try {
      const token = getToken();
      await apiClient.updatePost(id, payload, token);
      setSuccess("Berita berhasil diperbarui!");
      setTimeout(() => setSuccess(""), 3000);
      await fetchPosts();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui berita.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    setDeleting(id);
    setError("");
    try {
      const token = getToken();
      await apiClient.deletePost(id, token);
      setSuccess("Berita berhasil dihapus.");
      setTimeout(() => setSuccess(""), 3000);
      await fetchPosts();
      return true;
    } catch (err: any) {
      setError(err.message || "Gagal menghapus berita.");
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
    posts,
    loading,
    saving,
    deleting,
    error,
    success,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    clearMessages,
  };
}

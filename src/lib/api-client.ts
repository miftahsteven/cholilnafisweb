// Frontend API client communicating with the Fastify backend
// Usage: import { apiClient } from '@/lib/api-client'

import { AUTH_EXPIRED_EVENT } from '@/hooks/useAdmin';

let BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

if (typeof window !== 'undefined') {
  // Fix network isolation: if configured to localhost but accessed via local IP, use that IP.
  if (BACKEND_URL.includes('localhost') && window.location.hostname !== 'localhost') {
    BACKEND_URL = BACKEND_URL.replace('localhost', window.location.hostname);
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
}

/** Thrown exclusively when the server returns 401 (token expired / invalid). */
export class AuthExpiredError extends Error {
  constructor() {
    super('Sesi telah berakhir. Silakan login kembali.');
    this.name = 'AuthExpiredError';
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  // Do NOT set Content-Type by default — only add it when we actually send a JSON body.
  // Sending Content-Type: application/json with an empty body causes Fastify to return 400.
  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest', // CSRF protection
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let finalBody: BodyInit | null = null;
  if (body instanceof FormData) {
    // Browser sets multipart/form-data with boundary automatically — no Content-Type header needed
    finalBody = body;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers,
    ...(finalBody ? { body: finalBody } : {}),
    //cache: method === 'GET' ? 'no-store' : undefined,
    next: method === 'GET' ? { revalidate: 120 } : undefined,
  });

  // 401 = token expired or invalid → signal layout to handle logout
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw new AuthExpiredError();
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}


export const apiClient = {
  // Posts
  getPosts: () => request<any>('/api/posts'),
  getAllPostsAdmin: (token: string) => request<any>('/api/posts/admin/all', { token }),
  getPost: (slug: string) => request<any>(`/api/posts/${slug}`),
  createPost: (data: any, token: string) => request<any>('/api/posts', { method: 'POST', body: data, token }),
  updatePost: (id: string, data: any, token: string) => request<any>(`/api/posts/${id}`, { method: 'PATCH', body: data, token }),
  deletePost: (id: string, token: string) => request<any>(`/api/posts/${id}`, { method: 'DELETE', token }),

  // Blocks
  getPageBlocks: (slug: string) => request<any>(`/api/blocks/page/${slug}`),
  createBlock: (data: any, token: string) => request<any>('/api/blocks', { method: 'POST', body: data, token }),
  updateBlock: (id: string, data: any, token: string) => request<any>(`/api/blocks/${id}`, { method: 'PATCH', body: data, token }),
  deleteBlock: (id: string, token: string) => request<any>(`/api/blocks/${id}`, { method: 'DELETE', token }),

  // Settings
  getSettings: () => request<any>('/api/settings'),
  getSetting: (key: string) => request<any>(`/api/settings/${key}`),
  updateSetting: (key: string, value: any, token: string) => request<any>(`/api/settings/${key}`, { method: 'PUT', body: { value }, token }),

  // Works
  getWorks: (type?: string) => request<any>(`/api/works${type ? `?type=${type}` : ''}`),
  createWork: (data: any, token: string) => request<any>('/api/works', { method: 'POST', body: data, token }),
  updateWork: (id: string, data: any, token: string) => request<any>(`/api/works/${id}`, { method: 'PATCH', body: data, token }),
  deleteWork: (id: string, token: string) => request<any>(`/api/works/${id}`, { method: 'DELETE', token }),

  // Chatbot
  ask: (question: string, sessionId?: string) => request<any>('/api/chatbot/ask', {
    method: 'POST',
    body: { question, sessionId },
  }),

  // Media
  getMedia: (page?: number, type?: string, token?: string) => request<any>(`/api/media?page=${page || 1}${type ? `&type=${type}` : ''}`, { token }),
  uploadMediaLocal: (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return request<any>('/api/media/upload', { method: 'POST', body: formData, token });
  },
  uploadMediaUrl: (url: string, token: string) => request<any>('/api/media/upload-url', { method: 'POST', body: { url }, token }),
  registerMedia: (data: any, token: string) => request<any>('/api/media/register', { method: 'POST', body: data, token }),
  deleteMedia: (id: string, token: string) => request<any>(`/api/media/${id}`, { method: 'DELETE', token }),
  toggleMediaGallery: (id: string, showInGallery: boolean, token: string) =>
    request<any>(`/api/media/${id}`, { method: 'PATCH', body: { showInGallery }, token }),
};

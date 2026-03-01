'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useAdmin } from '@/hooks/useAdmin';

interface Stats {
  totalPosts: number;
  totalWorks: number;
  totalMedia: number;
  totalChats: number;
}

export default function DashboardPage() {
  const { logout } = useAdmin();
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, totalWorks: 0, totalMedia: 0, totalChats: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
        const [posts, works, media] = await Promise.all([
          apiClient.getPosts(),
          apiClient.getWorks(),
          apiClient.getMedia(1, undefined, token),
        ]);
        setStats({
          totalPosts: posts?.data?.length || 0,
          totalWorks: works?.data?.length || 0,
          totalMedia: media?.total || 0,
          totalChats: 0,
        });
      } catch (_) {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);


  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      logout(); // Pastikan clear token dsb
    }
  };

  const statCards = [
    { label: 'Total Berita', value: stats.totalPosts, icon: '📰', color: '#673284' },
    { label: 'Karya Ilmiah', value: stats.totalWorks, icon: '📚', color: '#0085FF' },
    { label: 'File Media', value: stats.totalMedia, icon: '🖼️', color: '#30D158' },
    { label: 'Percakapan Chatbot', value: stats.totalChats, icon: '🤖', color: '#FF9F0A' },
  ];

  const menuItems = [
    { label: 'Kelola Berita', href: '/post', icon: '📰', desc: 'Tambah, edit, hapus artikel berita' },
    { label: 'Hero Content', href: '/administrator/hero', icon: '🧩', desc: 'Mengedit Hero Content, Bagian Header dan Profile' },
    { label: 'Media Manager', href: '/media', icon: '🖼️', desc: 'Kelola gambar dan file upload' },
    { label: 'Karya Ilmiah', href: '/administrator/works', icon: '📚', desc: 'Publikasi, buku, jurnal, artikel' },
    { label: 'AI Chatbot', href: '/administrator/chatbot', icon: '🤖', desc: 'Analytics & FAQ percakapan' },
    { label: 'Pengaturan', href: '/administrator/settings', icon: '⚙️', desc: 'Footer, sosial media, kontak' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1C1C1E', margin: 0 }}>
            Dashboard CMS
          </h1>
          <p style={{ color: '#8E8E93', marginTop: '0.25rem' }}>cholilnafis.id — Panel Administrator</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/" style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #ddd', textDecoration: 'none', color: '#666', fontSize: '0.9rem', transition: 'background-color 0.2s' }}>
            ← Lihat Website
          </a>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#dc2626', textDecoration: 'none', fontSize: '0.9rem', transition: 'background-color 0.2s', cursor: 'pointer' }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map((stat) => (
          <div key={stat.label} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderLeft: `4px solid ${stat.color}` }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>
              {loading ? '...' : stat.value}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#8E8E93', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Menu */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1C1C1E', marginBottom: '1rem' }}>Menu Pengelolaan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {menuItems.map((item) => (
          <a key={item.href} href={item.href} style={{ textDecoration: 'none', background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ fontSize: '2rem' }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: '600', color: '#1C1C1E', fontSize: '1rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#8E8E93', marginTop: '0.25rem' }}>{item.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

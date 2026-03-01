'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePostsAdmin, Post, PostForm, Status, EMPTY_FORM } from '@/hooks/usePostsAdmin';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const fmtDate = (iso: string | null) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

const STATUS_LABEL: Record<Status, string> = {
  PUBLISHED: 'Terbit',
  DRAFT: 'Draf',
  ARCHIVED: 'Arsip',
};
const STATUS_COLOR: Record<Status, string> = {
  PUBLISHED: '#16a34a',
  DRAFT: '#d97706',
  ARCHIVED: '#6b7280',
};
const STATUS_BG: Record<Status, string> = {
  PUBLISHED: '#dcfce7',
  DRAFT: '#fef3c7',
  ARCHIVED: '#f3f4f6',
};

// ─── WYSIWYG Toolbar ─────────────────────────────────────────────────────────

const TOOLBAR_BUTTONS = [
  { cmd: 'bold', icon: 'B', title: 'Tebal', style: { fontWeight: 700 } },
  { cmd: 'italic', icon: 'I', title: 'Miring', style: { fontStyle: 'italic' } },
  { cmd: 'underline', icon: 'U', title: 'Garis bawah', style: { textDecoration: 'underline' } },
  { cmd: 'insertUnorderedList', icon: '• List', title: 'Daftar' },
  { cmd: 'insertOrderedList', icon: '1. List', title: 'Daftar bernomor' },
  { cmd: 'justifyLeft', icon: '⬅', title: 'Rata kiri' },
  { cmd: 'justifyCenter', icon: '☰', title: 'Rata tengah' },
  { cmd: 'justifyRight', icon: '➡', title: 'Rata kanan' },
];

interface WYSIWYGProps {
  value: string;
  onChange: (html: string) => void;
}

function WYSIWYGEditor({ value, onChange }: WYSIWYGProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalUpdate = useRef(false);

  // Seed content once on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      isInternalUpdate.current = true;
      editorRef.current.innerHTML = value;
      isInternalUpdate.current = false;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const execCmd = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleLink = () => {
    const url = window.prompt('URL tautan:');
    if (url) execCmd('createLink', url);
  };

  return (
    <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '8px 10px',
        borderBottom: '1px solid #e2e8f0', background: '#f8fafc',
      }}>
        {TOOLBAR_BUTTONS.map(btn => (
          <button
            key={btn.cmd}
            type="button"
            title={btn.title}
            onMouseDown={e => { e.preventDefault(); execCmd(btn.cmd); }}
            style={{
              padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
              background: '#fff', cursor: 'pointer', fontSize: '0.78rem',
              fontFamily: 'system-ui', ...btn.style,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ede9fe')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            {btn.icon}
          </button>
        ))}
        <button
          type="button"
          title="Tautan"
          onMouseDown={e => { e.preventDefault(); handleLink(); }}
          style={{
            padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: '0.78rem', color: '#7c3aed',
          }}
        >
          🔗 Link
        </button>
        <button
          type="button"
          title="Hapus format"
          onMouseDown={e => { e.preventDefault(); execCmd('removeFormat'); }}
          style={{
            padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: '0.78rem',
          }}
        >
          ✕ Format
        </button>

        {/* Heading selector */}
        <select
          onMouseDown={e => e.stopPropagation()}
          onChange={e => { execCmd('formatBlock', e.target.value); e.target.value = ''; }}
          defaultValue=""
          style={{
            padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
            background: '#fff', fontSize: '0.78rem', cursor: 'pointer',
          }}
        >
          <option value="" disabled>Heading</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="p">Paragraf</option>
        </select>
      </div>

      {/* Content editable */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          minHeight: '260px', padding: '1rem', outline: 'none',
          fontSize: '0.95rem', lineHeight: '1.7', color: '#1e293b',
          fontFamily: 'system-ui, sans-serif',
        }}
      />
    </div>
  );
}

// ─── Image URL Input List ─────────────────────────────────────────────────────

interface ImageInputProps {
  images: string[];
  onChange: (imgs: string[]) => void;
}

function ImageInput({ images, onChange, onPickFromMedia }: ImageInputProps & { onPickFromMedia: (index: number) => void }) {
  const add = () => onChange([...images, '']);
  const update = (i: number, val: string) => {
    const next = [...images];
    next[i] = val;
    onChange(next);
  };
  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {images.map((url, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="url"
            value={url}
            onChange={e => update(i, e.target.value)}
            placeholder={`URL Gambar ${i + 1}`}
            style={inputStyle}
          />
          {url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt=""
              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0', flexShrink: 0 }}
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          )}
          <button type="button" onClick={() => onPickFromMedia(i)} style={smBtnStyle('#dbeafe', '#1d4ed8')} title="Pilih dari Media Library">📁</button>
          <button type="button" onClick={() => remove(i)} style={smBtnStyle('#fee2e2', '#dc2626')}>✕</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={add} style={smBtnStyle('#ede9fe', '#7c3aed')}>+ Tambah URL</button>
        <button type="button" onClick={() => onPickFromMedia(-1)} style={smBtnStyle('#dbeafe', '#1d4ed8')}>📁 Pilih dari Media</button>
      </div>
    </div>
  );
}

// ─── Media Picker Modal ───────────────────────────────────────────────────────

interface MediaPickerModalProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

function MediaPickerModal({ onSelect, onClose }: MediaPickerModalProps) {
  const [items, setItems]   = useState<{ id: string; url: string; filename: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/media?page=1&type=image`, {
      headers: { Authorization: `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest' },
    })
      .then(r => r.json())
      .then(d => setItems(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)',
        backdropFilter: 'blur(6px)', zIndex: 3000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '720px',
          maxHeight: '85vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 30px 70px rgba(0,0,0,0.25)', overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', borderRadius: '20px 20px 0 0' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>🖼️ Pilih Gambar dari Media Library</span>
          <button type="button" onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>⏳ Memuat gambar...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
              Belum ada gambar di Media Library.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {items.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { onSelect(item.url); onClose(); }}
                  style={{
                    border: '2px solid transparent', borderRadius: '12px', padding: 0,
                    cursor: 'pointer', background: '#f8fafc', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    transition: 'border-color 0.15s, transform 0.15s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = ''; }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.filename}
                    style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                    onError={e => (e.currentTarget.src = 'https://placehold.co/200x110?text=Error')}
                  />
                  <div style={{ padding: '6px 8px', fontSize: '0.7rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
                    {item.filename}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid #f1f5f9', fontSize: '0.8rem', color: '#94a3b8', background: '#fafbff' }}>
          Klik gambar untuk mengambil URL-nya ke form
        </div>
      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  flex: 1, padding: '0.65rem 0.9rem', borderRadius: '8px',
  border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none',
  background: '#fff', color: '#1e293b', width: '100%',
  transition: 'border-color 0.15s',
};

const smBtnStyle = (bg: string, color: string): React.CSSProperties => ({
  padding: '6px 12px', borderRadius: '6px', border: 'none',
  background: bg, color, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600,
  whiteSpace: 'nowrap',
});

const labelStyle: React.CSSProperties = {
  fontSize: '0.83rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block',
};

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalMode = 'add' | 'edit' | 'detail' | null;

export default function PostPage() {
  const {
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
  } = usePostsAdmin();

  const [modal, setModal] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [form, setForm] = useState<PostForm>(EMPTY_FORM);

  // Media picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTargetIndex, setPickerTargetIndex] = useState<number>(-1);

  const openPicker = (index: number) => {
    setPickerTargetIndex(index);
    setPickerOpen(true);
  };

  const handlePickMedia = (url: string) => {
    setForm(f => {
      const imgs = [...f.images];
      if (pickerTargetIndex >= 0 && pickerTargetIndex < imgs.length) {
        // Replace existing slot
        imgs[pickerTargetIndex] = url;
      } else {
        // Append new slot
        imgs.push(url);
      }
      return { ...f, images: imgs };
    });
  };

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'ALL'>('ALL');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  // ── Filtered data ──────────────────────────────────────────────────────────

  const filtered = posts.filter(p => {
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ── Form helpers ───────────────────────────────────────────────────────────

  const setField = <K extends keyof PostForm>(k: K, v: PostForm[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModal('add');
    clearMessages();
  };

  const openEdit = (p: Post) => {
    let images: string[] = [];
    try { images = JSON.parse(p.coverImage || '[]'); } catch { images = p.coverImage ? [p.coverImage] : []; }
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      content: '',
      status: p.status,
      images,
      seoTitle: '',
      seoDesc: '',
    });
    setEditingId(p.id);
    setModal('edit');
    clearMessages();
  };

  const openDetail = (p: Post) => { setDetailPost(p); setModal('detail'); };
  const closeModal = () => { setModal(null); setEditingId(null); setDetailPost(null); };

  // Auto-slug on title change (only when adding)
  const handleTitleChange = (val: string) => {
    setField('title', val);
    if (modal === 'add') setField('slug', slugify(val));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content || '<p>Isi berita di sini.</p>',
      status: form.status,
      coverImage: JSON.stringify(form.images.filter(Boolean)),
      seoTitle: form.seoTitle,
      seoDesc: form.seoDesc,
    };

    let successRes = false;
    if (modal === 'add') {
      successRes = await createPost(payload);
    } else if (modal === 'edit' && editingId) {
      successRes = await updatePost(editingId, payload);
    }

    if (successRes) {
      closeModal();
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    setConfirmDelete(null);
    await deletePost(id);
  };

  // ─────────────── RENDER ────────────────────────────────────────────────────

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <a href="/dashboard" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem' }}>← Dashboard</a>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>📰 Kelola Berita</h1>
          <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '0.9rem' }}>
            Manajemen artikel dan berita — cholilnafis.id
          </p>
        </div>
        <button onClick={openAdd} style={{
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          color: '#fff', border: 'none', borderRadius: '10px',
          padding: '0.7rem 1.4rem', fontSize: '0.95rem', fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(124,58,237,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(124,58,237,0.35)'; }}
        >
          + Tambah Berita
        </button>
      </div>

      {/* ── Alerts ── */}
      {success && (
        <div style={{ background: '#dcfce7', color: '#16a34a', borderRadius: '10px', padding: '0.85rem 1.2rem', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>
          ✓ {success}
        </div>
      )}
      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '10px', padding: '0.85rem 1.2rem', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>
          ✕ {error}
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1.25rem',
        display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="🔍  Cari berita..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, maxWidth: '300px', flex: '1 1 200px' }}
        />
        {(['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '7px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600,
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: filterStatus === s
                ? (s === 'ALL' ? '#7c3aed' : STATUS_BG[s as Status])
                : '#f1f5f9',
              color: filterStatus === s
                ? (s === 'ALL' ? '#fff' : STATUS_COLOR[s as Status])
                : '#64748b',
            }}
          >
            {s === 'ALL' ? 'Semua' : STATUS_LABEL[s as Status]} {s === 'ALL' ? `(${posts.length})` : `(${posts.filter(p => p.status === s).length})`}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              {['Judul Berita', 'Kategori', 'Status', 'Penulis', 'Tanggal', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left', color: '#fff', fontSize: '0.83rem', fontWeight: 600, letterSpacing: '0.03em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
                  Memuat data berita...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                  Tidak ada berita ditemukan.
                </td>
              </tr>
            ) : filtered.map((p, idx) => (
              <tr
                key={p.id}
                style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafbff', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f3ff')}
                onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafbff')}
              >
                {/* Title */}
                <td style={{ padding: '0.9rem 1rem', maxWidth: '280px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    /{p.slug}
                  </div>
                </td>

                {/* Category */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <span style={{ background: '#ede9fe', color: '#7c3aed', borderRadius: '6px', padding: '3px 8px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {p.categories?.[0]?.category?.name || 'Umum'}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <span style={{
                    background: STATUS_BG[p.status], color: STATUS_COLOR[p.status],
                    borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700,
                  }}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </td>

                {/* Author */}
                <td style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', color: '#475569' }}>
                  {p.author?.name || '—'}
                </td>

                {/* Date */}
                <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {fmtDate(p.publishedAt || p.createdAt)}
                </td>

                {/* Actions */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openDetail(p)}
                      title="Detail"
                      style={{ ...actionBtn('#e0f2fe', '#0369a1') }}
                    >
                      👁
                    </button>
                    <button
                      onClick={() => openEdit(p)}
                      title="Edit"
                      style={{ ...actionBtn('#ede9fe', '#7c3aed') }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setConfirmDelete(p.id)}
                      title="Hapus"
                      disabled={deleting === p.id}
                      style={{ ...actionBtn('#fee2e2', '#dc2626') }}
                    >
                      {deleting === p.id ? '⏳' : '🗑️'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.82rem', color: '#94a3b8', background: '#fafbff' }}>
            Menampilkan {filtered.length} dari {posts.length} berita
          </div>
        )}
      </div>

      {/* ─────────────────────── MODAL BACKDROP ───────────────────────────────── */}
      {modal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)',
            backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex',
            alignItems: modal === 'detail' ? 'center' : 'flex-start',
            justifyContent: 'center', padding: '1.5rem', overflowY: 'auto',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '20px',
              width: '100%', maxWidth: modal === 'detail' ? '640px' : '760px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
              maxHeight: '90vh', overflowY: 'auto',
              animation: 'slideUp 0.25s ease',
            }}
          >

            {/* ── DETAIL MODAL ──────────────────────────────────────── */}
            {modal === 'detail' && detailPost && (
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.4, maxWidth: '80%' }}>
                    {detailPost.title}
                  </h2>
                  <button onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{ background: STATUS_BG[detailPost.status], color: STATUS_COLOR[detailPost.status], borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: 700 }}>
                    {STATUS_LABEL[detailPost.status]}
                  </span>
                  <span style={{ background: '#ede9fe', color: '#7c3aed', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: 600 }}>
                    {detailPost.categories?.[0]?.category?.name || 'Umum'}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem' }}>
                    📅 {fmtDate(detailPost.publishedAt || detailPost.createdAt)}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem' }}>
                    ✍️ {detailPost.author?.name || '—'}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  {detailPost.excerpt || '—'}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Slug: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>/{detailPost.slug}</code>
                </div>

                {detailPost.coverImage && (() => {
                  let imgs: string[] = [];
                  try { imgs = JSON.parse(detailPost.coverImage); } catch { imgs = [detailPost.coverImage]; }
                  return imgs.length > 0 ? (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.83rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Gambar ({imgs.length})</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {imgs.map((url, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={i} src={url} alt="" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button onClick={() => { closeModal(); openEdit(detailPost); }} style={{
                    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff',
                    border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  }}>✏️ Edit Berita</button>
                  <button onClick={closeModal} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* ── ADD / EDIT MODAL ──────────────────────────────────── */}
            {(modal === 'add' || modal === 'edit') && (
              <form onSubmit={handleSubmit}>
                {/* Modal Header */}
                <div style={{ padding: '1.5rem 2rem 1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderRadius: '20px 20px 0 0' }}>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>
                    {modal === 'add' ? '📝 Tambah Berita Baru' : '✏️ Edit Berita'}
                  </h2>
                  <button type="button" onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>

                <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                  {error && (
                    <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem' }}>✕ {error}</div>
                  )}

                  {/* Title */}
                  <div>
                    <label style={labelStyle}>Judul Berita *</label>
                    <input
                      required
                      value={form.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="Contoh: KH. Cholil Nafis Bicara tentang Ekonomi Islam"
                      style={{ ...inputStyle, fontSize: '1rem', fontWeight: 500 }}
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label style={labelStyle}>Slug URL *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>cholilnafis.id/berita/</span>
                      <input
                        required
                        value={form.slug}
                        onChange={e => setField('slug', e.target.value)}
                        placeholder="url-berita-anda"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Two columns: Status */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Status *</label>
                      <select
                        value={form.status}
                        onChange={e => setField('status', e.target.value as Status)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="DRAFT">Draf</option>
                        <option value="PUBLISHED">Terbitkan</option>
                        <option value="ARCHIVED">Arsip</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>SEO Title</label>
                      <input
                        value={form.seoTitle}
                        onChange={e => setField('seoTitle', e.target.value)}
                        placeholder="Judul untuk mesin pencari"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label style={labelStyle}>Ringkasan / Excerpt</label>
                    <textarea
                      value={form.excerpt}
                      onChange={e => setField('excerpt', e.target.value)}
                      rows={3}
                      placeholder="Ringkasan singkat berita untuk card dan meta description..."
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
                    />
                  </div>

                  {/* WYSIWYG Content */}
                  <div>
                    <label style={labelStyle}>Isi Berita (Editor WYSIWYG) *</label>
                    <WYSIWYGEditor
                      value={form.content}
                      onChange={v => setField('content', v)}
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <label style={labelStyle}>
                      Gambar (multiple — akan tampil sebagai slider di frontend)
                    </label>
                    <ImageInput
                      images={form.images}
                      onChange={imgs => setField('images', imgs)}
                      onPickFromMedia={openPicker}
                    />
                  </div>

                  {/* SEO Desc */}
                  <div>
                    <label style={labelStyle}>SEO Description</label>
                    <textarea
                      value={form.seoDesc}
                      onChange={e => setField('seoDesc', e.target.value)}
                      rows={2}
                      placeholder="Deskripsi untuk mesin pencari (max 160 karakter)..."
                      maxLength={160}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>
                      {form.seoDesc.length}/160
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div style={{ padding: '1rem 2rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px', justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 20px 20px' }}>
                  <button type="button" onClick={closeModal} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', padding: '0.65rem 1.4rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                    Batal
                  </button>
                  <button
                    type="submit" disabled={saving}
                    style={{
                      background: saving ? '#c4b5fd' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      color: '#fff', border: 'none', borderRadius: '8px',
                      padding: '0.65rem 1.6rem', fontSize: '0.9rem', fontWeight: 600,
                      cursor: saving ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
                    }}
                  >
                    {saving ? '⏳ Menyimpan...' : modal === 'add' ? '✓ Simpan Berita' : '✓ Perbarui Berita'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Confirm Delete Dialog ── */}
      {confirmDelete && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setConfirmDelete(null)}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', padding: '2rem', maxWidth: '400px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗑️</div>
            <h3 style={{ margin: '0 0 0.5rem', color: '#1e293b', fontSize: '1.1rem' }}>Hapus Berita?</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
              Tindakan ini tidak bisa dibatalkan. Berita akan dihapus secara permanen.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', padding: '0.6rem 1.4rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.4rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.3)' }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Media Picker Modal ── */}
      {pickerOpen && (
        <MediaPickerModal
          onSelect={handlePickMedia}
          onClose={() => setPickerOpen(false)}
        />
      )}

      {/* ── Slide-up animation ── */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Tiny helper ──────────────────────────────────────────────────────────────

function actionBtn(bg: string, color: string): React.CSSProperties {
  return {
    background: bg, color, border: 'none', borderRadius: '7px',
    width: '32px', height: '32px', fontSize: '0.85rem',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.15s',
  };
}

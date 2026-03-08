'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useKaryaAdmin, Karya, KaryaForm, EMPTY_KARYA_FORM } from '@/hooks/useKaryaAdmin';
import { Status } from '@/hooks/usePostsAdmin';

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

const KARYA_CATEGORIES = ['ArtikelKoran', 'KaryaBuku', 'Khotbah', 'Artikel', 'Materi'] as const;

// ─── WYSIWYG Toolbar (Reused) ─────────────────────────────────────────────────────────

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

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
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
          onMouseDown={e => { e.preventDefault(); execCmd('removeFormat'); }}
          style={{
            padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: '0.78rem',
          }}
        >
          ✕ Format
        </button>

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

// ─── File URL Input ───────────────────────────────────────────────────────────

function FileInput({ url, onChange, onPickFromMedia }: { url: string; onChange: (v: string) => void; onPickFromMedia: () => void }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="url"
        value={url}
        onChange={e => onChange(e.target.value)}
        placeholder="URL File / Dokumen (cth: .pdf, .docx)"
        style={inputStyle}
      />
      {url && (
        <a href={url} target="_blank" rel="noreferrer" style={actionBtn('#f1f5f9', '#64748b')}>
          Lihat
        </a>
      )}
      <button type="button" onClick={onPickFromMedia} style={actionBtn('#dbeafe', '#1d4ed8')} title="Pilih dari Media Library">📁</button>
      {url && (
         <button type="button" onClick={() => onChange('')} style={actionBtn('#fee2e2', '#dc2626')}>✕</button>
      )}
    </div>
  );
}

// ─── Media Picker Modal ───────────────────────────────────────────────────────

interface MediaPickerModalProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

function MediaPickerModal({ onSelect, onClose }: MediaPickerModalProps) {
  const [items, setItems]   = useState<{ id: string; url: string; filename: string, type: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
    // Fetch all media (images, docs, etc) so user can pick PDF or Image
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/media?page=1`, {
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
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', borderRadius: '20px 20px 0 0' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>📁 Pilih File dari Media Library</span>
          <button type="button" onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>⏳ Memuat media...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
              Belum ada file di Media Library.
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
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = ''; }}
                >
                  {item.type.includes('image') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.filename}
                      style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                      onError={e => (e.currentTarget.src = 'https://placehold.co/200x110?text=Error')}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontSize: '2.5rem' }}>
                      📄
                    </div>
                  )}
                  <div style={{ padding: '6px 8px', fontSize: '0.7rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
                    {item.filename}
                  </div>
                </button>
              ))}
            </div>
          )}
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

const actionBtn = (bg: string, color: string): React.CSSProperties => ({
  padding: '6px 12px', borderRadius: '6px', border: 'none',
  background: bg, color, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600,
  transition: 'transform 0.1s', display: 'flex', alignItems: 'center', gap: '4px',
});

const labelStyle: React.CSSProperties = {
  fontSize: '0.83rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block',
};

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalMode = 'add' | 'edit' | 'detail' | null;

export default function KaryaPage() {
  const {
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
  } = useKaryaAdmin();

  const [modal, setModal] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailKarya, setDetailKarya] = useState<Karya | null>(null);
  const [form, setForm] = useState<KaryaForm>(EMPTY_KARYA_FORM);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'ALL'>('ALL');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { fetchKaryas(); }, [fetchKaryas]);

  // ── Filtered data ──────────────────────────────────────────────────────────

  const filtered = karyas.filter(k => {
    const matchSearch = search === '' ||
      k.title.toLowerCase().includes(search.toLowerCase()) ||
      k.shortcontent?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || k.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ── Form helpers ───────────────────────────────────────────────────────────

  const setField = <K extends keyof KaryaForm>(k: K, v: KaryaForm[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => {
    setForm(EMPTY_KARYA_FORM);
    setEditingId(null);
    setModal('add');
    clearMessages();
  };

  const openEdit = (k: Karya) => {
    setForm({
      title: k.title,
      category: k.category,
      sumber: k.sumber || 'cholilnafis.id',
      shortcontent: k.shortcontent || '',
      fullcontent: k.fullcontent || '',
      fileUrl: k.fileUrl || '',
      status: k.status,
    });
    setEditingId(k.id);
    setModal('edit');
    clearMessages();
  };

  const openDetail = (k: Karya) => { setDetailKarya(k); setModal('detail'); };
  const closeModal = () => { setModal(null); setEditingId(null); setDetailKarya(null); };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!form.fullcontent) {
      alert("Konten karya tidak boleh kosong.");
      return;
    }

    const payload = { ...form };
    if (!payload.fileUrl) payload.fileUrl = undefined as any; // Strip empty strings

    let successRes = false;
    if (modal === 'add') {
      successRes = await createKarya(payload);
    } else if (modal === 'edit' && editingId) {
      successRes = await updateKarya(editingId, payload);
    }

    if (successRes) {
      closeModal();
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    setConfirmDelete(null);
    await deleteKarya(id);
  };

  // ─────────────── RENDER ────────────────────────────────────────────────────

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <a href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', fontSize: '0.85rem' }}>← Dashboard</a>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>📚 Kelola Karya Ilmiah</h1>
          <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '0.9rem' }}>
            Manajemen publikasi artikel, jurnal, buku pilihan — cholilnafis.id
          </p>
        </div>
        <button onClick={openAdd} style={{
          background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
          color: '#fff', border: 'none', borderRadius: '10px',
          padding: '0.7rem 1.4rem', fontSize: '0.95rem', fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(14,165,233,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(14,165,233,0.35)'; }}
        >
          + Tambah Karya
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
          placeholder="🔍  Cari karya..."
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
                ? (s === 'ALL' ? '#0ea5e9' : STATUS_BG[s as Status])
                : '#f1f5f9',
              color: filterStatus === s
                ? (s === 'ALL' ? '#fff' : STATUS_COLOR[s as Status])
                : '#64748b',
            }}
          >
            {s === 'ALL' ? 'Semua' : STATUS_LABEL[s as Status]} {s === 'ALL' ? `(${karyas.length})` : `(${karyas.filter(k => k.status === s).length})`}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)' }}>
              {['Judul Karya', 'Kategori', 'Sumber', 'Status', 'Tanggal', 'Aksi'].map(h => (
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
                  Memuat data karya...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                  Tidak ada karya ditemukan.
                </td>
              </tr>
            ) : filtered.map((k, idx) => (
              <tr
                key={k.id}
                style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafbff', transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafbff')}
              >
                {/* Title */}
                <td style={{ padding: '0.9rem 1rem', maxWidth: '280px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {k.title}
                  </div>
                </td>

                {/* Category */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: '6px', padding: '3px 8px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {k.category}
                  </span>
                </td>

                <td style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', color: '#475569' }}>
                  {k.sumber || '—'}
                </td>

                {/* Status */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <span style={{
                    background: STATUS_BG[k.status], color: STATUS_COLOR[k.status],
                    borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700,
                  }}>
                    {STATUS_LABEL[k.status]}
                  </span>
                </td>

                {/* Date */}
                <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {fmtDate(k.createdAt)}
                </td>

                {/* Actions */}
                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openDetail(k)}
                      title="Detail"
                      style={{ ...actionBtn('#e0f2fe', '#0369a1') }}
                    >
                      👁
                    </button>
                    <button
                      onClick={() => openEdit(k)}
                      title="Edit"
                      style={{ ...actionBtn('#ede9fe', '#7c3aed') }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setConfirmDelete(k.id)}
                      title="Hapus"
                      disabled={deleting === k.id}
                      style={{ ...actionBtn('#fee2e2', '#dc2626') }}
                    >
                      {deleting === k.id ? '⏳' : '🗑️'}
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
            Menampilkan {filtered.length} dari {karyas.length} karya
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
            {modal === 'detail' && detailKarya && (
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.4, maxWidth: '80%' }}>
                    {detailKarya.title}
                  </h2>
                  <button onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{ background: STATUS_BG[detailKarya.status], color: STATUS_COLOR[detailKarya.status], borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: 700 }}>
                    {STATUS_LABEL[detailKarya.status]}
                  </span>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem', fontWeight: 600 }}>
                    {detailKarya.category}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem' }}>
                    🌐 {detailKarya.sumber || '—'}
                  </span>
                  <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '8px', padding: '4px 12px', fontSize: '0.82rem' }}>
                    📅 {fmtDate(detailKarya.createdAt)}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                  <strong>Ringkasan:</strong> {detailKarya.shortcontent || '—'}
                </div>
                
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, maxHeight: '300px', overflowY: 'auto' }}
                  dangerouslySetInnerHTML={{ __html: detailKarya.fullcontent }}
                />

                {detailKarya.fileUrl && (
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📄</span>
                    <a href={detailKarya.fileUrl} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                      Unduh Lampiran / File
                    </a>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button onClick={() => { closeModal(); openEdit(detailKarya); }} style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff',
                    border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  }}>✏️ Edit Karya</button>
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
                    {modal === 'add' ? '📝 Tambah Karya Baru' : '✏️ Edit Karya'}
                  </h2>
                  <button type="button" onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>

                <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                  {error && (
                    <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.88rem' }}>✕ {error}</div>
                  )}

                  {/* Title */}
                  <div>
                    <label style={labelStyle}>Judul Karya *</label>
                    <input
                      required
                      value={form.title}
                      onChange={e => setField('title', e.target.value)}
                      placeholder="Contoh: Fiqih Keluarga Modern"
                      style={{ ...inputStyle, fontSize: '1rem', fontWeight: 500 }}
                    />
                  </div>

                  {/* Two columns: Kategori and Sumber */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Kategori Karya *</label>
                      <select
                        value={form.category}
                        onChange={e => setField('category', e.target.value as any)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        {KARYA_CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Sumber Jurnal/Platform *</label>
                      <input
                        required
                        value={form.sumber}
                        onChange={e => setField('sumber', e.target.value)}
                        placeholder="Contoh: cholilnafis.id"
                        style={inputStyle}
                      />
                    </div>
                  </div>

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

                  {/* Ringkasan */}
                  <div>
                    <label style={labelStyle}>Ringkasan (Short Content) </label>
                    <textarea
                      value={form.shortcontent}
                      onChange={e => setField('shortcontent', e.target.value)}
                      placeholder="Ringkasan singkat karya ini..."
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {/* WYSIWYG Content */}
                  <div>
                    <label style={labelStyle}>Isi Lengkap (Full Content) *</label>
                    <WYSIWYGEditor
                      value={form.fullcontent}
                      onChange={val => setField('fullcontent', val)}
                    />
                  </div>
                  
                  {/* File Upload / Link */}
                  <div>
                    <label style={labelStyle}>Media Pendukung (PDF/Docx/Gambar)</label>
                    <FileInput 
                      url={form.fileUrl} 
                      onChange={(url) => setField('fileUrl', url)} 
                      onPickFromMedia={() => setPickerOpen(true)} 
                    />
                  </div>

                </div>

                {/* Submit button area */}
                <div style={{ padding: '1rem 2rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#fafbff', borderRadius: '0 0 20px 20px' }}>
                  <button type="button" onClick={closeModal} style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '0.6rem 1rem', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                    Batal
                  </button>
                  <button type="submit" disabled={saving} style={{
                    background: saving ? '#cbd5e1' : 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                    color: '#fff', border: 'none', borderRadius: '8px',
                    padding: '0.6rem 1.5rem', fontSize: '0.95rem', fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer', boxShadow: saving ? 'none' : '0 4px 12px rgba(14,165,233,0.3)',
                  }}>
                    {saving ? 'Menyimpan...' : (modal === 'add' ? '✨ Buat Karya' : '💾 Simpan Perubahan')}
                  </button>
                </div>
              </form>
            )}

            {/* Confirmation Dialog delete */}
            {confirmDelete && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', zIndex: 20 }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                  <h3 style={{ margin: '0 0 1rem', color: '#0f172a' }}>Yakin ingin menghapus karya ini?</h3>
                  <p style={{ color: '#64748b', marginBottom: '2rem' }}>Data yang dihapus tidak bisa dikembalikan.</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button onClick={() => setConfirmDelete(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                    <button onClick={() => handleDelete(confirmDelete)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Ya, Hapus</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {pickerOpen && (
        <MediaPickerModal 
          onSelect={url => setField('fileUrl', url)} 
          onClose={() => setPickerOpen(false)} 
        />
      )}

      {/* Embedded slideUp keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

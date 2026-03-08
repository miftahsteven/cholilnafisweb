'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMediaAdmin, Media } from '@/hooks/useMediaAdmin';

type Tab = 'image' | 'video' | 'pdf';
type UploadModalMode = 'local' | 'url' | null;

export default function MediaPage() {
  const {
    media,
    loading,
    uploading,
    deleting,
    toggling,
    error,
    success,
    fetchMedia,
    uploadMediaLocal,
    uploadMediaUrl,
    uploadPdf,
    uploadPdfUrl,
    registerMedia,
    deleteMedia,
    toggleGallery,
    clearMessages,
  } = useMediaAdmin();

  const [activeTab, setActiveTab] = useState<Tab>('image');
  const [uploadModal, setUploadModal] = useState<UploadModalMode>(null);
  
  // State for Add Video modal
  const [videoModal, setVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  // State for Add PDF modal
  const [pdfModal, setPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState(''); 

  // State for URL Image upload
  const [imageUrl, setImageUrl] = useState('');

  // Auto fetch when tab changes
  useEffect(() => {
    fetchMedia(1, activeTab);
  }, [activeTab, fetchMedia]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // --- Image Handlers ---

  const handleOpenLocalUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadMediaLocal(file);
      await fetchMedia(1, activeTab);
      setUploadModal(null);
    }
  };

  const handleUrlUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    await uploadMediaUrl(imageUrl);
    setImageUrl('');
    setUploadModal(null);
    await fetchMedia(1, activeTab);
  };

  // --- Video Handlers ---

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !videoTitle) return;
    
    // Attempt to extract YouTube video ID for thumbnail
    let thumbUrl = '';
    const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      thumbUrl = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }

    await registerMedia({
      filename: videoTitle,
      url: videoUrl,
      type: 'video',
      mimeType: 'video/url',
      size: 0,
      alt: thumbUrl, // We'll store thumbnail url in alt for convenience
    });
    
    setVideoTitle('');
    setVideoUrl('');
    setVideoModal(false);
    await fetchMedia(1, activeTab);
  };

  // --- PDF Handlers ---

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadPdf(file);
      await fetchMedia(1, activeTab);
      setUploadModal(null);
    }
  };

  const handlePdfUrlUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfUrl) return;
    await uploadPdfUrl(pdfUrl);
    setPdfUrl('');
    setUploadModal(null);
    await fetchMedia(1, activeTab);
  };  

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus media ini?")) {
      await deleteMedia(id);
      await fetchMedia(1, activeTab);
    }
  };

  // Helper to fix static localhost URLs saved in DB if tested on a Local Area Network device
  const getDisplayUrl = (url: string) => {
    if (typeof window === 'undefined' || !url) return url;
    if (url.includes('localhost') && window.location.hostname !== 'localhost') {
      return url.replace('localhost', window.location.hostname);
    }
    return url;
  };

  // --- Render Helpers ---

  const btnStyle = (bg: string, color: string): React.CSSProperties => ({
    background: bg, color, padding: '0.6rem 1.2rem', borderRadius: '8px',
    border: 'none', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
    transition: 'opacity 0.2s',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.7rem 1rem', borderRadius: '8px',
    border: '1px solid #cbd5e1', fontSize: '0.95rem', marginBottom: '1rem',
    outline: 'none'
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>
      
      {/* Hidden File Input */}
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <a href="/dashboard" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem' }}>← Dashboard</a>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>🖼️ Media Library</h1>
          <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '0.9rem' }}>
            Manajemen berkas gambar dan tautan video
          </p>
        </div>

        {activeTab === 'image' ? (
          <button 
            onClick={() => setUploadModal('local')} 
            style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), display: 'flex', gap: '6px', alignItems: 'center' }}
            disabled={uploading}
          >
            {uploading ? '⏳ Mengunggah...' : '+ Tambah Gambar'}
          </button>
        )   : activeTab === 'video' ? (
          <button 
            onClick={() => setVideoModal(true)} 
            style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), display: 'flex', gap: '6px', alignItems: 'center' }}
            disabled={uploading}
          >
            {uploading ? '⏳ Menyimpan...' : '+ Tambah Video'}
          </button>
        ) : activeTab === 'pdf' ? (
          <button 
            onClick={() => setPdfModal(true)} 
            style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), display: 'flex', gap: '6px', alignItems: 'center' }}
            disabled={uploading}
          >
            {uploading ? '⏳ Menyimpan...' : '+ Tambah PDF'}
          </button>
        ) : null}
      </div>

      {success && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 500 }}>✓ {success}</div>}
      {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 500 }}>✕ {error}</div>}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('image')}
          style={{
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', color: activeTab === 'image' ? '#7c3aed' : '#64748b',
            borderBottom: activeTab === 'image' ? '3px solid #7c3aed' : '3px solid transparent',
            marginBottom: '-2px', transition: 'all 0.2s'
          }}
        >
          Gambar Lokal
        </button>
        <button
          onClick={() => setActiveTab('video')}
          style={{
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', color: activeTab === 'video' ? '#7c3aed' : '#64748b',
            borderBottom: activeTab === 'video' ? '3px solid #7c3aed' : '3px solid transparent',
            marginBottom: '-2px', transition: 'all 0.2s'
          }}
        >
          Tautan Video
        </button>
        <button
          onClick={() => setActiveTab('pdf')}
          style={{
            padding: '0.75rem 1.5rem', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', color: activeTab === 'pdf' ? '#7c3aed' : '#64748b',
            borderBottom: activeTab === 'pdf' ? '3px solid #7c3aed' : '3px solid transparent',
            marginBottom: '-2px', transition: 'all 0.2s'
          }}
        >
          Dokumen / PDF
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>⏳ Memuat data media...</div>
      ) : activeTab === 'image' ? (
        // IMAGE GRID
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem'
        }}>
          {media.length > 0 ? media.map((m) => (
            <div key={m.id} style={{
              background: '#fff', borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative',
              border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#f8fafc' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getDisplayUrl(m.url)} 
                  alt={m.filename} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400?text=Error')}
                />

                {/* Gallery checkbox — top left */}
                <button
                  onClick={() => toggleGallery(m.id, !m.showInGallery)}
                  disabled={toggling === m.id}
                  title={m.showInGallery ? 'Hapus dari Galeri' : 'Tampilkan di Galeri'}
                  style={{
                    position: 'absolute', top: '8px', left: '8px',
                    width: '26px', height: '26px', borderRadius: '6px', border: 'none',
                    background: m.showInGallery ? '#16a34a' : 'rgba(255,255,255,0.85)',
                    color: m.showInGallery ? '#fff' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {toggling === m.id ? '⏳' : m.showInGallery ? '✓' : '○'}
                </button>

                {/* Delete button — top right */}
                <button 
                  onClick={() => handleDelete(m.id)}
                  disabled={deleting === m.id}
                  style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none',
                    width: '28px', height: '28px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: '0.8rem', opacity: 0.8,
                  }}
                  title="Hapus gambar"
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                >
                  {deleting === m.id ? '⏳' : '✕'}
                </button>
              </div>
              <div style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.filename}
              </div>
              {/* Copy URL button */}
              <button 
                onClick={() => { navigator.clipboard.writeText(getDisplayUrl(m.url)); alert("URL disalin!"); }}
                style={{
                  background: '#f1f5f9', border: 'none', borderTop: '1px solid #e2e8f0',
                  padding: '8px', color: '#4f46e5', fontSize: '0.8rem', fontWeight: 600,
                  cursor: 'pointer', width: '100%'
                }}
              >
                Salin URL
              </button>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              Belum ada gambar yang diunggah.
            </div>
          )}
        </div>
      ) : activeTab === 'video' ? (
        // VIDEO TABLE
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem' }}>Thumbnail</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem' }}>Judul Video</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem' }}>Tautan (URL)</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>Galeri</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#475569', fontSize: '0.85rem' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {media.length > 0 ? media.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    {m.alt ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={getDisplayUrl(m.alt)} alt={m.filename} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '80px', height: '45px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>Video</div>
                    )}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>{m.filename}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                    <a href={getDisplayUrl(m.url)} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{getDisplayUrl(m.url)}</a>
                  </td>
                  {/* Gallery toggle */}
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => toggleGallery(m.id, !m.showInGallery)}
                      disabled={toggling === m.id}
                      title={m.showInGallery ? 'Hapus dari Galeri' : 'Tampilkan di Galeri'}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                        background: m.showInGallery ? '#16a34a' : '#f1f5f9',
                        color: m.showInGallery ? '#fff' : '#94a3b8',
                        fontSize: '1rem', cursor: 'pointer', margin: '0 auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s, color 0.2s',
                        boxShadow: m.showInGallery ? '0 2px 8px rgba(22,163,74,0.3)' : 'none',
                      }}
                    >
                      {toggling === m.id ? '⏳' : m.showInGallery ? '✓' : '○'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                     <button 
                        onClick={() => handleDelete(m.id)}
                        disabled={deleting === m.id}
                        style={{ ...btnStyle('#fee2e2', '#dc2626'), fontSize: '0.8rem', padding: '0.5rem 0.8rem' }}
                      >
                        {deleting === m.id ? '⏳' : 'Hapus'}
                      </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Belum ada video yang ditambahkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // PDF TABLE
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem', width: '80px' }}>Ikon</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem' }}>Nama Dokumen</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#475569', fontSize: '0.85rem' }}>Tautan (URL)</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#475569', fontSize: '0.85rem' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {media.length > 0 ? media.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ width: '60px', height: '60px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                      📄
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                    {m.filename}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', fontWeight: 'normal' }}>
                      Berukuran: {(m.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                    <a href={getDisplayUrl(m.url)} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{getDisplayUrl(m.url)}</a>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                     <button 
                        onClick={() => { navigator.clipboard.writeText(getDisplayUrl(m.url)); alert("URL disalin!"); }}
                        style={{ ...btnStyle('#f1f5f9', '#4f46e5'), fontSize: '0.8rem', padding: '0.5rem 0.8rem', marginRight: '6px' }}
                      >
                        Salin URL
                      </button>
                      <button 
                        onClick={() => handleDelete(m.id)}
                        disabled={deleting === m.id}
                        style={{ ...btnStyle('#fee2e2', '#dc2626'), fontSize: '0.8rem', padding: '0.5rem 0.8rem' }}
                      >
                        {deleting === m.id ? '⏳' : 'Hapus'}
                      </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Belum ada PDF yang ditambahkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


      {/* Upload Image Modal */}
      {uploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.3rem' }}>Unggah Gambar</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => setUploadModal('local')} 
                style={{ ...btnStyle(uploadModal === 'local' ? '#ede9fe' : '#f1f5f9', uploadModal === 'local' ? '#7c3aed' : '#64748b'), flex: 1 }}
              >
                Pilih Berkas Lokal
              </button>
              <button 
                onClick={() => setUploadModal('url')} 
                style={{ ...btnStyle(uploadModal === 'url' ? '#ede9fe' : '#f1f5f9', uploadModal === 'url' ? '#7c3aed' : '#64748b'), flex: 1 }}
              >
                Dari URL (Tautan)
              </button>
            </div>

            {uploadModal === 'local' ? (
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }} onClick={handleOpenLocalUpload}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#94a3b8' }}>📁</div>
                <div style={{ color: '#475569', fontWeight: 600 }}>Klik untuk memilih gambar dari komputer</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>Mendukung JPG, PNG, WEBP (Max: 10MB)</div>
              </div>
            ) : (
              <form onSubmit={handleUrlUpload}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>Masukkan URL Gambar Asli</label>
                <input 
                  type="url" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="https://example.com/image.jpg" 
                  required 
                  style={inputStyle} 
                />
                <button type="submit" disabled={uploading} style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), width: '100%' }}>
                  {uploading ? '⏳ Mendownload...' : 'Unduh Gambar ke Server'}
                </button>
              </form>
            )}

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button onClick={() => setUploadModal(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add Video Modal */}
      {videoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.3rem' }}>Tambah Tautan Video</h2>
            <form onSubmit={handleAddVideo}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>Judul Video</label>
              <input 
                value={videoTitle} 
                onChange={(e) => setVideoTitle(e.target.value)} 
                placeholder="Ex: Ceramah Maulid Nabi" 
                required 
                style={{ ...inputStyle, marginBottom: '1.25rem' }} 
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>URL Video (YouTube / lainnya)</label>
              <input 
                type="url" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                placeholder="https://www.youtube.com/watch?v=..." 
                required 
                style={inputStyle} 
              />
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>Thumbnail akan diekstrak otomatis jika menggunakan tautan YouTube.</div>

              <button type="submit" disabled={uploading} style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), width: '100%' }}>
                  {uploading ? '⏳ Menyimpan...' : 'Simpan Video'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button onClick={() => setVideoModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {pdfModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.3rem' }}>Unggah Dokumen PDF</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => setUploadModal('local')} 
                style={{ ...btnStyle(uploadModal !== 'url' ? '#ede9fe' : '#f1f5f9', uploadModal !== 'url' ? '#7c3aed' : '#64748b'), flex: 1 }}
              >
                Pilih Berkas Lokal
              </button>
              <button 
                onClick={() => setUploadModal('url')} 
                style={{ ...btnStyle(uploadModal === 'url' ? '#ede9fe' : '#f1f5f9', uploadModal === 'url' ? '#7c3aed' : '#64748b'), flex: 1 }}
              >
                Dari URL (Tautan)
              </button>
            </div>

            {uploadModal !== 'url' ? (
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', cursor: 'pointer' }} onClick={() => pdfInputRef.current?.click()}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#94a3b8' }}>📄</div>
                <div style={{ color: '#475569', fontWeight: 600 }}>Klik untuk memilih PDF / Dokumen Word dari komputer</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>Mendukung berkas .pdf, .doc, .docx (Max: 10MB)</div>
                {/* Specific hidden input targeting PDF for simpler logic without separate ref */}
                <input type="file" ref={pdfInputRef} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: 'none' }} onChange={(e) => { handlePdfUpload(e); setPdfModal(false); }} />
              </div>
            ) : (
              <form onSubmit={(e) => { handlePdfUrlUpload(e); setPdfModal(false); }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#475569' }}>Masukkan URL PDF Asli</label>
                <input 
                  type="url" 
                  value={pdfUrl} 
                  onChange={(e) => setPdfUrl(e.target.value)} 
                  placeholder="https://example.com/document.pdf" 
                  required 
                  style={inputStyle} 
                />
                <button type="submit" disabled={uploading} style={{ ...btnStyle('linear-gradient(135deg, #7c3aed, #4f46e5)', '#fff'), width: '100%' }}>
                  {uploading ? '⏳ Mendownload...' : 'Unduh Dokumen ke Server'}
                </button>
              </form>
            )}

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button onClick={() => setPdfModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

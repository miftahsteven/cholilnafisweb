'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface ChatMessage {
  id: string;
  sessionId: string;
  question: string;
  answer: string;
  createdAt: string;
  source: string;
  userName?: string;
  userEmail?: string;
}

interface GroupedAccount {
  id: string;
  name: string;
  email?: string;
  lastChat: string;
  messageCount: number;
  source: string;
  history: ChatMessage[];
}

export default function ChatbotAdminPage() {
  const [questions, setQuestions] = useState<ChatMessage[]>([]);
  const [groupedAccounts, setGroupedAccounts] = useState<GroupedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<GroupedAccount | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const response = await apiClient.getChatbotQuestions(token);
      const data: ChatMessage[] = response.data || [];
      setQuestions(data);
      groupQuestions(data);
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil data pertanyaan.');
    } finally {
      setLoading(false);
    }
  };

  const groupQuestions = (data: ChatMessage[]) => {
    const groups: Record<string, GroupedAccount> = {};

    data.forEach((q) => {
      // Use email if available, otherwise sessionId
      const groupId = q.userEmail || q.sessionId;
      
      if (!groups[groupId]) {
        groups[groupId] = {
          id: groupId,
          name: q.userName || 'Pengguna Anonim',
          email: q.userEmail,
          lastChat: q.createdAt,
          messageCount: 0,
          source: q.source,
          history: [],
        };
      }

      groups[groupId].messageCount += 1;
      groups[groupId].history.push(q);
      
      // Update lastChat if this one is newer
      if (new Date(q.createdAt) > new Date(groups[groupId].lastChat)) {
        groups[groupId].lastChat = q.createdAt;
      }
    });

    // Sort accounts by lastChat desc
    const sorted = Object.values(groups).sort(
      (a, b) => new Date(b.lastChat).getTime() - new Date(a.lastChat).getTime()
    );

    setGroupedAccounts(sorted);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const containerStyle: React.CSSProperties = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1e293b',
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #f1f5f9',
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
  };

  const tdStyle: React.CSSProperties = {
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.95rem',
  };

  const badgeStyle = (source: string): React.CSSProperties => ({
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    background: source === 'cholilnafis.id' ? '#ede9fe' : '#e0f2fe',
    color: source === 'cholilnafis.id' ? '#7c3aed' : '#0284c7',
    display: 'inline-block',
  });

  const detailBtnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#fff',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <a href="/dashboard" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
              ← Kembali ke Dashboard
            </a>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>🤖 AI Chatbot Analytics</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '1rem' }}>
            Review dan analisis interaksi konsultasi dari seluruh platform.
          </p>
        </div>
        <button 
          onClick={fetchQuestions}
          style={{ ...detailBtnStyle, background: '#7c3aed', color: '#fff', border: 'none', padding: '0.75rem 1.25rem' }}
        >
          {loading ? 'Memuat...' : '🔄 Refresh Data'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={cardStyle}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            Mengumpulkan data percakapan...
          </div>
        ) : groupedAccounts.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Pengguna / Akun</th>
                  <th style={thStyle}>Platform Asal</th>
                  <th style={thStyle}>Total Chat</th>
                  <th style={thStyle}>Terakhir Aktif</th>
                  <th style={thStyle}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {groupedAccounts.map((acc) => (
                  <tr key={acc.id}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{acc.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                        {acc.email || `Session: ${acc.id.substring(0, 12)}...`}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={badgeStyle(acc.source)}>{acc.source}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600 }}>{acc.messageCount} Pertanyaan</div>
                    </td>
                    <td style={tdStyle}>{formatDate(acc.lastChat)}</td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => setSelectedAccount(acc)}
                        style={detailBtnStyle}
                        onMouseOver={(e) => (e.currentTarget.style.borderColor = '#7c3aed')}
                        onMouseOut={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            Belum ada data percakapan yang ditemukan.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAccount && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Detail Riwayat Chat</h2>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  {selectedAccount.name} • {selectedAccount.email || selectedAccount.id}
                </div>
              </div>
              <button 
                onClick={() => setSelectedAccount(null)}
                style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', background: '#fff' }}>
              {selectedAccount.history.map((chat, idx) => (
                <div key={chat.id} style={{ borderLeft: '3px solid #ede9fe', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
                    #{selectedAccount.history.length - idx} • {formatDate(chat.createdAt)}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '4px' }}>Pertanyaan User:</div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', color: '#1e293b', lineHeight: '1.6' }}>
                      {chat.question}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: '4px' }}>Jawaban AI:</div>
                    <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px', color: '#065f46', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {chat.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #f1f5f9', textAlign: 'right', background: '#f8fafc' }}>
              <button 
                onClick={() => setSelectedAccount(null)}
                style={{ ...detailBtnStyle, background: '#1e293b', color: '#fff', border: 'none', padding: '0.75rem 2rem' }}
              >
                Tutup Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

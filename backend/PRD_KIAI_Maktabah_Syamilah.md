# PRD.md
# Pengembangan Sub-Agent KI.AI: Maktabah Syamilah

## 1. Ringkasan Produk

KI.AI saat ini berjalan sebagai platform konsultasi Islam berbasis AI yang dapat diakses melalui dua channel utama:

1. Web Chat KI.AI
2. WhatsApp KI.AI

PRD ini bertujuan untuk mengembangkan sub-agent baru bernama **Maktabah Syamilah**.

Sub-agent ini memungkinkan user atau pengunjung bertanya tentang ilmu Islam dengan sumber utama dari database kitab Maktabah Syamilah. Database Maktabah Syamilah terpisah dari database utama KI.AI agar data kitab, struktur referensi, dan proses pencarian dapat dikelola secara khusus tanpa mengganggu agent KI.AI umum.

Agent Maktabah Syamilah harus dapat digunakan di dua platform:

1. Web Chat KI.AI
2. WhatsApp KI.AI

User dapat memilih agent/model Maktabah Syamilah dari web, atau mengaktifkannya melalui command/pola pesan tertentu di WhatsApp.

---

## 2. Tujuan Pengembangan

Tujuan utama fitur ini adalah:

1. Menambahkan pilihan agent/model baru pada KI.AI bernama **Maktabah Syamilah**.
2. Membuat user dapat bertanya kepada KI.AI dengan sumber jawaban dari database kitab Maktabah Syamilah.
3. Memisahkan database Maktabah Syamilah dari database utama KI.AI.
4. Menjadikan agent Maktabah Syamilah dapat berjalan di Web Chat dan WhatsApp.
5. Mendukung pertanyaan multi bahasa:
   - Bahasa Indonesia
   - Bahasa Arab
   - Bahasa Inggris
   - Bahasa campuran
6. Menjawab pertanyaan menggunakan bahasa yang sama dengan bahasa user.
7. Menampilkan sumber kitab, nama kitab, penulis, bab, jilid, halaman, dan kutipan teks Arab jika tersedia.
8. Menyimpan log percakapan tetap di database utama KI.AI.
9. Menjaga agar agent KI.AI umum tetap berjalan tanpa terganggu.

---

## 3. Ruang Lingkup

### 3.1 Termasuk Dalam Scope

Fitur yang harus dikembangkan:

1. Backend sub-agent Maktabah Syamilah.
2. Koneksi database Maktabah Syamilah terpisah.
3. Repository pencarian kitab.
4. Language detection.
5. Query normalization.
6. Translasi query ke istilah Arab jika diperlukan.
7. Search engine untuk database kitab.
8. Ranking hasil pencarian.
9. LLM answer generator berbasis context kitab.
10. Agent selector pada Web Chat.
11. WhatsApp command handler untuk memilih agent Maktabah Syamilah.
12. Session memory sederhana untuk menyimpan pilihan agent per user/session.
13. Penyimpanan chat log ke database utama KI.AI.
14. Tampilan referensi kitab pada Web Chat.
15. Format referensi kitab yang ringkas dan nyaman dibaca di WhatsApp.

### 3.2 Tidak Termasuk Dalam Scope Awal

Fitur berikut tidak wajib dibuat pada tahap awal:

1. Admin panel khusus untuk mengelola kitab.
2. Importer database Maktabah Syamilah dari file mentah.
3. Vector database.
4. Fine-tuning model.
5. Voice note WhatsApp.
6. OCR kitab berbasis gambar/PDF.
7. Multi-agent otomatis lintas MUI, NU, kitab, dan web eksternal.

Namun struktur harus dibuat modular agar fitur-fitur tersebut dapat ditambahkan di masa depan.

---

## 4. Definisi Agent

KI.AI akan memiliki beberapa agent/model.

### 4.1 KI.AI Umum

Agent default untuk pertanyaan umum tentang Islam, konsultasi ringan, pemikiran tokoh, knowledge internal, dan jawaban umum.

ID agent:

```ts
'general'
```

### 4.2 Maktabah Syamilah

Agent khusus untuk menjawab pertanyaan berdasarkan referensi kitab dari database Maktabah Syamilah.

ID agent:

```ts
'maktabah_syamilah'
```

Agent ini tidak boleh mengarang referensi. Jika data kitab tidak ditemukan, agent harus menjawab bahwa referensi belum cukup ditemukan.

---

## 5. Prinsip Utama Pengembangan

1. Jangan merusak fitur KI.AI umum yang sudah berjalan.
2. Jangan mencampur database utama KI.AI dengan database Maktabah Syamilah.
3. Database utama KI.AI tetap digunakan untuk:
   - user
   - session
   - chat log
   - feedback
   - konfigurasi agent
   - history percakapan
4. Database Maktabah Syamilah hanya digunakan untuk:
   - data kitab
   - penulis
   - bab
   - isi kitab
   - metadata referensi
5. Semua proses harus modular.
6. Agent harus bisa dipanggil dari berbagai channel, bukan hanya dari web.
7. Web dan WhatsApp harus menggunakan service backend yang sama.
8. Format output boleh berbeda per channel, tetapi sumber data dan logic agent harus sama.

---

## 6. Platform yang Didukung

## 6.1 Web Chat KI.AI

Pada Web Chat, user dapat memilih agent/model dari UI.

Contoh pilihan:

```text
Pilih Model Jawaban:
[ KI.AI Umum ▼ ]
```

Dropdown:

```text
KI.AI Umum
Maktabah Syamilah
```

Jika user memilih Maktabah Syamilah, seluruh pertanyaan pada sesi chat tersebut diarahkan ke agent Maktabah Syamilah sampai user mengganti model kembali.

---

## 6.2 WhatsApp KI.AI

Pada WhatsApp, user tidak memiliki dropdown. Maka perlu mekanisme command atau intent sederhana untuk memilih agent.

Gunakan beberapa pola aktivasi:

```text
/maktabah
/maktabah_syamilah
/kitab
mode maktabah
tanya kitab
```

Contoh aktivasi:

```text
/maktabah
```

Response WhatsApp:

```text
Mode Maktabah Syamilah aktif.
Silakan ajukan pertanyaan tentang ilmu Islam. KI.AI akan mencari jawaban dari referensi kitab Maktabah Syamilah jika tersedia.

Contoh:
Apa hukum shalat berjamaah?
```

Contoh bertanya langsung:

```text
/maktabah Apa hukum zakat perdagangan?
```

Sistem harus langsung memproses pertanyaan tersebut menggunakan agent Maktabah Syamilah.

Untuk keluar dari mode Maktabah:

```text
/umum
/general
mode umum
```

Response:

```text
Mode KI.AI Umum aktif kembali.
```

---

## 7. User Flow Web Chat

### 7.1 Flow Pilih Agent di Web

1. User membuka halaman konsultasi KI.AI.
2. Sistem menampilkan chat interface.
3. Di atas input chat, tampil model selector.
4. Default model adalah KI.AI Umum.
5. User memilih Maktabah Syamilah.
6. Sistem menampilkan info box:

```text
Mode Maktabah Syamilah aktif.
Jawaban akan dicari dari database kitab Maktabah Syamilah dan disertai referensi kitab jika tersedia.
```

7. User mengetik pertanyaan.
8. Frontend mengirim request ke backend dengan field agent = maktabah_syamilah.
9. Backend memproses pertanyaan melalui Maktabah Agent.
10. Backend mengembalikan jawaban dan sources.
11. Frontend menampilkan jawaban, badge agent, dan referensi kitab.

---

## 8. User Flow WhatsApp

### 8.1 Flow Aktivasi Mode Maktabah

1. User mengirim pesan WhatsApp:

```text
/maktabah
```

2. Webhook WhatsApp menerima pesan.
3. Backend membaca command.
4. Backend menyimpan activeAgent untuk nomor WhatsApp tersebut menjadi maktabah_syamilah.
5. Sistem membalas:

```text
Mode Maktabah Syamilah aktif.
Silakan ajukan pertanyaan tentang kitab, fiqih, tafsir, hadits, atau pembahasan Islam lainnya.
```

6. User mengirim pertanyaan berikutnya.
7. Backend memproses pertanyaan menggunakan agent Maktabah Syamilah.
8. Sistem menjawab dalam format WhatsApp yang ringkas.

---

### 8.2 Flow Tanya Langsung Dengan Command

User:

```text
/maktabah Apa hukum shalat berjamaah?
```

Backend harus:

1. Mengenali command /maktabah.
2. Mengambil sisa teks sebagai pertanyaan.
3. Set activeAgent user menjadi maktabah_syamilah.
4. Memproses pertanyaan dengan Maktabah Agent.
5. Mengirim jawaban ke WhatsApp.

---

### 8.3 Flow Kembali ke KI.AI Umum

User:

```text
/umum
```

Response:

```text
Mode KI.AI Umum aktif kembali.
Silakan ajukan pertanyaan seperti biasa.
```

---

## 9. Bahasa dan Translasi

Agent Maktabah Syamilah harus mendukung input multi bahasa.

### 9.1 Bahasa yang Didukung

1. Indonesia
2. Arab
3. Inggris
4. Campuran

### 9.2 Aturan Bahasa Jawaban

1. Jika user bertanya dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia.
2. Jika user bertanya dalam Bahasa Arab, jawab dalam Bahasa Arab.
3. Jika user bertanya dalam Bahasa Inggris, jawab dalam Bahasa Inggris.
4. Jika user menggunakan bahasa campuran, prioritaskan bahasa yang paling dominan.
5. Kutipan kitab tetap ditampilkan dalam teks Arab jika tersedia.

### 9.3 Proses Bahasa

Pipeline bahasa:

1. Detect language.
2. Normalize question.
3. Translate query ke istilah Arab jika input bukan Arab.
4. Generate keyword Arab.
5. Query ke database Maktabah.
6. Generate answer sesuai bahasa awal user.

Contoh:

Input Indonesia:

```text
Apa hukum zakat perdagangan?
```

Query Arab:

```text
زكاة عروض التجارة
حكم زكاة التجارة
```

Input Inggris:

```text
What is the ruling on zakat for trade goods?
```

Query Arab:

```text
زكاة عروض التجارة
حكم زكاة التجارة
```

Input Arab:

```text
ما حكم زكاة عروض التجارة؟
```

Query Arab langsung:

```text
زكاة عروض التجارة
```

---

## 10. Arsitektur Sistem

Gunakan arsitektur modular berbasis agent.

Direktori yang direkomendasikan:

```text
src/modules/ki-ai/
  agents/
    general/
      general.agent.ts
      general.service.ts
      general.prompt.ts
    maktabah-syamilah/
      maktabah.agent.ts
      maktabah.service.ts
      maktabah.repository.ts
      maktabah.language.ts
      maktabah.search.ts
      maktabah.ranking.ts
      maktabah.prompt.ts
      maktabah.types.ts
  channels/
    web/
      web-chat.controller.ts
      web-chat.service.ts
    whatsapp/
      whatsapp-webhook.controller.ts
      whatsapp-message.service.ts
      whatsapp-command.parser.ts
      whatsapp-format.service.ts
  core/
    agent-router.service.ts
    chat-session.service.ts
    chat-log.service.ts
    source-log.service.ts
```

Tujuan struktur ini adalah agar agent tidak tergantung pada channel.

Web dan WhatsApp memanggil agent router yang sama.

---

## 11. Agent Router

Buat service pusat untuk menentukan agent mana yang digunakan.

File:

```text
src/modules/ki-ai/core/agent-router.service.ts
```

Contoh logic:

```ts
async function routeQuestion(input: AgentRouteInput): Promise<AgentRouteResult> {
  const agent = input.agent || await getActiveAgentFromSession(input.sessionId, input.channelUserId)

  if (agent === 'maktabah_syamilah') {
    return maktabahAgent.handle(input)
  }

  return generalAgent.handle(input)
}
```

Input:

```ts
type AgentRouteInput = {
  message: string
  agent?: 'general' | 'maktabah_syamilah'
  channel: 'web' | 'whatsapp'
  sessionId?: string
  userId?: string
  channelUserId?: string
  metadata?: Record<string, any>
}
```

Output:

```ts
type AgentRouteResult = {
  success: boolean
  agent: 'general' | 'maktabah_syamilah'
  channel: 'web' | 'whatsapp'
  language?: string
  answer: string
  sources?: ChatSourcePayload[]
  confidence?: number
  error?: string
}
```

---

## 12. Database Connection

Database utama KI.AI dan database Maktabah Syamilah harus terpisah.

Environment variables:

```env
DATABASE_URL_MAIN="postgresql://user:password@host:port/cholilwebdb"
DATABASE_URL_MAKTABAH="postgresql://user:password@host:port/maktabah_syamilah"
OPENAI_API_KEY=""
MAKTABAH_SEARCH_LIMIT=20
MAKTABAH_TOP_SOURCE_LIMIT=5
MAKTABAH_MIN_CONFIDENCE=0.45
```

Jika menggunakan Prisma, gunakan dua Prisma Client.

Contoh:

```text
prisma/
  schema.prisma
  schema.maktabah.prisma
```

Generate client utama:

```bash
npx prisma generate --schema=prisma/schema.prisma
```

Generate client Maktabah:

```bash
npx prisma generate --schema=prisma/schema.maktabah.prisma
```

Contoh file:

```ts
// src/lib/prisma-main.ts
import { PrismaClient } from '@prisma/client'

export const prismaMain = new PrismaClient()
```

```ts
// src/lib/prisma-maktabah.ts
import { PrismaClient as MaktabahPrismaClient } from '../../prisma/generated/maktabah'

export const prismaMaktabah = new MaktabahPrismaClient()
```

---

## 13. Skema Database Utama KI.AI

Database utama menyimpan session, agent state, chat log, dan sources.

Tambahkan atau sesuaikan model berikut.

```prisma
model ChatSession {
  id              String   @id @default(cuid())
  userId          String?
  channel         String   // web | whatsapp
  channelUserId   String?
  activeAgent     String   @default("general")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  logs            ChatLog[]
}

model ChatLog {
  id          String   @id @default(cuid())
  sessionId   String?
  userId      String?
  channel     String   // web | whatsapp
  agent       String   @default("general")
  question    String
  answer      String?
  language    String?
  confidence  Float?
  mode        String?
  createdAt   DateTime @default(now())

  session     ChatSession? @relation(fields: [sessionId], references: [id])
  sources     ChatSource[]
}

model ChatSource {
  id          String   @id @default(cuid())
  chatLogId   String
  sourceType  String   // maktabah_syamilah | internal | external
  title       String?
  author      String?
  chapter     String?
  page        Int?
  volume      Int?
  excerpt     String?
  referenceId String?
  metadata    Json?

  chatLog     ChatLog @relation(fields: [chatLogId], references: [id])
}
```

Catatan:

1. `channelUserId` untuk WhatsApp bisa berisi nomor WhatsApp.
2. `activeAgent` menyimpan mode agent terakhir user.
3. Log tetap di database utama KI.AI.
4. Data kitab tidak disalin ke database utama, kecuali excerpt/source yang digunakan sebagai log jawaban.

---

## 14. Skema Konseptual Database Maktabah Syamilah

Sesuaikan dengan struktur database Maktabah Syamilah yang sudah ada. Jika belum standar, gunakan adapter repository agar tidak perlu mengubah database mentah.

Struktur konseptual:

```prisma
model MaktabahBook {
  id          Int      @id
  title      String
  titleAr    String?
  author     String?
  authorAr   String?
  category   String?
  source     String?
  createdAt  DateTime?
  updatedAt  DateTime?

  chapters   MaktabahChapter[]
  contents   MaktabahContent[]
}

model MaktabahChapter {
  id        Int      @id
  bookId    Int
  title     String
  titleAr   String?
  orderNo   Int?

  book      MaktabahBook @relation(fields: [bookId], references: [id])
  contents  MaktabahContent[]
}

model MaktabahContent {
  id          Int      @id
  bookId      Int
  chapterId   Int?
  page        Int?
  volume      Int?
  contentAr   String
  contentText String?
  normalized  String?
  searchText  String?

  book        MaktabahBook     @relation(fields: [bookId], references: [id])
  chapter     MaktabahChapter? @relation(fields: [chapterId], references: [id])
}
```

Jika database asli memiliki field berbeda, buat mapper:

```ts
type MaktabahRawRecord = any

type MaktabahSource = {
  id: string
  bookTitle: string
  author?: string
  chapter?: string
  page?: number
  volume?: number
  excerpt: string
  score: number
}

function mapRawRecordToMaktabahSource(record: MaktabahRawRecord): MaktabahSource {
  return {
    id: String(record.id),
    bookTitle: record.book_title || record.title || record.name,
    author: record.author || record.author_name,
    chapter: record.chapter_title || record.chapter,
    page: record.page || null,
    volume: record.volume || null,
    excerpt: record.content_ar || record.text || record.nass,
    score: Number(record.rank || 0)
  }
}
```

---

## 15. Search Engine Maktabah

Search engine harus berjalan bertahap dari sederhana ke lebih kuat.

### 15.1 Tahap 1: Exact Search

Mencari frasa Arab secara langsung.

```sql
SELECT *
FROM maktabah_contents
WHERE content_ar ILIKE '%' || $1 || '%'
LIMIT 20;
```

### 15.2 Tahap 2: Keyword Search

Pecah query menjadi beberapa keyword Arab.

Contoh:

```text
زكاة عروض التجارة
```

Keyword:

```text
زكاة
عروض
التجارة
```

Query:

```sql
SELECT *
FROM maktabah_contents
WHERE content_ar ILIKE '%زكاة%'
AND content_ar ILIKE '%التجارة%'
LIMIT 20;
```

### 15.3 Tahap 3: PostgreSQL Full Text Search

Jika memungkinkan, gunakan FTS PostgreSQL dengan konfigurasi simple.

```sql
SELECT *,
  ts_rank(
    to_tsvector('simple', content_ar),
    plainto_tsquery('simple', $1)
  ) AS rank
FROM maktabah_contents
WHERE to_tsvector('simple', content_ar) @@ plainto_tsquery('simple', $1)
ORDER BY rank DESC
LIMIT 20;
```

### 15.4 Tahap 4: Fallback Query Expansion

Jika hasil sedikit atau kosong:

1. Minta LLM membuat variasi istilah Arab.
2. Cari dengan sinonim.
3. Cari dengan keyword pendek.
4. Cari berdasarkan kategori kitab jika intent dapat dikenali.

Contoh variasi:

Input:

```text
hukum shalat berjamaah
```

Query Arab alternatif:

```text
صلاة الجماعة
حكم الجماعة
فضل صلاة الجماعة
الجماعة في الصلاة
```

---

## 16. Ranking Relevance

Setiap hasil pencarian harus diberi score.

Contoh rumus sederhana:

```ts
score = exactMatchScore
  + keywordMatchScore
  + titleMatchScore
  + chapterMatchScore
  + textDensityScore
  + categoryBoost
```

Prioritas hasil:

1. Mengandung frasa utama.
2. Mengandung beberapa keyword penting.
3. Bab sesuai dengan pertanyaan.
4. Kitab sesuai kategori intent.
5. Kutipan tidak terlalu pendek.
6. Kutipan memiliki konteks yang dapat dipahami.

Return top 3 sampai 5 sumber terbaik.

Environment:

```env
MAKTABAH_TOP_SOURCE_LIMIT=5
```

---

## 17. Maktabah Agent Backend Flow

File utama:

```text
src/modules/ki-ai/agents/maktabah-syamilah/maktabah.agent.ts
```

Flow:

```ts
async function handleMaktabahQuestion(input: AgentRouteInput): Promise<AgentRouteResult> {
  // 1. Detect language
  const detectedLanguage = await detectQuestionLanguage(input.message)

  // 2. Normalize question and generate Arabic query
  const normalizedQuery = await normalizeMaktabahQuery({
    question: input.message,
    detectedLanguage
  })

  // 3. Search Maktabah database
  const searchResults = await searchMaktabahDatabase(normalizedQuery)

  // 4. Rank sources
  const rankedSources = rankMaktabahResults(searchResults, normalizedQuery)

  // 5. Build context
  const context = buildMaktabahContext(rankedSources)

  // 6. Generate answer using LLM
  const answer = await generateMaktabahAnswer({
    question: input.message,
    detectedLanguage,
    context,
    sources: rankedSources,
    channel: input.channel
  })

  // 7. Format answer based on channel
  const formattedAnswer = formatAnswerForChannel({
    answer,
    sources: rankedSources,
    channel: input.channel
  })

  // 8. Save chat log to main KI.AI database
  await saveChatLog({
    sessionId: input.sessionId,
    userId: input.userId,
    channel: input.channel,
    agent: 'maktabah_syamilah',
    question: input.message,
    answer: formattedAnswer,
    language: detectedLanguage,
    confidence: calculateConfidence(rankedSources),
    sources: rankedSources
  })

  // 9. Return result
  return {
    success: true,
    agent: 'maktabah_syamilah',
    channel: input.channel,
    language: detectedLanguage,
    answer: formattedAnswer,
    sources: rankedSources,
    confidence: calculateConfidence(rankedSources)
  }
}
```

---

## 18. Prompt LLM Maktabah Syamilah

File:

```text
src/modules/ki-ai/agents/maktabah-syamilah/maktabah.prompt.ts
```

Isi prompt:

```ts
export const MAKTABAH_SYSTEM_PROMPT = `
Anda adalah KI.AI Maktabah Syamilah, sub-agent konsultasi Islam yang menjawab berdasarkan referensi kitab dari database Maktabah Syamilah.

Aturan utama:
1. Jawab hanya berdasarkan sumber kitab yang diberikan dalam context.
2. Jangan mengarang nama kitab, penulis, bab, halaman, jilid, atau kutipan.
3. Jika sumber tidak cukup, katakan bahwa referensi belum cukup ditemukan.
4. Gunakan bahasa yang sama dengan bahasa pertanyaan user.
5. Jika user bertanya dalam bahasa Indonesia, jawab dalam bahasa Indonesia.
6. Jika user bertanya dalam bahasa Arab, jawab dalam bahasa Arab.
7. Jika user bertanya dalam bahasa Inggris, jawab dalam bahasa Inggris.
8. Selalu sertakan referensi kitab yang ditemukan.
9. Jika ada teks Arab dari kitab, tampilkan sebagai kutipan.
10. Jelaskan dengan bahasa yang mudah dipahami, sopan, dan tidak terlalu kaku.
11. Jangan memberikan fatwa final untuk kasus sensitif.
12. Jika pertanyaan membutuhkan keputusan fiqih personal, sarankan untuk berkonsultasi kepada ulama atau ahli fiqih terpercaya.
13. Bedakan antara kutipan kitab, penjelasan, dan kesimpulan.
14. Jangan menyebut proses teknis database kepada user.
15. Jangan mengatakan sesuatu berasal dari kitab jika tidak ada di context.
16. Untuk channel WhatsApp, jawaban harus lebih ringkas, rapi, dan mudah dibaca di layar kecil.
17. Untuk channel Web, jawaban boleh lebih lengkap dan referensi dapat dibuat dalam bentuk section.
`
```

---

## 19. Format Jawaban Web

Jika referensi ditemukan:

```md
### Jawaban

[Jawaban utama sesuai bahasa user]

### Referensi Kitab

1. **Kitab:** [Nama Kitab]
   **Penulis:** [Nama Penulis]
   **Bab:** [Nama Bab]
   **Jilid/Halaman:** [Jilid/Halaman jika tersedia]

   **Kutipan:**
   > [Teks Arab dari kitab]

2. **Kitab:** [Nama Kitab]
   **Penulis:** [Nama Penulis]
   **Bab:** [Nama Bab]

   **Kutipan:**
   > [Teks Arab dari kitab]

### Kesimpulan

[Kesimpulan hati-hati berdasarkan sumber]
```

Jika referensi tidak ditemukan:

```md
Saya belum menemukan referensi yang cukup kuat dari database Maktabah Syamilah untuk menjawab pertanyaan ini.

Coba gunakan kata kunci yang lebih spesifik, misalnya:

- nama kitab
- nama bab
- istilah Arab
- tema fiqih, tafsir, hadits, atau aqidah yang ingin dicari
```

---

## 20. Format Jawaban WhatsApp

WhatsApp harus lebih ringkas dan tidak terlalu panjang.

Jika referensi ditemukan:

```text
📚 Maktabah Syamilah

Jawaban:
[Jawaban ringkas sesuai bahasa user]

Referensi:
1. [Nama Kitab]
   Penulis: [Penulis]
   Bab: [Bab]
   Hal: [Jilid/Halaman]

Kutipan:
"[Potongan teks Arab singkat]"

Kesimpulan:
[Kesimpulan pendek]
```

Jika referensi banyak, tampilkan maksimal 3 referensi di WhatsApp.

Jika referensi tidak ditemukan:

```text
📚 Maktabah Syamilah

Saya belum menemukan referensi yang cukup kuat dari database Maktabah Syamilah untuk menjawab pertanyaan ini.

Coba gunakan kata kunci yang lebih spesifik, misalnya nama kitab, nama bab, atau istilah Arabnya.
```

Jika jawaban terlalu panjang, batasi panjang output WhatsApp dan prioritaskan:

1. Jawaban inti.
2. 1 sampai 3 referensi utama.
3. Kesimpulan singkat.

---

## 21. API Design

Gunakan endpoint chat yang sama jika sudah tersedia.

Endpoint:

```http
POST /api/ki-ai/chat
```

Request dari Web:

```json
{
  "message": "Apa hukum shalat berjamaah?",
  "agent": "maktabah_syamilah",
  "channel": "web",
  "sessionId": "optional-session-id"
}
```

Request dari WhatsApp webhook:

```json
{
  "message": "Apa hukum shalat berjamaah?",
  "agent": "maktabah_syamilah",
  "channel": "whatsapp",
  "channelUserId": "628xxxxxxxxxx"
}
```

Response:

```json
{
  "success": true,
  "agent": "maktabah_syamilah",
  "channel": "web",
  "language": "id",
  "answer": "...",
  "sources": [
    {
      "bookTitle": "Nama Kitab",
      "author": "Nama Penulis",
      "chapter": "Nama Bab",
      "page": 123,
      "volume": 1,
      "excerpt": "Teks Arab...",
      "score": 0.87
    }
  ]
}
```

---

## 22. WhatsApp Webhook Design

Jika KI.AI menggunakan WAHA atau WhatsApp HTTP API, webhook harus meneruskan pesan ke agent router.

Contoh flow:

```ts
async function handleIncomingWhatsappMessage(payload: WhatsappWebhookPayload) {
  const from = payload.from
  const text = payload.text

  const commandResult = parseWhatsappCommand(text)

  if (commandResult.type === 'SET_AGENT') {
    await setActiveAgentForChannelUser({
      channel: 'whatsapp',
      channelUserId: from,
      agent: commandResult.agent
    })

    if (!commandResult.question) {
      return sendWhatsappMessage(from, commandResult.replyMessage)
    }
  }

  const activeAgent = commandResult.agent || await getActiveAgentForChannelUser({
    channel: 'whatsapp',
    channelUserId: from
  })

  const result = await routeQuestion({
    message: commandResult.question || text,
    agent: activeAgent,
    channel: 'whatsapp',
    channelUserId: from
  })

  return sendWhatsappMessage(from, result.answer)
}
```

Command parser:

```ts
function parseWhatsappCommand(text: string) {
  const trimmed = text.trim()

  if (trimmed.startsWith('/maktabah')) {
    const question = trimmed.replace('/maktabah', '').trim()
    return {
      type: 'SET_AGENT',
      agent: 'maktabah_syamilah',
      question,
      replyMessage: 'Mode Maktabah Syamilah aktif. Silakan ajukan pertanyaan tentang kitab.'
    }
  }

  if (trimmed.startsWith('/kitab')) {
    const question = trimmed.replace('/kitab', '').trim()
    return {
      type: 'SET_AGENT',
      agent: 'maktabah_syamilah',
      question,
      replyMessage: 'Mode Maktabah Syamilah aktif. Silakan ajukan pertanyaan tentang kitab.'
    }
  }

  if (trimmed.startsWith('/umum') || trimmed.startsWith('/general')) {
    return {
      type: 'SET_AGENT',
      agent: 'general',
      question: '',
      replyMessage: 'Mode KI.AI Umum aktif kembali.'
    }
  }

  return {
    type: 'MESSAGE',
    question: trimmed
  }
}
```

---

## 23. Frontend Web UI Requirement

Tambahkan komponen:

```text
AgentSelector.tsx
```

Data agents:

```ts
const agents = [
  {
    id: 'general',
    name: 'KI.AI Umum',
    description: 'Untuk konsultasi Islam umum dan pertanyaan sehari-hari.'
  },
  {
    id: 'maktabah_syamilah',
    name: 'Maktabah Syamilah',
    description: 'Jawaban berdasarkan referensi kitab dalam database Maktabah Syamilah.'
  }
]
```

UI behavior:

1. Default selected agent = general.
2. Jika user memilih Maktabah Syamilah, tampilkan info box.
3. Kirim selected agent pada setiap request chat.
4. Simpan pilihan agent di local state/session.
5. Tampilkan badge agent di bubble jawaban.
6. Jika response memiliki sources, tampilkan source cards.

---

## 24. UI Copywriting Web

Gunakan copy berikut:

```text
Pilih Model Jawaban
```

```text
KI.AI Umum
Untuk pertanyaan Islam umum dan konsultasi ringan.
```

```text
Maktabah Syamilah
Untuk mencari jawaban dari referensi kitab.
```

```text
Mode Maktabah Syamilah aktif.
KI.AI akan mencari jawaban dari referensi kitab dan menampilkan sumbernya jika tersedia.
```

```text
Tanyakan hukum, tafsir, hadits, atau pembahasan kitab...
```

```text
Referensi Kitab Ditemukan
```

```text
Belum ditemukan referensi yang cukup kuat.
```

---

## 25. UI Reference Card Web

Setiap sumber kitab ditampilkan sebagai card.

Isi card:

1. Nama Kitab
2. Penulis
3. Bab
4. Jilid/Halaman
5. Kutipan Arab
6. Score relevansi optional, hanya untuk admin/debug mode

Contoh tampilan:

```text
Kitab: Fath al-Qarib
Penulis: Ibnu Qasim al-Ghazi
Bab: Kitab ash-Shalah
Jilid/Halaman: -

Kutipan:
[teks Arab]
```

---

## 26. Session Handling

### 26.1 Web

Untuk web, pilihan agent dapat disimpan di:

1. frontend state
2. localStorage
3. ChatSession di database utama

Rekomendasi:

- Untuk guest user: simpan di localStorage dan sessionId.
- Untuk logged-in user: simpan di database ChatSession.

### 26.2 WhatsApp

Untuk WhatsApp, pilihan agent harus disimpan berdasarkan nomor user.

Field:

```text
channel = whatsapp
channelUserId = nomor WhatsApp
activeAgent = maktabah_syamilah atau general
```

Jika user belum pernah memilih agent, default = general.

---

## 27. Guardrail dan Safety

Agent Maktabah Syamilah harus mengikuti batasan berikut:

1. Tidak boleh mengarang sumber kitab.
2. Tidak boleh mengarang kutipan Arab.
3. Tidak boleh mengarang halaman/jilid.
4. Tidak boleh memberikan fatwa final untuk kasus personal yang kompleks.
5. Jika sumber kurang, katakan dengan jujur bahwa referensi belum cukup.
6. Jika ada beberapa pendapat, jelaskan sebagai perbedaan pendapat jika context mendukung.
7. Jika pertanyaan sensitif, arahkan user untuk konsultasi kepada ulama/ustadz terpercaya.
8. Jangan menjawab dengan keyakinan tinggi jika confidence rendah.
9. Jangan menggunakan database KI.AI umum sebagai sumber utama ketika agent Maktabah aktif, kecuali ada konfigurasi hybrid di masa depan.
10. Jangan menampilkan data teknis database kepada user.

---

## 28. Error Handling

### 28.1 Database Maktabah Error

Response web:

```json
{
  "success": false,
  "message": "Database Maktabah Syamilah sedang tidak dapat diakses. Silakan coba beberapa saat lagi."
}
```

Response WhatsApp:

```text
📚 Maktabah Syamilah

Mohon maaf, database Maktabah Syamilah sedang tidak dapat diakses. Silakan coba beberapa saat lagi.
```

### 28.2 Referensi Tidak Ditemukan

Response web:

```text
Saya belum menemukan referensi yang cukup kuat dari database Maktabah Syamilah untuk menjawab pertanyaan ini.
```

Response WhatsApp:

```text
📚 Maktabah Syamilah

Saya belum menemukan referensi yang cukup kuat dari database Maktabah Syamilah untuk menjawab pertanyaan ini.

Coba gunakan istilah Arab atau nama kitab/bab yang lebih spesifik.
```

### 28.3 LLM Error

Jika search berhasil tetapi LLM gagal:

```text
Referensi kitab berhasil ditemukan, tetapi KI.AI belum dapat menyusun jawaban saat ini. Silakan coba kembali.
```

---

## 29. Testing Scenario

### 29.1 Web Chat Testing

Test 1:

```text
Agent: KI.AI Umum
Pertanyaan: Apa hukum shalat berjamaah?
Expected: Diproses oleh agent general.
```

Test 2:

```text
Agent: Maktabah Syamilah
Pertanyaan: Apa hukum shalat berjamaah?
Expected: Diproses oleh Maktabah Agent dan mencari referensi kitab.
```

Test 3:

```text
Agent: Maktabah Syamilah
Pertanyaan: ما حكم صلاة الجماعة؟
Expected: Jawaban dalam bahasa Arab dan referensi kitab Arab.
```

Test 4:

```text
Agent: Maktabah Syamilah
Pertanyaan: What is the ruling on zakat for trade goods?
Expected: Query dinormalisasi ke Arab dan jawaban dalam English.
```

---

### 29.2 WhatsApp Testing

Test 1:

```text
User: /maktabah
Expected: Mode Maktabah aktif.
```

Test 2:

```text
User: Apa hukum shalat berjamaah?
Expected: Diproses oleh Maktabah karena mode sudah aktif.
```

Test 3:

```text
User: /umum
Expected: Mode kembali ke KI.AI Umum.
```

Test 4:

```text
User: /maktabah Apa hukum zakat perdagangan?
Expected: Langsung diproses oleh Maktabah Agent.
```

Test 5:

```text
User: /kitab ما حكم زكاة عروض التجارة؟
Expected: Langsung diproses oleh Maktabah Agent dan dijawab dalam bahasa Arab.
```

---

## 30. Acceptance Criteria

Fitur dianggap selesai jika:

1. Web Chat memiliki pilihan agent/model.
2. User web dapat memilih KI.AI Umum atau Maktabah Syamilah.
3. Request web mengirim field agent.
4. WhatsApp dapat mengaktifkan mode Maktabah dengan command /maktabah.
5. WhatsApp dapat kembali ke mode umum dengan command /umum.
6. WhatsApp dapat bertanya langsung dengan format `/maktabah pertanyaan`.
7. Backend memiliki agent router yang dapat digunakan oleh Web dan WhatsApp.
8. Database Maktabah terpisah dari database utama KI.AI.
9. Chat log tetap tersimpan di database utama KI.AI.
10. Maktabah Agent dapat mendeteksi bahasa Indonesia, Arab, dan Inggris.
11. Query Indonesia/Inggris dapat dinormalisasi ke istilah Arab.
12. Search database Maktabah dapat menghasilkan referensi kitab.
13. Jawaban mengikuti bahasa pertanyaan user.
14. Jawaban web menampilkan referensi dalam bentuk card.
15. Jawaban WhatsApp menampilkan referensi dalam format ringkas.
16. Sistem tidak mengarang referensi jika data tidak ditemukan.
17. Error database ditangani dengan pesan ramah.
18. Fitur KI.AI umum tetap berjalan normal.

---

## 31. Tahapan Implementasi

### Phase 1 - Backend Foundation

1. Buat struktur agent Maktabah Syamilah.
2. Buat koneksi database Maktabah terpisah.
3. Buat agent router.
4. Buat ChatSession activeAgent.
5. Buat repository dasar pencarian kitab.
6. Buat endpoint chat menerima agent dan channel.

### Phase 2 - Web Chat Integration

1. Tambahkan AgentSelector.
2. Tambahkan info box mode Maktabah.
3. Kirim selected agent ke backend.
4. Tampilkan badge agent.
5. Tampilkan source card referensi kitab.

### Phase 3 - WhatsApp Integration

1. Buat WhatsApp command parser.
2. Tambahkan command /maktabah.
3. Tambahkan command /kitab.
4. Tambahkan command /umum.
5. Simpan activeAgent berdasarkan nomor WhatsApp.
6. Format jawaban khusus WhatsApp.

### Phase 4 - Search & Ranking

1. Implement exact search.
2. Implement keyword search.
3. Implement full text search jika memungkinkan.
4. Implement ranking hasil pencarian.
5. Implement fallback query expansion.

### Phase 5 - LLM Answer Generator

1. Buat prompt khusus Maktabah.
2. Build context dari hasil pencarian.
3. Generate jawaban berdasarkan context.
4. Pastikan jawaban sesuai bahasa user.
5. Pastikan tidak ada referensi palsu.

### Phase 6 - Testing & Hardening

1. Test web dengan agent general.
2. Test web dengan agent Maktabah.
3. Test WhatsApp command.
4. Test multi bahasa.
5. Test database error.
6. Test no result.
7. Test long answer WhatsApp.
8. Test chat log.

---

## 32. Catatan Untuk Antigravity

Implementasikan fitur ini dengan prinsip berikut:

1. Jangan mengubah besar-besaran fitur KI.AI yang sudah berjalan.
2. Tambahkan agent Maktabah Syamilah secara modular.
3. Pastikan Web dan WhatsApp memakai agent service yang sama.
4. Pisahkan channel formatting dari agent logic.
5. Pisahkan database utama dan database Maktabah.
6. Jangan membuat sumber kitab palsu.
7. Utamakan implementasi yang stabil dan sederhana terlebih dahulu.
8. Buat kode yang mudah dikembangkan untuk agent lain di masa depan.

Agent masa depan yang mungkin ditambahkan:

1. Agent Fatwa MUI
2. Agent NU Online
3. Agent Tafsir
4. Agent Hadits
5. Agent Fiqih Mazhab
6. Agent K.H. Cholil Nafis

Namun saat ini fokus hanya pada:

```text
Maktabah Syamilah Agent
```

---

## 33. Prompt Eksekusi Singkat Untuk Antigravity

Gunakan instruksi ini sebagai arahan eksekusi:

```text
Implementasikan PRD ini ke project KI.AI saya. Tambahkan sub-agent baru bernama Maktabah Syamilah yang dapat digunakan dari Web Chat dan WhatsApp. Pastikan database Maktabah Syamilah terpisah dari database utama KI.AI. Web harus memiliki agent/model selector. WhatsApp harus dapat mengaktifkan mode Maktabah dengan command /maktabah atau /kitab, dan kembali ke mode umum dengan /umum. Semua channel harus menggunakan agent router yang sama. Jawaban harus berdasarkan referensi kitab dari database Maktabah, mendukung bahasa Indonesia, Arab, dan Inggris, serta menjawab sesuai bahasa pertanyaan user. Jangan merusak agent KI.AI umum yang sudah berjalan.
```

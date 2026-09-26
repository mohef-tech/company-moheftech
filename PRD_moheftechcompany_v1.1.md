# PRD — Mohef Tech Company Profile & Service Catalog

**Versi:** 1.1 (Revisi dari V1)
**Status:** Disepakati, siap masuk tahap development
**Perubahan dari V1:** Lihat Bagian 0.

---

# 0. Ringkasan Perubahan dari V1

Dokumen ini adalah hasil revisi setelah diskusi mendalam. Perubahan utama:

- Model harga diperluas dari 2 jenis menjadi 3 jenis: **Pasti**, **Mulai dari**, **Konsultasi**.
- Satu layanan bisa memiliki **beberapa opsi harga** (varian), bukan satu harga tunggal.
- Software dihargai berdasarkan **tingkat kompleksitas**, bukan jenis aplikasi (karena jenis permintaan client sangat beragam dan tidak bisa diprediksi).
- Setiap layanan punya **link/slug sendiri** dengan preview WhatsApp (Open Graph).
- Ditambahkan **Portfolio ringan** (kartu proyek + link GitHub) sebagai bukti kerja.
- Ditambahkan field **catatan internal** (`internalNote`) yang hanya terlihat admin.
- Section "Harga" di navbar **dihapus** — harga tampil langsung di kartu layanan.
- Data konfigurasi yang tadinya duplikat (Profil/Kontak vs Pengaturan) **digabung jadi satu**.
- Autentikasi admin disederhanakan: **username teks (bukan email) + password ter-hash, disimpan di environment variable**, tanpa tabel admin di database, tanpa fitur ganti password di V1.
- Flag lokasi disederhanakan dari 3 flag jadi teks tetap + 1 saklar peta. `siteStatus` **dihapus**, tidak jelas gunanya.
- Analytics/penghitung klik **tetap tidak ada** di V1 (dikonfirmasi, bukan celah).
- **Auth.js dilepas**, diganti autentikasi custom sederhana (kebutuhan hanya 1 admin, tanpa multi-provider).
- **Hosting dipindah dari Vercel ke Netlify**, karena Vercel Hobby melarang penggunaan komersial sementara Netlify Free mengizinkannya.

---

# 1. Product Overview

**Nama:** Mohef Tech
**Jenis:** Company Profile + Service Catalog + Reference Pricing
**Target:** Website publik, diakses dari desktop dan mobile (mobile-first untuk sisi publik).

### Tujuan

Membuat website yang berfungsi sebagai:

- **Catatan tarif pribadi** pemilik (pengguna utama), sekaligus
- **Etalase yang bisa dikirim ke client** saat ditanya harga layanan,
- dengan potensi tambahan menjaring client baru yang menemukan website secara organik.

Fungsinya bukan untuk menghasilkan traffic pencarian, melainkan **aset konversi**: menjawab pertanyaan harga dengan cepat dan meyakinkan, lalu mengarahkan ke WhatsApp.

### Prioritas Pengguna

1. **Admin (pemilik)** — pengguna paling sering, mengelola dari **laptop**.
2. **Client yang dikirimi link** — sudah bertanya, butuh keyakinan dan angka cepat, akses dari **HP**.
3. **Pengunjung publik yang menemukan sendiri** — bonus, bukan sasaran utama.

---

# 2. Konsep Utama

Harga yang ditampilkan **bukan harga mengikat**, kecuali untuk kategori Hardware yang harganya pasti.

> **Company Profile + Service Catalog + Reference Pricing + WhatsApp Consultation**

---

# 3. Target User

### Public User / Customer

Ingin mengetahui Mohef Tech, mencari layanan, melihat harga referensi, dan berkonsultasi via WhatsApp.

### Admin

Hanya 1 akun, yaitu pemilik. Mengelola semua konten dan harga dari **laptop**, lewat dashboard `/admin`.

---

# 4. Website Structure

One-page website.

**Navbar:**

```text
Home
Layanan
Tentang
Kontak
```

> Catatan: tidak ada section "Harga" tersendiri. Harga tampil langsung pada kartu setiap layanan di section Layanan.

## 4.1 Home

- Logo Mohef Tech
- Nama Mohef Tech
- Tagline: "Solusi IT terbaik untuk Anda"
- Penjelasan singkat
- CTA menuju layanan

Tidak dibuat sepanjang landing page marketing.

## 4.2 Layanan

Daftar layanan dikelompokkan menjadi beberapa **pilar**, bukan daftar datar. Contoh pilar:

```text
Perangkat & Jaringan (Hardware, Networking, CCTV, Printer)
Aplikasi Custom (Software, Development)
Konsultasi & Maintenance
```

Setiap layanan menampilkan:

- Nama layanan
- Kategori/pilar
- Deskripsi singkat
- Harga (dari opsi harga termurah jika lebih dari satu)
- Tombol "Lihat Detail" (**opsional** — hanya muncul jika layanan butuh penjelasan tambahan; layanan yang sudah jelas seperti "Install Ulang Windows" tidak perlu detail)

---

# 5. Pricing System

Setiap layanan memiliki satu atau lebih **opsi harga**. Tiga jenis harga:

### A. Pasti (`FIXED`)

Untuk hardware. Harga sudah tetap, di luar biaya sparepart.

```text
Ganti RAM 4GB — Rp250.000 (jasa, RAM terpisah)
Ganti RAM 8GB — Rp350.000 (jasa, RAM terpisah)
```

### B. Mulai Dari (`STARTING_FROM`)

Untuk layanan software, dipatok berdasarkan **tingkat kompleksitas**, bukan jenis aplikasi:

```text
Sederhana   — Mulai dari Rp X   (1 peran pengguna, fitur minim, tanpa integrasi)
Menengah    — Mulai dari Rp Y   (beberapa peran, laporan, data saling berhubungan)
Kompleks    — Mulai dari Rp Z   (banyak modul, integrasi, migrasi data, onsite/pelatihan)
```

Bisa ditambah **modul tambahan** berharga sendiri (integrasi printer, WhatsApp, multi-cabang, dsb).

### C. Custom / Konsultasi (`CUSTOM`)

Untuk kebutuhan yang benar-benar tidak bisa diperkirakan tanpa diskusi. Tidak menyimpan nominal harga.

Setiap layanan dengan harga menampilkan catatan:

> "Harga dapat menyesuaikan kondisi dan kebutuhan."

**Isi angka tarif (nominal Rp) adalah keputusan bisnis pemilik, diisi terpisah dari proses development, dan bisa diubah kapan saja lewat admin.**

---

# 6. Service Detail Modal

Ditampilkan saat "Lihat Detail" diklik:

```text
Nama Layanan

Deskripsi lengkap.

Opsi harga:
- Opsi 1: RpXXX
- Opsi 2: RpXXX

Catatan:
Harga dapat menyesuaikan kondisi dan kebutuhan.

[ Konsultasi via WhatsApp ]
```

CTA WhatsApp otomatis membuat pesan:

> Mas Hendra, saya ingin konsultasi mengenai [Nama Layanan]. [Tulis kebutuhan atau rencana Anda]

User dapat mengedit bagian kebutuhan/rencana sebelum mengirim.

---

# 7. Service Link & WhatsApp Preview

Setiap layanan memiliki **slug** dan alamat sendiri, contoh:

```text
mohef.tech/layanan/install-ulang-windows
```

Membuka link ini langsung menampilkan modal detail layanan tersebut di atas halaman utama.

Setiap halaman layanan menyertakan **Open Graph metadata** (judul, deskripsi singkat, harga, logo) sehingga saat link dibagikan di WhatsApp, muncul kartu preview yang rapi, bukan sekadar teks URL.

**Kegunaan:** admin bisa mengirim satu link ke client saat ditanya harga, tanpa perlu mengetik ulang detail dan harga secara manual.

---

# 8. Service Search

Input pencarian "Cari layanan..." berdasarkan nama, kategori, dan deskripsi. Tanpa filter kategori di V1.

### Jika ditemukan

Menampilkan layanan yang sesuai.

### Jika tidak ditemukan

```text
Layanan tidak ditemukan.

Tidak menemukan layanan yang sesuai?
Konsultasikan kebutuhan Anda langsung dengan Mohef Tech.

[ Konsultasi via WhatsApp ]
```

---

# 9. Service Categories

Kategori tetap disimpan per layanan untuk kebutuhan pengelolaan data dan dikelompokkan menjadi pilar untuk tampilan publik (lihat §4.2).

Contoh kategori: Hardware, Software, Networking, CCTV, Printer, Maintenance, Development, Lainnya.

---

# 10. WhatsApp Integration

Dua nomor:

- **Nomor utama:** `082336744354`
- **Nomor alternatif:** `085785168163`

Nomor utama menjadi tujuan default.

**Catatan teknis:** nomor harus dinormalisasi ke format internasional (`6282336744354`) saat membentuk link `wa.me`, dan isi pesan wajib di-URL-encode. Ini wajib divalidasi saat implementasi.

CTA WhatsApp digunakan di: detail layanan, section kontak, kondisi layanan tidak ditemukan, dan area relevan lain.

Format pesan default (dapat diubah dari admin):

```text
Mas Hendra, saya ingin konsultasi mengenai [layanan].

[Tulis kebutuhan atau rencana Anda]
```

---

# 11. Contact Section

Menampilkan:

- WhatsApp utama & alternatif
- CTA konsultasi
- Teks "Lokasi & Meeting" (selalu tampil, dapat diedit dari admin):

> Mohef Tech melayani secara fleksibel. Untuk konsultasi atau pengerjaan tertentu, lokasi dapat disepakati terlebih dahulu melalui WhatsApp.

- Google Maps: **satu saklar** (`showGoogleMaps`, default mati). Jika suatu saat memiliki lokasi tetap, admin cukup mengisi URL dan menyalakan saklar — tanpa perubahan kode.

---

# 12. About Section

> Mohef Tech menyediakan berbagai solusi IT yang mencakup kebutuhan hardware dan software, mulai dari maintenance, troubleshooting, upgrade perangkat hingga pengembangan solusi software.

Tetap singkat.

---

# 13. Portfolio

Ditambahkan sebagai bukti kerja, karena pemilik sudah punya rekam jejak proyek nyata (POS kasir, sistem gudang, sistem penjadwalan, chatbot, dll).

Setiap kartu proyek berisi:

- Nama proyek
- Satu kalimat: masalah yang diselesaikan
- Jenis solusi (kasir, gudang, penjadwalan, dsb — bebas teks, tidak dikategorikan kaku)

**Ketentuan:** proyek milik instansi/client (mis. instansi pemerintah) hanya ditampilkan **dengan izin**. Jika belum ada izin atau ragu, ditulis generik (contoh: "Sistem penjadwalan untuk instansi").

Tetap menyertakan akses GitHub:

```text
GitHub
https://github.com/mohef-tech
```

Sistem portfolio yang lebih kompleks (galeri, studi kasus panjang) ditunda ke V2.

---

# 14. Admin Dashboard

Struktur menu (disederhanakan dari V1, data yang tadinya duplikat digabung):

```text
Dashboard
├── Layanan
├── Portfolio
└── Pengaturan
```

Harga dan riwayat harga dikelola di dalam masing-masing layanan (per opsi harga).

Dirancang untuk **desktop/laptop**, tidak perlu mobile-first.

---

# 15. Admin — Layanan

Admin dapat:

- Menambah, mengedit, menghapus, mengaktifkan/nonaktifkan layanan
- Mengubah kategori, deskripsi, dan detail
- Mengelola **opsi harga** (bisa lebih dari satu per layanan): label, jenis harga, nominal (jika ada), catatan
- Mengisi **catatan internal** (`internalNote`) — hanya terlihat di admin, untuk estimasi jam kerja, batas negosiasi, dsb.
- Mengatur urutan tampil (`sortOrder`)

Data layanan:

```text
Nama
Slug
Kategori
Pilar (untuk pengelompokan tampilan)
Deskripsi singkat
Deskripsi/detail
Catatan internal (internalNote) — hanya admin
Status aktif
Urutan tampil (sortOrder)
```

Data opsi harga (relasi ke layanan):

```text
Label (mis. "Ganti RAM 4GB", "Sederhana", "Custom")
Jenis harga (FIXED / STARTING_FROM / CUSTOM)
Nominal (kosong jika CUSTOM)
Catatan
```

---

# 16. Admin — Harga & Price History

Setiap perubahan nominal pada satu opsi harga dicatat otomatis:

```text
Install Windows
Rp100.000 → Rp125.000
24 September 2026
```

Data history minimal: opsi harga terkait, harga sebelumnya, harga baru, waktu perubahan. Pencatatan harga awal saat opsi dibuat juga dicatat sebagai baris pertama.

Jika jenis harga berubah dari `STARTING_FROM`/`FIXED` ke `CUSTOM`, nominal menjadi kosong — `oldPrice`/`newPrice` bersifat nullable.

History hanya dapat dilihat admin.

---

# 17. Admin — Portfolio

Admin dapat menambah, mengedit, menghapus kartu proyek (nama, deskripsi singkat, jenis solusi, status tampil/sembunyi untuk kasus izin belum didapat).

---

# 18. Admin — Pengaturan

**Satu halaman pengaturan** menggantikan Profil + Kontak + Konfigurasi yang tadinya terpisah dan tumpang tindih di V1. Berisi:

```text
Nama bisnis
Tagline
Deskripsi/tentang bisnis

WhatsApp utama
WhatsApp alternatif
Pesan WhatsApp default (template)

GitHub URL

Google Maps URL
Status Google Maps (on/off)

Teks Lokasi & Meeting
```

Tidak ada lagi data yang disimpan di dua tempat berbeda. `siteStatus` **dihapus dari scope** — tidak ada fitur maintenance mode di V1; nonaktifkan layanan individual sudah cukup untuk kebutuhan yang ada.

---

# 19. Authentication

Public: tidak butuh login/registrasi.

Admin:

- **Satu akun**, **username berupa teks biasa** (contoh: `mohammed`), **bukan email**.
- Password disimpan sebagai **hash** (bukan plaintext).
- **Username dan hash password disimpan di environment variable** (konfigurasi server/Netlify), **bukan di tabel database**.
- **Tidak ada fitur ganti password dari dashboard di V1.** Mengganti password dilakukan dengan membuat hash baru dan memperbarui environment variable, lalu deploy ulang.
- Tidak ada: registrasi, multi-user, role management, customer account.

**Implementasi:** autentikasi custom sederhana (bukan Auth.js) — cukup verifikasi username + password ter-hash dan pembuatan sesi login, karena kebutuhan multi-provider dari Auth.js tidak relevan untuk kasus single-admin ini.

---

# 20. Authorization

Semua route `/admin/*` membutuhkan autentikasi.

```text
Public route: /
Admin route: /admin, /admin/services, /admin/services/*, /admin/portfolio, /admin/settings
```

---

# 21. Data Scope V1

```text
Layanan
Opsi Harga
Price History
Portfolio
Pengaturan (Business Profile + Contact + Config, digabung jadi satu)
```

Tidak menyimpan data customer. Tidak ada tabel Admin di database (kredensial di environment variable, lihat §19).

---

# 22. Public Website Requirements

- Bisa diakses desktop & mobile, **mobile-first** untuk sisi publik
- Responsive, ringan, tidak bergantung banyak gambar
- Navigasi one-page (Home, Layanan, Tentang, Kontak)
- Pencarian layanan
- Modal detail layanan (opsional per layanan)
- Link per layanan dengan preview WhatsApp (Open Graph)
- CTA WhatsApp
- Informasi harga (3 jenis: Pasti, Mulai dari, Konsultasi)
- Portfolio ringan + link GitHub
- Google Maps yang dapat diaktifkan/nonaktifkan

---

# 23. Design Direction

### Visual

Modern, minimal, elegant, futuristic, technology-oriented. Tidak terasa seperti template company profile generik.

### Brand

Biru, hitam, logo Mohef Tech. Detail kode warna dan font ditentukan saat masuk tahap desain.

---

# 24. Performance Principle

```text
Lightweight → Fast Loading → Minimal Data → Simple UI → Easy Maintenance
```

Tidak menggunakan: gallery kompleks, image-heavy content, blog, customer account, statistik pengunjung, sistem portfolio kompleks, fitur yang belum dibutuhkan.

**Target terukur** (ditentukan saat implementasi, contoh acuan): Lighthouse mobile ≥ 90, LCP < 2.5 detik.

---

# 25. V1 Feature List

### Public

- [x] Company Profile (one-page)
- [x] Home, Layanan, Tentang, Kontak
- [x] Search layanan
- [x] Service detail modal (opsional per layanan)
- [x] Link per layanan + preview WhatsApp
- [x] Harga: Pasti / Mulai dari / Custom-Konsultasi
- [x] WhatsApp integration (2 nomor)
- [x] Lokasi & Meeting + Google Maps configurable
- [x] Portfolio ringan + GitHub link
- [x] Responsive, mobile-first

### Admin

- [x] Single Admin (username teks + password hash di env)
- [x] Login
- [x] CRUD layanan + opsi harga (multi-opsi per layanan)
- [x] Catatan internal per layanan
- [x] Price history otomatis
- [x] CRUD Portfolio
- [x] Pengaturan tunggal (profil + kontak + konfigurasi)
- [x] Aktif/nonaktif layanan
- [x] Aktif/nonaktif Google Maps

---

# 26. Explicitly Out of Scope V1

- Customer registration/login, multi-admin, role management
- Statistik pengunjung / analytics (dikonfirmasi tetap di luar scope)
- Online payment, booking, order management, invoice, quotation generator
- Marketplace, jual beli produk, blog
- Sistem SaaS/langganan multi-tenant untuk software
- Sistem portfolio kompleks (galeri, studi kasus panjang)
- Chat system selain WhatsApp
- Customer database
- Notification system
- Mobile application (native)
- Fitur ganti password admin dari dashboard
- Maintenance mode / `siteStatus`

Dipertimbangkan di V2 atau versi berikutnya.

---

# 27. Core User Flow

```text
User membuka website
        ↓
      Home
        ↓
   Melihat Layanan (per pilar)
        ↓
Cari layanan / pilih layanan
        ↓
  Lihat Detail Layanan (jika ada)
        ↓
   Melihat Harga Referensi
        ↓
Konsultasi via WhatsApp
```

Alternatif: admin mengirim **link layanan langsung** ke client via WhatsApp → client membuka link → melihat detail & harga → lanjut konsultasi.

Jika layanan tidak ditemukan → CTA konsultasi WhatsApp.

---

# 28. Core Admin Flow

```text
Admin Login (username + password)
    ↓
Dashboard
    ↓
Tambah/Edit Layanan
    ↓
Tambah/Edit Opsi Harga
    ↓
Simpan
    ↓
Price History otomatis tercatat
    ↓
Website publik menggunakan data terbaru
```

---

# 29. V1 Success Criteria

1. Admin dapat menjawab pertanyaan harga client dengan cepat (kirim link, bukan ketik ulang).
2. Pengunjung memahami Mohef Tech tanpa membaca profil panjang.
3. Pengunjung dapat menemukan layanan lewat search dan melihat detail serta harga.
4. Pengunjung memahami harga bukan final (kecuali hardware yang harganya pasti).
5. Pengunjung dapat langsung menghubungi lewat WhatsApp dengan pesan yang sudah terisi.
6. Admin dapat menambah/mengubah layanan dan harga tanpa menyentuh kode.
7. Setiap perubahan harga tercatat di history.
8. Website ringan dan nyaman di HP maupun laptop.
9. Struktur dapat dikembangkan ke V2 tanpa membangun ulang dari awal.

---

# 30. Tech Stack Decision

## 30.1 Architecture Principle

> **Simple, Lightweight, Maintainable, Low-Cost, Free-to-run, Future-Proof**

Modular monolith, satu aplikasi menangani: public website, admin dashboard, API/backend, database, autentikasi.

## 30.2 Final Stack

| Layer | Technology | Catatan |
|---|---|---|
| Frontend | **Next.js + TypeScript** | Public website + Admin dalam satu project |
| UI | **Tailwind CSS** | Styling responsive |
| Backend | **Next.js Server Actions/API** | Business logic |
| Database | **PostgreSQL (managed)** | Persistent data |
| ORM | **Prisma** | Database access + migration |
| Authentication | **Custom (bukan Auth.js)** | Cukup verifikasi username + password hash + sesi, sesuai kebutuhan single-admin |
| Validation | **Zod** | Validasi input server-side |
| Deployment | **Netlify** | Free tier, **mengizinkan penggunaan komersial** (beda dengan Vercel Hobby yang melarang) |
| Source Control | **GitHub** | Repository + version control |

### Alasan perubahan dari draft awal:

- **Vercel Hobby diganti Netlify**: Vercel Hobby secara eksplisit hanya untuk penggunaan non-komersial; website ini menghasilkan lead untuk layanan berbayar sehingga tergolong komersial. Netlify Free mengizinkan penggunaan komersial dan mendukung Next.js secara resmi, sehingga stack lain (Next.js, Prisma, PostgreSQL) tidak perlu berubah.
- **Auth.js dilepas**: kebutuhan hanya satu admin dengan username+password sederhana; Auth.js dirancang untuk multi-provider dan kasus yang lebih kompleks daripada yang dibutuhkan di sini.

> Kebijakan free-tier platform hosting bisa berubah sewaktu-waktu; perlu diverifikasi ulang saat implementasi/deployment.

---

# 31. Frontend & Backend Architecture

```text
Browser
   ↓
Next.js (Public + /admin)
   ↓
Server Logic (Server Actions)
   ↓
Prisma
   ↓
PostgreSQL
```

Satu repository, satu deployment, TypeScript end-to-end.

---

# 32. Database Model

```text
Service
├── id
├── name
├── slug
├── category
├── pillar
├── shortDescription
├── description
├── internalNote        (hanya admin)
├── isActive
├── sortOrder
├── createdAt
└── updatedAt

PriceOption
├── id
├── serviceId
├── label
├── priceType            (FIXED / STARTING_FROM / CUSTOM)
├── price                (nullable, kosong jika CUSTOM)
├── note
├── createdAt
└── updatedAt

PriceHistory
├── id
├── priceOptionId
├── oldPrice             (nullable)
├── newPrice             (nullable)
└── createdAt

Portfolio
├── id
├── title
├── shortDescription
├── solutionType
├── isVisible            (untuk kasus izin client belum didapat)
├── createdAt
└── updatedAt

Settings                 (menggantikan BusinessProfile + Contact + SiteConfig lama, digabung satu tabel/singleton)
├── id
├── businessName
├── tagline
├── aboutDescription
├── primaryWhatsapp
├── secondaryWhatsapp
├── whatsappMessageTemplate
├── githubUrl
├── googleMapsUrl
├── showGoogleMaps
└── locationMeetingText
```

Relasi utama:

```text
Service
   │
   └──< PriceOption
              │
              └──< PriceHistory
```

Satu service dapat memiliki banyak opsi harga; satu opsi harga dapat memiliki banyak history perubahan.

**Tidak ada tabel Admin** — kredensial admin disimpan di environment variable (lihat §19).

---

# 33. Price Type

```text
FIXED           → Harga pasti (hardware). Contoh: "Ganti RAM 4GB — Rp250.000"
STARTING_FROM   → Harga mulai dari (software, per tingkat kompleksitas). Contoh: "Mulai dari Rp3.000.000"
CUSTOM          → Custom / Konsultasi. Tidak menyimpan nominal.
```

---

# 34. Deployment Architecture

```text
                 Internet
                    │
                    ▼
              Domain Mohef Tech
                    │
                    ▼
                 Netlify
                    │
          ┌─────────┴─────────┐
          │                   │
      Public Web          Admin Web
          │                   │
          └─────────┬─────────┘
                    │
                Next.js
                    │
                    ▼
                PostgreSQL (Managed)
```

Tidak bergantung pada home server.

---

# 35. Hosting Principle

- **Application Hosting:** Next.js di Netlify (free tier, penggunaan komersial diizinkan).
- **Database Hosting:** Managed PostgreSQL (kandidat: Supabase, Neon, atau provider lain yang kompatibel dengan Prisma — keputusan final saat setup, perlu cek perilaku "tidur"/cold start pada free tier sebelum memutuskan).
- **Source Code:** GitHub repository.

> Target: tidak ada server fisik yang harus dinyalakan sendiri.

---

# 36. Database Deployment Decision

Database production menggunakan Managed PostgreSQL, bukan database di home server.

Wajib memiliki: connection string via environment variable, backup sesuai kemampuan provider, SSL/TLS, persistent storage, migration lewat Prisma.

Tidak menggunakan: MySQL lokal, PostgreSQL di home server, atau SQLite sebagai production database. SQLite hanya untuk development/testing.

---

# 37. Environment Configuration

Disimpan sebagai environment variable (tidak masuk repository):

```text
DATABASE_URL
ADMIN_USERNAME
ADMIN_PASSWORD_HASH
SESSION_SECRET
```

Konfigurasi publik (WhatsApp, GitHub, Google Maps, dsb.) tetap disimpan di database (tabel `Settings`) agar dapat diubah dari dashboard tanpa deploy ulang.

---

# 38. Domain

Custom domain jika tersedia, contoh: `www.moheftech...`. Domain final ditentukan kemudian, diarahkan ke deployment Netlify.

---

# 39. Responsive Architecture

```text
Mobile → Tablet → Desktop
```

Sisi publik: **mobile-first**, karena mayoritas calon client mengakses dari WhatsApp/mobile browser.
Sisi admin: dirancang untuk **desktop/laptop**.

Tidak membuat aplikasi mobile native di V1.

---

# 40. Search Architecture

```text
User input → Service search → Database/client-side query → Matching services
```

Pencarian berdasarkan nama, kategori, deskripsi. Karena jumlah layanan relatif kecil, tidak butuh search engine eksternal. Pendekatan spesifik (query database vs filter di sisi client) diputuskan saat implementasi berdasarkan trade-off performa dan kesederhanaan.

---

# 41. WhatsApp Architecture

Tidak menggunakan WhatsApp Business API. Menggunakan WhatsApp deep link (`wa.me`).

```text
User → Klik Konsultasi → Generate WhatsApp URL (nomor dinormalisasi + pesan ter-encode) → WhatsApp → Pesan otomatis
```

Pesan menggunakan template dari `Settings.whatsappMessageTemplate`, nama layanan dimasukkan dinamis.

---

# 42. Google Maps Architecture

Tidak perlu embedded map secara default. Cukup menyimpan `googleMapsUrl` dan `showGoogleMaps` di `Settings`. Jika `showGoogleMaps = false`, section peta tidak ditampilkan. Bisa diaktifkan kapan saja dari admin tanpa perubahan kode.

---

# 43. GitHub Architecture

GitHub berfungsi sebagai repository source code dan link portfolio publik. URL disimpan di `Settings` agar dapat diubah dari dashboard.

---

# 44. Repository Structure

```text
mohef-tech/
│
├── app/
│   ├── (public)/
│   ├── admin/
│   ├── api/
│   └── ...
│
├── components/
│   ├── public/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── db/
│   ├── auth/
│   ├── whatsapp/
│   └── validation/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── logo/
│
├── types/
│
├── tests/
│
└── ...
```

Struktur final dapat disesuaikan selama development.

---

# 45. Architecture Boundary

V1 **tidak menggunakan**: Microservices, Redis, Kubernetes, Docker orchestration, dedicated backend server, dedicated frontend app, message queue, external search engine, CMS/Headless CMS, file storage khusus, analytics platform, native mobile app.

Dipertimbangkan hanya jika kebutuhan aktual muncul.

---

# 46. Future Expansion

```text
V1
Company Profile + Service Catalog + Pricing (Fixed/Starting-from/Custom) + Portfolio + WhatsApp
     ↓
V2
Product / Jual Beli, Portfolio lengkap, Testimonial, Customer/Lead, Quotation, Booking,
Fitur ganti password admin, Analytics/penghitung klik WhatsApp
     ↓
Future
CRM, Order Management, Invoice, Payment, SaaS multi-tenant (jika ada produk yang matang untuk itu)
```

Penambahan fitur tidak boleh mengharuskan perubahan total terhadap struktur aplikasi.

---

# 47. Technical Definition of Done

V1 selesai apabila:

- Public website dapat diakses melalui domain, responsive, mobile-first.
- Admin dapat login (username + password).
- Admin dapat CRUD layanan dan opsi harga (multi-opsi per layanan).
- Catatan internal tersimpan dan hanya terlihat admin.
- Price history tercatat otomatis per opsi harga.
- Admin dapat mengubah Pengaturan (satu halaman terpadu).
- Admin dapat CRUD Portfolio.
- WhatsApp CTA menghasilkan pesan yang benar (nomor ter-normalisasi, pesan ter-encode).
- Setiap layanan memiliki link sendiri dengan preview Open Graph yang benar saat dibagikan di WhatsApp.
- Google Maps dapat diaktifkan/nonaktifkan dari admin.
- Search layanan berjalan, termasuk empty state dengan CTA WhatsApp.
- Data tersimpan di PostgreSQL managed.
- Credential admin (username, password hash) tidak berada di source code atau database, hanya di environment variable.
- Deployment tidak bergantung pada home server, berjalan di free tier yang mengizinkan penggunaan komersial.
- Source code berada di GitHub.
- Tidak ada fitur V2 yang dipaksakan masuk V1.

---

# 48. Architecture Decision Summary

**Stack:**
> Next.js + TypeScript + Tailwind CSS + Prisma + PostgreSQL (managed) + Custom Auth + Netlify + GitHub

**Architecture:** Modular Monolith
**Deployment:** Cloud-hosted, free tier, tanpa home server
**Application Hosting:** Netlify (bukan Vercel — soal lisensi komersial)
**Production Database:** Managed PostgreSQL
**Database Provider Candidates:** Supabase / Neon / provider lain kompatibel Prisma (perlu cek perilaku cold-start sebelum final)
**Authentication:** Single Admin, username teks + password hash di environment variable, custom (bukan Auth.js)
**Communication:** WhatsApp Deep Link
**Maps:** Configurable Google Maps link, satu saklar
**Search:** Database/client-side search, tanpa external search engine
**Pricing Model:** 3 jenis (Fixed / Starting-from berbasis kompleksitas / Custom), multi-opsi per layanan
**Portfolio:** Kartu proyek ringan + GitHub link, dengan aturan izin untuk proyek client

**Primary principle:**
> Jangan membangun infrastruktur untuk masalah yang belum dimiliki Mohef Tech.

---

# 49. Open Items (Bukan Blocker Development, Diisi Berjalan)

Hal berikut adalah keputusan bisnis pemilik, bukan keputusan teknis, dan bisa diisi kapan saja tanpa menghambat development:

- Nominal tarif untuk tiap layanan hardware dan tiap tingkat kompleksitas software.
- Isi lengkap layanan (nama, deskripsi, kategori) untuk seluruh katalog awal.
- Teks final About/Tentang dan tagline (jika ingin diubah dari draft).
- Aset logo dan referensi warna brand yang presisi.
- Izin penampilan nama proyek client tertentu di Portfolio.
- Konten kartu Portfolio (proyek mana saja yang ditampilkan, dan deskripsinya).

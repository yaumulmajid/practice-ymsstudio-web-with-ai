# CMS (Payload)

Semua konten website dikelola lewat panel admin dengan login **email + password** (sama seperti website Woodnest):

- Production: **https://ymsstudio.id/admin**
- Lokal: `npm run dev` → http://localhost:3000/admin

Konten yang bisa diedit: Halaman Utama (hero, karya, layanan, review, harga, FAQ, CTA, footer), Portfolio, Review Klien, Blog, Media, serta Pengaturan Situs (kontak, sosial media, pesan WhatsApp, SEO). Setiap teks punya kolom **ID** dan **EN** berdampingan. Kolom EN boleh dikosongkan, dan website akan memakai teks Indonesia.

Perubahan langsung tampil di website setelah klik **Save**, tanpa deploy ulang.

## Login pertama (production)

Saat deploy pertama, workflow membuat akun admin otomatis. Email dan passwordnya tersimpan di VPS:

```bash
grep ADMIN_ /var/www/ymsstudio/.env
```

- `ADMIN_EMAIL`: default `admin@ymsstudio.id`. Bisa diganti sebelum deploy pertama lewat GitHub secret `CMS_ADMIN_EMAIL`.
- `ADMIN_PASSWORD`: dibuat acak.

Setelah login, ganti email dan password lewat menu **Pengguna → akun Anda**. Variabel `ADMIN_*` hanya dipakai saat database belum punya pengguna, jadi mengganti password di admin aman.

Tambah pengguna lain lewat **Pengguna → Create New**:

- **Admin**: akses penuh.
- **Editor**: semua konten, kecuali mengelola pengguna.

## Cara kerja di production

| Komponen | Keterangan |
|---|---|
| `app` | Next.js + Payload (image dari GHCR), port `127.0.0.1:3000` di belakang nginx |
| `postgres` | PostgreSQL 16, data di volume `pgdata` |
| Upload gambar | Volume `media` (`/data/media` di container) |
| Secrets | `/var/www/ymsstudio/.env`: `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (dibuat otomatis saat deploy pertama, tidak pernah ditimpa) |

- Halaman dirender saat pertama diakses lalu di-cache. Klik Save di CMS memperbarui cache.
- Migrasi database berjalan otomatis saat container start. Pada deploy pertama, migrasi juga mengisi konten awal: teks halaman, 6 project, dan 3 artikel blog.

### Batas upload nginx

Nginx default menolak upload di atas 1 MB. Supaya upload gambar dari admin tidak gagal ("413 Request Entity Too Large"), tambahkan baris ini di blok `server { ... }` ymsstudio.id (misalnya di `/etc/nginx/sites-available/ymsstudio`), lalu reload nginx:

```nginx
client_max_body_size 10M;   # upload gambar di /admin
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Backup

```bash
cd /var/www/ymsstudio
docker compose exec -T postgres pg_dump -U ymsstudio ymsstudio | gzip > backup-$(date +%F).sql.gz
docker run --rm -v ymsstudio_media:/m -v "$PWD":/b alpine tar czf /b/media-$(date +%F).tgz -C /m .
```

## Development lokal

1. Siapkan PostgreSQL, lalu buat `.env.local`:
   ```
   DATABASE_URL=postgres://user:pass@127.0.0.1:5432/ymsstudio
   PAYLOAD_SECRET=string-acak-panjang
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=password-minimal-10
   ```
2. `npm run dev` → buka http://localhost:3000/admin.

## Mengubah skema (developer)

Setelah menambah atau mengubah field di `payload/collections`, `payload/globals`, atau `payload.config.ts`:

```bash
npm run migrate:create -- nama-perubahan   # buat file migrasi di /migrations
npm run generate:types                     # perbarui payload-types.ts
npm run generate:importmap                 # bila menambah komponen admin
```

Commit file migrasinya. Production menjalankannya otomatis saat deploy.

## Brief Proyek (leads)

Setiap brief dari form `/kontak` masuk ke **Masuk → Brief Proyek**:

- **Status**: Baru → Sudah dihubungi → Penawaran dikirim → Deal / Batal. Daftar bisa difilter per status.
- **Sumber**: `utm_source` / `utm_medium` / `utm_campaign`, situs asal (mis. google.com), dan halaman pertama yang dibuka. Diambil dari kunjungan pemasaran terakhir (maks. 90 hari). Klik Google Ads tanpa UTM tercatat sebagai `google / cpc`.
  Pakai tautan dengan UTM di bio Instagram atau iklan, mis. `https://ymsstudio.id/?utm_source=instagram&utm_medium=bio`.
- **Jawaban kalkulator biaya**: terisi bila calon klien datang dari tombol "Isi brief lengkap" di kalkulator.
- **Catatan internal**: hanya terlihat di CMS.

## Tes end-to-end

```bash
npm run build && npm run test:e2e          # menjalankan server production lokal (butuh database)
BASE_URL=https://ymsstudio.id npm run test:e2e   # cek situs live (hanya membaca)
E2E_WRITE=1 npm run test:e2e               # termasuk mengirim brief sungguhan (menulis ke database)
```

# CMS (Keystatic)

Semua konten website — hero, portfolio, layanan, harga, FAQ, review, footer, pesan WhatsApp, SEO, dan **blog** — bisa diedit lewat panel admin di:

- Production: **https://ymsstudio.id/keystatic**
- Lokal: `npm run dev` → http://127.0.0.1:3000/keystatic

Konten disimpan sebagai file di folder [`/content`](../content) dan gambar di `public/images/`. Tidak ada database.

## Cara kerja

| Lingkungan | Saat klik **Save** |
|---|---|
| Lokal (`npm run dev`) | File di `/content` langsung berubah. Commit & push seperti biasa. |
| Production | Keystatic membuat commit ke branch `main` di GitHub → workflow **Deploy** berjalan → website terupdate **±2–3 menit** kemudian. |

Hanya akun GitHub yang punya akses tulis ke repo ini yang bisa login ke CMS production.

## Setup sekali saja: GitHub App untuk CMS production

Sebelum setup ini selesai, `/keystatic` di production menampilkan "CMS belum dikonfigurasi". Website tetap berjalan normal.

### 1. Buat GitHub App

GitHub → **Settings → Developer settings → GitHub Apps → New GitHub App**

- **GitHub App name**: mis. `ymsstudio-cms` (ini jadi *slug* app)
- **Homepage URL**: `https://ymsstudio.id`
- **Callback URL** (tambahkan keduanya):
  - `https://ymsstudio.id/api/keystatic/github/oauth/callback`
  - `http://127.0.0.1:3000/api/keystatic/github/oauth/callback`
- ✅ **Expire user authorization tokens**
- ⬜ Request user authorization (OAuth) during installation — biarkan kosong
- **Webhook**: matikan (hapus centang *Active*)
- **Repository permissions**:
  - Contents: **Read and write**
  - Metadata: **Read-only**
  - Pull requests: **Read and write**
- **Where can this GitHub App be installed?** Only on this account

Klik **Create GitHub App**, lalu:

1. Catat **Client ID**.
2. Klik **Generate a new client secret** dan catat secret-nya.
3. Menu **Install App** → install ke repo `practice-ymsstudio-web-with-ai`.

### 2. Isi GitHub Secrets & Variables

Repo → **Settings → Secrets and variables → Actions**

**Secrets** (tab *Secrets*):

| Nama | Isi |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | Client ID dari langkah 1 |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Client secret dari langkah 1 |
| `KEYSTATIC_SECRET` | String acak panjang, buat dengan `openssl rand -hex 32` |

**Variables** (tab *Variables*):

| Nama | Isi |
|---|---|
| `KEYSTATIC_GITHUB_APP_SLUG` | Slug app, mis. `ymsstudio-cms` (lihat URL halaman app: `github.com/apps/<slug>`) |

### 3. Deploy ulang

**Actions → Deploy → Run workflow**. Workflow akan:

- memasukkan slug app ke build image, dan
- menulis tiga secret di atas ke `/var/www/ymsstudio/.env` di VPS (dibaca oleh `docker compose`).

Setelah selesai, buka https://ymsstudio.id/keystatic → **Log in with GitHub**.

## Tips mengedit

- **Portfolio**: centang *Tampilkan di Hero* untuk project yang ingin muncul di showcase paling atas. *Urutan* menentukan posisi.
- **Review klien**: hanya review asli dengan izin klien. Section Review otomatis muncul begitu ada minimal satu review. Urutan 1 = kartu besar.
- **Blog**: buat artikel di *Blog — Indonesia* dan *Blog — English* dengan **slug yang sama** agar tombol ID/EN saling terhubung. Centang *Draft* untuk menyembunyikan artikel.
- **Pesan WhatsApp paket**: gunakan `{paket}` dan `{harga}`, mis. `Saya tertarik paket {paket} (mulai Rp {harga})`.
- Label kecil antarmuka (menu, "Baca artikel", dll.) ada di `lib/i18n.ts`, bukan di CMS.

## Catatan teknis

- Skema CMS: [`keystatic.config.ts`](../keystatic.config.ts). Loader konten: [`lib/content.ts`](../lib/content.ts).
- Semua halaman dibuat statis saat build. Perubahan konten selalu lewat build + deploy baru, sehingga website tetap cepat.
- Route API (`app/api/keystatic`) memaksa URL publik `https://ymsstudio.id` untuk callback OAuth karena app berjalan di belakang nginx. Ganti lewat env `SITE_URL` bila domain berubah.
- Untuk mencoba mode GitHub di lokal: `NEXT_PUBLIC_KEYSTATIC_MODE=github npm run dev` (butuh variabel di `.env.local`).

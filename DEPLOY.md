# Deploy ke Vercel - Panduan Lengkap

## Persiapan
1. **Akun GitHub**: Pastikan kamu punya akun di [github.com](https://github.com)
2. **Akun Vercel**: Daftar di [vercel.com](https://vercel.com) (bisa pakai akun GitHub)

## Langkah 1: Upload ke GitHub

### A. Buat Repository Baru di GitHub
1. Buka [github.com/new](https://github.com/new)
2. **Repository name**: `portfolio-zalsabilah` (atau nama lain yang kamu mau)
3. **Visibility**: Public
4. **JANGAN** centang "Add a README file"
5. Klik **Create repository**

### B. Upload Kode dari Komputer
Jalankan command berikut di terminal (satu per satu):

```bash
# 1. Inisialisasi Git
git init

# 2. Tambahkan semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit - Portfolio website"

# 4. Hubungkan ke GitHub (ganti USERNAME dan REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 5. Push ke GitHub
git branch -M main
git push -u origin main
```

**Contoh untuk kamu:**
```bash
git remote add origin https://github.com/zalsabilamelia/portfolio-zalsabilah.git
```

## Langkah 2: Deploy di Vercel

1. **Login ke Vercel**: Buka [vercel.com](https://vercel.com) dan login dengan GitHub
2. **Import Project**: 
   - Klik **Add New** → **Project**
   - Pilih repository `portfolio-zalsabilah`
3. **Configure Project**:
   - **Framework Preset**: Next.js (otomatis terdeteksi)
   - **Root Directory**: `./`
   - Klik **Deploy**
4. **Tunggu**: Proses deploy sekitar 1-2 menit
5. **Selesai!**: Kamu akan dapat link seperti `portfolio-zalsabilah.vercel.app`

## Langkah 3: Custom Domain (Opsional)

Untuk mendapatkan `zalsabilahrezky.vercel.app`:
1. Di dashboard Vercel, buka project kamu
2. Klik **Settings** → **Domains**
3. Klik **Edit** pada domain yang ada
4. Ganti menjadi `zalsabilahrezky`
5. Klik **Save**

## Tips
- Setiap kali kamu `git push` ke GitHub, Vercel otomatis deploy ulang
- Link Vercel bisa langsung dibagikan ke siapa saja

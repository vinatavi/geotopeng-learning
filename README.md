# GEOTOPENG

> **Website Pembelajaran Interaktif Berbasis Gamifikasi dengan Pendekatan Discovery Learning untuk Meningkatkan Pemahaman Transformasi Geometri Melalui Kearifan Lokal Topeng Malangan**

---

### Tentang Proyek
**GEOTOPENG** adalah media pembelajaran berbasis web yang menggabungkan konsep matematis **Transformasi Geometri** (Translasi, Refleksi, Rotasi, dan Dilatasi) dengan **Etnomatematika Topeng Malangan**. Diperkaya dengan elemen **Gamifikasi** dan metode **Discovery Learning** untuk memberikan pengalaman belajar yang interaktif dan kontekstual.

---

### Fitur Utama
* **Eksplorasi Etnomatematika:** Visualisasi transformasi geometri menggunakan motif dan karakter Topeng Malangan.
* **Modul Discovery Learning:** Alur belajar berbasis penemuan konsep secara mandiri.
* **Elemen Gamifikasi:** Kuis interaktif, sistem poin/badge, dan tantangan di setiap level.
* **Audio Aksesibel:** Narasi Bahasa Indonesia, kontrol volume, dan efek suara tombol/hasil kuis tanpa autoplay.

---

### Teknologi yang Digunakan
* **Frontend:** HTML5, CSS3, JavaScript
* **Visual/Animasi:** Canvas API / SVG

---

### Cara Menjalankan secara Lokal
1. Ekstrak seluruh isi ZIP ke satu folder. Jangan memisahkan `index.html`, `style.css`, dan `script.js`.
2. Klik dua kali `index.html`, lalu buka dengan Chrome atau Microsoft Edge.
3. Tekan ikon **suara** di kanan atas untuk membuka narasi halaman dan pengaturan volume.
4. Jika browser membatasi fitur saat dibuka langsung, jalankan server lokal dari folder proyek:

   ```bash
   python -m http.server 8000
   ```

   Setelah itu buka `http://localhost:8000`.

### Catatan Audio
* Narasi memakai Web Speech API dan memilih suara `id-ID` jika tersedia di perangkat.
* Browser sengaja tidak memutar suara otomatis. Pengguna harus menekan **Dengarkan halaman**.
* Ketersediaan dan karakter suara mengikuti sistem operasi/browser pengguna.

### Struktur Berkas

```text
GEOTOPENG/
├── index.html
├── style.css
├── script.js
├── og-image.png
└── README.md
```

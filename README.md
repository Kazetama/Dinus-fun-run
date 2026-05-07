# 🏃‍♂️ Jump Battle Race | Premium Edition

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PySide6](https://img.shields.io/badge/PySide6-GUI-41CD52?style=for-the-badge&logo=qt&logoColor=white)](https://doc.qt.io/qtforpython/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Pose_Detection-00A4E4?style=for-the-badge&logo=ultralytics&logoColor=white)](https://github.com/ultralytics/ultralytics)

**Jump Battle Race** adalah aplikasi permainan interaktif berbasis Computer Vision yang menggunakan deteksi pose real-time untuk mendeteksi lompatan pemain. Bersainglah dengan teman dalam balapan seru di mana kecepatan lompatanmu menentukan kemenangan!

---

## ✨ Fitur Utama

- **🤖 Real-time Pose Detection**: Menggunakan model YOLOv8-Pose yang ringan dan sangat akurat.
- **👥 Multi-player Battle**: Mendukung balapan dua pemain (Layar terpisah kiri & kanan).
- **🎨 Premium UI/UX**: Antarmuka modern dengan Dark Mode, Glassmorphism, dan animasi halus.
- **🏃‍♂️ Animated Progress Bar**: Indikator lari interaktif menggunakan animasi video (.webm) dengan background transparan.
- **🔊 Audio Feedback**: Efek suara dinamis saat mulai (GO), melompat, dan saat menang.
- **🎥 Adaptive Display**: Fitur Full-screen tanpa black bars yang tetap mempertahankan akurasi tracking.

---

## 🛠️ Tech Stack

- **Core Engine**: Python 3
- **GUI Framework**: PySide6 (Qt for Python)
- **Computer Vision**: OpenCV
- **AI Model**: Ultralytics YOLOv8 (Pose Estimation)
- **Inference Hardware**: Mendukung NVIDIA CUDA (GPU) atau CPU secara otomatis.

---

## 🚀 Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan project di perangkat lokal Anda:

### 1. Clone Repository
```bash
git clone https://github.com/Kazetama/Dinus-fun-run.git
cd Dinus-fun-run
```

### 2. Buat Virtual Environment (Direkomendasikan)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependensi
```bash
pip install -r requirements.txt
```

---

## 🎮 Cara Menjalankan

Setelah semua dependensi terinstall, jalankan aplikasi dengan perintah:

```bash
python run.py
```

### Tips Bermain:
1. Pastikan seluruh tubuh (terutama kaki/mata kaki) terlihat di kamera.
2. Pastikan pencahayaan ruangan cukup baik agar AI dapat mendeteksi pose dengan stabil.
3. Lompatlah setinggi mungkin (minimal 40 pixel di layar) untuk mendapatkan poin!

---

## 📁 Struktur Folder

```text
funjump/
├── assets/
│   ├── audio/         # Efek suara (wav)
│   └── images/        # Aset gambar & animasi (.png, .webm)
├── models/            # Model YOLOv8-Pose (.pt)
├── src/
│   └── main.py        # Logika utama aplikasi & UI
├── run.py             # Entry point aplikasi
└── requirements.txt   # Daftar library yang dibutuhkan
```

---

## 📝 Catatan
Aplikasi ini secara otomatis mendeteksi ketersediaan GPU NVIDIA (CUDA). Jika tidak ditemukan, aplikasi akan berjalan menggunakan CPU. Untuk performa terbaik (FPS tinggi), disarankan menggunakan GPU.

---

**Dibuat dengan ❤️ untuk Dinus Fun Run.**

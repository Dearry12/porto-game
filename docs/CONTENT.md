# KONTEN — Proyek, Pengalaman, Keahlian

Teks final berbahasa Indonesia untuk `content/projects.ts`, `content/about.ts`, dan `content/skills.ts`.
Salin verbatim. Semua angka sudah terverifikasi dari CV dan portfolio Academy.

---

## Identitas

**Nama** Derry Meiraldy
**Peran** Mobile & Web Developer · Peminat Game Development
**Lokasi** Pontianak, Indonesia (bersedia relokasi)
**Email** derry.reisen@gmail.com
**Telepon** +62 878-8794-9083
**GitHub** github.com/Dearry12
**LinkedIn** linkedin.com/in/derrymeiraldy

### Blurb hub (di bawah kaskade menu)

> Saya membangun produk digital dengan memanfaatkan teknologi yang sudah disediakan platform, bukan menyusun algoritma dari nol. Logika yang bisa salah selalu saya pisahkan ke modul murni yang bisa diuji tanpa layar.

---

## Proyek

Urutan di grid mengikuti kekuatannya, bukan kronologi.

### 01 · Patungan
**iOS · 2026 · Individu, inisiatif pribadi · Berfungsi penuh**
SwiftUI · SwiftData · Vision · VisionKit · Swift Charts
`github.com/Dearry12/patungan`

Membagi satu tagihan untuk empat orang tanpa ada yang perlu berhitung di meja makan.

Buat event, tarik peserta langsung dari Contacts, lalu pindai struk atau ketik manual. Tiap item ditugaskan ke pemesannya, pajak dan biaya layanan dibagi proporsional, dan aplikasi menyelesaikan semuanya jadi daftar transfer paling ringkas: bukan siapa berutang berapa secara abstrak, tapi pembayaran persis yang harus dikirim.

Dibangun sepenuhnya di atas framework Apple, tanpa satu pun dependensi pihak ketiga. Sebagian disiplin, sebagian memang tujuannya: saya ingin tahu apa yang sebenarnya sudah diberikan platform sebelum meraih paket orang lain.

Bagian yang paling saya banggakan justru tak terlihat. Bagi 43.500 untuk tiga orang, hasilnya rapi. Bagi kebanyakan total nyata, dan jumlah pembulatannya tidak kembali ke angka yang dibayar. Selisihnya satu rupiah dan tidak ada yang akan sadar, tapi buku besarnya jadi salah, dan aplikasi pembagi tagihan yang tidak seimbang bukan aplikasi pembagi tagihan. Metode largest remainder menyelesaikannya: semua dibulatkan ke bawah, sisa rupiahnya diberikan ke orang yang paling dirugikan pembulatan.

Ini aplikasi Swift pertama saya. Saya sengaja memilih masalah yang sudah saya pahami supaya kesulitannya ada di bahasanya, bukan di domainnya.

---

### 02 · DomPet
**Flutter · 2026 · Skripsi individu · Selesai**
Flutter · Firebase · Google ML Kit · Speech-to-Text
`github.com/Dearry12/dompet_app`

Aplikasi keuangan yang membuat pencatatan manual cukup cepat untuk diteruskan.

Membayar dengan sekali ketuk menghilangkan gesekan dari pengeluaran, dan menghilangkan rasa sakit membayar bersamanya. Menulis setiap pengeluaran memang memulihkan kesadaran itu, masalahnya hampir tidak ada yang bertahan melakukannya karena mengetik hal yang sama berulang-ulang itu membosankan.

Jadi pencatatan manual saya pertahankan, dan yang saya serang justru kebosanannya. Dua fitur AI memangkas usaha mencatat, dan satu lapisan perilaku memberi alasan untuk kembali besok. Tanpa sinkronisasi rekening, disengaja: aplikasi tidak pernah menyimpan kredensial atau riwayat transaksi yang tidak dibutuhkannya, dan kedua model berjalan on-device sehingga foto struk dan rekaman suara tidak pernah keluar dari ponsel.

Hasil: akurasi OCR 83,33% pada 30 struk nyata (100% pada cetakan jelas, 66,67% pada cahaya rendah), pemrosesan suara bahasa Indonesia 100% dari 22 kalimat uji, skor User Acceptance Test 88,22% (397/450), 85 unit test lulus untuk 15 fitur, nol temuan analisis statis.

Kalibrasi OCR adalah pertarungan terpanjang di proyek ini. Struk itu masukan yang bermusuhan: kertas termal pudar, lipatan tepat di baris total, silau, cahaya rendah. Satu perbaikan yang menolong satu kondisi diam-diam merusak kondisi lain, dan marginnya tidak memaafkan — membaca 27.300 alih-alih 27.800 itu jawaban salah, bukan jawaban yang mendekati. Saya berhenti mengejar satu pass sempurna dan mulai menguji terhadap lima kategori struk buruk yang disengaja. Alih-alih menyembunyikan celahnya, aplikasi menampilkan skor keyakinannya sendiri dan membiarkan pengguna mengoreksi.

Yang saya pelajari: sebuah fitur tidak jadi murah hanya karena kedengarannya sederhana. Harganya adalah waktu yang dibutuhkan untuk memahaminya dengan benar, dan seluruh bagian lain dari build itu yang membayar tagihannya.

---

### 03 · Lantang
**iOS · 2026 · Individu, inisiatif pribadi · Paket inti selesai, 11 test lulus**
SpeechAnalyzer · Foundation Models · SwiftData · Swift Charts
`github.com/Dearry12/Lantang`

Pelatih public speaking yang mendengarkan dalam bahasa Indonesia, dan mengatakan satu hal yang berguna, bukan empat puluh.

Berlatih sendirian tidak memberi umpan balik sama sekali. Merekam diri lalu menontonnya melelahkan dan tidak terfokus, jadi kebanyakan orang mencoba sekali lalu berhenti. Dan aplikasi yang ada dibangun untuk bahasa Inggris, artinya mereka salah membaca cara bahasa Indonesia sebenarnya terdengar.

Bagian terakhir itu lebih berat dari kelihatannya. Kata pengisi kita — *jadi*, *kayak*, *nah* — sebagian besar adalah kata sungguhan yang sedang melakukan pekerjaan sungguhan di kalimat biasa. Cocokkan dengan daftar kata dan kamu akan menuduh pembicara terus-menerus, dan keliru.

Aturan yang dipaksakan arsitekturnya: **model bahasa tidak pernah diminta menghitung apa pun.** Setiap angka keluar dari kode deterministik, karena model bahasa tidak bisa diandalkan untuk aritmetika dan saya tidak mau tahu itu dari pengguna. Kerjanya terbagi tiga. `LantangCore` adalah paket Swift murni tanpa dependensi UI: lapis satu mengukur, lapis dua memilih satu kekuatan dan satu fokus dari semua yang terukur. Baru lapis tiga, Foundation Models on-device, mengubah putusan itu jadi kalimat yang mau dibaca orang.

Posisinya sekarang: `LantangCore` sudah ada dengan 11 unit test lulus. Semua di atas core sudah dirancang dan didokumentasikan tapi belum dibangun. Saya sedang menjawab pertanyaan paling berisiko sebelum menulis satu detektor pun — apakah `SpeechTranscriber` mendukung locale `id-ID`, dan apakah bunyi non-leksikal seperti "eee" bertahan di transkrip atau dibuang sebagai derau. Jawaban itu menentukan saya butuh satu jalur analisis atau dua.

*Lantang* berarti berbicara jelas dan terdengar. Bukan keras, tapi yakin. Ada ironi yang saya suka di situ: aplikasi bernama Lantang menghabiskan banyak waktunya mengajarkan nilai keheningan.

---

### 04 · StepOut
**iOS · 2026 · Individu · Repo publik**
SpriteKit · Swift Package
`github.com/Dearry12/StepOut`

Roguelite dengan inti permainan yang tidak tahu apa-apa soal cara dirinya digambar.

`StepOutCore` adalah Swift Package headless dengan nol import SpriteKit. Kontraknya `resolve(state, action) -> (RunState, [BattleEvent])`: masuk keadaan dan aksi, keluar keadaan baru beserta aliran peristiwa. Lapisan tampilan hanya membaca aliran itu.

RNG SplitMix64 dengan benih eksplisit yang jadi bagian dari keadaan permainan, sehingga benih yang sama menghasilkan run yang sama persis. Penjadwal giliran memakai tick accumulator, aritmetika bilangan bulat murni tanpa waktu nyata, jadi urutannya identik di perangkat mana pun.

Enam tipe musuh, 15 upgrade di empat jalur build: Venom, Riposte, Brink, dan Tempo.

Penyeimbangannya tidak dilakukan dengan memainkannya berulang kali. Ada harness yang menjalankan 2.000 run tersimulasi tanpa membuka jendela permainan, dan temuannya bukan sekadar angka menang-kalah tapi hal struktural: jalur mana yang runtuh di ronde berapa, upgrade mana yang tidak pernah dipilih. Semuanya tercatat di `BALANCING.md`.

---

### 05 · Pivot
**Web · 2026 · Kelompok bertiga, peran programmer frontend · Juara 3 nasional**
Nuxt · Vue · Vercel
`pivot-id.vercel.app` · `github.com/uneeddeveloper/Pivot.id`

Platform pemulihan finansial yang dibangun di sekitar satu angka: penghasilan yang benar-benar kamu butuhkan.

Orang yang sedang kesulitan keuangan disuruh berhemat, disuruh menambah keterampilan, disuruh melamar. Tiap bagian hidup di aplikasi berbeda dan tidak ada yang saling bicara. Alat anggaran menunjukkan apa yang kamu keluarkan tapi tidak pernah berapa yang perlu kamu hasilkan. Yang tersisa: orang itu harus jadi ahli strategi bagi dirinya sendiri, tepat di saat kapasitasnya paling rendah.

Mulai dari satu angka. Biaya hidup ditambah kewajiban utang menghasilkan **Target Income**, angka bulanan yang mengembalikan seseorang ke pijakan stabil. Semua di bawahnya disaring lewat angka itu: peran yang bayarannya cukup, keterampilan yang dibutuhkan peran itu, peta jalan 14–30 hari dari sumber gratis, CV siap ATS, lowongan yang disaring terhadap target, dan pekerjaan lepas untuk menambal jarak sebelum pekerjaan utama datang.

Privasi sebagai arsitektur, bukan pengaturan. Utang adalah data paling memalukan yang dipegang seseorang, jadi angka utang — jumlah, bunga, nama pemberi pinjaman — dihitung sepenuhnya di peramban dan tidak pernah dikirim ke server kami. Bukan opsi yang harus dicari pengguna; itu satu-satunya cara aplikasinya bekerja.

Kami juara tiga, dan jarak antara kami dan dua teratas persis ada di bagian yang belum selesai. Ide seluas ini mudah dijelaskan dan sulit diantar utuh, dan deadline kompetisi akan menemukan itu untukmu.

Juara 3 nasional, Technology Innovative Challenge 9.0, Universitas Jember. Tim Uneed Developer.

---

### 06 · NULLFEED
**Web · Individu · Production build**
SvelteKit (Svelte 5 runes) · Threlte · GLSL · GSAP ScrollTrigger

Halaman promo horor yang digerakkan scroll, dibangun untuk menunjukkan kemampuan di luar tumpukan Next.js/React yang biasa saya pakai.

Ikosahedron yang terdistorsi oleh satu uniform bernama `corruption`, shader GLSL tulisan sendiri, chromatic aberration lewat pipeline post-processing. Lore horor orisinal seputar entitas bernama The Carrier.

Yang membuatnya bekerja bukan jumlah efeknya. Seluruh keberanian dibelanjakan di satu objek, dan sisanya diam.

---

### 07 · HeatNest Tech
**IoT · Juli 2025 · Kelompok berempat, peran firmware dan perangkat · Juara 1 dari 10 tim**
ESP8266 · sensor DHT · relay

Sistem IoT yang menjaga kandang ayam pada suhu yang benar, dan memberi tahu peternak saat tidak.

Ayam hanya tahan pada rentang suhu yang sempit. Terlalu panas dan mereka berhenti makan, turun berat, bertelur lebih sedikit. Terlalu dingin dan pertumbuhan berhenti sementara risiko penyakit naik. Tapi kebanyakan peternak kecil dan menengah masih mengecek termometer dinding dengan tangan: pembacaan hanya terjadi saat ada yang lewat, tidak ada yang tercatat, dan lonjakan mendadak jam tiga pagi baru ketahuan berjam-jam kemudian.

ESP8266 membaca suhu dan kelembapan tiap dua detik dan menggerakkan relay pemanas. Mode otomatis menahan kandang di 32–35°C dengan histeresis 1°C supaya relay tidak berdetak-detak di sekitar ambang lalu aus. Dasbor web menampilkan pembacaan langsung dan tren 24 jam; bot Telegram mengirim peringatan saat suhu keluar dari rentang aman dan menerima `/status`, `/on`, `/off` dari mana saja.

Tema kompetisinya memasangkan IoT dengan kecerdasan buatan, dan kami bisa saja menyebut control loop ini dengan istilah itu. Kami tidak. Yang dibutuhkan kandang adalah ambang, histeresis, dan peringatan yang benar-benar sampai. Sistem berbasis aturan sudah melakukan semuanya, dan sebuah model hanya akan membuatnya lebih sulit dipercaya.

Ini mengubah pemahaman saya tentang harga sebuah bug. Saat perangkat lunak gagal, kamu dapat angka salah di layar. Di sini kode menutup relay yang mengalirkan listrik ke pemanas, di bangunan kayu, di sekitar hewan hidup.

Juara 1 dari 10 tim, IT Bootcamp, Universitas Bina Sarana Informatika.

---

### 08 · Emberfall
**Godot · Perancangan**
Godot 4.5 · GDScript

Demo JRPG HD-2D sebagai karya portfolio seorang systems programmer.

Pemisahan `core/` dan `game/`: logika deterministik yang bisa diuji headless di core, Node dan animasi di presentation. Pertarungan memakai mekanik Break/Boost dengan sistem Turn Weaving.

PRD, dokumen arsitektur, dan panduan eksekusi sudah selesai. Kodenya belum.

---

## Akademik dan lainnya

Daftar ringkas di bawah grid, bukan kartu.

- **Situs Uneed Developer** — Next.js 15, React 19, Tailwind v4, Prisma/PostgreSQL, NextAuth.js
- **Jurnal format JUKTISI** — perbandingan Random Forest dan SVM pada Pima Indians Diabetes Dataset, eksperimen scikit-learn nyata, 17 referensi IEEE
- **Sistem manajemen laundry** — Laravel 11, SQLite, metodologi Waterfall, pengujian Black Box
- **Situs portfolio saat ini** — Next.js 15, Tailwind v4, Person schema, sitemap, Google Search Console

---

## Pengalaman

### Magang Web Development · Diskominfo Provinsi Kalimantan Barat
**Pontianak · Agustus – Desember 2025**

Membangun ulang situs web Biro Perekonomian sesuai arsitektur web standar Pemerintah Provinsi Kalimantan Barat.

Mempelajari Hugo dari nol langsung di lapangan, dan menerapkan integrasi situs melalui AWDI, sistem integrasi web terpadu milik provinsi. Penugasan dimulai secara mandiri, lalu berkembang jadi kolaborasi dengan bidang Aptika — pengalaman pertama bekerja di dalam organisasi terstruktur lintas bidang.

### Uneed Developer
**Studio pengembang mobile dan web · uneeddeveloper.web.id**

Anggota tim yang membawa Pivot ke juara 3 nasional di Technology Innovative Challenge 9.0.

---

## Pendidikan

**Sarjana Informatika · Universitas Bina Sarana Informatika**
Pontianak · Wisuda November 2026 · IPK 3,49 / 4,00

Skripsi: Rancang Bangun Aplikasi Manajemen Keuangan Berbasis Mobile (DomPet) dengan Implementasi Artificial Intelligence Menggunakan Metode RAD.

---

## Keahlian

Tanpa angka persentase. Tiap baris membawa buktinya sendiri.

**iOS**
Swift, SwiftUI, SwiftData, Vision, VisionKit, Swift Charts, Swift Testing / XCTest
*Tiga aplikasi: Patungan berfungsi penuh dan diuji dengan struk asli, StepOut dengan core headless, LantangCore dengan 11 test lulus.*

**Mobile lintas platform**
Flutter, Dart, Firebase, Google ML Kit, Speech-to-Text
*DomPet: 15 fitur, 85 unit test lulus, UAT 88,22%.*

**Web**
Next.js, React, TypeScript, Tailwind, Nuxt, Vue, Laravel, PHP, Hugo, REST API
*Pivot (juara 3 nasional), situs studio dengan Prisma/PostgreSQL, situs pemerintah provinsi dengan Hugo dan integrasi AWDI.*

**3D dan grafis web**
Three.js, Threlte, GLSL, GSAP
*NULLFEED: shader tulisan sendiri dan pipeline post-processing, production build.*

**Arsitektur dan pengujian**
Modul murni tanpa dependensi UI, pengujian headless, RNG deterministik
*Pola yang sama di SplitEngine, StepOutCore, LantangCore, dan core/ Emberfall.*

**Game**
Godot, GDScript, SpriteKit, desain sistem
*StepOut: 15 upgrade di empat jalur, diseimbangkan lewat 2.000 run simulasi.*

**Lainnya**
Git & GitHub, Figma, dasar ESP8266 / IoT, C++ dan Unreal Engine (belajar mandiri)

**Bahasa**
Indonesia (asli), Inggris (percakapan)

---

## Penghargaan dan sertifikasi

- **Juara 3 nasional** — Technology Innovative Challenge 9.0 (Website Development Competition), Universitas Jember, 2026. Tim Uneed Developer.
- **Juara 1** — IT Bootcamp, Universitas Bina Sarana Informatika, Juli 2025, untuk sistem monitoring IoT HeatNest Tech.
- **Sertifikasi Analis Program** — BNSP (Badan Nasional Sertifikasi Profesi).
- **iOS & Swift: The Complete iOS App Development Bootcamp** — Udemy (sedang berjalan).

---

## Minat

Game development. Mempelajari dasar C++, bereksperimen dengan Unreal Engine dan Blender, dan membuat game sederhana sendiri.

Berbagi ilmu. Rutin membantu teman kuliah yang mulai belajar coding.

Musik. Anggota paduan suara mahasiswa, dan main gitar dengan telinga bukan dengan teori.

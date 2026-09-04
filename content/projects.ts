/**
 * Eight projects, lifted verbatim from docs/CONTENT.md ("## Proyek"), which
 * supersedes the six terse cards in docs/prototype.html with real, verified
 * case-study copy — docs/CONTENT.md's own header says the numbers are
 * confirmed from the owner's CV and Academy portfolio. Grid order follows
 * strength, not chronology, per docs/CONTENT.md's own note.
 *
 * `tagline` and `body` are new, optional fields (see content/types.ts) added
 * to hold this prose losslessly. Nothing renders them yet.
 *
 * `archetypes` links a project to a battle archetype only where that project
 * is named as the `proof.project` of one of that archetype's threats in
 * content/archetypes.ts — not from looser thematic association. Pivot and
 * HeatNest Tech are real, verified work but are not named as proof of any of
 * the twelve obstacles, so they carry no archetype cross-link; they exist in
 * the project grid only. This is not an oversight — see CLAUDE.md for the
 * same asymmetry already present in the software archetype, whose obstacle
 * proofs point at things ("Sistem manajemen laundry", "Jurnal Random Forest
 * dan SVM") that were never full grid cards either.
 *
 * `shots` is empty for all eight. Screenshots are the one asset group with
 * real production cost (docs/MASTER_PROMPT.md §9) and are not due until
 * Phase 6; an empty array here is not a placeholder, it is the honest current
 * state.
 */

import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    slug: 'patungan',
    name: 'Patungan',
    kind: 'iOS',
    meta: '2026 · Individu, inisiatif pribadi · Berfungsi penuh',
    summary: 'Membagi satu tagihan untuk empat orang tanpa ada yang perlu berhitung di meja makan.',
    tagline: 'Membagi satu tagihan untuk empat orang tanpa ada yang perlu berhitung di meja makan.',
    body: [
      'Buat event, tarik peserta langsung dari Contacts, lalu pindai struk atau ketik manual. Tiap item ditugaskan ke pemesannya, pajak dan biaya layanan dibagi proporsional, dan aplikasi menyelesaikan semuanya jadi daftar transfer paling ringkas: bukan siapa berutang berapa secara abstrak, tapi pembayaran persis yang harus dikirim.',
      'Dibangun sepenuhnya di atas framework Apple, tanpa satu pun dependensi pihak ketiga. Sebagian disiplin, sebagian memang tujuannya: saya ingin tahu apa yang sebenarnya sudah diberikan platform sebelum meraih paket orang lain.',
      'Bagian yang paling saya banggakan justru tak terlihat. Bagi 43.500 untuk tiga orang, hasilnya rapi. Bagi kebanyakan total nyata, dan jumlah pembulatannya tidak kembali ke angka yang dibayar. Selisihnya satu rupiah dan tidak ada yang akan sadar, tapi buku besarnya jadi salah, dan aplikasi pembagi tagihan yang tidak seimbang bukan aplikasi pembagi tagihan. Metode largest remainder menyelesaikannya: semua dibulatkan ke bawah, sisa rupiahnya diberikan ke orang yang paling dirugikan pembulatan.',
      'Ini aplikasi Swift pertama saya. Saya sengaja memilih masalah yang sudah saya pahami supaya kesulitannya ada di bahasanya, bukan di domainnya.',
    ],
    stack: ['SwiftUI', 'SwiftData', 'Vision', 'VisionKit', 'Swift Charts'],
    repo: 'https://github.com/Dearry12/patungan',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'dompet',
    name: 'DomPet',
    kind: 'Flutter',
    meta: '2026 · Skripsi individu · Selesai',
    summary: 'Aplikasi keuangan yang membuat pencatatan manual cukup cepat untuk diteruskan.',
    tagline: 'Aplikasi keuangan yang membuat pencatatan manual cukup cepat untuk diteruskan.',
    body: [
      'Membayar dengan sekali ketuk menghilangkan gesekan dari pengeluaran, dan menghilangkan rasa sakit membayar bersamanya. Menulis setiap pengeluaran memang memulihkan kesadaran itu, masalahnya hampir tidak ada yang bertahan melakukannya karena mengetik hal yang sama berulang-ulang itu membosankan.',
      'Jadi pencatatan manual saya pertahankan, dan yang saya serang justru kebosanannya. Dua fitur AI memangkas usaha mencatat, dan satu lapisan perilaku memberi alasan untuk kembali besok. Tanpa sinkronisasi rekening, disengaja: aplikasi tidak pernah menyimpan kredensial atau riwayat transaksi yang tidak dibutuhkannya, dan kedua model berjalan on-device sehingga foto struk dan rekaman suara tidak pernah keluar dari ponsel.',
      'Hasil: akurasi OCR 83,33% pada 30 struk nyata (100% pada cetakan jelas, 66,67% pada cahaya rendah), pemrosesan suara bahasa Indonesia 100% dari 22 kalimat uji, skor User Acceptance Test 88,22% (397/450), 85 unit test lulus untuk 15 fitur, nol temuan analisis statis.',
      'Kalibrasi OCR adalah pertarungan terpanjang di proyek ini. Struk itu masukan yang bermusuhan: kertas termal pudar, lipatan tepat di baris total, silau, cahaya rendah. Satu perbaikan yang menolong satu kondisi diam-diam merusak kondisi lain, dan marginnya tidak memaafkan — membaca 27.300 alih-alih 27.800 itu jawaban salah, bukan jawaban yang mendekati. Saya berhenti mengejar satu pass sempurna dan mulai menguji terhadap lima kategori struk buruk yang disengaja. Alih-alih menyembunyikan celahnya, aplikasi menampilkan skor keyakinannya sendiri dan membiarkan pengguna mengoreksi.',
      'Yang saya pelajari: sebuah fitur tidak jadi murah hanya karena kedengarannya sederhana. Harganya adalah waktu yang dibutuhkan untuk memahaminya dengan benar, dan seluruh bagian lain dari build itu yang membayar tagihannya.',
    ],
    stack: ['Flutter', 'Firebase', 'Google ML Kit', 'Speech-to-Text'],
    repo: 'https://github.com/Dearry12/dompet_app',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'lantang',
    name: 'Lantang',
    kind: 'iOS',
    meta: '2026 · Individu, inisiatif pribadi · Paket inti selesai, 11 test lulus',
    summary: 'Pelatih public speaking yang mendengarkan dalam bahasa Indonesia, dan mengatakan satu hal yang berguna, bukan empat puluh.',
    tagline: 'Pelatih public speaking yang mendengarkan dalam bahasa Indonesia, dan mengatakan satu hal yang berguna, bukan empat puluh.',
    body: [
      'Berlatih sendirian tidak memberi umpan balik sama sekali. Merekam diri lalu menontonnya melelahkan dan tidak terfokus, jadi kebanyakan orang mencoba sekali lalu berhenti. Dan aplikasi yang ada dibangun untuk bahasa Inggris, artinya mereka salah membaca cara bahasa Indonesia sebenarnya terdengar.',
      'Bagian terakhir itu lebih berat dari kelihatannya. Kata pengisi kita — jadi, kayak, nah — sebagian besar adalah kata sungguhan yang sedang melakukan pekerjaan sungguhan di kalimat biasa. Cocokkan dengan daftar kata dan kamu akan menuduh pembicara terus-menerus, dan keliru.',
      'Aturan yang dipaksakan arsitekturnya: model bahasa tidak pernah diminta menghitung apa pun. Setiap angka keluar dari kode deterministik, karena model bahasa tidak bisa diandalkan untuk aritmetika dan saya tidak mau tahu itu dari pengguna. Kerjanya terbagi tiga. LantangCore adalah paket Swift murni tanpa dependensi UI: lapis satu mengukur, lapis dua memilih satu kekuatan dan satu fokus dari semua yang terukur. Baru lapis tiga, Foundation Models on-device, mengubah putusan itu jadi kalimat yang mau dibaca orang.',
      'Posisinya sekarang: LantangCore sudah ada dengan 11 unit test lulus. Semua di atas core sudah dirancang dan didokumentasikan tapi belum dibangun. Saya sedang menjawab pertanyaan paling berisiko sebelum menulis satu detektor pun — apakah SpeechTranscriber mendukung locale id-ID, dan apakah bunyi non-leksikal seperti "eee" bertahan di transkrip atau dibuang sebagai derau. Jawaban itu menentukan saya butuh satu jalur analisis atau dua.',
      'Lantang berarti berbicara jelas dan terdengar. Bukan keras, tapi yakin. Ada ironi yang saya suka di situ: aplikasi bernama Lantang menghabiskan banyak waktunya mengajarkan nilai keheningan.',
    ],
    stack: ['SpeechAnalyzer', 'Foundation Models', 'SwiftData', 'Swift Charts'],
    repo: 'https://github.com/Dearry12/Lantang',
    shots: [],
    archetypes: ['mobile'],
  },
  {
    slug: 'stepout',
    name: 'StepOut',
    kind: 'iOS',
    meta: '2026 · Individu · Repo publik',
    summary: 'Roguelite dengan inti permainan yang tidak tahu apa-apa soal cara dirinya digambar.',
    tagline: 'Roguelite dengan inti permainan yang tidak tahu apa-apa soal cara dirinya digambar.',
    body: [
      'StepOutCore adalah Swift Package headless dengan nol import SpriteKit. Kontraknya resolve(state, action) -> (RunState, [BattleEvent]): masuk keadaan dan aksi, keluar keadaan baru beserta aliran peristiwa. Lapisan tampilan hanya membaca aliran itu.',
      'RNG SplitMix64 dengan benih eksplisit yang jadi bagian dari keadaan permainan, sehingga benih yang sama menghasilkan run yang sama persis. Penjadwal giliran memakai tick accumulator, aritmetika bilangan bulat murni tanpa waktu nyata, jadi urutannya identik di perangkat mana pun.',
      'Enam tipe musuh, 15 upgrade di empat jalur build: Venom, Riposte, Brink, dan Tempo.',
      'Penyeimbangannya tidak dilakukan dengan memainkannya berulang kali. Ada harness yang menjalankan 2.000 run tersimulasi tanpa membuka jendela permainan, dan temuannya bukan sekadar angka menang-kalah tapi hal struktural: jalur mana yang runtuh di ronde berapa, upgrade mana yang tidak pernah dipilih. Semuanya tercatat di BALANCING.md.',
    ],
    stack: ['SpriteKit', 'Swift Package'],
    repo: 'https://github.com/Dearry12/StepOut',
    shots: [],
    archetypes: ['game'],
  },
  {
    slug: 'pivot',
    name: 'Pivot',
    kind: 'Web',
    meta: '2026 · Kelompok bertiga, peran programmer frontend · Juara 3 nasional',
    summary: 'Platform pemulihan finansial yang dibangun di sekitar satu angka: penghasilan yang benar-benar kamu butuhkan.',
    tagline: 'Platform pemulihan finansial yang dibangun di sekitar satu angka: penghasilan yang benar-benar kamu butuhkan.',
    body: [
      'Orang yang sedang kesulitan keuangan disuruh berhemat, disuruh menambah keterampilan, disuruh melamar. Tiap bagian hidup di aplikasi berbeda dan tidak ada yang saling bicara. Alat anggaran menunjukkan apa yang kamu keluarkan tapi tidak pernah berapa yang perlu kamu hasilkan. Yang tersisa: orang itu harus jadi ahli strategi bagi dirinya sendiri, tepat di saat kapasitasnya paling rendah.',
      'Mulai dari satu angka. Biaya hidup ditambah kewajiban utang menghasilkan Target Income, angka bulanan yang mengembalikan seseorang ke pijakan stabil. Semua di bawahnya disaring lewat angka itu: peran yang bayarannya cukup, keterampilan yang dibutuhkan peran itu, peta jalan 14–30 hari dari sumber gratis, CV siap ATS, lowongan yang disaring terhadap target, dan pekerjaan lepas untuk menambal jarak sebelum pekerjaan utama datang.',
      'Privasi sebagai arsitektur, bukan pengaturan. Utang adalah data paling memalukan yang dipegang seseorang, jadi angka utang — jumlah, bunga, nama pemberi pinjaman — dihitung sepenuhnya di peramban dan tidak pernah dikirim ke server kami. Bukan opsi yang harus dicari pengguna; itu satu-satunya cara aplikasinya bekerja.',
      'Kami juara tiga, dan jarak antara kami dan dua teratas persis ada di bagian yang belum selesai. Ide seluas ini mudah dijelaskan dan sulit diantar utuh, dan deadline kompetisi akan menemukan itu untukmu.',
      'Juara 3 nasional, Technology Innovative Challenge 9.0, Universitas Jember. Tim Uneed Developer.',
    ],
    stack: ['Nuxt', 'Vue', 'Vercel'],
    repo: 'https://github.com/uneeddeveloper/Pivot.id',
    live: 'https://pivot-id.vercel.app',
    shots: [],
    archetypes: [],
  },
  {
    slug: 'nullfeed',
    name: 'NULLFEED',
    kind: 'Web',
    meta: 'Individu · Production build',
    summary: 'Halaman promo horor yang digerakkan scroll, dibangun untuk menunjukkan kemampuan di luar tumpukan Next.js/React yang biasa saya pakai.',
    tagline: 'Halaman promo horor yang digerakkan scroll, dibangun untuk menunjukkan kemampuan di luar tumpukan Next.js/React yang biasa saya pakai.',
    body: [
      'Ikosahedron yang terdistorsi oleh satu uniform bernama corruption, shader GLSL tulisan sendiri, chromatic aberration lewat pipeline post-processing. Lore horor orisinal seputar entitas bernama The Carrier.',
      'Yang membuatnya bekerja bukan jumlah efeknya. Seluruh keberanian dibelanjakan di satu objek, dan sisanya diam.',
    ],
    stack: ['SvelteKit', 'Threlte', 'GLSL', 'GSAP ScrollTrigger'],
    shots: [],
    archetypes: ['web'],
  },
  {
    slug: 'heatnest-tech',
    name: 'HeatNest Tech',
    kind: 'IoT',
    meta: 'Juli 2025 · Kelompok berempat, peran firmware dan perangkat · Juara 1 dari 10 tim',
    summary: 'Sistem IoT yang menjaga kandang ayam pada suhu yang benar, dan memberi tahu peternak saat tidak.',
    tagline: 'Sistem IoT yang menjaga kandang ayam pada suhu yang benar, dan memberi tahu peternak saat tidak.',
    body: [
      'Ayam hanya tahan pada rentang suhu yang sempit. Terlalu panas dan mereka berhenti makan, turun berat, bertelur lebih sedikit. Terlalu dingin dan pertumbuhan berhenti sementara risiko penyakit naik. Tapi kebanyakan peternak kecil dan menengah masih mengecek termometer dinding dengan tangan: pembacaan hanya terjadi saat ada yang lewat, tidak ada yang tercatat, dan lonjakan mendadak jam tiga pagi baru ketahuan berjam-jam kemudian.',
      'ESP8266 membaca suhu dan kelembapan tiap dua detik dan menggerakkan relay pemanas. Mode otomatis menahan kandang di 32–35°C dengan histeresis 1°C supaya relay tidak berdetak-detak di sekitar ambang lalu aus. Dasbor web menampilkan pembacaan langsung dan tren 24 jam; bot Telegram mengirim peringatan saat suhu keluar dari rentang aman dan menerima /status, /on, /off dari mana saja.',
      'Tema kompetisinya memasangkan IoT dengan kecerdasan buatan, dan kami bisa saja menyebut control loop ini dengan istilah itu. Kami tidak. Yang dibutuhkan kandang adalah ambang, histeresis, dan peringatan yang benar-benar sampai. Sistem berbasis aturan sudah melakukan semuanya, dan sebuah model hanya akan membuatnya lebih sulit dipercaya.',
      'Ini mengubah pemahaman saya tentang harga sebuah bug. Saat perangkat lunak gagal, kamu dapat angka salah di layar. Di sini kode menutup relay yang mengalirkan listrik ke pemanas, di bangunan kayu, di sekitar hewan hidup.',
      'Juara 1 dari 10 tim, IT Bootcamp, Universitas Bina Sarana Informatika.',
    ],
    stack: ['ESP8266', 'sensor DHT', 'relay'],
    shots: [],
    archetypes: [],
  },
  {
    slug: 'emberfall',
    name: 'Emberfall',
    kind: 'Godot',
    meta: 'Perancangan',
    summary: 'Demo JRPG HD-2D sebagai karya portfolio seorang systems programmer.',
    tagline: 'Demo JRPG HD-2D sebagai karya portfolio seorang systems programmer.',
    body: [
      'Pemisahan core/ dan game/: logika deterministik yang bisa diuji headless di core, Node dan animasi di presentation. Pertarungan memakai mekanik Break/Boost dengan sistem Turn Weaving.',
      'PRD, dokumen arsitektur, dan panduan eksekusi sudah selesai. Kodenya belum.',
    ],
    stack: ['Godot 4.5', 'GDScript'],
    shots: [],
    archetypes: ['game'],
  },
];

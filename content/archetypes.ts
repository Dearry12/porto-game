/**
 * The four battle archetypes, per docs/MASTER_PROMPT.md §8. Obstacle names,
 * taglines, weaknesses, and the two-paragraph body copy are lifted verbatim
 * from the ARCH data in docs/prototype.html — the master prompt explicitly
 * says to port this rather than rewrite it.
 *
 * `party` counts: computed by counting, per archetype, how many of the
 * projects in content/projects.ts that are cross-linked to that archetype
 * list the tool in their `stack`. content/projects.ts now holds eight
 * projects (docs/CONTENT.md), but only six carry an archetype cross-link —
 * Pivot and HeatNest Tech are real, verified work but aren't named as proof
 * of any of the twelve obstacles below, so they don't move these counts.
 * These numbers still only know about the six cross-linked projects, not
 * other real work (e.g. Situs Uneed Developer, the laundry management
 * system) that has no project card at all. Several counts below are 0 or 1
 * as a result, which understates real usage, most visibly for "Arsitektur
 * modul" — the inherited-skill pattern is the strongest claim in the whole
 * portfolio and spans every project, not zero. Treat these as provisional
 * and confirm the real per-tool project counts before this renders in
 * Phase 4/5.
 *
 * `lineage` notes: only the mobile archetype's lineage in the master prompt
 * names a project per stage ("(DomPet)", "(Patungan)", "(StepOut, Lantang)").
 * The other three archetypes' lineage lines are a bare arrow-chain with no
 * per-stage project name, so their `note` is left as an empty string rather
 * than guessing which project belongs to which stage.
 */

import type { Archetype } from './types';

export const INHERITED_SKILL = {
  // Reused verbatim from the "Bug yang Tak Terlihat" threat below, so this
  // shared passive isn't a new sentence invented for this constant.
  name: 'Modul murni tanpa import framework',
  note: 'SplitEngine, StepOutCore, LantangCore, dan core/ di Emberfall memakai bentuk yang sama.',
};

export const ARCHETYPES: Archetype[] = [
  {
    id: 'mobile',
    name: 'Mobile development',
    short: 'Mobile',
    field: 'Aplikasi iOS dan Flutter',
    party: [
      ['Swift, SwiftUI', 2],
      ['Flutter, Dart', 1],
      ['SwiftData', 1],
    ],
    lineage: [
      { title: 'Flutter dan Firebase', note: 'DomPet' },
      { title: 'SwiftUI dan SwiftData', note: 'Patungan' },
      { title: 'SpriteKit dan Foundation Models', note: 'StepOut, Lantang' },
    ],
    threats: [
      {
        slug: 'tanpa-internet',
        name: 'Tanpa Internet',
        level: 'LV 32',
        tagline: 'Semua fitur harus tetap jalan offline',
        weakness: 'Penyimpanan lokal sebagai sumber kebenaran',
        body: [
          'Aplikasi keuangan dipakai justru saat sinyal buruk: di kasir, di parkiran, di warung. Kalau data hidup di server, aplikasinya mati bersama koneksinya.',
          'Di Patungan saya jadikan penyimpanan lokal sebagai satu-satunya sumber kebenaran, bukan cache. SwiftData memegang seluruh keadaan, dan tidak ada satu pun jalur yang menunggu jaringan sebelum menampilkan sesuatu. Sinkronisasi kalau ada, jadi lapisan tambahan di atasnya, bukan syarat.',
        ],
        proof: {
          project: 'Patungan',
          kind: 'iOS',
          note: 'Empat mesin Swift murni tanpa dependensi pihak ketiga. Pembagian sisa terbesar dan penyederhanaan utang berjalan sepenuhnya di perangkat.',
        },
      },
      {
        slug: 'struk-yang-buram',
        name: 'Struk yang Buram',
        level: 'LV 41',
        tagline: 'OCR di dunia nyata tidak pernah bersih',
        weakness: 'Pipeline bertahap dengan skor keyakinan',
        body: [
          'Struk asli terlipat, buram, dan dicetak dengan tinta yang hampir habis. Model pengenalan teks yang bagus di data uji akan gagal di kondisi ini.',
          'Solusinya bukan model yang lebih besar, tapi pipeline yang mengakui ketidakpastian. Praproses citra, ekstraksi teks, lalu penguraian dengan aturan yang memberi skor keyakinan per baris. Baris yang skornya rendah dilempar ke pengguna untuk dikoreksi, bukan disimpan diam-diam sebagai data salah.',
        ],
        proof: {
          project: 'DomPet',
          kind: 'Flutter',
          note: 'Akurasi 83,33% dari 30 struk nyata, skor uji penerimaan 88,22%, 85 unit test.',
        },
      },
      {
        slug: 'baterai-dan-memori',
        name: 'Baterai dan Memori',
        level: 'LV 47',
        tagline: 'Pemrosesan bahasa tanpa menyentuh server',
        weakness: 'Ukur dulu, baru minta model bahasa bicara',
        body: [
          'Menjalankan model bahasa di ponsel itu mahal. Kalau setiap penilaian memanggil model, baterai habis dan hasilnya tidak konsisten antar percobaan.',
          'Di Lantang saya pisah jadi tiga lapis. Lapis pertama mengukur secara deterministik: kerapatan kata pengisi, taksonomi jeda, kecepatan bicara dalam suku kata per detik. Lapis kedua memilih temuan mana yang layak disampaikan, dengan rumus, bukan model. Model bahasa baru masuk di lapis ketiga, hanya untuk merangkai kalimat. Angkanya selalu sama untuk rekaman yang sama.',
        ],
        proof: {
          project: 'Lantang',
          kind: 'iOS',
          note: 'Foundation Models di perangkat, LantangCore sebagai Swift Package headless dengan 11 unit test.',
        },
      },
    ],
  },
  {
    id: 'web',
    name: 'Website development',
    short: 'Website',
    field: 'Antarmuka statis dan 3D',
    party: [
      ['TypeScript', 0],
      ['Next.js, React', 0],
      ['Three.js, GLSL', 1],
    ],
    lineage: [
      { title: 'Laravel dan SQLite', note: '' },
      { title: 'Next.js dan Tailwind', note: '' },
      { title: 'SvelteKit, Threlte, GLSL', note: '' },
    ],
    threats: [
      {
        slug: 'muat-pertama',
        name: 'Muat Pertama',
        level: 'LV 28',
        tagline: 'Berat di balik layar, instan di depan mata',
        weakness: 'Static generation dan anggaran dependensi',
        body: [
          'Halaman yang butuh tiga detik untuk muncul sudah kalah sebelum dibaca. Dan penyebab tersering bukan gambar, tapi JavaScript yang dikirim untuk hal yang sebenarnya statis.',
          'Pendekatan saya: hasilkan HTML saat build, kirim JavaScript hanya untuk bagian yang benar-benar interaktif, dan perlakukan setiap dependensi sebagai utang yang harus dibenarkan. Portfolio saya berjalan tanpa satu pun pustaka animasi karena CSS sudah cukup.',
        ],
        proof: {
          project: 'derrymeiraldy.vercel.app',
          kind: 'Web',
          note: 'Next.js App Router, TypeScript ketat, Tailwind v4, static generation di Vercel.',
        },
      },
      {
        slug: 'halaman-yang-mati',
        name: 'Halaman yang Mati',
        level: 'LV 44',
        tagline: 'Rapi, benar, dan sama sekali tak berkesan',
        weakness: 'Satu momen berani, sisanya diam',
        body: [
          'Banyak portfolio benar secara teknis tapi tidak meninggalkan apa pun di kepala orang. Masalahnya bukan kurang efek, justru sering kelebihan: setiap bagian punya animasi masuk, dan tidak ada yang menonjol.',
          'Di NULLFEED saya belanjakan seluruh keberanian di satu tempat. Satu objek, satu uniform bernama corruption yang menggerakkan distorsi, dan seluruh halaman diam di sekelilingnya. Yang membuatnya bekerja bukan jumlah efeknya, tapi keputusan tentang apa yang tidak dianimasikan.',
        ],
        proof: {
          project: 'NULLFEED',
          kind: 'Web',
          note: 'SvelteKit dengan Svelte 5 runes, Threlte, shader GLSL sendiri, GSAP ScrollTrigger, post-processing.',
        },
      },
      {
        slug: 'tumpukan-dependensi',
        name: 'Tumpukan Dependensi',
        level: 'LV 35',
        tagline: 'Setiap paket adalah utang yang jatuh tempo',
        weakness: 'Menolak sebelum menambah',
        body: [
          'Proyek web mudah membengkak. Satu pustaka tanggal, satu pustaka ikon, satu pustaka animasi, dan tiba-tiba pembaruan keamanan jadi pekerjaan mingguan.',
          'Aturan saya sederhana: sebuah paket masuk hanya kalau menulisnya sendiri akan memakan lebih dari sehari atau berisiko salah secara halus. Format tanggal tidak lolos. Shader post-processing lolos.',
        ],
        proof: {
          project: 'Situs Uneed Developer',
          kind: 'Web',
          note: 'Next.js 15, React 19, Tailwind v4, Prisma dengan PostgreSQL, NextAuth.js.',
        },
      },
    ],
  },
  {
    id: 'software',
    name: 'Software development',
    short: 'Software',
    field: 'Logika inti dan model data',
    party: [
      ['Arsitektur modul', 0],
      ['Pengujian', 0],
      ['Prisma, PostgreSQL', 0],
    ],
    lineage: [
      { title: 'Unit testing', note: '' },
      { title: 'Prisma dan PostgreSQL', note: '' },
      { title: 'Python dan scikit-learn', note: '' },
    ],
    threats: [
      {
        slug: 'bug-yang-tak-terlihat',
        name: 'Bug yang Tak Terlihat',
        level: 'LV 50',
        tagline: 'Logika yang tidak pernah diuji sendirian',
        weakness: 'Modul murni tanpa import framework',
        body: [
          'Logika yang menempel pada widget hanya bisa diuji dengan menjalankan aplikasinya. Artinya jarang diuji, dan kesalahan baru ketahuan di tangan pengguna.',
          'Saya balik urutannya. Bagian yang bisa salah, seperti pembagian uang, penjadwalan giliran, atau penilaian ucapan, saya letakkan di modul yang tidak mengimpor satu pun framework antarmuka. Modul itu diuji tanpa membuka simulator. Antarmuka datang belakangan sebagai pembaca.',
        ],
        proof: {
          project: 'Pola inti di semua proyek',
          kind: 'Arsitektur',
          note: 'SplitEngine, StepOutCore, LantangCore, dan core/ di Emberfall memakai bentuk yang sama.',
        },
      },
      {
        slug: 'data-yang-kusut',
        name: 'Data yang Kusut',
        level: 'LV 38',
        tagline: 'Relasi yang tumbuh tanpa rencana',
        weakness: 'Skema dulu, fitur belakangan',
        body: [
          'Skema yang dibiarkan tumbuh mengikuti fitur akan berakhir dengan kolom yang artinya bergantung pada kolom lain, dan kueri yang tidak ada yang berani sentuh.',
          'Saya mulai dari model data, bukan dari halaman. Untuk situs studio, entitas dan relasinya saya kunci di skema Prisma sebelum satu komponen pun ditulis. Migrasi jadi catatan sejarah yang bisa dibaca, bukan tumpukan tambalan.',
        ],
        proof: {
          project: 'Sistem manajemen laundry',
          kind: 'Backend',
          note: 'Laravel 11 dengan SQLite, metode Waterfall, pengujian Black Box, terdokumentasi penuh.',
        },
      },
      {
        slug: 'aturan-yang-berubah',
        name: 'Aturan yang Berubah',
        level: 'LV 36',
        tagline: 'Kebutuhan bergeser di tengah pengerjaan',
        weakness: 'Batas modul yang jelas',
        body: [
          'Perubahan kebutuhan tidak bisa dicegah. Yang bisa diatur adalah seberapa jauh perubahan itu merambat.',
          'Kalau aturan bisnis hidup di satu modul murni, mengubahnya berarti mengubah satu berkas dan menjalankan ulang pengujiannya. Kalau aturan itu tersebar di tujuh komponen antarmuka, mengubahnya berarti berburu.',
        ],
        proof: {
          project: 'Jurnal Random Forest dan SVM',
          kind: 'Penelitian',
          note: 'Eksperimen scikit-learn nyata pada Pima Indians Diabetes Dataset, terbit format JUKTISI dengan 17 referensi IEEE.',
        },
      },
    ],
  },
  {
    id: 'game',
    name: 'Game development',
    short: 'Game',
    field: 'Peminat dengan sistem yang sudah jalan',
    party: [
      ['Desain sistem', 0],
      ['Godot, GDScript', 1],
      ['SpriteKit', 1],
    ],
    lineage: [
      { title: 'Desain sistem', note: '' },
      { title: 'SpriteKit', note: '' },
      { title: 'Godot 4.5', note: '' },
    ],
    threats: [
      {
        slug: 'keseimbangan',
        name: 'Keseimbangan',
        level: 'LV 46',
        tagline: 'Angka yang terasa benar tapi tak terbukti',
        weakness: 'Simulasi ribuan run, bukan firasat',
        body: [
          'Menyeimbangkan permainan dengan cara memainkannya sendiri berarti mempercayai perasaan setelah dua puluh kali coba. Itu tidak cukup untuk menemukan jalur build yang terlalu kuat.',
          'Di StepOut saya bangun harness yang menjalankan 2.000 run tersimulasi tanpa membuka jendela permainan. Hasilnya bukan cuma angka menang-kalah, tapi temuan struktural: jalur mana yang runtuh di ronde berapa, dan upgrade mana yang tidak pernah dipilih. Semuanya saya catat di BALANCING.md.',
        ],
        proof: {
          project: 'StepOut',
          kind: 'iOS',
          note: '15 upgrade dalam empat jalur build: Venom, Riposte, Brink, dan Tempo.',
        },
      },
      {
        slug: 'acak-yang-tak-terulang',
        name: 'Acak yang Tak Terulang',
        level: 'LV 39',
        tagline: 'Bug yang menghilang saat dicari',
        weakness: 'RNG berbenih yang dapat direproduksi',
        body: [
          'Kalau keacakan diambil dari sumber sistem, satu run tidak bisa diputar ulang. Laporan bug jadi tidak berguna dan pengujian otomatis jadi mustahil.',
          'Saya pakai SplitMix64 dengan benih eksplisit yang jadi bagian dari keadaan permainan. Benih yang sama menghasilkan run yang sama persis, sehingga harness penyeimbang bisa berjalan deterministik dan setiap kesalahan bisa diulang.',
        ],
        proof: {
          project: 'StepOutCore',
          kind: 'Swift Package',
          note: 'Nol import SpriteKit. Kontrak resolve(state, action) mengembalikan keadaan baru dan aliran peristiwa.',
        },
      },
      {
        slug: 'giliran-yang-kacau',
        name: 'Giliran yang Kacau',
        level: 'LV 42',
        tagline: 'Urutan aksi yang tidak bisa diprediksi',
        weakness: 'Tick accumulator, bukan antrean ad hoc',
        body: [
          'Sistem giliran yang dibangun dari timer dan panggilan balik akan menghasilkan urutan berbeda pada perangkat berbeda. Untuk permainan taktis, itu fatal.',
          'Penjadwalnya saya buat sebagai akumulator tick: setiap entitas mengumpulkan nilai berdasarkan kecepatannya, dan yang melewati ambang lebih dulu mendapat giliran. Murni aritmetika bilangan bulat, tanpa waktu nyata, jadi hasilnya identik di mana pun.',
        ],
        proof: {
          project: 'Emberfall',
          kind: 'Godot',
          note: 'Mekanik Break dan Boost dengan sistem Turn Weaving, logika pertarungan murni di core/.',
        },
      },
    ],
  },
];

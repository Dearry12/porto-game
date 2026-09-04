# CLAUDE.md

Instruksi untuk Claude Code saat bekerja di repositori ini.
Baca `docs/MASTER_PROMPT.md` untuk konteks proyek dan `docs/prototype.html` untuk teknik yang sudah terpecahkan.
File ini berisi **aturan kerja**, bukan dokumentasi.

---

## Proyek

**Meiraldy** — portfolio pribadi Derry Meiraldy dengan model navigasi yang dipinjam dari JRPG *Metaphor: ReFantazio*. Dikerjakan **solo**.

Dua tujuan yang sama pentingnya:
1. Situs yang selesai, cepat, dan bisa dibaca recruiter.
2. **Bukti kemampuan front-end dan arsitektur** — repo ini akan dibaca engineer lain.

### Aturan penengah konflik

> **Kata kerja utamanya `select`, bukan `scroll`.**

Kamera, tipografi, dan transisi digerakkan oleh state machine diskret, **bukan** oleh progres scroll. Pemilik repo sudah punya situs 3D scroll-driven (NULLFEED). Kalau proyek ini berakhir scroll-driven, ia duplikat dan tidak punya alasan untuk ada.

Bila harus memilih antara menambah efek dan menjaga aturan ini, **selalu jaga aturan ini.**

---

## Stack

| Komponen | Pilihan |
|---|---|
| Framework | **Next.js 15**, App Router, static export |
| Bahasa | **TypeScript**, `strict: true` |
| 3D | React Three Fiber + `@react-three/drei` + `@react-three/postprocessing` |
| Animasi | **GSAP 3.13+** (SplitText, MorphSVG) |
| State | Modul TS murni dibungkus **Zustand** |
| Styling | **Tailwind v4** untuk layout, CSS biasa untuk art direction |
| Audio | Web Audio API, tanpa pustaka |
| Testing | **Vitest** |
| Hosting | Vercel |

**Framer Motion, Howler, Spline, MDX: JANGAN.** Semuanya sudah ditolak dengan alasan di `docs/SPEC.md` §3. Usulkan ulang hanya kalau ada alasan teknis baru.

---

## Aturan Arsitektur (tidak bisa dinegosiasi)

### A1 — `lib/nav/machine.ts` nol import

Aturan terpenting di repo ini.

```ts
// lib/nav/machine.ts
export function transition(state: NavState, event: NavEvent): NavState
```

Murni, deterministik, tanpa satu pun `import`. Diuji Vitest tanpa DOM. **Kalau sebuah import muncul di file itu, arsitekturnya rusak** — hentikan dan laporkan, jangan cari jalan pintas.

Ini pola yang sama dengan `SplitEngine`, `StepOutCore`, `LantangCore`, dan `core/` di Emberfall: logika yang bisa salah dipisahkan ke modul murni tanpa import framework antarmuka, lapisan render jadi pembaca. Pola itu adalah klaim terkuat di portfolio ini, jadi kodenya harus benar-benar berbentuk begitu.

### A2 — Situs harus hidup tanpa animasi

Seluruh situs wajib bisa dinavigasi dan dibaca dengan animasi mati total. Kalau navigasi bergantung pada callback GSAP, itu bug.

### A3 — Konten section ada di HTML statis

Isi Project, Skill, About, dan Contact wajib ada di `view-source` **apa pun state navigasinya**, termasuk saat title screen menutupi layar. Crawler tidak menekan tombol.

### A4 — Pengunjung tidak boleh buntu

Tidak ada gagal, kalah, tersesat, atau menunggu animasi. Setiap state punya jalan pulang. `Escape` naik **tepat satu** level. Transisi dapat diinterupsi: input saat wipe melompat ke tujuan, bukan ditelan. Event tak dikenal mengembalikan state apa adanya — **jangan pernah `throw`**.

### A5 — Anggaran dependensi

Sebuah paket masuk hanya kalau menulisnya sendiri memakan **lebih dari sehari** atau berisiko salah secara halus. Setiap penambahan dependensi harus disebutkan alasannya di pesan commit.

### A6 — Zustand hanya sebagai adaptor

`lib/nav/store.ts` membungkus `machine.ts`, tidak menduplikasi logikanya. Alasan memilih Zustand bersifat teknis: di dalam `useFrame`, komponen R3F membaca state tiap frame lewat `useStore.getState()` tanpa memicu re-render. React Context akan me-render ulang pohon di tengah animasi.

### A7 — Tailwind untuk layout, CSS biasa untuk seni

Mask XOR, filter turbulence, skew, dan variabel kaskade **tidak boleh** dipaksa jadi utility class. `className` tiga baris adalah kegagalan. Tailwind v4 bersifat CSS-first: pakai `@theme` di CSS, **jangan** buat `tailwind.config.js`.

---

## Struktur Folder

```
app/          layout.tsx  page.tsx (server component, semua konten section)  globals.css
components/
  shell/      NavShell.tsx  Rail.tsx  Wipe.tsx  AudioToggle.tsx
  title/      TitleScreen.tsx  Wordmark.tsx
  hub/        Cascade.tsx  HubMeta.tsx
  battle/     BattleScreen.tsx  CommandFan.tsx  ThreatField.tsx  Sigil.tsx  PartyPanel.tsx
  threat/     ThreatDetail.tsx
  sections/   Projects.tsx  Skills.tsx  About.tsx  Contact.tsx
  three/      Scene.tsx  FocalObject.tsx        // dynamic import saja
lib/
  nav/        machine.ts  machine.test.ts  store.ts
  audio/      sfx.ts
  motion/     wipe.ts
content/      types.ts  archetypes.ts  projects.ts  skills.ts  about.ts
public/       shots/  fonts/  sfx/
docs/         MASTER_PROMPT.md  SPEC.md  prototype.html
```

Konten hidup di file **TS bertipe**, bukan MDX. Tidak ada kebutuhan authoring panjang di sini, dan konstanta bertipe memberi keamanan waktu-kompilasi untuk tautan silang antara archetype dan project.

`INHERITED_SKILL` adalah satu konstanta level-modul, **bukan** field per-archetype — justru karena intinya ia dibagi bersama.

---

## Token Visual

Identitasnya **tipografi dan tekstur cat**, bukan 3D. Di setiap frame referensi, serif display berukuran raksasa di atas sapuan cat robek memenuhi layar; 3D adalah lingkungan di belakangnya. Investasi harus mengikuti urutan itu. Kalau tipografinya penakut, tidak ada shader yang bisa menyelamatkan.

```css
--ink:        #14110F;   /* base surface, linework */
--indigo:     #1A1F3D;   /* panel, depth */
--indigo-deep:#0C0F22;   /* alternating section surface */
--parch:      #E3D9C6;   /* primary text, wordmark */
--parch-dim:  #8E8574;   /* secondary text */
--rule:       #3A342C;   /* hairlines */
--ochre:      #C8973F;   /* cursor, active state, single accent */
--rust:       #8C2B24;   /* paint slash, weakness plate */
--teal:       #2E7C8E;   /* wash only, never text */
--cut:        8deg;      /* the one diagonal, reused everywhere */
```

**Dilarang menaikkan saturasi.** Magenta dan cyan dari frame referensi bekerja di sana karena scene 3D yang detail menyerap kontrasnya; di latar web datar keduanya merusak keterbacaan teks parchment. `--rust` dan `--teal` adalah penggantinya.

`--teal` tidak pernah jadi warna teks. `--ochre` adalah satu-satunya aksen.

### Tipografi

| Peran | Wajah | Aturan |
|---|---|---|
| Display | **Bodoni Moda** (variable) | **Hanya ≥ 40px.** Goresan tipis Didone hilang di ukuran kecil. |
| UI | Archivo Narrow | Label menu, plate, hint — dan semua yang < 40px |
| Angka | JetBrains Mono | Level, stat, versi, tahun |

Semua font di-self-host sebagai WOFF2 di `public/fonts/`. Tanpa permintaan render-blocking ke Google Fonts.

### Geometri dan gerak

- **Satu diagonal, 8°**, dipakai ulang di setiap potongan, wipe, dan skew panel. Konsistensi itu yang membuatnya terbaca sebagai keputusan.
- Wipe: tutup 220ms, lompat di baliknya, buka 200ms. Total di bawah 450ms.
- Gerak kursor: 120ms, ease-out tajam.
- Pergantian archetype adalah animasi termahal di situs ini, dan memang seharusnya begitu.
- **Tidak ada yang ease pelan. Tidak ada yang fade-in saat scroll.**

### Teknik yang sudah terpecahkan — port, jangan tulis ulang

Semuanya sudah ada di `docs/prototype.html`.

| Efek | Teknik |
|---|---|
| Sapuan cat robek | `feTurbulence` + `feDisplacementMap` di atas rect polos, variasikan `seed` |
| Wordmark knockout | Dua `<mask>` SVG menghasilkan XOR teks dan segitiga |
| Sigil halangan | Poligon prosedural dari `(archetypeIndex, threatIndex)` |
| Menu kaskade | Custom property CSS `--fs`, `--r`, `--i` diturunkan dari satu indeks |
| Paint slash | Rect + filter turbulence + `scaleX` dari `transform-origin: left` |
| Reticle | Pseudo-element lingkaran dashed dengan keyframe rotate lambat |
| Grain | SVG turbulence inline sebagai data URI base64, di bawah 300 byte |
| Wipe diagonal | `clip-path: polygon()` digerakkan GSAP |

---

## Keputusan Terkunci

Enam keputusan terbuka di MASTER_PROMPT §12 sudah diputuskan. Jangan buka lagi tanpa diminta.

| # | Keputusan | Alasan |
|---|---|---|
| a | GitHub `github.com/Dearry12`. **Email dan LinkedIn masih `TODO`** | Jangan pernah mengarang alamat email atau URL profil. Tanya. |
| b | **Angka LV pada halangan: dipertahankan** | Tidak ada yang membaca "LV 41" sebagai klaim faktual. Justru itu yang memisahkan lapisan game dari lapisan informasi. |
| c | **Persentase skill: dibuang** | "Swift 82" terlihat seperti pengukuran dan tidak punya jawaban untuk "berdasarkan apa?". Section Skill memakai label berbasis bukti: `Swift, SwiftUI — tiga aplikasi, 96 unit test`. |
| c2 | **Party panel battle memakai jumlah proyek**, format `Swift · 3` | HUD tetap butuh angka supaya terbaca seperti HUD. Angkanya fakta yang bisa dihitung, bukan penilaian diri. |
| d | **Bodoni Moda**, dikunci ≥ 40px | Referensinya Didone berat berkontras ekstrem. Fraunces itu soft-serif yang hangat dan editorial — kita akan terus melawannya. |
| e | **Pak SFX royalty-free berlisensi CC0**, bukan oscillator | Suara menu JRPG bergantung pada transien metalik dan ekor reverb pendek; sulit disintesis meyakinkan. Enam berkas ~15KB tidak berarti apa-apa untuk performa. CC0 supaya tidak ada atribusi yang perlu dilacak. |
| f | **Kaskade tetap di kiri** | Menu utama Metaphor didominasi tipografi dengan seni di belakangnya. 3D full-bleed akan bersaing dengan huruf, padahal huruf itulah identitasnya. Objek 3D boleh **mengisi lebih banyak bingkai dengan opasitas rendah di belakang kaskade**, bukan duduk sebagai objek terpisah di kanan. |

`Array<[string, number]>` pada `party` sekarang berarti **(nama alat, jumlah proyek)**, bukan kedalaman 0–100. Perbarui komentar tipe agar tidak menyesatkan.

---

## Konvensi Kode

- **File komponen:** `PascalCase.tsx` · **modul lib/content:** `camelCase.ts`
- **Fungsi/variabel:** `camelCase` · **tipe/interface:** `PascalCase` · **konstanta:** `SCREAMING_SNAKE_CASE`
- **Privat di modul:** awali underscore — `_internalState`
- **Boolean:** awali `is` / `has` / `can`
- `strict: true`. **Dilarang `any`**, dilarang `@ts-ignore` tanpa komentar alasan di barisnya.
- Fungsi > 40 baris → pecah. Nesting > 3 level → pecah.
- Komentar menjelaskan **kenapa**, bukan **apa**.
- Tulis kode, komentar, dan pesan commit dalam **Bahasa Inggris** (repo publik, dibaca recruiter internasional).
- **Copy antarmuka dalam Bahasa Indonesia.** Bicara ke saya dalam Bahasa Indonesia.

---

## Konten

Seluruh copy di MASTER_PROMPT §8 dan `docs/prototype.html` bersifat **final dan nyata**.

- **Angkat verbatim.** Jangan parafrase, jangan bumbui, jangan tambah.
- Setiap halangan punya **tepat 2 paragraf** `body`.
- Setiap archetype punya **tepat 3 halangan**. Empat archetype, tidak lebih.
- Data yang belum ada → tulis `TODO` dan **laporkan**. Jangan karang email, URL, angka metrik, atau nama proyek.

---

## Testing

- `lib/nav/machine.ts` wajib punya test untuk **setiap** transisi di MASTER_PROMPT §7, setiap jalur escape, dan kasus event tak dikenal.
- Test berjalan tanpa DOM dan tanpa scene.
- **Tulis test sebelum implementasi** untuk modul nav.
- Edge case wajib: cursor membungkus di batas, delta negatif, archetype tak dikenal, cancel dari setiap state.

```bash
npm run test
```

---

## Fase Kerja

Kerjakan berurutan. **Jangan melompat.** Lapor di akhir setiap fase dan berhenti.

| Fase | Lingkup | Selesai bila |
|---|---|---|
| **1** | `lib/nav/machine.ts` + test. Tanpa UI, tanpa styling, tanpa dependensi. | Setiap transisi dan jalur escape punya test Vitest yang lulus |
| 2 | `content/` diisi copy nyata, bertipe penuh | Tidak ada placeholder selain `TODO` yang terdaftar |
| 3 | Shell statis: hub, section, rail, keyboard, history. Tanpa 3D, tanpa GSAP. | Situs bisa dinavigasi dan dibaca dengan animasi mati; `view-source` memuat semua konten section |
| 4 | Art direction: tipografi, wash, wipe, kaskade, wordmark XOR, GSAP | Sekilas pandang ke hub dan title sudah terbaca sebagai arah referensi |
| 5 | Battle dan threat detail | Dua belas halangan terjangkau lewat keyboard dan pointer, masing-masing dengan panel bukti |
| 6 | Lapisan 3D via R3F | Menambah atmosfer; **menghapus seluruh folder `three/` tidak merusak navigasi** |
| 7 | Audio, gamepad, audit reduced-motion, Lighthouse, cek 360px, OG image |  |

**Fase 3 mendahului fase 4 itu penting.** Kalau situs belum bisa dinavigasi dan dibaca sebelum ada animasi, animasi itu sedang menutupi fondasi yang rusak.

**Fase saat ini: 1.**

---

## Lantai Kualitas

- Navigasi keyboard penuh, focus ring terlihat, `aria-pressed` dan `aria-current` benar
- `prefers-reduced-motion` mematikan wipe, stagger, dan putaran reticle
- Audio **mati secara bawaan**, toggle terlihat sejak layar pertama; `AudioContext` dibuka pada interaksi pertama di title
- `sessionStorage` mencatat title sudah dilihat; pengunjung yang kembali langsung ke hub
- Tautan **"lihat CV"** terlihat setiap saat sebagai pintu keluar bagi pengunjung tak sabar
- Back dan forward browser bekerja lintas hub, section, dan halaman threat. Hanya `hub`, `section`, dan `threat` yang mendorong entri history — animasi transien tidak pernah jadi entri history.
- Lighthouse performance di atas 90 pada mobile
- Terbaca di lebar 360px; kaskade **reflow**, bukan overflow
- Di sentuh, "Tekan tombol apa saja" berubah jadi ajakan tap dan hint keyboard disembunyikan

---

## Jebakan yang Sudah Diketahui

1. `<Canvas>` **harus** berada di komponen `'use client'` yang diimpor lewat `dynamic()` dengan `ssr: false`. Kalau tidak, build gagal saat prerender karena `window` tidak terdefinisi, dan pesan errornya tidak menunjuk ke penyebabnya.
2. Tailwind v4 CSS-first. Jangan buat `tailwind.config.js`; pakai `@theme` di CSS.
3. GSAP harus didaftarkan sisi klien saja: `gsap.registerPlugin(SplitText)` di dalam `useEffect` atau modul klien.

---

## Aset & Lisensi

- Setiap aset yang masuk repo **wajib** dicatat di `CREDITS.md` **pada commit yang sama**.
- Format: `file | sumber (URL) | penulis | lisensi | tanggal`
- **SFX wajib CC0.** Tanpa atribusi yang perlu dilacak.
- **DILARANG CC-BY-SA** (viral).
- **DILARANG mereproduksi aset, logo, huruf, atau artwork Atlus.** Referensinya seperangkat prinsip, bukan sumber berkas.
- Screenshot proyek adalah satu-satunya kelompok aset yang punya biaya produksi nyata: 12–18 berkas WebP lebar 1600px. Tidak bisa dipalsukan.

---

## Git

Format commit: `<tipe>(<scope>): <deskripsi>`

```
feat(nav): add transition table for battle and threat states
test(nav): cover cursor wrapping and unknown events
fix(hub): keep cascade readable at 360px
refactor(content): replace skill percentages with evidence labels
data(archetypes): add game discipline obstacles
```

Tipe: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `data`

- Commit kecil dan sering. Satu commit = satu perubahan logis.
- **Dilarang** pesan seperti `update`, `fix`, `wip`, `asdf`. Riwayat commit adalah bagian dari portfolio.
- Jangan commit `node_modules/`, `.next/`, atau `.DS_Store`.

---

## Yang Tidak Boleh Dilakukan

- Membuat sistem pertarungan sungguhan. **Tanpa HP, giliran, damage, atau kondisi menang-kalah.**
- Memakai posisi scroll untuk menggerakkan kamera atau 3D.
- Menambah AI-design tell: latar krem beraksen terracotta, kartu membulat identik berbayang abu lembut, eyebrow huruf besar ber-tracking di atas setiap judul, `→` di ujung setiap tautan.
- Menambah archetype kelima atau halangan keempat.
- Mengerjakan art direction sebelum shell statis terbukti bisa dibaca tanpa JavaScript.
- Membuat abstraksi untuk kebutuhan yang belum ada.
- Membuat file dokumentasi baru tanpa diminta.
- Menulis ulang file besar padahal cukup edit beberapa baris.

---

## Sinyal Proyek Melenceng

Kalau salah satu ini terjadi, **berhenti dan laporkan**:

- Posisi scroll mulai menggerakkan 3D atau kamera
- `lib/nav/machine.ts` mendapat sebuah `import`
- Jumlah halangan tumbuh melewati tiga per archetype
- Pengunjung bisa mencapai state tanpa jalan kembali
- Screenshot masih `TODO` saat Fase 6

---

## Cara Bekerja Denganku

**Sebelum menulis kode:**
- Perubahan besar (>1 file baru atau menyentuh arsitektur): jelaskan rencana dan trade-off dulu, tunggu persetujuan.
- Perubahan kecil: langsung kerjakan.

**Saat bekerja:**
- Satu potongan vertikal per sesi. Jangan borong beberapa sistem sekaligus.
- Kalau ada dua pendekatan yang masuk akal, **tanyakan** — jangan diam-diam memilih.
- Kalau instruksiku bertentangan dengan aturan di file ini, **katakan**, jangan diam-diam menuruti.
- Kalau tidak yakin sebuah API ada, katakan tidak yakin. Jangan mengarang nama method.

**Setelah selesai:**
- Jalankan test.
- Sebutkan apa yang **tidak** dikerjakan atau yang masih rapuh.
- Jangan mengklaim sesuatu "sudah teruji" kalau testnya belum dijalankan.

---

## Definition of Done per Tugas

- [ ] `strict: true` lolos, tanpa `any`
- [ ] Unit test ditulis dan **lulus**
- [ ] Tidak ada import di `lib/nav/machine.ts`
- [ ] Tidak ada dependensi baru tanpa alasan tertulis
- [ ] Tetap bisa dinavigasi dengan animasi mati
- [ ] Konten section masih ada di HTML statis
- [ ] Pesan commit sesuai format

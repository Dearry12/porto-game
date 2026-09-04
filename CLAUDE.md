# CLAUDE.md

Instruksi untuk Claude Code saat bekerja di repositori ini.
Baca `docs/MASTER_PROMPT.md` untuk konteks proyek, `docs/prototype.html` untuk teknik yang sudah terpecahkan,
`docs/CONTENT.md` untuk copy dan angka final, dan `docs/DESIGN_TWIST.md` untuk arah visual (§3b di bawah).
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

## Twist Desain (§3b — menimpa §3 di mana bertentangan)

Sumber lengkap: `docs/DESIGN_TWIST.md`. Bacaan wajib sebelum menyentuh Fase 4.

**Masalah yang diperbaiki:** prototipe saat ini terbaca sebagai Metaphor dengan warna berbeda. Itu bukti konsep yang bagus, tapi portfolio yang salah — orang yang mengenali sumbernya melihat proyek fan-made, yang tidak mengenalinya melihat sesuatu tanpa cerita asal. **Perbaikannya bukan melemahkan desainnya, tapi mempertahankan tata bahasanya dan mengganti kosakatanya.**

**Tata bahasa yang dipertahankan** (ini yang membuat referensinya bekerja): tipografi raksasa sebagai elemen komposisi utama, satu diagonal konsisten di setiap potongan, bidang warna di belakang tipografi bukan di sampingnya, layout asimetris dengan satu sisi berat dan satu sisi tenang, gerak tajam-pendek dengan entri staggered, plate informasi yang diikat ke subjeknya lewat garis tipis.

**Kosakata yang harus diganti** (ini yang membuatnya terbaca sebagai *Metaphor*): sapuan cat minyak, magenta/cyan saturasi penuh, potret anime di separuh kanan, ornamen manuskrip berhias, teks subtitle Jepang di slot label kecil.

### Twist-nya: dari lukisan ke percetakan

Permukaan cat diganti **cetak dua-tinta yang meleset registrasinya (misregistered print)**, dan ornamen manuskrip diganti **tanda gambar teknik (drafting marks)**. Alasannya: referensinya adalah fantasi tentang dunia yang dilukis; situs ini tentang seseorang yang memisahkan logika murni dari presentasi dan mengujinya headless. Bahasa gambar-teknik-dan-cetak mengatakan itu tanpa sepatah kata pun copy, sambil tetap mempertahankan yang memang disukai pemilik — bidang warna berani di bawah tipografi raksasa. Hasilnya harus terbaca sebagai **lembaran teknis hasil sablon (screen-printed technical broadsheet)**, bukan menu JRPG.

### Resep tekstur

**Misregistrasi** — setiap bidang warna digambar dua kali dari path yang sama, digeser dan dirotasi sedikit, dalam dua tinta (`mix-blend-mode: multiply`, offset 3–6px; lebih besar terlihat seperti kesalahan, lebih kecil tidak terlihat). Overlap menggelap, fringe menampakkan secuil tiap tinta. Ini satu gerakan yang membuat permukaannya terbaca sebagai cetak, bukan cat.

**Kerapatan tinta** — turbulence dipakai sebagai **opacity mask** (bukan displacement seperti tepi robek yang sudah ada) supaya tinta terlihat tipis di beberapa tempat, seperti sablon. Filter displacement lama tetap dipakai untuk tepi robek; ini dilapis di atasnya untuk variasi kerapatan.

**Halftone** — pola titik SVG di area kecil, bukan fill rata. Pakai jarang — satu atau dua elemen per layar, jangan seluruh latar.

**Tanda gambar teknik** — lapisan ornamen pengganti hiasan manuskrip, warna `--parch-dim`, 0.5px, opasitas ~0.35: **registration cross** (`+` dalam lingkaran, 14px, di dua/tiga sudut frame), **garis dimensi** (hairline dengan ujung tick + label monospace berisi angka nyata — lebar viewport, indeks section, jumlah halangan), **grid hairline** (8px, opasitas 0.05, hanya terlihat di atas bidang warna), **label koordinat** (monospace 9px di sudut panel besar, mis. `x:04 y:12`). **Wajib membawa nilai nyata, bukan omong kosong dekoratif** — kalau label bertulis `03/12`, itu karena memang ada dua belas halangan dan ini yang ketiga.

### Tipografi

Satu pergantian yang paling mengubah kesan: slot teks kecil di bawah tiap kata display, yang di referensi berisi bahasa Jepang, di sini berisi **label teknis monospace**. Setiap eyebrow, plate, hint, indeks, dan caption pakai JetBrains Mono, huruf besar, tracking lebar. Ini sendirian menggeser kesan dari "menu game" ke "dokumen rekayasa" tanpa menyentuh tipe display sama sekali.

| Peran | Wajah | Perlakuan |
|---|---|---|
| Display | Bodoni Moda 900 | Kaskade, plate, judul section. Tidak pernah di bawah 40px. |
| Struktural kecil | JetBrains Mono | Semua label, indeks, koordinat, hint, caption |
| Body | Archivo Narrow | Prosa saja: body halangan, about, ringkasan project |

Tiga wajah, tiga tugas, tanpa tumpang tindih. Kalau teksnya bukan prosa, itu monospace.

**Outline:** jangan tiru outline tebal referensi pada tipe display. Sebagai gantinya, saat tipe display duduk di atas bidang warna, potong keluar dari bidang itu memakai teknik XOR mask yang sudah ada. Knockout, bukan outline — keterbacaan sama, tanda tangan berbeda.

### Geometri: aturan garis ukur

Kaskade menu diikat ke **garis ukur vertikal (measurement rule)** di tepi kiri: hairline dengan tick tiap 24px, tiap item menu sejajar ke tick utama berlabel monospace `01`–`05`, garis ini berlanjut ke section dengan tick section aktif terisi ochre. Ini menggantikan rail sebagai elemen dekoratif dengan sesuatu yang terbaca sebagai alat gambar, dan memberi kaskade alasan untuk stagger-nya alih-alih terlihat sembarangan.

### Komposisi per layar (tambahan/override)

- **Title.** Wordmark XOR triangle knockout tetap. Di belakangnya, dua bidang tinta misregistered, bukan cipratan cat. Registration cross di kiri-atas dan kanan-bawah frame. Baris monospace di bawah rule berisi versi build dan tahun. Objek 3D duduk **di belakang dan terpotong tepi frame** — ini slot komposisi yang di referensi ditempati potret karakter, jadi jangan taruh di tengah.
- **Hub.** Kaskade diikat ke garis ukur. Satu bidang tinta misregistered besar di belakang tiga item tengah. Panel identitas kanan-bawah dibatasi garis dimensi, bukan bar skew. Halftone hanya di satu elemen.
- **Battle.** Command fan tetap staggered fan, **bukan** busur radial trigonometris — label dengan panjang bervariasi merusak susunan radial, dan referensinya sendiri memakai stagger. Tambahan: **targeting line** (SVG `<line>` full-screen dari fan aktif ke pusat obstacle terpilih, rust 1px, lingkaran kecil di ujung obstacle, dihitung ulang via `getBoundingClientRect` saat seleksi berubah, disembunyikan di mobile); **name plate skew** (`clip-path: polygon(6% 0, 100% 0, 100% 100%, 0 100%)`, fill rust); **timeline masuk/keluar** saat ganti archetype (obstacle lama `opacity:0, x:40` stagger 0.04s, tukar data, obstacle baru `opacity:1, x:0` dengan `expo.out`, stagger 0.06s). Party panel tetap tiga alat per archetype, **jumlah bukti bukan bar** — `Swift · 3` berarti tiga proyek terkirim, sudah sejalan dengan keputusan c2.

### Ditolak dari proposal radial-menu

Empat nama monster fiksi (Fragmentation Beast dkk.) — nama karangan mengklaim masalah yang belum dibuktikan pemilik; dua belas halangan nyata di §8 masing-masing punya angka atau artefak nyata. Satu halangan per disiplin — meruntuhkan dua belas bukti jadi empat kalimat. `mix-blend-mode: difference` pada teks — sering tak terbaca di atas bidang multi-warna. Bar HP penuh per alat — bar penuh tidak bicara apa-apa. Penempatan radial trigonometris — rusak oleh panjang label bervariasi. Glyph controller L/R/Y untuk tautan cepat — asing bagi yang belum main sumbernya. Magenta/cyan saturasi penuh — sudah ditolak di §3.

### Uji kemiripan

Sebelum mengirim layar apa pun: **jelaskan layarnya ke orang yang belum pernah lihat referensinya. Kalau deskripsinya hanya masuk akal dengan menyebut nama gamenya, paraphrase-nya gagal.**

Deskripsi yang lolos: *lima kata serif raksasa turun menyusuri garis ukur, di atas dua bidang tinta yang meleset registrasinya, dengan indeks monospace dan tanda registrasi.* Deskripsi yang gagal: *seperti menu utama Metaphor tapi krem dan rust.*

Tanda peringatan paraphrase mulai luntur: bidang warna digambar sebagai blob organik alih-alih geometri misregistered; teks kecil di-set serif/sans alih-alih monospace; label drafting membawa nilai dekoratif alih-alih nyata; tipe display mendapat outline tebal; ada sesuatu ditempatkan di slot yang seharusnya potret karakter.

---

## Keputusan Terkunci

Enam keputusan terbuka di MASTER_PROMPT §12 sudah diputuskan. Jangan buka lagi tanpa diminta.

| # | Keputusan | Alasan |
|---|---|---|
| a | Data kontak lengkap, lihat blok **Data Kontak** di bawah | Tidak ada lagi `TODO` kontak. Tetap berlaku: jangan pernah mengarang alamat, URL, atau angka metrik yang belum diberikan. |
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

### Data Kontak (kanonik)

Angkat verbatim ke `content/about.ts`. Ini satu-satunya sumber kebenaran untuk section Contact.

```
GitHub    https://github.com/Dearry12
Email     derry.reisen@gmail.com
Telepon   +62 878-8794-9083
LinkedIn  https://www.linkedin.com/in/derry-meiraldy-137b77372/
```

Tautan email memakai `mailto:`, telepon `tel:+6287887949083`. Tautan eksternal memakai `rel="noopener noreferrer"`.

**Konflik LinkedIn, sudah terselesaikan.** `docs/CONTENT.md` sempat menulis slug berbeda (`linkedin.com/in/derrymeiraldy`, diklaim "terverifikasi dari CV"). Dikonfirmasi ulang di chat: slug yang benar adalah `derry-meiraldy-137b77372`, sama dengan yang sejak awal dipakai `content/about.ts`. Berkas CV di `docs/CONTENT.md` yang usang, bukan datanya.

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

**Fase saat ini: 5.** Fase 4 selesai untuk kriteria "selesai bila"-nya sendiri: title dan hub sudah terbaca sebagai arah §3b (tipografi, XOR wordmark, ink twist, garis ukur, grain), plus wipe GSAP dan drafting-mark index nyata di keempat section sebagai bonus yang juga menyelesaikan sebagian Fase 3. Battle dan threat masih placeholder jujur — command fan, threat field, sigil, party panel, animasi ganti archetype, drafting marks battle (targeting line, name plate skew) semuanya menunggu di sini. Konflik LinkedIn sudah terselesaikan (lihat blok Data Kontak).

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

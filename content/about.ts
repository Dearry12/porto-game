/**
 * About content. `prose` is lifted verbatim from the #about section markup in
 * docs/prototype.html and left unchanged — docs/CONTENT.md adds structured
 * detail (identity, education, experience, awards, interests) rather than
 * replacing that prose with new paragraphs of its own.
 *
 * Everything else below is lifted verbatim from docs/CONTENT.md, which the
 * source file itself describes as numbers "sudah terverifikasi dari CV dan
 * portfolio Academy".
 *
 * LinkedIn: docs/CONTENT.md's CV export gave a different slug
 * (`derrymeiraldy`) than the one below. Re-confirmed directly — the slug here
 * (`derry-meiraldy-137b77372`) is the correct one; the CV export was stale.
 */

import type { AboutContent } from './types';

export const ABOUT: AboutContent = {
  identity: {
    name: 'Derry Meiraldy',
    role: 'Mobile & Web Developer · Peminat Game Development',
    location: 'Pontianak, Indonesia (bersedia relokasi)',
    hubBlurb:
      'Saya membangun produk digital dengan memanfaatkan teknologi yang sudah disediakan platform, bukan menyusun algoritma dari nol. Logika yang bisa salah selalu saya pisahkan ke modul murni yang bisa diuji tanpa layar.',
  },
  prose: [
    'Saya lulusan Informatika Universitas Bina Sarana Informatika di Pontianak. Skripsi saya adalah DomPet, aplikasi keuangan dengan pemindaian struk di perangkat, dan proses itu yang membuat saya berhenti menganggap pengujian sebagai formalitas.',
    'Sejak itu setiap proyek saya susun dengan cara yang sama: logika yang bisa salah dipisahkan ke modul murni, diuji tanpa membuka simulator, lalu antarmuka menempel di atasnya. Cara ini membuat saya bisa pindah antara Swift, TypeScript, dan GDScript tanpa memulai dari nol.',
    'Di luar itu saya main gitar dengan telinga, bukan dengan teori, dan sedang menyusun demo JRPG di Godot.',
  ],
  facts: [
    { label: 'Studio', value: 'Uneed Developer, pengembang mobile dan web' },
    { label: 'Magang', value: 'Diskominfo Provinsi Kalimantan Barat' },
    { label: 'Sertifikasi', value: 'Program Analyst, BNSP' },
  ],
  education: {
    degree: 'Sarjana Informatika',
    institution: 'Universitas Bina Sarana Informatika',
    location: 'Pontianak',
    graduation: 'Wisuda November 2026',
    gpa: 'IPK 3,49 / 4,00',
    thesis:
      'Rancang Bangun Aplikasi Manajemen Keuangan Berbasis Mobile (DomPet) dengan Implementasi Artificial Intelligence Menggunakan Metode RAD.',
  },
  experience: [
    {
      role: 'Magang Web Development',
      org: 'Diskominfo Provinsi Kalimantan Barat',
      period: 'Pontianak · Agustus – Desember 2025',
      description: [
        'Membangun ulang situs web Biro Perekonomian sesuai arsitektur web standar Pemerintah Provinsi Kalimantan Barat.',
        'Mempelajari Hugo dari nol langsung di lapangan, dan menerapkan integrasi situs melalui AWDI, sistem integrasi web terpadu milik provinsi. Penugasan dimulai secara mandiri, lalu berkembang jadi kolaborasi dengan bidang Aptika — pengalaman pertama bekerja di dalam organisasi terstruktur lintas bidang.',
      ],
    },
    {
      role: 'Anggota tim',
      org: 'Uneed Developer (studio pengembang mobile dan web · uneeddeveloper.web.id)',
      period: '',
      description: ['Anggota tim yang membawa Pivot ke juara 3 nasional di Technology Innovative Challenge 9.0.'],
    },
  ],
  academicOther: [
    'Situs Uneed Developer — Next.js 15, React 19, Tailwind v4, Prisma/PostgreSQL, NextAuth.js',
    'Jurnal format JUKTISI — perbandingan Random Forest dan SVM pada Pima Indians Diabetes Dataset, eksperimen scikit-learn nyata, 17 referensi IEEE',
    'Sistem manajemen laundry — Laravel 11, SQLite, metodologi Waterfall, pengujian Black Box',
    'Situs portfolio saat ini — Next.js 15, Tailwind v4, Person schema, sitemap, Google Search Console',
  ],
  awards: [
    'Juara 3 nasional — Technology Innovative Challenge 9.0 (Website Development Competition), Universitas Jember, 2026. Tim Uneed Developer.',
    'Juara 1 — IT Bootcamp, Universitas Bina Sarana Informatika, Juli 2025, untuk sistem monitoring IoT HeatNest Tech.',
    'Sertifikasi Analis Program — BNSP (Badan Nasional Sertifikasi Profesi).',
    'iOS & Swift: The Complete iOS App Development Bootcamp — Udemy (sedang berjalan).',
  ],
  interests: [
    'Game development. Mempelajari dasar C++, bereksperimen dengan Unreal Engine dan Blender, dan membuat game sederhana sendiri.',
    'Berbagi ilmu. Rutin membantu teman kuliah yang mulai belajar coding.',
    'Musik. Anggota paduan suara mahasiswa, dan main gitar dengan telinga bukan dengan teori.',
  ],
  contact: [
    { label: 'Email', href: 'mailto:derry.reisen@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Dearry12' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/derry-meiraldy-137b77372/' },
    { label: 'Telepon', href: 'tel:+6287887949083' },
  ],
};

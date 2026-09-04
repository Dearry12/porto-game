/**
 * About content, translated from docs/CONTENT.md and docs/prototype.html —
 * see CLAUDE.md's Konten section for the language decision. `prose` traces
 * back to the #about section markup in docs/prototype.html; everything else
 * to docs/CONTENT.md, which describes its own numbers as "verified from the
 * CV and Academy portfolio". Institution and agency names (Universitas Bina
 * Sarana Informatika, Diskominfo Provinsi Kalimantan Barat) are kept as
 * proper nouns rather than translated — translating an official name risks
 * being simply wrong. The thesis title is a translation of the formal
 * Indonesian title for this site; the actual diploma/transcript will still
 * read the original Indonesian.
 *
 * LinkedIn: docs/CONTENT.md's CV export gave a different slug
 * (`derrymeiraldy`) than the one below. Re-confirmed directly — the slug here
 * (`derry-meiraldy-137b77372`) is the correct one; the CV export was stale.
 */

import type { AboutContent } from './types';

export const ABOUT: AboutContent = {
  identity: {
    name: 'Derry Meiraldy',
    role: 'Mobile & Web Developer · Game Development Enthusiast',
    location: 'Pontianak, Indonesia (open to relocation)',
    hubBlurb:
      'I build digital products by using the technology platforms already provide, rather than writing algorithms from scratch. Logic that can be wrong is always separated into pure modules that can be tested without a screen.',
  },
  prose: [
    "I'm an Informatics graduate from Universitas Bina Sarana Informatika in Pontianak. My thesis was DomPet, a finance app with on-device receipt scanning, and that process is what made me stop treating testing as a formality.",
    "Since then I've structured every project the same way: logic that can be wrong gets separated into pure modules, tested without opening a simulator, and the interface attaches on top of it afterward. This is what lets me move between Swift, TypeScript, and GDScript without starting from zero.",
    "Outside of that I play guitar by ear rather than by theory, and I'm currently building a JRPG demo in Godot.",
  ],
  facts: [
    { label: 'Studio', value: 'Uneed Developer, mobile and web developer' },
    { label: 'Internship', value: 'Diskominfo Provinsi Kalimantan Barat' },
    { label: 'Certification', value: 'Program Analyst, BNSP' },
  ],
  education: {
    degree: 'Bachelor of Informatics',
    institution: 'Universitas Bina Sarana Informatika',
    location: 'Pontianak',
    graduation: 'Graduating November 2026',
    gpa: 'GPA 3.49 / 4.00',
    thesis:
      'Design and Development of a Mobile-Based Financial Management Application (DomPet) with Artificial Intelligence Implementation Using the RAD Method.',
  },
  experience: [
    {
      role: 'Web Development Intern',
      org: 'Diskominfo Provinsi Kalimantan Barat',
      period: 'Pontianak · August – December 2025',
      description: [
        "Rebuilt the Bureau of Economic Affairs website to match the West Kalimantan Provincial Government's standard web architecture.",
        "Learned Hugo from scratch on the job, and implemented site integration through AWDI, the province's unified web integration system. The assignment started solo and grew into a collaboration with the Aptika division — my first experience working inside a structured, cross-division organization.",
      ],
    },
    {
      role: 'Team member',
      org: 'Uneed Developer (mobile and web development studio · uneeddeveloper.web.id)',
      period: '',
      description: ['Team member who helped bring Pivot to 3rd place nationally at Technology Innovative Challenge 9.0.'],
    },
  ],
  academicOther: [
    'Uneed Developer site — Next.js 15, React 19, Tailwind v4, Prisma/PostgreSQL, NextAuth.js',
    'JUKTISI-format journal paper — a Random Forest vs. SVM comparison on the Pima Indians Diabetes Dataset, real scikit-learn experiments, 17 IEEE references',
    'Laundry management system — Laravel 11, SQLite, Waterfall methodology, Black Box testing',
    'The current portfolio site — Next.js 15, Tailwind v4, Person schema, sitemap, Google Search Console',
  ],
  awards: [
    '3rd place nationally — Technology Innovative Challenge 9.0 (Website Development Competition), Universitas Jember, 2026. Team Uneed Developer.',
    '1st place — IT Bootcamp, Universitas Bina Sarana Informatika, July 2025, for the HeatNest Tech IoT monitoring system.',
    'Program Analyst Certification — BNSP (National Professional Certification Agency).',
    'iOS & Swift: The Complete iOS App Development Bootcamp — Udemy (in progress).',
  ],
  interests: [
    'Game development. Learning the basics of C++, experimenting with Unreal Engine and Blender, and building simple games on my own.',
    'Sharing knowledge. Regularly helping classmates who are starting to learn to code.',
    'Music. Member of a student choir, and I play guitar by ear rather than by theory.',
  ],
  contact: [
    { label: 'Email', href: 'mailto:derry.reisen@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Dearry12' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/derry-meiraldy-137b77372/' },
    { label: 'Phone', href: 'tel:+6287887949083' },
  ],
};

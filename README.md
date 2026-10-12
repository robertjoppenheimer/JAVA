# Java Solutions — IT Services Website

Corporate website for **Java Solutions**, an IT services company providing end-to-end technology solutions for local and international businesses.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animation | Framer Motion 14 |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |

## Local Development

### Prerequisites
- Node.js 18+ (Node.js 20 LTS recommended)
- npm (included with Node.js)

### Setup & Run

```bash
# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About Us page
│   ├── services/
│   │   ├── page.tsx        # Services index
│   │   └── [slug]/page.tsx # Individual service pages
│   ├── projects/page.tsx   # Projects page
│   ├── contact/page.tsx    # Contact / consultation form
│   ├── privacy/page.tsx    # Privacy policy
│   └── terms/page.tsx      # Terms of service
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Responsive header + mobile menu
│   │   └── Footer.tsx      # Footer with service links
│   ├── home/               # Homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── WhyWorkWithUsSection.tsx
│   │   ├── HowWeWorkSection.tsx
│   │   ├── FeaturedSolutionsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SupportCTASection.tsx
│   │   └── ConsultationCTASection.tsx
│   └── ui/
│       ├── Logo.tsx         # Custom SVG logo
│       └── SectionHeading.tsx
├── data/
│   ├── services.ts          # All 7 service definitions
│   └── projects.ts          # Illustrative project examples
└── app/globals.css          # Tailwind v4 theme + global styles
```

## Services

1. IT Infrastructure & System Administration
2. Networking Solutions
3. Cloud Solutions & AWS
4. Odoo ERP Solutions
5. Web Development
6. IT Support & Maintenance
7. Cybersecurity

## Design System

| Token | Value |
|---|---|
| Background | `#07111F` |
| Surface | `#10243B` |
| Primary Blue | `#1688D4` |
| Cyan Accent | `#42B9FF` |
| Main Text | `#F3F7FC` |
| Muted Text | `#A9B9CC` |

## Notes

- Project examples on the Projects page are **illustrative scenarios**, not real client work.
- Contact form is a client-side UI only — no backend connected yet.
- Contact details (email, phone, address) are placeholders pending company confirmation.

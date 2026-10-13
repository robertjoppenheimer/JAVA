# Autocratic — Enterprise IT Solutions

Official website for **Autocratic**, an enterprise IT services consultancy providing end-to-end technology solutions across infrastructure, networking, cloud architecture, Odoo ERP, and software engineering.

- **Production Origin**: `https://autocratic.in`
- **Preferred Canonical Hostname**: `autocratic.in`

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
- Node.js 18+ (Node.js 20+ LTS recommended)
- npm (included with Node.js)

### Setup & Run

```bash
# Install dependencies
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
│   ├── layout.tsx          # Root layout (Metadata, Schema, Header, Footer)
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Production sitemap generator
│   ├── robots.ts           # Production robots.txt generator
│   ├── not-found.tsx       # Branded 404 page
│   ├── about/page.tsx      # About page
│   ├── services/
│   │   ├── page.tsx        # Services index
│   │   └── [slug]/page.tsx # Individual service pages
│   ├── projects/page.tsx   # Architectural blueprints & scenarios
│   ├── contact/page.tsx    # Consultation request form
│   ├── api/contact/route.ts# Validated consultation API route
│   ├── privacy/page.tsx    # Privacy policy
│   └── terms/page.tsx      # Terms of service
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Responsive header + mobile drawer
│   │   └── Footer.tsx      # Editorial footer with navigation
│   ├── home/               # Homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── HeroVisualComposition.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── WhyWorkWithUsSection.tsx
│   │   ├── HowWeWorkSection.tsx
│   │   ├── FeaturedSolutionsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SupportCTASection.tsx
│   │   └── ConsultationCTASection.tsx
│   ├── theme/              # Dark/light theme provider & toggle
│   └── ui/
│       ├── Logo.tsx        # Custom architectural SVG monogram & wordmark
│       ├── CustomCursor.tsx# Subtle interactive cursor
│       └── EditorialCanvas.tsx
├── data/
│   ├── services.ts         # All 7 core service definitions
│   └── projects.ts         # Architectural blueprints & demonstration scenarios
└── app/globals.css         # Tailwind v4 theme + dark/light color tokens
```

## Services

1. IT Infrastructure & System Administration
2. Networking Solutions
3. Cloud Solutions & AWS
4. Odoo ERP Solutions
5. Web Development
6. IT Support & Maintenance
7. Cybersecurity

## Production Deployment & Webhooks

- **Hosting**: Vercel (Next.js App Router optimized).
- **Consultation Form Intake**: Handled by `/api/contact`. Server-side validation with rate-limiting and bot mitigation. Forwarding to external webhook endpoints (Slack, Discord, CRM) is enabled via the `CONTACT_WEBHOOK_URL` environment variable.

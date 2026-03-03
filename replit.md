# A-Team Repair Solutions — Installation & Repair Business Website

## Project Overview
Full-stack customer-facing web app for A-Team Repair Solutions, a professional installation and repair business serving the Philadelphia metro area. Services structured as outcome-based packages covering moving day setup, home office/workout rooms, entertainment & sound, bathroom renovations, kitchen transformations, and basement conversions — plus a detailed 11-category itemized pricing catalog.

## Architecture

### Tech Stack
- **Frontend**: React + Vite + TypeScript + Wouter (routing) + TanStack Query
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL via Drizzle ORM
- **UI**: Shadcn/ui components + Tailwind CSS
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2 + gpt-image-1)

### Color & Design System
- **Gold**: `#C9A84C` (used as inline style, tailwind: `gold`)
- **Charcoal Dark**: `#111113` (tailwind: `charcoal-dark`)
- **Charcoal**: `#1C1C1E` (tailwind: `charcoal`)
- **Cream**: `#FAF8F4` (tailwind: `cream`)
- **Font**: Playfair Display for headings (`font-display`), Open Sans for body

## Pages & Routes
- `/` — Homepage: hero, stats, services overview (10 package/service tiles), philosophy, gallery preview, testimonials, articles preview, CTA
- `/services` — 6 outcome packages + 8-category itemized pricing catalog + "Why Packages?" section
- `/gallery` — Before/after gallery with category filter and lightbox
- `/articles` — SEO articles with search and category filter
- `/articles/:slug` — Individual article detail with related articles
- `/show-my-space` — Lead capture form (name, email, phone, service, space description)
- `/schedule` — Video estimate booking form (Google Meet based)
- `/visualizer` — AI Space Visualizer (OpenAI image generation "Fun Magnet")

## Service Packages (6 Outcome-Based)
1. **Moving Day Peace of Mind** — $300–$800 (Quick Win tier)
2. **Home Office / Workout Room** — $500–$1,800 (Quick Win tier)
3. **Entertainment & Sound System** — $850–$2,500 (Mid-Ticket tier)
4. **Bathroom Renovation** — $1,200–$5,000+ (Mid-Ticket tier)
5. **Kitchen Transformation** — $2,000–$8,000+ (Premium tier)
6. **Basement Conversion** — $3,500–$12,000+ (Premium tier)

## Itemized Pricing Catalog (11 Categories)
- Moving Day Services (MV-A/B/C)
- Entertainment & Speaker Systems (AV-A/B/C)
- Lighting & Electrical (LG-A/B/C/D)
- Bathrooms & Plumbing (BR-A/B/C/D/E)
- Kitchen & Countertops (KT-A/B/C/D)
- Custom Finishes & Surfaces (CF-A/B/C/D/E) — epoxy, reclaimed wood, tile, stone, restorations
- Flooring & Walls (FW-A/B/C/D/E) — paint, wallpaper removal, floor sanding, carpet steaming, LVP
- Built-Ins & Organization (BO-A/B/C)
- Windows, Blinds & Exterior (WE-A/B/C/D)
- Room Conversions (RC-A/B/C/D)
- Drywall & Repairs (DW-A/B/C)

## SEO & Performance
- **Dynamic page titles**: `useDocumentTitle` hook (`client/src/hooks/useDocumentTitle.ts`) sets unique `<title>` per page
- **robots.txt**: `client/public/robots.txt` — allows all crawlers
- **sitemap.xml**: `client/public/sitemap.xml` — lists all public routes
- **Lazy loading**: All gallery and project images use `loading="lazy"`
- **Accessible gallery dialog**: Uses `DialogTitle` (sr-only) and `aria-describedby`
- **Service-to-booking flow**: "Book This Package" on Services passes `?service=` param to Schedule, auto-filling the service dropdown
- **Mobile pricing catalog**: Pricing table stacks vertically on small screens

## Key Files
- `client/src/App.tsx` — Main router with all page routes
- `client/src/components/Navbar.tsx` — Fixed top navigation
- `client/src/hooks/useDocumentTitle.ts` — Dynamic SEO page title hook
- `client/src/pages/` — All page components
- `server/routes.ts` — All API endpoints + database seed function
- `server/storage.ts` — DatabaseStorage class implementing IStorage
- `shared/schema.ts` — All Drizzle schemas, insert schemas, and types

## Database Tables
- `users` — Auth users (varchar UUID id)
- `leads` — Show My Space form submissions
- `gallery_items` — Before/after gallery images
- `articles` — Blog/how-to articles
- `video_estimates` — Video estimate bookings
- `testimonials` — Client testimonials

## API Endpoints
- `POST /api/leads` — Create lead from Show My Space form
- `GET /api/gallery` — Get all gallery items (optional ?category= filter)
- `GET /api/articles` — Get all articles
- `GET /api/articles/:slug` — Get single article by slug
- `POST /api/estimates` — Create video estimate booking
- `GET /api/testimonials` — Get all testimonials
- `POST /api/visualize` — AI space visualization (OpenAI gpt-5.2 text + gpt-image-1 image)

## AI Integration
Uses Replit AI Integrations for OpenAI (no user API key needed — billed to Replit credits):
- `AI_INTEGRATIONS_OPENAI_API_KEY` — auto-set by integration
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — auto-set by integration
- Text: `gpt-5.2` model for space visualization descriptions
- Image: `gpt-image-1` model for concept renders

## Gallery Images
Located at `client/public/images/`:
- `hero-bg.png` — Homepage hero background
- `gallery-1-before/after.png` through `gallery-5-after.png`

## Business Info
- **Phone**: (215) 303-4494
- **Service Area**: Philadelphia, NE Philly, Bucks County, Montgomery County, Delaware County
- **Video Estimates**: Google Meet (placeholder: https://meet.google.com/new)

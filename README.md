# HYDRA FITNESS website

A responsive marketing website for HYDRA FITNESS, built with React, Vite, TypeScript, Motion, Lucide, and custom CSS. The site is a static single-page build with anchor navigation and no backend.

## Run locally

Requirements: Node.js 22 (see `.nvmrc`). Vite 8 requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. `dist/` and `node_modules/` are excluded from Git.

## Deploy to Cloudflare Pages

The site is ready for Cloudflare Pages. Deployment uses Git integration, so every push to `main` creates a production deployment and other branches create preview deployments. No server adapter, redirects, or SPA fallback is required.

### 1. Push the repository to GitHub

Git is initialised locally on `main`. After creating an empty GitHub repository, run:

```bash
git remote add origin https://github.com/<your-username>/<repository-name>.git
git push -u origin main
```

To use SSH instead:

```bash
git remote add origin git@github.com:<your-username>/<repository-name>.git
git push -u origin main
```

### 2. Create the Cloudflare Pages project

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Open **Workers & Pages** and choose **Create**.
3. Select **Pages**, then **Connect to Git**.
4. Authorise GitHub if prompted and select the HYDRA FITNESS repository.
5. Enter a project name. This name determines the free `pages.dev` address, for example `hydra-fitness-website`.
6. Set the production branch to `main`.
7. Use the build settings in the table below.
8. Choose **Save and Deploy** and wait for the first build to finish.

### 3. Exact build settings

| Setting | Value |
| --- | --- |
| Framework preset | **Vite** (or **None** if Vite is not listed) |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave blank (repository root) |
| Environment variables | None required |
| Node version | `22` (read from `.nvmrc`; optionally set `NODE_VERSION=22`) |

Do not set the output directory to `dist/` with a leading slash, and do not add a deploy command. Cloudflare installs dependencies, runs the build command, and publishes the output directory.

### 4. Live URLs

- Production: `https://<project-name>.pages.dev`
- Example if the project is named `hydra-fitness-website`: `https://hydra-fitness-website.pages.dev`
- Branch preview: `https://<branch-name>.<project-name>.pages.dev`

A custom domain can be added later under **Pages → your project → Custom domains**. If `hydrafitness.in` is connected, configure its DNS in Cloudflare and keep the existing canonical domain.

### 5. Required domain update after the first deployment

The SEO files currently reference `https://hydrafitness.in/`. If the site is launched on a `pages.dev` address instead of that custom domain, update these references before promoting the deployment:

- `index.html`: `<link rel="canonical">`, `og:url`, the JSON-LD `url`, and the JSON-LD `logo`
- `public/robots.txt`: the `Sitemap:` line
- `public/sitemap.xml`: the `<loc>` value

Then rebuild and push so Cloudflare redeploys:

```bash
npm run build
git add index.html public/robots.txt public/sitemap.xml
git commit -m "Point SEO metadata at the production domain"
git push
```

### 6. Post-deployment verification

Replace `<project-name>` with the actual Cloudflare Pages project name.

```powershell
$base = "https://<project-name>.pages.dev"
"/", "/favicon.svg", "/robots.txt", "/sitemap.xml",
"/images/hero-gym-640.webp", "/images/hero-gym-960.webp", "/images/hero-gym-1280.webp" |
  ForEach-Object { "$_ -> " + (Invoke-WebRequest "$base$_" -UseBasicParsing).StatusCode }
```

Then check in a browser at mobile (about 390 px) and desktop widths:

- The 3D hero, photography, gallery, and footer render correctly.
- DM Sans and Playfair Display load from Google Fonts; fallback fonts remain readable if they do not.
- The sticky WhatsApp button opens `https://wa.me/917842797909` with a pre-filled message.
- The free-trial form opens WhatsApp with name, phone, preferred date/time, and fitness goal pre-filled. The visitor must press **Send** in WhatsApp.
- The enquiry form opens WhatsApp with name, phone, interest, and message pre-filled. The visitor must press **Send** in WhatsApp.
- The email links open `mailto:hydrafitness777@gmail.com`.
- The map iframe loads and the directions link opens Google Maps for the Guntur address.
- Navigation, anchor links, mobile menu, keyboard focus, and reduced-motion mode work.
- `robots.txt` and `sitemap.xml` load over HTTPS and reference the final domain.

The CSS and JavaScript filenames are content-hashed under `dist/assets/`, so they can be cached safely.

## Content and launch checklist

Shared content lives in `src/content.ts` — including the WhatsApp number, contact details, plans, trainers, testimonials, and gallery images.

1. Current contact details use the A.N.U University address in Guntur, both phone numbers, and `hydrafitness777@gmail.com`; confirm them before launch.
2. The sticky "Chat with HYDRA" button and both forms open WhatsApp with a pre-filled message. Nothing is submitted or stored by the site; the visitor presses Send manually.
3. Replace the Unsplash demo photos with approved HYDRA FITNESS photography. The hero image is stored locally in `public/images/` in three responsive sizes for performance; replace those files along with the remaining demo photography.
4. The location section uses a Google Maps address search for "Opp. A.N.U University, RTPDK Villa Road, Guntur" — an area map rather than an exact business pin. If available, replace `contact.mapEmbed` and `contact.directions` with the gym's Google Business Profile embed and update `contact.mapNote`.
5. Confirm membership prices, the additional ₹200 trial visit, opening hours, and social links. The first visit is presented as free. Trainer names, biographies, and testimonials are sample content; replace them with approved team and member stories before publishing.
6. Add a privacy policy and terms if needed.

## Features

- Sticky WhatsApp CTA with a pre-filled message on desktop and mobile.
- Location section with address, Google Maps embed, opening hours, phone, and email.
- Free-trial booking form that composes a complete WhatsApp message.
- Three testimonial cards and three trainer profiles.
- Responsive editorial image gallery.
- Scroll reveals, hover interactions, and a `prefers-reduced-motion` fallback.
- SEO metadata, Open Graph/Twitter cards, descriptive alt text, `HealthClub` structured data, `robots.txt`, and an XML sitemap.
- Local responsive WebP hero images and non-blocking Google Fonts loading.

## Notes

- The marketing website is separate from the HYDRA FITNESS Flutter application and its backend.
- External Google Fonts and Unsplash images require an internet connection.
- No admin dashboard, member login, payment processing, or membership management is included.
- After deployment, the canonical URL, Open Graph URL, structured-data domain, `robots.txt`, and `sitemap.xml` must match the final production domain.

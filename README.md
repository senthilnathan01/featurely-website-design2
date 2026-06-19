# Featurely AI Website

A static, SEO-first landing page for Featurely AI. The visual concept turns the
company's explainable behavioral model into a minimal, scroll-driven causal
brain: perception, context, memory, bias, motivation, and choice progressively
converge on one inspectable outcome.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm test
npm run build
```

## Content and design assumptions

- This is a new homepage concept built from Featurely's public website content as
  of June 4, 2026.
- Existing public claims, research links, product links, and team information were
  preserved rather than invented.
- Primary CTA routes to the existing Featurely signup flow. Enterprise studies
  route to the existing public calendar link.
- The reference layout informed the progressive assembly interaction and editorial
  pacing. The visual subject, content architecture, copy, SVG decision engine, and
  responsive behavior are original to Featurely.

## SEO

- Crawlable semantic HTML with one H1 and descriptive section headings
- Canonical URL, Open Graph, Twitter card, robots, sitemap, manifest, and JSON-LD
- Organization, website, and software application structured data
- Accessible navigation, skip link, descriptive labels, and reduced-motion support

## Files

- `index.html`: page content, metadata, structured data, and decision-engine SVG
- `styles.css`: visual system, responsive layout, and motion
- `main.js`: progressive model assembly, mobile menu, tabs, and reveal behavior
- `scripts/site.test.mjs`: dependency-free structural and SEO checks
- `design/featurely-home-concept.png`: generated visual direction reference

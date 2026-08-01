# Goddess Alchemy

Spiritual counselling, tarot reading, and healing website built with [Eleventy](https://www.11ty.dev/) and [Contentful](https://www.contentful.com/), deployed on [Netlify](https://www.netlify.com/).

## Local Development

### Prerequisites

- Node.js 18+

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/VegaFromLyra/goddess-alchemy.git
   cd goddess-alchemy
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy the environment file and fill in your Contentful credentials:

   ```sh
   cp .env.example .env
   ```

4. Start the dev server:

   ```sh
   npm start
   ```

   The site will be available at `http://localhost:8080`.

If Contentful credentials are not configured, the site falls back to hardcoded sample data so you can develop without CMS access.

### Build

```sh
npm run build
```

Output is written to `dist/`.

## Contentful Content Types

The CMS integration fetches the following content types at build time:

| Content Type | Description |
|---|---|
| `service` | Individual service offerings (tarot, reiki, etc.) |
| `package` | Service bundles and programmes |
| `testimonial` | Client testimonials |
| `faq` | Frequently asked questions |
| `galleryItem` | Visual gallery entries |

Each content type supports a `sortOrder` field to control display order.

## Deployment

The site is deployed on Netlify. Pushes to `main` trigger an automatic build.

### Environment Variables

Set these in **Netlify > Site configuration > Environment variables**:

| Variable | Description |
|---|---|
| `CONTENTFUL_SPACE_ID` | Your Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful Content Delivery API access token |

### Contentful Webhooks (Optional)

To rebuild the site automatically when content changes in Contentful:

1. In Netlify, go to **Site configuration > Build & deploy > Build hooks** and create a build hook.
2. In Contentful, go to **Settings > Webhooks** and add a new webhook pointing to the Netlify build hook URL.

## Project Structure

```
src/
├── _data/
│   ├── contentful.js   # Contentful data fetching + fallback data
│   └── site.js         # Site-wide settings (URL, etc.)
├── _includes/
│   ├── base.njk        # Base HTML layout
│   ├── nav.njk         # Navigation
│   └── footer.njk      # Footer
├── index.njk           # Homepage
├── services.njk        # Services & pricing
├── gallery.njk         # Gallery & testimonials
├── contact.njk         # Contact / booking
├── sitemap.njk         # XML sitemap (generated)
├── robots.njk          # robots.txt (generated)
├── styles.css          # Stylesheet
└── script.js           # Client-side JavaScript
```

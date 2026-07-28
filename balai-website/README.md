# BALAI Website V1

A domain-ready static commercial website for BALAI.

## Included

- Premium responsive storefront
- Editable product catalogue
- Service sales and proposal enquiries
- Local basket with quantity controls
- Order-enquiry workflow
- Mobile navigation
- SEO and social metadata
- PWA manifest
- Latest BALAI vector identity
- No framework or build process required

## Before launch

Edit `config.js`:

1. Replace `replace-me@yourdomain.com` with the real BALAI email.
2. Confirm product names, descriptions, inventory and prices.
3. Replace the generated product mockups with final photography when available.
4. Connect a real payment provider if direct online payment is required.

The current checkout creates an order enquiry rather than collecting payment.
This is deliberate because no Stripe, Paytrail, Shopify or other payment
account has been provided.

## Deployment

Upload the contents of `balai-website` to:

- Cloudflare Pages
- GitHub Pages
- Netlify
- Vercel
- Any conventional static web host

Use `index.html` as the site entry file.

## Custom domain

Point the domain or subdomain to the hosting provider. Recommended structure:

- `yourdomain.com` — public BALAI website
- `crm.yourdomain.com` — private BALAI CRM

## Editing products

Each product in `config.js` has:

- id
- name
- subtitle
- category
- price
- unit
- image
- accent
- description

Prices use EUR and the Finnish `fi-FI` locale by default.

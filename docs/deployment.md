# Deployment and security headers

## Express production server

The Express static server in `server/index.ts` uses Helmet to set production security headers.
When `NODE_ENV=production`, the server applies:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `X-Frame-Options` / `frame-ancestors`
- `Permissions-Policy`

Helmet is enabled before static file serving so all responses from the app receive the configured headers.

### Helmet header configuration

- `default-src 'self'`
- `script-src 'self'`
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data:`
- `connect-src 'self'`
- `font-src 'self'`
- `object-src 'none'`
- `base-uri 'self'`
- `frame-ancestors 'none'`
- `form-action 'self'`
- `upgrade-insecure-requests`

HSTS is enabled only in production with a one-year max-age and subdomain coverage.
This assumes HTTPS is configured at the hosting layer.

## Static hosting

Preferred v1 deployment for `vibedeploy.victornwoke.com` is Azure Static Web Apps.
The app is a browser-first React SPA with no backend API routes required for MVP.

### Azure Static Web Apps

Use the static Vite output in `dist/public` and include `staticwebapp.config.json`
for SPA fallback and global response headers.

- Build output path: `dist/public`
- SPA fallback: `navigationFallback` rewrites unknown routes to `/index.html`
- Global headers: configured in `staticwebapp.config.json`
- HTTPS is automatic on Azure Static Web Apps

### When to keep Express

The Express server in `server/index.ts` is only required if you want to self-host a
Node process or if a future backend is needed.
For v1, keep the Express server as an alternate deployment path, not the primary one.

- Static deployment is cleaner, simpler, and faster for the current MVP
- Express deployment adds operational overhead and is not required today
- If Express is used later, the same Helmet headers should be preserved in production

### Vercel alternative

Vercel is a valid preview or alternative host if Azure Static Web Apps is not available.
Use a `vercel.json` file with SPA route fallback and headers if you choose
Vercel later.

### Supabase decision

Do not add Supabase to MVP.
Supabase is a candidate for Version 2 only, for:

- lead capture
- saved reports
- user accounts
- admin dashboard
- audit request tracking

If Supabase is added later:

- enable row-level security (RLS) on every table
- never expose private service keys in frontend code
- keep client-side config limited to public anon keys only

### Environment variables required for production

- `VITE_FORMSPREE_CONTACT_FORM_ID` — the public Formspree form ID used by the
  contact form. Add this to the hosting provider's environment configuration.

## DNS and custom domain

For production deployment, point `vibedeploy.victornwoke.com` at the selected hosting
provider. Keep `victornwoke.com` as the main portfolio domain.
Do not move the portfolio to `portfolio.victornwoke.com`.

- Azure Static Web Apps: configure the custom domain in the Azure portal
- Vercel: configure the domain in Vercel and add the required DNS CNAME/A records

## Notes

- The Express server is intended for production use only when running the bundled
  `dist/index.js` file.
- Header enforcement is set in the app, but HTTPS and domain-level security remain
  the responsibility of the hosting environment.

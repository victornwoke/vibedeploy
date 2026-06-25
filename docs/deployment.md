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

For static deployments on GitHub Pages, Vercel, Azure Static Web Apps, Netlify, or similar hosts, configure equivalent security headers at the hosting layer if the platform supports them.

- GitHub Pages: use a proxy/service or cloud front to inject headers.
- Vercel: use `headers()` in `vercel.json` or platform settings.
- Azure Static Web Apps: use `staticwebapp.config.json` or Azure front door headers.
- Netlify: use `_headers` or Netlify configuration.

Do not rely on `vite preview` as a production server.

## Notes

- The Express server is intended for production use only when running the bundled `dist/index.js` file.
- Header enforcement is set in the app, but HTTPS and domain-level security remain the responsibility of the hosting environment.

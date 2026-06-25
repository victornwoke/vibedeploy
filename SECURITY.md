# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in VibeDeploy, please report it by emailing hello@victornwoke.com.

## Security Context

VibeDeploy is a client-side application that helps AI app builders assess production readiness. The application:

- **Does not scan GitHub repositories** - All scores are based on self-reported answers only
- **Does not collect personal data** - No backend database or analytics by default
- **Does not expose infrastructure** - Uses a static Express server

## Known Security Considerations

### Report Data in URLs

When users complete the checker, their answers are encoded in the report URL
(e.g., `/report?answers=...`). This is intentional for shareability but means:

- Report URLs may contain sensitive information about your infrastructure
- Anyone with the URL can view the report
- Reports are not encrypted

**Recommendation**: Treat report URLs as semi-private. Avoid sharing links that contain answers about your production environment.

### Local Storage

The checker form state (answers and email) is persisted in `localStorage`:

- Data persists indefinitely without expiration
- Email addresses are stored unencrypted
- Clearing browser storage resets the checker

**Recommendation**: Users concerned about privacy should clear localStorage or use private browsing mode.

### Contact Form

The contact form currently simulates submission with a mailto fallback. No data
is actually sent to a backend.

## Security Headers

For production deployment to vibedeploy.victornwoke.com, the following headers
should be configured at the reverse proxy/load balancer level:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## Dependency Security

Run `pnpm audit` regularly to check for vulnerabilities in dependencies.
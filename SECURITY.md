# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in VibeDeploy, please report it by emailing hello@victornwoke.com.

## Security Context

VibeDeploy is a client-side application that helps AI app builders assess production readiness. The application:

- **Does not scan GitHub repositories** - All scores are based on self-reported answers only
- **Does not collect personal data** - No backend database or analytics by default
- **Does not expose infrastructure** - Uses a static Express server

## Known Security Considerations

### Report Data

The current MVP does not encode questionnaire answers in the report URL. Final report data is stored temporarily in browser session storage for the active session.

- Answers are kept in-memory during the session
- Final report state is preserved only in `sessionStorage`
- No report data is shared via query strings

**Recommendation**: Do not enter secrets into the report form and close the
browser tab when finished.

### Local Storage

This application does not persist checker answers or email to `localStorage`.
Only a small theme preference is stored in `localStorage` for UI convenience.

- Checker answers are kept in memory and session storage only
- Email is not persisted across browser sessions
- Clearing browser storage or closing the tab resets report state

**Recommendation**: Use private browsing if you want to avoid storing any theme
preference locally.

### Contact Form

The contact form currently simulates submission with a mailto fallback. No data
is actually sent to a backend.

## Security Headers

For production deployment to vibedeploy.victornwoke.com, the following headers
should be configured at the reverse proxy/load balancer level:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## Dependency Security

Run `pnpm audit` regularly to check for vulnerabilities in dependencies.
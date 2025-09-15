# Rob Knowlton Website

Modern Next.js website for AI & Systems Solutions Architecture services.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.local` and configure:

```bash
# Required for contact form
SMTP_HOST=your-smtp-host
SMTP_USER=your-email
SMTP_PASS=your-password
CONTACT_EMAIL=your-contact-email

# Optional
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Build & Deploy

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 15 with Turbopack
- TypeScript
- Tailwind CSS
- Nodemailer
- Zod validation

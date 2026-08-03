# Sister's Wedding — Guest Website

A simple, elegant static website for sharing wedding details with guests: schedule, venue & travel info, photo gallery, and an RSVP form.

## Structure

```
index.html               Main page (all sections)
assets/css/style.css     Styling
assets/js/script.js      Countdown timer, mobile nav, RSVP handling
guests-template.csv      Template for your own guest-list tracking (not shown on the site)
```

## What to customize

Everything guest-facing is placeholder text in `index.html`, marked like `[Venue Name]` or `[Date]`. Replace:

- **Names & date** — `<title>`, hero section, footer
- **Countdown** — set the real date/time in `data-wedding-date` on the `#countdown` div (ISO format, e.g. `2026-12-12T10:00:00`)
- **Schedule** — one `.timeline-item` per event (Mehendi, Haldi, Sangeet, Wedding, Reception)
- **Venue & Travel** — address, Google Maps link, airport/station distances, hotel recommendations
- **Gallery** — replace `.gallery-item.placeholder` divs with `<img src="assets/img/your-photo.jpg" alt="...">`. Add photos to `assets/img/`.
- **Contact** — names, phone, email

## RSVP form

Right now the RSVP form (in `#rsvp`) opens the guest's email app with a pre-filled message (no backend needed). To make it work, replace `REPLACE_WITH_YOUR_EMAIL@example.com` in `assets/js/script.js` with your real email address.

If you'd rather have responses land directly in your inbox without relying on the guest's email client, you have two easy no-cost options:

1. **Formspree** (recommended, free tier): sign up at formspree.io, get a form endpoint, then change the `<form>` tag in `index.html` to:
   ```html
   <form class="rsvp-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and remove the JS submit handler in `script.js` (or leave it — Formspree works with a plain HTML POST).
2. **Google Form**: create a Google Form with the same fields and either link to it from the RSVP button, or embed it with an `<iframe>`.

## Guest list

`guests-template.csv` is a starting template for tracking your own guest list (names, contacts, party size, RSVP status) — open it in Excel/Google Sheets. It's for your own bookkeeping and isn't published on the site (keeps guest contact details private). Send me your real guest list whenever it's ready and I can help load it in or wire up guest-specific features (e.g. RSVP lookup by name).

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying (when ready)

Free options: GitHub Pages, Netlify, or Vercel — all can host this as-is since it's a static site. Let me know when you're ready and I can set it up.

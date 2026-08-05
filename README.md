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
- **Countdown** — edit the `upcomingEvents` array at the top of `assets/js/script.js`. It automatically counts down to whichever event is soonest and switches to the next one once the current one passes (e.g. it'll move from Ring Ceremony to Mehendi once 31 Aug passes). Add one `{ name: '...', date: 'YYYY-MM-DDTHH:MM:SS' }` entry per event as dates get confirmed.
- **Schedule** — one `.timeline-item` per event (Mehendi, Haldi, Sangeet, Wedding, Reception)
- **Venue & Travel** — address, Google Maps link, airport/station distances, hotel recommendations
- **Gallery** — replace `.gallery-item.placeholder` divs with `<img src="assets/img/your-photo.jpg" alt="...">`. Add photos to `assets/img/`.
- **Contact** — names, phone, email

## Guest Details form

The form (in `#rsvp`) collects: name, phone (required), email (optional), guest count, and whether they're coming from Kolkata or outside. If "Outside Kolkata" is selected, it reveals extra fields for transport mode, ticket details, ID proof number, and an ID proof photo upload.

Right now it opens the guest's email app with a pre-filled message (no backend needed). To make it work, replace `REPLACE_WITH_YOUR_EMAIL@example.com` in `assets/js/script.js` with your real email address.

**Note on the ID photo field:** a plain `mailto:` link can't attach files programmatically (browser security restriction), so the form asks guests to manually attach the photo themselves in the email window that opens. This works but is easy to forget.

**Note on sensitive ID data:** guests will be entering Aadhaar/driving license numbers and photos of ID proof. A `mailto:` link puts that data into a URL your guest's browser/email client handles — it isn't encrypted in transit the way a proper form submission is, and some browsers keep URLs in history. For real usage (not just a placeholder), strongly consider switching to a proper form backend before collecting this at scale:

1. **Formspree** (recommended, free tier, supports file uploads on paid plans): sign up at formspree.io, get a form endpoint, then change the `<form>` tag in `index.html` to:
   ```html
   <form class="rsvp-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" enctype="multipart/form-data">
   ```
   and remove the JS submit handler in `script.js` (or leave it — Formspree works with a plain HTML POST).
2. **Google Form**: create a Google Form with the same fields (Google Forms supports file upload fields that save to your Drive) and either link to it from the button, or embed it with an `<iframe>`. This is the simplest way to properly handle the ID photo upload.

## Security

- **`noindex` meta tag** (`index.html`) keeps the site out of Google/search results, so it's only reachable by people you send the link to.
- **Content-Security-Policy meta tag** (`index.html`) restricts which scripts/styles/fonts the page can load, reducing damage if a dependency were ever compromised. If you add a new external resource (a font, an embedded form, an image CDN), you'll need to add its domain to the relevant CSP directive or it'll be silently blocked.
- **Honeypot field** (`_gotcha` in the Guest Details form) is a hidden field real guests never fill in; if it's non-empty on submit, the form silently ignores it. This mainly matters once you switch to Formspree or another public form endpoint — Formspree recognizes `_gotcha` natively.
- **Never commit real guest data to this repo.** It's likely a public GitHub repo, and git history is permanent — keep `guests-template.csv` as a local tool only, and don't paste real Aadhaar numbers, phone numbers, or ID photos into any file that gets pushed.
- **Lock down sharing** on whatever inbox/Drive folder/spreadsheet ultimately receives guest submissions — set it to private, not "anyone with the link."

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

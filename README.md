# Sankalpa Software Solutions — Website

## 📁 Folder Structure
```
sankalpa/
├── index.html              ← Home page (with hero slider)
├── images/
│   └── logo.png            ← Your logo file
├── css/
│   ├── style.css           ← Main stylesheet (variables, layout, components)
│   └── animations.css      ← All animations & micro-interactions
├── js/
│   └── main.js             ← All JavaScript (slider, scroll reveal, counters, forms)
└── pages/
    ├── about.html          ← About Us page
    ├── services.html       ← Services overview page
    ├── service-software.html
    ├── service-ai.html
    ├── service-training.html
    ├── service-cloud.html
    ├── service-security.html
    ├── service-analytics.html
    ├── career.html         ← Careers page with job listings & application form
    └── contact.html        ← Contact page with map & working form
```

## 🚀 How To Use

### Option 1: Direct Upload (Simple Hosting)
1. Upload the entire `sankalpa/` folder to your web host via FTP or cPanel File Manager
2. Point your domain to the folder containing `index.html`
3. Done!

### Option 2: No-Cost Hosting Options
- **Netlify**: Drag & drop the folder at netlify.com/drop
- **Vercel**: Run `npx vercel` in the folder
- **GitHub Pages**: Push to GitHub, enable Pages in Settings

---

## 📧 Activating the Contact Form (EmailJS)

The contact form uses **EmailJS** — works without any backend/PHP.

### Steps:
1. Sign up free at **https://www.emailjs.com**
2. Add an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template using these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{phone}}` — phone number
   - `{{company}}` — company name
   - `{{service}}` — selected service
   - `{{message}}` — message body
4. Open `pages/contact.html` and find the `<script>` block at the bottom
5. Replace:
   ```javascript
   const EJ_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // From Account > API Keys
   const EJ_SERVICE_ID  = 'YOUR_SERVICE_ID';   // From Email Services
   const EJ_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // From Email Templates
   ```
6. Save and upload. Form is live!

> **Note:** Until EmailJS is configured, the form opens the user's email client with pre-filled details as a fallback — so leads are never lost.

---

## 🗺️ Google Maps (Contact Page)

The map currently shows Ahmedabad, Gujarat. To update:
1. Open `pages/contact.html`
2. Find the `<iframe>` with `maps.google.com`
3. Replace the `q=` parameter with your exact address, e.g.:
   ```
   q=A+408+Niligin+House+Ahmedabad+Gujarat+India
   ```
4. Or generate a custom embed from **https://maps.google.com** → Share → Embed a map

---

## 🎨 Customisation

### Change Brand Colour
Open `css/style.css` — find `:root` at the top:
```css
--blue:       #1A56DB;  ← Primary brand colour
--teal:       #0EA5E9;  ← Secondary accent
--orange:     #F97316;  ← CTA button colour
```

### Add/Remove Service Pages
Duplicate any `service-*.html` file, update content, and add the link to:
- `index.html` (services grid + nav dropdown)
- `pages/services.html`
- All footer navigation blocks

### Update Job Listings
Open `pages/career.html`, find the `const jobs = [...]` array in the `<script>` block.
Add/edit/remove job objects following the existing structure.

---

## ✅ Features Checklist
- [x] W3C valid HTML5, ARIA roles, semantic markup
- [x] Fully responsive (mobile, tablet, desktop)
- [x] SEO: meta tags, canonical URLs, Open Graph, robots
- [x] Accessibility: ARIA labels, keyboard navigation, skip links
- [x] Hero slider with auto-play, arrows, dots, touch swipe
- [x] Scroll reveal animations on all sections
- [x] Counter animations on stats
- [x] Micro-interactions: hover effects, ripple, floating badges
- [x] Sticky navbar with scroll shadow
- [x] Mobile hamburger menu with smooth open/close
- [x] "What We Do" dropdown with 6 sub-pages
- [x] FAQ accordion (contact page)
- [x] Job listings with department filter
- [x] Career application form
- [x] Contact form with EmailJS + fallback
- [x] Google Maps embed
- [x] Back to top button
- [x] Custom scrollbar
- [x] Lazy loading images
- [x] Font: Syne (headings) + DM Sans (body) from Google Fonts

---

## 📞 Support
Designed & Built by Sankalpa Software Solutions Team

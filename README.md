# Portfolio GitHub Repository

## 🎓 PhD Scholar Portfolio Website

A professional academic portfolio website built with HTML, CSS, and JavaScript. Deployed automatically via **Netlify** — push changes to GitHub and they go live instantly.

---

## 🚀 Live Demo
> After deploying: **https://yourname.netlify.app**

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main website (all sections here)
├── resume.pdf          ← Your CV (replace this file)
├── css/
│   └── style.css       ← All styles (light blue theme + dark mode)
├── js/
│   └── main.js         ← Interactions, animations, theme toggle
├── images/
│   └── profile.jpg     ← Your profile photo (replace this)
├── netlify.toml        ← Netlify configuration
├── .gitignore
└── README.md
```

---

## ✏️ How to Edit Content

### Update Personal Info
Open `index.html` and search for:
- `Your Name` → Replace with your name
- `Your University` → Replace with your institution
- `your@email.com` → Replace with your email
- `yourphone` → Replace with your WhatsApp number
- All social links (Google Scholar, LinkedIn, ORCID, etc.)

### Add a Publication
Copy one `<div class="pub-card">` block and paste below the last one. Change:
- `data-type` to `journal`, `conference`, `book`, or `preprint`
- Title, authors, venue, links

### Add a Conference Talk
Copy a `<div class="conf-item">` block and update the year, type, title, location.

### Update Stats
Find `.bio-highlights` and change `data-count` numbers.

### Replace Profile Photo
Drop your photo at `images/profile.jpg` (recommended: 400×400px, square).

---

## 🌐 Netlify Deployment (One-Time Setup)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Select your GitHub repository
4. Build settings (leave blank — it's a static site):
   - Build command: *(empty)*
   - Publish directory: `.` (root)
5. Click **Deploy site**

After this, every `git push` will auto-deploy your changes! 🎉

---

## 📬 Contact Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → copy your Form ID
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID`

---

## 📄 License
Personal portfolio. All rights reserved.

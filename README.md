# 🌐 POLYGLOT — AI Language Translator

A production-ready language translation web app powered by Claude AI, built with a Netlify serverless backend to keep your API key secure.

## Project Structure

```
polyglot-translator/
├── index.html                    ← Frontend UI
├── netlify.toml                  ← Netlify build config
├── README.md
└── netlify/
    └── functions/
        └── translate.js          ← Serverless backend (proxies Anthropic API)
```

## Features

- 🌍 Translate between 25+ languages
- 🔍 Auto language detection
- 🔊 Text-to-speech on both panels
- 📋 One-click copy
- ⇄ Swap source & target
- 🔐 API key hidden server-side (never exposed to browser)

---

## Deployment Guide (Netlify)

### Step 1 — Get an Anthropic API Key

1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in
3. Navigate to **API Keys** → **Create Key**
4. Copy your key (starts with `sk-ant-...`)

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: polyglot translator with netlify function"
git remote add origin https://github.com/YOUR_USERNAME/polyglot-translator.git
git push -u origin main
```

### Step 3 — Deploy on Netlify

1. Go to [https://netlify.com](https://netlify.com) and sign in
2. Click **Add new site → Import an existing project**
3. Connect your GitHub account and select the `polyglot-translator` repo
4. Build settings (auto-detected from `netlify.toml`):
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`
5. Click **Deploy site**

### Step 4 — Add Your API Key (critical!)

1. In Netlify dashboard → **Site configuration → Environment variables**
2. Click **Add a variable**
3. Set:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-xxxxxxxxxxxxxxxx` (your actual key)
4. Click **Save**
5. Go to **Deploys → Trigger deploy → Deploy site** to rebuild with the env var

### Step 5 — Done! 🎉

Your live URL will be:
`https://your-site-name.netlify.app`

---

## How It Works

```
Browser (index.html)
    │
    │  POST /.netlify/functions/translate
    │  { text, sourceLang, targetLang }
    ▼
Netlify Function (translate.js)         ← runs on Netlify's servers
    │
    │  POST https://api.anthropic.com/v1/messages
    │  Authorization: Bearer $ANTHROPIC_API_KEY   ← key never leaves server
    ▼
Claude AI
    │
    │  { translation, detected_language }
    ▼
Browser displays result
```

The API key is stored as a Netlify environment variable and injected server-side. It is **never sent to or visible in the browser**.

---

## Local Development

To test locally, install the Netlify CLI:

```bash
npm install -g netlify-cli
```

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

Then run:

```bash
netlify dev
```

Open `http://localhost:8888` — the function will work exactly as it does in production.

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML · CSS · Vanilla JS |
| Backend | Netlify Functions (Node.js) |
| AI Model | Claude Sonnet (Anthropic) |
| Hosting | Netlify |
| Fonts | Outfit + JetBrains Mono |

---

*Built as part of a technology bootcamp internship project.*

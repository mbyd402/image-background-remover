# Image Background Remover - Remove.bg API Version

Simple and clean image background remover powered by [remove.bg](https://www.remove.bg) API. Pure frontend static page, ready for Cloudflare Pages deployment.

## ✨ Features

- 🎨 **Drag & drop** or click to upload images
- 🚀 Powered by remove.bg API - accurate results
- 🖼️ Clean layout - Original image on top, result below
- 💾 One-click download as transparent PNG
- 📱 Fully responsive, mobile friendly
- ☁️ Ready for Cloudflare Pages deployment - just deploy and go

## 🔑 Configuration

Before deployment, you need to:

1. Get a free API Key from [remove.bg](https://www.remove.bg/api) (register an account)
2. Open `index.html` and find this line around line 184:

```javascript
// ========== 请在这里填写你的 Remove.bg API Key ==========
// 获取地址: https://www.remove.bg/api
const REMOVE_BG_API_KEY = '';
// =========================================================
```

3. Put your API key in the `REMOVE_BG_API_KEY` variable:
```javascript
const REMOVE_BG_API_KEY = 'your-api-key-here';
```

## 🚀 Deployment to Cloudflare Pages

1. Push this repository to your GitHub/GitLab
2. Log into Cloudflare Dashboard → Pages → Create a project
3. Connect your repository
4. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: (leave empty)
   - **Output directory**: (leave empty, or `.`)
5. Click **Save and Deploy**
6. Done! Your site is live.

## 📦 Project Structure

```
.
├── index.html          # Main application (all code in one file)
├── _headers            # Cloudflare Pages headers (optional)
├── README.md           # This file
└── .gitignore          # Git ignore
```

## 🔧 Local development

Just open `index.html` in your browser (needs to be served via HTTP):

```bash
# Using Python simple server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 💡 Pricing

remove.bg has a free tier: 
- Free: 50 images per month
- Paid plans available for more processing

See: https://www.remove.bg/pricing

## 📄 License

MIT

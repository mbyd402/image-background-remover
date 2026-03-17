# Image Background Remover - Pure Browser Version

AI powered image background remover that runs **completely in your browser** using ONNX Runtime Web and U2Netp model.

No server required, your images never leave your browser, privacy protected. Perfect for Cloudflare Pages deployment.

## ✨ Features

- 🚀 **100% client-side** - Everything runs in the browser
- 🔒 **Privacy first** - Images never uploaded to any server
- 🎨 Drag & drop upload
- 👁️ Original vs result preview
- 💾 Download transparent PNG
- 📱 Mobile friendly
- ☁️ Ready for Cloudflare Pages deployment

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. Push this repository to your GitHub
2. Log into Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repository
4. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: (leave empty)
   - **Output directory**: (leave empty, or `.`)
   - **Root directory**: (leave empty)
5. Click **Save and Deploy**
6. Done! Your site is live.

The model (~45MB) will be downloaded once when the user first visits the page.

## 📋 How it works

1. Uses **u2netp** (轻量版U2Net) AI model converted to ONNX format
2. Runs the model directly in the browser using ONNX Runtime Web
3. Processes the image and generates a transparency mask
4. Applies the mask to the original image client-side
5. Lets you download the result as a transparent PNG

## 📦 Project Structure

```
.
├── index.html          # Main application (all code in one file)
├── _headers            # Cloudflare Pages headers configuration
├── README.md           # This file
└── .gitignore          # Git ignore
```

## 🔧 Local development

Just open `index.html` in your browser (needs to be served via HTTP, not file://).

```bash
# Using Python simple server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 🎯 Model Credit

- rembg: https://github.com/danielgatis/rembg
- U2Net: https://github.com/xuebinqin/U-2-Net
- ONNX Runtime Web: https://onnxruntime.ai/

## 📄 License

MIT

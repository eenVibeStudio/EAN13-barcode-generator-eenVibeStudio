# EAN-13 Barcode Generator

Other languages: Nederlands: [README.nl.md](README.nl.md) · 中文: [README.zh.md](README.zh.md)

A small, easy-to-use web app for generating EAN-13 barcodes.

## Usage

### Option 1 — Open directly

1. Open `index.html` in the project folder by double-clicking it.
2. The app will open in your default browser.

### Option 2 — Run a local server (recommended)

If opening the file directly causes CDN or resource issues, run a local server:

#### Windows (batch)

1. Double-click `启动服务器.bat` to start the server.
2. Open `http://localhost:8000` in your browser.

#### PowerShell

1. Right-click `启动服务器.ps1` and run with PowerShell.
2. Open `http://localhost:8000` in your browser.

### Option 3 — Python simple server

If you have Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## How to use

1. Enter a 3-digit prefix (for example: `690`).
2. Click the "Generate" button.
3. The app will show a 13-digit EAN code and render the barcode.

## Features

- Automatic product code generation
- Check digit calculation
- Exportable barcode images (PNG)
- Simple modern UI
- Responsive layout

## Files

- `index.html` — main page
- `app.js` — core logic
- `style.css` — styles
- `启动服务器.bat` — Windows server launcher
- `启动服务器.ps1` — PowerShell server launcher

## Notes

- The app loads JsBarcode and other libraries from CDN. If you need offline use, host the libraries locally.
- If you have issues opening `index.html` directly, use a local server as shown above.


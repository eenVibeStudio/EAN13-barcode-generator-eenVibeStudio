# EAN-13 Streepjescode Generator

Een kleine, gebruiksvriendelijke webapp voor het genereren van EAN-13 streepjescodes.

## Gebruik

### Optie 1 — Openen (direct)

1. Open `index.html` in de projectmap door erop te dubbelklikken.
2. De app opent in uw standaardbrowser.

### Optie 2 — Lokale server (aanbevolen)

Als direct openen problemen veroorzaakt (bijv. CDN-resources), start dan een lokale server:

#### Windows (batch)

1. Dubbelklik `启动服务器.bat` om de server te starten.
2. Open `http://localhost:8000` in uw browser.

#### PowerShell

1. Rechtsklik `启动服务器.ps1` en voer uit met PowerShell.
2. Open `http://localhost:8000`.

### Optie 3 — Python eenvoudige server

Als Python is geïnstalleerd:

```bash
python -m http.server 8000
```

Open daarna `http://localhost:8000`.

## Gebruiksvriendelijke instructie

1. Voer een 3-cijferige prefix in (bijv. `690`).
2. Klik op de knop "Generate".
3. De app toont een 13-cijferige EAN-code en genereert de streepjescode.

## Kenmerken

- Automatische productcode-generatie
- Controlecijferberekening
- Exporteerbare barcode afbeeldingen (PNG)
- Eenvoudige moderne interface
- Responsief ontwerp

## Bestanden

- `index.html` — hoofdpagina
- `app.js` — kernlogica
- `style.css` — stijlbestand
- `启动服务器.bat` — Windows server starter
- `启动服务器.ps1` — PowerShell server starter

## Opmerkingen

- De app laadt JsBarcode en andere bibliotheken vanaf CDN. Voor offline gebruik zet u de bibliotheken lokaal.
- Gebruik bij problemen met direct openen een lokale server zoals hierboven beschreven.

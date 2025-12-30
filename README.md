# iDrive Autoškola - Prémiová Webová Stránka

Moderní, Apple-inspirovaná webová stránka pro autoškolu s pobočkami v Bystřici pod Hostýnem a Přerově.

## 🚀 Technologie

- **Next.js 14** - React framework pro produkční aplikace
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Plynulé animace
- **Lucide React** - Moderní ikony

## 📦 Instalace

```bash
# Nainstalovat závislosti
npm install

# Spustit vývojový server
npm run dev

# Build pro produkci
npm run build

# Spustit produkční server
npm start
```

## 🎨 Struktura

```
├── app/
│   ├── page.tsx              # Úvodní animace
│   ├── pobocky/
│   │   └── page.tsx          # Výběr poboček
│   ├── pobocka/
│   │   └── [id]/
│   │       └── page.tsx      # Detailní stránka pobočky
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Globální styly
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🌐 Stránky

### 1. Úvodní Animace (`/`)
- Krátká, elegantní animace loga (3-5 sekund)
- Automatický přechod na výběr poboček

### 2. Výběr Poboček (`/pobocky`)
- Dvě interaktivní karty pro výběr pobočky
- Hover efekty a plynulé animace
- Responzivní design

### 3. Detailní Stránka Pobočky (`/pobocka/bystrice` nebo `/pobocka/prerov`)
- **Hero sekce** s parallax efektem
- **Výhody** - 4 klíčové benefity
- **Kurzy a ceny** - 3 cenové varianty
- **Vozový park** - Galerie vozidel
- **Tým** - Prezentace instruktorů
- **Kontakt** - Mapa a kontaktní informace

## 🎯 Design Principy

- **Minimalismus** - Čisté, vzdušné rozvržení
- **Typografie** - Systémové fonty pro optimální čitelnost
- **Animace** - Plynulé, smysluplné přechody
- **Glassmorphism** - Moderní průhledné efekty
- **Responzivita** - Perfektní zobrazení na všech zařízeních

## 🔧 Přizpůsobení

### Změna obsahu poboček
Upravte objekt `branchData` v souboru `app/pobocka/[id]/page.tsx`

### Změna barev
Upravte `tailwind.config.js`:
```js
colors: {
  'apple-gray': '#1d1d1f',
  'apple-light': '#f5f5f7',
  'accent': '#06c',
}
```

### Přidání nové pobočky
1. Přidejte data do `branchData` objektu
2. Přidejte kartu do `app/pobocky/page.tsx`

## 📱 Responzivita

Web je plně responzivní a optimalizovaný pro:
- 📱 Mobilní zařízení (320px+)
- 📱 Tablety (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large desktop (1920px+)

## ⚡ Výkon

- Server-side rendering (SSR)
- Optimalizované obrázky
- Lazy loading
- Minimální bundle size

## 📄 License

© 2024 iDrive Autoškola. Všechna práva vyhrazena.

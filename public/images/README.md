# 📁 Struktura složky pro obrázky

Tato složka obsahuje všechny obrázky pro web autoškoly iDrive.

## 📂 Podsložky:

### `/pobocky`
Obrázky pro jednotlivé pobočky (hero sekce, pozadí)
- `bystrice-hero.jpg` - Hero obrázek pro Bystřici
- `prerov-hero.jpg` - Hero obrázek pro Přerov

### `/vozidla`
Fotografie vozidel z vozového parku
- Např: `octavia-2023.jpg`, `fabia-2023.jpg`, atd.

### `/tym`
Fotografie instruktorů a týmu
- Např: `jan-novak.jpg`, `petra-svobodova.jpg`, atd.

## 🎨 Doporučené formáty:

- **Formát**: JPG nebo WebP
- **Hero obrázky**: min. 1920x1080px
- **Vozidla**: min. 1200x800px
- **Tým**: min. 800x800px (čtvercové)

## 💡 Použití v kódu:

```jsx
// Příklad použití
<img src="/images/pobocky/bystrice-hero.jpg" alt="Bystřice" />

// Nebo s Next.js Image komponentou
import Image from 'next/image'
<Image src="/images/vozidla/octavia-2023.jpg" width={800} height={600} alt="Škoda Octavia" />
```

## 📍 Cesta k obrázkům:

Po nahrání obrázků do těchto složek, budou dostupné na:
- `http://localhost:3000/images/pobocky/nazev-souboru.jpg`
- `http://localhost:3000/images/vozidla/nazev-souboru.jpg`
- `http://localhost:3000/images/tym/nazev-souboru.jpg`

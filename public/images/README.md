# Obrázky pro Autoškolu Martinec

Všechny statické obrázky webu patří do `public/images/`.

## Složky

| Složka | Obsah |
|--------|--------|
| `loga/` | Logo, favicon |
| `pobocky/` | Hero fotky a náhledy poboček |
| `tym/` | Fotky instruktorů |
| `vozidla/` | Fotky vozidel z vozového parku |
| `icony/` | Ikony sociálních sítí |

## Doporučené formáty

- **Formát:** WebP nebo JPG
- **Hero:** min. 1920×1080 px
- **Vozidla:** min. 1200×800 px
- **Tým:** min. 800×800 px (čtverec)

## Použití v kódu

```tsx
import Image from 'next/image'

<Image src="/images/tym/jiri-martinec.webp" width={400} height={400} alt="Jiří Martinec" />
```

Po nahrání jsou obrázky dostupné na `https://autoskola-martinec.cz/images/...`.

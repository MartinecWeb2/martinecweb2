# Autoškola Martinec

Moderní webová stránka pro autoškolu s pobočkami v Bystřici pod Hostýnem, Přerově a Valašském Meziříčí.

## Technologie

- **Next.js 16** – React framework
- **TypeScript** – typová bezpečnost
- **Tailwind CSS** – styly
- **Framer Motion** – animace
- **Swiper** – karusely na mobilu

## Instalace

```bash
npm install
npm run dev      # vývoj na http://localhost:3000
npm run build    # produkční build
npm start        # spuštění buildu
```

## Struktura

```
app/
├── page.tsx                    # přesměrování na /pobocky
├── pobocky/
│   ├── page.tsx                # metadata + výběr pobočky
│   └── BranchSelection.tsx     # klientská komponenta
├── pobocka/[id]/
│   ├── page.tsx                # metadata + generateStaticParams
│   └── BranchPageClient.tsx    # detail pobočky
├── data/branches.ts            # data poboček, tým, vozidla, ceník
├── components/                 # CoursePricing, FeatureCards, LocalReviews…
├── lib/
│   ├── site.ts                 # globální konfigurace webu
│   ├── reviews.ts              # parsování recenzí z JSON
│   └── schema.ts               # schema.org (JSON-LD)
├── robots.ts                   # robots.txt
└── sitemap.ts                  # dynamická sitemap
```

## Stránky

| URL | Popis |
|-----|-------|
| `/` | Přesměrování na výběr poboček |
| `/pobocky` | Výběr pobočky |
| `/pobocka/bystrice` | Detail – Bystřice pod Hostýnem |
| `/pobocka/prerov` | Detail – Přerov |
| `/pobocka/valmez` | Detail – Valašské Meziříčí |

## Úprava obsahu

Veškerá data poboček, ceník, tým a vozidla jsou v `app/data/branches.ts`.

Obrázky patří do `public/images/` (loga, pobočky, tým, vozidla, ikony).

Recenze se načítají ze souboru `public/recenze1.json`. Po exportu nových recenzí z Google stačí soubor nahradit — počet hodnocení a průměr se na webu aktualizují automaticky.

## SEO

- Metadata a Open Graph jsou nastavené v `app/layout.tsx` a na jednotlivých stránkách
- Schema.org (JSON-LD) pro organizaci, web a jednotlivé pobočky
- `app/sitemap.ts` generuje sitemap automaticky
- `app/robots.ts` generuje robots.txt

## License

© Autoškola Martinec. Všechna práva vyhrazena.

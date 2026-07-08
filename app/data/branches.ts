import { Car, Clock, Users, Award, type LucideIcon } from 'lucide-react'

export interface Course {
  name: string
  subtitle?: string
  price: string
  features: string[]
  featured?: boolean
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

export interface Vehicle {
  name: string
  description: string
  image: string
}

export interface BranchFeature {
  icon: LucideIcon
  title: string
  description: string
  panel?: 'fleet' | 'team'
}

export interface Branch {
  name: string
  slogan: string
  hero: string
  description: string
  address: string
  phone: string
  email: string
  hours: string
  mapUrl: string
  googleReviewsUrl: string
  badge?: string
  features: BranchFeature[]
  courses: Course[]
}

const sharedFeatures: BranchFeature[] = [
  {
    icon: Car,
    title: 'Moderní vozový park',
    description: 'Auta, ve kterých chcete sedět i bez řidičáku',
    panel: 'fleet',
  },
  {
    icon: Users,
    title: 'Profesionální tým',
    description:
      'Instruktoři, kteří se zaměřují výhradně na vaše tempo a potřeby. Vaše jistota za volantem je náš cíl.',
    panel: 'team',
  },
  {
    icon: Clock,
    title: 'Rozšířená otevírací doba',
    description: 'Jízdy přizpůsobené vašemu rozvrhu. Plánujeme výuku i o víkendech.',
  },
  {
    icon: Award,
    title: 'Vysoká úspěšnost',
    description:
      'Lidskost a individuální přístup = vysoká úspěšnost u zkoušek. Každý student je pro nás jedinečný.',
  },
]

const sharedCoursesBystrice: Course[] = [
  {
    name: 'Vrácení řidičského průkazu',
    price: '5 990 Kč',
    features: [
      'Kompletní řešení dokumentace (Veškeré podklady vyřešíme za vás)',
      'Expertní poradenství (Podpora při řešení případných komplikací)',
      'Teoretická a praktická výuka v rozsahu nutném pro zkoušku',
    ],
  },
  {
    name: 'Řidičský průkaz skupiny B (vč. L17)',
    subtitle:
      'Zahájení kurzu každý týden (délka trvání kurzu včetně závěrečné zkoušky 3-4 měsíce)',
    price: '19 900 Kč',
    features: [
      '28 hodin jízd + 2 Bonusové ZDARMA',
      'Individuální výukový plán přizpůsobený vašemu tempu.',
      'Kompletní e-learning, učebnice a podklady ZDARMA',
      'Zahrnuto první předvedení ke zkoušce + Opakované předvedení ZDARMA',
      'Možnost dokoupení dalších jízd',
    ],
    featured: true,
  },
  {
    name: 'Kondiční jízdy',
    price: '590 Kč/h',
    features: [
      'Plné přizpůsobení vašim potřebám a cílům',
      'Profesionální mentoring a praktické rady',
      'Obnovení sebedůvěry za volantem',
      'Praxe v jízdě na dálnici, parkování a komplexním provozu',
      'Zdokonalení řízení po delší pauze nebo získání nových návyků',
    ],
  },
]

const sharedCoursesPrerov: Course[] = sharedCoursesBystrice.map((course) =>
  course.featured ? { ...course, price: '20 900 Kč' } : course
)

const sharedCoursesValmez: Course[] = sharedCoursesBystrice

export const teamMembers: TeamMember[] = [
  {
    name: 'Jiří Martinec',
    role: 'Instruktor',
    image: '/images/tym/jiri-martinec.webp',
  },
]

export const vehicles: Vehicle[] = []

const googleReviewsUrl =
  'https://www.google.com/maps/place/Auto%C5%A1kola+Martinec+-+P%C5%99erov/@49.4477155,17.4463703,17z/data=!4m8!3m7!1s0x201f59448c58c00b:0x665c1764727f38fb!8m2!3d49.447712!4d17.4489452!9m1!1b1!16s%2Fg%2F11vd709mqy'

export const branchData: Record<string, Branch> = {
  bystrice: {
    name: 'Bystřice pod Hostýnem',
    slogan: 'Individuální výuka pod Hostýnskými vrchy',
    hero: '/images/pobocky/IMG_5742.jpeg',
    description: 'Autoškola skupiny B v srdci Bystřice pod Hostýnem',
    address: 'Masarykovo nám. 69, 768 61 Bystřice pod Hostýnem',
    phone: '+420 603 398 127',
    email: 'info@autoskola-martinec.cz',
    hours: 'Po telefonické domluvě',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5193.004600816715!2d17.672359!3d49.399406!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713a14ae8c9392d%3A0x33e03af248396dfe!2sAuto%C5%A1kola%20Byst%C5%99ice%20pod%20Host%C3%BDnem%20-%20Auto%C5%A1kola%20Martinec!5e0!3m2!1scs!2sus!4v1763951803409!5m2!1scs!2sus',
    googleReviewsUrl,
    features: sharedFeatures,
    courses: sharedCoursesBystrice,
  },
  prerov: {
    name: 'Přerov',
    slogan: 'Profesionální výuka v centru Přerova',
    hero: '/images/pobocky/5.jpg',
    description: 'Vaše přerovská autoškola pro skupinu B',
    address: 'Kramářova 21, 750 02 Přerov',
    phone: '+420 603 398 127',
    email: 'info@autoskola-martinec.cz',
    hours: 'Po telefonické domluvě',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5187.894711080862!2d17.448945!3d49.447712!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x201f59448c58c00b%3A0x665c1764727f38fb!2sAuto%C5%A1kola%20Martinec!5e0!3m2!1scs!2sus!4v1763951848356!5m2!1scs!2sus',
    googleReviewsUrl,
    features: sharedFeatures,
    courses: sharedCoursesPrerov,
  },
  valmez: {
    name: 'Valašské Meziříčí',
    slogan: 'Profesionální výuka v srdci Valašska',
    hero: '/images/pobocky/valmez-hero.png',
    badge: '/images/pobocky/valmez-logo.png',
    description: 'Autoškola skupiny B ve Valašském Meziříčí',
    address: 'Poláškova 1535, 757 01 Valašské Meziříčí',
    phone: '+420 603 398 127',
    email: 'info@autoskola-martinec.cz',
    hours: 'Po telefonické domluvě',
    mapUrl:
      'https://www.google.com/maps?q=Pol%C3%A1%C5%A1kova+1535,+757+01+Vala%C5%A1sk%C3%A9+Mezi%C5%99%C3%AD%C4%8D%C3%AD&hl=cs&z=16&output=embed',
    googleReviewsUrl,
    features: sharedFeatures,
    courses: sharedCoursesValmez,
  },
}

export const PRIHLASKA_URL = 'https://martinec.moje-autoskola.cz/prihlaska.php?iframe=1'

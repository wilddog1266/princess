export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
}

export interface PriceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  signature?: boolean;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  service: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  /** Path under /public, wired with real imagery in M8. */
  image?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface OpeningHours {
  day: string;
  time: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

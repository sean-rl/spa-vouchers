import { VenuePck } from '../services/search.service';

export interface VenueHighlight {
  detail: string[];
  title: string;
}

export interface VenueInfo {
  detail: string[];
  title: string;
}

export interface VenueContentDoc {
  id: string;
  addr: string;
  dash: string;
  img: string;
  lat: number;
  lng: number;
  map: string;
  name: string;
  pcks: VenuePck[];
  phne: string;
  rate: number;
  sbid: number;
  street: string;
  town: string;
  region: string;
  country: string;
  postcode: string;
  web: string;
  distance?: number;
  availablepcks: VenuePck[];
  daypcks: VenuePck[];
  breakpcks: VenuePck[];
  high?: VenueHighlight[];
  imgs?: string[];
  info?: VenueInfo[];
}

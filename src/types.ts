/**
 * Shared Type Declarations for NACY ST Agency App
 */

export type CurrencyType = "MAD" | "EUR" | "USD";

export interface ServiceFeature {
  text: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  priceMAD: number;
  priceEUR: number;
  priceUSD: number;
  badge?: string;
}

export interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  currency: CurrencyType;
  tierName?: string;
  details?: string;
}

export interface UserFormData {
  prenom: string;
  nom: string;
  tel: string;
  adresse: string;
  ville: string;
  cp: string;
}

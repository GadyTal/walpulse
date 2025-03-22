export enum UtmSource {
  Google = "google",
  Facebook = "facebook",
  Instagram = "instagram",
  TikTok = "tiktok",
  Twitter = "twitter",
  Pinterest = "pinterest",
  LinkedIn = "linkedin",
  Other = "other",
  None = "none"
}

export type Gender = "male" | "female";
export type Device = "web" | "mobile";

export interface CustomerMetadata {
  birthday_time: number;
  gender: Gender;
  country: string;
  device: Device;
}

export interface Transaction {
  transaction_id: string;
  revenue_usd: number;
  customer_id: string;
  transaction_time: number;
  utm_source: UtmSource;
  customer_metadata: CustomerMetadata;
}

export type AgeGroup = "Under 15" | "15-19" | "20-29" | "30-39" | "40-49" | "50+";

export interface TransactionWithAgeGroup extends Transaction {
  ageGroup: AgeGroup;
} 
import * as flags from 'country-flag-icons/react/3x2';
import { ReactElement } from 'react';

// Country name to ISO code mapping
export const countryToCode: Record<string, string> = {
  'AUSTRALIA': 'AU',
  'UNITED STATES': 'US',
  'USA': 'US',
  'UNITED KINGDOM': 'GB',
  'UK': 'GB',
  'FRANCE': 'FR',
  'GERMANY': 'DE',
  'ITALY': 'IT',
  'SPAIN': 'ES',
  'JAPAN': 'JP',
  'CHINA': 'CN',
  'BRAZIL': 'BR',
  'RUSSIA': 'RU',
  'CANADA': 'CA',
  'MEXICO': 'MX',
  'INDIA': 'IN',
  'SOUTH KOREA': 'KR',
  'SWEDEN': 'SE',
  'NORWAY': 'NO',
  'DENMARK': 'DK',
  'FINLAND': 'FI',
  'NETHERLANDS': 'NL',
  'BELGIUM': 'BE',
  'SWITZERLAND': 'CH',
  'AUSTRIA': 'AT',
  'POLAND': 'PL',
  'CZECH REPUBLIC': 'CZ',
  'HUNGARY': 'HU',
  'GREECE': 'GR',
  'PORTUGAL': 'PT',
  'IRELAND': 'IE',
  'NEW ZEALAND': 'NZ',
  'SINGAPORE': 'SG',
  'ISRAEL': 'IL',
  'SOUTH AFRICA': 'ZA',
  'UNITED ARAB EMIRATES': 'AE',
  'SAUDI ARABIA': 'SA',
  'TURKEY': 'TR',
  'THAILAND': 'TH',
  'VIETNAM': 'VN',
  'MALAYSIA': 'MY',
  'INDONESIA': 'ID',
  'PHILIPPINES': 'PH',
  'TAIWAN': 'TW',
  'HONG KONG': 'HK',
  'ARGENTINA': 'AR',
  'CHILE': 'CL',
  'COLOMBIA': 'CO',
  'PERU': 'PE',
  'VENEZUELA': 'VE',
  'EGYPT': 'EG',
  'MOROCCO': 'MA',
  'KENYA': 'KE',
  'NIGERIA': 'NG',
  'UKRAINE': 'UA',
  'ROMANIA': 'RO',
  'BULGARIA': 'BG',
  'CROATIA': 'HR',
  'SLOVAKIA': 'SK',
  'SLOVENIA': 'SI',
  'ESTONIA': 'EE',
  'LATVIA': 'LV',
  'LITHUANIA': 'LT',
  'LUXEMBOURG': 'LU',
  'ICELAND': 'IS',
  'CYPRUS': 'CY',
  'MALTA': 'MT',
  'LATIN AMERICA': 'LA',
  'MIDDLE EAST': 'ME',
  'ASIA PACIFIC': 'AP',
  'EUROPE': 'EU',
  'NORTH AMERICA': 'NA',
  'SOUTH AMERICA': 'SA',
  'AFRICA': 'AF',
  'OCEANIA': 'OC',
  'ANTARCTICA': 'AQ',
};

// Get country code from country name
export const getCountryCode = (countryName: string): string | null => {
  return countryToCode[countryName.toUpperCase()] || null;
};

// Get country flag component
export const getCountryFlag = (countryInput: string, size: string = '1.2em'): ReactElement | null => {
  const code = getCountryCode(countryInput);
  if (!code) return null;
  
  const FlagComponent = flags[code as keyof typeof flags];
  if (FlagComponent) {
    return <FlagComponent title={code} style={{ width: size, height: size }} />;
  }

  return null;
};

// Get all available countries
export const getAllCountries = (): string[] => {
  return Object.keys(countryToCode);
};

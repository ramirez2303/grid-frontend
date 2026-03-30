/** Maps country names to ISO 3166-1 alpha-2 codes */
const countryCodes: Record<string, string> = {
  Australia: "au",
  China: "cn",
  Japan: "jp",
  Bahrain: "bh",
  "Saudi Arabia": "sa",
  "United States": "us",
  Italy: "it",
  Monaco: "mc",
  Spain: "es",
  Canada: "ca",
  Austria: "at",
  "United Kingdom": "gb",
  Belgium: "be",
  Netherlands: "nl",
  Azerbaijan: "az",
  Singapore: "sg",
  Mexico: "mx",
  Brazil: "br",
  Qatar: "qa",
  "United Arab Emirates": "ae",
  Hungary: "hu",
  Germany: "de",
  France: "fr",
  Finland: "fi",
  Thailand: "th",
  Argentina: "ar",
  "New Zealand": "nz",
};

/** Maps nationality adjectives to ISO codes (for driver nationalities) */
const nationalityCodes: Record<string, string> = {
  Australian: "au",
  British: "gb",
  Dutch: "nl",
  Monegasque: "mc",
  Spanish: "es",
  Italian: "it",
  French: "fr",
  Canadian: "ca",
  German: "de",
  Finnish: "fi",
  Mexican: "mx",
  Brazilian: "br",
  Thai: "th",
  Argentine: "ar",
  "New Zealander": "nz",
};

export function getCountryCode(country: string): string | null {
  return countryCodes[country] ?? nationalityCodes[country] ?? null;
}

export function getCountryFlagUrl(country: string): string | null {
  const code = getCountryCode(country);
  if (!code) return null;
  return `https://flagcdn.com/w40/${code}.png`;
}

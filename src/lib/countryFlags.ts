/**
 * Maps country names to ISO 3166-1 alpha-2 codes for flag images.
 * Windows doesn't render emoji flags, so we use flagcdn.com SVG images.
 */
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
};

export function getCountryCode(country: string): string | null {
  return countryCodes[country] ?? null;
}

export function getCountryFlagUrl(country: string): string | null {
  const code = countryCodes[country];
  if (!code) return null;
  return `https://flagcdn.com/w40/${code}.png`;
}

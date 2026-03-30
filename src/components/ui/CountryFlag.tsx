import { getCountryFlagUrl } from "@/lib/countryFlags";

interface CountryFlagProps {
  country: string;
  size?: number;
  className?: string;
}

export function CountryFlag({ country, size = 24, className = "" }: CountryFlagProps) {
  const url = getCountryFlagUrl(country);

  if (!url) {
    return <span className={`inline-block ${className}`}>🏁</span>;
  }

  return (
    <img
      src={url}
      alt={`${country} flag`}
      width={size}
      height={Math.round(size * 0.75)}
      className={`inline-block rounded-sm object-cover ${className}`}
      loading="lazy"
    />
  );
}

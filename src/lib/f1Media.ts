const F1_DRIVERS_BASE = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/2026Drivers";
const F1_TEAMS_BASE = "https://media.formula1.com/content/dam/fom-website/teams/2025";

/** Maps our team IDs to F1 media website naming convention */
const teamMediaNames: Record<string, string> = {
  mclaren: "mclaren",
  mercedes: "mercedes",
  "red-bull": "red-bull-racing",
  ferrari: "ferrari",
  williams: "williams",
  "racing-bulls": "racing-bulls",
  "aston-martin": "aston-martin",
  haas: "haas",
  audi: "kick-sauber",
  alpine: "alpine",
  cadillac: "cadillac",
};

export function getDriverImageUrl(firstName: string, lastName: string): string {
  const slug = `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "").replace(/é/g, "e").replace(/ü/g, "u");
  return `${F1_DRIVERS_BASE}/${slug}.jpg`;
}

export function getTeamLogoUrl(teamId: string): string {
  const mediaName = teamMediaNames[teamId] ?? teamId;
  return `${F1_TEAMS_BASE}/${mediaName}-logo.png`;
}

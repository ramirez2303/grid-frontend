const F1_BASE = "https://media.formula1.com/image/upload";

/** Verified driver codes from formula1.com — driverId → { team folder, code } */
const driverCodes: Record<string, { team: string; code: string }> = {
  norris: { team: "mclaren", code: "lannor01" },
  piastri: { team: "mclaren", code: "oscpia01" },
  russell: { team: "mercedes", code: "georus01" },
  antonelli: { team: "mercedes", code: "andant01" },
  verstappen: { team: "redbullracing", code: "maxver01" },
  hadjar: { team: "redbullracing", code: "isahad01" },
  leclerc: { team: "ferrari", code: "chalec01" },
  hamilton: { team: "ferrari", code: "lewham01" },
  sainz: { team: "williams", code: "carsai01" },
  albon: { team: "williams", code: "alealb01" },
  lawson: { team: "racingbulls", code: "lialaw01" },
  lindblad: { team: "racingbulls", code: "arvlin01" },
  alonso: { team: "astonmartin", code: "feralo01" },
  stroll: { team: "astonmartin", code: "lanstr01" },
  bearman: { team: "haasf1team", code: "olibea01" },
  ocon: { team: "haasf1team", code: "estoco01" },
  hulkenberg: { team: "audi", code: "nichul01" },
  bortoleto: { team: "audi", code: "gabbor01" },
  gasly: { team: "alpine", code: "piegas01" },
  colapinto: { team: "alpine", code: "fracol01" },
  perez: { team: "cadillac", code: "serper01" },
  bottas: { team: "cadillac", code: "valbot01" },
};

/** Team ID → F1 media folder name */
const teamFolders: Record<string, string> = {
  mclaren: "mclaren",
  mercedes: "mercedes",
  "red-bull": "redbullracing",
  ferrari: "ferrari",
  williams: "williams",
  "racing-bulls": "racingbulls",
  "aston-martin": "astonmartin",
  haas: "haasf1team",
  audi: "audi",
  alpine: "alpine",
  cadillac: "cadillac",
};

export function getDriverImageUrl(driverId: string, width: number = 440): string | null {
  const entry = driverCodes[driverId];
  if (!entry) return null;
  return `${F1_BASE}/c_lfill,w_${width}/q_auto/v1740000001/common/f1/2026/${entry.team}/${entry.code}/2026${entry.team}${entry.code}right.webp`;
}

export function getTeamLogoUrl(teamId: string, width: number = 48): string | null {
  const folder = teamFolders[teamId];
  if (!folder) return null;
  return `${F1_BASE}/c_lfill,w_${width}/q_auto/v1740000001/common/f1/2026/${folder}/2026${folder}logowhite.webp`;
}

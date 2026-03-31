export interface TeamLivery {
  body: string;
  bodyRear: string;
  wings: string;
  accent: string;
  detail: string;
}

export const liveries: Record<string, TeamLivery> = {
  mclaren:        { body: "#FF8000", bodyRear: "#1A1A1A", wings: "#1A1A1A", accent: "#FFFFFF", detail: "#FF8000" },
  mercedes:       { body: "#C0C0C0", bodyRear: "#1A1A1A", wings: "#1A1A1A", accent: "#27F4D2", detail: "#27F4D2" },
  "red-bull":     { body: "#1B1F3B", bodyRear: "#1B1F3B", wings: "#3671C6", accent: "#FFD700", detail: "#FF0000" },
  ferrari:        { body: "#DC0000", bodyRear: "#FFFFFF", wings: "#DC0000", accent: "#FFFFFF", detail: "#DC0000" },
  williams:       { body: "#FFFFFF", bodyRear: "#002855", wings: "#002855", accent: "#64C4FF", detail: "#002855" },
  "racing-bulls": { body: "#FFFFFF", bodyRear: "#FFFFFF", wings: "#FFFFFF", accent: "#4361EE", detail: "#6692FF" },
  "aston-martin": { body: "#006F62", bodyRear: "#006F62", wings: "#006F62", accent: "#C8FF00", detail: "#000000" },
  haas:           { body: "#FFFFFF", bodyRear: "#FFFFFF", wings: "#FFFFFF", accent: "#E8002D", detail: "#1A1A1A" },
  audi:           { body: "#8C8C8C", bodyRear: "#1A1A1A", wings: "#1A1A1A", accent: "#E8002D", detail: "#000000" },
  alpine:         { body: "#0057FF", bodyRear: "#FF87BC", wings: "#0057FF", accent: "#FFFFFF", detail: "#FF87BC" },
  cadillac:       { body: "#1A1A1A", bodyRear: "#FFFFFF", wings: "#1A1A1A", accent: "#C8A951", detail: "#FFFFFF" },
};

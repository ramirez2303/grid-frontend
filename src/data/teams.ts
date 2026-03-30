export interface Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  drivers: [string, string];
  engine: string;
}

export const teams: Team[] = [
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren Racing",
    color: "#FF8000",
    drivers: ["Lando Norris", "Oscar Piastri"],
    engine: "Mercedes",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas",
    color: "#27F4D2",
    drivers: ["George Russell", "Kimi Antonelli"],
    engine: "Mercedes",
  },
  {
    id: "red-bull",
    name: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    color: "#3671C6",
    drivers: ["Max Verstappen", "Isack Hadjar"],
    engine: "Ford-RBPT",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Scuderia Ferrari",
    color: "#E8002D",
    drivers: ["Charles Leclerc", "Lewis Hamilton"],
    engine: "Ferrari",
  },
  {
    id: "williams",
    name: "Williams",
    fullName: "Williams Racing",
    color: "#64C4FF",
    drivers: ["Carlos Sainz", "Alex Albon"],
    engine: "Mercedes",
  },
  {
    id: "racing-bulls",
    name: "Racing Bulls",
    fullName: "Visa Cash App Racing Bulls",
    color: "#6692FF",
    drivers: ["Liam Lawson", "Arvid Lindblad"],
    engine: "Ford-RBPT",
  },
  {
    id: "aston-martin",
    name: "Aston Martin",
    fullName: "Aston Martin Aramco",
    color: "#229971",
    drivers: ["Fernando Alonso", "Lance Stroll"],
    engine: "Honda",
  },
  {
    id: "haas",
    name: "Haas",
    fullName: "MoneyGram Haas TGR",
    color: "#B6BABD",
    drivers: ["Oliver Bearman", "Esteban Ocon"],
    engine: "Ferrari",
  },
  {
    id: "audi",
    name: "Audi",
    fullName: "Audi F1 Team",
    color: "#C0C0C0",
    drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"],
    engine: "Audi",
  },
  {
    id: "alpine",
    name: "Alpine",
    fullName: "BWT Alpine F1 Team",
    color: "#FF87BC",
    drivers: ["Pierre Gasly", "Franco Colapinto"],
    engine: "Mercedes",
  },
  {
    id: "cadillac",
    name: "Cadillac",
    fullName: "Cadillac F1 Team",
    color: "#1A1A1A",
    drivers: ["Sergio Pérez", "Valtteri Bottas"],
    engine: "Ferrari",
  },
];

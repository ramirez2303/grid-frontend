export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Equipos", href: "/equipos" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Live", href: "/live" },
  { name: "3D Lab", href: "/lab" },
  { name: "Noticias", href: "/noticias" },
  { name: "Curiosidades", href: "/curiosidades" },
  { name: "Técnico", href: "/tecnico" },
];

import type { Metadata } from "next";
import { Bebas_Neue, Outfit, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { TeamColorBar } from "@/components/layout/TeamColorBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRID — Formula 1 Hub",
  description:
    "Hub completo de F1 2026: equipos, circuitos, live timing, visor 3D, noticias y datos curiosos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <TeamColorBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

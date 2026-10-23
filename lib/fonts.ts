import { Outfit, Inter } from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = `${outfit.variable} ${inter.variable}`;

import type { Metadata } from "next";
import { PokemonProvider } from "@/app/context/pokemonContext";
export const metadata: Metadata = {
  title: "Assignment 7-1",
  description: "Sorry you're sick Dan! -Patrick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}

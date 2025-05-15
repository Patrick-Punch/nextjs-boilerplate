import type { Metadata } from "next";
import { ItemProvider } from "@/app/context/itemContext";
export const metadata: Metadata = {
  title: "webpage title",
  description: "App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ItemProvider>
          {children}
        </ItemProvider>
      </body>
    </html>
  );
}

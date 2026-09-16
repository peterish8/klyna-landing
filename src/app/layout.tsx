import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klyna — Engineering work, in motion",
  description: "A detailed, original cloud engineering agents landing page.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

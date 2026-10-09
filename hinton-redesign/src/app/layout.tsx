import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HintonYEA — Hinton Youth Entrepreneurship Award",
  description: "Hinton Youth Entrepreneurship Award - Inspiring the next generation of entrepreneurs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

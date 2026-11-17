import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATEL 3D | Diseño y Fabricación Digital",
  description:
    "Diseño de objetos, prototipado y fabricación digital en Cuenca, Ecuador. Ideas que toman forma.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

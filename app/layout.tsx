import "@/app/ui/global.css";
// @/ represent root directory, this is the best practice according to next.js
// it is fixed in jsconfig.js or tsconfig.ts
import { inter } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

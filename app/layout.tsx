import "@/app/ui/global.css";
import { Metadata } from "next";
// @/ represent root directory, this is the best practice according to next.js
// it is fixed in jsconfig.js or tsconfig.ts
import { inter } from "./ui/fonts";



// common pitfall: do not forget "export" metadata. 
export const metadata : Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: "this project is made by sunil jangir while learning nextjs",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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

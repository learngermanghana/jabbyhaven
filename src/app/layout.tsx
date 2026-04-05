import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import "./globals.css";

const coreNav = ["Home", "Menu", "Quote", "Gallery", "About", "Contact"];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} | A-Lang Kwashieman, Accra, Ghana`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "restaurant in Accra",
    "food in Ghana",
    "Kwashieman restaurant",
    "A-Lang Kwashieman food",
    "local and continental meals in Accra",
    "Jabby's Haven"
  ],
  openGraph: {
    title: `${siteConfig.name} | A-Lang Kwashieman, Accra, Ghana`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_GH",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link className="brand" href="/">
              {siteConfig.name}
            </Link>
            <nav className="nav-list">
              {coreNav.map((item) => (
                <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                  {item}
                </Link>
              ))}
            </nav>
            <a className="whatsapp-link" href={`https://wa.me/${siteConfig.whatsapp}`}>
              WhatsApp
            </a>
          </div>
        </header>

        <main className="main-content container">{children}</main>

        <footer>
          <div className="container footer-inner">
            <strong>{siteConfig.name}</strong>
            <p>{siteConfig.description}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.address}</p>
            <p>{siteConfig.location}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

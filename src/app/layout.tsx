import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import "./globals.css";

const coreNav = ["Home", "Menu", "Gallery", "About", "Contact"];

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: siteConfig.name,
  description: siteConfig.description
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
          </div>
        </footer>
      </body>
    </html>
  );
}

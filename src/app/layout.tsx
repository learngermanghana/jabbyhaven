import { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <strong>{siteConfig.name}</strong>
          <nav>
            {siteConfig.nav.map((item) => (
              <a key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <a href={`https://wa.me/${siteConfig.whatsapp}`}>WhatsApp</a>
        </header>
        {children}
        <footer>
          <p>{siteConfig.description}</p>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
        </footer>
      </body>
    </html>
  );
}

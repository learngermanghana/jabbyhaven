import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <section className="page-grid">
      <div className="card">
        <h1>Contact</h1>
        <p className="lead">Reach our team for reservations, private dining, or catering requests.</p>
      </div>

      <div className="grid-2">
        <article className="card">
          <h2>Call / WhatsApp</h2>
          <p>{siteConfig.phone}</p>
          <a className="button" href={`https://wa.me/${siteConfig.whatsapp}`}>
            Message on WhatsApp
          </a>
        </article>
        <article className="card">
          <h2>Email</h2>
          <p>{siteConfig.email}</p>
          <a className="button" href={`mailto:${siteConfig.email}`}>
            Send Email
          </a>
        </article>
      </div>

      <article className="card">
        <h2>Find Us</h2>
        <p className="lead">Use the map below for directions to Jabby's Haven.</p>
        <a className="button" href="https://maps.app.goo.gl/Aj9W2Ymf3w9sF5g16?g_st=iw" target="_blank" rel="noreferrer">
          Open Map Location
        </a>
      </article>
    </section>
  );
}

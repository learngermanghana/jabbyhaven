"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/config/site";

export default function QuotePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const submitToWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = encodeURIComponent(
      `Hello Jabby's Haven team, I need a quote.\n\nName: ${name}\nPhone: ${phone}\nRequest Details: ${details}`
    );

    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="page-grid">
      <article className="card">
        <h1>Get a Quote</h1>
        <p className="lead">
          Tell us exactly what you want. Your request will be sent to our team on WhatsApp for quick review.
        </p>
      </article>

      <article className="card">
        <form onSubmit={submitToWhatsApp}>
          <input
            className="field"
            placeholder="Your name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="field"
            placeholder="Phone number"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <textarea
            rows={6}
            placeholder="What do you need? (event type, quantity, preferred date, special requests...)"
            required
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
          <button className="button" type="submit">
            Send to WhatsApp for Review
          </button>
        </form>
      </article>
    </section>
  );
}

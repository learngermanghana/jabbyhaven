import Link from "next/link";
import { menuCatalog } from "@/data/menu-catalog";
import { StorePromo } from "@/lib/promo";

export function HeroSection() {
  return (
    <section className="card hero">
      <h1>Fine Comfort Food, Served with Heart</h1>
      <p>
        Jabby’s Haven offers a modern dining experience with bold flavors, premium ingredients, and warm,
        attentive service.
      </p>
      <div className="actions">
        <Link className="button" href="/menu">
          Explore Menu
        </Link>
        <Link className="button" href="/contact">
          Book & Contact
        </Link>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="card">
      <h2 className="section-title">Chef’s Highlights</h2>
      <div className="grid-3">
        {menuCatalog.slice(0, 3).map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.name} width={260} height={180} />
            <h3>{item.name}</h3>
            <p className="lead">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section className="card">
      <h2 className="section-title">Gallery</h2>
      <div className="grid-3">
        {menuCatalog.map((item) => (
          <img key={item.id} src={item.image} alt={`${item.name} preview`} width={220} height={160} />
        ))}
      </div>
      <div className="actions">
        <Link className="button" href="/gallery">
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="card">
      <h2 className="section-title">Guest Reviews</h2>
      <blockquote>“Elegant space, excellent food, and service that makes you feel at home.”</blockquote>
      <blockquote>“Perfect for family dinners and date nights—everything tasted fresh and balanced.”</blockquote>
    </section>
  );
}

export function FAQPreview() {
  return (
    <section className="card">
      <h2 className="section-title">Quick Info</h2>
      <p className="lead">Opening hours: Daily 11:00 AM – 11:00 PM.</p>
      <p className="lead">Reservations are available through WhatsApp and the contact page.</p>
      <p className="lead">Dietary options include vegan, vegetarian, halal, and gluten-free selections.</p>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="card hero">
      <h2>Planning your next meal with us?</h2>
      <p className="lead">Reserve a table, ask about catering, or plan a private event.</p>
      <div className="actions">
        <Link className="button" href="/contact">
          Contact Team
        </Link>
        <Link className="button" href="/menu">
          Order Favorites
        </Link>
      </div>
    </section>
  );
}

type PromoSectionProps = {
  promo: StorePromo | null;
};

function formatDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium"
  }).format(parsed);
}

export function PromoSection({ promo }: PromoSectionProps) {
  if (!promo) {
    return null;
  }

  const period = [formatDate(promo.promoStartDate), formatDate(promo.promoEndDate)].filter(Boolean).join(" - ");
  const promoLink = promo.promoWebsiteUrl || `/promo/${promo.promoSlug || ""}`;
  const promoImage =
    promo.promoImageUrl ||
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="card">
      <h2 className="section-title">Current Promo</h2>
      <div className="grid-2">
        <img src={promoImage} alt={promo.promoTitle} width={360} height={240} />
        <article>
          <h3>{promo.promoTitle}</h3>
          <p className="lead">{promo.promoSummary}</p>
          {period ? <p>{period}</p> : null}
          <Link className="button" href={promoLink}>
            View Promo
          </Link>
        </article>
      </div>
    </section>
  );
}

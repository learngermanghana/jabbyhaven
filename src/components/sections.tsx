import { menuCatalog } from "@/data/menu-catalog";

export function HeroSection() {
  return (
    <section>
      <h1>Signature Dishes, Warm Atmosphere</h1>
      <p>Discover house favorites crafted daily by our chefs.</p>
      <button>Reserve Table</button>
      <button>Order Now</button>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section>
      <h2>Chef’s Specials</h2>
      {menuCatalog.slice(0, 3).map((item) => (
        <article key={item.id}>
          <img src={item.image} alt={item.name} width={260} height={180} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section>
      <h2>Gallery</h2>
      <div>
        {menuCatalog.map((item) => (
          <img key={item.id} src={item.image} alt={`${item.name} preview`} width={220} height={160} />
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section>
      <h2>Guest Reviews</h2>
      <blockquote>“Absolutely delicious and incredibly cozy.”</blockquote>
      <blockquote>“Best place for family dinner and quick delivery.”</blockquote>
    </section>
  );
}

export function FAQPreview() {
  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      <p>Opening hours: Daily 11:00 AM – 11:00 PM.</p>
      <p>Reservations are available online and over WhatsApp.</p>
      <p>Dietary options include vegan, vegetarian, halal, and gluten-free selections.</p>
    </section>
  );
}

export function CTASection() {
  return (
    <section>
      <h2>Ready for your next meal?</h2>
      <button>Book a Table</button>
      <button>Order Food</button>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import aboutImage from "../../../04a3d574-7a86-4eed-b78d-77ea45c023b2.jpeg";

const services = [
  "Event catering and buffet services",
  "Food and pastry packs",
  "Corporate lunch services",
  "Cakes for all occasions (birthday, wedding and anniversary celebrations)",
  "Freshly squeezed juice and juice station services",
  "Kebabs and live grill stations",
  "Local bar and local pastries (set up services available)"
];

export default function AboutPage() {
  return (
    <section className="page-grid">
      <article className="card">
        <h1>About Us</h1>
        <p className="lead">
          Jabby&apos;s Haven is built around great flavor, warm hospitality, and dependable service for both everyday
          meals and special moments.
        </p>
      </article>

      <article className="card grid-2">
        <Image
          src={aboutImage}
          alt="Jabby's Haven food spread and catering presentation"
          width={560}
          height={420}
        />
        <div>
          <h2>What We Do</h2>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <div className="actions" style={{ justifyContent: "flex-start" }}>
            <Link className="button" href="/contact">
              Contact Our Team
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}

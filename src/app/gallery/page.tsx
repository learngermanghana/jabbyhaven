import { getGalleryImages } from "@/lib/gallery-images";

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <section className="page-grid">
      <div className="card">
        <h1>Gallery</h1>
        <p className="lead">A closer look at some favorites served at Jabby’s Haven.</p>
      </div>
      <div className="grid-3">
        {images.map((item) => (
          <article className="card" key={item.id}>
            <img src={item.image} alt={item.name} width={320} height={220} />
            <h3>{item.name}</h3>
            {item.description ? <p className="lead">{item.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

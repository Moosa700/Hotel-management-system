import { Camera, ZoomIn } from "lucide-react";

import gallery1 from "@/assets/images/gallery1.jpg";
import gallery2 from "@/assets/images/gallery2.png";
import gallery3 from "@/assets/images/gallery3.png";
import gallery4 from "@/assets/images/gallery4.png";

const images = [
  { src: gallery1, label: "Grand Lobby", span: true },
  { src: gallery2, label: "Rooftop Pool" },
  { src: gallery3, label: "Fine Dining" },
  { src: gallery4, label: "Luxury Suite" },
];

export default function Gallery() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--surface)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <span className="section-label">
            <Camera size={12} style={{ display: "inline", marginRight: "6px" }} />
            HOTEL GALLERY
          </span>
          <h2 className="section-title fade-up">
            A Glimpse of Luxury
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle" style={{ marginTop: "18px" }}>
            Explore our stunning spaces — from breathtaking suites and
            rooftop pools to gourmet dining experiences.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "18px",
          }}
        >
          {/* Large image — spans 2 rows */}
          <div
            style={{
              gridRow: "1 / 3",
              gridColumn: "1 / 2",
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "var(--shadow)",
            }}
            className="gallery-item"
          >
            <img
              src={images[0].src}
              alt={images[0].label}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "500px",
                objectFit: "cover",
                transition: ".5s ease",
                display: "block",
              }}
            />
            <div className="gallery-overlay">
              <ZoomIn size={28} color="#fff" />
              <span style={{ color: "#fff", fontWeight: 600, marginTop: "8px" }}>
                {images[0].label}
              </span>
            </div>
          </div>

          {/* Right 3 images */}
          {images.slice(1).map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow: "var(--shadow)",
              }}
              className="gallery-item"
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  transition: ".5s ease",
                  display: "block",
                }}
              />
              <div className="gallery-overlay">
                <ZoomIn size={22} color="#fff" />
                <span style={{ color: "#fff", fontWeight: 600, marginTop: "6px", fontSize: ".9rem" }}>
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Inline styles for gallery hover effects */}
      <style>{`
        .gallery-item img { transition: transform .5s ease; }
        .gallery-item:hover img { transform: scale(1.07); }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(11,61,62,.0), rgba(11,61,62,.65));
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity .35s ease;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
      `}</style>
    </section>
  );
}
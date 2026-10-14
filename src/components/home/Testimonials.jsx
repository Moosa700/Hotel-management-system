import { Star, Quote } from "lucide-react";

import avatar1 from "@/assets/images/avatar1.png";
import avatar2 from "@/assets/images/avatar2.png";
import avatar3 from "@/assets/images/avatar3.png";

const testimonials = [
  {
    image: avatar1,
    name: "John Smith",
    role: "Business Traveler",
    location: "New York, USA",
    rating: 5,
    review:
      "Absolutely outstanding service from check-in to check-out. The suite was immaculate, the dining experience world-class, and the staff went above and beyond every single time.",
  },
  {
    image: avatar2,
    name: "Sarah Wilson",
    role: "Leisure Guest",
    location: "London, UK",
    rating: 5,
    review:
      "LuxuryStay exceeded every expectation. Beautiful rooms with breathtaking views, exceptional food, and a spa experience that was simply divine. We will definitely return!",
  },
  {
    image: avatar3,
    name: "Michael Brown",
    role: "Honeymoon Stay",
    location: "Sydney, AU",
    rating: 5,
    review:
      "Our honeymoon stay was pure magic. Every detail was thoughtfully arranged. The staff made our celebration truly unforgettable. Highly recommend to everyone.",
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--surface-tint)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <span className="section-label">GUEST REVIEWS</span>
          <h2 className="section-title fade-up">
            What Our Guests Say
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle" style={{ marginTop: "18px" }}>
            Real experiences from guests who have stayed with us and
            created unforgettable memories.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className={`card fade-up delay-${i + 1}`}
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Quote icon — decorative */}
              <Quote
                size={64}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  color: "var(--secondary-pale)",
                  opacity: .6,
                }}
              />

              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    fill="var(--secondary)"
                    color="var(--secondary)"
                  />
                ))}
              </div>

              {/* Review */}
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: "28px",
                  fontStyle: "italic",
                  fontSize: ".97rem",
                  position: "relative",
                }}
              >
                "{item.review}"
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "var(--border)",
                  marginBottom: "22px",
                }}
              />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--secondary-pale)",
                  }}
                />
                <div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      color: "var(--primary)",
                      marginBottom: "3px",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: ".8rem",
                      color: "var(--text-light)",
                    }}
                  >
                    {item.role} · {item.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
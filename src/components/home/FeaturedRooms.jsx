import { BedDouble, Users, Wifi, ArrowRight, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

import room1 from "@/assets/images/room1.png";
import room2 from "@/assets/images/room2.png";
import room3 from "@/assets/images/room3.png";

const rooms = [
  {
    id: 1,
    title: "Deluxe Room",
    desc: "Elegant room with city views, king bed, and premium amenities.",
    price: 180,
    image: room1,
    badge: "Popular",
  },
  {
    id: 2,
    title: "Executive Suite",
    desc: "Spacious suite with separate lounge, panoramic views & butler service.",
    price: 260,
    image: room2,
    badge: "Best Value",
  },
  {
    id: 3,
    title: "Presidential Suite",
    desc: "The pinnacle of luxury — private terrace, spa bath & personal chef.",
    price: 450,
    image: room3,
    badge: "Exclusive",
  },
];

export default function FeaturedRooms() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--background)",
      }}
    >
      <div className="container">

        {/* Header */}
        <div className="text-center" style={{ marginBottom: "64px" }}>
          <span className="section-label">OUR ROOMS</span>
          <h2 className="section-title fade-up">
            Luxury Rooms & Suites
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle" style={{ marginTop: "18px" }}>
            Stay in beautifully designed rooms offering elegance,
            comfort and unforgettable experiences.
          </p>
        </div>

        {/* Room Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
          }}
        >
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className={`room-card fade-up delay-${i + 1}`}
            >
              {/* Image */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={room.image}
                  alt={room.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    transition: ".5s ease",
                    display: "block",
                  }}
                />

                {/* Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "linear-gradient(135deg, var(--secondary), #b07e2a)",
                    color: "#fff",
                    padding: "5px 14px",
                    borderRadius: "999px",
                    fontSize: ".72rem",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    boxShadow: "var(--shadow-gold)",
                  }}
                >
                  {room.badge}
                </span>

                {/* Stars overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    display: "flex",
                    gap: "2px",
                  }}
                >
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      fill="var(--secondary-light)"
                      color="var(--secondary-light)"
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--primary)",
                    marginBottom: "10px",
                  }}
                >
                  {room.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: ".9rem",
                    lineHeight: 1.7,
                    marginBottom: "18px",
                  }}
                >
                  {room.desc}
                </p>

                {/* Amenity icons */}
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    color: "var(--text-muted)",
                    fontSize: ".83rem",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <BedDouble size={15} color="var(--secondary)" /> King Bed
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Users size={15} color="var(--secondary)" /> 2 Guests
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Wifi size={15} color="var(--secondary)" /> Free WiFi
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "var(--border)",
                    marginBottom: "20px",
                  }}
                />

                {/* Price + Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.7rem",
                        fontWeight: 700,
                        color: "var(--secondary)",
                      }}
                    >
                      ${room.price}
                    </span>
                    <span
                      style={{
                        fontSize: ".82rem",
                        color: "var(--text-light)",
                        marginLeft: "4px",
                      }}
                    >
                      /night
                    </span>
                  </div>

                  <Link
                    to="/rooms"
                    className="btn-primary"
                    style={{
                      padding: "12px 24px",
                      fontSize: ".85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Book Now
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <button className="btn-outline" style={{ padding: "15px 44px" }}>
            View All Rooms
          </button>
        </div>

      </div>
    </section>
  );
}
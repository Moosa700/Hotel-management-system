import {
  Wifi,
  Dumbbell,
  UtensilsCrossed,
  Waves,
  Car,
  Coffee,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    desc: "Blazing-fast internet throughout every corner of the hotel.",
  },
  {
    icon: Waves,
    title: "Infinity Pool",
    desc: "Stunning rooftop pool with panoramic city skyline views.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    desc: "State-of-the-art gym equipment available around the clock.",
  },
  {
    icon: Coffee,
    title: "Premium Breakfast",
    desc: "Gourmet breakfast buffet with international cuisines daily.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    desc: "Award-winning restaurant with world-class culinary experiences.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    desc: "Complimentary valet and secure underground parking available.",
  },
  {
    icon: Sparkles,
    title: "Luxury Spa",
    desc: "Rejuvenating spa treatments, saunas and wellness therapies.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    desc: "Round-the-clock security and concierge for complete peace of mind.",
  },
];

export default function Amenities() {
  return (
    <section className="amenities-section">

      {/* Decorative ring */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(201,151,58,.12)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          border: "1px solid rgba(201,151,58,.10)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>

        {/* Header */}
        <div className="text-center" style={{ marginBottom: "64px" }}>

          <span className="section-label">WORLD-CLASS AMENITIES</span>

          <h2
            className="section-title fade-up"
            style={{ color: "#fff", marginBottom: "18px" }}
          >
            Everything You Need,
            <br />
            <span style={{ color: "var(--secondary-light)" }}>
              Under One Roof
            </span>
          </h2>

          <div className="divider-gold" />

          <p
            style={{
              color: "rgba(255,255,255,.65)",
              maxWidth: "560px",
              margin: "0 auto",
              fontSize: "1.05rem",
              lineHeight: 1.85,
            }}
          >
            Indulge in our premium facilities designed to make every
            moment of your stay extraordinary.
          </p>

        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`amenity-card fade-up delay-${(i % 4) + 1}`}
              >
                <div className="amenity-icon-wrap">
                  <Icon size={28} color="var(--secondary-light)" />
                </div>

                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,.58)",
                    fontSize: ".88rem",
                    lineHeight: 1.75,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import { BedDouble, Users, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: BedDouble,
    number: "250+",
    label: "Luxury Rooms",
    detail: "Across all locations",
  },
  {
    icon: Users,
    number: "15K+",
    label: "Happy Guests",
    detail: "Served every year",
  },
  {
    icon: Star,
    number: "4.9★",
    label: "Guest Rating",
    detail: "On all platforms",
  },
  {
    icon: TrendingUp,
    number: "98%",
    label: "Occupancy Rate",
    detail: "Year-round average",
  },
];

export default function Statistics() {
  return (
    <section className="stats-section">

      {/* Decorative top border line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,151,58,.5), transparent)",
        }}
      />

      <div className="container" style={{ position: "relative" }}>

        {/* Header */}
        <div
          className="text-center fade-up"
          style={{ marginBottom: "56px" }}
        >
          <span className="section-label">BY THE NUMBERS</span>

          <h2
            className="section-title"
            style={{ color: "#fff", marginBottom: "14px" }}
          >
            LuxuryStay in Numbers
          </h2>

          <div className="divider-gold" />

          <p
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: "1rem",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Trusted by thousands of discerning travelers from around the world.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`stat-card fade-up delay-${i + 1}`}
              >
                {/* Icon ring */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(201,151,58,.15)",
                    border: "1px solid rgba(201,151,58,.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <Icon size={24} color="var(--secondary-light)" />
                </div>

                {/* Number */}
                <div className="stat-number">{item.number}</div>

                {/* Label */}
                <div className="stat-label">{item.label}</div>

                {/* Detail */}
                <p
                  style={{
                    color: "rgba(255,255,255,.38)",
                    fontSize: ".78rem",
                    marginTop: "6px",
                    letterSpacing: ".05em",
                  }}
                >
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Decorative bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,151,58,.4), transparent)",
        }}
      />

    </section>
  );
}
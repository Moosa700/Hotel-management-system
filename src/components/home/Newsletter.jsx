import { Mail, ArrowRight, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "linear-gradient(135deg, #0b3d3e 0%, #07282a 50%, #0d4547 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,151,58,.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,151,58,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >

          {/* Icon */}
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "rgba(201,151,58,.18)",
              border: "1.5px solid rgba(201,151,58,.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Mail size={28} color="var(--secondary-light)" />
          </div>

          <span className="section-label">EXCLUSIVE OFFERS</span>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#fff",
              marginTop: "12px",
              marginBottom: "18px",
              lineHeight: 1.2,
            }}
          >
            Stay Updated with
            <br />
            <span style={{ color: "var(--secondary-light)" }}>
              LuxuryStay Offers
            </span>
          </h2>

          <div className="divider-gold" />

          <p
            style={{
              color: "rgba(255,255,255,.62)",
              maxWidth: "480px",
              margin: "20px auto 44px",
              lineHeight: 1.85,
              fontSize: "1rem",
            }}
          >
            Subscribe to receive exclusive hotel offers, early access to
            seasonal discounts, and personalized travel inspirations.
          </p>

          {/* Form */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: "1",
                maxWidth: "380px",
              }}
            >
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-light)",
                }}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  width: "100%",
                  padding: "17px 18px 17px 50px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,.2)",
                  background: "rgba(255,255,255,.08)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  fontSize: ".95rem",
                  outline: "none",
                  transition: ".25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(201,151,58,.6)";
                  e.target.style.background = "rgba(255,255,255,.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,.2)";
                  e.target.style.background = "rgba(255,255,255,.08)";
                }}
              />
            </div>

            <button className="btn-primary" style={{ display: "flex", gap: "8px" }}>
              Subscribe
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Trust note */}
          <p
            style={{
              color: "rgba(255,255,255,.38)",
              fontSize: ".78rem",
              marginTop: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Sparkles size={13} />
            No spam, ever. Unsubscribe anytime. Privacy guaranteed.
          </p>

        </div>
      </div>
    </section>
  );
}
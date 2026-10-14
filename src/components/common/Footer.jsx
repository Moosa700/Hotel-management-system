import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--primary)",
        color: "#fff",
        padding: "70px 0 30px",
        marginTop: "80px",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h2 style={{ color: "var(--secondary)", marginBottom: "20px" }}>
            LuxuryStay
          </h2>

          <p style={{ color: "#ddd", lineHeight: 1.8 }}>
            Experience luxury hospitality with premium rooms, world-class
            services, and unforgettable memories.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "20px" }}>Quick Links</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "20px" }}>Contact</h3>

          <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={16} />
            Luxury Avenue, Dubai
          </p>

          <p
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Phone size={16} />
            +971 123456789
          </p>

          <p
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Mail size={16} />
            info@luxurystay.com
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "20px" }}>Follow Us</h3>

          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "22px",
            }}
          >
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "50px 0 20px",
          borderColor: "rgba(255,255,255,.2)",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#bbb",
        }}
      >
        © 2026 LuxuryStay Hotel Management System. All Rights Reserved.
      </p>
    </footer>
  );
}
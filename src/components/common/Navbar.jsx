import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="LuxuryStay home">
          Luxury<span>Stay</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="desktop-actions">
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/register" className="nav-register">Register</Link>
        </div>

        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-link"
            >
              {item.name}
            </Link>
          ))}
          <Link to="/login" className="mobile-menu-link">Login</Link>
          <Link to="/register" className="nav-register mobile-register">Create account</Link>
        </nav>
      )}
    </header>
  );
}
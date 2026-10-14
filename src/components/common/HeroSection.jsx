import { CalendarDays, Users, Search, ArrowDownRight } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/images/hero.jpg";

export default function HeroSection() {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ checkIn: "", checkOut: "", guests: "2" });
  const [error, setError] = useState("");
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const todayValue = today.toISOString().slice(0, 10);

  function handleSearch(event) {
    event.preventDefault();

    if (!dates.checkIn || !dates.checkOut) {
      setError("Choose your arrival and departure dates.");
      return;
    }

    if (dates.checkIn < todayValue) {
      setError("Arrival must be today or later.");
      return;
    }

    if (dates.checkOut <= dates.checkIn) {
      setError("Departure must be after arrival.");
      return;
    }

    setError("");
    navigate({
      to: "/rooms",
      search: (previous) => ({ ...previous, ...dates, guests: Number(dates.guests) }),
    });
  }

  return (
    <section
      className="landing-hero"
      style={{ "--hero-image": `url("${heroImage}")` }}
    >
      <div className="container landing-hero-content">
        <div className="hero-copy fade-up">
          <p className="hero-eyebrow">A considered kind of escape</p>
          <h1>Stay somewhere <em>extraordinary.</em></h1>
          <p className="hero-description">
            Thoughtful rooms, generous hospitality, and a slower pace, all waiting
            just beyond the everyday.
          </p>
          <div className="hero-actions">
            <Link to="/rooms" className="hero-explore-link">
              Explore the rooms <ArrowDownRight size={18} aria-hidden="true" />
            </Link>
            <span className="hero-location">A quieter way to get away</span>
          </div>
        </div>

        <p className="hero-side-note" aria-label="A stay worth slowing down for">
          <span>THE ART OF</span>
          <span>ARRIVING</span>
        </p>

        <form className="booking-search" onSubmit={handleSearch}>
          <label className="booking-field">
            <span>Check in</span>
            <span className="booking-input-wrap">
              <CalendarDays size={17} aria-hidden="true" />
              <input
                type="date"
                required
                min={todayValue}
                value={dates.checkIn}
                onChange={(event) => setDates({ ...dates, checkIn: event.target.value })}
                aria-label="Check-in date"
              />
            </span>
          </label>
          <label className="booking-field">
            <span>Check out</span>
            <span className="booking-input-wrap">
              <CalendarDays size={17} aria-hidden="true" />
              <input
                type="date"
                required
                min={dates.checkIn || undefined}
                value={dates.checkOut}
                onChange={(event) => setDates({ ...dates, checkOut: event.target.value })}
                aria-label="Check-out date"
              />
            </span>
          </label>
          <label className="booking-field">
            <span>Guests</span>
            <span className="booking-input-wrap">
              <Users size={17} aria-hidden="true" />
              <select
                value={dates.guests}
                onChange={(event) => setDates({ ...dates, guests: event.target.value })}
                aria-label="Number of guests"
              >
                {[1, 2, 3, 4, 5].map((guests) => (
                  <option key={guests} value={guests}>
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <button className="booking-search-button" type="submit">
            <Search size={18} aria-hidden="true" />
            Find a room
          </button>
          {error && <p className="booking-search-error" role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}
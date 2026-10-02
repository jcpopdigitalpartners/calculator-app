"use client";

import { useState } from "react";

const PRICE_PER_SEAT = 20;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function Home() {
  const [seats, setSeats] = useState("1");
  const value = seats.trim();
  let error = "";

  if (!value) {
    error = "Enter the number of seats to calculate your monthly total.";
  } else if (!/^-?\d+$/.test(value)) {
    error = "Enter a whole number, such as 5. Decimals, letters, and symbols aren’t accepted.";
  } else if (Number(value) < 1 || Number(value) > 1000) {
    error = "Choose between 1 and 1,000 seats.";
  }

  const seatCount = error ? null : Number(value);

  return (
    <main className="pricing-page">
      <div className="brand"><span className="brand-mark" aria-hidden="true">✦</span> Seatwise</div>
      <section className="calculator" aria-labelledby="pricing-title">
        <div className="intro">
          <p className="eyebrow">SIMPLE, TRANSPARENT PRICING</p>
          <h1 id="pricing-title">A seat for everyone.<br />A price that adds up.</h1>
          <p className="description">Plan your team’s monthly cost in seconds. One flat rate, for every seat.</p>
        </div>

        <div className="pricing-card">
          <div className="rate"><span className="rate-label">Your team, your size</span><p><strong>$20</strong><span> / seat / month</span></p></div>
          <div className="seat-field">
            <label htmlFor="seats">Number of seats</label>
            <p id="seat-hint" className="hint">Enter a whole number from 1 to 1,000.</p>
            <input
              id="seats"
              name="seats"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={`seat-hint${error ? " seat-error" : ""}`}
            />
            <div className="validation" aria-live="polite" aria-atomic="true">
              {error && <p id="seat-error">{error}</p>}
            </div>
          </div>
          <div className="total" aria-live="polite" aria-atomic="true">
            <span className="total-label">Monthly total</span>
            <p className="total-amount">{seatCount === null ? "—" : currency.format(seatCount * PRICE_PER_SEAT)}<span> / month</span></p>
            <p className="breakdown">{seatCount === null ? "Enter a valid seat count to see your total." : `${seatCount.toLocaleString("en-US")} ${seatCount === 1 ? "seat" : "seats"} × $20 per month`}</p>
          </div>
          <p className="card-note">Straightforward pricing. Built to grow with your team.</p>
        </div>
        <p className="footer-note">All prices in USD. Monthly cost updates as you type.</p>
      </section>
    </main>
  );
}

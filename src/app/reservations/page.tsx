"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ReservationsPage() {
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "Reservation submitted." : "Failed to submit reservation.");
  }

  return (
    <section className="page-grid">
      <div className="card">
        <h1>Reservations</h1>
        <p className="lead">Reserve your table in under a minute.</p>
      </div>

      <form className="card" onSubmit={onSubmit}>
        <input className="field" name="name" placeholder="Name" required />
        <input className="field" name="phone" placeholder="Phone" required />
        <input className="field" name="partySize" placeholder="Party Size" type="number" min={1} required />
        <input className="field" name="date" type="date" required />
        <input className="field" name="time" type="time" required />
        <textarea name="specialRequests" placeholder="Special requests" rows={4} />
        <button className="button" type="submit">
          Reserve
        </button>
      </form>
      {status ? <p>{status}</p> : null}
    </section>
  );
}

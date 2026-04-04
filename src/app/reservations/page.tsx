"use client";

import { FormEvent, useState } from "react";

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
    <main>
      <h1>Reservations</h1>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="phone" placeholder="Phone" required />
        <input name="partySize" placeholder="Party Size" type="number" min={1} required />
        <input name="date" type="date" required />
        <input name="time" type="time" required />
        <textarea name="specialRequests" placeholder="Special requests" />
        <button type="submit">Reserve</button>
      </form>
      <p>{status}</p>
    </main>
  );
}

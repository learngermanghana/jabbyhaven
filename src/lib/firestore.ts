export type ReservationPayload = {
  name: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  specialRequests?: string;
};

const reservations: ReservationPayload[] = [];
const cateringInquiries: Array<Record<string, unknown>> = [];

export async function saveReservation(payload: ReservationPayload) {
  reservations.push(payload);
  return { id: `reservation_${reservations.length}`, payload };
}

export async function saveCateringInquiry(payload: Record<string, unknown>) {
  cateringInquiries.push(payload);
  return { id: `catering_${cateringInquiries.length}`, payload };
}

const requests = [
  "Extra Towels - Room 201",
  "Airport Pickup - Room 405",
  "Breakfast Request - Room 302",
  "Late Checkout - Room 118",
];

export default function GuestRequestCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-5 text-xl font-bold">
        Guest Requests
      </h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request}
            className="rounded-xl bg-gray-100 p-4"
          >
            {request}
          </div>
        ))}
      </div>
    </div>
  );
}
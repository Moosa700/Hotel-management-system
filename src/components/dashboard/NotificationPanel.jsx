const notifications = [
  "Room 201 requires housekeeping.",
  "New reservation received.",
  "Payment received from Ahmed.",
  "Maintenance request submitted.",
];

export default function NotificationPanel() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-gray-100 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
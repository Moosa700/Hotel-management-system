const users = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@gmail.com",
    bookings: 5,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@gmail.com",
    bookings: 2,
  },
  {
    id: 3,
    name: "Sarah Khan",
    email: "sarah@gmail.com",
    bookings: 7,
  },
];

export default function UserTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Guests</h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-3 text-left">Name</th>
            <th className="pb-3 text-left">Email</th>
            <th className="pb-3 text-left">Bookings</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-4">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
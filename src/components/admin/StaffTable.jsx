const staff = [
  {
    id: 1,
    name: "Ali Ahmed",
    role: "Manager",
    shift: "Morning",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Receptionist",
    shift: "Evening",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Housekeeping",
    shift: "Night",
  },
];

export default function StaffTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staff</h2>

        <button className="rounded-lg bg-primary px-5 py-2 text-white">
          Add Staff
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-3 text-left">Name</th>
            <th className="pb-3 text-left">Role</th>
            <th className="pb-3 text-left">Shift</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="py-4">{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function UserProfile() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <div className="flex flex-col items-center">

        <img
          src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
          alt="Profile"
          className="h-32 w-32 rounded-full"
        />

        <h2 className="mt-5 text-3xl font-bold">
          John Doe
        </h2>

        <p className="mt-2 text-gray-500">
          john@gmail.com
        </p>

      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">

        <div>
          <label className="text-sm text-gray-500">
            Phone
          </label>

          <input
            value="+92 300 1234567"
            readOnly
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Country
          </label>

          <input
            value="Pakistan"
            readOnly
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

      </div>

      <button className="mt-8 rounded-xl bg-primary px-8 py-3 text-white">
        Edit Profile
      </button>
    </div>
  );
}
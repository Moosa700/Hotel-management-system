import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Edit,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold text-[#0F3D3E]">
          Staff Profile
        </h1>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Header */}

          <div className="bg-[#0F3D3E] p-10 text-white">

            <div className="flex flex-col items-center gap-6 md:flex-row">

              <img
                src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=0F3D3E&color=fff&size=200"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white"
              />

              <div>
                <h2 className="text-3xl font-bold">
                  Ahmed Ali
                </h2>

                <p className="mt-2 text-gray-200">
                  Front Desk Officer
                </p>

                <span className="mt-4 inline-block rounded-full bg-green-500 px-4 py-2 text-sm font-semibold">
                  Active Employee
                </span>
              </div>

            </div>

          </div>

          {/* Profile Information */}

          <div className="grid gap-8 p-8 md:grid-cols-2">

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <User className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <h3 className="font-semibold">Ahmed Ali</h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Email</p>
                  <h3 className="font-semibold">
                    ahmed@luxurystay.com
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Phone</p>
                  <h3 className="font-semibold">
                    +92 300 1234567
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Address</p>
                  <h3 className="font-semibold">
                    Lahore, Pakistan
                  </h3>
                </div>
              </div>

            </div>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <Briefcase className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Department</p>
                  <h3 className="font-semibold">
                    Front Office
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Shield className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Role</p>
                  <h3 className="font-semibold">
                    Staff Member
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Joined</p>
                  <h3 className="font-semibold">
                    15 January 2025
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="text-[#0F3D3E]" />
                <div>
                  <p className="text-gray-500">Shift</p>
                  <h3 className="font-semibold">
                    Morning (8:00 AM - 4:00 PM)
                  </h3>
                </div>
              </div>

            </div>

          </div>

          {/* Action */}

          <div className="border-t bg-gray-50 p-8">

            <button className="flex items-center gap-3 rounded-xl bg-[#0F3D3E] px-6 py-3 font-semibold text-white hover:bg-[#0B3132]">
              <Edit size={18} />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
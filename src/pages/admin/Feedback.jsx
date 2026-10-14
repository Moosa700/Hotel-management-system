import {
  MessageSquare,
  Star,
  TrendingUp,
  ThumbsUp,
  Search,
} from "lucide-react";

const feedbacks = [
  {
    id: 1,
    guest: "Ali Khan",
    room: "Deluxe 204",
    rating: 5,
    comment:
      "Amazing experience! Staff was very professional and the room was spotless.",
    date: "28 Jun 2026",
  },
  {
    id: 2,
    guest: "Sara Ahmed",
    room: "Suite 305",
    rating: 4,
    comment:
      "Beautiful hotel with excellent food. Check-in process could be faster.",
    date: "27 Jun 2026",
  },
  {
    id: 3,
    guest: "John Smith",
    room: "Executive 112",
    rating: 5,
    comment:
      "Outstanding hospitality and premium facilities. Highly recommended.",
    date: "26 Jun 2026",
  },
  {
    id: 4,
    guest: "Emma Wilson",
    room: "Presidential Suite",
    rating: 5,
    comment:
      "One of the best hotels I've stayed at. Everything exceeded expectations.",
    date: "25 Jun 2026",
  },
];

export default function Feedback() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-[#0F3D3E]">
            Guest Feedback
          </h1>

          <p className="mt-2 text-gray-600">
            Monitor customer reviews and satisfaction.
          </p>
        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">
          <MessageSquare className="mb-4 text-blue-600" size={38} />
          <h2 className="text-3xl font-bold">256</h2>
          <p className="text-gray-500">Total Reviews</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Star className="mb-4 text-yellow-500" size={38} />
          <h2 className="text-3xl font-bold">4.8</h2>
          <p className="text-gray-500">Average Rating</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <ThumbsUp className="mb-4 text-green-600" size={38} />
          <h2 className="text-3xl font-bold">96%</h2>
          <p className="text-gray-500">Positive Reviews</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <TrendingUp className="mb-4 text-purple-600" size={38} />
          <h2 className="text-3xl font-bold">+12%</h2>
          <p className="text-gray-500">Monthly Growth</p>
        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search feedback..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-[#0F3D3E] focus:outline-none"
          />

        </div>

      </div>

      {/* Reviews */}

      <div className="space-y-6">

        {feedbacks.map((item) => (

          <div
            key={item.id}
            className="rounded-2xl bg-white p-8 shadow"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-[#0F3D3E]">
                  {item.guest}
                </h2>

                <p className="text-gray-500">
                  {item.room}
                </p>

              </div>

              <span className="text-sm text-gray-500">
                {item.date}
              </span>

            </div>

            <div className="my-4 flex gap-1">

              {[...Array(item.rating)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  fill="#FACC15"
                  color="#FACC15"
                />
              ))}

            </div>

            <p className="leading-7 text-gray-600">
              {item.comment}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
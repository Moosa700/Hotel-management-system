import { DollarSign } from "lucide-react";

export default function RevenueCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">Monthly Revenue</p>

          <h2 className="mt-3 text-4xl font-bold">
            $128,540
          </h2>

          <p className="mt-2 text-green-600">
            +18% this month
          </p>
        </div>

        <div className="rounded-2xl bg-green-500 p-5 text-white">
          <DollarSign size={35} />
        </div>
      </div>
    </div>
  );
}
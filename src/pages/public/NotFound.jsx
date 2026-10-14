import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft, Hotel } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0F3D3E] to-[#1B5E5F] px-6">

      <div className="max-w-xl rounded-3xl bg-white p-12 text-center shadow-2xl">

        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-[#0F3D3E] p-6">
            <Hotel
              size={60}
              className="text-[#D4A24C]"
            />
          </div>
        </div>

        <h1 className="text-8xl font-bold text-[#0F3D3E]">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg leading-7 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0F3D3E] px-8 py-4 font-semibold text-white transition hover:bg-[#0B3132]"
          >
            <Home size={20} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F3D3E] px-8 py-4 font-semibold text-[#0F3D3E] transition hover:bg-[#0F3D3E] hover:text-white"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
}
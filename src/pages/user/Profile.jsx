import { useEffect, useState } from "react";
import { MapPin, Phone, Save, UserRound } from "lucide-react";
import { getProfile, updateProfile } from "@/services/user.service";

const initialProfile = { name: "", email: "", phone: "", address: "" };

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const updated = await updateProfile({
        name: profile.name.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
      });
      setProfile({
        name: updated.name || "",
        email: updated.email || profile.email,
        phone: updated.phone || "",
        address: updated.address || "",
      });
      setNotice("Profile updated.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-4 text-gray-600 sm:p-8" role="status">Loading profile...</div>;

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Account</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">My profile</h1>
        <p className="mt-2 text-sm text-gray-600">Keep your contact details up to date for your reservations.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}

      <div className="grid min-w-0 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <section className="h-fit rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-900"><UserRound size={36} /></div>
          <h2 className="mt-4 wrap-break-word text-lg font-semibold text-gray-900">{profile.name || "Guest"}</h2>
          <p className="mt-1 wrap-break-word text-sm text-gray-600">{profile.email}</p>
          {profile.phone && <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600"><Phone size={15} />{profile.phone}</p>}
          {profile.address && <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600"><MapPin size={15} />{profile.address}</p>}
        </section>

        <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">Contact information</h2>
          <form onSubmit={submit} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Full name<input required autoComplete="name" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Email<input type="email" value={profile.email} disabled className="min-w-0 cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 font-normal text-gray-500" /><span className="text-xs font-normal text-gray-500">Contact staff to change the sign-in email.</span></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700"><span className="flex items-center gap-2"><Phone size={15} />Phone</span><input type="tel" autoComplete="tel" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2"><span className="flex items-center gap-2"><MapPin size={15} />Address</span><input autoComplete="street-address" value={profile.address} onChange={(event) => setProfile({ ...profile, address: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <div className="sm:col-span-2"><button type="submit" disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0F3D3E] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save size={16} />{saving ? "Saving..." : "Save changes"}</button></div>
          </form>
        </section>
      </div>
    </div>
  );
}
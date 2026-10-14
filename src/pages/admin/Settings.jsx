import { useEffect, useState } from "react";
import { Bell, Hotel, Save, Settings as SettingsIcon } from "lucide-react";
import {
  getSystemSettings,
  saveSystemSettings,
} from "@/services/settings.service";

const initialSettings = {
  hotelName: "",
  email: "",
  phone: "",
  address: "",
  currency: "USD",
  language: "English",
  notificationsEnabled: true,
  maintenanceMode: false,
  taxRate: 0,
  checkInTime: "14:00",
  checkOutTime: "11:00",
  cancellationPolicy: "",
};

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        setSettings({ ...initialSettings, ...(await getSystemSettings()) });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load system settings.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSettings((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const updated = await saveSystemSettings({
        ...settings,
        taxRate: Number(settings.taxRate),
      });
      setSettings({ ...initialSettings, ...updated });
      setNotice("Settings saved.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-4 text-gray-600 sm:p-8" role="status">Loading settings...</div>;
  }

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Configuration</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">System settings</h1>
        <p className="mt-2 text-sm text-gray-600">These values are saved to the hotel configuration.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <Hotel className="text-emerald-800" size={21} />
            <h2 className="font-semibold text-gray-900">Hotel information</h2>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Hotel name<input name="hotelName" required maxLength="120" value={settings.hotelName} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Contact email<input type="email" name="email" value={settings.email} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Phone<input type="tel" name="phone" value={settings.phone} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Address<input name="address" maxLength="300" value={settings.address} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <label className="flex flex-wrap items-center justify-between gap-4">
            <span>
              <span className="block font-semibold text-gray-900">Maintenance mode</span>
              <span className="mt-1 block text-sm text-gray-600">Pause public/customer API access while staff and admins continue working.</span>
            </span>
            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="size-5 accent-emerald-800" />
          </label>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <SettingsIcon className="text-emerald-800" size={21} />
            <h2 className="font-semibold text-gray-900">Booking defaults</h2>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Currency<select name="currency" value={settings.currency} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">{[["USD", "USD ($)"], ["EUR", "EUR (€)"], ["GBP", "GBP (£)"], ["PKR", "PKR (Rs)"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Language<select name="language" value={settings.language} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">{["English", "Urdu", "Arabic", "German"].map((language) => <option key={language}>{language}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Tax rate (%)<input type="number" name="taxRate" min="0" max="100" step="0.01" value={settings.taxRate} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Check-in time<input type="time" name="checkInTime" value={settings.checkInTime} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Check-out time<input type="time" name="checkOutTime" value={settings.checkOutTime} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2 xl:col-span-3">Cancellation policy<textarea name="cancellationPolicy" maxLength="2000" rows="3" value={settings.cancellationPolicy} onChange={handleChange} className="min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bell className="text-emerald-800" size={21} />
              <div><h2 className="font-semibold text-gray-900">Booking notifications</h2><p className="mt-1 text-sm text-gray-600">Store the notification preference for this property.</p></div>
            </div>
            <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" name="notificationsEnabled" checked={settings.notificationsEnabled} onChange={handleChange} className="size-5 accent-emerald-800" />
              Enabled
            </label>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0F3D3E] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            <Save size={17} aria-hidden="true" /> {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
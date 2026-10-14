// src/pages/user/Settings.jsx

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Globe,
  Shield,
  Lock,
  Save,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: "English",
    twoFactor: false,
    profileVisibility: "Public",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(settings);
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="text-blue-600" size={34} />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Account Settings
          </h1>
          <p className="text-gray-500">
            Manage your preferences and security settings.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="text-blue-600" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-500">
                  Receive notifications inside the app.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle("notifications")}
                className="w-5 h-5"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">
                  Receive booking and payment updates via email.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <Moon className="text-blue-600" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">
                Enable dark theme.
              </p>
            </div>

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <Globe className="text-blue-600" />
            <h2 className="text-xl font-semibold">Language</h2>
          </div>

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full md:w-64 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>English</option>
            <option>Urdu</option>
            <option>Arabic</option>
            <option>German</option>
          </select>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Privacy & Security
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Secure your account with 2FA.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={() => handleToggle("twoFactor")}
                className="w-5 h-5"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Profile Visibility
              </label>

              <select
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleChange}
                className="w-full md:w-64 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Public</option>
                <option>Private</option>
                <option>Friends Only</option>
              </select>
            </div>

            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg">
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-900 dark:text-gray-100">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
                Account Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Account settings and preferences will be available here.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
                Notification Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your notification preferences.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
                Privacy & Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Update your privacy and security settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


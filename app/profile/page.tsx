"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Profile</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6 mb-6">
            {user.profilePicture ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-600 dark:border-orange-400">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">
                  {user.firstName?.[0] || user.email[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            {user.firstName && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  First Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.firstName}</p>
              </div>
            )}
            {user.lastName && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.lastName}</p>
              </div>
            )}
            {user.username && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Username
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.username}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
            {user.phoneNumber && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Phone Number
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.phoneNumber}</p>
              </div>
            )}
            {user.deliveryAddress && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Delivery Address
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.deliveryAddress}</p>
              </div>
            )}
            {user.pinCode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Pin Code
                </label>
                <p className="text-gray-900 dark:text-gray-100">{user.pinCode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


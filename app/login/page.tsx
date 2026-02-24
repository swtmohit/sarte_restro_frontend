"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if mode parameter is set in URL
    const mode = searchParams.get("mode");
    if (mode === "signin") {
      setIsSignUp(false);
    } else if (mode === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      // Sign Up validation
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !password ||
        !confirmPassword
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      try {
        await signup({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          profilePicture: profilePicture || undefined,
        });
        router.push("/");
      } catch (err) {
        setError("Failed to create account. Please try again.");
      }
    } else {
      // Sign In validation
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      try {
        await login(email, password);
        router.push("/");
      } catch (err) {
        setError("Invalid credentials. Please try again.");
      }
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const switchMode = () => {
    const newMode = !isSignUp;
    setIsSignUp(newMode);
    setError("");
    setProfilePicture(null);
    setProfilePictureFile(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    // Update URL to reflect the current mode
    router.push(newMode ? "/login?mode=signup" : "/login?mode=signin");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 overflow-hidden">
      <div className={`w-full space-y-2 p-2.5 md:p-3 bg-[var(--card-bg)] rounded-2xl shadow-lg dark:shadow-gray-900/30 border border-[var(--card-border)] ${isSignUp ? "max-w-md" : "max-w-sm"}`}>
        <div className="text-center">
          {!isSignUp && (
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <h2 className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
          {isSignUp && (
            <div className="mt-3 mb-2">
              <label htmlFor="profilePicture" className="cursor-pointer">
                <div className="relative inline-block">
                  {profilePicture ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-600 shadow-md">
                      <img
                        src={profilePicture}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 flex items-center justify-center border-2 border-orange-600 dark:border-orange-400 shadow-md">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 bg-orange-600 dark:bg-orange-500 rounded-full p-2 border-2 border-white dark:border-gray-800 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
              <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">Click to upload profile picture</p>
            </div>
          )}
        </div>
        <form className="mt-2 space-y-2" onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded-r-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <div className={`${isSignUp ? "space-y-2.5" : "space-y-2.5"}`}>
            {isSignUp && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-xs font-semibold text-[var(--text-primary)]">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      required={isSignUp}
                      className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-xs font-semibold text-[var(--text-primary)]">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="off"
                      required={isSignUp}
                      className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label htmlFor="phoneNumber" className="block text-xs font-semibold text-[var(--text-primary)]">
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="off"
                      required={isSignUp}
                      className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
            <div className={isSignUp ? "md:col-span-2 space-y-1" : "space-y-1"}>
              <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-primary)]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={isSignUp ? "md:col-span-2 space-y-1" : "space-y-1"}>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isSignUp && (
              <div className="md:col-span-2 space-y-1">
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="off"
                  required={isSignUp}
                  className="block w-full px-2.5 py-2 border border-[var(--card-border)] rounded-lg focus:ring focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-colors text-[var(--text-primary)] placeholder-[var(--text-secondary)] bg-[var(--card-bg)] text-xs"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                  Remember me
                </label>
              </div>
            </div>
          )}
          <div className="pt-1.5">
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-2.5 px-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--accent)] transform transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg"
            >
              {isSignUp ? "Create Account" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}


"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Scroll reveal for Contact page
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-60 md:h-72 lg:h-80 w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
          }}
        />
        {/* Dark overlay to match theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

        {/* Title and Breadcrumb */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 reveal-on-scroll reveal-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
            Contact Us
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base font-semibold tracking-wide">
            <span className="uppercase text-amber-400">Home</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-amber-400">Pages</span>
            <span className="text-gray-300">/</span>
            <span className="uppercase text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Content Section (Contact for Any Query) */}
      <section className="container mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-10 reveal-on-scroll reveal-down">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-amber-500 mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Contact For Any Query
          </h2>
        </div>

        {/* Contact emails row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center">
          <div className="reveal-on-scroll reveal-left">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Booking
            </p>
            <div className="w-12 h-1 bg-amber-500 mx-auto mb-3" />
            <p className="text-amber-500 text-xl mb-1">✉</p>
            <p className="text-gray-700 dark:text-gray-300">book@example.com</p>
          </div>
          <div className="reveal-on-scroll reveal-down">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              General
            </p>
            <div className="w-12 h-1 bg-amber-500 mx-auto mb-3" />
            <p className="text-amber-500 text-xl mb-1">✉</p>
            <p className="text-gray-700 dark:text-gray-300">info@example.com</p>
          </div>
          <div className="reveal-on-scroll reveal-right">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Technical
            </p>
            <div className="w-12 h-1 bg-amber-500 mx-auto mb-3" />
            <p className="text-amber-500 text-xl mb-1">✉</p>
            <p className="text-gray-700 dark:text-gray-300">tech@example.com</p>
          </div>
        </div>

        {/* Map + Simple form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-xl overflow-hidden shadow-md shadow-gray-900/20 min-h-[280px] reveal-on-scroll reveal-left">
            <iframe
              title="Location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.35606298023!2d-74.0060152!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew%20York!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/40 p-6 md:p-8 border border-gray-200 dark:border-gray-700 flex flex-col justify-between reveal-on-scroll reveal-right">
            {submitted ? (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Message"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md shadow-amber-500/40 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


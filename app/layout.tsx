import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata: Metadata = {
  title: "Sarte Restro - Food Ordering",
  description: "Order delicious food online",
  icons: {
    icon: "/new.png",
    shortcut: "/new.png",
    apple: "/new.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <OrdersProvider>
                <Navbar />
                <main className="flex-grow pt-20 md:pt-24">{children}</main>
                <ConditionalFooter />
              </OrdersProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


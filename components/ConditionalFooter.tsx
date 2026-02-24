"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on login/signup page
  if (pathname === "/login") {
    return null;
  }

  return <Footer />;
}


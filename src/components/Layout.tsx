import React from "react";
import { SiteNav } from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}

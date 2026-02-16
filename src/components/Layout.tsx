import React from "react";
import { SiteNav } from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function Layout({
  children,
  navVariant = "overlay",
  showSocial = true,
}: {
  children: React.ReactNode;
  navVariant?: "overlay" | "solid";
  showSocial?: boolean;
}) {
  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition">
      <SiteNav variant={navVariant} />
      {children}
      <SiteFooter showSocial={showSocial} />
    </div>
  );
}

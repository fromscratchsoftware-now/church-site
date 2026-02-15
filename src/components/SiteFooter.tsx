import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";

export default function SiteFooter({ showSocial = true }: { showSocial?: boolean }) {
  return (
    <footer className="bg-burgundy-950 dark:bg-charcoal py-16 relative overflow-hidden theme-transition">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">{SITE.name}</h3>
            <p className="text-white/60 mb-6">
              {SITE.tagline} Join us as we grow together in faith, love, and service.
            </p>
            {showSocial && (
              <div className="flex flex-wrap gap-3">
                {(["facebook", "instagram", "youtube"] as const).map((social) => (
                  <a
                    key={social}
                    href={
                      social === "facebook"
                        ? SITE.links.facebook
                        : social === "instagram"
                          ? SITE.links.instagram
                          : SITE.links.youtubeLive
                    }
                    className="w-10 h-10 glass-dark hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover-lift"
                  >
                    {social === "facebook" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                      </svg>
                    )}
                    {social === "instagram" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {social === "youtube" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Plan Your Visit", to: "/#visit" },
                { label: "About Us", to: "/#about" },
                { label: "Sermons", to: "/sermons" },
                { label: "Events", to: "/events" },
                { label: "Ministries", to: "/#about" },
                { label: "Give", to: "/#giving" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/60 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              {[
                { label: "Plan Your Visit", to: "/#visit" },
                { label: "Prayer Requests", to: "/#contact" },
                { label: "Contact Us", to: "/#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/60 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Service Times</h4>
            <div className="space-y-3 text-white/60">
              <p>
                <span className="text-white">Sunday:</span> {SITE.serviceTimes.sunday}
              </p>
              <p>
                <span className="text-white">Wednesday:</span> {SITE.serviceTimes.wednesday}
              </p>
              <p className="pt-2 text-sm">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/40 text-sm">
            © 2026 {SITE.name}. All rights reserved.{" "}
            <span className="mx-2">•</span>
            Designed by {" "}
            <a
              href={SITE.links.website}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
            >
              FSS
            </a>
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

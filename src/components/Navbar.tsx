"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Check active section (only meaningful on homepage)
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On sub-pages, always treat navbar as "scrolled" so it shows solid bg + dark text
  const isScrolledStyle = scrolled || !isHome;

  // Build href: on homepage use #hash, on sub-pages use /#hash
  const navHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  const NAV_LINKS = [
    { id: "profil",     label: "Profil" },
    { id: "berita",     label: "Berita" },
    { id: "konsultasi", label: "Konsultasi" },
    { id: "galeri",     label: "Galeri" },
    { id: "opini",      label: "Opini" },
    { id: "ekonomi",    label: "Ekonomi Syariah" },
  ];

  return (
    <header
      className={`navbar ${isScrolledStyle ? "scrolled" : ""} ${
        menuOpen && !isScrolledStyle ? "menu-open" : ""
      }`}
      id="navbar"
    >
      <div className="container nav-container">
        <Link href="/" className="logo">
          Cholil Nafis
        </Link>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={navHref(id)}
              className={isHome && activeSection === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

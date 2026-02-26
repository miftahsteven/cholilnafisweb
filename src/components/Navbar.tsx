"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section
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
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        menuOpen && !scrolled ? "menu-open" : ""
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
          <a
            href="#profil"
            className={activeSection === "profil" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Profil
          </a>
          <a
            href="#berita"
            className={activeSection === "berita" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Berita
          </a>
          <a
            href="#konsultasi"
            className={activeSection === "konsultasi" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Konsultasi
          </a>
          <a
            href="#galeri"
            className={activeSection === "galeri" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Galeri
          </a>
          <a
            href="#opini"
            className={activeSection === "opini" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Opini
          </a>
          <a
            href="#ekonomi"
            className={activeSection === "ekonomi" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Ekonomi Syariah
          </a>
        </nav>
      </div>
    </header>
  );
}

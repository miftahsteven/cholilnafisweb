"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState(2023);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Cholil Nafis Official</h3>
            <p>
              Wadah informasi dan komunikasi resmi KH. Muhammad Cholil Nafis. Dikelola oleh tim manajemen untuk penyebaran ilmu yang bermanfaat dan menjalin silaturahmi dengan umat.
            </p>
          </div>
          <div className="footer-links">
            <h4>Tautan Cepat</h4>
            <ul>
              <li>
                <a href="#beranda">Beranda</a>
              </li>
              <li>
                <a href="#profil">Profil Biografi</a>
              </li>
              <li>
                <a href="#berita">Liputan Berita</a>
              </li>
              <li>
                <a href="#opini">Karya & Opini</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Koneksi</h4>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">YouTube Channel</a>
              </li>
              <li>
                <a href="#">Twitter / X</a>
              </li>
              <li>
                <a href="#">Facebook Fanspage</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; <span>{year}</span> Official Website KH. Muhammad Cholil
            Nafis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

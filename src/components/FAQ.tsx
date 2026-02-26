"use client";
import React, { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Bagaimana hukum berinvestasi di saham syariah?",
      a: "Investasi pada saham yang masuk dalam Daftar Efek Syariah (DES) diperbolehkan. Perusahaannya tidak boleh bergerak di bidang yang haram (seperti miras, perjudian, atau perbankan ribawi), dan rasio hutang ribawinya sesuai batas DSN-MUI.",
    },
    {
      q: "Apakah sistem KPR Syariah benar-benar bebas bunga?",
      a: "Ya, KPR Syariah yang benar menerapkan akad jual beli (Murabahah) atau sewa beli (Musyarakah Mutanaqisah). Keuntungan bank berasal dari margin jual beli yang transparan dan disepakati di awal, bukan bunga uang yang berlipat ganda karena waktu penundaan.",
    },
    {
      q: "Hukum menggunakan dompet digital (e-wallet) yang memberikan promo?",
      a: "Penggunaan dompet digital pada dasarnya boleh. Mengenai promo/cashback, selama saldo e-wallet disikapi sebagai bentuk titipan (Wadi'ah) murni atau pembayaran di depan, dan promo dibiayai dari anggaran marketing perusahaan (bukan dari pemutaran dana talangan pihak lain yang mensyaratkan bunga), maka hukumnya mubah menurut pandangan mayoritas dewan syariah saat ini.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
        >
          <button className="faq-question" onClick={() => handleToggle(index)}>
            {faq.q}
          </button>
          <div
            className="faq-answer"
            style={{
              maxHeight: activeIndex === index ? "500px" : "0",
            }}
          >
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSelect = (planSlug) => {
    if (!session) {
      // Belum login → Arahkan ke login dulu
      router.push(
        `/client-login?callbackUrl=/pricing/${planSlug}`
      );
    } else {
      // Sudah login → Langsung ke halaman detail paket
      router.push(`/pricing/${planSlug}`);
    }
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">

        {/* HEADER */}
        <div className="pricing-header">
          <span className="pricing-eyebrow">Paket Top-Up</span>
          <h2 className="pricing-title">Top-up saldo & layanan digital Anda</h2>
          <p className="pricing-sub">
            Paket top-up untuk kebutuhan iklan Meta Anda, ditambah daftar lengkap
            layanan tambahan seperti website, dashboard, creative, dan sistem custom.
          </p>
        </div>

        {/* GRID — PAKET TOP UP */}
        <div className="pricing-grid">

          {/* STARTER */}
          <div className="price-card">
            <div className="price-name">Starter</div>
            <div className="price-value">
              Rp 3.000.000<span>/top-up</span>
            </div>

            <ul className="price-list">
              <li>Manajemen Meta Ads</li>
              <li>Monitoring 5 hari/minggu</li>
              <li>Basic reporting</li>
              <li>Biaya layanan tetap 35%</li>
              <li>Live chat support</li>
            </ul>

            <button
              type="button"
              className="btn btn-primary price-cta"
              onClick={() => handleSelect("starter")}
            >
              Pilih Starter
            </button>
          </div>
          </div>

          {/* BUSINESS */}
          <div className="price-card price-popular">
            <div className="price-badge">Paling Populer</div>
            <div className="price-name">Business</div>
            <div className="price-value">
              Rp 6.000.000<span>/top-up</span>
            </div>

            <ul className="price-list">
              <li>Manajemen Meta Ads Premium</li>
              <li>Optimasi harian</li>
              <li>A/B Testing kreatif dasar</li>
              <li>Laporan mingguan & bulanan</li>
              <li>Biaya layanan tetap 35%</li>
              <li>Priority support</li>
            </ul>

            <button
              type="button"
              className="btn btn-primary price-cta highlight"
              onClick={() => handleSelect("business")}
            >
              Pilih Business
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="price-card enterprise-card">
            <div className="price-name">Enterprise</div>
            <div className="price-value">
              Rp 15.000.000<span>/top-up</span>
            </div>

            <ul className="price-list">
              <li>Full funnel marketing (TOF → BOF)</li>
              <li>Full creative support (desain, video, copywriting)</li>
              <li>Optimasi harian tingkat lanjut</li>
              <li>Automation & API integration</li>
              <li>Dashboard monitoring real-time</li>
              <li>Dedicated account manager</li>
            </ul>

            <button
              type="button"
              className="btn btn-primary price-cta"
              onClick={() => handleSelect("enterprise")}
            >
              Pilih Enterprise
            </button>
          </div>


        {/* ================================================== */}
        {/* LAYANAN TAMBAHAN */}
        {/* ================================================== */}

        <div className="pricing-header" style={{ marginTop: "4rem" }}>
          <span className="pricing-eyebrow">Layanan Tambahan</span>
          <h2 className="pricing-title">Layanan di Luar Pengelolaan Iklan</h2>
          <p className="pricing-sub">
            Pengerjaan tambahan seperti website, dashboard, sistem internal,
            creative, dan technical setup.
          </p>
        </div>

        {/* WEBSITE & LANDING PAGE */}
        <h3 className="extra-title">Website & Landing Page</h3>
        <table className="extra-table">
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Deskripsi</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Landing Page High-Converting</td>
              <td>Copywriting, UI/UX, form, Pixel tracking</td>
              <td>Rp 1.500.000 – Rp 3.000.000</td>
            </tr>
            <tr>
              <td>Company Profile (3–6 Halaman)</td>
              <td>Desain lengkap, SEO dasar</td>
              <td>Rp 3.500.000 – Rp 8.000.000</td>
            </tr>
            <tr>
              <td>Website e-Commerce</td>
              <td>Dashboard, payment gateway</td>
              <td>Rp 8.000.000 – Rp 18.000.000</td>
            </tr>
            <tr>
              <td>Website Custom</td>
              <td>Fitur custom sesuai kebutuhan</td>
              <td>Rp 12.000.000 – Rp 40.000.000</td>
            </tr>
          </tbody>
        </table>

        {/* SOFTWARE & DASHBOARD */}
        <h3 className="extra-title" style={{ marginTop: "3rem" }}>
          Software & Dashboard Custom
        </h3>
        <table className="extra-table">
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Deskripsi</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dashboard Ads Monitoring</td>
              <td>Grafik, statistik, export</td>
              <td>Rp 4.500.000 – Rp 12.000.000</td>
            </tr>
            <tr>
              <td>Dashboard + Meta API</td>
              <td>Sinkron otomatis dari Meta API</td>
              <td>Rp 12.000.000 – Rp 28.000.000</td>
            </tr>
            <tr>
              <td>CRM Lead Tracking</td>
              <td>Role user, activity log, reporting</td>
              <td>Rp 15.000.000 – Rp 40.000.000</td>
            </tr>
            <tr>
              <td>Sistem Internal (Sales / Inventory / HR)</td>
              <td>Full custom sesuai SOP bisnis</td>
              <td>Rp 20.000.000 – Rp 80.000.000</td>
            </tr>
          </tbody>
        </table>

        {/* CREATIVE */}
        <h3 className="extra-title" style={{ marginTop: "3rem" }}>
          Creative & Copywriting
        </h3>
        <table className="extra-table">
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Keterangan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Desain Konten Iklan</td>
              <td>1 desain single</td>
              <td>Rp 75.000 – Rp 150.000</td>
            </tr>
            <tr>
              <td>Carousel 4–6 Slide</td>
              <td>Desain & layout</td>
              <td>Rp 200.000 – Rp 350.000</td>
            </tr>
            <tr>
              <td>Video Reels ADS</td>
              <td>Motion basic</td>
              <td>Rp 350.000 – Rp 700.000</td>
            </tr>
            <tr>
              <td>Video Premium</td>
              <td>Editing cinematic</td>
              <td>Rp 850.000 – Rp 2.500.000</td>
            </tr>
            <tr>
              <td>Copywriting Iklan</td>
              <td>Headline + primary text</td>
              <td>Rp 50.000 – Rp 100.000</td>
            </tr>
            <tr>
              <td>Copywriting Landing Page</td>
              <td>Full section</td>
              <td>Rp 300.000 – Rp 900.000</td>
            </tr>
          </tbody>
        </table>

        {/* TECHNICAL */}
        <h3 className="extra-title" style={{ marginTop: "3rem" }}>
          Technical Services
        </h3>
        <table className="extra-table">
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Keterangan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Setup Pixel Meta</td>
              <td>Pixel + Event</td>
              <td>Rp 150.000 – Rp 400.000</td>
            </tr>
            <tr>
              <td>Setup Business Manager</td>
              <td>BM, asset. permission</td>
              <td>Rp 100.000 – Rp 300.000</td>
            </tr>
            <tr>
              <td>Setup Domain & DNS</td>
              <td>Verifikasi + DNS</td>
              <td>Rp 50.000 – Rp 150.000</td>
            </tr>
            <tr>
              <td>Google Meet Konsultasi</td>
              <td>Sesi 30–45 menit</td>
              <td>Rp 150.000 – Rp 300.000 / sesi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

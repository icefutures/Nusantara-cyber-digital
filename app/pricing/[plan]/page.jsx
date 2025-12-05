// app/pricing/[plan]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
export default async function PlanDetailPage({ params }) {

   const { plan } = await params;   // ✅ FIX UTAMA
  //   ^^^^^^^^^^^^^^^^^^^^^^^^^ must "await"

const PLANS = {
  starter: {
    slug: "starter",
    name: "Starter",
    subtitle: "Cocok untuk bisnis yang baru mulai beriklan secara serius.",
    priceLabel: "Rp 3.000.000 / top-up",
    priceValue: 3000000,
    packageId: 1,
    badge: "Mulai dengan aman",
    bestFor: [
      "UMKM yang baru mulai serius dengan Meta Ads",
      "Budget terbatas tapi ingin iklan tertata",
      "Butuh guidance basic dari tim kami",
    ],
    includes: [
      "Manajemen Meta Ads (1 akun iklan)",
      "Monitoring 5 hari/minggu",
      "Basic reporting (ringkasan mingguan)",
      "Biaya layanan tetap 35%",
      "Live chat support jam kerja",
    ],
  },
  business: {
    slug: "business",
    name: "Business",
    subtitle: "Untuk bisnis yang butuh optimasi harian & laporan rapi.",
    priceLabel: "Rp 6.000.000 / top-up",
    priceValue: 6000000,
    packageId: 2,
    badge: "Paling populer",
    bestFor: [
      "Bisnis yang sudah pernah iklan & ingin scale up",
      "Butuh A/B testing kreatif & copywriting yang rapi",
      "Perlu laporan mingguan + bulanan yang jelas",
    ],
    includes: [
      "Manajemen Meta Ads Premium",
      "Optimasi harian",
      "A/B Testing kreatif dasar",
      "Laporan mingguan & bulanan",
      "Biaya layanan tetap 35%",
      "Priority support",
    ],
  },
  enterprise: {
    slug: "enterprise",
    name: "Enterprise",
    subtitle:
      "Paket premium dengan eksekusi full funnel, creative lengkap, technical support lanjutan, dan integrasi sistem otomatis.",
    priceLabel: "Rp 15.000.000 / top-up",
    priceValue: 15000000,
    packageId: 3,
    badge: "Full Premium",
    bestFor: [
      "Bisnis yang ingin scale agresif & stabil",
      "Memerlukan eksekusi marketing tingkat lanjut dan automation",
      "Memiliki kebutuhan integrasi sistem, API, dashboard, dan workflow profesional",
    ],
    includes: [
      "Manajemen full funnel (TOF → MOF → BOF)",
      "Full creative support (desain, video, copywriting)",
      "Optimasi harian tingkat lanjut",
      "A/B testing kreatif lanjutan",
      "Pembuatan landing page premium (1x per bulan)",
      "Integrasi API & automation sesuai kebutuhan",
      "Setup dashboard monitoring real-time",
      "Dedicated account manager",
      "Laporan mingguan + bulanan lengkap",
      "Biaya layanan tetap 35%",
    ],
  },
};

const data = PLANS[plan];
  if (!data) return notFound();

  return (
    <section className="plan-page">
      <div className="container plan-container">

        {/* Breadcrumb */}
        <div className="plan-breadcrumb">
          <Link href="/#pricing">← Kembali ke daftar paket</Link>
        </div>

        <div className="plan-grid">

          {/* BAGIAN KIRI */}
          <div className="plan-main">
            <div className="plan-badge">{data.badge}</div>
            <h1 className="plan-title">{data.name}</h1>
            <p className="plan-subtitle">{data.subtitle}</p>

            <div className="plan-price-block">
              <div className="plan-price-label">{data.priceLabel}</div>
              <p className="plan-note">
                Top-up ini akan digunakan untuk biaya iklan + biaya layanan
                sesuai struktur kerja sama yang sudah dijelaskan.
              </p>
            </div>

            <div className="plan-section">
              <h2>Untuk siapa paket ini?</h2>
              <ul className="plan-list">
                {data.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="plan-section">
              <h2>Apa saja yang Anda dapat?</h2>
              <ul className="plan-list">
                {data.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* BAGIAN KANAN (SIDEBAR) */}
          <aside className="plan-side">
            <div className="plan-card">
              <div className="plan-card-header">
                <div className="plan-card-title">{data.name}</div>
                <div className="plan-card-price">{data.priceLabel}</div>
              </div>

              <div className="plan-card-body">
                <ul className="plan-card-points">
                  <li>Saldo akan dikelola sepenuhnya oleh tim kami.</li>
                  <li>Akses penuh ke Client Dashboard.</li>
                  <li>Progress, leads & laporan realtime.</li>
                  <li>Tidak ada kontrak jangka panjang.</li>
                </ul>

                <div className="plan-secure">
                  <span className="dot-secure" />
                  Transaksi aman & data iklan tetap milik Anda.
                </div>
              </div>

              <Link
                href={`/checkout/${data.slug}`}
                className="btn plan-cta-btn"
              >
                Lanjutkan ke Checkout
              </Link>

              <p className="plan-small-info">
                Sudah punya akun? Login untuk menghubungkan transaksi ke dashboard.
              </p>
            </div>

            <div className="plan-faq">
              <div className="plan-faq-title">Bagaimana alurnya?</div>
              <ol>
                <li>Pilih paket.</li>
                <li>Pilih metode bayar.</li>
                <li>Pembayaran terkonfirmasi → paket aktif.</li>
                <li>Semua progress bisa dipantau dari Client Dashboard.</li>
              </ol>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

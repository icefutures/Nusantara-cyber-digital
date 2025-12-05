export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="services-header">
          <span className="services-eyebrow">Layanan Kami</span>
          <h2 className="services-title">
            Solusi lengkap untuk meningkatkan performa digital bisnis Anda.
          </h2>
          <p className="services-sub">
            Kami menangani seluruh alur digital: mulai dari iklan, website, hingga sistem internal.
            Semua dikerjakan secara terukur, rapi, dan berorientasi hasil.
          </p>
        </div>

        {/* SERVICE GRID */}
        <div className="services-grid">

          {/* 01 — Meta Ads Management */}
          <div className="service-card">
            <div className="service-icon">📈</div>
            <h3 className="service-name">Manajemen Meta Ads</h3>
            <p className="service-desc">
              Iklan terstruktur berbasis data—mencakup perencanaan, eksekusi, optimasi,
              dan laporan performa yang mudah dipahami.
            </p>

            <ul className="service-list">
              <li>Strategi ads funnel (TOF → MOF → BOF)</li>
              <li>Audience riset & segmentasi</li>
              <li>Optimasi CPM, CPC & ROAS</li>
              <li>Creative testing & iterasi</li>
              <li>Laporan mingguan & bulanan</li>
            </ul>
          </div>

          {/* 02 — Website Development */}
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3 className="service-name">Pembuatan Website</h3>
            <p className="service-desc">
              Website cepat, modern, dan konversi tinggi. Dibangun custom sesuai
              kebutuhan bisnis, bukan template umum.
            </p>

            <ul className="service-list">
              <li>Landing page high-converting</li>
              <li>Company profile profesional</li>
              <li>UI/UX modern dan responsif</li>
              <li>Optimasi SEO dasar</li>
              <li>Integrasi form & tracking Pixel</li>
            </ul>
          </div>

          {/* 03 — Custom Software & Dashboard */}
          <div className="service-card">
            <div className="service-icon">🧩</div>
            <h3 className="service-name">Software & Dashboard</h3>
            <p className="service-desc">
              Sistem internal yang mempermudah operasional bisnis Anda. Mulai dari dashboard,
              CRM, automasi, hingga integrasi API.
            </p>

            <ul className="service-list">
              <li>Dashboard performa iklan</li>
              <li>CRM & sistem lead tracking</li>
              <li>Integrasi Meta API / WhatsApp API</li>
              <li>Manajemen penjualan & laporan internal</li>
              <li>Automasi operasional</li>
            </ul>
          </div>

          {/* 04 — Creative & Copywriting */}
          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3 className="service-name">Creative & Copywriting</h3>
            <p className="service-desc">
              Visual & pesan iklan yang tajam dan relevan, meningkatkan CTR dan
              memaksimalkan hasil dari setiap anggaran iklan.
            </p>

            <ul className="service-list">
              <li>Desain konten iklan</li>
              <li>Video reels / ADS</li>
              <li>Copywriting iklan berkonversi tinggi</li>
              <li>A/B testing headline & visual</li>
              <li>Brand consistency guideline</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">

        {/* ============================
            LEFT CONTENT
        ============================ */}
        <div>
          {/* Eyebrow */}
          <div className="eyebrow">
            <span className="eyebrow-pill">End-to-End Digital Performance</span>
            Meta Ads · Website · Custom Software
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Satu tim untuk <span className="highlight">iklan, website, dan sistem</span>{" "}
            yang benar-benar dipakai bisnis Anda.
          </h1>

          {/* Sub Text */}
          <p className="hero-sub">
            Nusantara Cyber Digital adalah agency independen yang menggabungkan{" "}
            <strong>performance marketing</strong> dengan{" "}
            <strong>pengembangan website dan software custom</strong>, agar funnel online
            Anda tidak hanya ramai, tapi rapi dan terukur.
          </p>

          {/* Badges */}
          <div className="hero-badges">
            <span className="badge">Meta Ads terstruktur & berbasis data</span>
            <span className="badge">Landing page & website siap konversi</span>
            <span className="badge">Dashboard & sistem custom sesuai kebutuhan</span>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary btn-sm">
              Jadwalkan Konsultasi →
            </a>
            <a href="#services" className="btn btn-ghost btn-sm">
              Lihat Layanan Lengkap
            </a>
          </div>

          {/* Note */}
          <div className="hero-note">
            <div className="hero-note-dot"></div>
            <span>
              Bisa mulai dari paket iklan saja, atau langsung full paket: Ads + Website + Sistem.
              <br />
              Tidak ada kontrak jangka panjang di awal. Kita mulai dari angka yang realistis dulu.
            </span>
          </div>
        </div>

        {/* ============================
            RIGHT DASHBOARD PANEL
        ============================ */}
        <div>
          <div className="hero-panel">

            {/* Header */}
            <div className="hero-panel-header">
              <div className="hero-panel-title">Gambaran Dashboard Klien</div>
              <div className="hero-panel-tag">Preview · Belum Terkoneksi</div>
            </div>

            {/* Metric Cards */}
            <div className="hero-metrics">
              <div className="metric-card">
                <div className="metric-label">ROAS 30 hari</div>
                <div className="metric-value">3.8x</div>
                <div className="metric-badge">+42% vs bulan lalu</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Biaya per Leads</div>
                <div className="metric-value">Rp 12.400</div>
                <div className="metric-badge">-31% cost</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Status Sistem</div>
                <div className="metric-value">Online</div>
                <div className="metric-badge">API · Website · Form aktif</div>
              </div>
            </div>

            {/* Chart */}
            <div className="hero-chart">
              <div className="chart-header">
                <span>Spend & Konversi Mingguan</span>
                <span>Contoh tampilan grafik</span>
              </div>

              <div className="chart-bars">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      height: `${35 + (i % 5) * 13}px`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Card */}
            <div className="hero-float-card">
              Ads → Website → Sistem → Laporan
              <br />
              Web ini disiapkan untuk terhubung ke Meta Ads, form lead, dan sistem internal.
              Bagian dashboard & API akan diaktifkan pada tahap pengembangan berikutnya.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

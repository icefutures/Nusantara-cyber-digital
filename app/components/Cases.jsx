export default function Cases() {
  return (
    <section className="cases" id="cases">
      <div className="container">

        {/* HEADER */}
        <div className="cases-header">
          <span className="cases-eyebrow">Studi Kasus</span>
          <h2 className="cases-title">
            Contoh hasil nyata dari project digital yang telah kami kerjakan.
          </h2>
          <p className="cases-sub">
            Setiap project memiliki kebutuhan berbeda — mulai dari iklan, website,
            automasi hingga dashboard internal. Berikut beberapa contoh hasil kerja kami.
          </p>
        </div>

        {/* GRID */}
        <div className="cases-grid">

          {/* CASE 1 */}
          <div className="case-card">
            <div className="case-tag">Meta Ads</div>
            <h3 className="case-title">Lead Cost Turun 42% dalam 30 Hari</h3>
            <p className="case-desc">
              Klien dari industri pendidikan mengalami penurunan CPL dari Rp 21.000 
              menjadi Rp 12.200 setelah restruktur kampanye, creative testing,
              dan optimasi funnel.
            </p>

            <ul className="case-list">
              <li>Restruktur funnel TOF → MOF → BOF</li>
              <li>Creative testing 6 varian</li>
              <li>Optimization menggunakan data-harian</li>
              <li>Laporan otomatis mingguan</li>
            </ul>

            <div className="case-stats">
              <div className="stat">
                <span className="stat-value">-42%</span>
                <span className="stat-label">CPL</span>
              </div>

              <div className="stat">
                <span className="stat-value">3.2x</span>
                <span className="stat-label">ROAS</span>
              </div>

              <div className="stat">
                <span className="stat-value">+68%</span>
                <span className="stat-label">Leads Masuk</span>
              </div>
            </div>
          </div>

          {/* CASE 2 */}
          <div className="case-card">
            <div className="case-tag">Website & Funnel</div>
            <h3 className="case-title">Landing Page Konversi 4.7%</h3>
            <p className="case-desc">
              Optimasi UX, copywriting, dan struktur halaman membantu meningkatkan conversion rate
              dari 1.3% menjadi 4.7% untuk campaign e-commerce niche.
            </p>

            <ul className="case-list">
              <li>Redesign landing page</li>
              <li>Copywriting berfokus value</li>
              <li>Heatmap & data behavior user</li>
              <li>A/B testing CTA & flow</li>
            </ul>

            <div className="case-stats">
              <div className="stat">
                <span className="stat-value">+261%</span>
                <span className="stat-label">Conversion Rate</span>
              </div>

              <div className="stat">
                <span className="stat-value">15s</span>
                <span className="stat-label">Faster Load Time</span>
              </div>

              <div className="stat">
                <span className="stat-value">↑</span>
                <span className="stat-label">UX Score</span>
              </div>
            </div>
          </div>

          {/* CASE 3 */}
          <div className="case-card">
            <div className="case-tag">Custom Dashboard</div>
            <h3 className="case-title">Dashboard Multi-Channel untuk Owner</h3>
            <p className="case-desc">
              Sistem internal yang menggabungkan data iklan, leads, sales, dan laporan harian
              ke dalam satu dashboard yang mudah diakses oleh pemilik bisnis.
            </p>

            <ul className="case-list">
              <li>Integrasi Meta API</li>
              <li>Tracking leads → sales</li>
              <li>Grafik & laporan otomatis</li>
              <li>Role user: Admin, Sales, Owner</li>
            </ul>

            <div className="case-stats">
              <div className="stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">Data Terintegrasi</span>
              </div>

              <div className="stat">
                <span className="stat-value">Real-time</span>
                <span className="stat-label">Monitoring</span>
              </div>

              <div className="stat">
                <span className="stat-value">Automation</span>
                <span className="stat-label">Laporan</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

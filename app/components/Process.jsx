export default function Process() {
  return (
    <section className="process" id="process">
      <div className="container">

        {/* HEADER */}
        <div className="process-header">
          <span className="process-eyebrow">Proses Kerja</span>
          <h2 className="process-title">
            Workflow yang terukur agar hasil kampanye dan sistem berjalan optimal.
          </h2>
          <p className="process-sub">
            Kami menerapkan alur kerja yang rapi dan transparan agar Anda tahu apa yang sedang berjalan
            dan bagaimana hasilnya di setiap tahap.
          </p>
        </div>

        {/* GRID */}
        <div className="process-grid">

          {/* 1 */}
          <div className="process-card">
            <div className="process-number">01</div>
            <h3 className="process-name">Analisis Kebutuhan</h3>
            <p className="process-desc">
              Audit menyeluruh strategi iklan, website, funnel, hingga proses internal bisnis Anda.
              Data ini menjadi dasar perencanaan yang presisi.
            </p>
          </div>

          {/* 2 */}
          <div className="process-card">
            <div className="process-number">02</div>
            <h3 className="process-name">Perencanaan & Strategi</h3>
            <p className="process-desc">
              Menyusun strategi iklan, struktur funnel, copywriting, dan technical setup.
              Semua terukur dan selaras dengan target bisnis.
            </p>
          </div>

          {/* 3 */}
          <div className="process-card">
            <div className="process-number">03</div>
            <h3 className="process-name">Eksekusi Terstruktur</h3>
            <p className="process-desc">
              Implementasi Meta Ads, landing page, website, hingga integrasi API & dashboard.
              Setiap proses dilakukan dengan SOP internal yang ketat.
            </p>
          </div>

          {/* 4 */}
          <div className="process-card">
            <div className="process-number">04</div>
            <h3 className="process-name">Optimasi & Laporan</h3>
            <p className="process-desc">
              Monitoring performa harian, optimasi funnel, peningkatan ROAS, hingga laporan mingguan
              & bulanan yang mudah dipahami.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

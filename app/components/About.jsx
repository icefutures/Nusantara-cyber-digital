export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">

        {/* HEADER */}
        <div className="about-header">
          <span className="about-eyebrow">Tentang Kami</span>
          <h2 className="about-title">
            Digital agency yang berfokus pada hasil, bukan sekadar tampilan.
          </h2>
          <p className="about-sub">
            Kami menggabungkan creative, ads, dan teknologi untuk memberikan solusi menyeluruh
            yang meningkatkan performa bisnis Anda secara nyata.
          </p>
        </div>

        {/* GRID */}
        <div className="about-grid">

          {/* LEFT — DESCRIPTION */}
          <div className="about-left">
            <p className="about-desc">
              Dengan pengalaman menangani berbagai sektor bisnis, kami memahami bahwa setiap bisnis
              memiliki kebutuhan unik. Karena itu, setiap strategi yang kami buat selalu berbasis data,
              terencana, dan dieksekusi dengan standar tinggi.
            </p>

            <ul className="about-list">
              <li>Manajemen iklan yang terukur dan transparan</li>
              <li>Website dan sistem internal yang dibangun khusus</li>
              <li>Creative & copywriting yang mendukung performa iklan</li>
              <li>Optimasi berkelanjutan demi ROI maksimal</li>
            </ul>

            <p className="about-desc">
              Fokus kami adalah menciptakan solusi digital yang tidak hanya terlihat profesional,
              tetapi juga memberikan dampak konversi yang nyata.
            </p>
          </div>

          {/* RIGHT — HIGHLIGHT CARD */}
          <div className="about-right">
            <div className="about-card">

              <div className="about-stats">
                <div className="about-stat">
                  <div className="stat-value">+5 Tahun</div>
                  <div className="stat-label">Pengalaman</div>
                </div>

                <div className="about-stat">
                  <div className="stat-value">120+</div>
                  <div className="stat-label">Klien Aktif</div>
                </div>

                <div className="about-stat">
                  <div className="stat-value">Rp 18M+</div>
                  <div className="stat-label">Ad Spend Dikelola</div>
                </div>

                <div className="about-stat">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">

        {/* HEADER */}
        <div className="contact-header">
          <span className="contact-eyebrow">Hubungi Kami</span>
          <h2 className="contact-title">Ayo mulai bangun performa digital bisnis Anda.</h2>
          <p className="contact-sub">
            Konsultasi gratis untuk memahami kebutuhan Anda sebelum menentukan strategi terbaik.
          </p>
        </div>

        {/* GRID */}
        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-left">
            <p className="contact-desc">
              Kami siap membantu Anda meningkatkan performa iklan, membangun website modern,
              atau membuat sistem internal yang lebih rapi dan otomatis.  
            </p>

            <ul className="contact-info">
              <li>
                <span className="info-label">WhatsApp</span>
                <a href="https://wa.me/6280000000000" target="_blank">+62 800-0000-0000</a>
              </li>

              <li>
                <span className="info-label">Email</span>
                <a href="mailto:cs@nusantara-cyber.com">cs@nusantara-cyber.com</a>
              </li>

              <li>
                <span className="info-label">Lokasi</span>
                <span>Batam · Jakarta · Medan</span>
              </li>
            </ul>

            <p className="contact-note">
              Semua sesi konsultasi dilakukan melalui WhatsApp atau Google Meet.
              Kami akan merespons dalam 1–3 jam pada jam kerja.
            </p>
          </div>

          {/* RIGHT — FORM */}
          <div className="contact-right">
            <form className="contact-form">

              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Nama Anda" />
              </div>

              <div className="form-group">
                <label>WhatsApp</label>
                <input type="text" placeholder="+62…" />
              </div>

              <div className="form-group">
                <label>Jenis Permintaan</label>
                <select>
                  <option>Manajemen Iklan</option>
                  <option>Pembuatan Website</option>
                  <option>Software & Dashboard</option>
                  <option>Creative & Copywriting</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="form-group">
                <label>Pesan</label>
                <textarea placeholder="Ceritakan kebutuhan Anda…" rows="4"></textarea>
              </div>

              <button type="submit" className="btn btn-primary contact-btn">
                Kirim Pesan
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

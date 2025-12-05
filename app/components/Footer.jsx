export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          © {new Date().getFullYear()} Nusantara Cyber Digital. Seluruh hak cipta dilindungi.
        </div>

        <div className="footer-links">
          <a href="#top-nav">Kembali ke atas</a>
          <a href="/client-login">Masuk Dashboard</a>
          <a href="/register">Daftar Klien</a>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // ⭐ Tambahan penting

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession(); // ⭐ Cek login atau tidak

  // smooth scroll BILA user sedang berada di homepage
  const handleScrollHome = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);

    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: "smooth",
      });
    }

    setOpen(false);
  };

  // Jika bukan homepage → langsung redirect ke anchor
  const goto = (section) => {
    window.location.href = `/${section}`;
    setOpen(false);
  };

  const isHome = pathname === "/";

  return (
    <header className={`navbar ${open ? "open" : ""}`} id="top-nav">
      <div className="container nav-inner">

        {/* BRAND */}
        <div className="brand">
          <div className="brand-logo">NC</div>
          <div className="brand-text">
            <div className="brand-title">Nusantara Cyber Digital</div>
            <div className="brand-sub">
              Performance Marketing · Website · Custom Software
            </div>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="nav-links">

          {/* BERANDA */}
          {!isHome ? (
            <a href="/" className="nav-link">Beranda</a>
          ) : (
            <a href="#home" className="nav-link" onClick={(e) => handleScrollHome(e, "#home")}>
              Beranda
            </a>
          )}

          {/* LAYANAN */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#services")}>Layanan</a>
          ) : (
            <a href="#services" className="nav-link" onClick={(e) => handleScrollHome(e, "#services")}>
              Layanan
            </a>
          )}

          {/* PROSES */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#process")}>Proses</a>
          ) : (
            <a href="#process" className="nav-link" onClick={(e) => handleScrollHome(e, "#process")}>
              Proses
            </a>
          )}

          {/* STUDI KASUS */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#cases")}>Studi Kasus</a>
          ) : (
            <a href="#cases" className="nav-link" onClick={(e) => handleScrollHome(e, "#cases")}>
              Studi Kasus
            </a>
          )}

          {/* PAKET */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#pricing")}>Paket</a>
          ) : (
            <a href="#pricing" className="nav-link" onClick={(e) => handleScrollHome(e, "#pricing")}>
              Paket
            </a>
          )}

          {/* TENTANG */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#about")}>Tentang</a>
          ) : (
            <a href="#about" className="nav-link" onClick={(e) => handleScrollHome(e, "#about")}>
              Tentang
            </a>
          )}

          {/* KONTAK */}
          {!isHome ? (
            <a className="nav-link" onClick={() => goto("#contact")}>Kontak</a>
          ) : (
            <a href="#contact" className="nav-link" onClick={(e) => handleScrollHome(e, "#contact")}>
              Kontak
            </a>
          )}

        </nav>

        {/* ================================
            CTA BUTTONS (UPDATED)
           ================================ */}
        <div className="nav-cta">

          {/* Saat session masih loading */}
          {status === "loading" && (
            <div className="btn btn-ghost btn-sm opacity-40">Memuat...</div>
          )}

          {/* ⭐ USER SUDAH LOGIN */}
          {session && (
            <>
              <a href="/client-dashboard" className="btn btn-primary btn-sm">
                Dashboard Klien
              </a>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Keluar
              </button>
            </>
          )}

          {/* ❌ USER BELUM LOGIN */}
          {!session && status !== "loading" && (
            <>
              <a href="/client-login" className="btn btn-ghost btn-sm">
                Masuk Dashboard
              </a>
              <a href="/client-register" className="btn btn-primary btn-sm">
                Daftar Klien <span className="icon-arrow">↗</span>
              </a>
            </>
          )}

        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span></span>
        </button>

      </div>
    </header>
  );
}

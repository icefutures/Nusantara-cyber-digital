"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function ClientRegister() {
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Registrasi manual (dummy). Nanti diarahkan ke login.");
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="auth-page">

      <div className="auth-center">
        <div className="auth-card">

          <h2 className="auth-title">Daftar Akun Klien</h2>
          <p className="auth-sub">
            Buat akun baru atau daftar dengan Google.
          </p>

          {/* REGISTER DENGAN GOOGLE (TETAP SAMA CLASSNAME) */}
          <div className="google-box">
            <button 
              className="google-btn" 
              onClick={() => signIn("google", { callbackUrl: "/client-dashboard" })}
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
              />
              <span>Daftar dengan Google</span>
            </button>
          </div>

          <div className="divider">atau</div>

          {/* FORM REGISTER MANUAL */}
          <form className="auth-form" onSubmit={handleRegister}>

            <div className="auth-field">
              <label>Nama Lengkap</label>
              <input type="text" placeholder="Nama Anda" required />
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="you@mail.com" required />
            </div>

            <div className="auth-field">
              <label>Nomor WhatsApp</label>
              <input type="text" placeholder="08xxxxxxxxxx" required />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div className="auth-field">
              <label>Konfirmasi Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>

            <div className="auth-switch">
              Sudah punya akun? <Link href="/client-login">Masuk di sini</Link>
            </div>

          </form>
        </div>
      </div>
      
    </section>
  );
}

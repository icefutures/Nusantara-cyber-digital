"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function ClientLogin() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Login manual (dummy).");
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="auth-page">

      <div className="auth-center">
        <div className="auth-card">

          <h2 className="auth-title">Masuk Akun</h2>
          <p className="auth-sub">
            Masuk dengan Google atau email & password Anda.
          </p>

          {/* LOGIN DENGAN GOOGLE (sesuai CSS kamu) */}
          <div className="google-box">
            <button className="google-btn" onClick={() => signIn("google")}>
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
              />
              <span>Masuk dengan Google</span>
            </button>
          </div>

          <div className="divider">atau</div>

          {/* FORM LOGIN MANUAL */}
          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="you@mail.com" required />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <div className="auth-forgot">
              <Link href="/forgot-password">Lupa password?</Link>
            </div>

            <div className="auth-switch">
              Belum punya akun? <Link href="/client-register">Daftar sekarang</Link>
            </div>

          </form>
        </div>
      </div>

    </section>
  );
}

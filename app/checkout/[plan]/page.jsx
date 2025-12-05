// app/checkout/[plan]/page.jsx
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const PLANS = {
  starter: {
    slug: "starter",
    name: "Starter",
    priceLabel: "Rp 3.000.000 / top-up",
    amount: 3000000,
    packageId: 1,
  },
  business: {
    slug: "business",
    name: "Business",
    priceLabel: "Rp 6.000.000 / top-up",
    amount: 6000000,
    packageId: 2,
  },
  enterprise: {
    slug: "enterprise",
    name: "Enterprise",
    priceLabel: "Harga custom (by discussion)",
    amount: 0,
    packageId: 3,
  },
};

// helper tambah hari untuk dueDate
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default async function CheckoutPage({ params }) {
  const { plan } = params;
  const data = PLANS[plan];

  if (!data) {
    notFound();
  }

  // TODO: nanti ambil dari session NextAuth
  const userId = 1;

  async function handleCheckout(formData) {
    "use server";

    const planSlug = formData.get("plan");
    const method = formData.get("paymentMethod");
    const notes = formData.get("notes") || "";

    const def = PLANS[planSlug];
    if (!def) {
      throw new Error("Paket tidak valid.");
    }

    const now = new Date();
    const due = addDays(now, 3);

    await prisma.invoices.create({
      data: {
        userId,
        packageId: def.packageId,
        amount: def.amount,
        status: "unpaid",
        dueDate: due,
        notes: `Metode: ${method || "-"} | ${notes}`,
      },
    });

    // setelah create invoice, arahkan ke halaman Tagihan di dashboard
    redirect("/client-dashboard/tagihan");
  }

  return (
    <section className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-breadcrumb">
          <a href="/#pricing">← Kembali ke paket</a>
        </div>

        <div className="checkout-grid">
          {/* KIRI: Ringkasan Paket */}
          <div className="checkout-summary">
            <div className="checkout-card">
              <div className="checkout-tag">Ringkasan Paket</div>
              <h1 className="checkout-title">{data.name}</h1>
              <p className="checkout-price-main">{data.priceLabel}</p>

              <p className="checkout-desc">
                Paket ini akan dikaitkan dengan akun klien Anda. Saldo
                digunakan untuk biaya iklan dan pengelolaan sesuai paket.
              </p>

              <ul className="checkout-list">
                <li>Monitoring dan optimasi iklan oleh tim kami.</li>
                <li>Akses penuh ke Client Dashboard untuk melihat progress.</li>
                <li>Laporan performa berkala sesuai paket yang dipilih.</li>
              </ul>

              <div className="checkout-info-box">
                <div className="checkout-info-title">
                  Penting sebelum lanjut bayar:
                </div>
                <ul>
                  <li>
                    Pastikan data akun iklan & Business Manager sudah benar.
                  </li>
                  <li>
                    Jika ada kendala, hubungi tim kami melalui menu Support di
                    dashboard.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* KANAN: Form Pembayaran */}
          <div className="checkout-form-wrapper">
            <div className="checkout-card">
              <div className="checkout-tag">Checkout</div>
              <h2 className="checkout-subtitle">
                Pilih metode pembayaran Anda
              </h2>

              <form action={handleCheckout} className="checkout-form">
                <input type="hidden" name="plan" value={data.slug} />

                {/* METODE PEMBAYARAN */}
                <div className="checkout-field">
                  <label className="checkout-label">
                    Metode pembayaran
                  </label>
                  <div className="pay-methods">
                    <label className="pay-card">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        defaultChecked
                      />
                      <div className="pay-card-body">
                        <div className="pay-title">Transfer Bank</div>
                        <div className="pay-desc">
                          Transfer manual ke rekening perusahaan (BCA/BNI/BRI).
                          Detail rekening akan ditampilkan di invoice.
                        </div>
                      </div>
                    </label>

                    <label className="pay-card">
                      <input type="radio" name="paymentMethod" value="qris" />
                      <div className="pay-card-body">
                        <div className="pay-title">QRIS</div>
                        <div className="pay-desc">
                          Scan QRIS dari mobile banking / e-wallet. Cocok untuk
                          pembayaran cepat.
                        </div>
                      </div>
                    </label>

                    <label className="pay-card">
                      <input type="radio" name="paymentMethod" value="va" />
                      <div className="pay-card-body">
                        <div className="pay-title">Virtual Account</div>
                        <div className="pay-desc">
                          Dapatkan nomor VA khusus dan lakukan pembayaran dari
                          ATM atau mobile banking.
                        </div>
                      </div>
                    </label>

                    <label className="pay-card">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                      />
                      <div className="pay-card-body">
                        <div className="pay-title">Kartu Kredit / Debit</div>
                        <div className="pay-desc">
                          Dukungan kartu kredit/debit melalui payment gateway
                          (akan diaktifkan sesuai integrasi).
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* CATATAN TAMBAHAN */}
                <div className="checkout-field">
                  <label className="checkout-label">
                    Catatan tambahan (opsional)
                  </label>
                  <textarea
                    name="notes"
                    className="checkout-textarea"
                    placeholder="Contoh: Mohon hubungi saya via WhatsApp sebelum menjalankan campaign."
                  />
                </div>

                {/* RINGKASAN TAGIHAN */}
                <div className="checkout-summary-box">
                  <div className="checkout-summary-row">
                    <span>Paket</span>
                    <span>{data.name}</span>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Nominal top-up</span>
                    <span>{data.priceLabel}</span>
                  </div>
                  <div className="checkout-summary-row total">
                    <span>Total tagihan awal</span>
                    <span>
                      {data.amount > 0
                        ? `Rp ${data.amount.toLocaleString("id-ID")}`
                        : "By discussion"}
                    </span>
                  </div>
                </div>

                {/* T&C */}
                <div className="checkout-tnc">
                  Dengan menekan tombol{" "}
                  <strong>Buat Tagihan & Lanjut Pembayaran</strong>, Anda
                  menyetujui ketentuan layanan, struktur biaya, dan cara kerja
                  yang telah dijelaskan oleh tim Nusantara Cyber Digital.
                </div>

                <button type="submit" className="btn checkout-submit-btn">
                  Buat Tagihan & Lanjut Pembayaran
                </button>

                <p className="checkout-help">
                  Setelah tagihan dibuat, detail pembayaran akan muncul di
                  menu <strong>Tagihan</strong> pada Client Dashboard.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

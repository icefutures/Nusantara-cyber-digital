// app/client-dashboard/page.jsx
import { prisma } from "@/lib/prisma"; // SESUAIKAN jika path beda

function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ClientDashboard() {
  // TODO: nanti ambil dari session
  const userId = 1;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const sevenDaysAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 6
  );

  // ================== QUERY UTAMA ==================
  const [
    activePackages,
    leadsToday,
    leadsThisMonth,
    campaignsActive,
    unpaidInvoices,
    openTickets,
    leadsLast7,
    campaignResultsLast7,
    funnelStatus,
    recentLeads,
    recentPayments,
    recentTickets,
    recentPackageHistory,
  ] = await Promise.all([
    prisma.user_packages.findMany({
      where: {
        userId,
        status: "active",
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      include: { packages: true },
      orderBy: { startDate: "desc" },
    }),

    prisma.leads.count({
      where: {
        userId,
        createdAt: { gte: startOfToday },
      },
    }),

    prisma.leads.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    }),

    prisma.campaigns.count({
      where: {
        userId,
        status: "running",
      },
    }),

    prisma.invoices.count({
      where: {
        userId,
        status: "unpaid",
      },
    }),

    prisma.tickets.count({
      where: {
        userId,
        status: { in: ["open", "in_progress"] },
      },
    }),

    // Leads 7 hari terakhir
    prisma.leads.findMany({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo },
      },
      select: { createdAt: true },
    }),

    // Hasil campaign 7 hari terakhir
    prisma.campaign_results.findMany({
      where: {
        date: { gte: sevenDaysAgo },
        campaigns: { userId },
      },
      include: { campaigns: true },
      orderBy: { date: "asc" },
    }),

    // Funnel leads (group by status)
    prisma.leads.groupBy({
      by: ["status"],
      where: { userId },
      _count: { _all: true },
    }),

    prisma.leads.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.payments.findMany({
      where: {
        invoices: {
          userId,
        },
      },
      include: {
        invoices: { include: { packages: true } },
      },
      orderBy: { paidAt: "desc" },
      take: 5,
    }),

    prisma.tickets.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.package_history.findMany({
      where: {
        user_packages: {
          userId,
        },
      },
      include: {
        user_packages: { include: { packages: true } },
      },
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  // ================== PROSES DATA UNTUK UI ==================

  const activePackage = activePackages[0] ?? null;

  // Leads per hari (7 hari terakhir)
  const leadCountsByDay = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    leadCountsByDay[key] = 0;
  }

  leadsLast7.forEach((l) => {
    const key = new Date(l.createdAt).toISOString().slice(0, 10);
    if (leadCountsByDay[key] != null) {
      leadCountsByDay[key] += 1;
    }
  });

  const leadChartLabels = Object.keys(leadCountsByDay).map((k) =>
    new Date(k).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })
  );
  const leadChartValues = Object.values(leadCountsByDay);

  const maxLeadValue = Math.max(...leadChartValues, 1);

  // Campaign performance agregat (klik & impresi)
  const campaignsAgg = {};
  campaignResultsLast7.forEach((row) => {
    const key = row.campaigns.name;
    if (!campaignsAgg[key]) {
      campaignsAgg[key] = { impressions: 0, clicks: 0, cost: 0 };
    }
    campaignsAgg[key].impressions += row.impressions;
    campaignsAgg[key].clicks += row.clicks;
    campaignsAgg[key].cost += Number(row.cost || 0);
  });

  const campaignPerf = Object.entries(campaignsAgg).map(
    ([name, { impressions, clicks, cost }]) => ({
      name,
      impressions,
      clicks,
      ctr: impressions ? (clicks / impressions) * 100 : 0,
      cpc: clicks ? cost / clicks : 0,
    })
  );

  // Funnel data dari groupBy leads_status
  const funnelOrder = ["new", "contacted", "qualified", "customer"];
  const funnelLabelsMap = {
    new: "Lead Baru",
    contacted: "Sudah Dihubungi",
    qualified: "Qualified",
    customer: "Customer",
  };
  const funnelCounts = {};
  funnelOrder.forEach((s) => (funnelCounts[s] = 0));
  funnelStatus.forEach((row) => {
    funnelCounts[row.status] = row._count._all;
  });
  const maxFunnel = Math.max(...Object.values(funnelCounts), 1);

  // Activity feed (gabung beberapa sumber)
  const activities = [
    ...recentLeads.map((l) => ({
      type: "lead",
      time: l.createdAt,
      label: `Lead baru: ${l.name || "Tanpa nama"}`,
      detail: l.phone || "-",
    })),
    ...recentPayments.map((p) => ({
      type: "payment",
      time: p.paidAt,
      label: `Pembayaran: Rp ${p.amount.toLocaleString("id-ID")}`,
      detail: p.invoices.packages
        ? `Paket ${p.invoices.packages.name}`
        : `Invoice #${p.invoiceId}`,
    })),
    ...recentTickets.map((t) => ({
      type: "ticket",
      time: t.createdAt,
      label: `Ticket: ${t.subject}`,
      detail: t.status,
    })),
    ...recentPackageHistory.map((h) => ({
      type: "package",
      time: h.date,
      label: `Paket ${h.action}: ${
        h.user_packages.packages?.name || "Tanpa nama paket"
      }`,
      detail: h.note || "",
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 7);

  return (
    <div className="dash-main">
      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard Klien</h1>
          <p className="dash-subtitle">
            Ringkasan performa & informasi akun Anda.
          </p>
        </div>
        <div className="dash-header-badge">
          <span className="dot-online" />
          Akun aktif
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="dash-grid dash-grid-quick">
        <div className="dash-card dash-card-highlight">
          <div className="dash-card-title">Paket Aktif</div>
          {activePackage ? (
            <>
              <div className="dash-package-name">
                {activePackage.packages?.name || "Tanpa nama paket"}
              </div>
              <div className="dash-package-desc">
                Berakhir:{" "}
                {activePackage.endDate
                  ? formatDate(activePackage.endDate)
                  : "Tanpa batas"}
              </div>
            </>
          ) : (
            <div className="dash-package-empty">
              Belum ada paket aktif. Hubungi tim kami untuk aktivasi.
            </div>
          )}
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Leads Hari Ini</div>
          <div className="dash-card-number accent-blue">{leadsToday}</div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Leads Bulan Ini</div>
          <div className="dash-card-number accent-green">{leadsThisMonth}</div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Campaign Aktif</div>
          <div className="dash-card-number accent-yellow">
            {campaignsActive}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Tagihan Belum Dibayar</div>
          <div className="dash-card-number accent-red">
            {unpaidInvoices}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Tiket Support Terbuka</div>
          <div className="dash-card-number accent-purple">
            {openTickets}
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="dash-grid dash-grid-charts">
        {/* LEAD 7 HARI */}
        <div className="dash-card chart-card">
          <div className="chart-header">
            <h3>Leads 7 Hari Terakhir</h3>
            <span className="chart-sub">
              Total {leadChartValues.reduce((a, b) => a + b, 0)} leads
            </span>
          </div>
          <div className="chart-bars">
            {leadChartValues.map((val, idx) => {
              const height = (val / maxLeadValue) * 100;
              return (
                <div key={idx} className="chart-bar-wrapper">
                  <div
                    className="chart-bar chart-bar-blue"
                    style={{ height: `${height || 5}%` }}
                    title={`${leadChartLabels[idx]}: ${val} lead`}
                  />
                  <div className="chart-bar-label">{leadChartLabels[idx]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PERFORMANCE CAMPAIGN */}
        <div className="dash-card chart-card">
          <div className="chart-header">
            <h3>Performa Campaign 7 Hari Terakhir</h3>
            <span className="chart-sub">
              CTR & CPC berdasarkan agregat data
            </span>
          </div>

          {campaignPerf.length === 0 ? (
            <div className="empty-state">Belum ada data campaign.</div>
          ) : (
            <div className="campaign-list">
              {campaignPerf.map((c) => (
                <div key={c.name} className="campaign-row">
                  <div className="campaign-main">
                    <div className="campaign-name">{c.name}</div>
                    <div className="campaign-meta">
                      {c.impressions.toLocaleString("id-ID")} impresi •{" "}
                      {c.clicks.toLocaleString("id-ID")} klik
                    </div>
                  </div>
                  <div className="campaign-metrics">
                    <div className="metric">
                      <span>CTR</span>
                      <strong>{c.ctr.toFixed(1)}%</strong>
                    </div>
                    <div className="metric">
                      <span>CPC</span>
                      <strong>
                        Rp {Math.round(c.cpc).toLocaleString("id-ID")}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FUNNEL + ACTIVITY */}
      <div className="dash-grid dash-grid-bottom">
        {/* FUNNEL */}
        <div className="dash-card">
          <div className="chart-header">
            <h3>Funnel Leads</h3>
            <span className="chart-sub">Dari lead baru sampai customer</span>
          </div>
          <div className="funnel-wrapper">
            {funnelOrder.map((key, idx) => {
              const count = funnelCounts[key];
              const width = (count / maxFunnel) * 100;
              return (
                <div key={key} className="funnel-row">
                  <div className="funnel-label">
                    <span className={`funnel-step-badge step-${idx + 1}`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="funnel-title">
                        {funnelLabelsMap[key]}
                      </div>
                      <div className="funnel-count">
                        {count} lead
                        {count !== 1 && "s"}
                      </div>
                    </div>
                  </div>
                  <div className="funnel-bar-track">
                    <div
                      className={`funnel-bar step-${idx + 1}`}
                      style={{ width: `${width || 4}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTIVITY FEED + PAKET DETAIL */}
        <div className="dash-card">
          <div className="chart-header">
            <h3>Aktivitas Terbaru</h3>
            <span className="chart-sub">
              Lead, pembayaran, ticket & paket terakhir
            </span>
          </div>

          {activities.length === 0 ? (
            <div className="empty-state">
              Belum ada aktivitas. Data akan muncul setelah ada traffic.
            </div>
          ) : (
            <ul className="activity-list">
              {activities.map((a, idx) => (
                <li key={idx} className="activity-item">
                  <div className={`activity-icon type-${a.type}`} />
                  <div className="activity-body">
                    <div className="activity-top">
                      <span className="activity-label">{a.label}</span>
                      <span className="activity-time">
                        {formatDate(a.time)} • {formatTime(a.time)}
                      </span>
                    </div>
                    {a.detail && (
                      <div className="activity-detail">{a.detail}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {activePackage && (
            <div className="dash-card-footer">
              <div className="footer-title">
                Detail Paket Aktif: {activePackage.packages?.name}
              </div>
              <div className="footer-row">
                <span>Masa aktif</span>
                <span>
                  {activePackage.startDate
                    ? formatDate(activePackage.startDate)
                    : "-"}{" "}
                  –{" "}
                  {activePackage.endDate
                    ? formatDate(activePackage.endDate)
                    : "Tanpa batas"}
                </span>
              </div>
              <div className="footer-row">
                <span>Status</span>
                <span className="status-pill status-active">Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

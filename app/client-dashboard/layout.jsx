"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiLayers,
  FiBarChart2,
  FiFileText,
  FiCreditCard,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const path = usePathname();

  // true = sidebar lebar (desktop) / terbuka (mobile)
  // false = sidebar collapsed (desktop) / tertutup (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // submenu mana yang lagi dibuka
  const [openMenu, setOpenMenu] = useState("/client-dashboard/paket");

  const menu = [
    {
      name: "Dashboard",
      href: "/client-dashboard",
      icon: FiHome,
    },
    {
      name: "Paket Saya",
      href: "/client-dashboard/paket",
      icon: FiLayers,
      children: [
        {
          name: "Ringkasan Paket",
          href: "/client-dashboard/paket",
        },
        {
          name: "Riwayat Aktivasi",
          href: "/client-dashboard/paket/history",
        },
      ],
    },
    {
      name: "Progress",
      href: "/client-dashboard/progress",
      icon: FiBarChart2,
      children: [
        {
          name: "Funnel & Leads",
          href: "/client-dashboard/progress/funnel",
        },
        {
          name: "Hasil Campaign",
          href: "/client-dashboard/progress/campaign",
        },
      ],
    },
    {
      name: "Laporan",
      href: "/client-dashboard/laporan",
      icon: FiFileText,
      children: [
        {
          name: "Laporan Bulanan",
          href: "/client-dashboard/laporan/bulanan",
        },
        {
          name: "Laporan Custom",
          href: "/client-dashboard/laporan/custom",
        },
      ],
    },
    {
      name: "Tagihan",
      href: "/client-dashboard/tagihan",
      icon: FiCreditCard,
      children: [
        {
          name: "Tagihan Aktif",
          href: "/client-dashboard/tagihan",
        },
        {
          name: "Riwayat Pembayaran",
          href: "/client-dashboard/tagihan/history",
        },
      ],
    },
    {
      name: "Support",
      href: "/client-dashboard/support",
      icon: FiHelpCircle,
    },
  ];

  const isActive = (href) => path === href;
  const isParentActive = (href) => path.startsWith(href);

  return (
    <div
      className={`dashboard-wrapper ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >
      {/* TOGGLE – SELALU ADA */}
      <button
        type="button"
        className="dash-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        className={`dash-sidebar ${
          sidebarOpen ? "open" : "closed"
        }`}
      >
        <div className="dash-sidebar-header">
          <div className="dash-logo">CLIENT AREA</div>
        </div>

        <nav className="dash-menu">
          {menu.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const submenuOpen = hasChildren && openMenu === item.href;

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`dash-menu-item ${
                    isParentActive(item.href) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      setOpenMenu(submenuOpen ? "" : item.href);
                    } else {
                      // di mobile: tutup drawer setelah klik
                      setSidebarOpen(false);
                    }
                  }}
                >
                  {Icon && (
                    <span className="icon">
                      <Icon />
                    </span>
                  )}
                  <span className="dash-menu-label">{item.name}</span>

                  {hasChildren && (
                    <span
                      className={`chevron ${
                        submenuOpen ? "open" : ""
                      }`}
                    >
                      <FiChevronDown />
                    </span>
                  )}
                </Link>

                {hasChildren && submenuOpen && (
                  <div className="dash-submenu">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`dash-submenu-item ${
                          isActive(sub.href) ? "active" : ""
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* KONTEN */}
      <main className="dash-content">{children}</main>
    </div>
  );
}

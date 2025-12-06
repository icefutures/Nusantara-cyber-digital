// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const USER_EMAIL = 'jrong6757@gmail.com';

async function main() {
  console.log('🚀 Start seeding...');

  // 1. Ambil user utama (yang login pakai Google)
  const user = await prisma.user.findUnique({
    where: { email: USER_EMAIL },
  });

  if (!user) {
    console.error(
      `❌ User dengan email ${USER_EMAIL} tidak ditemukan. Login dulu dengan Google sebelum menjalankan seed.`
    );
    process.exit(1);
  }

  console.log('✅ Using user:', user.id, user.email);

  // 2. Seed PACKAGES
  console.log('➡ Seeding packages...');
  const starter = await prisma.packages.create({
    data: {
      name: 'Starter',
      description:
        'Paket dasar untuk bisnis yang baru mulai beriklan secara online.',
      price: 2500000,
      duration_days: 30,
    },
  });

  const business = await prisma.packages.create({
    data: {
      name: 'Business',
      description:
        'Paket menengah untuk bisnis yang ingin scale up dengan optimasi funnel & tracking.',
      price: 7500000,
      duration_days: 60,
    },
  });

  const enterprise = await prisma.packages.create({
    data: {
      name: 'Enterprise',
      description:
        'Paket premium dengan full managed service & custom reporting untuk brand besar.',
      price: 20000000,
      duration_days: 90,
    },
  });

  // 3. Seed USER_PACKAGES + PACKAGE_HISTORY
  console.log('➡ Seeding user_packages & package_history...');
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); // aktif sejak 7 hari lalu
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 23); // sisa 23 hari (total 30)

  const activeUserPackage = await prisma.user_packages.create({
    data: {
      userId: user.id,
      packageId: starter.id,
      status: 'active',
      startDate,
      endDate,
    },
  });

  await prisma.package_history.createMany({
    data: [
      {
        userPackageId: activeUserPackage.id,
        action: 'activated',
        note: 'Paket Starter pertama kali diaktifkan.',
      },
      {
        userPackageId: activeUserPackage.id,
        action: 'renewed',
        note: 'Perpanjangan otomatis setelah masa trial.',
      },
    ],
  });

  // 4. Seed CAMPAIGNS
  console.log('➡ Seeding campaigns...');
  const campaignData = [
    {
      userId: user.id,
      platform: 'facebook',
      name: 'FB - Lead Gen Form - Nusantara Cyber Digital',
      status: 'running',
      dailyBudget: 500000,
    },
    {
      userId: user.id,
      platform: 'facebook',
      name: 'FB - Retargeting Website Visitors',
      status: 'paused',
      dailyBudget: 300000,
    },
    {
      userId: user.id,
      platform: 'google',
      name: 'Google Ads - Brand Search Nusantara',
      status: 'running',
      dailyBudget: 400000,
    },
    {
      userId: user.id,
      platform: 'tiktok',
      name: 'TikTok Ads - Creative Test 01',
      status: 'running',
      dailyBudget: 250000,
    },
  ];

  const campaigns = [];
  for (const c of campaignData) {
    const created = await prisma.campaigns.create({ data: c });
    campaigns.push(created);
  }

  // 5. Seed LEADS
  console.log('➡ Seeding leads...');
  const leadStatusList = ['new', 'contacted', 'qualified', 'unqualified', 'customer'];
  const leadsData = [];

  for (let i = 0; i < 25; i++) {
    const campaign = campaigns[i % campaigns.length];
    const status = leadStatusList[i % leadStatusList.length];

    leadsData.push({
      userId: user.id,
      campaignId: campaign.id,
      name: `Lead ${i + 1}`,
      phone: `62812${Math.floor(1000000 + Math.random() * 8999999)}`,
      status,
      source:
        campaign.platform === 'facebook'
          ? 'Facebook Ads'
          : campaign.platform === 'google'
          ? 'Google Ads'
          : 'TikTok Ads',
    });
  }

  await prisma.leads.createMany({ data: leadsData });

  // 6. Seed CAMPAIGN_RESULTS (performansi harian)
  console.log('➡ Seeding campaign_results...');
  const resultsData = [];
  const daysBack = 10;

  for (const camp of campaigns) {
    for (let d = daysBack; d >= 1; d--) {
      const date = new Date();
      date.setDate(date.getDate() - d);

      const impressions = 1000 + Math.floor(Math.random() * 5000);
      const clicks = 50 + Math.floor(Math.random() * 300);
      const cost = 50000 + Math.floor(Math.random() * 300000);
      const cpc = cost / clicks;
      const cpm = (cost / impressions) * 1000;
      const ctr = (clicks / impressions) * 100;

      resultsData.push({
        campaignId: camp.id,
        date,
        impressions,
        clicks,
        cost,
        cpc,
        cpm,
        ctr,
      });
    }
  }

  await prisma.campaign_results.createMany({ data: resultsData });

  // 7. Seed INVOICES + PAYMENTS
  console.log('➡ Seeding invoices & payments...');
  const invoice1 = await prisma.invoices.create({
    data: {
      userId: user.id,
      packageId: starter.id,
      amount: 2500000,
      status: 'paid',
      dueDate: new Date(),
      notes: 'Invoice pertama - Paket Starter',
    },
  });

  const invoice2 = await prisma.invoices.create({
    data: {
      userId: user.id,
      packageId: business.id,
      amount: 7500000,
      status: 'unpaid',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      notes: 'Upgrade ke Paket Business (belum dibayar)',
    },
  });

  const invoice3 = await prisma.invoices.create({
    data: {
      userId: user.id,
      packageId: enterprise.id,
      amount: 20000000,
      status: 'overdue',
      dueDate: new Date(new Date().setDate(new Date().getDate() - 10)),
      notes: 'Paket Enterprise (overdue)',
    },
  });

  await prisma.payments.create({
    data: {
      invoiceId: invoice1.id,
      amount: 2500000,
      method: 'Bank Transfer',
    },
  });

  // 8. Seed REPORTS (custom & monthly)
  console.log('➡ Seeding reports_custom & reports_monthly...');

  await prisma.reports_custom.createMany({
    data: [
      {
        userId: user.id,
        title: 'Laporan Performance Q4 - Funnel Lead Gen',
        content:
          'Ringkasan performa funnel lead gen Q4: cost per lead turun 18%, CTR naik 6%, ROAS membaik di segmen retargeting.',
      },
      {
        userId: user.id,
        title: 'Analisa Creative TikTok - Testing 01',
        content:
          'Video dengan hook “bisnis sepi pelanggan?” memiliki retention rate tertinggi di 3 detik pertama.',
      },
      {
        userId: user.id,
        title: 'Rekomendasi Budget Allocation Januari',
        content:
          'Disarankan fokus 60% di Facebook Lead Gen, 25% di Google Brand Search, 15% eksplorasi di TikTok.',
      },
    ],
  });

  const nowMonth = new Date().getMonth(); // 0-11
  const nowYear = new Date().getFullYear();

  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    monthlyData.push({
      userId: user.id,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      summary: `Ringkasan performa bulan ${date.getMonth() + 1}/${date.getFullYear()} untuk semua campaign utama.`,
    });
  }

  await prisma.reports_monthly.createMany({ data: monthlyData });

  // 9. Seed TICKETS + TICKET_MESSAGES
  console.log('➡ Seeding tickets & ticket_messages...');

  const ticket1 = await prisma.tickets.create({
    data: {
      userId: user.id,
      subject: 'Minta bantu cek pixel tidak tracking Add To Cart',
      status: 'in_progress',
    },
  });

  const ticket2 = await prisma.tickets.create({
    data: {
      userId: user.id,
      subject: 'Minta laporan bulanan versi PDF',
      status: 'open',
    },
  });

  const ticket3 = await prisma.tickets.create({
    data: {
      userId: user.id,
      subject: 'Perubahan nomor WhatsApp pada landing page',
      status: 'closed',
    },
  });

  await prisma.ticket_messages.createMany({
    data: [
      {
        ticketId: ticket1.id,
        sender: 'client',
        message:
          'Mas, pixel di website saya kayaknya tidak tracking Add To Cart dari iklan Facebook.',
      },
      {
        ticketId: ticket1.id,
        sender: 'admin',
        message:
          'Baik kak, mohon kirimkan URL landing page dan screenshot Events Manager-nya ya.',
      },
      {
        ticketId: ticket1.id,
        sender: 'client',
        message:
          'Ini sudah saya kirim detailnya via WhatsApp, mohon dicek ya.',
      },

      {
        ticketId: ticket2.id,
        sender: 'client',
        message:
          'Bisa tolong kirim laporan campaign bulan ini dalam bentuk PDF?',
      },
      {
        ticketId: ticket2.id,
        sender: 'admin',
        message:
          'Siap kak, akan kami kirim ke email terdaftar maksimal H+1.',
      },

      {
        ticketId: ticket3.id,
        sender: 'client',
        message:
          'Saya mau ganti nomor WA CS di landing page jadi 6281234567890.',
      },
      {
        ticketId: ticket3.id,
        sender: 'admin',
        message:
          'Sudah kami update nomor WA di semua landing page aktif kak.',
      },
      {
        ticketId: ticket3.id,
        sender: 'client',
        message:
          'Sudah saya cek, semua sudah benar. Terima kasih ya!',
      },
    ],
  });

  console.log('✅ Seeding selesai tanpa error.');
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

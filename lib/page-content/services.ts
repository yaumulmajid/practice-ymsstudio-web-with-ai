// Service landing pages (/layanan/<slug>) and the local pages (/jasa-website-<city>), ID + EN.
// Prices, timelines and package features come from the CMS pricing section (tierIndex);
// a service without a tier (custom web app) shows the CMS "custom" block instead.
import type { Lang } from "@/lib/i18n"

type Item = { title: string; text: string }
type Faq = { q: string; a: string }

export type ServiceCopy = {
  name: string
  title: string
  em: string
  description: string
  intro: string
  forWho: string[]
  benefits: Item[]
  faqs: Faq[]
}

export type Service = {
  slug: string
  /** Index into the CMS pricing tiers; null = custom pricing. */
  tierIndex: number | null
  /** Project slugs shown as examples (first matches win). */
  projects: string[]
  copy: Record<Lang, ServiceCopy>
}

export const services: Service[] = [
  {
    slug: "jasa-landing-page",
    tierIndex: 0,
    projects: ["the-donut-experiment", "haris-jaya", "sarasa"],
    copy: {
      id: {
        name: "Landing Page",
        title: "Jasa pembuatan",
        em: "landing page",
        description:
          "Jasa pembuatan landing page untuk UMKM dan kampanye iklan: desain custom, cepat, mobile-friendly, SEO dasar, dan tombol WhatsApp. Selesai 5–7 hari kerja.",
        intro:
          "Satu halaman yang fokus menjual: menjelaskan produk atau jasa Anda dengan jelas, menjawab keraguan calon pelanggan, dan mengarahkan mereka untuk chat WhatsApp atau memesan. Cocok untuk promosi produk, kampanye iklan, atau bisnis yang baru mulai online.",
        forWho: [
          "UMKM yang ingin punya website pertama dengan cepat dan hemat.",
          "Kampanye Google Ads atau Meta Ads yang butuh halaman tujuan khusus.",
          "Peluncuran produk, event, atau promo musiman.",
          "Jasa lokal yang ingin pelanggan langsung menghubungi lewat WhatsApp.",
        ],
        benefits: [
          { title: "Struktur yang menjual", text: "Urutan konten disusun dari masalah pelanggan, solusi, bukti, hingga ajakan bertindak, bukan sekadar halaman yang cantik." },
          { title: "Cepat dibuka di HP", text: "Mayoritas pengunjung datang dari HP. Halaman ringan membuat iklan Anda tidak boros dan pengunjung tidak kabur." },
          { title: "Siap diukur", text: "Google Analytics 4, Meta Pixel, dan pelacakan klik WhatsApp terpasang, jadi Anda tahu iklan mana yang menghasilkan chat." },
          { title: "Desain custom", text: "Dibuat sesuai karakter brand Anda, bukan template pasaran yang dipakai ribuan website lain." },
        ],
        faqs: [
          { q: "Apa bedanya landing page dengan company profile?", a: "Landing page berisi satu halaman dengan satu tujuan, misalnya mendapat chat atau pesanan. Company profile terdiri dari beberapa halaman yang memperkenalkan bisnis secara lengkap. Untuk iklan dan promosi produk, landing page biasanya lebih efektif." },
          { q: "Berapa lama pembuatan landing page?", a: "Umumnya 5–7 hari kerja setelah materi (logo, foto, dan informasi produk) lengkap, termasuk waktu revisi." },
          { q: "Apakah sudah termasuk domain dan hosting?", a: "Ya, paket landing page sudah termasuk domain .com dan hosting untuk 1 tahun pertama, plus SSL." },
          { q: "Bisakah landing page dikembangkan jadi website lengkap nanti?", a: "Bisa. Landing page dapat ditambah halaman atau di-upgrade ke company profile atau toko online ketika bisnis Anda berkembang." },
        ],
      },
      en: {
        name: "Landing Page",
        title: "Landing page",
        em: "design in Indonesia",
        description:
          "Landing page design for small businesses and ad campaigns: custom design, fast, mobile-friendly, basic SEO, and a WhatsApp button. Ready in 5–7 business days.",
        intro:
          "One page built to sell: it explains your product or service clearly, answers buyers' doubts, and leads them to chat on WhatsApp or place an order. Ideal for product promotions, ad campaigns, or businesses just getting online.",
        forWho: [
          "Small businesses that want a first website quickly and affordably.",
          "Google Ads or Meta Ads campaigns that need a dedicated destination page.",
          "Product launches, events, or seasonal promotions.",
          "Local services that want customers to reach out on WhatsApp right away.",
        ],
        benefits: [
          { title: "A structure that sells", text: "Content flows from the customer's problem to your solution, proof, and a clear call to action, not just a pretty page." },
          { title: "Fast on phones", text: "Most visitors arrive on a phone. A lightweight page keeps your ad spend efficient and visitors from bouncing." },
          { title: "Ready to measure", text: "Google Analytics 4, Meta Pixel, and WhatsApp click tracking are set up, so you know which ads bring in chats." },
          { title: "Custom design", text: "Designed around your brand, not an off-the-shelf template shared by thousands of sites." },
        ],
        faqs: [
          { q: "What's the difference between a landing page and a company profile?", a: "A landing page is a single page with one goal, such as getting a chat or an order. A company profile has several pages that introduce your business in full. For ads and product promotion, a landing page is usually more effective." },
          { q: "How long does a landing page take?", a: "Usually 5–7 business days once materials (logo, photos, and product information) are ready, including revisions." },
          { q: "Are the domain and hosting included?", a: "Yes. The landing page package includes a .com domain and hosting for the first year, plus SSL." },
          { q: "Can the landing page grow into a full website later?", a: "Yes. You can add pages or upgrade to a company profile or online store as your business grows." },
        ],
      },
    },
  },
  {
    slug: "jasa-company-profile",
    tierIndex: 1,
    projects: ["haris-jaya", "ibrahima-place", "the-donut-experiment"],
    copy: {
      id: {
        name: "Company Profile",
        title: "Jasa website",
        em: "company profile",
        description:
          "Jasa pembuatan website company profile profesional: hingga 6 halaman + blog, CMS untuk edit konten sendiri, SEO lengkap, Google Business Profile, dan email bisnis.",
        intro:
          "Website company profile membuat bisnis Anda terlihat kredibel saat dicari calon pelanggan, partner, atau investor. Kami merancang halaman layanan, tentang kami, portofolio, hingga blog, lengkap dengan SEO agar bisnis Anda mudah ditemukan di Google.",
        forWho: [
          "Perusahaan jasa (kontraktor, konsultan, klinik, bengkel, servis AC) yang ingin tampil profesional.",
          "Bisnis B2B yang sering diminta \"ada website-nya?\" oleh calon klien.",
          "UMKM yang ingin muncul di Google untuk pencarian lokal.",
          "Bisnis yang ingin mengelola konten dan artikel sendiri tanpa repot.",
        ],
        benefits: [
          { title: "Kredibel di mata klien", text: "Desain rapi sesuai identitas brand, lengkap dengan portofolio dan testimoni yang membangun kepercayaan." },
          { title: "Mudah ditemukan", text: "SEO on-page lengkap, Search Console, dan setup Google Business Profile agar muncul saat orang mencari jasa Anda." },
          { title: "Edit konten sendiri", text: "CMS yang mudah dipakai untuk mengganti teks, foto, dan menulis artikel tanpa perlu developer." },
          { title: "Email bisnis", text: "Alamat email dengan domain sendiri (nama@bisnisanda.com) yang terlihat lebih profesional." },
        ],
        faqs: [
          { q: "Berapa halaman yang didapat di paket company profile?", a: "Hingga 6 halaman ditambah blog, misalnya Beranda, Tentang Kami, Layanan, Portofolio, Kontak, dan satu halaman tambahan sesuai kebutuhan." },
          { q: "Apakah saya bisa mengubah isi website sendiri?", a: "Bisa. Website dilengkapi CMS sehingga Anda dapat mengganti teks, foto, dan menulis artikel sendiri. Kami juga memberi panduan singkat cara memakainya." },
          { q: "Apakah website akan muncul di Google?", a: "Kami memasang SEO on-page lengkap, menghubungkan Google Search Console, dan menyiapkan Google Business Profile. Peringkat tetap dipengaruhi persaingan dan konten, tetapi fondasinya sudah siap sejak awal." },
          { q: "Berapa lama pengerjaannya?", a: "Umumnya 7–14 hari kerja tergantung jumlah halaman dan kelengkapan materi." },
        ],
      },
      en: {
        name: "Company Profile",
        title: "Company profile",
        em: "websites in Indonesia",
        description:
          "Professional company profile website design: up to 6 pages + blog, a CMS to edit your own content, full SEO, Google Business Profile setup, and business email.",
        intro:
          "A company profile website makes your business look credible when prospects, partners, or investors look you up. We design your services, about, portfolio, and blog pages, with SEO built in so your business is easy to find on Google.",
        forWho: [
          "Service companies (contractors, consultants, clinics, workshops, AC servicing) that want to look professional.",
          "B2B businesses that keep hearing \"do you have a website?\" from prospects.",
          "Small businesses that want to show up in local Google searches.",
          "Businesses that want to manage their own content and articles easily.",
        ],
        benefits: [
          { title: "Credible to clients", text: "A clean design matched to your brand, with portfolio and testimonials that build trust." },
          { title: "Easy to find", text: "Full on-page SEO, Search Console, and Google Business Profile setup so you appear when people search for your services." },
          { title: "Edit your own content", text: "An easy CMS to change text and photos and write articles without a developer." },
          { title: "Business email", text: "An email address on your own domain (name@yourbusiness.com) that looks more professional." },
        ],
        faqs: [
          { q: "How many pages are in the company profile package?", a: "Up to 6 pages plus a blog, for example Home, About, Services, Portfolio, Contact, and one more page you need." },
          { q: "Can I update the website myself?", a: "Yes. The website comes with a CMS so you can change text and photos and write articles yourself. We also give you a short guide." },
          { q: "Will the website show up on Google?", a: "We set up full on-page SEO, connect Google Search Console, and prepare your Google Business Profile. Rankings still depend on competition and content, but the foundations are in place from day one." },
          { q: "How long does it take?", a: "Usually 7–14 business days depending on the number of pages and how ready your materials are." },
        ],
      },
    },
  },
  {
    slug: "jasa-toko-online",
    tierIndex: 2,
    projects: ["sarasa", "the-donut-experiment"],
    copy: {
      id: {
        name: "Toko Online",
        title: "Jasa pembuatan",
        em: "toko online",
        description:
          "Jasa pembuatan website toko online: katalog produk, keranjang & checkout, payment gateway (Midtrans/Xendit), ongkir otomatis, order via WhatsApp, dan dashboard admin.",
        intro:
          "Jual produk langsung dari website sendiri, tanpa potongan komisi marketplace. Pelanggan dapat memilih produk, menghitung ongkir, dan membayar online, sementara Anda mengelola pesanan dan stok dari satu dashboard.",
        forWho: [
          "Brand yang ingin lepas dari ketergantungan marketplace dan potongan komisinya.",
          "Penjual yang ramai di Instagram/WhatsApp tapi kewalahan mencatat pesanan manual.",
          "Bisnis kuliner, fashion, kosmetik, atau produk lokal yang ingin terlihat lebih profesional.",
          "Usaha yang butuh fitur khusus, seperti pre-order, pilihan tanggal, atau harga berjenjang.",
        ],
        benefits: [
          { title: "Pembayaran otomatis", text: "Terhubung ke payment gateway seperti Midtrans atau Xendit: transfer bank, e-wallet, dan QRIS langsung terverifikasi." },
          { title: "Ongkir & pesanan rapi", text: "Ongkir dihitung otomatis dan pesanan tercatat di dashboard, tidak tercecer di chat." },
          { title: "Data pelanggan milik Anda", text: "Berbeda dengan marketplace, data dan hubungan dengan pelanggan sepenuhnya milik bisnis Anda." },
          { title: "Siap iklan", text: "SEO produk, GA4 e-commerce, dan Meta Pixel terpasang untuk mengukur penjualan dari setiap kampanye." },
        ],
        faqs: [
          { q: "Apakah toko online bisa menerima pembayaran QRIS dan e-wallet?", a: "Bisa, melalui payment gateway seperti Midtrans atau Xendit yang mendukung transfer bank, kartu, e-wallet, dan QRIS. Pendaftaran akun payment gateway atas nama bisnis Anda." },
          { q: "Apakah ada batasan jumlah produk?", a: "Tidak ada. Anda bisa menambahkan produk sebanyak yang dibutuhkan, lengkap dengan varian seperti ukuran dan warna." },
          { q: "Bisakah pelanggan tetap pesan lewat WhatsApp?", a: "Bisa. Selain checkout otomatis, kami bisa menambahkan tombol pesan via WhatsApp yang mengirim detail pesanan langsung ke chat Anda." },
          { q: "Berapa lama pembuatan toko online?", a: "Umumnya 14–21 hari kerja, termasuk setup payment gateway, ongkir, dan training cara mengelola toko." },
        ],
      },
      en: {
        name: "Online Store",
        title: "Online store",
        em: "development in Indonesia",
        description:
          "Online store website development: product catalogue, cart & checkout, payment gateway (Midtrans/Xendit), automatic shipping rates, WhatsApp orders, and an admin dashboard.",
        intro:
          "Sell straight from your own website, without marketplace commissions. Customers pick products, calculate shipping, and pay online, while you manage orders and stock from one dashboard.",
        forWho: [
          "Brands that want to rely less on marketplaces and their commissions.",
          "Sellers busy on Instagram/WhatsApp who are swamped by manual order notes.",
          "Food, fashion, cosmetics, or local product businesses that want to look more professional.",
          "Businesses that need special features such as pre-orders, date selection, or tiered pricing.",
        ],
        benefits: [
          { title: "Automatic payments", text: "Connected to payment gateways such as Midtrans or Xendit: bank transfers, e-wallets, and QRIS are verified instantly." },
          { title: "Tidy shipping & orders", text: "Shipping is calculated automatically and orders land in a dashboard, not scattered across chats." },
          { title: "You own customer data", text: "Unlike marketplaces, the customer data and relationships belong entirely to your business." },
          { title: "Ad-ready", text: "Product SEO, GA4 e-commerce, and Meta Pixel are set up to measure sales from every campaign." },
        ],
        faqs: [
          { q: "Can the store accept QRIS and e-wallet payments?", a: "Yes, through payment gateways such as Midtrans or Xendit, which support bank transfers, cards, e-wallets, and QRIS. The gateway account is registered in your business's name." },
          { q: "Is there a limit on the number of products?", a: "No. You can add as many products as you need, with variants such as size and colour." },
          { q: "Can customers still order via WhatsApp?", a: "Yes. Besides automatic checkout, we can add an order-via-WhatsApp button that sends the order details straight to your chat." },
          { q: "How long does an online store take?", a: "Usually 14–21 business days, including payment gateway and shipping setup and training on running your store." },
        ],
      },
    },
  },
  {
    slug: "jasa-web-app",
    tierIndex: null,
    projects: ["lan-ri", "loopnet", "ibrahima-place"],
    copy: {
      id: {
        name: "Web App Custom",
        title: "Jasa pembuatan",
        em: "web app custom",
        description:
          "Jasa pembuatan web app dan sistem custom: sistem informasi, booking & reservasi, portal member, dashboard, dan integrasi API, dibangun sesuai alur kerja bisnis Anda.",
        intro:
          "Ketika spreadsheet dan aplikasi umum sudah tidak cukup, web app custom dibangun mengikuti alur kerja bisnis Anda: dari sistem booking, portal pelanggan, hingga sistem informasi instansi. Bisa diakses dari browser di HP maupun laptop, tanpa perlu instal aplikasi.",
        forWho: [
          "Bisnis dengan proses manual yang memakan waktu, seperti pencatatan, approval, atau laporan.",
          "Usaha jasa yang butuh sistem booking, reservasi, atau jadwal online.",
          "Instansi atau organisasi yang membutuhkan sistem informasi dan pengolahan data.",
          "Startup yang ingin membangun MVP produk digital.",
        ],
        benefits: [
          { title: "Sesuai alur kerja Anda", text: "Kami pelajari prosesnya lebih dulu, lalu membangun fitur yang benar-benar dipakai, bukan fitur yang tidak perlu." },
          { title: "Teknologi modern", text: "Dibangun dengan teknologi yang teruji, misalnya Spring Boot, Vue, Next.js, dan PostgreSQL, sesuai kebutuhan project." },
          { title: "Aman & bisa berkembang", text: "Login dengan hak akses, backup, dan struktur kode yang mudah dikembangkan saat kebutuhan bertambah." },
          { title: "Integrasi", text: "Terhubung dengan sistem lain lewat API: payment gateway, WhatsApp, email, atau sistem internal Anda." },
        ],
        faqs: [
          { q: "Berapa biaya pembuatan web app custom?", a: "Biaya dihitung dari jumlah dan kerumitan fitur. Setelah diskusi kebutuhan, kami kirim penawaran detail berisi fitur, jadwal, dan biaya sebelum project dimulai." },
          { q: "Berapa lama pengerjaannya?", a: "Tergantung ruang lingkup. MVP sederhana bisa beberapa minggu, sistem yang lebih besar dikerjakan bertahap per modul agar bisa segera dipakai." },
          { q: "Apakah saya mendapat source code-nya?", a: "Ya. Setelah pelunasan, source code dan desain yang dibuat khusus untuk Anda menjadi milik Anda, sesuai syarat layanan kami." },
          { q: "Apakah ada dukungan setelah aplikasi live?", a: "Ada masa dukungan untuk perbaikan bug, dan kami menyediakan paket maintenance untuk pengembangan fitur selanjutnya." },
        ],
      },
      en: {
        name: "Custom Web App",
        title: "Custom web app",
        em: "development in Indonesia",
        description:
          "Custom web app and system development: information systems, booking & reservations, member portals, dashboards, and API integrations, built around your business workflow.",
        intro:
          "When spreadsheets and generic apps aren't enough, a custom web app is built around how your business actually works: from booking systems and customer portals to an agency's information system. It runs in the browser on phones and laptops, with nothing to install.",
        forWho: [
          "Businesses with time-consuming manual processes, such as record-keeping, approvals, or reports.",
          "Service businesses that need online booking, reservations, or scheduling.",
          "Agencies or organisations that need an information system and data processing.",
          "Startups that want to build an MVP of a digital product.",
        ],
        benefits: [
          { title: "Built around your workflow", text: "We study the process first, then build the features you'll actually use, nothing you don't need." },
          { title: "Modern technology", text: "Built with proven technology such as Spring Boot, Vue, Next.js, and PostgreSQL, chosen to fit the project." },
          { title: "Secure & scalable", text: "Role-based login, backups, and a codebase that's easy to extend as your needs grow." },
          { title: "Integrations", text: "Connected to other systems via API: payment gateways, WhatsApp, email, or your internal tools." },
        ],
        faqs: [
          { q: "How much does a custom web app cost?", a: "The cost depends on the number and complexity of features. After discussing your needs, we send a detailed quote with features, schedule, and cost before the project starts." },
          { q: "How long does it take?", a: "It depends on scope. A simple MVP can take a few weeks; larger systems are delivered module by module so you can start using them sooner." },
          { q: "Do I get the source code?", a: "Yes. Once paid in full, the source code and design created for you belong to you, as set out in our terms of service." },
          { q: "Is there support after launch?", a: "There's a support period for bug fixes, and we offer maintenance plans for further feature development." },
        ],
      },
    },
  },
  {
    slug: "jasa-website-white-label",
    tierIndex: null,
    projects: ["lan-ri", "loopnet", "ibrahima-place"],
    copy: {
      id: {
        name: "White Label & Klien Luar Negeri",
        title: "Jasa website",
        em: "white label untuk agensi",
        description:
          "Jasa pembuatan website white label untuk agensi digital, freelancer, dan klien luar negeri: Anda tetap memegang klien, kami mengerjakan desain dan development tanpa mencantumkan nama kami. Bisa dengan NDA, komunikasi dalam bahasa Indonesia atau Inggris.",
        intro:
          "Untuk agensi dan freelancer yang kebanjiran proyek, serta bisnis di luar negeri yang ingin bekerja sama dengan studio di Indonesia. Kami mengerjakan landing page, company profile, toko online, dan web app atas nama brand Anda, dengan alur kerja dan komunikasi yang jelas dari brief sampai serah terima.",
        forWho: [
          "Agensi digital dan freelancer yang butuh tim produksi tambahan tanpa merekrut karyawan baru.",
          "Agensi luar negeri (misalnya Singapura, Malaysia, Australia) yang mencari partner development di Indonesia.",
          "Perusahaan asing di Indonesia yang butuh website dwibahasa Indonesia–Inggris.",
          "Startup dan bisnis luar negeri yang ingin membuat website atau web app dengan biaya lebih efisien.",
        ],
        benefits: [
          { title: "Tanpa nama kami", text: "Website diserahkan atas nama brand Anda. Tidak ada kredit atau link YMS Studio, dan NDA bisa ditandatangani sebelum proyek dimulai." },
          { title: "Komunikasi dua bahasa", text: "Brief, update progres, dan dokumentasi bisa dalam bahasa Indonesia atau Inggris, lewat email, WhatsApp, Slack, atau video call." },
          { title: "Next.js & WordPress", text: "Kami bisa bekerja di repository, hosting, dan alur deploy milik Anda atau klien Anda, sesuai standar tim Anda." },
          { title: "Penawaran per proyek", text: "Harga dihitung dari lingkup pekerjaan dan dikirim sebelum mulai, dalam Rupiah atau dolar AS." },
        ],
        faqs: [
          { q: "Apa itu website white label?", a: "Kami yang mengerjakan websitenya, tetapi Anda yang menyerahkan ke klien atas nama brand Anda. Klien Anda tidak perlu tahu bahwa pengerjaannya dibantu oleh kami." },
          { q: "Apakah bisa menandatangani NDA?", a: "Bisa. NDA ditandatangani sebelum Anda membagikan detail klien atau proyek." },
          { q: "Berapa biayanya?", a: "Paket standar kami mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Proyek white label dan web app dihitung per lingkup pekerjaan." },
          { q: "Bagaimana sistem pembayarannya?", a: "Uang muka di awal proyek dan pelunasan setelah website disetujui, sebelum serah terima. Mata uang dan metode pembayaran disepakati di penawaran." },
        ],
      },
      en: {
        name: "Outsourced Web Development",
        title: "Outsource web development to",
        em: "Indonesia",
        description:
          "Outsource web design and development to a studio in Indonesia: white-label builds for agencies, plus landing pages, company profiles, online stores, and custom web apps in Next.js or WordPress. English communication, NDA available, quotes in USD or IDR.",
        intro:
          "For agencies with more projects than hands, and for businesses abroad that want a reliable development partner in Indonesia. We build landing pages, company profiles, online stores, and web apps under your brand, with a clear process and clear communication from brief to handover.",
        forWho: [
          "Digital agencies and freelancers that need extra production capacity without hiring.",
          "Agencies in Singapore, Malaysia, Australia, and beyond looking for a development partner in Indonesia.",
          "Foreign companies operating in Indonesia that need a bilingual English–Indonesian website.",
          "Startups and businesses abroad that want a website or web app built cost-effectively.",
        ],
        benefits: [
          { title: "White label", text: "The site is delivered under your brand, with no YMS Studio credit or link. We're happy to sign an NDA before the project starts." },
          { title: "Clear communication in English", text: "Briefs, progress updates, and documentation in English, over email, Slack, WhatsApp, or video call. We work on UTC+7, which overlaps with Asia-Pacific business hours and European mornings." },
          { title: "Next.js & WordPress", text: "We can work in your repository, hosting, and deployment pipeline, following your team's standards." },
          { title: "Fixed quotes", text: "Each project is quoted from its scope before work begins, in US dollars or Indonesian rupiah." },
        ],
        faqs: [
          { q: "How much does it cost to outsource a website to Indonesia?", a: "Our standard packages start at IDR 2 million for a landing page (about US$120), IDR 3.5 million for a company profile (about US$210), and IDR 6 million for an online store (about US$365), at current exchange rates. White-label and custom web app projects are quoted per scope." },
          { q: "What does white label mean here?", a: "We build the website, and you deliver it to your client under your own brand. There's no YMS Studio credit on the site, and your client doesn't need to know we were involved." },
          { q: "Which time zone do you work in?", a: "We're in Indonesia (UTC+7). That overlaps fully with Singapore, Malaysia, and Australia, and with European mornings. Updates are shared on a live preview link, so you can review progress whenever suits you." },
          { q: "Will you sign an NDA?", a: "Yes. We sign an NDA before you share client or project details." },
          { q: "How does payment work?", a: "A down payment at the start and the balance once you approve the website, before handover. The currency and payment method are agreed in the quote." },
        ],
      },
    },
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

/** Local SEO pages: /jasa-website-<city>. The studio is in Cikarang (Bekasi Regency). */
export const LOCAL_CITIES = ["cikarang", "bekasi", "jakarta", "karawang", "depok"] as const
export type LocalCity = (typeof LOCAL_CITIES)[number]
/** Short city names for links between local pages (kept separate so client bundles stay small). */
export const LOCAL_SHORT: Record<LocalCity, string> = { cikarang: "Cikarang", bekasi: "Bekasi", jakarta: "Jakarta", karawang: "Karawang", depok: "Depok" }

export type LocalCopy = ServiceCopy & { areas: string[]; areasTitle: string; remote: string }

export type LocalPage = {
  city: LocalCity
  /** Small label above the page title. */
  label: string
  /** Cities for the Service structured data (areaServed). */
  areaServed: string[]
  copy: Record<Lang, LocalCopy>
}

const cikarang: Record<Lang, LocalCopy> = {
  id: {
    name: "Jasa Website Cikarang",
    title: "Jasa pembuatan website di",
    em: "Cikarang",
    description:
      "Jasa pembuatan website di Cikarang untuk UMKM, vendor kawasan industri, dan perusahaan: company profile, landing page, toko online, dan web app. Studio di Cikarang Timur, mulai Rp 2 juta.",
    intro:
      "Studio YMS Studio ada di Cikarang Timur. Kami membuat website untuk UMKM, vendor pabrik, dan perusahaan di Cikarang dan kawasan industrinya, mulai dari Jababeka, Lippo Cikarang, sampai MM2100, supaya bisnis Anda terlihat meyakinkan dan mudah ditemukan lewat Google.",
    areasTitle: "Area yang kami layani",
    areas: ["Cikarang Timur", "Cikarang Utara", "Cikarang Selatan", "Cikarang Barat", "Cikarang Pusat", "Jababeka", "Lippo Cikarang", "Kota Deltamas", "MM2100", "Seluruh Indonesia (online)"],
    remote:
      "Karena satu kota, pertemuan langsung di Cikarang mudah diatur. Konsultasi juga bisa lewat WhatsApp atau video call kalau lebih praktis.",
    forWho: [
      "Vendor dan supplier di kawasan industri Cikarang (Jababeka, MM2100, EJIP, Delta Silicon, GIIC) yang butuh company profile untuk tender dan calon klien.",
      "UMKM, toko, dan kuliner di Cikarang yang ingin muncul saat dicari di Google Maps dan Google Search.",
      "Jasa lokal (bengkel, klinik, kos dan kontrakan, katering, kontraktor) yang ingin pelanggan langsung menghubungi lewat WhatsApp.",
      "Perusahaan yang lebih nyaman bekerja sama dengan tim yang bisa ditemui langsung.",
    ],
    benefits: [
      { title: "Studio di Cikarang", text: "Kami berkantor di Jatireja, Cikarang Timur. Rapat, pengambilan foto lokasi, atau serah terima bisa dilakukan tatap muka." },
      { title: "Paham bisnis industri", text: "Company profile yang menonjolkan sertifikasi, kapasitas produksi, dan daftar klien, yang biasa diminta oleh bagian purchasing pabrik." },
      { title: "SEO lokal", text: "Halaman, data terstruktur, dan Google Business Profile disiapkan agar bisnis Anda muncul untuk pencarian seperti \"jasa ... Cikarang\"." },
      { title: "Harga transparan", text: "Paket mulai Rp 2 juta dengan rincian jelas, tanpa biaya tersembunyi, plus dukungan via WhatsApp setelah website live." },
    ],
    faqs: [
      { q: "Di mana lokasi YMS Studio?", a: "Kami berlokasi di Jatireja, Cikarang Timur, Kabupaten Bekasi, Jawa Barat. Lokasinya bisa dilihat di Google Maps melalui tautan di footer website." },
      { q: "Berapa biaya pembuatan website di Cikarang?", a: "Paket kami mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Web app custom dihitung sesuai kebutuhan." },
      { q: "Apakah bisa bertemu langsung?", a: "Bisa. Untuk klien di Cikarang dan sekitarnya, kami bisa datang ke kantor Anda atau bertemu di lokasi yang disepakati." },
      { q: "Apakah bisa membuat company profile untuk vendor pabrik?", a: "Bisa. Kami menyusun halaman profil perusahaan, produk atau layanan, sertifikasi, galeri proyek, dan daftar klien, juga versi bahasa Inggris bila dibutuhkan untuk klien asing di kawasan industri." },
      { q: "Apakah bisa membantu bisnis muncul di Google Maps?", a: "Bisa. Paket company profile dan toko online sudah termasuk setup Google Business Profile, yang menentukan tampilnya bisnis Anda di Google Maps." },
    ],
  },
  en: {
    name: "Web Design in Cikarang",
    title: "Web design & development in",
    em: "Cikarang",
    description:
      "Website design and development in Cikarang for small businesses, industrial-estate vendors, and companies: company profiles, landing pages, online stores, and web apps. Studio in East Cikarang, from IDR 2 million.",
    intro:
      "YMS Studio is based in East Cikarang. We build websites for small businesses, factory vendors, and companies in Cikarang and its industrial estates, from Jababeka and Lippo Cikarang to MM2100, so your business looks credible and is easy to find on Google.",
    areasTitle: "Areas we serve",
    areas: ["East Cikarang", "North Cikarang", "South Cikarang", "West Cikarang", "Central Cikarang", "Jababeka", "Lippo Cikarang", "Kota Deltamas", "MM2100", "All of Indonesia (online)"],
    remote: "We're in the same town, so in-person meetings in Cikarang are easy to arrange. Consultations can also happen over WhatsApp or video call if that's easier.",
    forWho: [
      "Vendors and suppliers in Cikarang's industrial estates (Jababeka, MM2100, EJIP, Delta Silicon, GIIC) that need a company profile for tenders and prospects.",
      "Small businesses, shops, and restaurants in Cikarang that want to show up on Google Maps and Google Search.",
      "Local services (workshops, clinics, boarding houses, caterers, contractors) that want customers to reach out on WhatsApp.",
      "Companies that prefer working with a team they can meet in person.",
    ],
    benefits: [
      { title: "A studio in Cikarang", text: "Our office is in Jatireja, East Cikarang. Meetings, on-site photos, and handover can happen face to face." },
      { title: "We know industrial buyers", text: "Company profiles that highlight certifications, production capacity, and client lists, the things factory purchasing teams ask for." },
      { title: "Local SEO", text: "Pages, structured data, and Google Business Profile are set up so you appear for searches like \"... service Cikarang\"." },
      { title: "Transparent pricing", text: "Packages from IDR 2 million with clear details and no hidden fees, plus WhatsApp support once your site is live." },
    ],
    faqs: [
      { q: "Where is YMS Studio located?", a: "We're in Jatireja, East Cikarang, Bekasi Regency, West Java. You can find us on Google Maps via the link in the website footer." },
      { q: "How much does a website cost in Cikarang?", a: "Our packages start at IDR 2 million for a landing page, IDR 3.5 million for a company profile, and IDR 6 million for an online store. Custom web apps are priced to your needs." },
      { q: "Can we meet in person?", a: "Yes. For clients in and around Cikarang, we can come to your office or meet at a place that suits you." },
      { q: "Can you build a company profile for a factory vendor?", a: "Yes. We put together the company profile, products or services, certifications, project gallery, and client list, with an English version if you work with foreign clients in the industrial estates." },
      { q: "Can you help my business show up on Google Maps?", a: "Yes. The company profile and online store packages include Google Business Profile setup, which is what puts your business on Google Maps." },
    ],
  },
}

const bekasi: Record<Lang, LocalCopy> = {
  id: {
    name: "Jasa Website Bekasi",
    title: "Jasa pembuatan website di",
    em: "Bekasi",
    description:
      "Jasa pembuatan website di Bekasi untuk UMKM dan perusahaan: landing page, company profile, toko online, dan web app. Desain custom, SEO lokal, mulai Rp 2 juta.",
    intro:
      "YMS Studio berbasis di Kabupaten Bekasi. Kami membantu UMKM, toko, dan perusahaan jasa di Kota dan Kabupaten Bekasi tampil profesional secara online dan mudah ditemukan pelanggan lewat Google.",
    areasTitle: "Area yang kami layani",
    areas: ["Kota Bekasi", "Kabupaten Bekasi", "Bekasi Barat", "Bekasi Timur", "Bekasi Selatan", "Tambun", "Cibitung", "Cikarang", "Seluruh Indonesia (online)"],
    remote:
      "Konsultasi bisa lewat WhatsApp atau video call. Untuk klien di area Bekasi, pertemuan langsung bisa dijadwalkan bila dibutuhkan.",
    forWho: [
      "UMKM dan toko lokal di Bekasi yang ingin muncul saat dicari di Google Maps dan Google Search.",
      "Perusahaan dan vendor di Bekasi yang butuh company profile untuk tender dan calon klien.",
      "Jasa lokal (bengkel, klinik, katering, kontraktor) yang ingin pelanggan langsung menghubungi lewat WhatsApp.",
      "Bisnis yang lebih nyaman bekerja sama dengan tim yang lokasinya dekat.",
    ],
    benefits: [
      { title: "SEO lokal", text: "Halaman, data terstruktur, dan Google Business Profile disiapkan agar bisnis Anda muncul untuk pencarian seperti \"jasa ... Bekasi\"." },
      { title: "Tim yang dekat", text: "Berkantor di Cikarang, kami memahami pasar dan karakter pelanggan di Bekasi dan sekitarnya." },
      { title: "Harga transparan", text: "Paket mulai Rp 2 juta dengan rincian jelas di halaman harga, tanpa biaya tersembunyi." },
      { title: "Dukungan setelah live", text: "Bantuan teknis via WhatsApp setelah website online, plus opsi maintenance bulanan." },
    ],
    faqs: [
      { q: "Di mana lokasi YMS Studio?", a: "Kami berlokasi di Jatireja, Cikarang Timur, Kabupaten Bekasi, Jawa Barat. Lokasinya bisa dilihat di Google Maps melalui tautan di footer website." },
      { q: "Apakah melayani klien di luar Bekasi?", a: "Ya. Kami melayani klien di seluruh Indonesia secara online; seluruh proses dari konsultasi hingga serah terima bisa dilakukan jarak jauh." },
      { q: "Berapa biaya pembuatan website di Bekasi?", a: "Paket kami mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Web app custom dihitung sesuai kebutuhan." },
      { q: "Apakah bisa membantu bisnis muncul di Google Maps?", a: "Bisa. Paket company profile dan toko online sudah termasuk setup Google Business Profile, yang menentukan tampilnya bisnis Anda di Google Maps." },
    ],
  },
  en: {
    name: "Web Design in Bekasi",
    title: "Web design & development in",
    em: "Bekasi",
    description:
      "Website design and development in Bekasi for small businesses and companies: landing pages, company profiles, online stores, and web apps. Custom design, local SEO, from IDR 2 million.",
    intro:
      "YMS Studio is based in Bekasi Regency. We help small businesses, shops, and service companies across Bekasi City and Bekasi Regency look professional online and get found by customers on Google.",
    areasTitle: "Areas we serve",
    areas: ["Bekasi City", "Bekasi Regency", "West Bekasi", "East Bekasi", "South Bekasi", "Tambun", "Cibitung", "Cikarang", "All of Indonesia (online)"],
    remote: "Consultations can happen over WhatsApp or video call. For clients around Bekasi, in-person meetings can be arranged when needed.",
    forWho: [
      "Small businesses and local shops in Bekasi that want to show up on Google Maps and Google Search.",
      "Companies and vendors in Bekasi that need a company profile for tenders and prospects.",
      "Local services (workshops, clinics, caterers, contractors) that want customers to reach out on WhatsApp.",
      "Businesses that prefer working with a team located nearby.",
    ],
    benefits: [
      { title: "Local SEO", text: "Pages, structured data, and Google Business Profile are set up so you appear for searches like \"... service Bekasi\"." },
      { title: "A team nearby", text: "Based in Cikarang, we understand the market and customers in Bekasi and the surrounding area." },
      { title: "Transparent pricing", text: "Packages from IDR 2 million, with clear details on the pricing section and no hidden fees." },
      { title: "Support after launch", text: "Technical help over WhatsApp once your website is live, plus optional monthly maintenance." },
    ],
    faqs: [
      { q: "Where is YMS Studio located?", a: "We're in Jatireja, East Cikarang, Bekasi Regency, West Java. You can find us on Google Maps via the link in the website footer." },
      { q: "Do you work with clients outside Bekasi?", a: "Yes. We serve clients across Indonesia online; the whole process from consultation to handover can be done remotely." },
      { q: "How much does a website cost in Bekasi?", a: "Our packages start at IDR 2 million for a landing page, IDR 3.5 million for a company profile, and IDR 6 million for an online store. Custom web apps are priced to your needs." },
      { q: "Can you help my business show up on Google Maps?", a: "Yes. The company profile and online store packages include Google Business Profile setup, which is what puts your business on Google Maps." },
    ],
  },
}

const jakarta: Record<Lang, LocalCopy> = {
  id: {
    name: "Jasa Website Jakarta",
    title: "Jasa pembuatan website untuk bisnis di",
    em: "Jakarta",
    description:
      "Jasa pembuatan website untuk UMKM, startup, dan perusahaan di Jakarta: landing page, company profile, toko online, dan web app. Desain custom, SEO, mulai Rp 2 juta.",
    intro:
      "Studio kami ada di Cikarang, sekitar satu jam dari Jakarta lewat Tol Jakarta–Cikampek. Sebagian besar klien Jakarta bekerja sama dengan kami sepenuhnya online: brief lewat WhatsApp, presentasi desain lewat video call, dan revisi langsung di link preview.",
    areasTitle: "Wilayah Jakarta yang kami layani",
    areas: ["Jakarta Timur", "Jakarta Selatan", "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Seluruh Jabodetabek"],
    remote:
      "Semua tahap bisa dilakukan jarak jauh. Bila Anda lebih suka bertemu langsung, kami bisa menjadwalkan pertemuan di Jakarta, terutama di wilayah timur.",
    forWho: [
      "UMKM dan toko di Jakarta yang ingin tampil profesional dan dihubungi pelanggan lewat WhatsApp.",
      "Startup yang butuh landing page cepat untuk validasi produk atau kampanye iklan.",
      "Perusahaan jasa dan konsultan yang butuh company profile untuk meyakinkan calon klien korporat.",
      "Brand yang ingin berjualan langsung lewat toko online sendiri, bukan hanya marketplace.",
    ],
    benefits: [
      { title: "Harga lebih bersahabat", text: "Kualitas agency dengan harga studio: paket mulai Rp 2 juta dengan rincian yang jelas sejak awal." },
      { title: "Proses online yang rapi", text: "Brief, desain, revisi, dan serah terima berjalan lewat WhatsApp dan link preview, tanpa harus bolak-balik bertemu." },
      { title: "Siap untuk iklan", text: "Halaman cepat, mobile-friendly, dan sudah terpasang tracking konversi untuk Google Ads dan Meta Ads." },
      { title: "SEO sejak awal", text: "Struktur halaman, metadata, dan data terstruktur disiapkan agar bisnis Anda bisa bersaing di pencarian Jakarta." },
    ],
    faqs: [
      { q: "Apakah harus bertemu langsung?", a: "Tidak. Sebagian besar klien Jakarta bekerja sama dengan kami secara online. Pertemuan langsung tetap bisa dijadwalkan bila dibutuhkan." },
      { q: "Berapa biaya pembuatan website di Jakarta?", a: "Harga kami sama untuk semua kota: mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Web app custom dihitung sesuai kebutuhan." },
      { q: "Berapa lama pengerjaannya?", a: "Landing page biasanya selesai dalam 1–2 minggu, company profile 2–3 minggu, dan toko online 3–5 minggu, tergantung kesiapan materi." },
      { q: "Bagaimana sistem pembayarannya?", a: "Pembayaran dibagi dua: uang muka di awal proyek dan pelunasan setelah website disetujui, sebelum dipindahkan ke domain Anda." },
    ],
  },
  en: {
    name: "Web Design in Jakarta",
    title: "Web design & development for businesses in",
    em: "Jakarta",
    description:
      "Website design and development for small businesses, startups, and companies in Jakarta: landing pages, company profiles, online stores, and web apps. Custom design, SEO, from IDR 2 million.",
    intro:
      "Our studio is in Cikarang, about an hour from Jakarta via the Jakarta–Cikampek toll road. Most of our Jakarta clients work with us entirely online: the brief over WhatsApp, design presentations over video call, and revisions on a live preview link.",
    areasTitle: "Parts of Jakarta we serve",
    areas: ["East Jakarta", "South Jakarta", "Central Jakarta", "North Jakarta", "West Jakarta", "All of Greater Jakarta"],
    remote: "Every step can be done remotely. If you prefer to meet in person, we can schedule a meeting in Jakarta, especially in the east of the city.",
    forWho: [
      "Small businesses and shops in Jakarta that want to look professional and get customers messaging them on WhatsApp.",
      "Startups that need a fast landing page to validate a product or run an ad campaign.",
      "Service firms and consultants that need a company profile to win over corporate clients.",
      "Brands that want to sell through their own online store, not only through marketplaces.",
    ],
    benefits: [
      { title: "Friendlier pricing", text: "Agency-quality work at studio prices: packages from IDR 2 million with clear details from the start." },
      { title: "A tidy online process", text: "Brief, design, revisions, and handover run over WhatsApp and preview links, with no need for repeated meetings." },
      { title: "Ready for ads", text: "Fast, mobile-friendly pages with conversion tracking set up for Google Ads and Meta Ads." },
      { title: "SEO from day one", text: "Page structure, metadata, and structured data are set up so your business can compete in Jakarta searches." },
    ],
    faqs: [
      { q: "Do we need to meet in person?", a: "No. Most of our Jakarta clients work with us online. In-person meetings can still be scheduled when needed." },
      { q: "How much does a website cost in Jakarta?", a: "Our prices are the same for every city: from IDR 2 million for a landing page, IDR 3.5 million for a company profile, and IDR 6 million for an online store. Custom web apps are priced to your needs." },
      { q: "How long does it take?", a: "A landing page usually takes 1–2 weeks, a company profile 2–3 weeks, and an online store 3–5 weeks, depending on how ready your content is." },
      { q: "How does payment work?", a: "Payment is split in two: a down payment at the start and the balance once you approve the website, before it moves to your domain." },
    ],
  },
}

const karawang: Record<Lang, LocalCopy> = {
  id: {
    name: "Jasa Website Karawang",
    title: "Jasa pembuatan website di",
    em: "Karawang",
    description:
      "Jasa pembuatan website di Karawang untuk UMKM, vendor industri, dan perusahaan: company profile, landing page, toko online, dan web app. Dekat dari Cikarang, mulai Rp 2 juta.",
    intro:
      "Karawang bertetangga langsung dengan Cikarang, tempat studio kami berada. Kami membantu UMKM, vendor, dan perusahaan di sekitar kawasan industri Karawang punya website yang meyakinkan calon klien dan mudah ditemukan di Google.",
    areasTitle: "Area Karawang yang kami layani",
    areas: ["Karawang Barat", "Karawang Timur", "Telukjambe", "Klari", "Cikampek", "Kawasan industri KIIC & Suryacipta"],
    remote: "Karena lokasinya dekat, pertemuan langsung di Karawang mudah dijadwalkan. Konsultasi lewat WhatsApp atau video call juga bisa.",
    forWho: [
      "Vendor dan supplier pabrik yang butuh company profile untuk pengajuan vendor dan tender.",
      "UMKM dan toko lokal di Karawang yang ingin muncul di Google Maps dan pencarian Google.",
      "Jasa lokal (katering, bengkel, kontraktor, klinik) yang ingin pelanggan langsung menghubungi lewat WhatsApp.",
      "Perusahaan yang butuh halaman rekrutmen atau informasi untuk karyawan dan mitra.",
    ],
    benefits: [
      { title: "Siap untuk tender", text: "Company profile yang menampilkan legalitas, sertifikasi, kapasitas, dan daftar klien dengan rapi, dalam Bahasa Indonesia dan Inggris." },
      { title: "Tim yang dekat", text: "Dari Cikarang ke Karawang hanya sebentar, jadi pertemuan dan pengambilan foto lokasi mudah diatur." },
      { title: "SEO lokal", text: "Google Business Profile dan halaman yang dioptimalkan untuk pencarian seperti \"jasa ... Karawang\"." },
      { title: "Harga transparan", text: "Paket mulai Rp 2 juta dengan rincian jelas, tanpa biaya tersembunyi." },
    ],
    faqs: [
      { q: "Apakah bisa bertemu langsung di Karawang?", a: "Bisa. Studio kami di Cikarang Timur, dekat dengan Karawang, jadi pertemuan langsung mudah dijadwalkan bila dibutuhkan." },
      { q: "Berapa biaya pembuatan website di Karawang?", a: "Paket kami mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Web app custom dihitung sesuai kebutuhan." },
      { q: "Apakah website bisa dua bahasa?", a: "Bisa. Banyak vendor industri membutuhkan versi Bahasa Inggris untuk klien asing; fitur ini bisa ditambahkan ke paket company profile." },
      { q: "Apakah bisa membantu muncul di Google Maps?", a: "Bisa. Paket company profile dan toko online sudah termasuk setup Google Business Profile, yang menentukan tampilnya bisnis Anda di Google Maps." },
    ],
  },
  en: {
    name: "Web Design in Karawang",
    title: "Web design & development in",
    em: "Karawang",
    description:
      "Website design and development in Karawang for small businesses, industrial vendors, and companies: company profiles, landing pages, online stores, and web apps. Close to Cikarang, from IDR 2 million.",
    intro:
      "Karawang borders Cikarang, where our studio is. We help small businesses, vendors, and companies around Karawang's industrial estates get a website that wins over prospects and is easy to find on Google.",
    areasTitle: "Parts of Karawang we serve",
    areas: ["West Karawang", "East Karawang", "Telukjambe", "Klari", "Cikampek", "KIIC & Suryacipta industrial estates"],
    remote: "Because we're close by, in-person meetings in Karawang are easy to arrange. Consultations over WhatsApp or video call work too.",
    forWho: [
      "Factory vendors and suppliers that need a company profile for vendor registration and tenders.",
      "Small businesses and local shops in Karawang that want to show up on Google Maps and Google Search.",
      "Local services (caterers, workshops, contractors, clinics) that want customers to reach out on WhatsApp.",
      "Companies that need a careers page or information for employees and partners.",
    ],
    benefits: [
      { title: "Tender-ready", text: "A company profile that presents your legal documents, certifications, capacity, and client list clearly, in Indonesian and English." },
      { title: "A team nearby", text: "Cikarang to Karawang is a short trip, so meetings and on-site photos are easy to arrange." },
      { title: "Local SEO", text: "Google Business Profile and pages optimised for searches like \"... service Karawang\"." },
      { title: "Transparent pricing", text: "Packages from IDR 2 million with clear details and no hidden fees." },
    ],
    faqs: [
      { q: "Can we meet in person in Karawang?", a: "Yes. Our studio is in East Cikarang, close to Karawang, so in-person meetings are easy to schedule when needed." },
      { q: "How much does a website cost in Karawang?", a: "Our packages start at IDR 2 million for a landing page, IDR 3.5 million for a company profile, and IDR 6 million for an online store. Custom web apps are priced to your needs." },
      { q: "Can the website be bilingual?", a: "Yes. Many industrial vendors need an English version for foreign clients; it can be added to the company profile package." },
      { q: "Can you help us show up on Google Maps?", a: "Yes. The company profile and online store packages include Google Business Profile setup, which is what puts your business on Google Maps." },
    ],
  },
}

const depok: Record<Lang, LocalCopy> = {
  id: {
    name: "Jasa Website Depok",
    title: "Jasa pembuatan website untuk bisnis di",
    em: "Depok",
    description:
      "Jasa pembuatan website untuk UMKM, kursus, klinik, dan bisnis jasa di Depok: landing page, company profile, toko online, dan web app. Proses online, mulai Rp 2 juta.",
    intro:
      "Kami melayani bisnis di Depok sepenuhnya secara online dari studio kami di Cikarang. Dari konsultasi sampai website live, semuanya berjalan lewat WhatsApp, video call, dan link preview yang bisa Anda buka kapan saja.",
    areasTitle: "Area Depok yang kami layani",
    areas: ["Margonda", "Beji", "Cinere", "Sawangan", "Cimanggis", "Seluruh Depok (online)"],
    remote:
      "Semua tahap dilakukan jarak jauh, jadi Anda tidak perlu meluangkan waktu untuk perjalanan. Untuk proyek yang lebih besar, pertemuan langsung bisa didiskusikan.",
    forWho: [
      "UMKM kuliner, fashion, dan produk lokal di Depok yang ingin tampil profesional di luar media sosial.",
      "Lembaga kursus, bimbel, dan sekolah yang butuh website informasi dan pendaftaran.",
      "Klinik dan praktik dokter yang ingin pasien bisa melihat layanan dan membuat janji lewat WhatsApp.",
      "Bisnis jasa yang ingin muncul saat dicari di Google.",
    ],
    benefits: [
      { title: "Proses 100% online", text: "Brief, desain, revisi, dan serah terima lewat WhatsApp dan link preview, tanpa perlu bertemu." },
      { title: "Form & WhatsApp", text: "Form pendaftaran, janji temu, atau pemesanan yang langsung terhubung ke WhatsApp Anda." },
      { title: "SEO lokal", text: "Google Business Profile dan halaman yang disiapkan untuk pencarian seperti \"jasa ... Depok\"." },
      { title: "Harga transparan", text: "Paket mulai Rp 2 juta dengan rincian jelas, tanpa biaya tersembunyi." },
    ],
    faqs: [
      { q: "Bagaimana kerja sama kalau lokasinya berjauhan?", a: "Semuanya berjalan online: brief lewat WhatsApp, presentasi desain lewat video call, dan revisi langsung di link preview. Anda bisa memantau progres kapan saja." },
      { q: "Berapa biaya pembuatan website di Depok?", a: "Harga kami sama untuk semua kota: mulai Rp 2 juta untuk landing page, Rp 3,5 juta untuk company profile, dan Rp 6 juta untuk toko online. Web app custom dihitung sesuai kebutuhan." },
      { q: "Apakah bisa dibuatkan form pendaftaran online?", a: "Bisa. Form pendaftaran atau janji temu bisa dikirim ke WhatsApp dan email Anda, cocok untuk kursus, sekolah, dan klinik." },
      { q: "Apakah ada dukungan setelah website live?", a: "Ada. Kami membantu lewat WhatsApp setelah website online, dan tersedia opsi maintenance bulanan bila Anda ingin kami yang mengurus pembaruan." },
    ],
  },
  en: {
    name: "Web Design in Depok",
    title: "Web design & development for businesses in",
    em: "Depok",
    description:
      "Website design and development for small businesses, courses, clinics, and service businesses in Depok: landing pages, company profiles, online stores, and web apps. Fully online, from IDR 2 million.",
    intro:
      "We serve businesses in Depok entirely online from our studio in Cikarang. From the first consultation to launch, everything runs over WhatsApp, video calls, and a preview link you can open any time.",
    areasTitle: "Parts of Depok we serve",
    areas: ["Margonda", "Beji", "Cinere", "Sawangan", "Cimanggis", "All of Depok (online)"],
    remote: "Every step is done remotely, so you don't have to spend time travelling. For larger projects, an in-person meeting can be discussed.",
    forWho: [
      "Food, fashion, and local product businesses in Depok that want a professional presence beyond social media.",
      "Course providers, tutoring centres, and schools that need an information and enrolment website.",
      "Clinics and practices that want patients to see their services and book over WhatsApp.",
      "Service businesses that want to show up on Google.",
    ],
    benefits: [
      { title: "100% online process", text: "Brief, design, revisions, and handover over WhatsApp and preview links, with no meetings needed." },
      { title: "Forms & WhatsApp", text: "Enrolment, appointment, or order forms that go straight to your WhatsApp." },
      { title: "Local SEO", text: "Google Business Profile and pages set up for searches like \"... service Depok\"." },
      { title: "Transparent pricing", text: "Packages from IDR 2 million with clear details and no hidden fees." },
    ],
    faqs: [
      { q: "How do we work together from a distance?", a: "Everything runs online: the brief over WhatsApp, design presentations over video call, and revisions on a live preview link. You can check progress any time." },
      { q: "How much does a website cost in Depok?", a: "Our prices are the same for every city: from IDR 2 million for a landing page, IDR 3.5 million for a company profile, and IDR 6 million for an online store. Custom web apps are priced to your needs." },
      { q: "Can you build an online enrolment form?", a: "Yes. Enrolment or appointment forms can be sent to your WhatsApp and email, which suits courses, schools, and clinics." },
      { q: "Is there support after launch?", a: "Yes. We help over WhatsApp once the website is live, and monthly maintenance is available if you'd like us to handle updates." },
    ],
  },
}

export const locals: Record<LocalCity, LocalPage> = {
  cikarang: { city: "cikarang", label: "Cikarang · Kabupaten Bekasi", areaServed: ["Cikarang"], copy: cikarang },
  bekasi: { city: "bekasi", label: "Bekasi", areaServed: ["Bekasi"], copy: bekasi },
  jakarta: { city: "jakarta", label: "Jakarta", areaServed: ["Jakarta"], copy: jakarta },
  karawang: { city: "karawang", label: "Karawang", areaServed: ["Karawang"], copy: karawang },
  depok: { city: "depok", label: "Depok", areaServed: ["Depok"], copy: depok },
}

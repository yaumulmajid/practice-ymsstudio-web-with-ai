// Privacy policy and terms of service (ID + EN). A block is a paragraph (string)
// or a bullet list (string[]). Review with your own legal needs before relying on it.
import type { Lang } from "@/lib/i18n"

export type LegalSection = { title: string; blocks: (string | string[])[] }
export type LegalPage = { title: string; em: string; description: string; intro: string; updated: string; sections: LegalSection[] }

const UPDATED = "2026-11-22"

export const privacy: Record<Lang, LegalPage> = {
  id: {
    title: "Kebijakan",
    em: "Privasi",
    description: "Bagaimana YMS Studio mengumpulkan, memakai, dan melindungi data pribadi pengunjung website dan calon klien.",
    intro:
      "Kebijakan ini menjelaskan data apa yang kami kumpulkan saat Anda mengunjungi ymsstudio.id atau menghubungi kami, untuk apa data tersebut dipakai, dan hak Anda atas data tersebut. Kami berusaha mengumpulkan data seminimal mungkin.",
    updated: UPDATED,
    sections: [
      {
        title: "Data yang kami kumpulkan",
        blocks: [
          [
            "Data yang Anda kirim sendiri: nama, nama bisnis, nomor WhatsApp, email, dan isi pesan saat Anda mengisi form brief proyek atau menghubungi kami lewat WhatsApp/email.",
            "Data penggunaan website: halaman yang dibuka, perangkat dan browser, perkiraan lokasi (tingkat kota), serta sumber kunjungan, yang dikumpulkan oleh Google Analytics dan Google Ads melalui cookie.",
            "Data teknis: alamat IP dan log server yang tercatat otomatis untuk keamanan dan pemecahan masalah.",
            "Penanda di browser Anda (session storage) agar jumlah pembaca artikel tidak dihitung berulang saat halaman dimuat ulang.",
          ],
        ],
      },
      {
        title: "Untuk apa data dipakai",
        blocks: [
          [
            "Membalas pertanyaan, memberi konsultasi, dan mengirim penawaran yang Anda minta.",
            "Menjalankan project jika Anda menjadi klien kami.",
            "Memahami halaman mana yang berguna dan memperbaiki isi serta performa website.",
            "Mengukur efektivitas iklan kami, misalnya berapa banyak klik tombol WhatsApp yang berasal dari iklan.",
            "Menjaga keamanan website dan mencegah spam.",
          ],
          "Kami tidak menjual data pribadi Anda dan tidak memakainya untuk tujuan lain di luar daftar di atas tanpa persetujuan Anda.",
        ],
      },
      {
        title: "Cookie dan layanan pihak ketiga",
        blocks: [
          "Website ini memakai layanan berikut yang dapat menyimpan cookie atau memproses data atas nama kami:",
          [
            "Google Analytics dan Google Ads (Google LLC) untuk statistik kunjungan dan pengukuran iklan.",
            "WhatsApp (Meta) saat Anda memilih menghubungi kami lewat WhatsApp.",
            "Penyedia server/hosting tempat website dan database kami berjalan.",
          ],
          "Saat pertama berkunjung, Anda dapat memilih cookie mana yang diizinkan lewat banner cookie: Wajib (menyimpan pilihan Anda), Analitik (Google Analytics dan sumber kunjungan untuk brief), dan Iklan (Google Ads). Sebelum Anda memilih, layanan Google berjalan tanpa cookie. Pilihan bisa diubah kapan saja lewat tautan \"Pengaturan cookie\" di bagian bawah website.",
          "Anda juga dapat menghapus cookie melalui pengaturan browser. Website tetap dapat dipakai tanpa cookie analitik dan iklan.",
        ],
      },
      {
        title: "Penyimpanan dan keamanan",
        blocks: [
          "Data brief proyek disimpan di sistem pengelolaan konten kami yang hanya dapat diakses tim YMS Studio. Koneksi website dilindungi HTTPS. Data calon klien kami simpan selama masih dibutuhkan untuk komunikasi atau kewajiban hukum, lalu dihapus atau dianonimkan.",
        ],
      },
      {
        title: "Hak Anda",
        blocks: [
          "Sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak untuk:",
          [
            "Meminta salinan data pribadi Anda yang kami simpan.",
            "Meminta perbaikan data yang tidak akurat.",
            "Meminta penghapusan data, atau menarik persetujuan pemrosesan.",
            "Mengajukan keberatan atas pemrosesan data tertentu.",
          ],
          "Kirim permintaan Anda ke email di bawah. Kami akan menanggapi dalam waktu yang wajar.",
        ],
      },
      {
        title: "Perubahan kebijakan",
        blocks: [
          "Kebijakan ini dapat kami perbarui bila layanan atau peraturan berubah. Tanggal pembaruan terakhir selalu tercantum di halaman ini.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy",
    em: "Policy",
    description: "How YMS Studio collects, uses, and protects the personal data of website visitors and prospective clients.",
    intro:
      "This policy explains what data we collect when you visit ymsstudio.id or contact us, what we use it for, and your rights over it. We aim to collect as little data as possible.",
    updated: UPDATED,
    sections: [
      {
        title: "Data we collect",
        blocks: [
          [
            "Data you send us: your name, business name, WhatsApp number, email, and message when you fill in the project brief form or contact us on WhatsApp/email.",
            "Usage data: pages viewed, device and browser, approximate (city-level) location, and traffic source, collected by Google Analytics and Google Ads through cookies.",
            "Technical data: IP address and server logs recorded automatically for security and troubleshooting.",
            "A marker in your browser (session storage) so an article's read count isn't increased again when you reload the page.",
          ],
        ],
      },
      {
        title: "How we use it",
        blocks: [
          [
            "To answer questions, give consultations, and send quotes you ask for.",
            "To deliver the project if you become our client.",
            "To understand which pages are useful and improve the website's content and performance.",
            "To measure how well our ads work, for example how many WhatsApp clicks come from ads.",
            "To keep the website secure and prevent spam.",
          ],
          "We do not sell your personal data, and we don't use it for anything beyond the purposes above without your consent.",
        ],
      },
      {
        title: "Cookies and third-party services",
        blocks: [
          "This website uses the following services, which may set cookies or process data on our behalf:",
          [
            "Google Analytics and Google Ads (Google LLC) for visit statistics and ad measurement.",
            "WhatsApp (Meta) when you choose to contact us on WhatsApp.",
            "The server/hosting provider that runs our website and database.",
          ],
          "On your first visit, the cookie banner lets you choose which cookies to allow: Necessary (stores your choice), Analytics (Google Analytics and the traffic source of briefs), and Advertising (Google Ads). Until you choose, Google services run without cookies. You can change your choice at any time via the \"Cookie settings\" link at the bottom of the website.",
          "You can also delete cookies in your browser settings. The website still works without analytics and advertising cookies.",
        ],
      },
      {
        title: "Storage and security",
        blocks: [
          "Project briefs are stored in our content management system, which only the YMS Studio team can access. The website is served over HTTPS. We keep prospective-client data only as long as it's needed for communication or legal obligations, then delete or anonymise it.",
        ],
      },
      {
        title: "Your rights",
        blocks: [
          "Under Indonesia's Personal Data Protection Law (Law No. 27 of 2022), you have the right to:",
          [
            "Request a copy of the personal data we hold about you.",
            "Ask us to correct inaccurate data.",
            "Ask us to delete your data, or withdraw your consent to processing.",
            "Object to certain processing of your data.",
          ],
          "Send your request to the email below and we'll respond within a reasonable time.",
        ],
      },
      {
        title: "Changes to this policy",
        blocks: ["We may update this policy when our services or the law change. The date of the latest update is always shown on this page."],
      },
    ],
  },
}

export const terms: Record<Lang, LegalPage> = {
  id: {
    title: "Syarat",
    em: "Layanan",
    description: "Ketentuan kerja sama pembuatan website dengan YMS Studio: ruang lingkup, pembayaran, revisi, hak milik, dan dukungan.",
    intro:
      "Syarat ini berlaku untuk pemakaian website ymsstudio.id dan untuk layanan pembuatan website yang kami kerjakan. Detail khusus tiap project (fitur, harga, jadwal) tercantum di penawaran atau invoice yang Anda setujui, dan penawaran tersebut diutamakan bila ada perbedaan.",
    updated: UPDATED,
    sections: [
      {
        title: "Ruang lingkup pekerjaan",
        blocks: [
          "Pekerjaan yang kami kerjakan adalah yang tercantum di paket atau penawaran yang disepakati. Permintaan di luar itu (halaman atau fitur tambahan) akan kami informasikan biayanya lebih dulu sebelum dikerjakan.",
        ],
      },
      {
        title: "Harga dan pembayaran",
        blocks: [
          [
            "Harga paket di website adalah harga mulai; harga final mengikuti kebutuhan dan dikonfirmasi di penawaran.",
            "Skema pembayaran (misalnya uang muka dan pelunasan) mengikuti penawaran atau invoice. Pengerjaan dimulai setelah pembayaran awal diterima.",
            "Website dipublikasikan atau diserahkan penuh setelah pembayaran lunas.",
          ],
        ],
      },
      {
        title: "Kewajiban klien",
        blocks: [
          [
            "Menyediakan materi (logo, foto, teks, informasi produk) dan memastikan Anda berhak memakainya.",
            "Memberi masukan dan persetujuan dalam waktu yang wajar agar jadwal tidak mundur.",
            "Menunjuk satu kontak yang berwenang mengambil keputusan.",
          ],
        ],
      },
      {
        title: "Revisi",
        blocks: [
          "Jumlah revisi desain mengikuti paket yang dipilih. Revisi adalah perubahan atas desain yang sudah disepakati; perubahan arah atau konsep besar di tengah project dapat dihitung sebagai pekerjaan tambahan.",
        ],
      },
      {
        title: "Domain, hosting, dan layanan pihak ketiga",
        blocks: [
          "Domain dan hosting tahun pertama termasuk dalam paket tertentu. Perpanjangan tahun berikutnya dikenakan biaya sesuai yang tercantum di paket. Layanan pihak ketiga (payment gateway, plugin berbayar, email bisnis, dan lain-lain) tunduk pada ketentuan dan biaya penyedianya masing-masing.",
        ],
      },
      {
        title: "Hak milik",
        blocks: [
          "Setelah pembayaran lunas, desain dan konten website yang dibuat khusus untuk Anda menjadi milik Anda. Kode pustaka, tema, atau plugin pihak ketiga tetap mengikuti lisensinya. Kami dapat menampilkan website Anda di portofolio kami, kecuali Anda meminta tidak.",
        ],
      },
      {
        title: "Dukungan dan garansi",
        blocks: [
          "Perbaikan bug yang berasal dari pekerjaan kami gratis selama masa dukungan yang tercantum di paket. Perubahan konten baru, fitur baru, atau kerusakan akibat perubahan oleh pihak lain di luar masa dukungan dapat dikenakan biaya.",
        ],
      },
      {
        title: "Batas tanggung jawab",
        blocks: [
          "Kami berupaya website berjalan cepat, aman, dan stabil, tetapi tidak dapat menjamin hasil bisnis tertentu (misalnya peringkat Google atau jumlah penjualan) karena dipengaruhi banyak faktor di luar kendali kami. Tanggung jawab kami terbatas pada nilai project yang telah dibayarkan.",
        ],
      },
      {
        title: "Pembatalan",
        blocks: [
          "Bila project dibatalkan, pembayaran untuk pekerjaan yang sudah dikerjakan tidak dapat dikembalikan. Ketentuan detailnya mengikuti penawaran yang disepakati.",
        ],
      },
      {
        title: "Hukum yang berlaku",
        blocks: [
          "Syarat ini tunduk pada hukum Republik Indonesia. Perselisihan diselesaikan lebih dulu secara musyawarah.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of",
    em: "Service",
    description: "The terms for working with YMS Studio on a website project: scope, payment, revisions, ownership, and support.",
    intro:
      "These terms apply to using ymsstudio.id and to the website projects we deliver. Project-specific details (features, price, schedule) are set out in the quote or invoice you approve, and that quote takes precedence if anything differs.",
    updated: UPDATED,
    sections: [
      {
        title: "Scope of work",
        blocks: [
          "We deliver the work listed in the agreed package or quote. Anything beyond that (extra pages or features) will be quoted to you before we start on it.",
        ],
      },
      {
        title: "Price and payment",
        blocks: [
          [
            "Package prices on the website are starting prices; the final price depends on your needs and is confirmed in the quote.",
            "The payment schedule (for example a deposit and a final payment) follows the quote or invoice. Work starts once the first payment is received.",
            "The website is published or fully handed over once paid in full.",
          ],
        ],
      },
      {
        title: "Your responsibilities",
        blocks: [
          [
            "Provide materials (logo, photos, copy, product information) and make sure you have the right to use them.",
            "Give feedback and approvals within a reasonable time so the schedule doesn't slip.",
            "Appoint one contact person who can make decisions.",
          ],
        ],
      },
      {
        title: "Revisions",
        blocks: [
          "The number of design revisions follows your package. A revision is a change to the agreed design; a major change of direction mid-project may be treated as additional work.",
        ],
      },
      {
        title: "Domain, hosting, and third-party services",
        blocks: [
          "The first year of domain and hosting is included in certain packages. Renewals are charged as stated in the package. Third-party services (payment gateways, paid plugins, business email, and so on) are subject to their providers' own terms and fees.",
        ],
      },
      {
        title: "Ownership",
        blocks: [
          "Once paid in full, the design and content created specifically for you belong to you. Third-party libraries, themes, or plugins remain under their own licences. We may show your website in our portfolio unless you ask us not to.",
        ],
      },
      {
        title: "Support and warranty",
        blocks: [
          "Fixes for bugs caused by our work are free during the support period stated in your package. New content, new features, or issues caused by changes made by others outside the support period may be charged.",
        ],
      },
      {
        title: "Limitation of liability",
        blocks: [
          "We work to keep your website fast, secure, and stable, but we can't guarantee specific business results (such as Google rankings or sales), which depend on many factors outside our control. Our liability is limited to the project fees paid.",
        ],
      },
      {
        title: "Cancellation",
        blocks: ["If a project is cancelled, payments for work already done are non-refundable. Details follow the agreed quote."],
      },
      {
        title: "Governing law",
        blocks: ["These terms are governed by the laws of the Republic of Indonesia. Disputes are first resolved through good-faith discussion."],
      },
    ],
  },
}

// Static data for portfolio (TAHAP 1 - akan diganti dengan Firebase di TAHAP 2)
// PANDUAN MENGISI KONTEN:
// 1. Ganti teks di bawah ini sesuai dengan profil dan project asli kamu.
// 2. Untuk gambar, simpan foto di folder 'public/images' lalu ganti path-nya di sini (contoh: "/images/foto-saya.jpg").
// 3. Simpan file ini, dan website akan otomatis berubah.

export const portfolioData = {
  // Hero Section
  hero: {
    title: "DATA ANALYST",
    name: "Zalsabilah Rezky Amelia Arep",
    tagline: "Data enthusiast with a bias for action.",
    description: "Transforming complex datasets into clear, actionable business insights.",
    status: "Currently: Open to opportunities",
    // Replaced by SVGs
    profileImage: "/images/profile.svg" // Placeholder
  },

  // Stats
  stats: [
    { number: "2+", label: "PROJECTS COMPLETED" },
    { number: "2+", label: "YEARS EXPERIENCE" },
    { number: "5+", label: "TOOLS MASTERED" }
  ],

  // About Section
  about: {
    heading: "DATA ANALYST WITH 2 YEARS EXPERIENCE",
    bio: "I specialize in turning raw data into strategic recommendations. My approach combines technical expertise with business acumen to deliver insights that drive measurable impact.",
    profileImage: "/images/profile.jpg",
    methodologies: [
      "Data Analysis & Interpretation",
      "Predictive Modeling",
      "Dashboard Development",
      "Stakeholder Communication"
    ]
  },

  // Experience
  experience: [
    {
      period: "2028-Present",
      role: "Data Analyst",
      company: "Deloitte",
      icon: "briefcase"
    },
    {
      period: "2026-2027",
      role: "Junior Data Analyst",
      company: "PT Astra International TBK",
      icon: "briefcase"
    },
    {
      period: "2027",
      role: "Data Scientist",
      company: "Bank Indonesia",
      icon: "briefcase"
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Customer Segmentation Analysis",
      category: "Machine Learning",
      categories: ["Machine Learning", "Data Analysis"],
      description: "Identifying high-value customer groups using clustering algorithms to drive marketing strategy.",
      fullDescription: "Project ini menggunakan algoritma K-Means Clustering untuk mengelompokkan pelanggan berdasarkan pola perilaku transaksi mereka. Dataset yang digunakan mencakup lebih dari 50.000 transaksi selama periode 6 bulan dari sebuah perusahaan retail. Proses analisis dimulai dari data cleaning, feature engineering (RFM analysis: Recency, Frequency, Monetary), hingga penentuan jumlah cluster optimal menggunakan Elbow Method. Hasilnya ditemukan 5 segmen pelanggan dengan karakteristik yang berbeda-beda, mulai dari pelanggan VIP hingga pelanggan yang berisiko churn. Insight ini kemudian digunakan oleh tim marketing untuk merancang kampanye yang lebih tepat sasaran.",
      image: "/images/project-placeholder.svg",
      impact: "25% increase in targeted campaign ROI",
      techStack: ["Python", "Pandas", "Scikit-learn", "+1"],
      link: {
        caseStudy: "/projects/customer-segmentation",
        github: "https://github.com/zalsamelia/customer-segmentation",
        live: null
      }
    },
    {
      id: 2,
      title: "E-commerce Analytics Platform",
      category: "Dashboard",
      categories: ["Dashboard", "Visualization"],
      description: "Comprehensive analytics dashboard tracking revenue, conversion funnels, and customer behavior metrics.",
      fullDescription: "Platform analitik e-commerce ini dibangun untuk membantu tim bisnis memantau performa toko secara real-time. Dashboard interaktif menampilkan metrik utama seperti revenue harian/mingguan/bulanan, conversion funnel dari kunjungan hingga pembelian, serta analisis perilaku pelanggan. Data diambil dari database PostgreSQL menggunakan query SQL yang dioptimasi, kemudian divisualisasikan menggunakan Power BI dengan refresh otomatis setiap jam. Fitur drill-down memungkinkan tim untuk menganalisis performa per kategori produk, per wilayah, dan per segmen pelanggan.",
      image: "/images/project-placeholder.svg",
      impact: "Real-time insights for 500K+ daily users",
      techStack: ["Power BI", "SQL", "Python"],
      link: {
        caseStudy: "/projects/ecommerce-analytics",
        github: "https://github.com/zalsamelia/ecommerce-dashboard",
        live: null
      }
    },
    {
      id: 3,
      title: "Sales Performance Dashboard",
      category: "Dashboard",
      categories: ["Dashboard", "Visualization"],
      description: "Real-time visualization for executive decision-making, featuring interactive charts and automated reporting.",
      fullDescription: "Dashboard performa penjualan ini dirancang khusus untuk kebutuhan eksekutif perusahaan dalam pengambilan keputusan strategis. Menggunakan Tableau sebagai tools visualisasi utama, dashboard ini menampilkan KPI penjualan secara real-time, tren penjualan per produk dan wilayah, serta perbandingan target vs aktual. Fitur unggulan adalah sistem pelaporan otomatis yang mengirimkan ringkasan performa mingguan ke email seluruh stakeholder. Setelah implementasi, tim sales berhasil mengidentifikasi peluang upselling yang sebelumnya terlewat, berkontribusi pada peningkatan penjualan sebesar 15%.",
      image: "/images/project-placeholder.svg",
      impact: "15% sales increase after implementation",
      techStack: ["Tableau", "SQL", "Python"],
      link: {
        caseStudy: "/projects/sales-dashboard",
        github: null,
        live: null
      }
    },
    {
      id: 4,
      title: "Predictive Maintenance Model",
      category: "Machine Learning",
      categories: ["Machine Learning", "Data Analysis"],
      description: "ML model predicting equipment failures to optimize maintenance schedules and reduce downtime.",
      fullDescription: "Model machine learning ini dikembangkan untuk memprediksi kegagalan peralatan industri sebelum terjadi, sehingga tim maintenance dapat melakukan perawatan preventif secara tepat waktu. Data sensor dari 200+ mesin dikumpulkan selama 2 tahun, mencakup suhu, getaran, tekanan, dan parameter operasional lainnya. Model menggunakan kombinasi Random Forest dan LSTM (Long Short-Term Memory) untuk mendeteksi pola anomali. Sistem peringatan dini berhasil mengurangi downtime tak terduga sebesar 30% dan menghemat biaya perbaikan darurat yang signifikan.",
      image: "/images/project-placeholder.svg",
      impact: "30% reduction in unexpected downtime",
      techStack: ["Python", "TensorFlow", "Pandas", "SQL"],
      link: {
        caseStudy: "/projects/predictive-maintenance",
        github: "https://github.com/zalsamelia/predictive-maintenance",
        live: null
      }
    },
    {
      id: 5,
      title: "Global Health Visualization",
      category: "Visualization",
      categories: ["Visualization", "Data Analysis"],
      description: "Interactive map visualization showing global health trends over the last decade.",
      fullDescription: "Proyek visualisasi data kesehatan global ini dibuat untuk membantu sebuah NGO internasional dalam memahami tren kesehatan dunia selama satu dekade terakhir. Data bersumber dari WHO dan World Bank, mencakup indikator seperti angka kematian bayi, harapan hidup, prevalensi penyakit menular, dan akses layanan kesehatan di 150+ negara. Menggunakan Tableau dengan fitur peta interaktif, pengguna dapat menjelajahi data berdasarkan wilayah, tahun, dan indikator kesehatan tertentu. Visualisasi ini kemudian digunakan oleh NGO untuk menentukan prioritas alokasi sumber daya bantuan kesehatan.",
      image: "/images/project-placeholder.svg",
      impact: "Used by NGO for resource allocation",
      techStack: ["Tableau", "Excel"],
      link: {
        caseStudy: "/projects/global-health",
        github: null,
        live: null
      }
    }
  ],

  // Skills - Core Competencies
  skills: {
    coreCompetencies: [
      {
        title: "Data Analysis & Processing",
        icon: "database",
        items: [
          "Python (Pandas, NumPy)",
          "SQL & Database Management",
          "Data Cleaning & Wrangling"
        ]
      },
      {
        title: "Visualization & Reporting",
        icon: "bar-chart-2",
        items: [
          "Tableau & Power BI",
          "Matplotlib & Seaborn",
          "Dashboard Development",
          "Executive Reporting"
        ]
      },
      {
        title: "Machine Learning",
        icon: "brain",
        items: [
          "Predictive Modeling",
          "Classification Algorithms",
          "Feature Engineering",
          "Model Evaluation"
        ]
      }
    ],

    // Technical Expertise (with proficiency levels)
    technicalExpertise: [
      { skill: "Python", level: 90 },
      { skill: "SQL", level: 95 },
      { skill: "Tableau", level: 90 },
      { skill: "Machine Learning", level: 85 }
    ],

    // Core Strengths (soft skills)
    coreStrengths: [
      "Data Storytelling",
      "Strategic Communication",
      "Problem Solving",
      "Cross-functional Collaboration"
    ],

    // Certifications
    certifications: [
      {
        name: "Google Data Analytics Professional",
        issuer: "Google",
        year: "2023",
        image: "/images/project-placeholder.svg",
        imageUrl: "/certificates/google-cert.svg",
        pdfUrl: "/certificates/google-cert.pdf",
        credentialUrl: "https://coursera.org/verify/professional-cert/XXXX"
      },
      {
        name: "IBM Data Science Specialization",
        issuer: "IBM",
        year: "2022",
        image: "/images/project-placeholder.svg",
        imageUrl: "/certificates/ibm-cert.svg",
        pdfUrl: "/certificates/ibm-cert.pdf",
        credentialUrl: "https://coursera.org/verify/specialization/XXXX"
      },
      {
        name: "Tableau Desktop Specialist",
        issuer: "Tableau",
        year: "2023",
        image: "/images/project-placeholder.svg",
        imageUrl: "/certificates/tableau-cert.svg",
        pdfUrl: "/certificates/tableau-cert.pdf",
        credentialUrl: "https://tableau.com/verify/XXXX"
      }
    ]
  },

  // Contact
  contact: {
    heading: "Get in Touch",
    description: "I'm always interested in new opportunities and collaborations. Let's connect and discuss how data can drive your business forward.",
    links: [
      {
        type: "EMAIL",
        label: "Email",
        value: "zalsabilamelia@gmail.com",
        url: "mailto:zalsabilamelia@gmail.com",
        icon: "mail"
      },
      {
        type: "LINKEDIN",
        label: "LinkedIn",
        value: "linkedin.com/in/zalsabilah-rezky-amelia-arep",
        url: "https://linkedin.com/in/zalsabilah-rezky-amelia-arep",
        icon: "linkedin"
      },
      {
        type: "GITHUB",
        label: "GitHub",
        value: "github.com/zalsamelia",
        url: "https://github.com/zalsamelia",
        icon: "github"
      },
      {
        type: "KAGGLE",
        label: "Kaggle",
        value: "kaggle.com/zalsabilahamelia",
        url: "https://www.kaggle.com/zalsabilahamelia",
        icon: "kaggle"
      }
    ]
  }
};

// Project categories for filtering
export const projectCategories = [
  "All",
  "Data Analysis",
  "Dashboard",
  "Machine Learning",
  "Visualization"
];

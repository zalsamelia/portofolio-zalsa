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
      image: "/images/project-placeholder.svg",
      impact: "25% increase in targeted campaign ROI",
      techStack: ["Python", "Pandas", "Scikit-learn", "+1"],
      link: {
        caseStudy: "/projects/customer-segmentation",
        github: "https://github.com/username/customer-segmentation"
      }
    },
    {
      id: 2,
      title: "E-commerce Analytics Platform",
      category: "Dashboard",
      categories: ["Dashboard", "Visualization"],
      description: "Comprehensive analytics dashboard tracking revenue, conversion funnels, and customer behavior metrics.",
      image: "/images/project-placeholder.svg",
      impact: "Real-time insights for 500K+ daily users",
      techStack: ["Power BI", "SQL", "Python"],
      link: {
        caseStudy: "/projects/ecommerce-analytics",
        github: "https://github.com/username/ecommerce-dashboard"
      }
    },
    {
      id: 3,
      title: "Sales Performance Dashboard",
      category: "Dashboard",
      categories: ["Dashboard", "Visualization"],
      description: "Real-time visualization for executive decision-making, featuring interactive charts and automated reporting.",
      image: "/images/project-placeholder.svg",
      impact: "15% sales increase after implementation",
      techStack: ["Tableau", "SQL", "Python"],
      link: {
        caseStudy: "/projects/sales-dashboard",
        github: null
      }
    },
    {
      id: 4,
      title: "Predictive Maintenance Model",
      category: "Machine Learning",
      categories: ["Machine Learning", "Data Analysis"],
      description: "ML model predicting equipment failures to optimize maintenance schedules and reduce downtime.",
      image: "/images/project-placeholder.svg",
      impact: "30% reduction in unexpected downtime",
      techStack: ["Python", "TensorFlow", "Pandas", "SQL"],
      link: {
        caseStudy: "/projects/predictive-maintenance",
        github: "https://github.com/username/predictive-maintenance"
      }
    },
    {
      id: 5,
      title: "Global Health Visualization",
      category: "Visualization",
      categories: ["Visualization", "Data Analysis"],
      description: "Interactive map visualization showing global health trends over the last decade.",
      image: "/images/project-placeholder.svg",
      impact: "Used by NGO for resource allocation",
      techStack: ["Tableau", "Excel"],
      link: {
        caseStudy: "/projects/global-health",
        github: null
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
        image: "/images/project-placeholder.svg"
      },
      {
        name: "IBM Data Science Specialization",
        issuer: "IBM",
        year: "2022",
        image: "/images/project-placeholder.svg"
      },
      {
        name: "Tableau Desktop Specialist",
        issuer: "Tableau",
        year: "2023",
        image: "/images/project-placeholder.svg"
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
        value: "linkedin.com/in/zalsabilahrezky",
        url: "https://linkedin.com/in/zalsabilahrezky",
        icon: "linkedin"
      },
      {
        type: "GITHUB",
        label: "GitHub",
        value: "github.com/zalsabilamelia",
        url: "https://github.com/zalsabilamelia",
        icon: "github"
      },
      {
        type: "SCHEDULE",
        label: "Schedule Call",
        value: "Schedule a meeting",
        url: "https://calendly.com/zalsabilah",
        icon: "calendar"
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

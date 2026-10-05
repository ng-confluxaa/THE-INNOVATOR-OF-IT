import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Initial Sample Data
const DEFAULT_SITE_CONFIG = {
  instituteName: "THE INNOVATOR OF IT",
  tagline: "Empowering Next-Gen IT Leaders & Software Engineers",
  heroHeadline: "Build a High-Paying Tech Career with Industry Experts",
  heroSubheadline: "Master Java Fullstack, Web Development, Python & AI with 100% Job Placement Assistance and Hands-On Live Projects.",
  phone: "+91 98765 43210",
  email: "admissions@theinnovatorofit.com",
  adminNotifyEmail: "director@theinnovatorofit.com",
  address: "Innovation Hub, Tech Park Phase-2, IT Corridor, Bengaluru, Karnataka",
  whatsappNumber: "+919876543210",
  linkedinUrl: "https://linkedin.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  placedStudentsCount: "1250+",
  hiringPartnersCount: "500+",
  averagePackage: "8.5 LPA",
  highestPackage: "32 LPA"
};

const DEFAULT_COURSES = [
  {
    id: "course-1",
    title: "Java Fullstack Masterclass",
    category: "Full Stack",
    duration: "6 Months",
    fee: "₹35,000",
    rating: "4.9",
    studentsCount: 1420,
    tags: ["Java", "Spring Boot", "React", "MySQL", "Docker", "Microservices"],
    description: "End-to-end industrial software development using Java Core, Advanced Java, Spring Boot microservices framework, React frontend, and CI/CD deployment.",
    modules: [
      "Core & Advanced Java Concepts",
      "Object-Oriented Design & Data Structures",
      "Spring Boot RESTful APIs & Microservices",
      "Frontend Integration with React.js & Redux",
      "Database Mastery: PostgreSQL & Hibernate ORM",
      "Cloud Deployment & Live Capstone Project"
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course-2",
    title: "Modern Fullstack Web Development",
    category: "Web Dev",
    duration: "5 Months",
    fee: "₹30,000",
    rating: "4.8",
    studentsCount: 1890,
    tags: ["HTML5", "CSS3", "JavaScript ES6+", "React", "Node.js", "MongoDB"],
    description: "Master modern web development using the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS, Next.js, and serverless backends.",
    modules: [
      "UI/UX Design & Responsive Layouts with CSS/Tailwind",
      "JavaScript Architecture & Asynchronous Programming",
      "React Hooks, State Management & Router",
      "Backend API Architecture with Node.js & Express",
      "MongoDB & Mongoose Schema Design",
      "Real-Time Web Apps with WebSockets & Deployment"
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course-3",
    title: "Python Programming & Data Science",
    category: "Data & AI",
    duration: "6 Months",
    fee: "₹38,000",
    rating: "4.9",
    studentsCount: 1100,
    tags: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Tableau"],
    description: "Become a certified Data Scientist. Learn Python, statistical analysis, data visualization, predictive machine learning models, and Big Data queries.",
    modules: [
      "Python Basics to Advanced Automation",
      "Data Manipulation with Pandas & NumPy",
      "Exploratory Data Analysis & Tableau Dashboards",
      "Machine Learning Algorithms (Regression, Classification)",
      "SQL Querying for Enterprise Databases",
      "Deep Learning Intro & Real-World Capstone"
    ],
    featured: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course-4",
    title: "Artificial Intelligence & Machine Learning",
    category: "Data & AI",
    duration: "6 Months",
    fee: "₹45,000",
    rating: "5.0",
    studentsCount: 850,
    tags: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "LLMs"],
    description: "Advance into cutting-edge AI engineering. Train neural networks, build LLM applications, Computer Vision models, and Generative AI systems.",
    modules: [
      "Applied Mathematics & Matrix Computing",
      "Supervised & Unsupervised Machine Learning",
      "Deep Learning Architectures (CNNs, RNNs, Transformers)",
      "Natural Language Processing & Sentiment Analysis",
      "Generative AI & Fine-Tuning LLMs",
      "Deploying AI Models with FastAPI & Docker"
    ],
    featured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course-5",
    title: "Cloud Computing & DevOps Engineering",
    category: "Cloud",
    duration: "4 Months",
    fee: "₹32,000",
    rating: "4.8",
    studentsCount: 940,
    tags: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    description: "Learn automated infrastructure deployment, containerization, CI/CD pipelines, Kubernetes orchestration, and AWS cloud management.",
    modules: [
      "Linux Administration & Shell Scripting",
      "AWS Cloud Infrastructure Core Services",
      "Docker Containerization & Microservices",
      "Kubernetes Cluster Architecture & Orchestration",
      "CI/CD Automation with Jenkins & GitHub Actions",
      "Infrastructure as Code using Terraform"
    ],
    featured: false,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80"
  }
];

const DEFAULT_COMPANIES = [
  { id: "comp-1", name: "Google", logo: "🌐" },
  { id: "comp-2", name: "Microsoft", logo: "💻" },
  { id: "comp-3", name: "Amazon", logo: "📦" },
  { id: "comp-4", name: "TCS", logo: "🏢" },
  { id: "comp-5", name: "Infosys", logo: "🔷" },
  { id: "comp-6", name: "Wipro", logo: "✳️" },
  { id: "comp-7", name: "Accenture", logo: "⚡" },
  { id: "comp-8", name: "Cognizant", logo: "🔵" },
  { id: "comp-9", name: "IBM", logo: "🏛️" },
  { id: "comp-10", name: "Tech Mahindra", logo: "⚙️" },
  { id: "comp-11", name: "Capgemini", logo: "💠" },
  { id: "comp-12", name: "Oracle", logo: "🔴" }
];

const DEFAULT_PLACED_STUDENTS = [
  {
    id: "placed-1",
    name: "Rahul Sharma",
    company: "Amazon",
    ctc: "₹18 LPA",
    role: "SDE-1 (Java Fullstack)",
    course: "Java Fullstack Masterclass",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote: "The practical hands-on projects and mock interview drills at THE INNOVATOR OF IT transformed my confidence completely!"
  },
  {
    id: "placed-2",
    name: "Priya Patel",
    company: "Google",
    ctc: "₹24 LPA",
    role: "Frontend Engineer",
    course: "Modern Web Development",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    quote: "From beginner concepts to advanced React and architecture, the faculty guidance was world-class."
  },
  {
    id: "placed-3",
    name: "Aman Verma",
    company: "Microsoft",
    ctc: "₹22 LPA",
    role: "Cloud DevOps Associate",
    course: "Cloud & DevOps Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "The 100% placement support team prepared me thoroughly for system design and technical rounds."
  },
  {
    id: "placed-4",
    name: "Sneha Reddi",
    company: "TCS Digital",
    ctc: "₹9.5 LPA",
    role: "Data Analyst",
    course: "Python & Data Science",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    quote: "Switching my career to Data Science was seamless thanks to the structured module exercises."
  }
];

const DEFAULT_INTERNSHIPS = [
  {
    id: "intern-1",
    role: "Java Backend Developer Intern",
    company: "Innovator Tech Labs",
    stipend: "₹18,000 / month",
    duration: "3 - 6 Months",
    location: "Bengaluru / Hybrid",
    requirements: "Knowledge of Java, Spring Boot, REST APIs, SQL databases."
  },
  {
    id: "intern-2",
    role: "React Frontend Developer Intern",
    company: "CloudSync Solutions",
    stipend: "₹15,000 / month",
    duration: "3 Months",
    location: "Remote",
    requirements: "Hands-on with HTML5, CSS3, JavaScript ES6+, React.js, Tailwind."
  },
  {
    id: "intern-3",
    role: "Data Analytics & AI Intern",
    company: "DataPulse AI",
    stipend: "₹20,000 / month",
    duration: "6 Months",
    location: "Bengaluru",
    requirements: "Proficiency in Python, Pandas, Matplotlib, SQL queries."
  }
];

const DEFAULT_ENQUIRIES = [
  {
    id: "enq-101",
    studentName: "Ankit Mehta",
    email: "ankit.mehta@example.com",
    mobile: "+91 98123 45678",
    course: "Java Fullstack Masterclass",
    batch: "Weekend Batch",
    message: "Hi, I want to inquire about upcoming batch dates and scholarship options.",
    submittedAt: "2026-10-04 14:30",
    status: "New"
  },
  {
    id: "enq-102",
    studentName: "Neha Gupta",
    email: "neha.g@example.com",
    mobile: "+91 97890 12345",
    course: "Modern Web Development",
    batch: "Weekday Regular",
    message: "Looking for job placement guarantee details.",
    submittedAt: "2026-10-05 10:15",
    status: "Contacted"
  }
];

export const AppProvider = ({ children }) => {
  // LocalStorage state initialization
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('innovator_site_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('innovator_courses');
    return saved ? JSON.parse(saved) : DEFAULT_COURSES;
  });

  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('innovator_companies');
    return saved ? JSON.parse(saved) : DEFAULT_COMPANIES;
  });

  const [placedStudents, setPlacedStudents] = useState(() => {
    const saved = localStorage.getItem('innovator_placed_students');
    return saved ? JSON.parse(saved) : DEFAULT_PLACED_STUDENTS;
  });

  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem('innovator_internships');
    return saved ? JSON.parse(saved) : DEFAULT_INTERNSHIPS;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('innovator_enquiries');
    return saved ? JSON.parse(saved) : DEFAULT_ENQUIRIES;
  });

  const [emailLogs, setEmailLogs] = useState(() => {
    const saved = localStorage.getItem('innovator_email_logs');
    return saved ? JSON.parse(saved) : [];
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [selectedInternshipModal, setSelectedInternshipModal] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // URL-based Admin Portal Access Listener (e.g. ?admin=true, #admin, or /admin)
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const href = window.location.href.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (
        search.includes('admin=true') ||
        search.includes('admin=1') ||
        search.includes('admin') ||
        hash === '#admin' ||
        pathname.endsWith('/admin')
      ) {
        setIsAdminPanelOpen(true);
      }
    };

    // Check on mount
    checkUrlForAdmin();

    // Check on hashchange or popstate
    window.addEventListener('hashchange', checkUrlForAdmin);
    window.addEventListener('popstate', checkUrlForAdmin);

    // Secret Keyboard Shortcut: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminPanelOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlForAdmin);
      window.removeEventListener('popstate', checkUrlForAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('innovator_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('innovator_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('innovator_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('innovator_placed_students', JSON.stringify(placedStudents));
  }, [placedStudents]);

  useEffect(() => {
    localStorage.setItem('innovator_internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('innovator_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('innovator_email_logs', JSON.stringify(emailLogs));
  }, [emailLogs]);

  // Actions
  const addEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      ...enquiryData,
      submittedAt: new Date().toLocaleString(),
      status: "New"
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    // Simulate Email Dispatch Notification to Institute Email
    const logEntry = {
      id: `mail-${Date.now()}`,
      to: siteConfig.adminNotifyEmail,
      subject: `🔥 New Lead Alert: ${enquiryData.studentName} for ${enquiryData.course}`,
      studentName: enquiryData.studentName,
      mobile: enquiryData.mobile,
      email: enquiryData.email,
      course: enquiryData.course,
      sentAt: new Date().toLocaleString(),
      status: "DISPATCHED_SUCCESS"
    };

    setEmailLogs(prev => [logEntry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => prev.filter(item => item.id !== id));
  };

  // CSV Export Generator
  const downloadEnquiriesCSV = () => {
    if (enquiries.length === 0) {
      alert("No enquiry records to export!");
      return;
    }

    const headers = ["ID", "Student Name", "Email ID", "Mobile Number", "Selected Course", "Preferred Batch", "Message", "Submitted At", "Status"];
    const csvRows = [];
    csvRows.push(headers.join(","));

    enquiries.forEach(row => {
      const values = [
        `"${row.id}"`,
        `"${row.studentName.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.mobile.replace(/"/g, '""')}"`,
        `"${row.course.replace(/"/g, '""')}"`,
        `"${(row.batch || "").replace(/"/g, '""')}"`,
        `"${(row.message || "").replace(/"/g, '""')}"`,
        `"${row.submittedAt}"`,
        `"${row.status}"`
      ];
      csvRows.push(values.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Innovator_IT_Student_Enquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Course Actions
  const addCourse = (newCourse) => {
    const courseToAdd = {
      id: `course-${Date.now()}`,
      rating: "5.0",
      studentsCount: 0,
      featured: false,
      ...newCourse
    };
    setCourses(prev => [courseToAdd, ...prev]);
  };

  const updateCourse = (id, updatedData) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Company Ticker Actions
  const addCompany = (name, logo = "🏢") => {
    const newComp = { id: `comp-${Date.now()}`, name, logo };
    setCompanies(prev => [...prev, newComp]);
  };

  const deleteCompany = (id) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  // Placed Student Actions
  const addPlacedStudent = (studentData) => {
    const newStudent = { id: `placed-${Date.now()}`, ...studentData };
    setPlacedStudents(prev => [newStudent, ...prev]);
  };

  const deletePlacedStudent = (id) => {
    setPlacedStudents(prev => prev.filter(s => s.id !== id));
  };

  // Internship Actions
  const addInternship = (internshipData) => {
    const newIntern = { id: `intern-${Date.now()}`, ...internshipData };
    setInternships(prev => [newIntern, ...prev]);
  };

  const deleteInternship = (id) => {
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  // Reset to Default Demo Data
  const resetAllDataToDefault = () => {
    if (window.confirm("Are you sure you want to reset all site data to default demo state? Custom edits will be overwritten.")) {
      setSiteConfig(DEFAULT_SITE_CONFIG);
      setCourses(DEFAULT_COURSES);
      setCompanies(DEFAULT_COMPANIES);
      setPlacedStudents(DEFAULT_PLACED_STUDENTS);
      setInternships(DEFAULT_INTERNSHIPS);
      setEnquiries(DEFAULT_ENQUIRIES);
      setEmailLogs([]);
      localStorage.clear();
      alert("Site data successfully reset to defaults!");
    }
  };

  // Helper to close admin panel and cleanly reset URL pathname from /admin to root /
  const closeAdminPanel = () => {
    setIsAdminPanelOpen(false);
    const currentHash = window.location.hash || '';
    if (window.history.pushState) {
      window.history.pushState(null, '', '/' + currentHash);
    }
  };

  return (
    <AppContext.Provider value={{
      siteConfig,
      setSiteConfig,
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      companies,
      addCompany,
      deleteCompany,
      placedStudents,
      addPlacedStudent,
      deletePlacedStudent,
      internships,
      addInternship,
      deleteInternship,
      enquiries,
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      downloadEnquiriesCSV,
      emailLogs,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      selectedCourseModal,
      setSelectedCourseModal,
      selectedInternshipModal,
      setSelectedInternshipModal,
      isEnquiryModalOpen,
      setIsEnquiryModalOpen,
      isAdminPanelOpen,
      setIsAdminPanelOpen,
      closeAdminPanel,
      resetAllDataToDefault
    }}>
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => useContext(AppContext);

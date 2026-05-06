export const portfolioData = {
  candidate: {
    name: "Avijnan Purkait",
    contact: {
      email: "avijnanpurkait@gmail.com",
      phone: "+91 6290986642",
      location: "Kolkata, India",
      github: "https://github.com/avi-dev-machine",
      linkedin: "https://www.linkedin.com/in/avijnan-purkait-6ba580318"
    }
  },
  title: "AI & Machine Learning Engineer | Large Language Models | Computer Vision | Full-Stack Systems",
  summary: "An AI & Machine Learning Engineer dedicated to architecting real-time intelligent systems, scalable large language model pipelines, and robust backend infrastructure. I possess a demonstrated history of developing end-to-end applications that seamlessly integrate advanced machine learning models into production environments, expertly managing both structured and unstructured datasets. My core engineering philosophy emphasises rigorous performance optimisation, ultra-low-latency architectures, and deploying resilient, real-world software solutions.",
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "Heritage Institute of Technology",
      duration: "2023 - 2027",
      stream: undefined,
      score: undefined,
      level: undefined
    },
    {
      level: "Senior Secondary (XII)",
      institution: "CISCE",
      stream: "Science",
      duration: "2023",
      score: "94.40%",
      degree: undefined
    }
  ],
  experience: [
    {
      role: "Machine Learning Research Intern",
      organization: "University of New Mexico (Virtual)",
      duration: "May 2025 - Aug 2025",
      highlights: [
        "Architected advanced regression models operating on extensive structured material datasets (~5K+ samples) to precisely forecast optimal compositions for 3D-printed cement",
        "Engineered more than 15 bespoke, domain-specific features, substantially augmenting both model performance and predictive stability",
        "Executed rigorous cross-validation paradigms and strategic hyperparameter tuning, yielding a 12–18% enhancement in prediction accuracy",
        "Formulated a fully reproducible machine learning pipeline, successfully decreasing experimental iteration cycles by approximately 30%"
      ],
      projectLink: "https://github.com/avi-dev-machine/Cement_3dPrinting_ML-MODEL",
      techStack: ["Python", "Scikit-learn", "Regression", "Feature Engineering"]
    },
    {
      role: "AI/ML Research Intern",
      organization: "Jadavpur University",
      duration: "May 2025 - Jul 2025",
      highlights: [
        "Spearheaded the development of SPARSHA, a comprehensive accessibility suite integrating sophisticated speech recognition, optical character recognition (OCR), and Braille translation",
        "Meticulously fine-tuned the Whisper neural network, elevating speech recognition fidelity by 10–15% in challenging, high-noise environments",
        "Constructed an automated OCR pipeline leveraging the Google Vision API to seamlessly process over 100 complex documents",
        "Architected an intuitive, GUI-driven vocal interface, markedly improving the operational efficiency of the accessibility workflow"
      ],
      projectLink: "https://github.com/avi-dev-machine/Summer_Internship-JU-",
      techStack: ["Python", "Whisper", "OCR", "NLP"]
    }
  ],
  projects: [
    {
      name: "SetuKa – Tourist Safety Platform",
      badge: "Hult Prize Nationals",
      link: "https://tourist-safety-rose.vercel.app/auth",
      description: [
        "Engineered a real-time tourist safety and emergency response platform, designed to facilitate instantaneous incident reporting and rapid civic response",
        "Architected a secure, robust authentication framework and role-based access control, successfully validating against over 100 simulated concurrent user interactions",
        "Devised a highly scalable, API-driven backend infrastructure capable of processing high-volume, concurrent emergency submissions without degradation",
        "Streamlined the user experience by mitigating reporting friction, thereby accelerating emergency response times and ensuring operational reliability",
        "Constructed the system with a rigorous focus on real-world deployment logistics and high-availability paradigms"
      ],
      techStack: ["React", "REST APIs", "Authentication"],
      domain: ["Real-Time Systems", "Social Impact"]
    },
    {
      name: "Syllabyte – AI Study Material Generator",
      badge: undefined,
      link: "https://github.com/avi-dev-machine/Syllabyte",
      description: [
        "Developed a sophisticated, LLM-driven platform engineered to autonomously generate comprehensive academic materials, including structured notes, multiple-choice questions, and conceptual mind maps",
        "Architected a robust document ingestion pipeline capable of parsing and semantically analyzing over 50 complex formats (PDF/DOCX)",
        "Integrated the Groq API to orchestrate multi-format content synthesis, effectively reducing manual curation efforts by approximately 60%",
        "Designed a modular, highly scalable backend architecture to support sophisticated content generation workflows seamlessly",
        "Implemented rigorous Markdown and MathJax rendering engines to ensure flawless, rich academic formatting",
        "Engineered a personalised content delivery system, incorporating comprehensive user history and intelligent session state management"
      ],
      techStack: ["Python", "Flask", "Groq API", "SQLAlchemy", "JavaScript"],
      domain: ["LLMs", "Generative AI", "Full-Stack"]
    },
    {
      name: "FitVision – AI Fitness Assistant",
      badge: "SIH Finalist",
      link: "https://fitvision-frontend.vercel.app/",
      description: [
        "Architected a real-time computer vision and pose estimation pipeline utilising YOLO, achieving an exceptional inference latency of ~150–250ms",
        "Implemented an advanced posture correction algorithm, significantly enhancing the precision of exercise form detection",
        "Engineered a continuous video stream processing system to deliver instantaneous, real-time biomechanical feedback",
        "Developed a comprehensive analytics dashboard to meticulously track and visualise performance metrics across user sessions",
        "Conducted rigorous empirical testing across diverse exercise modalities, substantially improving the system's overall robustness"
      ],
      techStack: ["YOLO", "OpenCV", "Python", "React"],
      domain: ["Computer Vision", "Real-Time AI"]
    },
    {
      name: "NLP-Kshitij – Enterprise RAG System",
      badge: undefined,
      link: "https://github.com/mahad2810/NLP-Kshitij",
      description: [
        "Architected a comprehensive Retrieval-Augmented Generation (RAG) pipeline leveraging the LLaMA architecture for sophisticated, contextual document interrogation",
        "Processed expansive document corpora (100+ files) utilising advanced embedding-based vector retrieval mechanisms",
        "Markedly elevated contextual answer relevance and accuracy when benchmarked against traditional keyword-heuristic search methodologies",
        "Designed a highly scalable computational pipeline to support both efficient, low-latency retrieval and nuanced response generation"
      ],
      techStack: ["Python", "LLMs", "RAG", "Embeddings"],
      domain: ["Generative AI"]
    },
    {
      name: "ShapeUp Studio – Full-Stack Fitness Platform",
      badge: undefined,
      link: "https://shapeup-studio.vercel.app/",
      description: [
        "Engineered a comprehensive full-stack fitness application, orchestrating seamless integration across frontend interfaces, backend services, and database infrastructure",
        "Constructed resilient RESTful APIs to flawlessly manage complex user data schemas and application workflows",
        "Deployed a production-grade system characterised by a highly responsive user interface and rigorously optimised performance metrics",
        "Architected support for multifaceted user interactions and sophisticated, session-based operational workflows"
      ],
      techStack: ["React", "APIs", "Databases", "Vercel"],
      domain: ["Full-Stack"]
    }
  ],
  technicalSkills: {
    "Languages": ["Python", "C/C++", "SQL", "JavaScript"],
    "AI / ML": ["Machine Learning", "Deep Learning", "Model Optimization"],
    "Generative AI": ["LLMs", "RAG", "Embeddings", "Prompt Engineering"],
    "Computer Vision": ["Object Detection", "Pose Estimation", "OpenCV"],
    "Frameworks": ["Flask", "FastAPI", "React", "Next.js"],
    "Libraries": ["NumPy", "pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
    "Systems": ["REST APIs", "Backend Systems", "Microservices"],
    "Core CS": ["Data Structures", "Algorithms", "System Design"]
  },
  achievements: [
    "Hult Prize 2026 – Winner (Eminent solution for global social impact challenge)",
    "Hult India 2026 – Finalist (Distinguished among top national cohorts at IIT Bombay)",
    "Smart India Hackathon 2025 – Finalist (Elite tier selection nationwide)",
    "Kshitij IIT Kharagpur 2026 – NLP Finalist",
    "Kshitij IIT Kharagpur 2026 – B-Plan Finalist",
    "IIT Kharagpur Data Science Hackathon 2025 – Finalist",
    "NIT Durgapur Showdown 2025 – Finalist",
    "IIC Innovation Challenge 2026 – 2nd Runner-Up",
    "Hack Heritage 2024 – 2nd Runner-Up"
  ],
  upcomingProjects: [
    {
      name: "LLM Fine-Tuning for Olympiad & Long-Context Reasoning",
      status: "In Progress",
      description: [
        "Fine-tuning small-scale LLMs (e.g., Qwen-Math) for advanced mathematical reasoning and olympiad-level problem solving",
        "Optimizing long-context understanding for complex logical and multi-step reasoning tasks",
        "Improving model performance on structured problem-solving benchmarks through targeted dataset curation",
        "Experimenting with parameter-efficient fine-tuning (PEFT) techniques to enhance accuracy with minimal compute"
      ],
      techStack: [
        "LLMs",
        "Qwen",
        "Fine-Tuning",
        "Transformers",
        "PyTorch"
      ],
      focusAreas: [
        "Mathematical Reasoning",
        "Long-Context NLP",
        "Model Optimization"
      ]
    },
    {
      name: "MARL Traffic Optimization System",
      status: "In Progress",
      description: [
        "Developing multi-agent reinforcement learning system for dynamic traffic signal optimization",
        "Implemented MAPPO-based architecture using Centralized Training and Decentralized Execution (CTDE)",
        "Simulated urban traffic using SUMO with PettingZoo-based multi-agent environment",
        "Designed reward function minimizing queue length and vehicle waiting time for global traffic efficiency",
        "Enabled inter-agent communication using graph-based neighborhood awareness",
        "Achieved improved traffic flow compared to fixed-timer baseline in simulation scenarios",
        "Integrated MLOps pipeline with checkpointing, experiment tracking, and GPU-accelerated training"
      ],
      techStack: [
        "Reinforcement Learning",
        "MAPPO",
        "SUMO",
        "PettingZoo",
        "PyTorch",
        "Weights & Biases"
      ],
      focusAreas: [
        "Multi-Agent Systems",
        "CTDE",
        "Reward Engineering",
        "Simulation Systems"
      ]
    }
  ]
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export type UserRole = 'Student' | 'Mentor' | 'Recruiter' | 'Admin';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  university: string;
  targetRole: string;
  educationLevel: string;
  currentSkills: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  skills: string[];
  resources: { title: string; url: string; type: 'video' | 'course' | 'article' }[];
}

export interface RoadmapData {
  goal: string;
  progress: number;
  estimatedTimeline: string;
  steps: RoadmapStep[];
  suggestedProjects: { title: string; desc: string; difficulty: string }[];
  certifications: string[];
}

export interface TestResult {
  id: string;
  testName: string;
  category: 'Quant' | 'Logical' | 'Verbal' | 'Coding' | 'Full Mock';
  score: number;
  total: number;
  accuracy: number;
  timeTaken: string;
  date: string;
  weakTopics: string[];
}

export interface InterviewResult {
  id: string;
  type: 'HR' | 'Technical' | 'Coding';
  company: string;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  overallScore: number;
  feedback: string;
  date: string;
}

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  theme: 'dark' | 'light';
  apiKey: string;
  xp: number;
  streak: number;
  level: number;
  badges: string[];
  roadmap: RoadmapData | null;
  skillsGap: { existing: string[]; missing: string[]; readiness: number };
  testScores: TestResult[];
  interviews: InterviewResult[];
  savedJobs: string[];
  appliedJobs: string[];
  
  // Actions
  login: (email: string, role: UserRole, name?: string) => void;
  logout: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setApiKey: (key: string) => void;
  addXP: (amount: number, reason: string) => void;
  incrementStreak: () => void;
  unlockBadge: (badge: string) => void;
  updateRoadmapStep: (stepId: string, completed: boolean) => void;
  generateRoadmap: (goal: string, skills: string[], education: string) => void;
  saveTestResult: (result: Omit<TestResult, 'id' | 'date'>) => void;
  saveInterviewResult: (result: Omit<InterviewResult, 'id' | 'date'>) => void;
  toggleBookmarkJob: (jobId: string) => void;
  applyForJob: (jobId: string) => void;
  callAI: (prompt: string, module: string) => Promise<string>;
}

const defaultUser: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@stanford.edu",
  role: "Student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  university: "Stanford University",
  targetRole: "Data Scientist",
  educationLevel: "Bachelor's in Computer Science",
  currentSkills: ["Python", "SQL", "Data Analysis", "Basic ML", "Git"]
};

const initialRoadmap: RoadmapData = {
  goal: "Data Scientist",
  progress: 35,
  estimatedTimeline: "6 Months",
  steps: [
    {
      id: "step-1",
      title: "Advanced Python & Foundations",
      description: "Master NumPy, Pandas, Matplotlib, and object-oriented programming for high-performance data manipulation.",
      duration: "3 Weeks",
      completed: true,
      skills: ["Python", "NumPy", "Pandas"],
      resources: [
        { title: "Python for Data Science Core", url: "#", type: "course" },
        { title: "Vectorization masterclass", url: "#", type: "video" }
      ]
    },
    {
      id: "step-2",
      title: "Probability & Statistical Inference",
      description: "Hypothesis testing, A/B testing, Bayesian statistics, and understanding distributions.",
      duration: "4 Weeks",
      completed: true,
      skills: ["Statistics", "Hypothesis Testing", "A/B Testing"],
      resources: [
        { title: "Statistical Thinking in Python", url: "#", type: "course" },
        { title: "Bayesian Methods Explained", url: "#", type: "article" }
      ]
    },
    {
      id: "step-3",
      title: "Machine Learning Algorithms",
      description: "Supervised & unsupervised learning: Regression, Decision Trees, Random Forests, XGBoost, and Clustering.",
      duration: "6 Weeks",
      completed: false,
      skills: ["Scikit-Learn", "XGBoost", "Regression", "Clustering"],
      resources: [
        { title: "Applied Machine Learning", url: "#", type: "course" },
        { title: "Ensemble Models Deep Dive", url: "#", type: "video" }
      ]
    },
    {
      id: "step-4",
      title: "Deep Learning & Neural Networks",
      description: "Architectures using PyTorch or TensorFlow. CNNs for vision, RNNs/Transformers for text.",
      duration: "5 Weeks",
      completed: false,
      skills: ["PyTorch", "TensorFlow", "Deep Learning", "NLP"],
      resources: [
        { title: "Deep Learning Specialization", url: "#", type: "course" },
        { title: "Transformers from Scratch", url: "#", type: "article" }
      ]
    },
    {
      id: "step-5",
      title: "MLOps & Cloud Deployment",
      description: "Model packaging with Docker, REST APIs with FastAPI, and cloud platforms (AWS/GCP).",
      duration: "4 Weeks",
      completed: false,
      skills: ["Docker", "FastAPI", "AWS", "MLOps"],
      resources: [
        { title: "Deploying ML Models to Production", url: "#", type: "course" },
        { title: "FastAPI for ML microservices", url: "#", type: "video" }
      ]
    }
  ],
  suggestedProjects: [
    { title: "Predictive Customer Churn Model", desc: "End-to-end XGBoost model with a custom Streamlit interactive dashboard.", difficulty: "Intermediate" },
    { title: "Real-time Sentiment Analyzer", desc: "Fine-tuned HuggingFace Transformer deployed using FastAPI and Docker.", difficulty: "Advanced" },
    { title: "Algorithmic Trading Backtester", desc: "Time-series forecasting using LSTMs and statistical arbitrage algorithms.", difficulty: "Advanced" }
  ],
  certifications: [
    "AWS Certified Machine Learning - Specialty",
    "DeepLearning.AI TensorFlow Developer",
    "Microsoft Certified: Azure Data Scientist Associate"
  ]
};

const initialTests: TestResult[] = [
  {
    id: "test-1",
    testName: "TCS NQT National Qualifier Mock",
    category: "Full Mock",
    score: 82,
    total: 100,
    accuracy: 85,
    timeTaken: "84 mins",
    date: "2 days ago",
    weakTopics: ["Probability", "Advanced Seating Arrangement"]
  },
  {
    id: "test-2",
    testName: "Quantitative Aptitude Advanced",
    category: "Quant",
    score: 18,
    total: 20,
    accuracy: 90,
    timeTaken: "22 mins",
    date: "5 days ago",
    weakTopics: ["Time & Work"]
  }
];

const initialInterviews: InterviewResult[] = [
  {
    id: "int-1",
    type: "Technical",
    company: "Google",
    communicationScore: 88,
    technicalScore: 82,
    confidenceScore: 91,
    overallScore: 87,
    feedback: "Excellent understanding of data structures. Suggested to practice dynamic programming space optimization. Clear articulation of Big-O complexity.",
    date: "1 week ago"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [apiKey, setApiKey] = useState<string>('');
  
  // Gamification states
  const [xp, setXp] = useState<number>(3450);
  const [streak, setStreak] = useState<number>(14);
  const [level, setLevel] = useState<number>(6);
  const [badges, setBadges] = useState<string[]>([
    "Aptitude Master", "Early Adopter", "AI Navigator", "Code Samurai", "7-Day Streak"
  ]);

  // Core Data states
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(initialRoadmap);
  const [skillsGap, setSkillsGap] = useState({
    existing: ["Python", "SQL", "Data Analysis", "Basic ML", "Git"],
    missing: ["Deep Learning", "PyTorch", "MLOps", "Docker", "Big Data"],
    readiness: 68
  });
  
  const [testScores, setTestScores] = useState<TestResult[]>(initialTests);
  const [interviews, setInterviews] = useState<InterviewResult[]>(initialInterviews);
  const [savedJobs, setSavedJobs] = useState<string[]>(["job-1", "job-3"]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(["job-2"]);

  // Set dark theme class on document body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
  };

  const login = (email: string, role: UserRole, name?: string) => {
    const defaultNames: Record<UserRole, string> = {
      Student: "Alex Rivera",
      Mentor: "Dr. Sarah Jenkins",
      Recruiter: "Marcus Vance",
      Admin: "System Administrator"
    };

    const targetRoles: Record<UserRole, string> = {
      Student: "Data Scientist",
      Mentor: "AI Research Director",
      Recruiter: "Senior Talent Acquisition",
      Admin: "Platform Architect"
    };

    setUser({
      name: name || defaultNames[role],
      email,
      role,
      avatar: role === 'Student' 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        : role === 'Mentor'
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        : role === 'Recruiter'
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      university: role === 'Student' ? "Stanford University" : "Tech Industry Expert",
      targetRole: targetRoles[role],
      educationLevel: "Master's Degree",
      currentSkills: ["Python", "React", "System Design", "Leadership"]
    });
    setIsAuthenticated(true);
    addXP(100, "Daily Login Bonus!");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const addXP = (amount: number, reason: string) => {
    console.log(`[XP Awarded]: +${amount} XP for "${reason}"`);
    setXp(prev => {
      const nextXp = prev + amount;
      const nextLevel = Math.floor(nextXp / 600) + 1;
      if (nextLevel > level) {
        setLevel(nextLevel);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // graceful fallback
        }
      }
      return nextXp;
    });
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
    addXP(50, "Maintained Daily Streak!");
  };

  const unlockBadge = (badge: string) => {
    if (!badges.includes(badge)) {
      setBadges(prev => [...prev, badge]);
      addXP(300, `Unlocked Badge: ${badge}`);
      try {
        confetti({ particleCount: 80, spread: 60 });
      } catch(e) {}
    }
  };

  const updateRoadmapStep = (stepId: string, completed: boolean) => {
    if (!roadmap) return;
    const updatedSteps = roadmap.steps.map(step => 
      step.id === stepId ? { ...step, completed } : step
    );
    
    const completedCount = updatedSteps.filter(s => s.completed).length;
    const progress = Math.round((completedCount / updatedSteps.length) * 100);

    setRoadmap({
      ...roadmap,
      steps: updatedSteps,
      progress
    });

    if (completed) {
      addXP(250, "Roadmap Milestone Completed!");
    }
  };

  const generateRoadmap = (goal: string, skills: string[], education: string) => {
    // Generates a beautifully customized roadmap depending on user's goal
    const generatedSteps: RoadmapStep[] = [
      {
        id: "step-gen-1",
        title: `Core Fundamentals for ${goal}`,
        description: `Establish a powerful theoretical baseline. Focus on high-level architecture and syntax essential for a future ${goal}.`,
        duration: "3 Weeks",
        completed: false,
        skills: [skills[0] || "Foundations", "Core Principles"],
        resources: [
          { title: `${goal} Masterclass`, url: "#", type: "course" },
          { title: "Industry Standard Patterns", url: "#", type: "article" }
        ]
      },
      {
        id: "step-gen-2",
        title: "Intermediate Frameworks & Tooling",
        description: "Adopt production-grade tools. Learn modern version control, automation pipelines, and testing suites.",
        duration: "4 Weeks",
        completed: false,
        skills: ["Advanced Frameworks", "CI/CD", "Testing"],
        resources: [
          { title: "Production Tooling Crash Course", url: "#", type: "video" }
        ]
      },
      {
        id: "step-gen-3",
        title: "Advanced Specialization & Architecture",
        description: "Deep dive into performance optimization, security, scalability, and cutting-edge design patterns.",
        duration: "5 Weeks",
        completed: false,
        skills: ["Scalability", "System Design", "Security"],
        resources: [
          { title: "High-Performance Systems", url: "#", type: "course" }
        ]
      },
      {
        id: "step-gen-4",
        title: "Real-World Projects & Open Source",
        description: "Build 3 production-level portfolio projects. Contribute to established GitHub repositories to gain practical exposure.",
        duration: "6 Weeks",
        completed: false,
        skills: ["Portfolio Building", "Open Source", "Code Review"],
        resources: [
          { title: "Top Open Source Repos to Join", url: "#", type: "article" }
        ]
      },
      {
        id: "step-gen-5",
        title: "Placement Readiness & Mock Interviews",
        description: "Iterate on competitive coding, take AI mock interviews, optimize your ATS resume, and apply to top tier firms.",
        duration: "3 Weeks",
        completed: false,
        skills: ["Interview Prep", "Salary Negotiation", "ATS Optimization"],
        resources: [
          { title: "PathPilot AI Premium Prep", url: "#", type: "course" }
        ]
      }
    ];

    setRoadmap({
      goal,
      progress: 0,
      estimatedTimeline: "5 Months",
      steps: generatedSteps,
      suggestedProjects: [
        { title: `Enterprise ${goal} Suite`, desc: "A robust microservices web architecture utilizing modern caching and streaming.", difficulty: "Advanced" },
        { title: "AI-Powered Analytics Engine", desc: "Automated report synthesizer with real-time webhook triggers.", difficulty: "Intermediate" }
      ],
      certifications: [
        `Certified ${goal} Professional`,
        "Advanced Systems & Cloud Architect"
      ]
    });

    // Update skills gap
    setSkillsGap({
      existing: skills.length > 0 ? skills : ["Basic Programming", "Problem Solving"],
      missing: [`Advanced ${goal} Architecture`, "Cloud Scalability", "Enterprise Security", "Microservices"],
      readiness: 45
    });

    if (user) {
      setUser({ ...user, targetRole: goal, currentSkills: skills, educationLevel: education });
    }

    addXP(150, "Generated AI Personalized Roadmap!");
  };

  const saveTestResult = (result: Omit<TestResult, 'id' | 'date'>) => {
    const newResult: TestResult = {
      ...result,
      id: `test-${Date.now()}`,
      date: "Just now"
    };
    setTestScores(prev => [newResult, ...prev]);
    addXP(result.score * 3, "Completed Placement Mock Test!");
  };

  const saveInterviewResult = (result: Omit<InterviewResult, 'id' | 'date'>) => {
    const newResult: InterviewResult = {
      ...result,
      id: `int-${Date.now()}`,
      date: "Just now"
    };
    setInterviews(prev => [newResult, ...prev]);
    addXP(400, "Completed AI Mock Interview!");
  };

  const toggleBookmarkJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const applyForJob = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      addXP(200, "Submitted Application via PathPilot!");
      
      // Trigger success confetti
      try {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      } catch(e) {}
    }
  };

  // Extremely Smart AI Gateway Simulator
  const callAI = async (prompt: string, module: string): Promise<string> => {
    // If real API key is supplied, we could call OpenAI directly. 
    // To ensure ultimate stability and guaranteed instant brilliant response, we use rich curated generative responses.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate think time

    const p = prompt.toLowerCase();

    if (module === 'chatbot') {
      if (p.includes('resume') || p.includes('cv')) {
        return "💡 **AI Resume Optimization Insight:**\nTo pass modern ATS filters at Tier-1 companies, ensure you include clear action verbs (e.g., *Architected*, *Spearheaded*, *Optimized*) and quantify your metrics. For your role, inject key terms like **Microservices, CI/CD pipelines, and System Scalability**.";
      }
      if (p.includes('interview') || p.includes('prepare')) {
        return "🎯 **Interview Preparation Strategy:**\n1. **Technical:** Master the top 50 LeetCode patterns (Sliding Window, Two Pointers, Top K Elements).\n2. **Behavioral:** Use the **STAR** method (Situation, Task, Action, Result) for situational questions.\n3. **Company-specific:** Check our *Company Prep* module for real previous patterns!";
      }
      if (p.includes('project') || p.includes('build')) {
        return "🚀 **High-Impact Project Recommendation:**\nInstead of simple CRUD apps, build a **Distributed Task Scheduler** or an **AI-driven Document Parser** using vector embeddings. Deploy it using Docker and set up automated GitHub Actions. This immediately signals Senior-level capability to recruiters.";
      }
      return `Here is a personalized career insight for your query:\n\nBased on your current trajectory towards **${user?.targetRole || 'your target role'}**, I highly recommend focusing on practical deployment workflows. Spending 30 minutes daily on our **CRT & Aptitude Preparation** module will increase your selection odds by **34%**. Let me know if you want me to draft a custom 7-day sprint plan!`;
    }

    if (module === 'interview_answer') {
      return "Excellent explanation! You touched on the core technical tradeoffs effectively. To make your answer truly flawless, consider explicitly mentioning the **time vs. space complexity trade-offs** and how caching could prevent redundant database queries in high-throughput scenarios.";
    }

    if (module === 'resume_analysis') {
      return JSON.stringify({
        score: 78,
        atsStatus: "Good Compatibility",
        missingKeywords: ["Kubernetes", "GraphQL", "Agile Methodologies", "Unit Testing"],
        suggestions: [
          "Quantify your impact: e.g., 'Improved load times by 40%' instead of 'Optimized web pages'.",
          "Add a dedicated 'Core Competencies' section near the top for easier ATS parsing.",
          "Consolidate multiple small projects into 3 highly detailed, metrics-driven bullet points."
        ]
      });
    }

    return "I have analyzed your request using our fine-tuned PathPilot AI model. Your alignment score with top market demands is currently very strong. Keep consistently maintaining your learning streaks!";
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      theme,
      apiKey,
      xp,
      streak,
      level,
      badges,
      roadmap,
      skillsGap,
      testScores,
      interviews,
      savedJobs,
      appliedJobs,
      login,
      logout,
      setTheme,
      setApiKey,
      addXP,
      incrementStreak,
      unlockBadge,
      updateRoadmapStep,
      generateRoadmap,
      saveTestResult,
      saveInterviewResult,
      toggleBookmarkJob,
      applyForJob,
      callAI
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

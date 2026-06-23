//  This is career detail array
const careers = [
  {
    id: "software-eng",
    title: "Software Engineer",
    cluster: "Technology",
    description: "Design and build software applications.",
    skills: ["Programming", "Problem Solving", "Debugging"],
    salary: "RM 4,000 – RM 12,000/mo",
    outlook: "Excellent",
    study: "Computer Science",
    icon: "bi-code-slash",
    color: "#4361ee"
  },

  {
    id: "data-analyst",
    title: "Data Analyst",
    cluster: "Technology",
    description: "Analyze data to help decision making.",
    skills: ["Excel", "SQL", "Statistics"],
    salary: "RM 3,500 – RM 9,000/mo",
    outlook: "Very Good",
    study: "Data Science / Statistics",
    icon: "bi-bar-chart-line",
    color: "#7209b7"
  },

  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    cluster: "Technology",
    description: "Protect systems from cyber attacks.",
    skills: ["Networking", "Security", "Problem Solving"],
    salary: "RM 4,500 – RM 11,000/mo",
    outlook: "Excellent",
    study: "Cybersecurity / IT",
    icon: "bi-shield-check",
    color: "#d62828"
  },

  {
    id: "ux-designer",
    title: "UI/UX Designer",
    cluster: "Design",
    description: "Design user-friendly digital interfaces.",
    skills: ["Figma", "Creativity", "Design Thinking"],
    salary: "RM 3,500 – RM 9,000/mo",
    outlook: "Very Good",
    study: "Graphic Design / IT",
    icon: "bi-palette",
    color: "#f72585"
  },

  {
    id: "business-analyst",
    title: "Business Analyst",
    cluster: "Business",
    description: "Improve business processes using data.",
    skills: ["Analysis", "Communication", "Excel"],
    salary: "RM 4,000 – RM 10,000/mo",
    outlook: "Very Good",
    study: "Business / IT",
    icon: "bi-briefcase",
    color: "#2dc653"
  },
  {
  id: "ai-engineer",
  title: "AI Engineer",
  cluster: "Technology",
  description: "Develop artificial intelligence and machine learning solutions.",
  skills: ["Python", "Machine Learning", "Mathematics"],
  salary: "RM 6,000 – RM 18,000/mo",
  outlook: "Excellent",
  study: "Artificial Intelligence / Computer Science",
  icon: "bi-cpu",
  color: "#3a86ff"
},

{
  id: "network-engineer",
  title: "Network Engineer",
  cluster: "Technology",
  description: "Design and maintain computer networks.",
  skills: ["Networking", "Cisco", "Troubleshooting"],
  salary: "RM 3,500 – RM 9,000/mo",
  outlook: "Good",
  study: "Information Technology",
  icon: "bi-hdd-network",
  color: "#4361ee"
},

{
  id: "cloud-engineer",
  title: "Cloud Engineer",
  cluster: "Technology",
  description: "Manage cloud infrastructure and cloud services.",
  skills: ["AWS", "Azure", "Linux"],
  salary: "RM 5,500 – RM 15,000/mo",
  outlook: "Excellent",
  study: "Computer Science / IT",
  icon: "bi-cloud",
  color: "#4895ef"
},

{
  id: "graphic-designer",
  title: "Graphic Designer",
  cluster: "Design",
  description: "Create visual designs for digital and print media.",
  skills: ["Photoshop", "Illustrator", "Creativity"],
  salary: "RM 2,800 – RM 7,000/mo",
  outlook: "Good",
  study: "Graphic Design",
  icon: "bi-brush",
  color: "#ff6b35"
},

{
  id: "architect",
  title: "Architect",
  cluster: "Engineering",
  description: "Design buildings and construction projects.",
  skills: ["AutoCAD", "Creativity", "Planning"],
  salary: "RM 4,000 – RM 10,000/mo",
  outlook: "Good",
  study: "Architecture",
  icon: "bi-building",
  color: "#6c757d"
},

{
  id: "civil-engineer",
  title: "Civil Engineer",
  cluster: "Engineering",
  description: "Plan and supervise infrastructure projects.",
  skills: ["AutoCAD", "Mathematics", "Problem Solving"],
  salary: "RM 3,800 – RM 9,500/mo",
  outlook: "Good",
  study: "Civil Engineering",
  icon: "bi-tools",
  color: "#6c757d"
},

{
  id: "mechanical-engineer",
  title: "Mechanical Engineer",
  cluster: "Engineering",
  description: "Design and develop machines and mechanical systems.",
  skills: ["CAD", "Mathematics", "Physics"],
  salary: "RM 3,800 – RM 9,000/mo",
  outlook: "Good",
  study: "Mechanical Engineering",
  icon: "bi-gear",
  color: "#495057"
},

{
  id: "doctor",
  title: "Medical Doctor",
  cluster: "Healthcare",
  description: "Diagnose and treat illnesses.",
  skills: ["Communication", "Critical Thinking", "Medical Knowledge"],
  salary: "RM 5,000 – RM 20,000/mo",
  outlook: "Excellent",
  study: "Medicine",
  icon: "bi-heart-pulse",
  color: "#e63946"
},

{
  id: "pharmacist",
  title: "Pharmacist",
  cluster: "Healthcare",
  description: "Dispense medicines and advise patients.",
  skills: ["Chemistry", "Communication", "Attention to Detail"],
  salary: "RM 4,000 – RM 10,000/mo",
  outlook: "Very Good",
  study: "Pharmacy",
  icon: "bi-capsule",
  color: "#ef476f"
},

{
  id: "teacher",
  title: "Teacher",
  cluster: "Education",
  description: "Teach and guide students in schools.",
  skills: ["Communication", "Patience", "Leadership"],
  salary: "RM 2,800 – RM 7,000/mo",
  outlook: "Stable",
  study: "Education",
  icon: "bi-mortarboard",
  color: "#118ab2"
},

{
  id: "lecturer",
  title: "University Lecturer",
  cluster: "Education",
  description: "Teach and conduct research at universities.",
  skills: ["Teaching", "Research", "Communication"],
  salary: "RM 4,000 – RM 12,000/mo",
  outlook: "Good",
  study: "Master / PhD",
  icon: "bi-journal-bookmark",
  color: "#3a86ff"
},

{
  id: "accountant",
  title: "Accountant",
  cluster: "Business",
  description: "Manage financial records and reports.",
  skills: ["Accounting", "Excel", "Attention to Detail"],
  salary: "RM 3,000 – RM 8,500/mo",
  outlook: "Very Good",
  study: "Accounting",
  icon: "bi-calculator",
  color: "#198754"
},

{
  id: "marketing-manager",
  title: "Marketing Manager",
  cluster: "Business",
  description: "Plan and manage marketing campaigns.",
  skills: ["Communication", "Creativity", "Leadership"],
  salary: "RM 4,500 – RM 12,000/mo",
  outlook: "Good",
  study: "Marketing",
  icon: "bi-megaphone",
  color: "#ff9f1c"
},

{
  id: "lawyer",
  title: "Lawyer",
  cluster: "Law",
  description: "Provide legal advice and represent clients.",
  skills: ["Critical Thinking", "Communication", "Research"],
  salary: "RM 4,500 – RM 15,000/mo",
  outlook: "Good",
  study: "Law",
  icon: "bi-bank",
  color: "#6a4c93"
},

{
  id: "journalist",
  title: "Journalist",
  cluster: "Media",
  description: "Research and report news stories.",
  skills: ["Writing", "Research", "Communication"],
  salary: "RM 2,800 – RM 7,000/mo",
  outlook: "Stable",
  study: "Mass Communication",
  icon: "bi-newspaper",
  color: "#495057"
}
];



const allCareers = careers;

// this is skill checklist for careers
const skillChecklist = {
  "software-eng": [
    "Learn HTML, CSS, JavaScript",
    "Build small projects",
    "Learn Git basics"
  ],

  "data-analyst": [
    "Learn Excel",
    "Practice SQL basics",
    "Try simple datasets"
  ],

  "cybersecurity": [
    "Learn networking basics",
    "Understand cyber threats",
    "Practice beginner labs"
  ],

  "ux-designer": [
    "Learn Figma",
    "Study UI basics",
    "Design simple apps"
  ],

  "business-analyst": [
    "Learn Excel",
    "Understand business process",
    "Practice communication skills"
  ],

  "ai-engineer": [
  "Learn Python",
  "Study Machine Learning",
  "Build AI projects"
],

"network-engineer": [
  "Learn Networking",
  "Study Cisco CCNA",
  "Practice Packet Tracer"
],

"cloud-engineer": [
  "Learn AWS",
  "Understand Linux",
  "Deploy cloud projects"
],

"graphic-designer": [
  "Learn Photoshop",
  "Practice Illustrator",
  "Build portfolio"
],

"architect": [
  "Learn AutoCAD",
  "Practice 3D Design",
  "Study Building Design"
],

"civil-engineer": [
  "Learn AutoCAD",
  "Study Structures",
  "Complete internship"
],

"mechanical-engineer": [
  "Learn CAD",
  "Study Thermodynamics",
  "Build engineering projects"
],

"doctor": [
  "Complete Medical Degree",
  "Clinical Training",
  "Housemanship"
],

"pharmacist": [
  "Study Pharmacy",
  "Clinical Practice",
  "Register with Pharmacy Board"
],

"teacher": [
  "Study Education",
  "Teaching Practice",
  "Improve Communication"
],

"lecturer": [
  "Complete Master's Degree",
  "Conduct Research",
  "Publish Academic Papers"
],

"accountant": [
  "Learn Accounting Software",
  "Study ACCA",
  "Practice Financial Reports"
],

"marketing-manager": [
  "Learn Digital Marketing",
  "Study SEO",
  "Manage Marketing Campaigns"
],

"lawyer": [
  "Study Law",
  "Complete Chambering",
  "Pass Bar Exam"
],

"journalist": [
  "Improve Writing",
  "Learn Interview Skills",
  "Build News Portfolio"
]

  
};
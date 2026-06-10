export interface ResumeProject {
  title: string;
  subtitle: string;
  year: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  architecture: string;
  github: string;
  architectureDetails: string;
  nodes: { label: string; icon: string }[];
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  metric: { label: string; value: string };
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  isSpecial: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: { name: string; level: number; info: string }[];
  highlights: string[];
}

export interface ResumeDatabase {
  name: string;
  title: string;
  contact: { phone: string; email: string; location: string; linkedin: string; github: string; availability: string; };
  summary: string;
  skills: SkillGroup[];
  projects: ResumeProject[];
  certifications: CertificationItem[];
  education: EducationItem[];
}

export const heroTitles = [
  'Software Engineer', 'Python Specialist', 'AWS Serverless Architect',
  'Certified MongoDB Developer', 'GenAI & Agent Builder',
];
export const heroStats = [
  { value: 8.27, label: 'CGPA / 10', suffix: '' },
  { value: 7, label: 'Certifications', suffix: '' },
  { value: 4, label: 'Projects', suffix: '' },
  { value: 95, label: 'Python Mastery', suffix: '%' },
];
export const heroSummary = 'Integrated M.Tech Software Engineering student at VIT Chennai (CGPA: 8.27). Specialized in scalable Python systems, event-driven AWS serverless pipelines, MongoDB indexing, and advanced agentic architectures.';

export const contactInfo = {
  email: 'ramakrishna.mvp2004@gmail.com',
  phone: '+91 8008874541',
  location: 'Hyderabad, India',
  availability: 'Full-time (Work from Office: Pune / Bangalore / Hyderabad / Chennai)'
};

export const educationData = [
  { institution: 'Vellore Institute of Technology (VIT)', location: 'Chennai, India', degree: 'Integrated M.Tech in Software Engineering', duration: '2022 -- 2027', metricLabel: 'CGPA', metricValue: '8.27/10', highlights: ['15 Years Full-Time Education milestone', 'Specialized coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Software Engineering, Cloud Computing'] },
  { institution: 'Saraswathi Junior College', location: 'Ongole, India', degree: 'Intermediate (Class XII)', duration: '2020 -- 2022', metricLabel: 'Board Score', metricValue: '97%', highlights: ['Advanced MPC curriculum (Mathematics, Physics, Chemistry)', 'Academic Excellence recognition for scoring 97% overall'] },
  { institution: 'Apex High School', location: 'Ongole, India', degree: 'Secondary School (Class X)', duration: '2019 -- 2020', metricLabel: 'State Board Score', metricValue: '98%', highlights: ['Top 1% score in Class X examinations', 'Demonstrated strong foundation in STEM disciplines'] }
];

export const certificationsData = [
  { title: 'MongoDB Certified Associate Developer', issuer: 'MongoDB', date: 'May 2026', verifyUrl: 'https://www.credly.com/users/venkata-ramakrishna.fe20e510', isSpecial: true },
  { title: 'Claude with the Anthropic API', issuer: 'Anthropic', date: 'May 2026', verifyUrl: 'https://verify.skilljar.com/c/y74wjp348erp', isSpecial: true },
  { title: 'Introduction to Model Context Protocol (MCP)', issuer: 'Anthropic', date: 'May 2026', verifyUrl: 'https://verify.skilljar.com/c/t832agpz7q82', isSpecial: true },
  { title: 'Introduction to Agent Skills', issuer: 'Anthropic', date: 'May 2026', verifyUrl: 'https://verify.skilljar.com/c/gj7g8nr79xug', isSpecial: true },
  { title: 'OCI 2025 Certified AI Foundations Associate', issuer: 'Oracle University', date: '2025', verifyUrl: 'https://education.oracle.com/', isSpecial: false },
  { title: 'Python Programming', issuer: 'Coursera', date: '2024', isSpecial: false },
  { title: 'Agile Scrum in Practice', issuer: 'Infosys Springboard', date: '2024', isSpecial: false }
];

export const skillsData = [
  { category: 'GenAI & Agentic Systems', description: 'Designing autonomous agents, LLM tool integration, and model coordination.', skills: [{ name: 'Claude API Integration', level: 95, info: 'Certified by Anthropic in Anthropic Claude API.' }, { name: 'Model Context Protocol (MCP)', level: 90, info: 'Certified in MCP. Creating custom host-client tools.' }, { name: 'Agent Skills Framework', level: 90, info: 'Anthropic Certified. Tool-use pipelines, agentic planning.' }, { name: 'RAG Architecture', level: 85, info: 'Retrieval-Augmented Generation for semantic document querying.' }, { name: 'Convolutional Neural Networks (CNN)', level: 80, info: 'Deep learning classification models for image/sensor analysis.' }], highlights: ['Anthropic Claude API & Agent Skills Certified', 'Built StudyMate - serverless RAG AI document platform', 'Integrated custom CNN models onto embedded ESP32-CAM systems'] },
  { category: 'Python & Software Engineering', description: 'Writing clean, high-performance, object-oriented production software.', skills: [{ name: 'Object-Oriented Programming', level: 95, info: 'Class hierarchies, polymorphism, solid clean code.' }, { name: 'Pytest (Automated Testing)', level: 90, info: 'Developing comprehensive test suites and mock tests.' }, { name: 'Multi-threaded Concurrency', level: 85, info: 'Parallel background workers on Linux/Ubuntu.' }, { name: 'Debugging & Root Cause Analysis', level: 90, info: 'Systematic troubleshooting to resolve integration bugs.' }, { name: 'Java, JavaScript (ES6+), C', level: 80, info: 'Broad foundational coding capability.' }], highlights: ['Optimized system reliability by 40% using concurrent threading structures', 'Authored robust automated test suites checking sensor feeds', 'Continuous reviewer enforcing Git workflows and style guidelines'] },
  { category: 'AWS Cloud & Backend', description: 'Designing serverless, microservice-based backend systems.', skills: [{ name: 'AWS Lambda (Serverless)', level: 90, info: 'Creating highly modular event-driven backend functions.' }, { name: 'AWS Cognito (Auth)', level: 85, info: 'Secure authentication, user pool management, JWT.' }, { name: 'AWS API Gateway & S3', level: 90, info: 'Hosting APIs and organizing media assets pipelines.' }, { name: 'Node.js & Express.js', level: 85, info: 'REST API architectures and route handling.' }, { name: 'Git & CI/CD Fundamentals', level: 85, info: 'Enforcing branching standards, review protocols, pull requests.' }], highlights: ['Reduced server API latency by 20% using Lambda caching and optimization', 'Constructed event-driven workflows mapping API Gateway -> S3 -> EC2', 'Implemented type-safe workflow engines with TypeScript/React'] },
  { category: 'Databases & Storage', description: 'Structuring transactional and analytical NoSQL/SQL schemas.', skills: [{ name: 'MongoDB (NoSQL)', level: 95, info: 'Certified MongoDB Associate Developer.' }, { name: 'Query Optimization & Indexing', level: 90, info: 'Creating indexes and optimizing compound query workloads.' }, { name: 'Aggregation Pipelines', level: 90, info: 'Complex analytics queries and document restructuring.' }, { name: 'DynamoDB', level: 85, info: 'AWS primary store schema designs.' }, { name: 'PostgreSQL / MySQL', level: 80, info: 'Relational database schema structure and SQL queries.' }], highlights: ['MongoDB Certified Associate Developer (Valid till May 2026)', 'Sped up database queries by 20% using indexes and pipeline tuning', 'Developed full stack MERN architectures with optimized data flow'] }
];

export const projectsData = [
  { title: 'StudyMate', subtitle: 'AI-Powered Serverless Notes Application', year: '2024', technologies: ['Python', 'AWS Lambda', 'S3', 'API Gateway', 'Cognito', 'CloudWatch', 'GenAI'], metrics: [{ label: 'Latency Reduction', value: '20%' }, { label: 'LLM Features', value: '5 Modules' }, { label: 'Testing Coverage', value: '100% Pytest' }], bulletPoints: ['Designed and coded a production-grade serverless AI application in Python on AWS, delivering 5 LLM-integrated features — MCQ generation, Summarization, Flashcards, Mindmaps, and Detailed Notes.', 'Developed clean, maintainable Python Lambda functions forming an event-driven pipeline (Lambda ➔ API Gateway ➔ S3 ➔ EC2) with prompt engineering for consistent, structured AI output.', 'Optimised code-level performance and cloud resource tuning to reduce API latency by 20%; implemented AWS Cognito authentication and CloudWatch monitoring.', 'Executed end-to-end unit testing across all Python AI feature modules before deployment, ensuring software quality and reliability at scale.'], architecture: 'Event-driven serverless architecture using API Gateway for REST endpoints, Cognito for client JWT-based validation, S3 for storing document files, Lambda for execution (with Python cold start tunings), and prompt-engineered LLM engines for markdown output parser.', github: 'https://github.com/Ramakrishna9-R09/StudyMate', architectureDetails: 'Event-driven serverless architecture using API Gateway for REST endpoints, Cognito for client JWT-based validation, S3 for storing document files, Lambda for execution (with Python cold start tunings), and prompt-engineered LLM engines for markdown output parser.', nodes: [{ label: 'Client App', icon: 'layout' }, { label: 'Cognito JWT', icon: 'shield' }, { label: 'API Gateway', icon: 'play' }, { label: 'AWS Lambda', icon: 'cpu' }, { label: 'S3 & GenAI', icon: 'db' }] },
  { title: 'IoT Scalp Disease Detection', subtitle: 'Edge AI Classification Hardware Pipeline', year: '2023 - 2024', technologies: ['Python', 'Pytest', 'CNN', 'Embedded C++', 'ESP32-CAM', 'Linux'], metrics: [{ label: 'Reliability Increase', value: '40%' }, { label: 'Resolved Bugs', value: '5+ Core' }, { label: 'Unit Tests', value: 'Pytest Suite' }], bulletPoints: ['Authored Python automation scripts integrating a CNN deep learning model into an embedded hardware pipeline, enabling intelligent real-time disease classification.', 'Designed and executed Pytest-based automated test suites for sensor data validation and pipeline integrity.', 'Implemented multi-threaded concurrent processing in Python on Linux/Ubuntu; resolved 5+ hardware-software integration bugs through systematic root cause analysis.', 'Documented software design decisions and integration processes to facilitate team understanding and future maintenance.'], architecture: 'Embedded hardware pipeline connecting ESP32-CAM video stream over sockets to a local Linux host server running a concurrent Python classifier. Multi-threading is utilized to handle camera frames in thread A and execute TensorFlow/CNN classification on thread B without UI stutter.', github: 'https://github.com/Ramakrishna9-R09/IoT-Scalp-Disease', architectureDetails: 'Embedded hardware pipeline connecting ESP32-CAM video stream over sockets to a local Linux host server running a concurrent Python classifier. Multi-threading is utilized to handle camera frames in thread A and execute TensorFlow/CNN classification on thread B without UI stutter.', nodes: [{ label: 'ESP32 Cam', icon: 'layout' }, { label: 'Sockets IO', icon: 'play' }, { label: 'Linux Worker', icon: 'cpu' }, { label: 'CNN Model', icon: 'db' }, { label: 'Pytest Logs', icon: 'shield' }] },
  { title: 'VIT Connect', subtitle: 'Full-Stack Student Community Platform', year: '2023', technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'Agile'], metrics: [{ label: 'Query Performance', value: '+20%' }, { label: 'Agile Team', value: '4 Members' }, { label: 'Auth Token', value: 'JWT Standard' }], bulletPoints: ['Designed and built a full-stack MERN application with component-based architecture, RESTful backend APIs, and MongoDB NoSQL storage.', 'Optimised MongoDB query performance by 20% through indexing and aggregation pipeline tuning.', 'Led a 4-member Agile team through sprint planning, daily stand-ups, and Git-based peer code reviews.', 'Managed the full codebase using Git version control, enforcing branching strategies and review workflows to ensure team-level maintainability.'], architecture: 'Standard MERN (MongoDB, Express, React, Node) architecture. Focused heavily on database scalability. Handled complex feeds and community metrics through customized MongoDB aggregate queries and compound indexing on posts and user tags.', github: 'https://github.com/Ramakrishna9-R09/VIT-Connect', architectureDetails: 'Standard MERN (MongoDB, Express, React, Node) architecture. Focused heavily on database scalability. Handled complex feeds and community metrics through customized MongoDB aggregate queries and compound indexing on posts and user tags.', nodes: [{ label: 'React SPA', icon: 'layout' }, { label: 'JWT Guard', icon: 'shield' }, { label: 'Express Router', icon: 'play' }, { label: 'MongoDB Index', icon: 'db' }] },
  { title: 'HR Workflow Designer', subtitle: 'Type-Safe Drag & Drop Automation GUI', year: '2024 - Present', technologies: ['TypeScript', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'Git'], metrics: [{ label: 'Frontend Safety', value: '100% Type-Safe' }, { label: 'UI Library', value: 'Dnd-Kit' }, { label: 'State Sync', value: 'Client/Server' }], bulletPoints: ['Architected a type-safe full-stack workflow automation tool with drag-and-drop React.js frontend and Node.js/Express.js backend.', 'Applied modular architecture, clean code principles, and comprehensive documentation to build scalable, high-performing components.', 'Applied agile development practices, Git version control, and iterative sprint-based delivery.'], architecture: 'Type-safe React flow-editor utilizing React hooks and TypeScript schemas. Backend handles layout validations and schema mapping via Node Express server, storing workflow graphs in standard JSON trees.', github: 'https://github.com/Ramakrishna9-R09/HR-Workflow-Designer', architectureDetails: 'Type-safe React flow-editor utilizing React hooks and TypeScript schemas. Backend handles layout validations and schema mapping via Node Express server, storing workflow graphs in standard JSON trees.', nodes: [{ label: 'React Flow GUI', icon: 'layout' }, { label: 'Node API Shield', icon: 'shield' }, { label: 'JSON validation', icon: 'play' }, { label: 'Local Store', icon: 'db' }] }
];

export function loadData<T>(key: string, fallback: T): T {
  try { const s = localStorage.getItem(`portfolio_${key}`); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}

export function saveData<T>(key: string, value: T) {
  try { localStorage.setItem(`portfolio_${key}`, JSON.stringify(value)); } catch {}
}

const defaultResumeDb: ResumeDatabase = {
  name: 'Venkata Ramakrishna Kamepalli',
  title: 'Software Engineer & GenAI/Agentic Developer',
  contact: {
    phone: '+91 8008874541',
    email: 'ramakrishna.mvp2004@gmail.com',
    location: 'Hyderabad, India',
    linkedin: 'https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/',
    github: 'https://github.com/Ramakrishna9-R09',
    availability: 'Full-time (Work from Office: Pune / Bangalore / Hyderabad / Chennai)'
  },
  summary: 'Python-proficient Software Engineering student (M.Tech, VIT Chennai | CGPA: 8.27/10) with hands-on experience designing, coding, and enhancing software components across full-stack and cloud-based systems using modern frameworks and agile methodologies. MongoDB Certified Associate Developer. Certified in Anthropic Claude API, MCP, and Agent Skills.',
  skills: skillsData,
  projects: projectsData,
  certifications: certificationsData,
  education: educationData.map(e => ({ institution: e.institution, location: e.location, degree: e.degree, duration: e.duration, metric: { label: e.metricLabel, value: e.metricValue }, highlights: e.highlights }))
};

export function getResumeDb(): ResumeDatabase {
  return loadData('resumeDb', defaultResumeDb);
}

export function getHero() {
  return loadData('hero', { titles: heroTitles, stats: heroStats, summary: heroSummary });
}

export function getSkillsData() {
  return loadData('skills', skillsData);
}

export function getProjectsData() {
  return loadData('projects', projectsData);
}

export function getCertificationsData() {
  return loadData('certifications', certificationsData);
}

export function getEducationData() {
  return loadData('education', educationData);
}

export function getContactData() {
  return loadData('contact', contactInfo);
}

export const resumeDb = getResumeDb();

export function searchResumeIndex(query: string): { context: string[]; response: string } {
  const q = query.toLowerCase().trim();
  const ctx: string[] = [];
  let response = '';
  if (!q) return { context: ['Null Query.'], response: 'Please ask a valid query about Venkata Ramakrishna\'s resume.' };
  const db = getResumeDb();
  const isEducation = q.includes('cgpa') || q.includes('gpa') || q.includes('education') || q.includes('college') || q.includes('school') || q.includes('vit') || q.includes('chennai') || q.includes('marks');
  const isAI = q.includes('genai') || q.includes('claude') || q.includes('agent') || q.includes('mcp') || q.includes('anthropic') || q.includes('skills') || q.includes('model') || q.includes('rag');
  const isProjects = q.includes('project') || q.includes('studymate') || q.includes('iot') || q.includes('disease') || q.includes('scalp') || q.includes('vit connect') || q.includes('workflow') || q.includes('designer');
  const isSkills = q.includes('skill') || q.includes('python') || q.includes('database') || q.includes('mongo') || q.includes('aws') || q.includes('typescript') || q.includes('backend') || q.includes('cloud');
  const isContact = q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('linkedin') || q.includes('github') || q.includes('availability') || q.includes('address') || q.includes('office') || q.includes('relocate');
  if (isEducation) {
    ctx.push(`Context 1: "Integrated M.Tech Software Engineering at ${db.education[0].institution}, ${db.education[0].metric.label} ${db.education[0].metric.value}."`, `Context 2: "Intermediate (XII) score ${db.education[1].metric.value} at Saraswathi Junior College | Class X score ${db.education[2].metric.value}."`);
    response = `Venkata Ramakrishna Kamepalli is currently pursuing an Integrated M.Tech in Software Engineering at Vellore Institute of Technology (VIT) Chennai, holding an active CGPA of 8.27/10.`;
  } else if (isAI) {
    ctx.push('Context 1: "Certified in Claude API, MCP, and Agent Skills by Anthropic (May 2026)."', 'Context 2: "StudyMate application delivers 5 LLM features (MCQ, Summarization, Flashcards, Mindmaps, Notes) in Python on AWS."');
    response = `He holds official Anthropic certifications in 'Claude with the Anthropic API', 'Model Context Protocol (MCP)', and 'Introduction to Agent Skills' (May 2026).`;
  } else if (isProjects) {
    ctx.push('Context 1: "Projects: StudyMate (AWS Serverless AI), IoT Scalp Disease Detector (CNN Classifier), VIT Connect (Student Community), HR Workflow Designer."', 'Context 2: "StudyMate latency reduced 20%. IoT reliability increased 40% via multithreading. MERN DB query optimized by 20%."');
    response = `Venkata Ramakrishna has built 4 key systems: (1) StudyMate, a serverless AI study platform; (2) IoT Scalp Disease Detection; (3) VIT Connect, a MERN community platform; (4) HR Workflow Designer.`;
  } else if (isSkills) {
    ctx.push('Context 1: "Skills categories: GenAI, Python & OOP, AWS Serverless Cloud, NoSQL Databases (MongoDB Associate Developer)."', 'Context 2: "Ecosystem capabilities: Pytest testing, multi-threaded concurrency, clean code reviewing."');
    response = `His technical stack is anchored in Python (OOP, Pytest validation, multi-threading) and AWS serverless systems.`;
  } else if (isContact) {
    ctx.push(`Context 1: "Availability: ${db.contact.availability}."`, `Context 2: "Contact details: Email: ${db.contact.email} | Phone: ${db.contact.phone} | Location: ${db.contact.location}."`);
    response = `You can reach Venkata Ramakrishna Kamepalli via email at ${db.contact.email} or by phone at ${db.contact.phone}. He is based in ${db.contact.location} and is ${db.contact.availability}.`;
  } else {
    ctx.push('Context 1: "Principal Summary: Python-proficient software engineering student with M.Tech from VIT Chennai."', 'Context 2: "Certified in Claude API, MCP, Agent Skills, and MongoDB."');
    response = `Venkata Ramakrishna Kamepalli is a Software Engineering student at VIT Chennai, specializing in robust Python backends and AWS serverless AI architectures.`;
  }
  return { context: ctx, response };
}

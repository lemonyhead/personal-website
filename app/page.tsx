'use client';

import React, { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  name: string;
  bio: string;
}

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguage: string;
}

const Portfolio: React.FC = () => {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [githubProjects, setGithubProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = 'lemonyhead';
  const GITHUB_API_BASE = 'https://api.github.com';

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`),
        fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
      ]);

      const userData: GitHubUser = await userResponse.json();
      const reposData: GitHubRepo[] = await reposResponse.json();

      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      const languages: Record<string, number> = {};
      reposData.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });
      
      const topLanguage = Object.keys(languages).reduce((a, b) => 
        languages[a] > languages[b] ? a : b, 'JavaScript'
      );

      setGithubStats({
        totalRepos: userData.public_repos,
        totalStars,
        totalForks,
        topLanguage
      });

      const featuredRepos = reposData
        .filter(repo => !repo.fork && repo.description)
        .slice(0, 6);

      setGithubProjects(featuredRepos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLoading(false);
    }
  };

  const skillCategories = [
    {
      title: 'Programming',
      skills: ['Python', 'SQL', 'R', 'HTML/CSS', 'Git']
    },
    {
      title: 'Data Science',
      skills: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch']
    },
    {
      title: 'Cloud & Tools',
      skills: ['AWS', 'Azure', 'GCP', 'BigQuery', 'Tableau', 'Vertex AI', 'Cloud Scheduler']
    },
    {
      title: 'Frameworks',
      skills: ['Flask', 'Dash', 'NetworkX', 'Plotly', 'Dash Bootstrap', 'Plotly Express']
    }
  ];  

  const experiences = [
    {
      company: 'PepsiCo',
      role: 'Supply Chain Operations Intern',
      period: 'June 2025 - Present',
      achievements: [
        'Partnered cross-functionally with engineering, supply chain, and maintenance teams to standardize inventory workflows, uncovering $2M+ in previously unaccounted critical parts',
        'Reorganized 400+ parts across freight containers and centralized storage, improving accessibility and reducing equipment downtime',
        'Acting as Maintenance Supervisor during final project phase, coordinating 50+ frontline workers across 3 shifts'
      ]
    },
    {
      company: 'Georgia Institute of Technology',
      role: 'Undergraduate Researcher',
      period: 'January 2025 - Present',
      achievements: [
        'Developed a novel probabilistic algorithm that improved survival estimation accuracy by 15–30% compared to baseline models',
        'Conducting simulation-based validation against traditional methods across exponential and Weibull scenarios',
        'Extending validation using real-world patient data from Duke Hospital to assess robustness and clinical applicability'
      ]
    },
    {
      company: 'Georgia Institute of Technology',
      role: 'Full-Stack Student Data Developer',
      period: 'January 2025 - Present',
      achievements: [
          'Built a data cleaning pipeline with Pandas to convert raw survey exports into structured, analysis-ready formats for backend processing',
          'Developed a backend multi-role login system with dynamic user routing and role-based dashboard access using Flask',
          'Designed and implemented frontend layouts to showcase Georgia Tech\'s sustainability course offerings that adapt based on user type, improving usability and visual appeal across roles with HTML/CSS and Dash'
      ]
    },
    {
      company: 'Dexcom',
      role: 'Data Analytics & Engineering Intern',
      period: 'May 2024 - August 2024',
      achievements: [
        'Developed Tableau dashboards monitoring supply chain data quality across 9 BigQuery views and 3M+ records',
        'Optimized 500+ line Python script for processing SKU data, achieving 88% runtime reduction',
        'Restructured Tableau data model integrating 6 BigQuery tables, tracking $200-600M monthly inventory'
      ]
    },
    {
      company: 'OMP',
      role: 'Supply Chain Software Consulting Intern',
      period: 'January 2024 – May 2024, August 2024 – December 2024',
      achievements: [
        'Worked on configuration validation and scenario testing for a Fortune 50 client using OMP’s supply chain planning software',
        'Supported change management documentation and helped improve client understanding of parameter behavior during planning cycles'
      ]
    }
  ];

  const featuredProjects = [
    {
      title: 'Stock Price Prediction Modeling',
      description: 'ML pipeline predicting short-term stock movements using technical indicators and macroeconomic features',
      tech: ['Python', 'XGBoost', 'TensorFlow', 'Backtesting'],
      results: '62% directional accuracy, 114% cumulative returns'
    },
    {
      title: 'Amazon Sales Data Analytics',
      description: 'Comprehensive analysis of 120K+ Amazon sales entries with advanced ML modeling',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'RandomForest'],
      results: '15% model accuracy improvement, MSE < 0.0001 days'
    },
    {
      title: 'Basketball Win Probability Modeling',
      description: 'ML models including CNNs and Elo rating systems for win probability estimation',
      tech: ['Python', 'CNN', 'Logistic Regression', 'KNN'],
      results: '66% accuracy in forecasting winning teams'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-blue-700 to-indigo-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl text-center relative overflow-hidden border border-white/30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-3 animate-pulse"></div>

          <div className="relative z-10">
            
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                Aron Cheng
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mx-auto rounded-full mb-6 shadow-lg"></div>
            </div>

            <div className="flex justify-center gap-3 flex-wrap mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl border border-white/20 backdrop-blur-sm">
                B.S. in Industrial & Systems Engineering - Concentration in Analytics & Data Science
              </span>
            </div>

            <div className="flex justify-center gap-4 flex-wrap mb-6">
              <a href="mailto:aroncheng9@gmail.com" className="bg-white/10 border-2 border-white/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/90 hover:text-purple-600 hover:shadow-xl hover:scale-110 backdrop-blur-sm">
                Email
              </a>
              <a href="https://www.linkedin.com/in/aron-cheng/" target="_blank" rel="noopener noreferrer" className="bg-white/10 border-2 border-white/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/90 hover:text-purple-600 hover:shadow-xl hover:scale-110 backdrop-blur-sm">
                LinkedIn
              </a>
              <a href="https://github.com/lemonyhead" target="_blank" rel="noopener noreferrer" className="bg-white/10 border-2 border-white/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-white/90 hover:text-purple-600 hover:shadow-xl hover:scale-110 backdrop-blur-sm">
                GitHub
              </a>
            </div>

            {/* Professional Interests */}
            <div className="space-y-4">
              <p className="text-lg text-white/95 font-semibold">
                Professional Interests
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl cursor-pointer border border-white/20 backdrop-blur-sm">
                  Data Science
                </span>
                <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl cursor-pointer border border-white/20 backdrop-blur-sm">
                  Product Management
                </span>
                <span className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl transform hover:scale-110 transition-all duration-300 hover:shadow-2xl cursor-pointer border border-white/20 backdrop-blur-sm">
                  Tech Strategy
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Awards Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Awards & Recognition
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-3">Presidential Undergraduate Research Award (PURA)</h3>
              <p>Competitive Georgia Tech research grant and stipend for undergraduate research with faculty mentorship</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-3">Evelyn Pennington Outstanding Service Award</h3>
              <p>Selected by Georgia Tech’s College of Engineering as the top student contributor to the Industrial Engineering community (2024–2025)</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-3">IISE Rising Star Award</h3>
              <p>Given by the Institute of Industrial and Systems Engineers to one 2nd/3rd-year student for leadership and impact in advancing Industrial Engineering at Georgia Tech</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-3">Celebrating Student Leaders Honoree</h3>
              <p>Selected by Georgia Tech's Center for Student Engagement as one of 20–30 student leaders recognized campus-wide with featured banners</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Professional Experience
          </h2>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500 hover:translate-x-2 transition-transform">
                <h3 className="text-xl font-bold text-indigo-600">{exp.company}</h3>
                <h4 className="text-lg text-gray-700 mb-2">{exp.role}</h4>
                <p className="text-gray-600 italic mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold mt-1">→</span>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            GitHub Projects
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading GitHub data...</p>
            </div>
          ) : (
            <>
              {githubStats && (
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-slate-700 to-blue-700 text-white p-6 rounded-2xl text-center shadow-xl">
                    <div className="text-3xl font-bold mb-2">{githubStats.totalRepos}</div>
                    <div className="text-sm opacity-90">Public Repositories</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-700 to-blue-700 text-white p-6 rounded-2xl text-center shadow-xl">
                    <div className="text-3xl font-bold mb-2">{githubStats.totalStars}</div>
                    <div className="text-sm opacity-90">Total Stars</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-700 to-blue-700 text-white p-6 rounded-2xl text-center shadow-xl">
                    <div className="text-3xl font-bold mb-2">{githubStats.totalForks}</div>
                    <div className="text-sm opacity-90">Total Forks</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-700 to-blue-700 text-white p-6 rounded-2xl text-center shadow-xl">
                    <div className="text-3xl font-bold mb-2">{githubStats.topLanguage}</div>
                    <div className="text-sm opacity-90">Top Language</div>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500 hover:-translate-y-2 transition-transform cursor-pointer"
                       onClick={() => window.open(project.html_url, '_blank')}>
                    <h3 className="text-xl font-bold text-indigo-600 mb-3">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.language && (
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs">
                          {project.language}
                        </span>
                      )}
                      {project.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        {project.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer" 
                         className="text-indigo-600 hover:text-purple-600 font-bold flex items-center gap-1"
                         onClick={(e) => e.stopPropagation()}>
                        View Code
                      </a>
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer"
                           className="text-indigo-600 hover:text-purple-600 font-bold flex items-center gap-1"
                           onClick={(e) => e.stopPropagation()}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center mt-4 italic">
                I'm actively building out my GitHub portfolio — more projects and tools coming soon!
              </p>
            </>
          )}
        </section>

        {/* Featured Projects Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500 hover:-translate-y-2 transition-transform">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="font-bold text-gray-800">
                  <strong>Results:</strong> {project.results}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Leadership & Community Involvement
          </h2>
          
          {/* GT 1000 Team Leader */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-yellow-500 opacity-70 mb-6">
            <h3 className="text-xl font-bold text-yellow-600 flex items-center gap-2">
              <span className="text-2xl"></span>
              GT 1000 Team Leader
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium ml-2">To Be Added</span>
            </h3>
            <p className="text-gray-600 mt-2 italic">
              Will include mentorship and peer leadership work from Fall 2025 — supporting first-year Georgia Tech students in their academic and campus transitions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold text-indigo-600">Institute of Industrial and Systems Engineers</h3>
            <h4 className="text-lg text-gray-700 mb-2">VP of Internal/External Affairs</h4>
            <p className="text-gray-600 italic mb-4">December 2023 - Present</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold mt-1">→</span>
                <span className="text-gray-700">Led launch of consulting project initiative resulting in 10+ projects with 40+ students across 3 semesters</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold mt-1">→</span>
                <span className="text-gray-700">Pioneered corporate-sponsored case competition, securing BDO partnership and $600 in prize money</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold mt-1">→</span>
                <span className="text-gray-700">Managed over $100,000 in corporate sponsorships for conferences and professional development</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-green-500 mt-6">
            <h3 className="text-xl font-bold text-green-600">Georgia Tech Chess Club</h3>
            <h4 className="text-lg text-gray-700 mb-2">VP of Finance</h4>
            <p className="text-gray-600 italic mb-4">May 2023 – May 2025</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span className="text-gray-700">Managed $5,000+ annual budget and secured funding for tournaments and equipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span className="text-gray-700">Helped organize on-campus tournaments and weekly meetings for 50+ active members</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Personal Interests Section */}
        <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mt-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center gap-3">
            <span className="text-3xl"></span>
            Beyond Work
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chess Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-green-500 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                <span className="text-2xl"></span> 
                Chess
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">Class A Level</span>
                  <span className="text-gray-700 font-semibold">~1850 Rating</span>
                </div>
                
                <p className="text-gray-600">
                  Strategic thinking and pattern recognition skills developed through competitive chess, achieving Class A level proficiency with consistent tournament performance and continuous improvement.
                </p>
                
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                    <span className="text-sm"></span>
                    Focus & Mental Endurance
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                    <span className="text-sm"></span>
                    Strategic Analysis
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm">
                    Risk Assessment
                  </span>
                </div>
                
                {/* Profile Links */}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <a 
                    href="https://www.chess.com/member/lemonyhead" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors group w-full"
                  >
                    <span className="text-lg"></span>
                    Chess.com Profile
                    <span className="text-sm">🔗</span>
                  </a>
                  
                  <a 
                    href="https://www.uschess.org/msa/MbrDtlMain.php?16073381" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group w-full"
                  >
                    <span className="text-lg"></span>
                    USCF Tournament Profile
                    <span className="text-sm">🔗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Travel & Exploration Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                <span className="text-xl"></span>
                Travel & Exploration
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">6 Countries</span>
                  <span className="text-gray-700">Growing Journey</span>
                </div>
                
                <p className="text-gray-600">
                  Recently began international travel, exploring diverse cultures and perspectives. Extensively traveled across the United States, with frequent visits to major cities including San Diego, Los Angeles, New York, Charlotte, and Atlanta.
                </p>
                
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                    <span className="text-sm"></span>
                    Cultural Awareness
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                    Open-Mindedness
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                    <span className="text-sm"></span>
                    Adaptability
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          </div>

          {/* How These Passions Shape My Work */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-bold text-indigo-600 mb-3">How These Passions Shape My Work</h3>
            <p className="text-gray-700">
              Chess has strengthened my analytical thinking and strategic planning abilities, directly translating to complex problem-solving in data science and engineering. Travel experiences across diverse US cities and international destinations have enhanced my cultural awareness and adaptability, valuable assets in today's global business environment. Continuously seeking new experiences and challenges that expand perspective and build character, every experience contributes to personal and professional development with a growth mindset.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  BookOpen,
  Star,
  Clock,
  Code,
  ChevronRight,
  CheckCircle,
  Terminal,
  Upload,
  FileText,
  Download,
} from "lucide-react";
import { supabase } from "../supabaseClient";

const courses = [
  {
    title: "Machine Learning with Python",
    instructor: "Dr. Meenakshi",
    duration: "40h",
    rating: 4.9,
    enrolled: 320,
    tag: "AI/ML",
    color: "bg-blue-500",
  },
  {
    title: "Full Stack Web Development",
    instructor: "Mr. Venkatesh",
    duration: "60h",
    rating: 4.8,
    enrolled: 280,
    tag: "Development",
    color: "bg-purple-500",
  },
  {
    title: "Cloud Computing Essentials",
    instructor: "Dr. Meenakshi",
    duration: "30h",
    rating: 4.7,
    enrolled: 190,
    tag: "Cloud",
    color: "bg-green-500",
  },
  {
    title: "Ethical Hacking & Security",
    instructor: "Dr. Arumugam",
    duration: "35h",
    rating: 4.9,
    enrolled: 150,
    tag: "Security",
    color: "bg-orange-500",
  },
  {
    title: "Data Structures & Algorithms",
    instructor: "Dr. Krishnamurthy",
    duration: "50h",
    rating: 4.8,
    enrolled: 400,
    tag: "DSA",
    color: "bg-pink-500",
  },
  {
    title: "Deep Learning & Neural Nets",
    instructor: "Ms. Kavitha",
    duration: "45h",
    rating: 4.7,
    enrolled: 210,
    tag: "AI/ML",
    color: "bg-indigo-500",
  },
];

const programmingLanguages = [
  {
    id: "c",
    name: "C Programming",
    icon: "C",
    color: "bg-blue-500",
    description: "Learn the fundamentals of C programming",
    topics: [
      "Variables & Data Types",
      "Control Statements",
      "Functions",
      "Arrays & Strings",
      "Pointers",
      "Structures",
    ],
    problems: [
      { title: "Hello World", difficulty: "Easy", status: "completed" },
      { title: "Sum of Two Numbers", difficulty: "Easy", status: "completed" },
      { title: "Factorial", difficulty: "Easy", status: "pending" },
      { title: "Fibonacci Series", difficulty: "Medium", status: "pending" },
      { title: "Palindrome Check", difficulty: "Medium", status: "pending" },
      { title: "Pointer Operations", difficulty: "Hard", status: "pending" },
    ],
  },
  {
    id: "cpp",
    name: "C++ Programming",
    icon: "C++",
    color: "bg-purple-500",
    description: "Master C++ with OOP concepts",
    topics: [
      "Classes & Objects",
      "Inheritance",
      "Polymorphism",
      "STL",
      "Templates",
      "Exception Handling",
    ],
    problems: [
      { title: "Basic I/O", difficulty: "Easy", status: "completed" },
      { title: "Class & Objects", difficulty: "Easy", status: "completed" },
      { title: "Inheritance Example", difficulty: "Medium", status: "pending" },
      { title: "STL Vectors", difficulty: "Medium", status: "pending" },
      { title: "Template Functions", difficulty: "Hard", status: "pending" },
      { title: "Virtual Functions", difficulty: "Hard", status: "pending" },
    ],
  },
  {
    id: "python",
    name: "Python Programming",
    icon: "PY",
    color: "bg-yellow-500",
    description: "Learn Python for AI, ML, and Web Development",
    topics: [
      "Python Basics",
      "Data Types",
      "Functions",
      "OOP",
      "NumPy",
      "File Handling",
    ],
    problems: [
      { title: "Print Statements", difficulty: "Easy", status: "completed" },
      { title: "List Operations", difficulty: "Easy", status: "completed" },
      { title: "Dictionary Usage", difficulty: "Easy", status: "pending" },
      { title: "Function Basics", difficulty: "Medium", status: "pending" },
      { title: "Class & Objects", difficulty: "Medium", status: "pending" },
      { title: "File Read/Write", difficulty: "Hard", status: "pending" },
    ],
  },
  {
    id: "java",
    name: "Java Programming",
    icon: "JA",
    color: "bg-red-500",
    description: "Enterprise Java programming",
    topics: [
      "Java Basics",
      "OOP in Java",
      "Collections",
      "Multithreading",
      "JDBC",
      "Spring Framework",
    ],
    problems: [
      { title: "Hello Java", difficulty: "Easy", status: "completed" },
      { title: "Arrays", difficulty: "Easy", status: "completed" },
      { title: "ArrayList", difficulty: "Medium", status: "pending" },
      { title: "HashMap", difficulty: "Medium", status: "pending" },
      { title: "Thread Creation", difficulty: "Hard", status: "pending" },
      { title: "JDBC Connection", difficulty: "Hard", status: "pending" },
    ],
  },
];

export default function ELearning() {
  const [activeLang, setActiveLang] = useState("c");

  // Supabase States
  const [academicYear, setAcademicYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Form Inputs
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const currentLang = programmingLanguages.find((l) => l.id === activeLang);

  // Fetch Materials from Supabase
  const fetchMaterials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("elearning_materials")
      .select("*")
      .eq("academic_year", academicYear)
      .eq("semester", semester)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching materials:", error.message);
    else setMaterials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMaterials();
  }, [academicYear, semester]);

  // Upload File to Supabase Storage & DB
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !subject) return alert("Please fill in all fields!");

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `notes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("materials")
        .getPublicUrl(filePath);

      const fileUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from("elearning_materials")
        .insert([
          {
            academic_year: Number(academicYear),
            semester: Number(semester),
            subject,
            title,
            file_type: fileExt.toUpperCase(),
            file_url: fileUrl,
            uploaded_by: "Faculty",
          },
        ]);

      if (dbError) throw dbError;

      alert("Material uploaded successfully!");
      setTitle("");
      setSubject("");
      setFile(null);
      setShowUploadForm(false);
      fetchMaterials();
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/bg-login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header Section */}
      <section className="bg-gradient-to-br from-black/60 via-black/50 to-black/60 py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-heading font-bold text-white mb-6">
              e<span className="text-blue-300">Learning</span> Portal
            </h1>
            <p className="text-white/80 text-xl">
              Department's online course library — learn at your own pace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Supabase Academic Year & Semester Materials Hub */}
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-16">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
                Academic Study Materials
              </h2>
              <p className="text-white/60 text-sm">
                Access notes, PPTs, and syllabus files by Year and Semester
              </p>
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Upload className="w-4 h-4" />{" "}
              {showUploadForm ? "Close Form" : "Upload Material"}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
            {[1, 2, 3, 4].map((year) => (
              <button
                key={year}
                onClick={() => {
                  setAcademicYear(year);
                  setSemester(year * 2 - 1);
                }}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  academicYear === year
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-white/70 hover:bg-slate-700"
                }`}
              >
                {year}
                {year === 1
                  ? "st"
                  : year === 2
                    ? "nd"
                    : year === 3
                      ? "rd"
                      : "th"}{" "}
                Year
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-6 justify-center md:justify-start">
            {[academicYear * 2 - 1, academicYear * 2].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemester(sem)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                  semester === sem
                    ? "bg-green-600 text-white"
                    : "bg-slate-800 text-white/60 hover:bg-slate-700"
                }`}
              >
                Semester {sem}
              </button>
            ))}
          </div>

          {/* Upload Modal Form */}
          {showUploadForm && (
            <form
              onSubmit={handleUpload}
              className="bg-slate-800/90 p-6 rounded-xl mb-6 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Subject Name (e.g., Operating Systems)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-2.5 rounded bg-slate-900 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Topic / Title (e.g., Unit 2 Lecture Slides)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2.5 rounded bg-slate-900 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="p-2 rounded bg-slate-900 border border-white/10 text-white col-span-1 md:col-span-2 text-sm"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                required
              />
              <button
                type="submit"
                disabled={uploading}
                className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-500 py-2.5 rounded font-bold text-white transition disabled:opacity-50"
              >
                {uploading
                  ? "Uploading to Supabase Storage..."
                  : "Submit Material"}
              </button>
            </form>
          )}

          {/* Materials Display Cards */}
          {loading ? (
            <p className="text-white/50 text-center py-6">
              Loading study materials...
            </p>
          ) : materials.length === 0 ? (
            <div className="text-center py-8 text-white/50">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p>
                No materials uploaded for {academicYear}
                {academicYear === 1
                  ? "st"
                  : academicYear === 2
                    ? "nd"
                    : academicYear === 3
                      ? "rd"
                      : "th"}{" "}
                Year (Sem {semester}) yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/60 p-4 rounded-xl border border-white/10 flex flex-col justify-between hover:border-blue-500/50 transition"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-semibold">
                        {item.file_type}
                      </span>
                      <span className="text-xs text-white/40">
                        {item.uploaded_by || "Faculty"}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/60 mb-3">{item.subject}</p>
                  </div>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 bg-blue-600/80 hover:bg-blue-600 py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download / View
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Programming Practice Section */}
      <section>
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">
            Programming Practice
          </h2>
          <p className="text-white/60 text-center mb-12 text-lg">
            Learn and practice C, C++, Python, and Java
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {programmingLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeLang === lang.id
                    ? `${lang.color} text-white shadow-lg`
                    : "bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800/80 border border-white/10"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              key={`topics-${activeLang}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${currentLang.color} flex items-center justify-center`}
                >
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    {currentLang.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {currentLang.description}
                  </p>
                </div>
              </div>

              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" /> Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentLang.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-800/60 text-white/70 text-sm rounded-lg border border-white/10"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <button
                className={`w-full mt-6 py-3 rounded-lg font-semibold text-white ${currentLang.color} flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
              >
                <Play className="w-4 h-4" /> Start Learning
              </button>
            </motion.div>

            <motion.div
              key={`problems-${activeLang}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-heading font-bold text-white">
                  Practice Problems
                </h3>
              </div>

              <div className="space-y-3">
                {currentLang.problems.map((problem, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {problem.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                      )}
                      <span className="text-white/80">{problem.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          problem.difficulty === "Easy"
                            ? "bg-green-500/50 text-green-200"
                            : problem.difficulty === "Medium"
                              ? "bg-yellow-500/50 text-yellow-200"
                              : "bg-red-500/50 text-red-200"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-blue-300 text-sm font-medium hover:underline">
                View All Problems →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section>
        <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-3">
            Available Courses
          </h2>
          <p className="text-white/60 text-center mb-12 text-lg">
            Created by our expert faculty for students and alumni
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-white/10 group"
              >
                <div className={`h-3 ${course.color}`} />
                <div className="p-6">
                  <span
                    className={`inline-block text-xs ${course.color} text-white px-3 py-1 rounded-full font-medium mb-3`}
                  >
                    {course.tag}
                  </span>
                  <h3 className="text-white font-semibold font-heading mb-2">
                    {course.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    By {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.enrolled}
                    </span>
                  </div>
                  <button
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold text-white ${course.color} opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center gap-2`}
                  >
                    <Play className="w-4 h-4" /> Start Learning
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

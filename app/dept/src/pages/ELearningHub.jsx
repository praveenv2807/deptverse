import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Download, Filter, FileCode } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function ELearningHub() {
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

  // Upload File to Supabase Storage & Database
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
      className="min-h-screen pt-20 pb-12"
      style={{
        backgroundImage: "url(/bg-login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold font-heading text-white tracking-wide">
              Academic E-Learning Repository
            </h1>
            <p className="text-white/60 text-xs mt-0.5">
              Access curriculum syllabus, lecture notes, and department learning
              material.
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3.5 py-2 rounded-lg font-medium flex items-center gap-1.5 transition shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />{" "}
            {showUploadForm ? "Cancel Upload" : "Upload Material"}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg">
          {/* Controls & Filters Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center pb-4 mb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Academic Year:
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setAcademicYear(year);
                      setSemester(year * 2 - 1);
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition ${
                      academicYear === year
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-800 text-white/60 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Semester:
              </span>
              <div className="flex gap-1.5">
                {[academicYear * 2 - 1, academicYear * 2].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setSemester(sem)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                      semester === sem
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-800 text-white/50 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    Sem {sem}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Form Modal */}
          {showUploadForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleUpload}
              className="bg-slate-800/90 p-4 rounded-lg mb-5 border border-blue-500/30 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <input
                type="text"
                placeholder="Subject Name (e.g., Computer Networks)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-2 rounded bg-slate-900 border border-white/10 text-white text-xs placeholder-white/40 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Document Title (e.g., Unit 1 Lecture Notes)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded bg-slate-900 border border-white/10 text-white text-xs placeholder-white/40 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="p-1.5 rounded bg-slate-900 border border-white/10 text-white/80 md:col-span-2 text-xs"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                required
              />
              <button
                type="submit"
                disabled={uploading}
                className="md:col-span-2 bg-emerald-600 hover:bg-emerald-500 py-2 rounded text-xs font-semibold text-white transition disabled:opacity-50"
              >
                {uploading ? "Processing File..." : "Upload Document"}
              </button>
            </motion.form>
          )}

          {/* Content Section */}
          {loading ? (
            <p className="text-white/40 text-xs text-center py-8">
              Fetching materials...
            </p>
          ) : materials.length === 0 ? (
            <div className="text-center py-10 text-white/40">
              <FileCode className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">
                No documents available for Year {academicYear} (Sem {semester}).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {materials.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/50 p-3.5 rounded-lg border border-white/5 hover:border-blue-500/40 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono font-medium">
                        {item.file_type}
                      </span>
                      <span className="text-[11px] text-white/40">
                        By {item.uploaded_by || "Faculty"}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white text-xs mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-white/50 mb-3 line-clamp-1">
                      {item.subject}
                    </p>
                  </div>

                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700/60 hover:bg-blue-600 py-1.5 rounded text-[11px] font-medium text-white/80 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3 h-3" /> View Document
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

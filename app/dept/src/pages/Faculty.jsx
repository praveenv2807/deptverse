import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, BookOpen, Award, ChevronRight } from "lucide-react";
import { faculty } from "../data/data";

const categories = [
  "All",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
];

function FacultyModal({ member, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900/95 backdrop-blur-md w-full max-w-md rounded-xl shadow-lg p-6 md:p-8 relative border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold font-heading text-lg flex-shrink-0">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <h3 className="text-white font-bold font-heading text-base md:text-lg">
                {member.name}
              </h3>
              <p className="text-blue-300 text-xs md:text-sm">
                {member.designation}
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                {member.qualification}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 border border-white/10">
              <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs">Specialization</p>
                <p className="text-white text-xs md:text-sm font-medium">
                  {member.specialization}
                </p>
              </div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 border border-white/10">
              <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs">
                  Experience & Publications
                </p>
                <p className="text-white text-xs md:text-sm font-medium">
                  {member.experience} | {member.publications} Papers
                </p>
              </div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 border border-white/10">
              <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs">Email</p>
                <p className="text-white text-xs md:text-sm font-medium truncate max-w-[220px]">
                  {member.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Faculty() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    active === "All" ? faculty : faculty.filter((f) => f.category === active);

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
      <section className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 border border-white/30">
              Our Team
            </div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-white mb-3">
              Meet Our <span className="text-blue-300">Faculty</span>
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Experienced educators, active researchers, and passionate mentors
              shaping the next generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Faculty List Section */}
      <section className="py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3.5 py-1.5 md:px-5 md:py-2.5 rounded-lg font-medium text-xs md:text-sm transition-all duration-200 ${
                  active === cat
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-slate-900/80 backdrop-blur-md text-white/80 hover:text-white hover:bg-slate-800/80 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filtered.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(member)}
                className="bg-slate-900/85 backdrop-blur-md rounded-xl p-4 sm:p-6 cursor-pointer hover:bg-slate-800/90 transition-all border border-white/10 group"
              >
                {/* Header: Avatar + Name + Designation */}
                <div className="flex items-center justify-between sm:justify-start sm:gap-4 mb-0 sm:mb-4">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold font-heading text-sm sm:text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold font-heading text-sm sm:text-base truncate group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-300/90 text-xs truncate">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Only: Chevron Arrow Indicator */}
                  <div className="sm:hidden flex items-center text-white/40 group-hover:text-blue-300 transition-colors pl-2 flex-shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Desktop Only Details (Hidden on Mobile < sm) */}
                <div className="hidden sm:block space-y-2 text-sm">
                  <p className="text-white/50">
                    <span className="text-white/70">Qual:</span>{" "}
                    {member.qualification}
                  </p>
                  <p className="text-white/50">
                    <span className="text-white/70">Specialization:</span>{" "}
                    {member.specialization}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-white/40 text-xs">
                      {member.experience}
                    </span>
                    <span className="text-blue-300 text-xs font-medium">
                      {member.publications} Publications
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for full details */}
      {selected && (
        <FacultyModal member={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

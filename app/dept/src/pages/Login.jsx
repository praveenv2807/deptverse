import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

const API_URL = "/api";

const roles = [
  {
    id: "student",
    label: "Student",
    icon: "ST",
    path: "/portal/student",
    color: "bg-blue-500",
    desc: "Access attendance, timetable & results",
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: "FC",
    path: "/portal/faculty",
    color: "bg-green-500",
    desc: "Manage classes & mark attendance",
  },
  {
    id: "admin",
    label: "Admin",
    icon: "AD",
    path: "/portal/admin",
    color: "bg-purple-500",
    desc: "Department-wide administration",
  },
];

export default function Login() {
  const [role, setRole] = useState("student");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const selectedRole = roles.find((r) => r.id === role);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.id,
          password: form.password,
          role: role,
        }),
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        console.error("Failed to parse response JSON:", text);
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status})`);
      }

      // Successfully authenticated
      login(data.user, data.access_token);
      navigate(selectedRole.path);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Connection error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url(/bg-login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">
            ERP <span className="text-blue-300">Portal</span>
          </h1>
          <p className="text-white/70 text-sm mt-1">
            CSE Department ERP System
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/10">
          {/* Role Selector */}
          <p className="text-white/70 text-sm font-medium mb-3">
            Select your role
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  role === r.id
                    ? `${r.color} text-white shadow-md border-transparent`
                    : "border-white/20 hover:border-white/30 hover:bg-white/5 text-white/70"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${role === r.id ? "bg-white/20" : "bg-white/10"} flex items-center justify-center mx-auto mb-1 text-xs font-bold`}
                >
                  {r.icon}
                </div>
                <p className="text-sm font-semibold">{r.label}</p>
              </button>
            ))}
          </div>
          <p className="text-white/50 text-xs mb-6 text-center">
            {selectedRole.desc}
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="text-white/70 text-sm mb-2 block">
                {role === "student"
                  ? "College Email (@ksrce.ac.in) or Reg No"
                  : role === "faculty"
                    ? "Employee ID"
                    : "Admin ID"}
              </label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                placeholder={
                  role === "student"
                    ? "e.g. xyzcse24_27@ksrce.ac.in"
                    : role === "faculty"
                      ? "e.g. faculty@ksrce.ac.in"
                      : "e.g. admin1"
                }
                className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-white/30 bg-slate-800/60"
                />{" "}
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white ${selectedRole.color} hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  Login to {selectedRole.label} Portal{" "}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-white/50 text-xs mt-6">
            Having trouble? Contact{" "}
            <a
              href="mailto:cse@ksrce.ac.in"
              className="text-blue-400 hover:underline"
            >
              cse@ksrce.ac.in
            </a>
          </p>
        </div>

        {/* Back Link */}
        <p className="text-center text-white/80 text-sm mt-6">
          <a href="/" className="hover:text-white transition-colors">
            ← Back to Department Website
          </a>
        </p>
      </motion.div>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import { Building2, Clock } from "lucide-react";

function ODRequest() {
  const { odRequests, addOdRequest, updateOdStatus, showPopup } =
    useContext(RequestContext);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    session: "Full Day",
    purpose: "",
    facultyName: "",
  });
  const [loading, setLoading] = useState(false);

  // Check if current user is Admin or Faculty
  const isApprover = user?.role === "admin" || user?.role === "faculty";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.purpose) {
      showPopup("Please fill all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      await addOdRequest({
        rollNo: user?.username || "2021CS001",
        name: user?.name || user?.username || "Student",
        date: formData.date,
        session: formData.session,
        purpose: formData.purpose,
        facultyName: formData.facultyName || "Dr. Meenakshi Sundaram",
      });

      setFormData({
        date: "",
        session: "Full Day",
        purpose: "",
        facultyName: "",
      });
    } catch (err) {
      console.error("OD request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🏛️ ADMIN / FACULTY VIEW: Approvals List
  if (isApprover) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">
                Student OD Approvals
              </h2>
              <p className="text-slate-400 text-sm">
                Review and manage pending On-Duty (OD) requests
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/60 text-slate-400 text-xs uppercase">
                  <th className="p-3">Student</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Session</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Faculty Incharge</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {odRequests && odRequests.length > 0 ? (
                  odRequests.map((req, idx) => (
                    <tr
                      key={req.id || idx}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-3 font-medium">
                        <div>{req.name}</div>
                        <div className="text-xs text-slate-400">
                          {req.rollNo}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-slate-300">
                        {req.date || req.fromDate}
                      </td>
                      <td className="p-3 text-sm">
                        {req.session || "Full Day"}
                      </td>
                      <td className="p-3 text-sm text-slate-300">
                        {req.purpose || req.reason}
                      </td>
                      <td className="p-3 text-sm text-slate-400">
                        {req.facultyName || "Dr. Meenakshi Sundaram"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                            req.status === "Approved"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : req.status === "Rejected"
                                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {req.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() =>
                            updateOdStatus &&
                            updateOdStatus(req.id, { status: "Approved" })
                          }
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateOdStatus &&
                            updateOdStatus(req.id, { status: "Rejected" })
                          }
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold transition-colors"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-slate-400">
                      No pending OD requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 🎓 STUDENT VIEW: Application Form
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Apply For Student OD
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Session</label>
            <select
              name="session"
              value={formData.session}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="Full Day">Full Day</option>
              <option value="Forenoon">Forenoon</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Purpose</label>
            <textarea
              name="purpose"
              placeholder="Enter purpose of OD (e.g., Symposium, Sports, Workshop)"
              value={formData.purpose}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">
              Faculty Incharge (Optional)
            </label>
            <input
              type="text"
              name="facultyName"
              placeholder="Enter faculty name"
              value={formData.facultyName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit OD Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ODRequest;

import React, { useContext, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import { Building2 } from "lucide-react";

function ODRequest() {

  const { addOdRequest, showPopup } = useContext(RequestContext);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    session: "Full Day",
    purpose: "",
    facultyName: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        rollNo: user?.username || '2021CS001',
        name: user?.name || user?.username || 'Student',
        date: formData.date,
        session: formData.session,
        purpose: formData.purpose,
        facultyName: formData.facultyName || 'Dr. Meenakshi Sundaram'
      });
      setFormData({
        date: "",
        session: "Full Day",
        purpose: "",
        facultyName: ""
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Student OD Request
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
              placeholder="Enter purpose of OD"
              value={formData.purpose}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Faculty Incharge (Optional)</label>
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
            {loading ? 'Submitting...' : 'Submit OD Request'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ODRequest;

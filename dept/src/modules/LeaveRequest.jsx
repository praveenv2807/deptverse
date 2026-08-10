import React, { useContext, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import { FileText } from "lucide-react";

function LeaveRequest() {

  const { addLeaveRequest, showPopup } = useContext(RequestContext);
  const { user } = useAuth();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate) {
      showPopup("Please fill all fields", "error");
      return;
    }

    setLoading(true);
    try {
      await addLeaveRequest({
        rollNo: user?.username || '2021CS001',
        name: user?.name || user?.username || 'Student',
        type: leaveType,
        fromDate,
        toDate,
        reason: reason || `${leaveType} leave`
      });
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Student Leave Request
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-white/70 text-sm mb-2 block">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
            >
              <option value="">Select Leave Type</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 text-sm mb-2 block">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-2 block">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Reason (Optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              rows="2"
              className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Leave Request'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default LeaveRequest;

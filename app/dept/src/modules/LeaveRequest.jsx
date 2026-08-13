import React, { useContext, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

function LeaveRequest() {
  const { leaveRequests, addLeaveRequest, updateLeaveStatus, showPopup } =
    useContext(RequestContext);
  const { user } = useAuth();

  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if current user is an Admin or Faculty
  const isApprover = user?.role === "admin" || user?.role === "faculty";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate) {
      showPopup("Please fill all fields", "error");
      return;
    }

    setLoading(true);
    try {
      await addLeaveRequest({
        rollNo: user?.username || "2021CS001",
        name: user?.name || user?.username || "Student",
        type: leaveType,
        fromDate,
        toDate,
        reason: reason || `${leaveType} leave`,
      });
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
    } finally {
      setLoading(false);
    }
  };

  // 🏛️ ADMIN / FACULTY VIEW: Approvals Dashboard
  if (isApprover) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">
                Student Leave Approvals
              </h2>
              <p className="text-slate-400 text-sm">
                Review and manage pending student leave requests
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/60 text-slate-400 text-xs uppercase">
                  <th className="p-3">Student</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests && leaveRequests.length > 0 ? (
                  leaveRequests.map((req, idx) => (
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
                      <td className="p-3 text-sm">{req.type}</td>
                      <td className="p-3 text-xs text-slate-300">
                        {req.fromDate} to {req.toDate}
                      </td>
                      <td className="p-3 text-sm text-slate-300">
                        {req.reason}
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
                            updateLeaveStatus &&
                            updateLeaveStatus(req.id, "Approved")
                          }
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateLeaveStatus &&
                            updateLeaveStatus(req.id, "Rejected")
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
                    <td colSpan="6" className="text-center p-6 text-slate-400">
                      No pending leave requests found.
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
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Apply For Student Leave
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-2 block">
              Leave Type
            </label>
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
              <label className="text-white/70 text-sm mb-2 block">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-2 block">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">
              Reason (Optional)
            </label>
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
            {loading ? "Submitting..." : "Submit Leave Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeaveRequest;

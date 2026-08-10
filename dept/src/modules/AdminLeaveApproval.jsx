import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import RequestTimeline from "../components/RequestTimeline";
import { CheckCircle2, XCircle } from "lucide-react";

function AdminLeaveApproval() {

  const { leaveRequests, fetchLeaveRequests, updateLeaveStatus, loading } = useContext(RequestContext);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  const pendingRequests = leaveRequests.filter(req => req.status === 'faculty_approved');

  const handleApprove = async (req) => {
    setActionLoading(req.id);
    try {
      await updateLeaveStatus(req.id, { status: 'approved', approvedBy: 'Admin' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (req) => {
    setActionLoading(req.id);
    try {
      await updateLeaveStatus(req.id, { status: 'rejected', approvedBy: 'Admin' });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-white">
          Faculty Leave Approvals
        </h2>
      </div>

      {loading && (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10 text-center">
          <p className="text-white/50">Loading requests...</p>
        </div>
      )}

      {!loading && pendingRequests.length === 0 && (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <p className="text-white/50">No faculty leave requests pending approval.</p>
        </div>
      )}

      {pendingRequests.map((req) => (
          <div key={req.id} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Leave - {req.name}</h3>
              <span className={`px
              
              
              
              
              
              -3 py-1 rounded-full text-xs font-medium ${
                req.status === "approved" ? "bg-green-500/20 text-green-400" :
                req.status === "rejected" ? "bg-red-500/20 text-red-400" :
                req.status === "faculty_approved" ? "bg-blue-500/20 text-blue-400" :
                "bg-yellow-500/20 text-yellow-400"
              }`}>
                {req.status === 'faculty_approved' ? 'Faculty Approved' : req.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-white/70"><span className="text-white/40">Faculty:</span> {req.name}</p>
              <p className="text-white/70"><span className="text-white/40">From:</span> {req.fromDate}</p>
              <p className="text-white/70"><span className="text-white/40">To:</span> {req.toDate}</p>
              <p className="text-white/70"><span className="text-white/40">Reason:</span> {req.reason}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <RequestTimeline timeline={req.timeline} />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleApprove(req)}
                disabled={actionLoading === req.id}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>

              <button
                onClick={() => handleReject(req)}
                disabled={actionLoading === req.id}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
      ))}
    </div>
  );
}

export default AdminLeaveApproval;

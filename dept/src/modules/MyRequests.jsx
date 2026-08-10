import React, { useContext, useEffect, useCallback } from "react";
import { RequestContext } from "../context/RequestContext";
import { useAuth } from "../context/AuthContext";
import RequestTimeline from "../components/RequestTimeline";
import { ClipboardList, RefreshCw } from "lucide-react";

function MyRequests({ role }) {

  const { leaveRequests, odRequests, fetchLeaveRequests, fetchOdRequests, loading } = useContext(RequestContext);
  const { user } = useAuth();

  const loadRequests = useCallback(() => {
    const rollNo = user?.username;
    if (rollNo) {
      fetchLeaveRequests(rollNo);
      fetchOdRequests(rollNo);
    }
  }, [user, fetchLeaveRequests, fetchOdRequests]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    const handleFocus = () => {
      loadRequests();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadRequests]);

  const combinedRequests = [
    ...leaveRequests.map(req => ({ ...req, requestType: 'leave' })),
    ...odRequests.map(req => ({ ...req, requestType: 'od' }))
  ].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            My Requests
          </h2>
        </div>
        <button 
          onClick={loadRequests}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-colors text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10 text-center">
          <p className="text-white/50">Loading requests...</p>
        </div>
      )}

      {!loading && combinedRequests.length === 0 && (
        <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <p className="text-white/50">No requests submitted yet.</p>
        </div>
      )}

      {!loading && combinedRequests.map((req) => (
        <div key={`${req.requestType}-${req.id}`} className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">
              {req.requestType === 'od' ? 'OD Request' : `Leave (${req.type || 'Leave'})`}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              req.status === "approved" ? "bg-green-500/20 text-green-400" :
              req.status === "rejected" ? "bg-red-500/20 text-red-400" :
              req.status === "faculty_approved" ? "bg-blue-500/20 text-blue-400" :
              "bg-yellow-500/20 text-yellow-400"
            }`}>
              {req.status === 'faculty_approved' ? 'Faculty Approved' : req.status}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            {req.requestType === 'od' ? (
              <>
                <p className="text-white/70"><span className="text-white/40">Date:</span> {req.date}</p>
                <p className="text-white/70"><span className="text-white/40">Session:</span> {req.session}</p>
                <p className="text-white/70"><span className="text-white/40">Purpose:</span> {req.purpose}</p>
              </>
            ) : (
              <>
                <p className="text-white/70"><span className="text-white/40">From:</span> {req.fromDate}</p>
                <p className="text-white/70"><span className="text-white/40">To:</span> {req.toDate}</p>
                <p className="text-white/70"><span className="text-white/40">Reason:</span> {req.reason}</p>
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <RequestTimeline timeline={req.timeline} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyRequests;

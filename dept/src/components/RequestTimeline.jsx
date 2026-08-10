import React from "react";

function RequestTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-white/40 text-xs uppercase tracking-wide">Timeline</p>
      <div className="space-y-2">
        {timeline.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${
              step.status === "Approved" ? "bg-green-400" :
              step.status === "Rejected" ? "bg-red-400" :
              "bg-yellow-400"
            }`} />
            <span className="text-white/70 text-sm">{step.status}</span>
            <span className="text-white/40 text-xs">{step.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestTimeline;

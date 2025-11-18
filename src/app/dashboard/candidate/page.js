"use client";

import { useState, useEffect } from "react";

export default function CandidateDashboard() {
  // Redirect if not signed in (no token)
  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!t) {
      window.location.href = "/signin";
    }
  }, []);

  // File upload, API status, and states for preview/ranking and jobs list
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Jobs from backend and selected job description
  const [jobs, setJobs] = useState([]);
  const [selectedJobDesc, setSelectedJobDesc] = useState("");

  // Preview and score states + resume id from upload
  const [resumeId, setResumeId] = useState("");
  const [preview, setPreview] = useState("");
  const [score, setScore] = useState(null);

  // Helper: Authorization header
  function authHeaders() {
    if (typeof window === "undefined") return {};
    const t = localStorage.getItem("token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  }

  // Fetch jobs from backend on mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
          headers: { ...authHeaders() },
        });
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (e) {
        setMsg(e.message);
      }
    }
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Upload file and save returned resumeId
  async function handleUpload() {
    setMsg("");
    if (!file) {
      setMsg("Please choose a file first.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("job_id", "J-1021");
      fd.append("candidate_name", "Demo Candidate");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes/upload`, {
        method: "POST",
        headers: { ...authHeaders() }, // do not set Content-Type for FormData
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Upload failed");

      setMsg(`Uploaded ${data.filename} (${data.size_kb} KB). Saved as ${data.stored_as || data.stored_as}.`);
      setResumeId(data.resume_id || "");

      // Clear previous preview and score
      setPreview("");
      setScore(null);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch extracted text and rank score
  async function handlePreview() {
    setMsg("");
    setPreview("");
    setScore(null);
    if (!resumeId) {
      setMsg("Please upload a resume first.");
      return;
    }
    try {
      // 1) Get extracted resume text
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes/${resumeId}`, {
        headers: { ...authHeaders() },
      });
      const meta = await res.json();
      if (!res.ok) throw new Error(meta.detail || "Could not fetch resume text");
      const text = meta.extracted_text || "";
      setPreview(text.slice(0, 800)); // show first 800 chars

      // 2) Rank using selected job description (fallback if empty)
      const jd =
        selectedJobDesc ||
        "React Next.js frontend developer with API integration experience";
      const rres = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rank`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ resume_text: text, job_description: jd }),
      });
      const rdata = await rres.json();
      if (rres.ok) setScore(rdata.score);
    } catch (e) {
      setMsg(e.message);
    }
  }

  // Safely pick fields from a job object with fallbacks
  function jobTitle(j) {
    return j?.title || j?.role || "Untitled role";
  }
  function jobCompany(j) {
    return j?.company || j?.org || "Company";
  }
  function jobLocation(j) {
    return j?.location || "Location";
  }
  function jobTags(j) {
    return Array.isArray(j?.tags) ? j.tags : [];
  }
  function jobDescription(j) {
    return j?.description || j?.desc || j?.details || "";
  }
  function jobId(j) {
    // value used in <option> and selection; fallback to title if id missing
    return String(j?.id ?? j?.title ?? Math.random());
  }

  return (
    <div className="space-y-6">
      {/* Profile hint */}
      <div className="rounded-xl border bg-indigo-50/40 p-4">
        <div className="text-sm">
          Complete profile to improve match quality. Upload a recent resume and add key skills.
        </div>
      </div>

      {/* Job selection dropdown */}
      <div className="mb-4">
        <label htmlFor="job-select" className="block text-sm font-medium text-gray-700">
          Select job to rank against:
        </label>
        <select
          id="job-select"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => {
            const selectedId = e.target.value;
            const job = jobs.find((x) => String(jobId(x)) === String(selectedId));
            setSelectedJobDesc(job ? jobDescription(job) : "");
          }}
        >
          <option value="">-- Select a job --</option>
          {jobs.map((job) => (
            <option key={jobId(job)} value={jobId(job)}>
              {jobTitle(job)} - {jobLocation(job)}
            </option>
          ))}
        </select>
      </div>

      {/* Upload resume */}
      <Section title="Upload resume">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="text-sm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Parse & preview
          </button>
        </div>
        {msg && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            {msg}
          </div>
        )}
        {preview && (
          <div className="mt-3 rounded-lg border bg-white p-3 text-sm text-gray-800 max-h-64 overflow-auto whitespace-pre-wrap">
            {preview}
          </div>
        )}
        {typeof score === "number" && (
          <div className="mt-2 text-sm text-gray-700">Mock score: {score}%</div>
        )}
      </Section>

      {/* Recommended jobs */}
      <Section title="Recommended jobs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div key={jobId(j)} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="font-semibold">{jobTitle(j)}</div>
              <div className="text-sm text-gray-600">
                {jobCompany(j)} • {jobLocation(j)}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {jobTags(j).map((t) => (
                  <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
                  Apply
                </button>
                <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* My applications */}
      <Section title="My applications">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>Job</Th>
                <Th>Company</Th>
                <Th>Status</Th>
                <Th>Applied</Th>
              </tr>
            </thead>
            <tbody>
              {[
                { job: "Frontend Engineer", company: "Acme Corp", status: "Under review", applied: "2d ago" },
                { job: "Data Analyst", company: "Northwind", status: "Assessment", applied: "5d ago" },
              ].map((a, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <Td className="font-medium">{a.job}</Td>
                  <Td>{a.company}</Td>
                  <Td><StatusBadge value={a.status} /></Td>
                  <Td>{a.applied}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Th({ children }) {
  return <th className="text-left font-medium px-4 py-3">{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function StatusBadge({ value }) {
  const styles = {
    "Under review": "bg-yellow-50 text-yellow-700",
    Assessment: "bg-blue-50 text-blue-700",
    Interview: "bg-indigo-50 text-indigo-700",
    Rejected: "bg-red-50 text-red-700",
  }[value] || "bg-gray-100 text-gray-700";
  return <span className={`text-xs rounded-full px-2 py-0.5 ${styles}`}>{value}</span>;
}

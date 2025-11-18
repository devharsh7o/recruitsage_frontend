"use client";
import React, { useEffect, useState } from "react";
import { getJobs, createJob, updateJob, deleteJob } from "../../../utils/api";

export default function HRDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", location: "", description: "" });

  // Replace with actual metrics from backend later
  const kpiValues = {
    active: jobs.filter(j => j.status === "Open").length,
    totalApplicants: jobs.reduce((sum, j) => sum + (j.applicants || 0), 0),
    shortlisted: 12,
  };

  // Load jobs from backend when page mounts
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(() => alert("Failed to load jobs"));
  }, []);

  // Create job
  async function handleCreate(e) {
    e.preventDefault();
    try {
      const res = await createJob({ ...form });
      setJobs(prev => [...prev, res.job]);
      setForm({ title: "", location: "", description: "" });
    } catch (err) {
      alert("Error creating job");
    }
  }

  // Delete job
  async function handleDelete(id) {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      alert("Error deleting job");
    }
  }

  // Edit job
  function handleEditStart(job) {
    setEditId(job.id);
    setEditForm({
      title: job.title || "",
      location: job.location || "",
      description: job.description || "",
    });
  }
  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateJob(editId, editForm);
      setJobs(prev => prev.map(job => (job.id === editId ? res : job)));
      setEditId(null);
    } catch (err) {
      alert("Error updating job");
    }
  }

  // Mocked ranked candidates
  const ranked = [
    { name: "Aarav Shah", score: 87, match: "React, TS, Next.js", stage: "Shortlisted" },
    { name: "Isha Verma", score: 82, match: "SQL, Tableau, Python", stage: "Interviewing" },
    { name: "Rahul Mehta", score: 78, match: "FastAPI, Docker, AWS", stage: "Screening" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <KPI title="Active jobs" value={kpiValues.active} />
        <KPI title="Total applicants" value={kpiValues.totalApplicants} />
        <KPI title="Shortlisted" value={kpiValues.shortlisted} />
      </div>

      {/* Quick create */}
      <Section title="Post a new job">
        <form onSubmit={handleCreate}>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="rounded-lg border px-3 py-2"
              placeholder="Job title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="rounded-lg border px-3 py-2"
              placeholder="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              required
            />
            <textarea
              className="rounded-lg border px-3 py-2 sm:col-span-2"
              rows={4}
              placeholder="Job description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create job
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              onClick={() => setForm({ title: "", location: "", description: "" })}
            >
              Save draft
            </button>
          </div>
        </form>
      </Section>

      {/* Jobs table */}
      <Section title="Your job postings">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>ID</Th>
                <Th>Role</Th>
                <Th>Location</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job =>
                editId === job.id ? (
                  <tr key={job.id} className="border-t bg-yellow-50">
                    <Td>{job.id}</Td>
                    <Td>
                      <form onSubmit={handleEditSubmit} className="flex flex-col gap-1">
                        <input
                          value={editForm.title}
                          onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                          className="border px-2 py-1 rounded"
                        />
                        <input
                          value={editForm.location}
                          onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                          className="border px-2 py-1 rounded"
                        />
                        <textarea
                          value={editForm.description}
                          onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                          rows={2}
                          className="border px-2 py-1 rounded"
                        />
                        <div className="mt-2 flex gap-2">
                          <button type="submit" className="bg-indigo-600 text-white px-2 py-1 rounded">
                            Save
                          </button>
                          <button type="button" className="border px-2 py-1 rounded" onClick={() => setEditId(null)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </Td>
                    <Td>{editForm.location}</Td>
                    <Td><Badge kind={job.status} /></Td>
                    <Td></Td>
                  </tr>
                ) : (
                  <tr key={job.id} className="border-t hover:bg-gray-50">
                    <Td>{job.id}</Td>
                    <Td className="font-medium">{job.title}</Td>
                    <Td>{job.location}</Td>
                    <Td><Badge kind={job.status} /></Td>
                    <Td>
                      <button
                        className="text-blue-600 underline mr-2"
                        onClick={() => handleEditStart(job)}
                      >Edit</button>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(job.id)}
                      >Delete</button>
                    </Td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Ranked candidates / static for now */}
      <Section title="Top candidates (recent)">
        <div className="grid gap-4 sm:grid-cols-3">
          {ranked.map(c => (
            <div key={c.name} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{c.name}</div>
                <span className="text-xs rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5">{c.score}%</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">{c.match}</div>
              <div className="mt-3">
                <span className="text-xs rounded-full bg-green-50 text-green-700 px-2 py-0.5">{c.stage}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">View resume</button>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Message</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// Helper UI components (unchanged)
function KPI({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
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

function Badge({ kind }) {
  const styles = {
    Open: "bg-green-50 text-green-700",
    Screening: "bg-yellow-50 text-yellow-700",
    Closed: "bg-gray-100 text-gray-700",
  }[kind] || "bg-gray-100 text-gray-700";
  return <span className={`text-xs rounded-full px-2 py-0.5 ${styles}`}>{kind}</span>;
}

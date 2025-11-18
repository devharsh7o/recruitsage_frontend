// src/utils/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getJobs() {
  return authFetch("/jobs/jobs");
}
export async function createJob(data) {
  return authFetch("/jobs/jobs", { method: "POST", body: JSON.stringify(data) });
}
export async function updateJob(id, data) {
  return authFetch(`/jobs/jobs/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}
export async function deleteJob(id) {
  return authFetch(`/jobs/jobs/${id}`, { method: "DELETE" });
}

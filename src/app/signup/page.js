"use client";

import { useState } from "react";

const roles = [
  { key: "hr", label: "HR / Recruiter", desc: "Post jobs, manage resumes, and contact candidates." },
  { key: "candidate", label: "Candidate", desc: "Find roles, upload resumes, and track applications." },
];

export default function SignUp() {
  const [role, setRole] = useState("hr");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Sign up failed");
      alert(`Account created for ${data.email} as ${data.role}`);
      // TODO: redirect to /signin or auto signin
      // window.location.href = "/signin";
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  function signUpWithGoogle() {
    window.alert(`Redirecting to Google OAuth as ${role}…`);
    // Later: window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?role=${role}`;
  }

  function signUpWithLinkedIn() {
    window.alert(`Redirecting to LinkedIn OAuth as ${role}…`);
    // Later: window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin?role=${role}`;
  }

  return (
    <div className="min-h-[80vh] bg-white">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-2 text-gray-600 text-sm">Choose your role and complete your profile to begin.</p>

        {/* Social auth */}
        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={signUpWithGoogle}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border bg-white py-2.5 hover:bg-gray-50"
          >
            {/* Google SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611 20.083h-1.611v-.083H24v8h11.303c-1.648 4.651-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.4 16.124 18.842 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.738 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.155 0 9.93-1.976 13.513-5.197l-6.243-5.283C29.094 35.824 26.68 36.8 24 36.8c-5.208 0-9.62-3.321-11.275-7.946l-6.535 5.033C9.56 39.548 16.303 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.247 4.166-3.99 5.52l.003.002 6.243 5.283C39.201 36.907 44 31.5 44 24c0-1.341-.138-2.651-.389-3.917z"/>
            </svg>
            <span className="text-sm">Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={signUpWithLinkedIn}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border bg-white py-2.5 hover:bg-gray-50"
          >
            {/* LinkedIn SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5" fill="#0A66C2">
              <path d="M218.123 0H37.877C16.955 0 0 16.955 0 37.877v180.246C0 239.045 16.955 256 37.877 256h180.246C239.045 256 256 239.045 256 218.123V37.877C256 16.955 239.045 0 218.123 0zM79.681 211.59H46.539V98.783h33.142V211.59zM63.086 83.113h-.221c-11.121 0-18.32-7.652-18.32-17.216 0-9.787 7.42-17.217 18.762-17.217 11.342 0 18.319 7.43 18.54 17.217 0 9.564-7.198 17.216-18.761 17.216zM211.59 211.59h-33.142v-60.34c0-15.161-5.427-25.515-18.982-25.515-10.36 0-16.513 6.968-19.209 13.699-.99 2.411-1.261 5.778-1.261 9.145v63.011H106.79s.441-102.267 0-112.807h33.142v15.979c4.405-6.797 12.284-16.487 29.848-16.487 21.801 0 41.81 14.233 41.81 44.805v68.51z"/>
            </svg>
            <span className="text-sm">Continue with LinkedIn</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {err && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

        {/* Role selection */}
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={`rounded-xl border bg-white p-4 text-left hover:shadow-sm transition ${
                role === r.key ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="font-semibold">{r.label}</div>
              <div className="text-sm text-gray-600 mt-1">{r.desc}</div>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Jane Doe"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@company.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 text-white py-2.5 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <a href="/signin" className="text-indigo-600 hover:underline">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

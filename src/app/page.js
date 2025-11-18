export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth">
      {/* Skip link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:border focus:rounded px-3 py-1">
        Skip to content
      </a>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight">RecruitSage</a>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-gray-700">Features</a>
            <a href="#how-it-works" className="hover:text-gray-700">How it works</a>
            <a href="#technology" className="hover:text-gray-700">Technology</a>
          </div>

          <div className="flex items-center gap-3">
            {/* updated routes */}
            <a href="/signin" className="px-4 py-2 rounded-lg border hover:bg-gray-50">Sign in</a>
            <a href="/signup" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Get started</a>
            {/* temporary testing link to dashboards */}
            <a href="/dashboard" className="hidden sm:inline-block px-4 py-2 rounded-lg border hover:bg-gray-50">
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
              New • Transparent AI screening
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              AI resume screening that is clear, fair, and fast
            </h1>
            <p className="mt-4 text-gray-600 leading-7">
              RecruitSage ranks candidates against job descriptions with explainable scores and keyword highlights—so every decision is trusted and auditable.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="/signup" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Start free
              </a>
              <a href="#how-it-works" className="px-5 py-3 rounded-lg border hover:bg-gray-50">
                See how it works
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-indigo-50 to-transparent pointer-events-none" />
      </header>

      {/* Main content anchor */}
      <main id="main">
        {/* Features */}
        <section id="features" className="py-16 sm:py-20 bg-indigo-50/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Why choose RecruitSage</h2>
            <p className="mt-2 text-gray-600">Professional-grade screening with human-centered explanations.</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard title="Transparent by design" desc="Every score comes with keyword matches and weighting so reviewers understand why." />
              <FeatureCard title="Lightning fast" desc="Screen hundreds of resumes in seconds with accurate ranking." />
              <FeatureCard title="Role-based access" desc="HR manages postings; candidates apply, upload resumes, and contact HR securely." />
              <FeatureCard title="Secure & compliant" desc="Email verification, password rules, and OAuth (Google, LinkedIn) ready." />
              <FeatureCard title="Modern dashboards" desc="Clean, minimal UI for HR and candidates with focused actions." />
              <FeatureCard title="Scalable APIs" desc="FastAPI backend with clear contracts for jobs, resumes, and messaging." />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-2 text-gray-600">A simple flow from upload to decision.</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <Step
                step="1"
                title="Upload & classify"
                desc="Add job description and resumes. NLP preprocessing and SVM classify by role."
              />
              <Step
                step="2"
                title="Rank & score"
                desc="TF‑IDF + cosine similarity compute match scores with consistent weighting."
              />
              <Step
                step="3"
                title="Explain & decide"
                desc="See matched keywords, strengths, and gaps to make unbiased, auditable decisions."
              />
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Powered by modern tech</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <TechCard title="Frontend" items={["Next.js", "Tailwind CSS", "ShadCN UI"]} />
              <TechCard title="Backend" items={["FastAPI", "Python", "Uvicorn"]} />
              <TechCard title="Models" items={["Linear SVM", "TF‑IDF", "Cosine Similarity"]} />
              <TechCard title="Auth & Data" items={["OAuth (Google/LinkedIn)", "Email/Password", "MongoDB"]} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} RecruitSage. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-gray-800">Features</a>
            <a href="#how-it-works" className="hover:text-gray-800">How it works</a>
            <a href="#technology" className="hover:text-gray-800">Technology</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Reusable components */
function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ step, title, desc }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">{step}</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function TechCard({ title, items }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        {items.map((it) => (
          <li key={it}>• {it}</li>
        ))}
      </ul>
    </div>
  );
}

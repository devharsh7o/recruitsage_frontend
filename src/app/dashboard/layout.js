export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <header className="flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight">RecruitSage</a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/dashboard" className="hover:text-gray-700">Overview</a>
            <a href="/dashboard/hr" className="hover:text-gray-700">HR</a>
            <a href="/dashboard/candidate" className="hover:text-gray-700">Candidate</a>
          </nav>
        </header>
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}

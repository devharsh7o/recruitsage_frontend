export default function DashboardHome() {
  const items = [
    { title: "Jobs posted", value: 3, note: "1 draft pending" },
    { title: "Resumes received", value: 113, note: "12 today" },
    { title: "Shortlisted", value: 12, note: "4 interviews this week" },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map(i => (
        <div key={i.title} className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-600">{i.title}</div>
          <div className="mt-2 text-2xl font-semibold">{i.value}</div>
          <div className="mt-1 text-xs text-gray-500">{i.note}</div>
        </div>
      ))}
    </div>
  );
}

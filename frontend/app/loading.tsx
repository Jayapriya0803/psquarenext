export default function Loading() {
  return (
    <main className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[500px] bg-gray-300 w-full"></div>

      {/* Section */}
      <div className="max-w-6xl mx-auto p-10 space-y-6">
        <div className="h-10 bg-gray-300 w-1/2 rounded"></div>
        <div className="h-6 bg-gray-300 w-full rounded"></div>
        <div className="h-6 bg-gray-300 w-5/6 rounded"></div>
        <div className="h-6 bg-gray-300 w-4/6 rounded"></div>
      </div>
    </main>
  );
}

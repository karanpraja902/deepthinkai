export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading DeepThink...</p>
      </div>
    </div>
  );
}


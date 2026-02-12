"use client";

export default function Skeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 space-y-5 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <div className="w-28 h-6 bg-gray-200 rounded-lg" />
        </div>
        <div className="w-32 h-7 bg-gray-200 rounded-full" />
      </div>

      {/* Summary block */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-2">
        <div className="w-20 h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
      </div>

      {/* Urgency block */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-2">
        <div className="w-32 h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-2/3 h-4 bg-gray-200 rounded" />
      </div>

      {/* Next steps block */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-2">
        <div className="w-52 h-4 bg-gray-200 rounded" />
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
        <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

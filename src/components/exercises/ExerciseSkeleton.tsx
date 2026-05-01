export function ExerciseSkeleton() {
  return (
    <div className="bg-[#141414] rounded-2xl p-4 border border-white/5 animate-pulse">
      <div className="h-6 bg-white/10 rounded-md w-2/3 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-white/10 rounded-md w-16"></div>
        <div className="h-6 bg-white/10 rounded-md w-20"></div>
        <div className="h-6 bg-white/10 rounded-md w-24"></div>
      </div>
    </div>
  );
}

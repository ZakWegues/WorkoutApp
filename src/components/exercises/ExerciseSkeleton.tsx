export function ExerciseSkeleton() {
  return (
    <div className="bg-zinc-900/40 rounded-[32px] p-6 border border-white/5 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2 w-full">
          <div className="h-7 bg-white/5 rounded-lg w-3/4"></div>
          <div className="h-3 bg-white/5 rounded-lg w-1/4"></div>
        </div>
        <div className="h-10 w-10 bg-white/5 rounded-2xl"></div>
      </div>
      <div className="flex gap-2 mb-8">
        <div className="h-7 bg-white/5 rounded-xl w-24"></div>
        <div className="h-7 bg-white/5 rounded-xl w-20"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-24 bg-white/5 rounded-full"></div>
        <div className="h-4 w-16 bg-white/5 rounded-full"></div>
      </div>
    </div>
  );
}

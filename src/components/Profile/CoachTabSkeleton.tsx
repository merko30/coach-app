const CoachTabSkeleton = () => (
  <div className="w-full flex gap-8">
    <div className="w-full md:w-1/3 h-20 bg-gray-100 animate-pulse" />
    <div className="w-full md:w-2/3 h-48">
      <div className="w-full md:w-2/3 h-full bg-gray-100 animate-pulse" />
    </div>
  </div>
);

export default CoachTabSkeleton;

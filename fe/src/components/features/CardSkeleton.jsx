const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
      <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl"></div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-3 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="w-full h-5 bg-gray-200 rounded-lg"></div>
        <div className="w-5/6 h-3 bg-gray-200 rounded-lg"></div>
        <div className="w-4/6 h-3 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;

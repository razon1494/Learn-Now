export default function RelatedVideoLoader() {
  return (
    <div className="w-full flex flex-row gap-2 mb-4 animate-pulse">
      <div className="relative w-[168px] h-[94px] flex-none duration-300 hover:scale-[1.03]">
        <div className="aspect-video bg-gray-600"></div>
      </div>

      <div className="flex flex-col w-full grow space-y-2">
        <p className="text-gray-600 text-[8px] bg-gray-600">Loading...</p>
        <span className="text-gray-600 text-[8px] mt-2 bg-gray-600">
          Loading...
        </span>
        <p className="text-gray-600 text-[8px] bg-gray-600">Loading...</p>
      </div>
    </div>
  );
}

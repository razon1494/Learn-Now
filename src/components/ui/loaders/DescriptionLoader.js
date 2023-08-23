export default function DescriptionLoader() {
  return (
    <div className="animate-pulse">
      <h1 className="text-xs text-gray-600 bg-gray-600">Loading...</h1>
      <div className="mt-2 pb-4 flex items-center space-between border-b">
        <h2 className="text-[8px] w-[50%] bg-gray-600 text-gray-600 w-full">
          Uploaded on 23 Nov 2022
        </h2>
      </div>

      <div className="mt-4 text-sm bg-gray-600 h-2"></div>
      <div className="mt-1 text-sm bg-gray-600 h-2"></div>
      <div className="mt-1 text-sm bg-gray-600 h-2"></div>
      <div className="mt-1 text-sm bg-gray-600 h-2"></div>
      <div className="mt-1 text-sm bg-gray-600 h-2 w-[70%]"></div>
    </div>
  );
}

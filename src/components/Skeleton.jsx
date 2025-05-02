export default function Skeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 animate-pulse">
      {/* 이미지 영역 스켈레톤 */}
      <div className="w-full md:w-[600px] aspect-[16/9] bg-gray-300 rounded-xl shadow-lg" />

      {/* 텍스트 영역 스켈레톤 */}
      <div className="flex flex-col gap-4 border border-gray-200 p-6 rounded-xl shadow-md bg-white w-full">
        {/* 제목 & 평점 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="h-8 md:h-10 w-3/4 bg-gray-300 rounded" />
          <div className="h-6 w-24 bg-gray-300 rounded" />
        </div>

        {/* 장르 */}
        <div className="h-4 w-1/2 bg-gray-200 rounded" />

        {/* 개요 */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-[90%] bg-gray-200 rounded" />
          <div className="h-4 w-[80%] bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

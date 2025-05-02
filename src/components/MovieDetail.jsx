import movieDetailData from '../data/movieDetailData.json'

export default function MovieDetail () {
    const {backdrop_path, title, vote_average, genres, overview} = movieDetailData;
    const baseURL = "https://image.tmdb.org/t/p/w500"; 
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0c2a]">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 max-w-6xl w-full">
                {/* 이미지 영역 */}
                <img 
                    src={baseURL + backdrop_path} 
                    alt={title} 
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg" 
                />
                
                {/* 텍스트 영역 */}
                <div className="w-full md:w-1/2 md:ml-6 mt-4 md:mt-0">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <p className="text-xl text-yellow-400 mb-4">⭐ {vote_average}</p>
                    <p className="text-lg text-gray-300 mb-4">
                        {genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <p className="text-lg text-white">{overview}</p>
                </div>
            </div>
        </div>
    )
}

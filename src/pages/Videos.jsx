import { useParams } from "react-router-dom";
import VideoCard from "@components/VideoCard";
import { useSearchOrPopularVideos } from "../hook/useFetch";
import React from "react";

const Videos = () => {
  const { keyword } = useParams();
  const { isError, isLoading, data } = useSearchOrPopularVideos(keyword || "");

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>isLoading...</p>;
  return (
    <div>
      {data?.map((items) => (
        <VideoCard key={items.id} video={items} />
      ))}
    </div>
  );
};

export default Videos;

import React from "react";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import SideVideoitem from "./SideVideoitem";
import VideoLoader from "./ui/loaders/VideoLoader";

const PlayerVideoLists = () => {
  const { data: videoes, isLoading, isError, error } = useGetVideoesQuery();

  let content = null;
  if (isLoading) {
    content = <VideoLoader />;
  }
  if (!isLoading && isError) {
    content = <p>{error} </p>;
  }
  if (!isLoading && !isError && videoes?.length === 0) {
    content = <p>No videoes found </p>;
  }
  if (!isLoading && !isError && videoes?.length > 0) {
    content = videoes.map((video) => (
      <SideVideoitem key={video.id} video={video}></SideVideoitem>
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default PlayerVideoLists;

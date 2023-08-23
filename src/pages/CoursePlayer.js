import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import PlayerVideoLists from "../components/PlayerVideoLists";
import Error from "../components/ui/Error";
import VideoDetails from "../components/VideoDetails";
import VideoPlayer from "../components/VideoPlayer";
import { useGetVideoQuery } from "../features/videos/videoesSlice";
import PlayerLoader from "../components/ui/loaders/PlayerLoader";

export default function CoursePlayer() {
  const params = useParams();
  const videoId = params?.videoId ? params.videoId : 1;
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  let content = null;

  if (isLoading) {
    content = <PlayerLoader></PlayerLoader>;
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }
  if (!isLoading && !isError && video?.id) {
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <VideoPlayer url={video?.url} title={video?.title} />
        <VideoDetails video={video} />
      </div>
    );
  }
  return (
    <div>
      <NavBar></NavBar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {content}
            <PlayerVideoLists />
          </div>
        </div>
      </section>
    </div>
  );
}

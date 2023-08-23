import React from "react";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import VideoItem from "./VideoItem";
import { Link } from "react-router-dom";
import RelatedVideoLoader from "./ui/loaders/RelatedVideoLoader";

export default function VideoLists() {
  const { data: videoes, isLoading, isError, error } = useGetVideoesQuery();

  let content = null;
  if (isLoading) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  }
  if (!isLoading && isError) {
    content = <p>{error} </p>;
  }
  if (!isLoading && !isError && videoes?.length === 0) {
    content = <p>No videoes found </p>;
  }
  if (!isLoading && !isError && videoes?.length > 0) {
    content = videoes.map((video) => (
      <VideoItem key={video.id} video={video}></VideoItem>
    ));
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to="/admin/addvideo">
              <button className="btn ml-auto">Add Video</button>
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

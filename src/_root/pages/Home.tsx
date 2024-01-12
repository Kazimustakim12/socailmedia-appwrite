import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostsCard";
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import { useState } from "react";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post w-full">
          <h2 className="h3-bold md:h2-bolld text-left w-full mb-4">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

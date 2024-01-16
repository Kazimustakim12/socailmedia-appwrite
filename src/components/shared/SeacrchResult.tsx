import { Models } from "appwrite";
import React from "react";
import Loader from "./Loader";
import GridPostLists from "./GridPostLists";

type SeacrchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SeacrchResult = ({
  isSearchFetching,
  searchedPosts,
}: SeacrchResultProps) => {
  console.log(searchedPosts);
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostLists posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

export default SeacrchResult;

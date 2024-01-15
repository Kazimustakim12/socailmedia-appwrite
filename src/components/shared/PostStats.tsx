import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queryAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likeList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLike] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeleteing } =
    useDeleteSavePost();
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post?.$id === post?.$id
  );
  console.log(currentUser, "currentUser");
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLike = newLikes.includes(userId);
    if (hasLike) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLike(newLikes);
    likePost({ postId: post?.$id || "", likeArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(savedPostRecord, "savePostRecord");
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      {isSavingPost || isDeleteing ? (
        <Loader />
      ) : (
        <div className="flex gap-2 ">
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        </div>
      )}
    </div>
  );
};

export default PostStats;

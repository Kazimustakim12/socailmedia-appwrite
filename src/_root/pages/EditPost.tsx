import PostForms from "@/components/forms/PostForms";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queryAndMutations";

import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  if (isPending) return <Loader />;
  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className=" flex-start  gap-3 justify-start w-full  max-w-5xl">
          <img
            src="/assets/icons/add-post.svg"
            alt="add-post"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForms action="update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;

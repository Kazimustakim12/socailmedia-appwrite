import PostForms from "@/components/forms/PostForms";

const CreatePost = () => {
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
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForms />
      </div>
    </div>
  );
};

export default CreatePost;

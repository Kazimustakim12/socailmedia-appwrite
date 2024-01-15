import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { CreatPostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
// import { toast } from "../ui/use-toast";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queryAndMutations";
import Loader from "../shared/Loader";

type PostFormProps = {
  post?: Models.Document;
  action: "create" | "update";
};

const PostForms = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatPostValidation>>({
    resolver: zodResolver(CreatPostValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatPostValidation>) {
    if (post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updatedPost) {
        toast({
          title: "plese try again",
        });
      }
      return navigate(`/posts/${post.$id}`);
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({
        title: "please try again",
      });
    }
    navigate("/");
    console.log(values);
  }

  console.log(post, "post form ");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col  gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-from_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader
                  filedChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-from_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-from_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by Comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  type="text"
                  placeholder="Art, Expression, React"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-from_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary "
            disabled={isLoadingUpdate || isLoadingCreate}
          >
            {isLoadingCreate || (isLoadingUpdate && <Loader />)}
            {action} post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForms;

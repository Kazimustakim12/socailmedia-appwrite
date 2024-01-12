import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewPost,
  createUserAccount,
  getRecentPosts,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./querkKeys";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePost = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createNewPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts(),
  });
};

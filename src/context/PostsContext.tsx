import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "../types";

interface PostsContextType {
  userPosts: Record<number, Post[]>;
  setPosts: (userId: number, posts: Post[]) => void;
  addPost: (userId: number, post: Post) => void;
  updatePost: (
    userId: number,
    postId: number,
    title: string,
    body: string
  ) => void;
  deletePost: (userId: number, postId: number) => void;
  getPosts: (userId: number) => Post[] | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [userPosts, setUserPosts] = useState<Record<number, Post[]>>({});

  const setPosts = (userId: number, posts: Post[]) => {
    setUserPosts((prev) => ({ ...prev, [userId]: posts }));
  };

  const addPost = (userId: number, post: Post) => {
    setUserPosts((prev) => ({
      ...prev,
      [userId]: [post, ...(prev[userId] || [])],
    }));
  };

  const updatePost = (
    userId: number,
    postId: number,
    title: string,
    body: string
  ) => {
    setUserPosts((prev) => ({
      ...prev,
      [userId]:
        prev[userId]?.map((post) =>
          post.id === postId ? { ...post, title, body } : post
        ) || [],
    }));
  };

  const deletePost = (userId: number, postId: number) => {
    setUserPosts((prev) => ({
      ...prev,
      [userId]: prev[userId]?.filter((post) => post.id !== postId) || [],
    }));
  };

  const getPosts = (userId: number) => userPosts[userId];

  return (
    <PostsContext.Provider
      value={{ userPosts, setPosts, addPost, updatePost, deletePost, getPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within PostsProvider");
  }
  return context;
};

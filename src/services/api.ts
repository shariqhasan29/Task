import type { User, Post } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async (): Promise<User[]> => {
  await delay(800);
  const response = await fetch("/data/users.json");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUserById = async (id: number): Promise<User | undefined> => {
  await delay(600);
  const response = await fetch("/data/users.json");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Invalid JSON response");
  }
  const users: User[] = await response.json();
  return users.find((user) => user.id === id);
};

export const fetchPostsByUserId = async (userId: number): Promise<Post[]> => {
  await delay(600);
  const response = await fetch("/data/posts.json");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Invalid JSON response");
  }
  const posts: Post[] = await response.json();
  return posts.filter((post) => post.userId === userId);
};

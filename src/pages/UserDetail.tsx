import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User, Post } from "../types";
import { fetchUserById, fetchPostsByUserId } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import PostItem from "../components/common/posts/PostItem";
import PostForm from "../components/common/posts/PostForm";
import BackButton from "../components/ui/BackButton";
import UserInfoCard from "../components/common/users/UserInfoCard";
import PostsHeader from "../components/common/posts/PostsHeader";
import EmptyPostsState from "../components/common/posts/EmptyPostsState";
import Pagination from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";

const POSTS_PER_PAGE = 3;

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    paginatedItems: displayedPosts,
    goToPage,
  } = usePagination(filteredPosts, POSTS_PER_PAGE);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        setPostsError(null);

        const userId = parseInt(id);
        const [userData, postsData] = await Promise.all([
          fetchUserById(userId),
          fetchPostsByUserId(userId),
        ]);

        if (!userData) throw new Error("User not found");

        setUser(userData);
        setAllPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleAddPost = (title: string, body: string) => {
    const newPost: Post = {
      id: Math.max(...allPosts.map((p) => p.id), 0) + 1,
      userId: user!.id,
      title,
      body,
    };
    setAllPosts([newPost, ...allPosts]);
    setShowAddForm(false);
  };

  const handleEditPost = (id: number, title: string, body: string) => {
    setAllPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, title, body } : post))
    );
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    setAllPosts((prev) => prev.filter((post) => post.id !== id));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton label="Back to Users" />
        <UserInfoCard user={user} />

        <PostsHeader
          postsCount={allPosts.length}
          onAddClick={() => setShowAddForm(true)}
          disabled={editingPost !== null || showAddForm}
        />

        <div className="pb-6">
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Found {filteredPosts.length} post
              {filteredPosts.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {showAddForm && (
          <PostForm
            onSubmit={handleAddPost}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {postsError ? (
          <ErrorMessage message={postsError} />
        ) : (
          <>
            <div className="space-y-4">
              {displayedPosts.map((post) =>
                editingPost?.id === post.id ? (
                  <PostForm
                    key={post.id}
                    post={editingPost}
                    onSubmit={(title, body) =>
                      handleEditPost(post.id, title, body)
                    }
                    onCancel={() => setEditingPost(null)}
                  />
                ) : (
                  <PostItem
                    key={post.id}
                    post={post}
                    onEdit={() => setEditingPost(post)}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                )
              )}
            </div>

            {allPosts.length === 0 && !showAddForm && (
              <EmptyPostsState onCreateClick={() => setShowAddForm(true)} />
            )}

            {allPosts.length > 0 && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No posts found matching "{searchQuery}"
                </p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetail;

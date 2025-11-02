interface PostsHeaderProps {
  postsCount: number;
  onAddClick: () => void;
  disabled?: boolean;
}

const PostsHeader = ({
  postsCount,
  onAddClick,
  disabled,
}: PostsHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">Posts ({postsCount})</h2>
      <button
        onClick={onAddClick}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        disabled={disabled}
      >
        Add New Post
      </button>
    </div>
  );
};

export default PostsHeader;

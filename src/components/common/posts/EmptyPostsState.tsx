import { FileIcon } from "../../../assets/icons/FileIcon";

interface EmptyPostsStateProps {
  onCreateClick: () => void;
}

const EmptyPostsState = ({ onCreateClick }: EmptyPostsStateProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
      <FileIcon />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
      <p className="text-gray-600 mb-4">
        This user hasn't created any posts yet.
      </p>
      <button
        onClick={onCreateClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Create First Post
      </button>
    </div>
  );
};

export default EmptyPostsState;

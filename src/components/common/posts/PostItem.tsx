import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { EditIcon } from "../../../assets/icons/EditIcon";
import type { Post } from "../../../types";

interface PostItemProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostItem = ({ post, onEdit, onDelete }: PostItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {post.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded transition-colors"
            title="Edit post"
          >
            <EditIcon />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition-colors"
            title="Delete post"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostItem;

import { useState } from "react";
import type { Post } from "../../../types";

interface PostFormProps {
  post?: Post;
  onSubmit: (title: string, body: string) => void;
  onCancel: () => void;
}

const PostForm = ({ post, onSubmit, onCancel }: PostFormProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    body: post?.body || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, body } = formData;
    if (title.trim() && body.trim()) {
      onSubmit(title.trim(), body.trim());
      setFormData({ title: "", body: "" });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {post ? "Edit Post" : "Add New Post"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter post content"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {post ? "Update Post" : "Create Post"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

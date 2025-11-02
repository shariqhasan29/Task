import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton = ({ label = "Go Back", className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;

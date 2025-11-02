import { Link } from "react-router-dom";
import type { User } from "../../../types";
import { EmailIcon } from "../../../assets/icons/EmailIcon";
import { RightArrowIcon } from "../../../assets/icons/RightArrowIcon";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/user/${user.id}`}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white font-semibold text-xl flex items-center justify-center shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.company.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <EmailIcon />
          <span className="truncate">{user.email}</span>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            View Profile
            <RightArrowIcon />
          </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-500/20 transition" />
    </Link>
  );
};

export default UserCard;

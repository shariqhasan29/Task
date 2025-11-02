import { EmailIcon } from "../../../assets/icons/EmailIcon";
import { InternetIcon } from "../../../assets/icons/InternetIcon";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import type { User } from "../../../types";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <span className="text-blue-600 font-semibold text-2xl">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.company.name}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <EmailIcon />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneIcon />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <InternetIcon />
              <span>{user.website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;

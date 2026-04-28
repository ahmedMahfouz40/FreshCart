import ChangePassForm from "@/components/Forms/ChangePassForm";
import SettingsForm from "@/components/Forms/SettingsForm";
import { FaLock, FaUser } from "react-icons/fa6";

const page = () => {
  return (
    <div>
      {/* Account Settings Title */}
      <div className="header">
        <h2 className="font-bold text-xl text-heading leading-7">
          Account Settings
        </h2>
        <p className="text-sm text-[#6A7282] leading-5">
          Update your profile information and change your password
        </p>
      </div>
      {/* Profile Info */}
      <div className="bg-white shadow rounded-2xl my-5 overflow-hidden border border-gray-100">
        <div className="p-2 sm:p-4 md:p-8 space-y-5 border-b border-gray-100">
          {/* Profile Info Title */}
          <div className="flex items-center  gap-2">
            <span className="text-primary bg-primary-50  w-14 h-14 rounded-2xl flex items-center justify-center text-xl">
              <FaUser />
            </span>
            <div>
              <h3 className="font-bold text-heading ">Profile Information</h3>
              <p className="text-[#6A7282] text-sm">
                Update your personal details
              </p>
            </div>
          </div>
          {/* Form Data */}
          <SettingsForm />
        </div>
        <div className="bg-[#F9FAFB] p-2 sm:p-4 md:p-8 ">
          <h3 className="font-bold text-heading mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6A7282] leading-5">User ID</span>
              <span className="text-[#364153]  leading-5  text-center">
                {" "}
                ---{" "}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6A7282] leading-5">Role</span>
              <span className="py-1 px-3 bg-primary-50 rounded-lg text-primary ">
                {" "}
                User{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Change Password */}
      <div className="space-y-5 p-2  sm:p-4 md:p-8 bg-white shadow rounded-2xl my-5 overflow-hidden border border-gray-100">
        {/* change Password Title */}
        <div className="flex items-center  gap-2">
          <span className="text-[#E17100] bg-[#FEF3C6]  w-14 h-14 rounded-2xl flex items-center justify-center text-xl">
            <FaLock />
          </span>
          <div>
            <h3 className="font-bold text-heading ">Change Password</h3>
            <p className="text-[#6A7282] text-sm">
              Update your account password
            </p>
          </div>
        </div>
        {/* Form Data */}
        <ChangePassForm />
      </div>
    </div>
  );
};

export default page;

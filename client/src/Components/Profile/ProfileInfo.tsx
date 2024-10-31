import React from "react";
import { user, date_options } from "../../models/user.model";

interface Props {
  user: user;
  count: { followingCount: number; followerCount: number };
}

const ProfileInfo: React.FC<Props> = ({ user, count }) => {
  const { username, email, created_at, updated_at, profile_picture } = user;
  const first_name = user.first_name ?? "John";
  const middle_name = user.middle_name ?? "Jane";
  const last_name = user.last_name ?? "Doe";
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);

  return (
    <div className="h-screen w-screen px-36 py-20 text-white">
      <div className="flex items-center gap-10">
        <img
          src={profile_picture}
          className="h-[200px] w-[200px] rounded-full"
          alt="user-profile"
        />

        <div className="flex flex-col gap-8">
          <div className="">
            <h1 className="text-5xl font-bold">
              {first_name} {middle_name} {last_name}
            </h1>

            <p className="mt-2 text-lg text-[#D9D9D9] md:cursor-pointer lg:bg-inherit">
              {username}
            </p>
          </div>

          <div className="flex gap-10 text-[#D9D9D9]">
            <p className="cursor-pointer">{count.followerCount} followers</p>
            <p className="cursor-pointer">{count.followingCount} following</p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10">
        <div className="">
          <h3 className="text-3xl font-bold">Email</h3>
          <p className="text-xl">{email}</p>
        </div>

        <div className="text-white">
          <h3 className="text-3xl font-bold">Account Created</h3>
          <p className="text-xl">
            {createdDate.toLocaleString("en-US", date_options)}
          </p>
        </div>

        <div className="">
          <h3 className="text-3xl font-bold">Last Updated</h3>
          <p className="text-xl">
            {updatedDate.toLocaleString("en-US", date_options)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

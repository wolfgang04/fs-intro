import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import { user } from "../models/user.model";
import NotFound from "../Components/Profile/NotFound";

interface Props {
  loggedInUser: string;
}

const Profile: React.FC<Props> = ({ loggedInUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<user[]>([]);
  const [count, setCount] = useState({ followingCount: 0, followerCount: 0 });
  const { username } = useParams();
  const isOwnProfile = loggedInUser == username;

  const handleFetch = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:6062/api/user/profile",
        { username },
      );

      setIsLoading(false);
      if (response.status == 200) {
        if (response.data.user.length > 0) {
          setUser(response.data.user);
          setCount(response.data.counts);
        } else {
          console.log(`No users exists with ${username}`);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [username]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <>
      {isLoading == true ? (
        <span className="loading loading-spinner loading-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : user.length > 0 ? (
        <ProfileInfo user={user[0]} count={count} isOwnProfile={isOwnProfile} />
      ) : (
        <NotFound username={username!} />
      )}
    </>
  );
};

export default Profile;

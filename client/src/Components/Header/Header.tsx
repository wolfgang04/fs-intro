import axios from "axios";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const res = await axios.get("http://localhost:6062/api/user/logout", {
      withCredentials: true,
    });

    if (res.status == 200) {
      window.location.reload();
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6062/api/user/auth/status",
        { withCredentials: true },
      );

      if (res.status == 200) {
        navigate(`/${res.data}`);
      }
    } catch (error) {}
  };

  return (
    <div className="flex justify-evenly bg-[#D9D9D9] text-black">
      <p className="cursor-pointer hover:underline" onClick={() => getUser()}>
        Profile
      </p>
      <p className="cursor-pointer hover:underline" onClick={() => logout()}>
        Logout
      </p>
    </div>
  );
};

export default Header;

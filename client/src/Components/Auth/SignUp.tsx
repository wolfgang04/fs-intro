import React, { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { useNavigate } from "react-router";

interface pass {
  password: string;
  confirm: string;
}

interface accDetails {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC<{ onToggle: () => void }> = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [password, setPassword] = useState<pass>({
    password: "",
    confirm: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async (details: accDetails) => {
    const response = await axios.post(
      "http://localhost:6062/api/user/signup",
      details,
      { withCredentials: true },
    );

    if (response.status >= 200 && response.status < 300) {
      console.log("Successfully created account");
      navigate(`/${details.username}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMatch(true);

    if (
      username.trim() == "" ||
      email.trim() == "" ||
      password.password.trim() == ""
    ) {
      return false;
    }

    if (password.password !== password.confirm) {
      setIsMatch(false);
      return false;
    }

    handleSignUp({ username, email, password: password.password });

    setUsername("");
    setEmail("");
    setPassword({ password: "", confirm: "" });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prevPass) => ({
      ...prevPass,
      password: e.target.value,
    }));
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prevPass) => ({
      ...prevPass,
      confirm: e.target.value,
    }));
  };

  return (
    <form action="" className="" onSubmit={handleSubmit}>
      <h1 className="mb-3 text-center text-2xl font-bold">Sign Up</h1>

      <div className="col mb-5 gap-5">
        <FormInput
          change={handleChangeUsername}
          for="username"
          label="Username"
          value={username}
          type="text"
        />
        <FormInput
          label="Email"
          for="email"
          value={email}
          change={handleChangeEmail}
          type="email"
        />
        <FormInput
          label="Password"
          for="password"
          value={password.password}
          change={handleChangePassword}
          type="password"
        />
        <div className="">
          <FormInput
            label="Confirm Password"
            for="confirmPass"
            value={password.confirm}
            change={handleConfirmPassword}
            type="password"
          />
          {!isMatch && <p className="text-red-500">Password doesn't match</p>}
        </div>
      </div>

      <input type="submit" value="Sign Up" />

      <p
        className="mt-3 cursor-pointer text-center font-bold hover:underline"
        onClick={() => props.onToggle()}
      >
        Already have an account? Login
      </p>
    </form>
  );
};

export default SignUp;

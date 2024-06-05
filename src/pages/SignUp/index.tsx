import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { register } from "../../api/userApi";
import { Fade } from "@material-ui/core";

const SignUp = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // After the component mounts, set a timeout to enable animation
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  const navigate = useNavigate();

  const isValidPassword = (password: string) => {
    // Define password requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    
    try {
      const data = await register(formData);
      console.log(data);

      if (data.error && data.error.name === "SequelizeUniqueConstraintError") {
        // Handling unique constraint error for email
        setError("The email address is already in use.");
        toast.error("The email address is already in use.");
        setDisabled(false);
      }else if (!isValidPassword(formData.password)) {
        setError('Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character.');
        setDisabled(false);
        toast.error("Password must be at least 8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character.");
        return; 
      }else if (data.success === false) {
        setError(data.message);
        setDisabled(false);
      } else {
        setError(null);
        toast.success("Account created successfully");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("An unexpected error occurred during registration.");
      setDisabled(false);
    }
};

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Fade in={animationReady} timeout={500}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pr-12">
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Sign Up</h1>

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl ${
              (!formData.email || !formData.password || disabled) &&
              "disabled-link"
            }`}
            style={{ width: "100%" }}
            disabled={disabled}
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-black">
              Sign Up
            </span>
          </button>
        </div>
      </form>
      </Fade>
      <Fade in={animationReady} timeout={2000}>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      </Fade>
    </div>
  );
};
export default SignUp;

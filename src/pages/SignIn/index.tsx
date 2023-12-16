import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  
  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6300/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setError(null);
      navigate("/");
      localStorage.setItem('token', data.token);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7 pr-12 ">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pr-12 ">
        <input
          type="email"
          placeholder="email"
          className="border  p-3 rounded-lg"
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
        <button
          type="submit"
          className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};
export default SignIn;

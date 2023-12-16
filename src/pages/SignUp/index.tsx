import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  
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
      const res = await fetch('http://localhost:6300/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigate('/signin');
    } catch (error) {
    
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pr-12">
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
         <button
          type="submit"
          className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;

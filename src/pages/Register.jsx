import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { register, user } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    register(name, email);
    navigate("/");
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You are already registered!
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 px-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Join ShopEase today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>

          {message && (
            <p className="text-red-600 text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

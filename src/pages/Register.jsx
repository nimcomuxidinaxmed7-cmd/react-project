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
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      register(name, email, password);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (user) {
    return <p className="text-center mt-12">You are already registered!</p>;
  }

  return (
    <div className="max-w-md mx-auto my-12 px-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border rounded-md p-3"
              minLength={6}
              required
            />
          </div>

          {message && <p className="text-red-600">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

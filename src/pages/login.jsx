import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../js/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form.email, form.password);
      alert("Login sukses!");
      navigate("/flow");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-slate-900 font-poppins px-4">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-6">Login</h2>
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="py-2 px-15">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 mt-3 border text-black border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 mt-3 border text-black border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2"
              required
            />
            <Link
              to="/register"
              className="block text-sm text-left text-black mt-2 hover:underline"
            >
              Do you have any Account?
            </Link>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-md mt-6 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

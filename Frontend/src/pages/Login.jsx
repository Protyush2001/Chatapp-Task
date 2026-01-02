import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { loginUser } from "../api/auth";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      dispatch(login(data));
      alert("Login Successful");
      navigate("/chat");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Page</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-900 mb-1">Email:</label>
            <input
              type="email"
              placeholder="Enter your email here"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <label className="block text-gray-900 mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter your password here"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div >
            <input type="submit" value="Login" className="w-full bg-green-600 text-white py-2 border border-gray-600 rounded-lg font-medium hover:bg-green-800 hover:text-white transition" />
          </div>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            className="text-green-800 cursor-pointer hover:underline"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

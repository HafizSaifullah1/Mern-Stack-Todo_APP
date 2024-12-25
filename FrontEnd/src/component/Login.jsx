import React, { useState } from "react";
import { message as antdMessage } from "antd";
import axios from "../api/axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/login", formData);
            localStorage.setItem("token", response.data.token); // Save token to localStorage
            antdMessage.success("Logged in successfully!");
            setTimeout(() => {
                window.location.href = "/todo-app"; // Redirect to Todo app
            }, 1500);
        } catch (err) {
            antdMessage.error(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg')", // Replace with your image URL
            }}
        >
            <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-purple-500 text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-700 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-500  hover:bg-purple-600  text-black font-bold py-3 px-6 rounded focus:outline-none focus:ring-4 focus:ring-cyan-400"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-300 mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-purple-500  hover:text-purple-600  underline"
                    >
                        Signup here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

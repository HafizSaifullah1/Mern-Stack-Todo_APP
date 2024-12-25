import React, { useState } from "react";
import { message as antdMessage } from "antd";
import axios from "../api/axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/signup", formData);
            antdMessage.success(response.data.message || "Signup successful!");
            setTimeout(() => {
                window.location.href = "/todo-app"; // Redirect to Todo app
            }, 1500);
        } catch (err) {
            antdMessage.error(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg')", // Replace with your image URL
            }}
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-light-green text-2xl text-cyan-300 font-bold mb-6">
                    Signup
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-light-green focus:outline-none focus:ring-2 focus:ring-light-green transition-all duration-300"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-light-green focus:outline-none focus:ring-2 focus:ring-light-green transition-all duration-300"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-light-green focus:outline-none focus:ring-2 focus:ring-light-green transition-all duration-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-light-green focus:outline-none focus:ring-2 focus:ring-light-green transition-all duration-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-light-green hover:bg-cyan-500 text-cyan-50 font-bold py-3 px-6 rounded focus:outline-none focus:ring-4 focus:ring-light-green"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-gray-300 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-light-green hover:text-cyan-400 underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

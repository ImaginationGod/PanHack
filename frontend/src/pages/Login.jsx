import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate(); // 👈 navigation hook

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ Backend API call
            const API_URL = import.meta.env.VITE_API_URL || "";
            const res = await axios.post(`${API_URL}/api/auth/login`, formData);
            // const res = await axios.post("http://localhost:5000/api/auth/login", formData);

            if (res.data.success) {
                // ✅ Store token for future requests
                localStorage.setItem("token", res.data.token);
                alert("✅ Login successful!");
                navigate("/upload"); // 👈 redirect to upload page
            } else {
                alert(res.data.message || "❌ Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "⚠️ Server error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
            {/* Background Blur Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md border border-white/20 transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-3xl relative z-10">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full mb-4 sm:mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                        Welcome Back 👋
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                        Log in to your{" "}
                        <span className="text-yellow-300 font-semibold bg-yellow-300/20 px-2 py-0.5 rounded">
                            AI Resume Analyzer
                        </span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Email Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <span className="text-white/60 text-lg sm:text-xl transition-all duration-300 group-focus-within:text-yellow-300 group-focus-within:scale-110">
                                📧
                            </span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            autoComplete="off"
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:bg-white/20 focus:border-yellow-400/50 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                            required
                        />
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300 ${focusedField === "email" ? "w-full" : "w-0"
                                }`}
                        ></div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <span className="text-white/60 text-lg sm:text-xl transition-all duration-300 group-focus-within:text-yellow-300 group-focus-within:scale-110">
                                🔒
                            </span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={handleChange}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:bg-white/20 focus:border-yellow-400/50 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white/60 hover:text-white transition-colors duration-300"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300 ${focusedField === "password" ? "w-full" : "w-0"
                                }`}
                        ></div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                        <label className="flex items-center text-white/70 hover:text-white transition-colors cursor-pointer group">
                            <input
                                type="checkbox"
                                className="mr-2 rounded border-white/30 bg-white/10 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 transition-all"
                            />
                            <span className="select-none">Remember me</span>
                        </label>
                        <a
                            href="#"
                            className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 hover:underline font-medium"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 mt-6 sm:mt-8 relative overflow-hidden group ${loading
                            ? "bg-white/20 cursor-not-allowed text-white/50"
                            : "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-0.5 active:translate-y-0"
                            }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login <span className="text-xl">🚀</span>
                                </>
                            )}
                        </span>
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-white/70 mt-6 sm:mt-8 text-sm sm:text-base">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-yellow-300 font-semibold hover:text-yellow-200 transition-colors duration-300 hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulated API call
        // setTimeout(() => {
        //     alert("✅ Registered successfully! Please login.");
        //     setLoading(false);
        // }, 1500);

        try {
            const API_URL = import.meta.env.VITE_API_URL || "";
            const res = await axios.post(`${API_URL}/api/auth/register`, formData);

            if (res.data.success) {
                alert("✅ Registered successfully! Please login.");
                navigate("/login");
            } else {
                alert(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Register error:", error);
            alert(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 sm:px-6 py-8 sm:py-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md border border-white/20 transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-3xl">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-block p-3 sm:p-4 bg-white/20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
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
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                        Create Your Account
                    </h2>
                    <p className="text-white/70 text-sm sm:text-base">
                        Join us and start your journey today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Name Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-white/60 text-lg sm:text-xl transition-all duration-300 group-focus-within:text-white group-focus-within:scale-110">
                                👤
                            </span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                            required
                        />
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 ${focusedField === "name" ? "w-full" : "w-0"
                                }`}
                        ></div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-white/60 text-lg sm:text-xl transition-all duration-300 group-focus-within:text-white group-focus-within:scale-110">
                                📧
                            </span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                            required
                        />
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 ${focusedField === "email" ? "w-full" : "w-0"
                                }`}
                        ></div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-white/60 text-lg sm:text-xl transition-all duration-300 group-focus-within:text-white group-focus-within:scale-110">
                                🔒
                            </span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                            required
                        />
                        <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 ${focusedField === "password" ? "w-full" : "w-0"
                                }`}
                        ></div>
                    </div>

                    {/* Password Requirements */}
                    <div className="text-white/60 text-xs sm:text-sm space-y-1 pl-1">
                        <p>Password must contain at least:</p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One number</li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 mt-6 sm:mt-8 relative overflow-hidden group ${loading
                            ? "bg-white/20 cursor-not-allowed text-white/50"
                            : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-0.5 active:translate-y-0"
                            }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? "Registering..." : "Sign Up"}
                        </span>
                        {!loading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6 sm:my-8">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="px-4 text-white/60 text-xs sm:text-sm">OR</span>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Google Login Button
        <div className="space-y-3">
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base hover:scale-105">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div> */}

                {/* Footer */}
                <p className="text-center text-white/70 mt-6 sm:mt-8 text-sm sm:text-base">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-yellow-300 font-semibold hover:text-yellow-200 transition-colors duration-300 hover:underline"
                    >
                        Login here
                    </Link>
                </p>

                <p className="text-center text-white/50 text-xs mt-6">
                    By signing up, you agree to our{" "}
                    <a href="#" className="underline hover:text-white/70 transition-colors">
                        Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-white/70 transition-colors">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
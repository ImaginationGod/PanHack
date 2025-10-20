import React, { useState } from "react";
import axios from "axios";
import ResumeAnalysis from "../components/ResumeAnalysis";

const ResumeUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false); // <-- new state

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please upload a file first!");
            return;
        }

        setLoading(true); // show loading screen
        const formData = new FormData();
        formData.append("resume", selectedFile);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                import.meta.env.VITE_API_URL + "/api/resume/analyze",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResult(res.data.analysis);
        } catch (error) {
            console.error(error);
            alert("Error analyzing resume");
        } finally {
            setLoading(false); // hide loading screen
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
            {/* Loading overlay */}
            {loading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
                    <p className="text-white text-lg font-medium">Analyzing resume...</p>
                </div>
            )}

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
                <h1 className="text-2xl font-semibold mb-4 text-center">Upload Your Resume</h1>

                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-6">
                    <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileChange}
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <button
                        type="submit"
                        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        Analyze Resume
                    </button>
                </form>

                {result && (
                    <div className="w-full">
                        <h2 className="text-xl font-medium mb-4 text-center text-gray-700">
                            Analysis Result
                        </h2>
                        <ResumeAnalysis analysis={result} />
                    </div>
                )}
            </div>

            {/* Spinner CSS */}
            <style>{`
                .loader {
                    border-top-color: #3498db;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ResumeUploadPage;

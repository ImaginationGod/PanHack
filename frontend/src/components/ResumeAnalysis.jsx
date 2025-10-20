import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Collapse } from "react-collapse";

const ResumeAnalysis = ({ analysis }) => {
    // Split into main sections by headings like "### 1. Key Skills"
    const mainSections = analysis
        .split(/(?=### \d+\.)/) // split only at main section headings
        .map((s) => s.trim())
        .filter(Boolean);

    const [openSections, setOpenSections] = useState(Array(mainSections.length).fill(false));

    const toggleSection = (idx) => {
        const newState = [...openSections];
        newState[idx] = !newState[idx];
        setOpenSections(newState);
    };

    const getSectionColor = (section) => {
        if (/Key Skills/i.test(section)) return "bg-blue-600/10 border-blue-400";
        if (/Experience Level/i.test(section)) return "bg-purple-600/10 border-purple-400";
        if (/Strengths/i.test(section)) return "bg-green-600/10 border-green-400";
        if (/Areas for Improvement/i.test(section)) return "bg-red-600/10 border-red-400";
        if (/Suggestions/i.test(section)) return "bg-yellow-600/10 border-yellow-400";
        if (/Overall Assessment/i.test(section)) return "bg-indigo-600/10 border-indigo-400";
        return "bg-white/10 border-white/20";
    };

    return (
        <div className="space-y-4">
            {mainSections.map((section, idx) => {
                // Extract title from "### 1. Key Skills"
                const titleMatch = section.match(/###\s*(\d+\.\s[^\n]+)/);
                const title = titleMatch ? titleMatch[1] : `Section ${idx + 1}`;

                // Remove the title line from markdown content
                const content = section.replace(/###\s*\d+\.\s[^\n]+/, "").trim();

                return (
                    <div
                        key={idx}
                        className={`backdrop-blur-xl rounded-xl p-4 border ${getSectionColor(
                            section
                        )} shadow-md hover:shadow-lg transition-shadow duration-300`}
                    >
                        <button
                            onClick={() => toggleSection(idx)}
                            className="w-full text-left font-semibold text-slate-700 text-lg sm:text-xl flex justify-between items-center"
                        >
                            {title}
                            <span
                                className={`ml-2 transition-transform duration-300 ${openSections[idx] ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        <Collapse isOpened={openSections[idx]}>
                            <div className="mt-2 text-slate-700 text-sm sm:text-base prose prose-invert max-w-none">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};

export default ResumeAnalysis;

import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fileName: String,
    extractedText: String,
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
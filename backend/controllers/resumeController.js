import fs from "fs";
import mammoth from "mammoth";
import axios from "axios";
import dotenv from "dotenv";
import pdfParse from "pdf-parse-fixed";
dotenv.config();

export const analyzeResume = async (req, res) => {
    let filePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        filePath = req.file.path;
        let resumeText = "";

        // PDF
        if (req.file.mimetype === "application/pdf") {
            try {
                const dataBuffer = fs.readFileSync(filePath);
                const pdfData = await pdfParse(dataBuffer);
                resumeText = pdfData.text;
            } catch (pdfError) {
                console.error("PDF parsing error:", pdfError);
                throw new Error("Failed to parse PDF file");
            }
        }
        // DOCX
        else if (
            req.file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const buffer = fs.readFileSync(filePath);
            const { value } = await mammoth.extractRawText({ buffer });
            resumeText = value;
        }
        // TXT
        else if (req.file.mimetype === "text/plain") {
            resumeText = fs.readFileSync(filePath, "utf-8");
        } else {
            return res.status(400).json({ message: "Unsupported file type" });
        }

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ message: "No text could be extracted from the file" });
        }

        if (resumeText.length > 4000) {
            resumeText = resumeText.slice(0, 4000);
        }

        const apiKey = process.env.GOOGLE_AI_KEY;

        if (!apiKey) {
            throw new Error("GOOGLE_AI_KEY not found in environment variables");
        }

        // FIXED: Use gemini-2.5-flash (latest stable free model)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(
            url,
            {
                contents: [{
                    parts: [{
                        text: `Analyze this resume and provide detailed insights:

1. *Key Skills*: List the main technical and soft skills
2. *Experience Level*: Assess years of experience and seniority
3. *Strengths*: Highlight what stands out positively
4. *Areas for Improvement*: Constructive feedback
5. *Suggestions*: Actionable recommendations to enhance the resume
6. *Overall Assessment*: Brief summary and score out of 10

Resume Content:
${resumeText}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8000, // Increased for detailed analysis
                    topK: 40,
                    topP: 0.95,
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Debug: Log the full response structure
        console.log("API Response:", JSON.stringify(response.data, null, 2));

        // Extract analysis text from response
        const analysis =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            response.data?.candidates?.[0]?.output ||
            response.data?.text ||
            null;

        // Check if analysis was generated
        if (!analysis) {
            const finishReason = response.data?.candidates?.[0]?.finishReason;

            if (finishReason === 'MAX_TOKENS') {
                return res.status(500).json({
                    success: false,
                    message: "Analysis incomplete - output limit reached. Try with a shorter resume or increase token limit.",
                    error: "MAX_TOKENS"
                });
            } else if (finishReason === 'SAFETY') {
                return res.status(500).json({
                    success: false,
                    message: "Content was blocked by safety filters.",
                    error: "SAFETY_FILTER"
                });
            } else {
                console.error("Failed to extract analysis. Full response:", response.data);
                return res.status(500).json({
                    success: false,
                    message: "Failed to generate analysis",
                    error: "NO_CONTENT"
                });
            }
        }

        res.json({
            success: true,
            analysis,
            extractedTextLength: resumeText.length,
            tokensUsed: response.data?.usageMetadata?.totalTokenCount
        });

    } catch (error) {
        console.error("Resume analysis error:", error.response?.data || error.message);

        const errorMessage = error.response?.data?.error?.message || error.message;

        res.status(500).json({
            success: false,
            message: "Error analyzing resume",
            error: errorMessage,
        });
    } finally {
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (cleanupError) {
                console.error("File cleanup error:", cleanupError);
            }
        }
    }
};
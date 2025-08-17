import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export const summarizeAndEmail = async (req: Request, res: Response) => {
  try {
    const { transcript, prompt, recipients, subject } = req.body;

    if (!transcript || !recipients?.length) {
      return res.status(400).json({ error: "Transcript and recipients are required" });
    }

    // 1️⃣ Generate summary with Groq
    const { text: summary } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `You are a meeting summarizer.\n\n${prompt}\n\nTranscript:\n${transcript}`,
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    // 2️⃣ Send summary via email
   const transporter = nodemailer.createTransport({
         host: "smtp.gmail.com",
         port: 465,
         secure: true,
         auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS,
         },
       });

    for (const recipient of recipients) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject,
        text: summary,
      });
    }

    return res.status(200).json({
      message: "Summary generated and emailed successfully.",
      summary,
    });
  } catch (err: any) {
    console.error("Summarizer error:", err.message);
    return res.status(500).json({ error: "Failed to summarize and email" });
  }
};

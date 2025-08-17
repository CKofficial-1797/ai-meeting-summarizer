import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { summary, recipientEmail } = await req.json();
    console.log("Recipient Email received:", recipientEmail);

    if (!summary || !recipientEmail) {
      return NextResponse.json({ error: "Missing summary or recipients" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Meeting Summary",
      text: summary,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Send mail error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

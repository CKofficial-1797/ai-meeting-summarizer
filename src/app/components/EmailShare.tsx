"use client";
import { useState } from "react";

type Props = {
  summary: string;
};

export default function EmailShare({ summary }: Props) {
  const [emails, setEmails] = useState("");

  const handleSend = async () => {
    const res = await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary, emails: emails.split(",") }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Share via Email</h2>
      <input
        type="text"
        placeholder="Enter recipient emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <button onClick={handleSend}>Send Email</button>
    </div>
  );
}

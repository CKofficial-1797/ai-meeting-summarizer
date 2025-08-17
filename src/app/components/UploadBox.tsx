"use client";
import { useState } from "react";

export default function UploadBox() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate summary via Groq API
  const handleSummarize = async () => {
    if (!transcript) return alert("Paste the transcript first");
    setLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, prompt }),
      });
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
      else alert(data.error || "Error generating summary");
    } catch (err) {
      console.error("Error calling summarize API:", err);
      alert("Server error while generating summary");
    }
    setLoading(false);
  };

  // Send summary via email
  const handleSendMail = async () => {
    const recipients = emails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e !== "");
    if (!recipients.length) return alert("Enter at least one recipient email");

    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, recipientEmail: recipients.join(",") }),
      });
      const data = await res.json();
      alert(data.success ? "Email sent!" : data.error);
    } catch (err) {
      console.error("Send mail error:", err);
      alert("Server error while sending mail");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>AI Meeting Notes Summarizer</h2>

      <textarea
        placeholder="Paste transcript here"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{ width: "100%", height: "150px", padding: "10px", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Custom instruction (e.g., highlight action items)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{ padding: "10px 20px", marginBottom: "20px" }}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Editable Summary:</h3>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ width: "100%", height: "150px", padding: "10px", marginBottom: "10px" }}
          />

          <h3>Share via Email:</h3>
          <input
            type="text"
            placeholder="Enter recipient emails, comma separated"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button onClick={handleSendMail} style={{ padding: "10px 20px" }}>
            Send Email
          </button>
        </div>
      )}
    </div>
  );
}

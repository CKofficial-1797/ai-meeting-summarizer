"use client";
import { useState } from "react";
import UploadBox from "./components/UploadBox";
import SummaryEditor from "./components/SummaryEditor";
import EmailShare from "./components/EmailShare";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [finalSummary, setFinalSummary] = useState("");

  return (
    <div>
      <h1>AI Meeting Notes Summarizer</h1>

      {!summary && (
        <UploadBox />
      )}

      {summary && !finalSummary && (
        <SummaryEditor initialSummary={summary} onSave={setFinalSummary} />
      )}

      {finalSummary && <EmailShare summary={finalSummary} />}
    </div>
  );
}

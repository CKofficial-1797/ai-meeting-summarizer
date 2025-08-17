"use client";
import { useState } from "react";

type Props = {
  initialSummary: string;
  onSave: (edited: string) => void;
};

export default function SummaryEditor({ initialSummary, onSave }: Props) {
  const [edited, setEdited] = useState(initialSummary);

  return (
    <div>
      <h2>Edit Summary</h2>
      <textarea
        value={edited}
        onChange={(e) => setEdited(e.target.value)}
      />
      <button onClick={() => onSave(edited)}>Save</button>
    </div>
  );
}

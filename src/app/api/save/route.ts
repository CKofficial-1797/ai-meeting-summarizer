import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Summary } from "@/lib/models";

export async function POST(req: NextRequest) {
  const { transcript, summary, prompt } = await req.json();
  await connectDB();
  const doc = await Summary.create({ transcript, summary, prompt });
  return NextResponse.json({ id: doc._id });
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
// These are pulled from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, income, debt, objective, urgency, reason } = body;

    // 1. Basic Validation
    if (!fullName || !email) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // 2. Database Insertion
    // We map the frontend keys to the database column names
    const { data, error } = await supabase
      .from("audit_applications")
      .insert([
        {
          full_name: fullName,
          email: email,
          income: income,
          debt: debt,
          objective: objective,
          urgency: urgency,
          reason: reason,
        },
      ])
      .select();

    // 3. Error Handling for Database
    if (error) {
      console.error("Supabase Insertion Error:", error);
      return NextResponse.json(
        { message: "Failed to save application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Application submitted successfully", data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Audit Route Server Error:", err);
    return NextResponse.json(
      { message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}

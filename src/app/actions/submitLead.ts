"use server";

import { createClient } from "@supabase/supabase-js";

export interface SubmitLeadInput {
  room_id?: string;
  name: string;
  phone: string;
  email?: string;
  mbti_or_mood?: string;
  preferred_schedule?: string;
  category?: string;
  book_title?: string;
}

export async function submitLeadAction(data: SubmitLeadInput) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fewzfqkqmdfbfqdtxmvf.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld3pmcWtxbWRmYmZxZHR4bXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDkyNDAsImV4cCI6MjEwMTk4NTI0MH0.0HoqQJYdzdyJC7OFW8I9HO80QldD7LGEDAzmV4SFbpU";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Combine extra details into mbti_or_mood string to ensure compatibility with all DB versions
  const combinedMood = [
    data.book_title ? `[신청 도서: ${data.book_title}]` : "",
    data.email ? `이메일: ${data.email}` : "",
    data.preferred_schedule ? `희망일시: ${data.preferred_schedule}` : "",
    data.mbti_or_mood || data.category || "",
  ]
    .filter(Boolean)
    .join(" | ");

  // Primary payload with guaranteed columns
  const insertData: Record<string, any> = {
    name: data.name,
    phone: data.phone,
    mbti_or_mood: combinedMood || "랜딩페이지 사전신청",
    status: "pending",
  };

  if (data.room_id) {
    insertData.room_id = data.room_id;
  }

  // Attempt insert
  const { error } = await supabase.from("leads").insert([insertData]);

  if (error) {
    console.error("Supabase lead submission error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

"use server";

import { createClient } from "@supabase/supabase-js";

export interface SubmitReviewInput {
  room_id?: string;
  book_title?: string;
  author_name: string;
  persona_or_role?: string;
  content: string;
  rating?: number;
}

export async function submitReviewAction(data: SubmitReviewInput) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fewzfqkqmdfbfqdtxmvf.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld3pmcWtxbWRmYmZxZHR4bXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MDkyNDAsImV4cCI6MjEwMTk4NTI0MH0.0HoqQJYdzdyJC7OFW8I9HO80QldD7LGEDAzmV4SFbpU";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const persona = data.persona_or_role
    ? `실제 파운딩 멤버 (${data.author_name} / ${data.persona_or_role})`
    : `실제 파운딩 멤버 (${data.author_name})`;

  const insertData: Record<string, any> = {
    room_id: data.room_id || null,
    fake_user_persona: persona,
    content: data.content,
    is_ai_generated: false,
  };

  const { error } = await supabase.from("reviews").insert([insertData]);

  if (error) {
    console.error("Supabase review submission error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

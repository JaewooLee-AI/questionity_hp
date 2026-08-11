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
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Prepare insert payload for Supabase 'leads' table according to Admin Integration Guide
  const insertData: Record<string, any> = {
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    mbti_or_mood: data.mbti_or_mood || data.category || null,
    preferred_schedule: data.preferred_schedule || null,
    category: data.category || "일반 독서모임",
    book_title: data.book_title || null,
    status: "pending",
    source: "landing_page",
  };

  // Only attach room_id if valid string
  if (data.room_id) {
    insertData.room_id = data.room_id;
  }

  const { error } = await supabase.from("leads").insert([insertData]);

  if (error) {
    console.error("Supabase lead submission error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

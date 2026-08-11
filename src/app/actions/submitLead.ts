"use server";

import { createClient } from "@supabase/supabase-js";

export interface SubmitLeadInput {
  name: string;
  phone: string;
  email: string;
  category?: string;
  book_title?: string;
}

export async function submitLeadAction(data: SubmitLeadInput) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fewzfqkqmdfbfqdtxmvf.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from("leads").insert([
    {
      name: data.name,
      phone: data.phone,
      email: data.email,
      category: data.category || "일반 독서모임",
      book_title: data.book_title || null,
      source: "landing_page",
    },
  ]);

  if (error) {
    console.error("Supabase lead submission error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

-- Questionity MVP Supabase Schema & RLS Policies

-- 1. Leads Table (파운딩 멤버 신청자 정보)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT,
  book_title TEXT,
  source TEXT DEFAULT 'landing_page'
);

-- Enable RLS for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for lead collection (익명 사용자 등록 허용)
CREATE POLICY "Allow public inserts" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Block anonymous reads (익명 사용자 조회 차단)
CREATE POLICY "Block public selects" ON public.leads
  FOR SELECT TO anon
  USING (false);


-- 2. Virtual Rooms Table (가상 독서 모임 카탈로그)
CREATE TABLE IF NOT EXISTS public.virtual_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_url TEXT,
  predicted_by TEXT DEFAULT 'AI',
  category TEXT,
  vote_count INT DEFAULT 0
);

ALTER TABLE public.virtual_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select for virtual_rooms" ON public.virtual_rooms
  FOR SELECT TO anon
  USING (true);


-- 3. Virtual Reviews Table (AI 예측 독후감)
CREATE TABLE IF NOT EXISTS public.virtual_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  book_title TEXT NOT NULL,
  author TEXT NOT NULL,
  review_text TEXT NOT NULL,
  predicted_reviewer TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0
);

ALTER TABLE public.virtual_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select for virtual_reviews" ON public.virtual_reviews
  FOR SELECT TO anon
  USING (true);

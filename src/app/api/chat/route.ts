import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const maxDuration = 30;

const ALADIN_TTB_KEY = process.env.ALADIN_TTB_KEY || "ttbjwl17220625001";

async function fetchAladinSearch(query: string) {
  try {
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ALADIN_TTB_KEY}&Query=${encodeURIComponent(
      query
    )}&output=js&Version=20131101`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const text = await res.text();
    const data = JSON.parse(text);
    if (data.item && data.item.length > 0) {
      const item = data.item[0];
      return {
        title: item.title,
        author: item.author,
        cover: item.cover,
        description: item.description,
        publisher: item.publisher,
        link: item.link,
        isbn: item.isbn13 || item.isbn,
      };
    }
  } catch (err) {
    console.error("Aladin Search API error:", err);
  }
  return {
    title: `${query} 관련 추천 도서`,
    author: "추천 저자",
    cover: "https://image.aladin.co.kr/product/31832/26/coversum/k692833228_1.jpg",
    description: "깊이 있는 질문과 진솔한 생각을 나눌 수 있는 명작입니다.",
    publisher: "Questionity 에디션",
    link: "https://worknshare.readdy.co/",
    isbn: "1234567890",
  };
}

async function fetchAladinBestseller() {
  try {
    const url = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ALADIN_TTB_KEY}&QueryType=Bestseller&SearchTarget=Book&CategoryId=170&output=js&Version=20131101`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const text = await res.text();
    const data = JSON.parse(text);
    if (data.item && data.item.length > 0) {
      const item = data.item[0];
      return {
        title: item.title,
        author: item.author,
        cover: item.cover,
        description: item.description,
        publisher: item.publisher,
        link: item.link,
      };
    }
  } catch (err) {
    console.error("Aladin Bestseller API error:", err);
  }
  return {
    title: "트렌드 코리아 2026",
    author: "김난도 외",
    cover: "https://image.aladin.co.kr/product/33563/39/coversum/k062939882_1.jpg",
    description: "2026년 대한민국의 가장 핫한 마켓 트렌드 분석 보고서",
    publisher: "미래의창",
    link: "https://worknshare.readdy.co/",
  };
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    
    if (lastUserMessage.includes("베스트셀러") || lastUserMessage.includes("알려줘") || lastUserMessage.includes("트렌드")) {
      const book = await fetchAladinBestseller();
      return Response.json({
        role: "assistant",
        content: `현재 알라딘 경제경영 1위 베스트셀러는 《${book.title}》입니다! 📈`,
        toolInvocation: {
          toolName: "getRealtimeBestseller",
          result: book,
        },
      });
    }

    if (lastUserMessage.includes("INFP") || lastUserMessage.includes("타로") || lastUserMessage.includes("우울") || lastUserMessage.includes("기분")) {
      const book = await fetchAladinSearch("INFP 에세이");
      return Response.json({
        role: "assistant",
        content: `당신의 기분과 성향을 바탕으로 뽑아본 오늘의 책 타로 카드는 《${book.title}》입니다! 🔮`,
        toolInvocation: {
          toolName: "searchBookTarot",
          result: book,
        },
      });
    }

    const book = await fetchAladinSearch(lastUserMessage || "도둑맞은 집중력");
    return Response.json({
      role: "assistant",
      content: `《${book.title}》 서지 정보를 찾았습니다! 이 책으로 대학로 1호 독서방 대기자로 등록해보시겠어요? 📚`,
      toolInvocation: {
        toolName: "searchAndCreateRoom",
        result: book,
      },
    });
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `너는 대학로 지성 커뮤니티 Questionity의 Proactive AI 마케팅 챗봇이다. 
사용자의 기분, MBTI, 관심 도서에 따라 맞춤 도서를 타로 카드처럼 추천하거나 실시간 베스트셀러를 제안하고, 
결과적으로 Questionity의 파운딩 멤버 대기자 등록으로 유도하는 친근하고 세련된 말투를 사용하라.`,
    messages,
    tools: {
      searchBookTarot: tool({
        description: "사용자의 MBTI나 감정 상태에 맞는 책을 알라딘 API에서 검색하여 타로 카드 형태로 추천",
        parameters: z.object({
          keyword: z.string().describe("감정이나 MBTI 기반 검색 키워드 (예: INFP 치유, 에세이, 동기부여)"),
        }),
        execute: async (args: { keyword: string }) => fetchAladinSearch(args.keyword),
      } as any),
      getRealtimeBestseller: tool({
        description: "알라딘 경제경영 분야 실시간 베스트셀러 1위 조회",
        parameters: z.object({}),
        execute: async () => fetchAladinBestseller(),
      } as any),
      searchAndCreateRoom: tool({
        description: "특정 도서 제목으로 서지 정보를 찾고 파운딩 방 개설 등록 폼 렌더링 유도",
        parameters: z.object({
          bookTitle: z.string().describe("사용자가 관심 있어 하는 책 제목"),
        }),
        execute: async (args: { bookTitle: string }) => fetchAladinSearch(args.bookTitle),
      } as any),
    },
  });

  return result.toTextStreamResponse();
}

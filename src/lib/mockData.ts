export interface VirtualRoom {
  id: string;
  title: string;
  book_title?: string;
  book_author?: string;
  book_description?: string;
  description?: string;
  book_image_url: string;
  target_audience: string;
  curriculum_json?: string[] | Record<string, string>;
  predicted_by?: string;
  vote_count?: number;
}

export interface VirtualReview {
  id: string;
  room_id?: string;
  book_title: string;
  author: string;
  content: string;
  fake_user_persona: string;
  rating?: number;
}

export const FALLBACK_VIRTUAL_ROOMS: VirtualRoom[] = [
  {
    id: "vr-1",
    title: "도둑맞은 집중력 깊이 읽기 모임",
    description: "현대사회의 산만함을 이겨내고 깊은 몰입의 즐거움을 되찾는 4주 탐구 모임입니다.",
    book_image_url: "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg",
    target_audience: "산만한 일상에서 벗어나 딥 워크를 갈망하는 직장인 & 크리에이터",
    curriculum_json: [
      "1주차: 왜 우리는 집중력을 도둑맞았는가 (환경 분석)",
      "2주차: 솟구치는 자극 끊어내기 (디지털 다이어트)",
      "3주차: 깊은 몰입을 돕는 유토피아 공간 디자인",
      "4주차: 지속 가능한 집중 루틴과 지적 소사이어티 구축"
    ],
    predicted_by: "AI",
    vote_count: 42,
  },
  {
    id: "vr-2",
    title: "대학로 밤샘 문학 클럽",
    description: "연극 무대 뒤의 숨겨진 이야기와 명작 소설의 기호학을 함께 토론합니다.",
    book_image_url: "https://image.aladin.co.kr/product/31832/26/coversum/k692833228_1.jpg",
    target_audience: "예술과 심야 소극장의 감성을 사랑하는 문학 기호학자",
    curriculum_json: [
      "1주차: 텍스트 너머의 서사 구조 파악하기",
      "2주차: 연극 연출자의 시선으로 소설 재해석하기",
      "3주차: 심야 토론과 대학로 예술사 톺아보기",
      "4주차: 나만의 짤막한 기호학 에세이 완성"
    ],
    predicted_by: "AI",
    vote_count: 38,
  },
  {
    id: "vr-3",
    title: "INFP를 위한 마음 정리 책방",
    description: "외로운 건 싫지만 혼자 있고 싶은 내향인을 위한 은은한 다정한 독서 라이브.",
    book_image_url: "https://image.aladin.co.kr/product/30023/73/coversum/k032838453_1.jpg",
    target_audience: "자기 내면의 소리에 귀 기울이고 싶은 내향형 INFP/INFJ",
    curriculum_json: [
      "1주차: 나의 내면 기후 체크와 조용한 수용",
      "2주차: 타인과의 거리를 다정하게 유지하는 법",
      "3주차: 감정 과부하를 비워내는 글쓰기 문답",
      "4주차: 조용하지만 단단한 나만의 성소 확립"
    ],
    predicted_by: "AI",
    vote_count: 55,
  },
  {
    id: "vr-4",
    title: "트렌드 코리아 2026 인사이트 클럽",
    description: "새로운 소비 문화 흐름과 기성 시장을 뒤흔들 새로운 파도를 같이 분석해봅니다.",
    book_image_url: "https://image.aladin.co.kr/product/33563/39/coversum/k062939882_1.jpg",
    target_audience: "다음 세대의 비즈니스 씬을 선도할 예비 창업가 & 마케터",
    curriculum_json: [
      "1주차: 2026 핵심 소비 트렌드 10가지 개괄",
      "2주차: AI 서브컬처와 파편화된 팬덤 심리",
      "3주차: 오프라인 공간 경험의 가치 스케일업",
      "4주차: 신규 사업 모델 피칭 및 파운딩 액션"
    ],
    predicted_by: "AI",
    vote_count: 29,
  },
  {
    id: "vr-5",
    title: "생각의 역사 & 철학자들의 질문들",
    description: "소크라테스부터 한나 아렌트까지, 질문하는 힘을 기르는 파운딩 지식 모임.",
    book_image_url: "https://image.aladin.co.kr/product/24485/86/coversum/k142630930_1.jpg",
    target_audience: "지적 호기심과 본질적인 질문의 힘을 믿는 사상 탐구자",
    curriculum_json: [
      "1주차: 질문의 기원: 소크라테스의 대화법",
      "2주차: 이성과 감성의 이분법 넘어서기",
      "3주차: 현대 사회의 악의 평범성과 자유",
      "4주차: 나만의 철학적 명제 다듬기"
    ],
    predicted_by: "AI",
    vote_count: 61,
  },
];

export const FALLBACK_VIRTUAL_REVIEWS: VirtualReview[] = [
  {
    id: "rev-1",
    book_title: "도둑맞은 집중력",
    author: "요한 하리",
    content: "스마트폰을 내려놓고 질문을 던질 때 비로소 진정한 내 삶의 주권을 회복하는 느낌이 듭니다. 대학로 모임에서 사람들과 집중력에 대한 대화를 나눌 날이 기대됩니다.",
    fake_user_persona: "AI 멤버 예측 (대학로 기획자)",
    rating: 5.0,
  },
  {
    id: "rev-2",
    book_title: "외로운 건 싫은데 혼자 있고 싶어",
    author: "우유곽",
    content: "나만의 고요한 성소를 지키면서도 결이 맞는 사람들과 질문을 주고받는 즐거움이 기대돼요. 내향인에게 꼭 필요한 온기가 흐르는 책입니다.",
    fake_user_persona: "AI 멤버 예측 (INFP 디자이너)",
    rating: 4.9,
  },
  {
    id: "rev-3",
    book_title: "생각에 관한 생각",
    author: "대니얼 카너먼",
    content: "Questionity 파운딩 룸에서 사람들과 카너먼의 편향을 분석하며 토론하고 싶어요! 인간 직관의 한계를 직면하고 본질을 관통하는 경험이 될 것입니다.",
    fake_user_persona: "AI 멤버 예측 (스타트업 개발자)",
    rating: 5.0,
  },
];

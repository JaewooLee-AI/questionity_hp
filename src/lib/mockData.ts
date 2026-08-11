export interface VirtualRoom {
  id: string;
  title: string;
  book_title?: string;
  book_author?: string;
  book_description?: string;
  description?: string;
  book_image_url: string;
  publisher?: string;
  target_audience: string;
  curriculum_json?: string[] | Record<string, string>;
  meeting_type?: string;
  location?: string;
  schedule_text?: string;
  price_text?: string;
  max_capacity?: number;
  is_ai_generated?: boolean;
  is_custom_created?: boolean;
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
    id: "vr-decisive-1",
    title: "결정이후: 최고의 의사결정 프레임워크 4주 클럽",
    book_title: "결정이후 (Decisive)",
    book_author: "칩 히스, 댄 히스",
    book_description: "후회 없는 선택을 내리는 WRAP 프레임워크와 의사결정의 4대 장애물을 극복하는 지적 실천 모임입니다.",
    description: "후회 없는 선택을 내리는 WRAP 프레임워크와 의사결정의 4대 장애물을 극복하는 지적 실천 모임입니다.",
    book_image_url: "https://image.aladin.co.kr/product/2740/15/coversum/8935210129_1.jpg",
    publisher: "웅진지식하우스",
    target_audience: "중요한 사업 및 인생의 결정 앞에서 최선의 선택을 내리고 싶은 리더, 기획자, 파운딩 멤버",
    curriculum_json: {
      "1주차": "1주차: 선택안의 폭을 넓혀라 (Narrow Framing 극복하기)",
      "2주차": "2주차: 검증을 거쳐라 (확증 편향 조각내기)",
      "3주차": "3주차: 결정 전 거리를 두라 (감정의 소용돌이 벗어나기)",
      "4주차": "4주차: 틀릴 가능성에 대비하라 (최선의 액션 플랜 수립)"
    },
    meeting_type: "offline",
    location: "대학로 Work & Share 메인 라운지",
    schedule_text: "매주 목요일 19:30 (선착순 12명)",
    price_text: "파운딩 0원 (무료)",
    max_capacity: 12,
    is_ai_generated: false,
    is_custom_created: true,
    predicted_by: "관리자 확정 개설",
    vote_count: 88,
  },
  {
    id: "vr-1",
    title: "도둑맞은 집중력 깊이 읽기 모임",
    book_title: "도둑맞은 집중력",
    book_author: "요한 하리",
    book_description: "현대사회의 산만함을 이겨내고 깊은 몰입의 즐거움을 되찾는 4주 탐구 모임입니다.",
    description: "현대사회의 산만함을 이겨내고 깊은 몰입의 즐거움을 되찾는 4주 탐구 모임입니다.",
    book_image_url: "https://image.aladin.co.kr/product/31562/22/coversum/k232832857_1.jpg",
    publisher: "어크로스",
    target_audience: "산만한 일상에서 벗어나 딥 워크를 갈망하는 직장인 & 크리에이터",
    curriculum_json: [
      "1주차: 왜 우리는 집중력을 도둑맞았는가 (환경 분석)",
      "2주차: 솟구치는 자극 끊어내기 (디지털 다이어트)",
      "3주차: 깊은 몰입을 돕는 유토피아 공간 디자인",
      "4주차: 지속 가능한 집중 루틴과 지적 소사이어티 구축"
    ],
    meeting_type: "offline",
    location: "대학로 Work & Share 라운지",
    schedule_text: "매주 수요일 19:30 (10/15 개강)",
    price_text: "파운딩 0원 (무료)",
    max_capacity: 12,
    is_ai_generated: true,
    is_custom_created: false,
    predicted_by: "AI",
    vote_count: 42,
  },
  {
    id: "vr-2",
    title: "대학로 밤샘 문학 클럽",
    book_title: "밤샘 문학 이야기",
    book_author: "김문학",
    book_description: "연극 무대 뒤의 숨겨진 이야기와 명작 소설의 기호학을 함께 토론합니다.",
    description: "연극 무대 뒤의 숨겨진 이야기와 명작 소설의 기호학을 함께 토론합니다.",
    book_image_url: "https://image.aladin.co.kr/product/31832/26/coversum/k692833228_1.jpg",
    publisher: "대학로출판",
    target_audience: "예술과 심야 소극장의 감성을 사랑하는 문학 기호학자",
    curriculum_json: [
      "1주차: 텍스트 너머의 서사 구조 파악하기",
      "2주차: 연극 연출자의 시선으로 소설 재해석하기",
      "3주차: 심야 토론과 대학로 예술사 톺아보기",
      "4주차: 나만의 짤막한 기호학 에세이 완성"
    ],
    meeting_type: "offline",
    location: "대학로 Work & Share 세미나룸",
    schedule_text: "매주 금요일 20:00 (10/17 개강)",
    price_text: "파운딩 0원 (무료)",
    max_capacity: 10,
    is_ai_generated: false,
    is_custom_created: true,
    predicted_by: "관리자 직접 개설",
    vote_count: 38,
  },
  {
    id: "vr-3",
    title: "INFP를 위한 마음 정리 책방",
    book_title: "외로운 건 싫은데 혼자 있고 싶어",
    book_author: "우유곽",
    book_description: "외로운 건 싫지만 혼자 있고 싶은 내향인을 위한 은은한 다정한 독서 라이브.",
    description: "외로운 건 싫지만 혼자 있고 싶은 내향인을 위한 은은한 다정한 독서 라이브.",
    book_image_url: "https://image.aladin.co.kr/product/30023/73/coversum/k032838453_1.jpg",
    publisher: "마음의숲",
    target_audience: "자기 내면의 소리에 귀 기울이고 싶은 내향형 INFP/INFJ",
    curriculum_json: [
      "1주차: 나의 내면 기후 체크와 조용한 수용",
      "2주차: 타인과의 거리를 다정하게 유지하는 법",
      "3주차: 감정 과부하를 비워내는 글쓰기 문답",
      "4주차: 조용하지만 단단한 나만의 성소 확립"
    ],
    meeting_type: "offline",
    location: "대학로 Work & Share 릴렉스존",
    schedule_text: "매주 토요일 14:00 (10/18 개강)",
    price_text: "파운딩 0원 (무료)",
    max_capacity: 8,
    is_ai_generated: true,
    is_custom_created: false,
    predicted_by: "AI",
    vote_count: 55,
  },
];

export const FALLBACK_VIRTUAL_REVIEWS: VirtualReview[] = [
  {
    id: "rev-0",
    book_title: "결정이후",
    author: "칩 히스, 댄 히스",
    content: "살면서 직면하는 수많은 선택 장애와 우유부단함에서 벗어나는 확실한 프레임워크를 만났습니다. 대학로 현장에서 멤버들과 치열하게 논의할 생각에 설렙니다.",
    fake_user_persona: "개설자 추천 후기 (전략기획팀 팀장)",
    rating: 5.0,
  },
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
];
